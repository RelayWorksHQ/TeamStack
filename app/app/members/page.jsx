import { Plus } from "lucide-react";
import { AppPageHeader, Status, Surface } from "../../../components/AppShell";

const members = [
  ["AK", "Azeem Khan", "Hub owner", "All Aleet hubs", "Active", "12 min ago"],
  ["MC", "Maya Chen", "Product designer", "Driver Portal", "Active", "1h ago"],
  ["OE", "Omar Ellis", "Operations lead", "Aleet, Driver Portal", "Active", "2h ago"],
  ["QA", "QA Team", "Quality assurance", "Driver Portal", "Active", "35 min ago"],
  ["JL", "Jordan Lee", "Contractor", "Driver Portal", "Invited", "Not joined"],
  ["SN", "Sam Noor", "Developer", "Driver Portal", "Away", "Yesterday"]
];

export default function MembersPage() {
  return (
    <>
      <AppPageHeader eyebrow="Members" title="People in this hub" description="Manage roles, access, availability, and recent activity." action={<button className="flex items-center gap-2 rounded-xl bg-ink px-4 py-3 text-xs font-bold text-white"><Plus size={16} /> Add Member</button>} />
      <Surface className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] text-left"><thead><tr className="border-b border-line bg-[#fbfcfe] text-[10px] uppercase tracking-widest text-slate-400">{["Name", "Role", "Hub access", "Status", "Last activity"].map(h => <th key={h} className="px-5 py-4">{h}</th>)}</tr></thead><tbody>{members.map(([initials, name, role, access, status, activity]) => <tr key={name} className="border-b border-line last:border-0"><td className="px-5 py-4"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-100 text-[11px] font-black">{initials}</span><span className="text-sm font-bold">{name}</span></div></td><td className="px-5 py-4 text-xs text-muted">{role}</td><td className="px-5 py-4 text-xs font-semibold">{access}</td><td className="px-5 py-4"><Status tone={status === "Active" ? "green" : status === "Invited" ? "blue" : "slate"}>{status}</Status></td><td className="px-5 py-4 text-xs text-muted">{activity}</td></tr>)}</tbody></table>
        </div>
      </Surface>
    </>
  );
}
