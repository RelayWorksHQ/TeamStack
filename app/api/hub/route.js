import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getSessionFromCookies, serializeSessionPayload, writeDb } from "../../../lib/serverAuth";

export async function GET() {
  const session = await getSessionFromCookies(cookies());
  if (!session) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  return NextResponse.json({ ok: true, ...serializeSessionPayload(session) });
}

export async function PATCH(request) {
  const session = await getSessionFromCookies(cookies());
  if (!session) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }
  if (!session.hub) {
    return NextResponse.json({ error: "Active hub required." }, { status: 404 });
  }

  const body = await request.json().catch(() => ({}));
  const fullName = String(body.fullName || "").trim() || session.hub.fullName;
  const name = fullName.includes("—") ? fullName.split("—").pop().trim() : fullName;
  session.hub.fullName = fullName;
  session.hub.name = name;
  session.hub.description = String(body.description || "").trim() || session.hub.description;
  session.hub.updatedAt = new Date().toISOString();
  await writeDb(session.db);

  return NextResponse.json({ ok: true, ...serializeSessionPayload(session) });
}
