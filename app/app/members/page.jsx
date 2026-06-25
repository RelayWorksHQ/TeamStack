import { Plus } from "lucide-react";
import { AppPageHeader, Status, Surface } from "../../../components/AppShell";

const members = [
  ["AK", "Azeem Khan", "Owner", "Full hub, billing, settings", "Active", "12 min ago"],
  ["OE", "Omar Ellis", "Admin", "Members, work, proof, settings", "Active", "2h ago"],
  ["MC", "Maya Chen", "Member", "Assigned and shared hub work", "Active", "1h ago"],
  ["QA", "QA Team", "Contractor", "Assigned work, files, messages", "Active", "35 min ago"],
  ["JL", "Jordan Lee", "Client / Guest", "Approved areas only", "Invited", "Not joined"],
  ["SN", "Sam Noor", "Member", "Assigned and shared hub work", "Away", "Yesterday"]
];

export default function MembersPage() {
  return (
    <>
      <AppPageHeader eyebrow="Hub members" title="People and access" description="Owners and admins control what members, contractors, clients, and guests can see." action={<button className="flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-[11px] font-bold text-white"><Plus size={14} /> Add Member</button>} />
      <Surface className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] text-left"><thead><tr className="border-b border-line bg-[#fbfcfe] text-[9px] uppercase tracking-widest text-slate-400">{["Name", "Role", "Hub access", "Status", "Last activity"].map(h => <th key={h} className="px-4 py-3">{h}</th>)}</tr></thead><tbody>{members.map(([initials, name, role, access, status, activity]) => <tr key={name} className="border-b border-line last:border-0"><td className="px-4 py-3"><div className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-[10px] font-black">{initials}</span><span className="text-[11px] font-bold">{name}</span></div></td><td className="px-4 py-3 text-[10px] font-semibold">{role}</td><td className="px-4 py-3 text-[10px] text-muted">{access}</td><td className="px-4 py-3"><Status tone={status === "Active" ? "green" : status === "Invited" ? "blue" : "slate"}>{status}</Status></td><td className="px-4 py-3 text-[10px] text-muted">{activity}</td></tr>)}</tbody></table>
        </div>
      </Surface>
    </>
  );
}
