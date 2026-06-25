import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getSessionFromCookies, writeDb } from "../../../lib/serverAuth";

const allowedTypes = new Set(["members", "files", "proof", "chat", "work"]);

function readHubData(hub, type) {
  if (type === "members") return hub.members || [];
  hub.data = hub.data || {};
  if (type === "chat") return hub.data.chat || null;
  return hub.data[type] || [];
}

function writeHubData(hub, type, value) {
  if (type === "members") {
    hub.members = Array.isArray(value) ? value : [];
    return;
  }
  hub.data = hub.data || {};
  hub.data[type] = type === "chat" ? value || null : Array.isArray(value) ? value : [];
}

export async function GET(request) {
  const session = await getSessionFromCookies(cookies());
  if (!session?.hub) {
    return NextResponse.json({ error: "Active hub required." }, { status: session ? 404 : 401 });
  }

  const url = new URL(request.url);
  const type = String(url.searchParams.get("type") || "");
  if (!allowedTypes.has(type)) {
    return NextResponse.json({ error: "Unsupported hub data type." }, { status: 400 });
  }

  return NextResponse.json({ ok: true, hubId: session.hub.id, type, data: readHubData(session.hub, type) });
}

export async function PATCH(request) {
  const session = await getSessionFromCookies(cookies());
  if (!session?.hub) {
    return NextResponse.json({ error: "Active hub required." }, { status: session ? 404 : 401 });
  }

  const body = await request.json().catch(() => ({}));
  const type = String(body.type || "");
  if (!allowedTypes.has(type)) {
    return NextResponse.json({ error: "Unsupported hub data type." }, { status: 400 });
  }

  writeHubData(session.hub, type, body.data);
  session.hub.updatedAt = new Date().toISOString();
  await writeDb(session.db);

  return NextResponse.json({ ok: true, hubId: session.hub.id, type, data: readHubData(session.hub, type) });
}
