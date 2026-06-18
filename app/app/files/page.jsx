import { FileImage, FileText, Github, Link2, Plus, Search } from "lucide-react";
import { AppPageHeader, Status } from "../../../components/AppShell";

const files = [
  [Github, "Driver Portal Repo", "github.com/aleet/driver-portal", "GitHub", "Azeem Khan", "2h ago"],
  [FileText, "Deployment Notes", "Deployment Notes.pdf", "PDF", "Azeem Khan", "2h ago"],
  [FileText, "Testing Results", "Driver Presence Results.docx", "Document", "QA Team", "6h ago"],
  [FileImage, "Driver Portal Screenshots", "8 visual records", "Images", "Maya Chen", "1d ago"],
  [FileText, "Contractor Agreement", "Azeem Contractor Agreement.pdf", "Contract", "Operations", "Jun 12"]
];

export default function FilesPage() {
  return (
    <>
      <AppPageHeader eyebrow="Files" title="Files and links" description="The source material and deliverables connected to this hub." action={<button className="flex items-center gap-2 rounded-xl bg-ink px-4 py-3 text-xs font-bold text-white"><Plus size={16} /> Add file</button>} />
      <div className="mb-5 flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-3 sm:max-w-sm"><Search size={16} className="text-slate-400" /><input className="w-full text-sm outline-none" placeholder="Search files..." /></div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {files.map(([Icon, name, detail, type, owner, time]) => <article key={name} className="rounded-2xl border border-line bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft"><div className="flex items-start justify-between"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-brand"><Icon size={22} /></span><Status tone="slate">{type}</Status></div><h2 className="mt-5 font-bold">{name}</h2><p className="mt-2 truncate text-xs text-muted">{detail}</p><div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-[10px] text-muted"><span>{owner}</span><span>{time}</span></div></article>)}
      </div>
    </>
  );
}
