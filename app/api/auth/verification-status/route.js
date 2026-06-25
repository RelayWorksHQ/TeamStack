import { NextResponse } from "next/server";
import { normalizeEmail, readDb } from "../../../../lib/serverAuth";

export async function GET(request) {
  const url = new URL(request.url);
  const email = normalizeEmail(url.searchParams.get("email"));
  if (!email) {
    return NextResponse.json({ verified: false }, { status: 400 });
  }

  const db = await readDb();
  const user = db.users.find(item => item.email === email);
  return NextResponse.json({ verified: Boolean(user?.emailVerifiedAt) });
}
