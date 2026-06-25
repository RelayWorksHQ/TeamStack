import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getSessionFromCookies, serializeSessionPayload } from "../../../../lib/serverAuth";

export async function GET() {
  const session = await getSessionFromCookies(cookies());
  if (!session) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  return NextResponse.json({ ok: true, ...serializeSessionPayload(session) });
}
