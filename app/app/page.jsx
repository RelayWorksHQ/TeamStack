import { Activity, CalendarDays, CheckCircle2, CircleAlert, Clock3, FileText, Link2, ListTodo, Users } from "lucide-react";
import { AppPageHeader, Status, Surface } from "../../components/AppShell";

const stats = [
  [Users, "Members", "6", "+2 contractors", "blue"],
  [ListTodo, "Tasks", "18", "Across 3 work items", "blue"],
  [CheckCircle2, "Completed", "12", "67% completion rate", "green"],
  [CircleAlert, "At Risk", "1", "Needs attention", "orange"],
  [Clock3, "Due Soon", "3", "Due this week", "slate"]
];

export default function OverviewPage() {
  return (
    <>
      <AppPageHeader eyebrow="Hub overview" title="Good afternoon, Azeem." description="Here’s what’s moving inside Launch Crew — Aleet Driver Portal." />
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-5">
        {stats.map(([Icon, label, value, note, tone]) => (
          <div key={label} className="rounded-2xl border border-line bg-white p-5 shadow-card">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600"><span className={`grid h-8 w-8 place-items-center rounded-xl ${tone === "green" ? "bg-emerald-50 text-emerald-600" : tone === "orange" ? "bg-orange-50 text-orange-600" : "bg-blue-50 text-brand"}`}><Icon size={16} /></span>{label}</div>
            <div className="mt-5 text-3xl font-bold tracking-[-.05em]">{value}</div><div className="mt-1 text-[11px] text-muted">{note}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-[1.2fr_.8fr]">
        <Surface title="Current Work" action={<a href="/app/work" className="text-xs font-bold text-brand">View all</a>}>
          {[["Driver Onboarding Flow", "Azeem", "Jun 24", 78, "On Track"], ["AQD Deployment", "Azeem", "Jun 24", 62, "On Track"], ["Driver Presence Testing", "QA Team", "Jun 22", 34, "At Risk"]].map(([name, owner, date, progress, status]) => (
            <div key={name} className="grid items-center gap-4 border-b border-line py-4 last:border-0 sm:grid-cols-[1fr_100px_130px_auto]">
              <div><div className="text-sm font-bold">{name}</div><div className="mt-1 text-[11px] text-muted">{owner} · Final {date}</div></div>
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${status === "At Risk" ? "bg-orange-500" : "bg-brand"}`} style={{width: `${progress}%`}} /></div>
              <span className="text-xs font-bold">{progress}% complete</span><Status tone={status === "At Risk" ? "orange" : "green"}>{status}</Status>
            </div>
          ))}
        </Surface>
        <Surface title="Progression Schedule" action={<a href="/app/calendar" className="text-xs font-bold text-brand">View calendar</a>}>
          {[["Tue", "18", "5 PM–8 PM"], ["Wed", "19", "5 PM–8 PM"], ["Thu", "20", "5 PM–8 PM"]].map(([day, date, time]) => (
            <div key={day} className="flex items-center gap-4 border-b border-line py-3 last:border-0"><span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-xs font-bold text-brand">{day}</span><div className="flex-1"><div className="text-sm font-bold">June {date}</div><div className="text-[11px] text-muted">Expected update window</div></div><span className="text-xs font-bold">{time}</span></div>
          ))}
          <div className="mt-4 rounded-xl bg-ink p-4 text-white"><div className="text-[10px] uppercase tracking-widest text-slate-400">Next update</div><div className="mt-2 text-xl font-bold">Today · 5:00 PM</div></div>
        </Surface>
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <Surface title="Recent Updates" action={<a href="/app/updates" className="text-xs font-bold text-brand">View all</a>}>
          {[["Driver Portal connected", "Azeem", "2h ago"], ["AQD fix deployed", "Azeem", "4h ago"], ["Testing started", "QA Team", "6h ago"]].map(([text, owner, time]) => <div key={text} className="flex gap-3 border-b border-line py-3 last:border-0"><span className="mt-1.5 h-2 w-2 rounded-full bg-emerald-500" /><div className="flex-1"><div className="text-sm font-bold">{text}</div><div className="mt-1 text-[11px] text-muted">{owner} · {time}</div></div></div>)}
        </Surface>
        <Surface title="Files" action={<a href="/app/files" className="text-xs font-bold text-brand">View all</a>}>
          {[["Driver Portal Repo", Link2, "GitHub"], ["Deployment Notes", FileText, "PDF"], ["Testing Results", FileText, "Document"]].map(([name, Icon, type]) => <div key={name} className="flex items-center gap-3 border-b border-line py-3 last:border-0"><span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-100"><Icon size={16} /></span><div className="flex-1 text-sm font-bold">{name}</div><span className="text-[10px] font-bold text-muted">{type}</span></div>)}
        </Surface>
      </div>
      <Surface title="Activity Feed" className="mt-4">
        <div className="grid gap-4 md:grid-cols-3">
          {["Azeem uploaded Deployment Notes.pdf", "QA Team marked Driver Presence Testing in progress", "Azeem completed AQD Fix"].map((text, i) => <div key={text} className="flex gap-3 rounded-xl bg-[#f7f9fc] p-4"><Activity size={17} className={i === 2 ? "text-emerald-500" : "text-brand"} /><div><div className="text-xs font-bold leading-5">{text}</div><div className="mt-1 text-[10px] text-muted">{i === 0 ? "2 hours ago" : i === 1 ? "6 hours ago" : "1 day ago"}</div></div></div>)}
        </div>
      </Surface>
    </>
  );
}
