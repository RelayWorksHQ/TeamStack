import { NextResponse } from "next/server";
import {
  createVerificationToken,
  normalizeEmail,
  readDb,
  sendVerificationEmail,
  writeDb
} from "../../../../lib/serverAuth";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const email = normalizeEmail(body.email);
  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  const db = await readDb();
  const user = db.users.find(item => item.email === email);
  if (!user) {
    return NextResponse.json({ error: "No account found with this email." }, { status: 404 });
  }

  if (user.emailVerifiedAt) {
    return NextResponse.json({ ok: true, verified: true });
  }

  const verification = createVerificationToken();
  user.verificationTokenHash = verification.tokenHash;
  user.verificationExpiresAt = verification.expiresAt;
  user.lastVerificationSentAt = new Date().toISOString();
  const emailResult = await sendVerificationEmail(user, verification.token);
  user.lastVerificationDelivery = emailResult.sent ? "smtp" : "console";
  user.lastVerificationLink = process.env.NODE_ENV === "production" ? undefined : emailResult.verificationUrl;
  await writeDb(db);

  return NextResponse.json({ ok: true, email, delivery: user.lastVerificationDelivery });
}
