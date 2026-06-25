"use client";

import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { AppPageHeader, Status, Surface } from "../../../components/AppShell";
import { readHubData, writeHubData } from "../../../lib/hubDataClient";
import { initialsFor } from "../../../lib/localStore";

export default function MembersPage() {
  const [members, setMembers] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const loadMembers = async () => setMembers(await readHubData("members", []));
    loadMembers();
    window.addEventListener("teamstack:storage", loadMembers);
    return () => window.removeEventListener("teamstack:storage", loadMembers);
  }, []);

  const addMember = async event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const role = String(form.get("role") || "Member");
    const access = String(form.get("access") || "Assigned and shared hub work").trim();
    if (!name) return;
    const nextMembers = [...members, { initials: initialsFor(name), name, role, access, status: "Invited", activity: "Just now" }];
    setMembers(nextMembers);
    await writeHubData("members", nextMembers);
    setModal(false);
    event.currentTarget.reset();
  };

  return (
    <>
      <AppPageHeader eyebrow="Hub members" title="People and access" description="Owners and admins control what members, contractors, clients, and guests can see." action={<button onClick={() => setModal(true)} className="flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-[11px] font-bold text-white"><Plus size={14} /> Add Member</button>} />
      <Surface className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] text-left"><thead><tr className="border-b border-line bg-[#fbfcfe] text-[9px] uppercase tracking-widest text-slate-400">{["Name", "Role", "Hub access", "Status", "Last activity"].map(h => <th key={h} className="px-4 py-3">{h}</th>)}</tr></thead><tbody>{members.map(({ initials, name, role, access, status, activity }) => <tr key={name} className="border-b border-line last:border-0"><td className="px-4 py-3"><div className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-[10px] font-black">{initials || initialsFor(name)}</span><span className="text-[11px] font-bold">{name}</span></div></td><td className="px-4 py-3 text-[10px] font-semibold">{role || "Member"}</td><td className="px-4 py-3 text-[10px] text-muted">{access || "Assigned and shared hub work"}</td><td className="px-4 py-3"><Status tone={status === "Active" ? "green" : status === "Invited" ? "blue" : "slate"}>{status || "Active"}</Status></td><td className="px-4 py-3 text-[10px] text-muted">{activity || "Just now"}</td></tr>)}</tbody></table>
        </div>
      </Surface>
      {modal && <div className="fixed inset-0 z-[80] grid place-items-center bg-ink/30 p-5 backdrop-blur-sm"><form onSubmit={addMember} className="w-full max-w-sm rounded-2xl border border-line bg-white p-6 shadow-soft"><h2 className="text-[15px] font-bold">Add member</h2><label className="mt-5 block text-[10px] font-bold">Name<input name="name" autoFocus required className="mt-2 w-full rounded-lg border border-line px-3 py-3 text-[11px] outline-none focus:border-brand" /></label><label className="mt-4 block text-[10px] font-bold">Role<select name="role" className="mt-2 w-full rounded-lg border border-line px-3 py-3 text-[11px] outline-none focus:border-brand"><option>Member</option><option>Admin</option><option>Contractor</option><option>Client / Guest</option></select></label><label className="mt-4 block text-[10px] font-bold">Hub access<input name="access" defaultValue="Assigned and shared hub work" className="mt-2 w-full rounded-lg border border-line px-3 py-3 text-[11px] outline-none focus:border-brand" /></label><div className="mt-5 flex gap-2"><button type="button" onClick={() => setModal(false)} className="flex-1 rounded-lg border border-line py-3 text-[11px] font-bold">Cancel</button><button className="flex-1 rounded-lg bg-ink py-3 text-[11px] font-bold text-white">Add Member</button></div></form></div>}
    </>
  );
}
