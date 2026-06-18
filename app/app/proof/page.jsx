import { Check, FileCheck2, FileImage, ShieldCheck, Stamp } from "lucide-react";
import { AppPageHeader, Status, Surface } from "../../../components/AppShell";

const proof = [
  [FileCheck2, "Deployment Notes.pdf", "Uploaded file", "AQD Deployment", "Approved", "Azeem Khan · Today 2:10 PM"],
  [FileImage, "Production connection.png", "Screenshot", "Driver Portal Connection", "Verified", "Maya Chen · Today 1:44 PM"],
  [Stamp, "AQD deployment approval", "Approval record", "AQD Deployment", "Signed off", "Omar Ellis · Today 11:30 AM"],
  [Check, "Repository connection", "Completed work", "Driver Portal Connection", "Complete", "Azeem Khan · Yesterday"],
  [ShieldCheck, "QA validation record", "Sign-off status", "Driver Presence Testing", "Pending", "QA Team · Updated 2h ago"]
];

export default function ProofPage() {
  return (
    <>
      <AppPageHeader eyebrow="Proof" title="Proof of work" description="Files, screenshots, approvals, completion records, and sign-off in one durable trail." action={<button className="rounded-xl bg-ink px-4 py-3 text-xs font-bold text-white">Add proof</button>} />
      <div className="grid gap-4 lg:grid-cols-[1fr_310px]">
        <Surface title="Proof records">
          {proof.map(([Icon, name, type, work, status, meta]) => <div key={name} className="grid items-center gap-4 border-b border-line py-4 last:border-0 sm:grid-cols-[auto_1fr_1fr_auto]"><span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-brand"><Icon size={18} /></span><div><div className="text-sm font-bold">{name}</div><div className="mt-1 text-[10px] text-muted">{type}</div></div><div><div className="text-xs font-semibold">{work}</div><div className="mt-1 text-[10px] text-muted">{meta}</div></div><Status tone={status === "Pending" ? "orange" : "green"}>{status}</Status></div>)}
        </Surface>
        <div className="space-y-4">
          <Surface title="Proof health"><div className="grid place-items-center py-4"><div className="relative grid h-32 w-32 place-items-center rounded-full bg-[conic-gradient(#1677ff_0_86%,#edf1f5_86%_100%)]"><div className="grid h-24 w-24 place-items-center rounded-full bg-white"><div className="text-center"><div className="text-3xl font-bold">86%</div><div className="text-[10px] text-muted">verified</div></div></div></div></div></Surface>
          <Surface title="Sign-off summary"><div className="space-y-3 text-xs"><div className="flex justify-between"><span className="text-muted">Approved</span><b>8</b></div><div className="flex justify-between"><span className="text-muted">Pending</span><b>2</b></div><div className="flex justify-between"><span className="text-muted">Needs changes</span><b>1</b></div></div></Surface>
        </div>
      </div>
    </>
  );
}
