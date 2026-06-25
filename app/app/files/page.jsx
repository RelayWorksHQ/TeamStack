"use client";

import { Download, ExternalLink, FileImage, FileText, Github, Link2, Plus, Search, UploadCloud } from "lucide-react";
import { useEffect, useState } from "react";
import { AppPageHeader, Status } from "../../../components/AppShell";
import { readHubData, writeHubData } from "../../../lib/hubDataClient";

const fileIcons = { github: Github, image: FileImage, link: Link2, text: FileText };

function typeForFile(file) {
  if (!file) return "File";
  if (file.type?.startsWith("image/")) return "Image";
  if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) return "PDF";
  if (/\.(doc|docx|txt|rtf)$/i.test(file.name)) return "Document";
  return "File";
}

export default function FilesPage() {
  const [files, setFiles] = useState([]);
  const [modal, setModal] = useState(false);
  const [entryMode, setEntryMode] = useState("Link");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const loadFiles = async () => setFiles(await readHubData("files", []));
    loadFiles();
    window.addEventListener("teamstack:storage", loadFiles);
    return () => window.removeEventListener("teamstack:storage", loadFiles);
  }, []);

  const addFile = async event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const mode = String(form.get("mode") || "Link");
    const url = String(form.get("url") || "").trim();
    const upload = form.get("upload");
    const uploadName = String(form.get("uploadName") || "").trim();
    if (!name) return;
    if (mode === "Link" && !url) return;
    if (mode === "File Upload" && (!upload || !upload.name) && !uploadName) return;

    const fileMeta = upload?.name ? upload : { name: uploadName, type: "" };
    const type = mode === "Link" ? "Link" : typeForFile(fileMeta);
    const detail = mode === "Link" ? url : fileMeta.name;
    const icon = mode === "Link" ? "link" : type === "Image" ? "image" : "text";
    const nextFiles = [{
      icon,
      name,
      detail,
      type,
      owner: "Azeem Khan",
      time: "Just now",
      href: mode === "Link" ? url : "",
      fileName: mode === "File Upload" ? fileMeta.name : "",
      fileSize: mode === "File Upload" ? upload?.size || 0 : 0,
      source: mode
    }, ...files];
    setFiles(nextFiles);
    await writeHubData("files", nextFiles);
    setModal(false);
    setEntryMode("Link");
    setSelectedFile(null);
    event.currentTarget.reset();
  };

  return (
    <>
      <AppPageHeader eyebrow="Files" title="Files and links" description="The source material and deliverables connected to this hub." action={<button onClick={() => setModal(true)} className="flex items-center gap-2 rounded-xl bg-ink px-4 py-3 text-xs font-bold text-white"><Plus size={16} /> Add file</button>} />
      <div className="mb-5 flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-3 sm:max-w-sm"><Search size={16} className="text-slate-400" /><input className="w-full text-sm outline-none" placeholder="Search files..." /></div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {files.map(({ icon, name, detail, type, owner, time, href, source }) => { const Icon = fileIcons[icon] || FileText; return <article key={`${name}-${time}-${detail}`} className="rounded-2xl border border-line bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft"><div className="flex items-start justify-between"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-brand"><Icon size={22} /></span><Status tone="slate">{type || "File"}</Status></div><h2 className="mt-5 font-bold">{name}</h2><p className="mt-2 truncate text-xs text-muted">{detail}</p>{href ? <a href={href} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-[10px] font-bold text-brand"><ExternalLink size={13} /> Open link</a> : source === "File Upload" ? <button className="mt-4 inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-[10px] font-bold text-brand"><Download size={13} /> Open file</button> : null}<div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-[10px] text-muted"><span>{owner}</span><span>{time}</span></div></article>; })}
      </div>
      {modal && <div className="fixed inset-0 z-[80] grid place-items-center bg-ink/30 p-5 backdrop-blur-sm"><form onSubmit={addFile} className="w-full max-w-sm rounded-2xl border border-line bg-white p-6 shadow-soft"><h2 className="text-[15px] font-bold">Add file or link</h2><label className="mt-5 block text-[10px] font-bold">Name<input name="name" autoFocus required className="mt-2 w-full rounded-lg border border-line px-3 py-3 text-[11px] outline-none focus:border-brand" /></label><label className="mt-4 block text-[10px] font-bold">Type<select name="mode" value={entryMode} onChange={event => { setEntryMode(event.target.value); setSelectedFile(null); }} className="mt-2 w-full rounded-lg border border-line px-3 py-3 text-[11px] outline-none focus:border-brand"><option>Link</option><option>File Upload</option></select></label>{entryMode === "Link" ? <label className="mt-4 block text-[10px] font-bold">URL<input name="url" required placeholder="https://..." className="mt-2 w-full rounded-lg border border-line px-3 py-3 text-[11px] outline-none focus:border-brand" /></label> : <><label className="mt-4 block cursor-pointer rounded-xl border border-dashed border-slate-300 bg-[#fbfcfe] p-5 text-center"><UploadCloud size={22} className="mx-auto text-brand" /><span className="mt-2 block text-[10px] font-bold">Choose a local file</span><span className="mt-1 block truncate text-[10px] text-muted">{selectedFile?.name || "File metadata is stored locally for now."}</span><input name="upload" type="file" className="hidden" onChange={event => setSelectedFile(event.target.files?.[0] || null)} /></label><label className="mt-4 block text-[10px] font-bold">File metadata<input name="uploadName" placeholder="filename.pdf" className="mt-2 w-full rounded-lg border border-line px-3 py-3 text-[11px] outline-none focus:border-brand" /></label></>}<div className="mt-5 flex gap-2"><button type="button" onClick={() => { setModal(false); setEntryMode("Link"); setSelectedFile(null); }} className="flex-1 rounded-lg border border-line py-3 text-[11px] font-bold">Cancel</button><button className="flex-1 rounded-lg bg-ink py-3 text-[11px] font-bold text-white">Add file</button></div></form></div>}
    </>
  );
}
