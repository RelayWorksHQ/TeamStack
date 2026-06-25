export async function readHubData(type, fallback) {
  const response = await fetch(`/api/hub-data?type=${encodeURIComponent(type)}`, { cache: "no-store" });
  if (!response.ok) return fallback;
  const payload = await response.json().catch(() => ({}));
  return payload.data ?? fallback;
}

export async function writeHubData(type, data) {
  const response = await fetch("/api/hub-data", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, data })
  });
  if (!response.ok) return data;
  const payload = await response.json().catch(() => ({}));
  window.dispatchEvent(new CustomEvent("teamstack:storage", { detail: { key: `teamstack.${type}`, value: payload.data } }));
  return payload.data ?? data;
}
