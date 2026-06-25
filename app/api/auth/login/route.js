import { NextResponse } from "next/server";
import {
  ensureFreeHubForUser,
  normalizeEmail,
  readDb,
  serializeSessionPayload,
  setSessionCookie,
  verifyPassword,
  writeDb
} from "../../../../lib/serverAuth";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const email = normalizeEmail(body.email);
  const password = String(body.password || "");

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const db = await readDb();
  const user = db.users.find(item => item.email === email);
  if (!user) {
    return NextResponse.json({ error: "No account found with this email." }, { status: 404 });
  }

  const passwordOk = await verifyPassword(password, user.passwordHash);
  if (!passwordOk) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  if (!user.emailVerifiedAt) {
    return NextResponse.json({ error: "Please verify your email to continue." }, { status: 403 });
  }

  const hub = ensureFreeHubForUser(db, user);
  user.lastLoginAt = new Date().toISOString();
  await writeDb(db);

  const response = NextResponse.json({ ok: true, ...serializeSessionPayload({ user, hub }) });
  setSessionCookie(response, user.id);
  return response;
}
