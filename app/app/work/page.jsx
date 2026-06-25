"use client";

import { MessageCircle, Plus, Send, UserRound } from "lucide-react";
import { useState } from "react";
import { AppPageHeader, Status, Surface } from "../../../components/AppShell";
import { PhotoAvatar } from "../../../components/DashboardMockup";

const items = [
  ["Driver Onboarding Flow", "Maya Chen", "Jun 24", 78, "In Progress", "member2", 8],
  ["AQD Deployment", "Omar Ellis", "Jun 24", 62, "In Progress", "member3", 5],
  ["Driver Presence Testing", "QA Team", "Jun 22", 34, "Blocked", "qa", 11],
  ["Deployment documentation", "Azeem Khan", "Jun 25", 20, "To Do", "azeem", 2],
  ["Repository connection", "Azeem Khan", "Jun 18", 100, "Completed", "azeem", 4]
];

const threadMessages = [
  ["qa", "QA Team", "The iOS test is blocked until the new build is uploaded.", "38m"],
  ["azeem", "Azeem", "I’m uploading it before today’s progression window.", "24m"],
  ["member3", "Omar", "Please attach the build number to the proof record too.", "11m"]
];

export default function WorkPage() {
  const [selected, setSelected] = useState("Driver Presence Testing");
  const active = items.find(item => item[0] === selected) || items[0];
  return (
    <>
      <AppPageHeader eyebrow="Hub work" title="Shared work streams" description="Team-owned outcomes with assignments, status, proof, and discussion in one place." action={<button className="flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-[11px] font-bold text-white"><Plus size={14} /> New work</button>} />
      <div className="grid gap-4 xl:grid-cols-[1fr_350px]">
        <Surface title="Hub work" action={<div className="flex gap-2"><Status tone="slate">5 streams</Status><Status>6 members</Status></div>}>
          <div className="divide-y divide-line">
            {items.map(([name, owner, due, progress, status, crop, comments]) => (
              <button key={name} onClick={() => setSelected(name)} className={`grid w-full items-center gap-3 px-2 py-3.5 text-left transition sm:grid-cols-[1fr_130px_100px_90px] ${selected === name ? "rounded-lg bg-blue-50/70" : "hover:bg-slate-50"}`}>
                <div><div className="flex items-center gap-2"><h2 className="text-[12px] font-bold">{name}</h2>{status === "Blocked" && <Status tone="orange">Blocked</Status>}</div><div className="mt-1.5 flex items-center gap-2"><PhotoAvatar crop={crop} size={20} /><span className="text-[9px] text-muted">{owner} · Due {due}</span></div></div>
                <div className="flex items-center gap-2"><div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${status === "Blocked" ? "bg-orange-500" : status === "Completed" ? "bg-emerald-500" : "bg-brand"}`} style={{width: `${progress}%`}} /></div><span className="text-[9px] font-bold">{progress}%</span></div>
                <Status tone={status === "Completed" ? "green" : status === "To Do" ? "slate" : status === "Blocked" ? "orange" : "blue"}>{status}</Status>
                <span className="flex items-center justify-end gap-1.5 text-[9px] font-bold text-muted"><MessageCircle size={13} /> {comments} comments</span>
              </button>
            ))}
          </div>
        </Surface>

        <Surface title="Work discussion" action={<Status tone={active[4] === "Blocked" ? "orange" : "blue"}>{active[4]}</Status>}>
          <div className="border-b border-line pb-3"><h2 className="text-[13px] font-bold">{active[0]}</h2><p className="mt-1 text-[9px] text-muted">Thread visible to assigned members and hub admins.</p></div>
          <div className="space-y-1 py-3">
            {threadMessages.map(([crop, name, text, time]) => <div key={text} className="flex gap-2.5 rounded-lg py-2"><PhotoAvatar crop={crop} size={25} /><div className="min-w-0 flex-1"><div className="flex justify-between"><b className="text-[9px]">{name}</b><span className="text-[8px] text-muted">{time}</span></div><p className="mt-1 text-[10px] leading-4 text-muted">{text}</p></div></div>)}
          </div>
          <div className="rounded-lg border border-line p-2.5"><textarea aria-label="Add work comment" rows="2" className="w-full resize-none text-[10px] outline-none" placeholder="Comment on this work or @mention someone..." /><div className="mt-2 flex justify-between"><button className="flex items-center gap-1.5 text-[9px] font-bold text-muted"><UserRound size={12} /> Mention</button><button className="grid h-7 w-7 place-items-center rounded-lg bg-ink text-white"><Send size={12} /></button></div></div>
        </Surface>
      </div>
    </>
  );
}
