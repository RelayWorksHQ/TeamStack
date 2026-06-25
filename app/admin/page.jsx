import Link from "next/link";
import { LockKeyhole, ShieldX } from "lucide-react";
import { Brand } from "../../components/Brand";

const protectedAreas = ["Users", "Plans & pricing", "Hubs", "Billing status", "Account limits", "Platform settings"];

export default function AdminPage() {
  const platformAdmin = false;

  if (!platformAdmin) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f8fafc] p-6">
        <div className="w-full max-w-md rounded-2xl border border-line bg-white p-8 text-center shadow-soft">
          <div className="mx-auto mb-7 w-fit"><Brand /></div>
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-red-50 text-red-600"><ShieldX size={23} /></span>
          <h1 className="mt-5 text-2xl font-bold tracking-[-.04em]">Access denied</h1>
          <p className="mt-3 text-[12px] leading-6 text-muted">This private control portal is restricted to Teamstack platform owner and administrator accounts.</p>
          <Link href="/app" className="mt-6 inline-flex rounded-lg bg-ink px-5 py-3 text-[11px] font-bold text-white">Return to Hub</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] p-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between"><Brand /><span className="flex items-center gap-2 text-[10px] font-bold text-muted"><LockKeyhole size={13} /> Private control portal</span></div>
        <h1 className="mt-10 text-3xl font-bold">Platform administration</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-3">{protectedAreas.map(area => <section key={area} className="rounded-xl border border-line bg-white p-5"><h2 className="text-sm font-bold">{area}</h2><p className="mt-2 text-[10px] text-muted">Protected management area.</p></section>)}</div>
      </div>
    </main>
  );
}
