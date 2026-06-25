import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  activeHubForUser,
  createHubRecord,
  getSessionFromCookies,
  serializeSessionPayload,
  userHubs,
  writeDb
} from "../../../lib/serverAuth";

export async function GET() {
  const session = await getSessionFromCookies(cookies());
  if (!session) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  return NextResponse.json({ ok: true, ...serializeSessionPayload(session) });
}

export async function POST(request) {
  const session = await getSessionFromCookies(cookies());
  if (!session) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const name = String(body.name || "").trim();
  if (!name) {
    return NextResponse.json({ error: "Hub name is required." }, { status: 400 });
  }

  const hub = createHubRecord(session.user, {
    name,
    description: body.description
  });
  session.db.hubs.push(hub);
  session.user.activeHubId = hub.id;
  await writeDb(session.db);

  const hubs = userHubs(session.db, session.user);
  return NextResponse.json({ ok: true, user: session.publicUser, hub, hubs, activeHubId: hub.id });
}

export async function PATCH(request) {
  const session = await getSessionFromCookies(cookies());
  if (!session) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const hubId = String(body.activeHubId || "");
  const hubs = userHubs(session.db, session.user);
  const hub = hubs.find(item => item.id === hubId);
  if (!hub) {
    return NextResponse.json({ error: "Hub not found." }, { status: 404 });
  }

  session.user.activeHubId = hub.id;
  const activeHub = activeHubForUser(session.db, session.user);
  await writeDb(session.db);

  return NextResponse.json({ ok: true, user: session.publicUser, hub: activeHub, hubs, activeHubId: activeHub.id });
}
