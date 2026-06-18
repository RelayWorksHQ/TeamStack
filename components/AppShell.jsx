"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { Brand } from "./Brand";
import { HubSwitcher, navItems, PhotoAvatar } from "./DashboardMockup";

export function AppShell({ children }) {
  const pathname = usePathname();
  const [mobile, setMobile] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <aside className={`fixed inset-y-0 left-0 z-50 w-[232px] border-r border-line bg-white p-4 transition lg:translate-x-0 ${mobile ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-12 items-center justify-between px-2">
          <Brand />
          <button onClick={() => setMobile(false)} className="lg:hidden"><X size={20} /></button>
        </div>
        <div className="mt-6 rounded-xl border border-line bg-[#fbfcfe] p-2">
          <HubSwitcher full />
        </div>
        <nav className="mt-6">
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[.16em] text-slate-400">Workspace</p>
          {navItems.map(([label, Icon, href]) => {
            const active = pathname === href;
            return (
              <Link key={label} href={href} onClick={() => setMobile(false)} className={`mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition ${active ? "bg-blue-50 text-brand" : "text-slate-600 hover:bg-slate-50 hover:text-ink"}`}>
                <Icon size={17} /> {label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-5 left-4 right-4 rounded-2xl bg-ink p-4 text-white">
          <p className="text-xs font-bold">Launch Crew</p>
          <p className="mt-1 text-[11px] text-slate-400">6 of 7 seats used</p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[85%] rounded-full bg-brand" /></div>
        </div>
      </aside>
      {mobile && <button aria-label="Close menu" onClick={() => setMobile(false)} className="fixed inset-0 z-40 bg-ink/30 backdrop-blur-sm lg:hidden" />}
      <div className="lg:pl-[232px]">
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-line bg-white/90 px-4 backdrop-blur-xl sm:px-7">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobile(true)} className="rounded-lg border border-line p-2 lg:hidden"><Menu size={19} /></button>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Aleet</div>
              <div className="text-sm font-bold">Driver Portal</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-xl border border-line bg-[#fbfcfe] px-3 py-2.5 sm:flex">
              <Search size={15} className="text-slate-400" /><input aria-label="Search workspace" className="w-44 bg-transparent text-xs outline-none" placeholder="Search workspace..." />
              <span className="rounded border border-line bg-white px-1.5 py-0.5 text-[9px] text-slate-400">⌘K</span>
            </div>
            <button className="relative rounded-xl border border-line bg-white p-2.5"><Bell size={17} /><span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-white bg-brand" /></button>
            <PhotoAvatar crop="profile" size={36} />
          </div>
        </header>
        <main className="p-4 sm:p-7">{children}</main>
      </div>
    </div>
  );
}

export function AppPageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div><p className="text-[11px] font-bold uppercase tracking-[.16em] text-brand">{eyebrow}</p><h1 className="mt-2 text-3xl font-bold tracking-[-.04em]">{title}</h1><p className="mt-2 text-sm text-muted">{description}</p></div>
      {action}
    </div>
  );
}

export function Surface({ title, action, children, className = "" }) {
  return (
    <section className={`rounded-2xl border border-line bg-white p-5 shadow-card ${className}`}>
      {(title || action) && <div className="mb-5 flex items-center justify-between"><h2 className="font-bold">{title}</h2>{action}</div>}
      {children}
    </section>
  );
}

export function Status({ children, tone = "blue" }) {
  const style = tone === "green" ? "bg-emerald-50 text-emerald-700" : tone === "orange" ? "bg-orange-50 text-orange-700" : tone === "slate" ? "bg-slate-100 text-slate-600" : "bg-blue-50 text-brand";
  return <span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-bold ${style}`}>{children}</span>;
}
