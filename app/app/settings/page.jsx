"use client";

import { AlertTriangle, Bell, Code2, LockKeyhole, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { AppPageHeader, Surface } from "../../../components/AppShell";
import { defaultHub } from "../../../lib/localStore";

function Toggle({ on = true }) { return <button className={`relative h-6 w-11 rounded-full ${on ? "bg-brand" : "bg-slate-200"}`}><span className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${on ? "left-6" : "left-1"}`} /></button>; }

export default function SettingsPage() {
  const [hub, setHub] = useState(defaultHub);

  useEffect(() => {
    const loadHub = async () => {
      const response = await fetch("/api/hub", { cache: "no-store" });
      if (!response.ok) return;
      const data = await response.json();
      setHub(data.hub || defaultHub);
    };
    loadHub();
  }, []);

  const saveHub = async () => {
    const fullName = hub.fullName.trim() || defaultHub.fullName;
    const name = fullName.includes("—") ? fullName.split("—").pop().trim() : fullName;
    const nextHub = { ...hub, fullName, name };
    setHub(nextHub);
    const response = await fetch("/api/hub", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nextHub)
    });
    if (response.ok) {
      const data = await response.json();
      setHub(data.hub || nextHub);
      window.dispatchEvent(new CustomEvent("teamstack:storage", { detail: { key: "teamstack.hub", value: data.hub || nextHub } }));
    }
  };

  return (
    <>
      <AppPageHeader eyebrow="Settings" title="Hub settings" description={`Configure how ${hub.fullName} works.`} action={<button onClick={saveHub} className="flex items-center gap-2 rounded-xl bg-ink px-4 py-3 text-xs font-bold text-white"><Save size={15} /> Save changes</button>} />
      <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <Surface title="Hub details"><label className="text-xs font-bold">Hub name</label><input value={hub.fullName} onChange={event => setHub(current => ({ ...current, fullName: event.target.value }))} className="mt-2 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-brand" /><label className="mt-5 block text-xs font-bold">Hub description</label><textarea value={hub.description} onChange={event => setHub(current => ({ ...current, description: event.target.value }))} rows="3" className="mt-2 w-full resize-none rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-brand" /></Surface>
          <Surface title="Roles and permissions">{[["Admins manage members and settings", "Owners can grant or remove admin access.", true], ["Members see shared hub work", "Members can complete assigned work and join hub discussion.", true], ["Contractors see assigned context only", "Limit contractors to assigned work, related files, proof, and messages.", true], ["Clients and guests see approved areas", "Hide internal work and conversation unless explicitly approved.", true]].map(([name, desc, on]) => <div key={name} className="flex items-center justify-between gap-5 border-b border-line py-3 last:border-0"><div><div className="text-[11px] font-bold">{name}</div><div className="mt-1 text-[10px] text-muted">{desc}</div></div><Toggle on={on} /></div>)}</Surface>
          <Surface title="Notification settings">{[["Progression reminders", "Notify owners before their expected update window.", true], ["At-risk alerts", "Notify hub admins when work is marked at risk.", true], ["Weekly digest", "Send a Monday summary of work and proof.", false]].map(([name, desc, on]) => <div key={name} className="flex items-center justify-between gap-5 border-b border-line py-4 last:border-0"><div><div className="text-sm font-bold">{name}</div><div className="mt-1 text-xs text-muted">{desc}</div></div><Toggle on={on} /></div>)}</Surface>
          <Surface title="Developer layout customization"><div className="rounded-xl border border-orange-200 bg-orange-50 p-4"><div className="flex gap-3"><AlertTriangle size={19} className="shrink-0 text-orange-600" /><p className="text-xs font-semibold leading-5 text-orange-900">Developer customization is advanced. Core records, proof, and permissions cannot be removed.</p></div></div><div className="mt-5 grid gap-4 sm:grid-cols-2"><button className="flex items-center gap-3 rounded-xl border border-line p-4 text-left"><Code2 className="text-brand" /><div><div className="text-sm font-bold">Layout editor</div><div className="text-[10px] text-muted">Arrange hub modules</div></div></button><button className="flex items-center gap-3 rounded-xl border border-line p-4 text-left"><LockKeyhole className="text-brand" /><div><div className="text-sm font-bold">API access</div><div className="text-[10px] text-muted">Manage developer keys</div></div></button></div></Surface>
        </div>
        <div className="space-y-4">
          <Surface title="Hub status"><div className="rounded-xl bg-emerald-50 p-4"><div className="text-xs font-bold text-emerald-700">Workspace is healthy</div><div className="mt-1 text-[11px] text-emerald-700/70">All records and integrations are available.</div></div></Surface>
          <Surface title="Hub identity"><div className="grid h-36 place-items-center rounded-xl bg-[#f7f9fc]"><span className="grid h-16 w-16 place-items-center rounded-2xl bg-brand text-xl font-black text-white">A</span></div><button className="mt-4 w-full rounded-xl border border-line py-3 text-xs font-bold">Change hub icon</button></Surface>
        </div>
      </div>
    </>
  );
}
