"use client";

import {
  CalendarDays, CheckCircle2, ChevronDown, Clock3, FileText,
  MessageCircle, NotebookPen
} from "lucide-react";
import { useState } from "react";
import { AppPageHeader, Status, Surface } from "../../../components/AppShell";

const scopes = ["All Work", "Personal Work", "Aleet Hub", "CodeWorks Hub", "DevWork Hub"];
const tabs = ["Overview", "Tasks", "Calendar", "Files", "Notes", "Activity"];

const workItems = [
  { name: "Upload iOS testing build", scope: "Aleet Hub", due: "Today, 5 PM", status: "In Progress", progress: 72 },
  { name: "Review AQD monitoring", scope: "Aleet Hub", due: "Tomorrow", status: "To Do", progress: 20 },
  { name: "Prepare component handoff", scope: "CodeWorks Hub", due: "Jun 22", status: "In Review", progress: 86 },
  { name: "Confirm deployment checklist", scope: "DevWork Hub", due: "Jun 24", status: "To Do", progress: 35 },
  { name: "Plan weekly priorities", scope: "Personal Work", due: "Friday", status: "In Progress", progress: 50 }
];

const schedule = [
  { title: "iOS build progression", scope: "Aleet Hub", date: "Today", time: "5:00 PM" },
  { title: "Component handoff review", scope: "CodeWorks Hub", date: "Tomorrow", time: "11:30 AM" },
  { title: "Deployment checkpoint", scope: "DevWork Hub", date: "Jun 24", time: "3:00 PM" },
  { title: "Weekly personal review", scope: "Personal Work", date: "Friday", time: "4:30 PM" }
];

const updates = [
  { title: "QA requested the latest iOS build", scope: "Aleet Hub", time: "24m ago" },
  { title: "Component handoff moved to review", scope: "CodeWorks Hub", time: "1h ago" },
  { title: "Deployment checklist was updated", scope: "DevWork Hub", time: "3h ago" },
  { title: "Weekly priorities note edited", scope: "Personal Work", time: "Yesterday" }
];

const files = [
  { name: "iOS build notes.pdf", scope: "Aleet Hub", meta: "Updated 38m ago" },
  { name: "Component handoff.fig", scope: "CodeWorks Hub", meta: "Updated 2h ago" },
  { name: "Deployment checklist.docx", scope: "DevWork Hub", meta: "Updated yesterday" },
  { name: "Weekly priorities.md", scope: "Personal Work", meta: "Private note" }
];

const notes = [
  { title: "Launch follow-up", scope: "Aleet Hub", body: "Confirm build number before the next QA pass." },
  { title: "Design review", scope: "CodeWorks Hub", body: "Check empty states and responsive behavior." },
  { title: "Release prep", scope: "DevWork Hub", body: "Verify rollback steps with the deployment owner." },
  { title: "This week", scope: "Personal Work", body: "Protect Friday afternoon for planning and review." }
];

const activityFeed = [
  { icon: CheckCircle2, text: "You completed repository access review", scope: "Aleet Hub", time: "42m ago" },
  { icon: MessageCircle, text: "Maya mentioned you in component handoff", scope: "CodeWorks Hub", time: "1h ago" },
  { icon: FileText, text: "You updated Deployment checklist.docx", scope: "DevWork Hub", time: "3h ago" },
  { icon: NotebookPen, text: "You created Weekly priorities", scope: "Personal Work", time: "Yesterday" }
];

const inScope = (item, scope) => scope === "All Work" || item.scope === scope;
const statusTone = status => status === "Completed" ? "green" : status === "To Do" ? "slate" : "blue";

function EmptyState({ label }) {
  return <div className="py-10 text-center text-[11px] text-muted">No {label.toLowerCase()} in this scope.</div>;
}

