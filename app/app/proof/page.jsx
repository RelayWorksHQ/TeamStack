"use client";

import { Check, FileCheck2, FileImage, ShieldCheck, Stamp } from "lucide-react";
import { useEffect, useState } from "react";
import { AppPageHeader, Status, Surface } from "../../../components/AppShell";
import { readHubData, writeHubData } from "../../../lib/hubDataClient";

const proofIcons = { file: FileCheck2, image: FileImage, stamp: Stamp, check: Check, shield: ShieldCheck };

export default function ProofPage() {
  const [proof, setProof] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const loadProof = async () => setProof(await readHubData("proof", []));
    loadProof();
    window.addEventListener("teamstack:storage", loadProof);
    return () => window.removeEventListener("teamstack:storage", loadProof);
  }, []);

  const addProof = async event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const type = String(form.get("type") || "Approval record").trim();
    const work = String(form.get("work") || "Hub work").trim();
    const status = String(form.get("status") || "Pending").trim();
    if (!name) return;
    const nextProof = [{ icon: type.toLowerCase().includes("screen") ? "image" : type.toLowerCase().includes("sign") ? "stamp" : "file", name, type, work, status, meta: "Azeem Khan · Just now" }, ...proof];
    setProof(nextProof);
    await writeHubData("proof", nextProof);
    setModal(false);
    event.currentTarget.reset();
  };

  return (
    <>
      <AppPageHeader eyebrow="Proof" title="Proof of work" description="Files, screenshots, approvals, completion records, and sign-off in one durable trail." action={<button onClick={() => setModal(true)} className="rounded-xl bg-ink px-4 py-3 text-xs font-bold text-white">Add proof</button>} />
      <div className="grid gap-4 lg:grid-cols-[1fr_310px]">
        <Surface title="Proof records">
          {proof.map(({ icon, name, type, work, status, meta }) => { const Icon = proofIcons[icon] || FileCheck2; return <div key={`${name}-${meta}`} className="grid items-center gap-4 border-b border-line py-4 last:border-0 sm:grid-cols-[auto_1fr_1fr_auto]"><span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-brand"><Icon size={18} /></span><div><div className="text-sm font-bold">{name}</div><div className="mt-1 text-[10px] text-muted">{type}</div></div><div><div className="text-xs font-semibold">{work}</div><div className="mt-1 text-[10px] text-muted">{meta}</div></div><Status tone={status === "Pending" ? "orange" : "green"}>{status}</Status></div>; })}
        </Surface>
        <div className="space-y-4">
          <Surface title="Proof health"><div className="grid place-items-center py-4"><div className="relative grid h-32 w-32 place-items-center rounded-full bg-[conic-gradient(#1677ff_0_86%,#edf1f5_86%_100%)]"><div className="grid h-24 w-24 place-items-center rounded-full bg-white"><div className="text-center"><div className="text-3xl font-bold">86%</div><div className="text-[10px] text-muted">verified</div></div></div></div></div></Surface>
          <Surface title="Sign-off summary"><div className="space-y-3 text-xs"><div className="flex justify-between"><span className="text-muted">Approved</span><b>8</b></div><div className="flex justify-between"><span className="text-muted">Pending</span><b>2</b></div><div className="flex justify-between"><span className="text-muted">Needs changes</span><b>1</b></div></div></Surface>
        </div>
      </div>
      {modal && <div className="fixed inset-0 z-[80] grid place-items-center bg-ink/30 p-5 backdrop-blur-sm"><form onSubmit={addProof} className="w-full max-w-sm rounded-2xl border border-line bg-white p-6 shadow-soft"><h2 className="text-[15px] font-bold">Add proof</h2><label className="mt-5 block text-[10px] font-bold">Proof name<input name="name" autoFocus required className="mt-2 w-full rounded-lg border border-line px-3 py-3 text-[11px] outline-none focus:border-brand" /></label><label className="mt-4 block text-[10px] font-bold">Type<input name="type" defaultValue="Approval record" className="mt-2 w-full rounded-lg border border-line px-3 py-3 text-[11px] outline-none focus:border-brand" /></label><label className="mt-4 block text-[10px] font-bold">Connected work<input name="work" defaultValue="AQD Deployment" className="mt-2 w-full rounded-lg border border-line px-3 py-3 text-[11px] outline-none focus:border-brand" /></label><label className="mt-4 block text-[10px] font-bold">Status<select name="status" className="mt-2 w-full rounded-lg border border-line px-3 py-3 text-[11px] outline-none focus:border-brand"><option>Pending</option><option>Approved</option><option>Verified</option><option>Signed off</option><option>Complete</option></select></label><div className="mt-5 flex gap-2"><button type="button" onClick={() => setModal(false)} className="flex-1 rounded-lg border border-line py-3 text-[11px] font-bold">Cancel</button><button className="flex-1 rounded-lg bg-ink py-3 text-[11px] font-bold text-white">Add proof</button></div></form></div>}
    </>
  );
}
