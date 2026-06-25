"use client";

import { MessageCircle, Plus, Send, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { AppPageHeader, Status, Surface } from "../../../components/AppShell";
import { PhotoAvatar } from "../../../components/DashboardMockup";
import { readHubData, writeHubData } from "../../../lib/hubDataClient";

const threadMessages = [
  ["qa", "QA Team", "The iOS test is blocked until the new build is uploaded.", "38m"],
  ["azeem", "Azeem", "I’m uploading it before today’s progression window.", "24m"],
  ["member3", "Omar", "Please attach the build number to the proof record too.", "11m"]
];

export default function WorkPage() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [modal, setModal] = useState(false);
  const active = items.find(item => item.name === selected) || items[0];

  useEffect(() => {
    const loadWork = async () => {
      const data = await readHubData("work", []);
      setItems(data);
      setSelected(data[0]?.name || null);
    };
    loadWork();
    const onStorage = event => {
      if (event.detail?.key === "teamstack.activeHub") loadWork();
    };
    window.addEventListener("teamstack:storage", onStorage);
    return () => window.removeEventListener("teamstack:storage", onStorage);
  }, []);

  const addWork = async event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    if (!name) return;
    const nextItem = {
      name,
      owner: String(form.get("owner") || "Owner").trim() || "Owner",
      due: String(form.get("due") || "No date").trim() || "No date",
      progress: 0,
      status: String(form.get("status") || "To Do"),
      crop: "profile",
      comments: 0
    };
    const nextItems = [nextItem, ...items];
    setItems(nextItems);
    setSelected(nextItem.name);
    await writeHubData("work", nextItems);
    setModal(false);
    event.currentTarget.reset();
  };

  return (
    <>
      <AppPageHeader eyebrow="Hub work" title="Shared work streams" description="Team-owned outcomes with assignments, status, proof, and discussion in one place." action={<button onClick={() => setModal(true)} className="flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-[11px] font-bold text-white"><Plus size={14} /> New work</button>} />
      <div className="grid gap-4 xl:grid-cols-[1fr_350px]">
        <Surface title="Hub work" action={<div className="flex gap-2"><Status tone="slate">{items.length} streams</Status></div>}>
          <div className="divide-y divide-line">
            {items.length === 0 && <div className="px-2 py-10 text-center text-[11px] text-muted">No work streams in this hub yet.</div>}
            {items.map(({ name, owner, due, progress, status, crop, comments }) => (
              <button key={name} onClick={() => setSelected(name)} className={`grid w-full items-center gap-3 px-2 py-3.5 text-left transition sm:grid-cols-[1fr_130px_100px_90px] ${selected === name ? "rounded-lg bg-blue-50/70" : "hover:bg-slate-50"}`}>
                <div><div className="flex items-center gap-2"><h2 className="text-[12px] font-bold">{name}</h2>{status === "Blocked" && <Status tone="orange">Blocked</Status>}</div><div className="mt-1.5 flex items-center gap-2"><PhotoAvatar crop={crop} size={20} /><span className="text-[9px] text-muted">{owner} · Due {due}</span></div></div>
                <div className="flex items-center gap-2"><div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${status === "Blocked" ? "bg-orange-500" : status === "Completed" ? "bg-emerald-500" : "bg-brand"}`} style={{width: `${progress}%`}} /></div><span className="text-[9px] font-bold">{progress}%</span></div>
                <Status tone={status === "Completed" ? "green" : status === "To Do" ? "slate" : status === "Blocked" ? "orange" : "blue"}>{status}</Status>
                <span className="flex items-center justify-end gap-1.5 text-[9px] font-bold text-muted"><MessageCircle size={13} /> {comments} comments</span>
              </button>
            ))}
          </div>
        </Surface>

        <Surface title="Work discussion" action={active ? <Status tone={active.status === "Blocked" ? "orange" : "blue"}>{active.status}</Status> : null}>
          <div className="border-b border-line pb-3"><h2 className="text-[13px] font-bold">{active?.name || "No work selected"}</h2><p className="mt-1 text-[9px] text-muted">Thread visible to assigned members and hub admins.</p></div>
          <div className="space-y-1 py-3">
            {active ? threadMessages.map(([crop, name, text, time]) => <div key={text} className="flex gap-2.5 rounded-lg py-2"><PhotoAvatar crop={crop} size={25} /><div className="min-w-0 flex-1"><div className="flex justify-between"><b className="text-[9px]">{name}</b><span className="text-[8px] text-muted">{time}</span></div><p className="mt-1 text-[10px] leading-4 text-muted">{text}</p></div></div>) : <p className="py-8 text-center text-[11px] text-muted">Create a work stream to start a discussion.</p>}
          </div>
          <div className="rounded-lg border border-line p-2.5"><textarea aria-label="Add work comment" rows="2" className="w-full resize-none text-[10px] outline-none" placeholder="Comment on this work or @mention someone..." /><div className="mt-2 flex justify-between"><button className="flex items-center gap-1.5 text-[9px] font-bold text-muted"><UserRound size={12} /> Mention</button><button className="grid h-7 w-7 place-items-center rounded-lg bg-ink text-white"><Send size={12} /></button></div></div>
        </Surface>
      </div>
      {modal && <div className="fixed inset-0 z-[80] grid place-items-center bg-ink/30 p-5 backdrop-blur-sm"><form onSubmit={addWork} className="w-full max-w-sm rounded-2xl border border-line bg-white p-6 shadow-soft"><h2 className="text-[15px] font-bold">New work stream</h2><label className="mt-5 block text-[10px] font-bold">Work stream name<input name="name" autoFocus required className="mt-2 w-full rounded-lg border border-line px-3 py-3 text-[11px] outline-none focus:border-brand" /></label><label className="mt-4 block text-[10px] font-bold">Owner<input name="owner" className="mt-2 w-full rounded-lg border border-line px-3 py-3 text-[11px] outline-none focus:border-brand" /></label><label className="mt-4 block text-[10px] font-bold">Due date<input name="due" placeholder="Jun 30" className="mt-2 w-full rounded-lg border border-line px-3 py-3 text-[11px] outline-none focus:border-brand" /></label><label className="mt-4 block text-[10px] font-bold">Status<select name="status" className="mt-2 w-full rounded-lg border border-line px-3 py-3 text-[11px] outline-none focus:border-brand"><option>To Do</option><option>In Progress</option><option>Blocked</option><option>Completed</option></select></label><div className="mt-5 flex gap-2"><button type="button" onClick={() => setModal(false)} className="flex-1 rounded-lg border border-line py-3 text-[11px] font-bold">Cancel</button><button className="flex-1 rounded-lg bg-ink py-3 text-[11px] font-bold text-white">Create</button></div></form></div>}
    </>
  );
}
