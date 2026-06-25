import crypto from "crypto";
import { NextResponse } from "next/server";
import {
  createVerificationToken,
  hashPassword,
  normalizeEmail,
  readDb,
  sendVerificationEmail,
  writeDb
} from "../../../../lib/serverAuth";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const name = String(body.name || "").trim();
  const email = normalizeEmail(body.email);
  const password = String(body.password || "");

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Name, email, and password are required." }, { status: 400 });
  }

  const db = await readDb();
  const existing = db.users.find(user => user.email === email);
  if (existing?.emailVerifiedAt) {
    return NextResponse.json({ error: "An account already exists with this email." }, { status: 409 });
  }

  const verification = createVerificationToken();
  const passwordHash = await hashPassword(password);
  const now = new Date().toISOString();
  const user = existing || {
    id: `user_${crypto.randomUUID()}`,
    name,
    email,
    createdAt: now
  };

  user.name = name;
  user.passwordHash = passwordHash;
  user.emailVerifiedAt = null;
  user.verificationTokenHash = verification.tokenHash;
  user.verificationExpiresAt = verification.expiresAt;
  user.updatedAt = now;

  if (existing) {
    db.users = db.users.map(item => item.email === email ? user : item);
  } else {
    db.users.push(user);
  }

  const emailResult = await sendVerificationEmail(user, verification.token);
  user.lastVerificationSentAt = now;
  user.lastVerificationDelivery = emailResult.sent ? "smtp" : "console";
  user.lastVerificationLink = process.env.NODE_ENV === "production" ? undefined : emailResult.verificationUrl;
  await writeDb(db);

  return NextResponse.json({ ok: true, email, delivery: user.lastVerificationDelivery });
}
