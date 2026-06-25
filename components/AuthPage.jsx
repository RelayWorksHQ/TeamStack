"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Brand } from "./Brand";

export function AuthPage({ signup = false }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitAuth = async event => {
    event.preventDefault();
    const formElement = event.currentTarget.closest?.("form") || event.currentTarget;
    const form = new FormData(formElement);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim().toLowerCase();
    const password = String(form.get("password") || "");
    if (!email || !password || (signup && !name)) return;

    setLoading(true);
    setError("");
    const response = await fetch(signup ? "/api/auth/signup" : "/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });
    const data = await response.json().catch(() => ({}));
    setLoading(false);

    if (!response.ok) {
      setError(data.error || "Something went wrong. Please try again.");
      return;
    }

    if (signup) {
      router.push(`/verify-email?email=${encodeURIComponent(email)}`);
      return;
    }

    const nextPath = new URLSearchParams(window.location.search).get("next") || "/app";
    router.push(nextPath);
  };

  return (
    <main className="grid min-h-screen bg-white lg:grid-cols-[1fr_.9fr]">
      <section className="flex min-h-screen flex-col p-6 sm:p-10">
        <Brand />
        <div className="mx-auto my-auto w-full max-w-[430px] py-12">
          <p className="section-kicker">{signup ? "Start free" : "Welcome back"}</p>
          <h1 className="mt-3 text-4xl font-bold tracking-[-.045em]">{signup ? "Create your workspace." : "Log in to Teamstack."}</h1>
          <p className="mt-3 text-sm leading-6 text-muted">{signup ? "Set up your first hub and bring the work into focus." : "Continue to your hubs, work, and team activity."}</p>
          <form onSubmit={submitAuth} className="mt-8 space-y-4">
            {signup && <label className="block text-xs font-bold">Name<input required name="name" type="text" placeholder="Your name" className="mt-2 w-full rounded-xl border border-line px-4 py-3.5 text-sm outline-none focus:border-brand" /></label>}
            <label className="block text-xs font-bold">Email<input required name="email" type="email" placeholder="you@company.com" className="mt-2 w-full rounded-xl border border-line px-4 py-3.5 text-sm outline-none focus:border-brand" /></label>
            <label className="block text-xs font-bold">Password<input required name="password" type="password" placeholder="••••••••" className="mt-2 w-full rounded-xl border border-line px-4 py-3.5 text-sm outline-none focus:border-brand" /></label>
            {error && <p className="rounded-lg bg-orange-50 px-3 py-2 text-xs font-semibold text-orange-700">{error}</p>}
            <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-3 rounded-xl bg-ink px-4 py-4 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-70">{loading ? "Please wait..." : signup ? "Create account" : "Log in"} <ArrowRight size={16} /></button>
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
