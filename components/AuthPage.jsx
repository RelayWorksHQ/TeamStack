import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Brand } from "./Brand";

export function AuthPage({ signup = false }) {
  return (
    <main className="grid min-h-screen bg-white lg:grid-cols-[1fr_.9fr]">
      <section className="flex min-h-screen flex-col p-6 sm:p-10">
        <Brand />
        <div className="mx-auto my-auto w-full max-w-[430px] py-12">
          <p className="section-kicker">{signup ? "Start free" : "Welcome back"}</p>
          <h1 className="mt-3 text-4xl font-bold tracking-[-.045em]">{signup ? "Create your workspace." : "Log in to Teamstack."}</h1>
          <p className="mt-3 text-sm leading-6 text-muted">{signup ? "Set up your first hub and bring the work into focus." : "Continue to your hubs, work, and team activity."}</p>
          <form className="mt-8 space-y-4">
            {signup && <label className="block text-xs font-bold">Name<input required type="text" placeholder="Your name" className="mt-2 w-full rounded-xl border border-line px-4 py-3.5 text-sm outline-none focus:border-brand" /></label>}
            <label className="block text-xs font-bold">Email<input required type="email" placeholder="you@company.com" className="mt-2 w-full rounded-xl border border-line px-4 py-3.5 text-sm outline-none focus:border-brand" /></label>
            <label className="block text-xs font-bold">Password<input required type="password" placeholder="••••••••" className="mt-2 w-full rounded-xl border border-line px-4 py-3.5 text-sm outline-none focus:border-brand" /></label>
            <Link href="/app" className="flex w-full items-center justify-center gap-3 rounded-xl bg-ink px-4 py-4 text-sm font-bold text-white">{signup ? "Create workspace" : "Log in"} <ArrowRight size={16} /></Link>
          </form>
          <p className="mt-6 text-center text-xs text-muted">{signup ? "Already have an account?" : "New to Teamstack?"} <Link href={signup ? "/login" : "/signup"} className="font-bold text-brand">{signup ? "Log in" : "Create an account"}</Link></p>
        </div>
      </section>
      <aside className="relative hidden overflow-hidden bg-ink p-12 text-white lg:flex lg:flex-col lg:justify-center">
        <div className="absolute inset-0 opacity-10 grid-fade" />
        <div className="relative mx-auto max-w-lg">
          <span className="eyebrow border-white/10 bg-white/10 text-blue-200">The operating workspace</span>
          <h2 className="mt-8 text-5xl font-bold leading-tight tracking-[-.055em]">Every person. Every update. One accountable record.</h2>
          <div className="mt-10 space-y-4">{["Switch cleanly between every hub", "Keep work, files, and proof together", "See exactly what changed and when"].map(item => <div key={item} className="flex items-center gap-3 text-sm font-semibold text-slate-300"><CheckCircle2 size={18} className="text-blue-400" />{item}</div>)}</div>
        </div>
      </aside>
    </main>
  );
}
