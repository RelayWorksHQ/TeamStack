import { Plus } from "lucide-react";
import { AppPageHeader, Status, Surface } from "../../../components/AppShell";

const tasks = [
  ["Map driver onboarding states", "Azeem Khan", "Jun 20", "Jun 18, Jun 19", "In Progress", "Pending"],
  ["Deploy AQD connection fix", "Omar Ellis", "Jun 21", "Jun 19, Jun 20", "Review", "Requested"],
  ["Test driver presence alerts", "QA Team", "Jun 22", "Jun 19, Jun 21", "At Risk", "Pending"],
  ["Upload deployment notes", "Maya Chen", "Jun 20", "Jun 20", "Completed", "Approved"],
  ["Confirm production repo access", "Azeem Khan", "Jun 18", "Jun 18", "Completed", "Approved"]
];

export default function TasksPage() {
  return (
    <>
      <AppPageHeader eyebrow="Tasks" title="Tasks and checkpoints" description="Every task connects to a final date, progression cadence, and approval state." action={<button className="flex items-center gap-2 rounded-xl bg-ink px-4 py-3 text-xs font-bold text-white"><Plus size={16} /> Add task</button>} />
      <Surface className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead><tr className="border-b border-line bg-[#fbfcfe] text-[9px] uppercase tracking-widest text-slate-400">{["Task name", "Owner", "Final completion", "Progression dates", "Status", "Approval", "Thread"].map(h => <th key={h} className="px-4 py-3 font-bold">{h}</th>)}</tr></thead>
            <tbody>{tasks.map(([name, owner, final, progression, status, approval], index) => <tr key={name} className="border-b border-line last:border-0"><td className="px-4 py-3 text-[11px] font-bold">{name}</td><td className="px-4 py-3 text-[10px] text-muted">{owner}</td><td className="px-4 py-3 text-[10px] font-semibold">{final}</td><td className="px-4 py-3 text-[10px] text-muted">{progression}</td><td className="px-4 py-3"><Status tone={status === "Completed" ? "green" : status === "At Risk" ? "orange" : "blue"}>{status}</Status></td><td className="px-4 py-3"><Status tone={approval === "Approved" ? "green" : "slate"}>{approval}</Status></td><td className="px-4 py-3"><a href="/app/work" className="text-[9px] font-bold text-brand">{index + 2} comments</a></td></tr>)}</tbody>
          </table>
        </div>
      </Surface>
    </>
  );
}
