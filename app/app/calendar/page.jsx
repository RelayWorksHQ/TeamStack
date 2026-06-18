import { CalendarDays, ChevronLeft, ChevronRight, Clock3 } from "lucide-react";
import { AppPageHeader, Surface } from "../../../components/AppShell";

const days = [
  ["Monday", "17", []],
  ["Tuesday", "18", [["Progression window", "5 PM–8 PM", "blue"], ["Driver onboarding check", "6:30 PM", "slate"]]],
  ["Wednesday", "19", [["Progression window", "5 PM–8 PM", "blue"], ["AQD deployment review", "7:00 PM", "orange"]]],
  ["Thursday", "20", [["Progression window", "5 PM–8 PM", "blue"], ["Weekly proof sign-off", "7:30 PM", "green"]]],
  ["Friday", "21", [["Final completion: AQD", "5:00 PM", "orange"]]]
];

export default function CalendarPage() {
  return (
    <>
      <AppPageHeader eyebrow="Calendar" title="June 17–21, 2026" description="Progression dates, update windows, reviews, and final completion dates." action={<div className="flex gap-2"><button className="rounded-xl border border-line bg-white p-3"><ChevronLeft size={16} /></button><button className="rounded-xl border border-line bg-white px-4 text-xs font-bold">Today</button><button className="rounded-xl border border-line bg-white p-3"><ChevronRight size={16} /></button></div>} />
      <Surface className="p-0">
        <div className="grid min-w-[800px] grid-cols-5 overflow-x-auto">
          {days.map(([day, date, events]) => <div key={day} className="min-h-[510px] border-r border-line p-3 last:border-0"><div className="border-b border-line pb-4 text-center"><div className="text-[10px] font-bold uppercase tracking-widest text-muted">{day}</div><div className={`mx-auto mt-2 grid h-10 w-10 place-items-center rounded-full text-lg font-bold ${date === "18" ? "bg-brand text-white" : ""}`}>{date}</div></div><div className="mt-3 space-y-3">{events.map(([name, time, tone]) => <div key={name} className={`rounded-xl border p-3 ${tone === "blue" ? "border-blue-100 bg-blue-50 text-blue-900" : tone === "orange" ? "border-orange-100 bg-orange-50 text-orange-900" : tone === "green" ? "border-emerald-100 bg-emerald-50 text-emerald-900" : "border-line bg-slate-50"}`}><div className="text-xs font-bold leading-5">{name}</div><div className="mt-2 flex items-center gap-1.5 text-[10px] opacity-70"><Clock3 size={11} />{time}</div></div>)}</div></div>)}
        </div>
      </Surface>
    </>
  );
}
