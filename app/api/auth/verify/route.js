import crypto from "crypto";
import { NextResponse } from "next/server";
import {
  ensureFreeHubForUser,
  readDb,
  setSessionCookie,
  writeDb
} from "../../../../lib/serverAuth";

export async function GET(request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token") || "";
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  const db = await readDb();
  const user = db.users.find(item => item.verificationTokenHash === tokenHash);

  if (!token || !user || !user.verificationExpiresAt || new Date(user.verificationExpiresAt).getTime() < Date.now()) {
    return NextResponse.redirect(new URL("/verify-email?status=invalid", url.origin));
  }

  user.emailVerifiedAt = new Date().toISOString();
  user.verificationTokenHash = null;
  user.verificationExpiresAt = null;
  user.lastVerificationLink = undefined;
  const hub = ensureFreeHubForUser(db, user);
  await writeDb(db);

  const successUrl = new URL("/verify-email", url.origin);
  successUrl.searchParams.set("status", "success");
  successUrl.searchParams.set("email", user.email);
  const response = NextResponse.redirect(successUrl);
  setSessionCookie(response, user.id);
  return response;
}
