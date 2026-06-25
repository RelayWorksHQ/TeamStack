import "server-only";

import crypto from "crypto";
import fs from "fs/promises";
import path from "path";
import nodemailer from "nodemailer";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "teamstack-db.json");
const SESSION_COOKIE = "teamstack_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 14;
const VERIFY_TOKEN_HOURS = 24;

const defaultDb = {
  users: [],
  hubs: [],
  activity: []
};

const emptyHubData = {
  files: [],
  proof: [],
  chat: null,
  work: []
};

function nowIso() {
  return new Date().toISOString();
}

function safeId(prefix) {
  return `${prefix}_${crypto.randomBytes(12).toString("hex")}`;
}

function appUrl() {
  return (process.env.APP_URL || "http://localhost:3000").replace(/\/$/, "");
}

function sessionSecret() {
  return process.env.AUTH_SESSION_SECRET || "teamstack-local-dev-session-secret-change-me";
}

function publicUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    emailVerifiedAt: user.emailVerifiedAt || null
  };
}

function publicHub(hub) {
  if (!hub) return null;
  return {
    id: hub.id,
    name: hub.name,
    fullName: hub.fullName,
    description: hub.description,
    plan: hub.plan,
    memberLimit: hub.memberLimit,
    ownerId: hub.ownerId,
    members: hub.members || []
  };
}

export function userHubs(db, user) {
  return db.hubs.filter(hub =>
    hub.ownerId === user.id ||
    (hub.members || []).some(member => member.userId === user.id || member.email === user.email)
  );
}

export function activeHubForUser(db, user) {
  const hubs = userHubs(db, user);
  if (hubs.length === 0) return null;
  const active = hubs.find(hub => hub.id === user.activeHubId) || hubs[0];
  user.activeHubId = active.id;
  return active;
}

export async function readDb() {
  try {
    const raw = await fs.readFile(DB_PATH, "utf8");
    return { ...defaultDb, ...JSON.parse(raw) };
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    await writeDb(defaultDb);
    return { ...defaultDb };
  }
}

export async function writeDb(db) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DB_PATH, `${JSON.stringify(db, null, 2)}\n`);
}

export async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const key = await new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (error, derivedKey) => {
      if (error) reject(error);
      else resolve(derivedKey);
    });
  });
  return `${salt}:${key.toString("hex")}`;
}

export async function verifyPassword(password, passwordHash) {
  const [salt, storedHex] = String(passwordHash || "").split(":");
  if (!salt || !storedHex) return false;
  const stored = Buffer.from(storedHex, "hex");
  const key = await new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, stored.length, (error, derivedKey) => {
      if (error) reject(error);
      else resolve(derivedKey);
    });
  });
  return stored.length === key.length && crypto.timingSafeEqual(stored, key);
}

export function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

export function createVerificationToken() {
  const token = crypto.randomBytes(32).toString("hex");
  return {
    token,
    tokenHash: crypto.createHash("sha256").update(token).digest("hex"),
    expiresAt: new Date(Date.now() + VERIFY_TOKEN_HOURS * 60 * 60 * 1000).toISOString()
  };
}

export function createSessionValue(userId) {
  const payload = Buffer.from(JSON.stringify({
    userId,
    exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000
  })).toString("base64url");
  const signature = crypto.createHmac("sha256", sessionSecret()).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function readSessionValue(value) {
  const [payload, signature] = String(value || "").split(".");
  if (!payload || !signature) return null;
  const expected = crypto.createHmac("sha256", sessionSecret()).update(payload).digest("base64url");
  const expectedBuffer = Buffer.from(expected);
  const actualBuffer = Buffer.from(signature);
  if (expectedBuffer.length !== actualBuffer.length || !crypto.timingSafeEqual(expectedBuffer, actualBuffer)) return null;
  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!session.userId || !session.exp || session.exp < Date.now()) return null;
    return session;
  } catch {
    return null;
  }
}

export function setSessionCookie(response, userId) {
  response.cookies.set(SESSION_COOKIE, createSessionValue(userId), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS
  });
}

export function clearSessionCookie(response) {
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0
  });
}

export async function getSessionFromCookies(cookiesStore) {
  const session = readSessionValue(cookiesStore.get(SESSION_COOKIE)?.value);
  if (!session) return null;
  const db = await readDb();
  const user = db.users.find(item => item.id === session.userId);
  if (!user || !user.emailVerifiedAt) return null;
  const hub = activeHubForUser(db, user);
  await writeDb(db);
  const hubs = userHubs(db, user);
  return { db, user, hub, hubs, publicUser: publicUser(user), publicHub: publicHub(hub) };
}

export function ensureFreeHubForUser(db, user) {
  const existingHub = db.hubs.find(hub => hub.ownerId === user.id);
  if (existingHub) {
    user.activeHubId = user.activeHubId || existingHub.id;
    existingHub.data = { ...emptyHubData, ...(existingHub.data || {}) };
    return existingHub;
  }
  const firstName = user.name?.split(" ")?.[0] || "TeamStack";
  const hub = createHubRecord(user, {
    name: `${firstName}'s Free Hub`,
    description: "Your first TeamStack hub for organizing work, files, proof, and team activity.",
    plan: "Free"
  });
  db.hubs.push(hub);
  user.activeHubId = hub.id;
  db.activity.push({ id: safeId("activity"), userId: user.id, hubId: hub.id, type: "created_free_hub", createdAt: nowIso() });
  return hub;
}

export function createHubRecord(user, options = {}) {
  const fullName = String(options.name || "").trim() || "Untitled Hub";
  return {
    id: safeId("hub"),
    ownerId: user.id,
    name: fullName.includes("—") ? fullName.split("—").pop().trim() : fullName,
    fullName,
    description: String(options.description || "").trim() || "TeamStack hub workspace.",
    plan: options.plan || "Standard",
    memberLimit: 3,
    members: [{
      userId: user.id,
      initials: user.name.split(" ").filter(Boolean).slice(0, 2).map(part => part[0]?.toUpperCase()).join("") || "TS",
      name: user.name,
      email: user.email,
      role: "Owner",
      access: "Full hub, billing, settings",
      status: "Active",
      activity: "Just now",
      joinedAt: nowIso()
    }],
    data: { ...emptyHubData },
    createdAt: nowIso(),
    updatedAt: nowIso()
  };
}

export async function sendVerificationEmail(user, token) {
  const verificationUrl = `${appUrl()}/api/auth/verify?token=${encodeURIComponent(token)}`;
  const smtpReady = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;

  if (!smtpReady) {
    console.log(`[TeamStack auth] SMTP is not configured. Verification link for ${user.email}: ${verificationUrl}`);
    return { sent: false, verificationUrl };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || "").toLowerCase() === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS.replace(/[\s_]/g, "")
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || "TeamStack <no-reply@teamstack.local>",
    to: user.email,
    subject: "Verify your TeamStack email",
    text: `Verify your TeamStack account by opening this link: ${verificationUrl}`,
    html: `<p>Welcome to TeamStack, ${user.name}.</p><p>Verify your account by opening this secure link:</p><p><a href="${verificationUrl}">Verify your email</a></p><p>This link expires in ${VERIFY_TOKEN_HOURS} hours.</p>`
  });

  return { sent: true, verificationUrl };
}

export function serializeSessionPayload(session) {
  return {
    user: publicUser(session.user),
    hub: publicHub(session.hub),
    hubs: (session.hubs || []).map(publicHub),
    activeHubId: session.user?.activeHubId || session.hub?.id || null
  };
}
