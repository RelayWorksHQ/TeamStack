export const STORAGE_KEYS = Object.freeze({
  session: "teamstack.session",
  users: "teamstack.users",
  hub: "teamstack.hub",
  members: "teamstack.members",
  files: "teamstack.files",
  proof: "teamstack.proof",
  chat: "teamstack.chat"
});

export const defaultHub = {
  name: "Aleet · Driver Portal",
  fullName: "Launch Crew — Aleet Driver Portal",
  description: "Operating workspace for the Aleet driver portal launch."
};

export const defaultMembers = [
  { initials: "AK", name: "Azeem Khan", role: "Owner", access: "Full hub, billing, settings", status: "Active", activity: "12 min ago" },
  { initials: "OE", name: "Omar Ellis", role: "Admin", access: "Members, work, proof, settings", status: "Active", activity: "2h ago" },
  { initials: "MC", name: "Maya Chen", role: "Member", access: "Assigned and shared hub work", status: "Active", activity: "1h ago" },
  { initials: "QA", name: "QA Team", role: "Contractor", access: "Assigned work, files, messages", status: "Active", activity: "35 min ago" },
  { initials: "JL", name: "Jordan Lee", role: "Client / Guest", access: "Approved areas only", status: "Invited", activity: "Not joined" },
  { initials: "SN", name: "Sam Noor", role: "Member", access: "Assigned and shared hub work", status: "Away", activity: "Yesterday" }
];

export const defaultFiles = [
  { icon: "github", name: "Driver Portal Repo", detail: "github.com/aleet/driver-portal", type: "GitHub", owner: "Azeem Khan", time: "2h ago" },
  { icon: "text", name: "Deployment Notes", detail: "Deployment Notes.pdf", type: "PDF", owner: "Azeem Khan", time: "2h ago" },
  { icon: "text", name: "Testing Results", detail: "Driver Presence Results.docx", type: "Document", owner: "QA Team", time: "6h ago" },
  { icon: "image", name: "Driver Portal Screenshots", detail: "8 visual records", type: "Images", owner: "Maya Chen", time: "1d ago" },
  { icon: "text", name: "Contractor Agreement", detail: "Azeem Contractor Agreement.pdf", type: "Contract", owner: "Operations", time: "Jun 12" }
];

export const defaultProof = [
  { icon: "file", name: "Deployment Notes.pdf", type: "Uploaded file", work: "AQD Deployment", status: "Approved", meta: "Azeem Khan · Today 2:10 PM" },
  { icon: "image", name: "Production connection.png", type: "Screenshot", work: "Driver Portal Connection", status: "Verified", meta: "Maya Chen · Today 1:44 PM" },
  { icon: "stamp", name: "AQD deployment approval", type: "Approval record", work: "AQD Deployment", status: "Signed off", meta: "Omar Ellis · Today 11:30 AM" },
  { icon: "check", name: "Repository connection", type: "Completed work", work: "Driver Portal Connection", status: "Complete", meta: "Azeem Khan · Yesterday" },
  { icon: "shield", name: "QA validation record", type: "Sign-off status", work: "Driver Presence Testing", status: "Pending", meta: "QA Team · Updated 2h ago" }
];

export function readLocalValue(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function writeLocalValue(key, value) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent("teamstack:storage", { detail: { key, value } }));
}

export function removeLocalValue(key) {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(key);
  window.dispatchEvent(new CustomEvent("teamstack:storage", { detail: { key, value: null } }));
}

export function initialsFor(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase())
    .join("") || "TS";
}
