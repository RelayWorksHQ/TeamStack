import Link from "next/link";
import { ArrowRight, CheckCircle2, LayoutGrid, Play, ShieldCheck, Users } from "lucide-react";
import { PublicNav } from "../components/PublicNav";
import { DashboardMockup } from "../components/DashboardMockup";
import { LogoCloud } from "../components/LogoCloud";

const features = [
  [Users, "All your people", "Invite your team, contractors, and clients to the right hubs.", "bg-blue-50 text-brand"],
  [CheckCircle2, "Clear ownership", "Assign work with deadlines and clear expectations.", "bg-violet-50 text-violet-600"],
  [LayoutGrid, "Visible progress", "See updates, activity, and status in real time.", "bg-emerald-50 text-emerald-600"],
  [ShieldCheck, "Verified proof", "Keep a record of decisions, deliverables, and approvals.", "bg-orange-50 text-orange-500"]
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNav />
      <main className="home-shell pb-4">
        <section className="grid items-center gap-10 pb-10 pt-[52px] lg:grid-cols-[350px_minmax(0,1fr)] xl:grid-cols-[365px_minmax(0,1fr)] xl:gap-14">
          <div>
            <span className="eyebrow">The operating workspace for modern teams</span>
            <h1 className="mt-6 text-[38px] font-bold leading-[1.09] tracking-[-.055em] xl:text-[42px]">
              Run the work.<br />See the progress.<br />Keep everyone <span className="text-brand">accountable.</span>
            </h1>
            <p className="mt-5 max-w-[365px] text-[13px] leading-6 text-muted">
              Teamstack brings your people, tasks, deadlines, files, updates, and proof together in one place so work gets done and nothing slips through.
            </p>
            <div className="mt-6 flex gap-3">
              <Link href="/signup" className="flex items-center gap-7 rounded-lg bg-ink px-5 py-3 text-[12px] font-bold text-white shadow-lg shadow-slate-950/10">
                Get started free <ArrowRight size={15} />
              </Link>
              <Link href="/product" className="flex items-center gap-4 rounded-lg border border-line bg-white px-5 py-3 text-[12px] font-bold">
                Watch demo <Play size={14} />
              </Link>
            </div>
            <div className="mt-5 flex gap-6 text-[10px] font-semibold text-muted">
              <span className="flex items-center gap-2"><CheckCircle2 size={14} /> No credit card required</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={14} /> Setup in minutes</span>
            </div>
          </div>
          <div className="home-dashboard-wrap min-w-0">
            <DashboardMockup className="home-dashboard min-w-0" />
          </div>
        </section>

        <section className="grid overflow-hidden rounded-xl border border-line bg-white md:grid-cols-2 lg:grid-cols-4">
          {features.map(([Icon, title, desc, color], index) => (
            <div key={title} className={`flex items-center gap-3.5 px-5 py-4 ${index < 3 ? "lg:border-r lg:border-line" : ""}`}>
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${color}`}><Icon size={20} /></span>
              <div>
                <h2 className="text-[12px] font-bold">{title}</h2>
                <p className="mt-1 text-[10px] leading-[1.5] text-muted">{desc}</p>
              </div>
            </div>
          ))}
        </section>
        <LogoCloud />
      </main>
    </div>
  );
}
