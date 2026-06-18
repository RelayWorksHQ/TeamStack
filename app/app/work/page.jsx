"use client";

import { Plus } from "lucide-react";
import { AppPageHeader, Status } from "../../../components/AppShell";

const groups = [
  ["To Do", "slate", [["Document fallback states", "Maya Chen", "Jun 25", 10], ["Review driver contract copy", "Azeem Khan", "Jun 26", 0]]],
  ["In Progress", "blue", [["Driver Onboarding Flow", "Azeem Khan", "Jun 24", 78], ["Driver Presence Testing", "QA Team", "Jun 22", 34]]],
  ["Review", "orange", [["AQD deployment validation", "Omar Ellis", "Jun 21", 90]]],
  ["Completed", "green", [["Connect Driver Portal repo", "Azeem Khan", "Jun 18", 100], ["AQD production fix", "Azeem Khan", "Jun 17", 100]]]
];

export default function WorkPage() {
  return (
    <>
      <AppPageHeader eyebrow="Work" title="Work in motion" description="Track operational outcomes from ownership through proof and completion." action={<button className="flex items-center gap-2 rounded-xl bg-ink px-4 py-3 text-xs font-bold text-white"><Plus size={16} /> New work</button>} />
      <div className="grid gap-4 xl:grid-cols-4">
        {groups.map(([group, tone, cards]) => (
          <section key={group} className="rounded-2xl border border-line bg-[#fbfcfe] p-3">
            <div className="flex items-center justify-between px-2 py-2"><h2 className="text-sm font-bold">{group}</h2><span className="grid h-6 w-6 place-items-center rounded-full bg-white text-[10px] font-bold shadow-card">{cards.length}</span></div>
            <div className="mt-2 space-y-3">
              {cards.map(([name, owner, due, progress]) => (
                <article key={name} className="rounded-xl border border-line bg-white p-4 shadow-card">
                  <div className="mb-3 flex items-start justify-between gap-2"><h3 className="text-sm font-bold leading-5">{name}</h3><Status tone={tone}>{group}</Status></div>
                  <div className="text-[11px] text-muted">{owner} · Due {due}</div>
                  <div className="mt-4 flex items-center gap-3"><div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${tone === "green" ? "bg-emerald-500" : tone === "orange" ? "bg-orange-500" : "bg-brand"}`} style={{width: `${progress}%`}} /></div><span className="text-[10px] font-bold">{progress}%</span></div>
                </article>
              ))}
              <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-200 py-3 text-xs font-bold text-muted hover:border-blue-200 hover:text-brand"><Plus size={14} /> Add item</button>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