export default function MyWorkPage() {
  const [scope, setScope] = useState("All Work");
  const [scopeOpen, setScopeOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");

  const scopedWork = workItems.filter(item => inScope(item, scope));
  const scopedSchedule = schedule.filter(item => inScope(item, scope));
  const scopedUpdates = updates.filter(item => inScope(item, scope));
  const scopedFiles = files.filter(item => inScope(item, scope));
  const scopedNotes = notes.filter(item => inScope(item, scope));
  const scopedActivity = activityFeed.filter(item => inScope(item, scope));

  const scopeSelector = (
    <div className="relative">
      <button
        onClick={() => setScopeOpen(open => !open)}
        aria-haspopup="listbox"
        aria-expanded={scopeOpen}
        className="flex min-w-[170px] items-center justify-between gap-3 rounded-lg border border-line bg-white px-3.5 py-2.5 text-[11px] font-bold shadow-card"
      >
        {scope} <ChevronDown size={14} className={`transition ${scopeOpen ? "rotate-180" : ""}`} />
      </button>
      {scopeOpen && (
        <div role="listbox" aria-label="Work scope" className="absolute right-0 top-full z-20 mt-2 w-[190px] rounded-xl border border-line bg-white p-1.5 shadow-soft">
          {scopes.map(option => (
            <button
              key={option}
              role="option"
              aria-selected={scope === option}
              onClick={() => { setScope(option); setScopeOpen(false); }}
              className={`w-full rounded-lg px-3 py-2.5 text-left text-[11px] font-semibold ${scope === option ? "bg-blue-50 text-brand" : "text-slate-600 hover:bg-slate-50"}`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      <AppPageHeader
        eyebrow="Personal"
        title="My Work"
        description="Work assigned to you across hubs, plus your private personal work."
        action={scopeSelector}
      />

      <div className="mb-4 overflow-x-auto border-b border-line">
        <div className="flex min-w-max gap-6">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`border-b-2 px-1 pb-3 text-[11px] font-bold transition ${activeTab === tab ? "border-brand text-brand" : "border-transparent text-muted hover:text-ink"}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "Overview" && (
        <div className="grid gap-4 xl:grid-cols-[1.3fr_.8fr]">
          <div className="space-y-4">
            <Surface title="Current Work" action={<span className="text-[9px] font-bold text-muted">{scopedWork.length} items</span>}>
              {scopedWork.length === 0 ? <EmptyState label="Current work" /> : scopedWork.map(item => (
                <div key={item.name} className="grid items-center gap-3 border-b border-line py-3 last:border-0 sm:grid-cols-[1fr_110px_90px]">
                  <div>
                    <p className="text-[11px] font-bold">{item.name}</p>
                    <p className="mt-1 text-[9px] text-muted">{item.scope} · {item.due}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 rounded-full bg-slate-100"><div className="h-full rounded-full bg-brand" style={{ width: `${item.progress}%` }} /></div>
                    <span className="text-[9px] font-bold">{item.progress}%</span>
                  </div>
                  <Status tone={statusTone(item.status)}>{item.status}</Status>
                </div>
              ))}
            </Surface>

            <Surface title="Activity Feed">
              {scopedActivity.length === 0 ? <EmptyState label="Activity" /> : scopedActivity.map(({ icon: Icon, text, scope: itemScope, time }) => (
                <div key={text} className="flex items-center gap-3 border-b border-line py-3 last:border-0">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-50 text-brand"><Icon size={14} /></span>
                  <div className="min-w-0 flex-1"><p className="text-[10px] font-semibold">{text}</p><p className="mt-1 text-[9px] text-muted">{itemScope}</p></div>
                  <span className="text-[9px] text-muted">{time}</span>
                </div>
              ))}
            </Surface>
          </div>

          <div className="space-y-4">
            <Surface title="Progression Schedule">
              {scopedSchedule.length === 0 ? <EmptyState label="Schedule items" /> : scopedSchedule.map(item => (
                <div key={item.title} className="flex gap-3 border-b border-line py-3 last:border-0">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-slate-600"><CalendarDays size={14} /></span>
                  <div className="min-w-0 flex-1"><p className="text-[10px] font-bold">{item.title}</p><p className="mt-1 text-[9px] text-muted">{item.scope}</p></div>
                  <div className="text-right"><p className="text-[9px] font-bold">{item.date}</p><p className="mt-1 text-[8px] text-muted">{item.time}</p></div>
                </div>
              ))}
            </Surface>

            <Surface title="Recent Updates">
              {scopedUpdates.length === 0 ? <EmptyState label="Updates" /> : scopedUpdates.map(item => (
                <div key={item.title} className="flex gap-2.5 border-b border-line py-3 last:border-0">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <div className="min-w-0 flex-1"><p className="text-[10px] font-semibold">{item.title}</p><p className="mt-1 text-[9px] text-muted">{item.scope} · {item.time}</p></div>
                </div>
              ))}
            </Surface>

            <Surface title="Files">
              {scopedFiles.length === 0 ? <EmptyState label="Files" /> : scopedFiles.slice(0, 3).map(item => (
                <div key={item.name} className="flex items-center gap-3 border-b border-line py-3 last:border-0">
                  <FileText size={14} className="text-brand" />
                  <div className="min-w-0"><p className="truncate text-[10px] font-semibold">{item.name}</p><p className="mt-1 text-[9px] text-muted">{item.scope} · {item.meta}</p></div>
                </div>
              ))}
            </Surface>
          </div>
        </div>
      )}

      {activeTab === "Tasks" && (
        <Surface title="Tasks">
          {scopedWork.length === 0 ? <EmptyState label="Tasks" /> : scopedWork.map(item => (
            <div key={item.name} className="flex items-center gap-3 border-b border-line py-3 last:border-0">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-50 text-brand">{item.status === "To Do" ? <CheckCircle2 size={15} /> : <Clock3 size={15} />}</span>
              <div className="min-w-0 flex-1"><p className="text-[11px] font-bold">{item.name}</p><p className="mt-1 text-[9px] text-muted">{item.scope} · {item.due}</p></div>
              <Status tone={statusTone(item.status)}>{item.status}</Status>
            </div>
          ))}
        </Surface>
      )}

      {activeTab === "Calendar" && (
        <Surface title="Progression Schedule">
          {scopedSchedule.length === 0 ? <EmptyState label="Calendar items" /> : scopedSchedule.map(item => (
            <div key={item.title} className="grid gap-2 border-b border-line py-4 last:border-0 sm:grid-cols-[110px_1fr_100px]">
              <b className="text-[10px] text-brand">{item.date}</b>
              <div><p className="text-[11px] font-bold">{item.title}</p><p className="mt-1 text-[9px] text-muted">{item.scope}</p></div>
              <span className="text-[10px] text-muted sm:text-right">{item.time}</span>
            </div>
          ))}
        </Surface>
      )}

      {activeTab === "Files" && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {scopedFiles.length === 0 ? <div className="sm:col-span-2 xl:col-span-3"><Surface><EmptyState label="Files" /></Surface></div> : scopedFiles.map(item => (
            <Surface key={item.name}>
              <FileText size={20} className="text-brand" />
              <h2 className="mt-4 text-[12px] font-bold">{item.name}</h2>
              <p className="mt-2 text-[9px] text-muted">{item.scope}</p>
              <p className="mt-5 border-t border-line pt-3 text-[9px] text-muted">{item.meta}</p>
            </Surface>
          ))}
        </div>
      )}

      {activeTab === "Notes" && (
        <div className="grid gap-4 md:grid-cols-2">
          {scopedNotes.length === 0 ? <div className="md:col-span-2"><Surface><EmptyState label="Notes" /></Surface></div> : scopedNotes.map(note => (
            <Surface key={note.title}>
              <div className="flex items-center gap-2"><NotebookPen size={15} className="text-brand" /><h2 className="text-[12px] font-bold">{note.title}</h2></div>
              <p className="mt-3 text-[10px] leading-5 text-slate-600">{note.body}</p>
              <p className="mt-4 text-[9px] text-muted">{note.scope}</p>
            </Surface>
          ))}
        </div>
      )}

      {activeTab === "Activity" && (
        <Surface title="Activity Feed">
          {scopedActivity.length === 0 ? <EmptyState label="Activity" /> : scopedActivity.map(({ icon: Icon, text, scope: itemScope, time }) => (
            <div key={text} className="flex items-center gap-3 border-b border-line py-4 last:border-0">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-50 text-brand"><Icon size={15} /></span>
              <div className="min-w-0 flex-1"><p className="text-[11px] font-semibold">{text}</p><p className="mt-1 text-[9px] text-muted">{itemScope}</p></div>
              <span className="text-[9px] text-muted">{time}</span>
            </div>
          ))}
        </Surface>
      )}
    </>
  );
}
