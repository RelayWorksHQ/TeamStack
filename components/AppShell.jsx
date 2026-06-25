"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell, BriefcaseBusiness, ChevronRight, Files, LayoutDashboard, Menu,
  MessageCircle, Search, Settings, ShieldCheck, UserRound, Users, Video, X
} from "lucide-react";
import { useState } from "react";
import { Brand } from "./Brand";
import { HubSwitcher, PhotoAvatar } from "./DashboardMockup";

const hubNav = [
  ["Hub Overview", LayoutDashboard, "/app"],
  ["Work", BriefcaseBusiness, "/app/work"],
  ["Chat", MessageCircle, "/app/chat"],
  ["Files", Files, "/app/files"],
  ["Proof", ShieldCheck, "/app/proof"],
  ["Members", Users, "/app/members"],
  ["Settings", Settings, "/app/settings"]
];

const personalNav = [
  ["My Work", BriefcaseBusiness, "/app/my-work"],
  ["My Profile", UserRound, "/app/profile"]
];

export function AppShell({ children }) {
  const pathname = usePathname();
  const [mobile, setMobile] = useState(false);
  const isChat = pathname === "/app/chat";

  const navLink = ([label, Icon, href]) => {
    const active = pathname === href || (href !== "/app" && pathname.startsWith(`${href}/`));
    return (
      <Link key={label} href={href} onClick={() => setMobile(false)} className={`mb-0.5 flex items-center gap-2.5 rounded-lg px-3 py-2 text-[12px] font-semibold transition ${active ? "bg-blue-50 text-brand" : "text-slate-600 hover:bg-slate-50 hover:text-ink"}`}>
        <Icon size={15} /> {label}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <aside className={`fixed inset-y-0 left-0 z-50 w-[210px] border-r border-line bg-white p-3.5 transition lg:translate-x-0 ${mobile ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-10 items-center justify-between px-2">
          <Brand small />
          <button onClick={() => setMobile(false)} className="lg:hidden"><X size={18} /></button>
        </div>
        <div className="mt-4 rounded-lg border border-line bg-[#fbfcfe] p-1.5">
          <HubSwitcher full />
        </div>
        <nav className="mt-5">
          <p className="mb-1.5 px-3 text-[9px] font-bold uppercase tracking-[.16em] text-slate-400">Hub</p>
          {hubNav.map(navLink)}
          <p className="mb-1.5 mt-5 px-3 text-[9px] font-bold uppercase tracking-[.16em] text-slate-400">Personal</p>
          {personalNav.map(navLink)}
        </nav>
        <div className="absolute bottom-4 left-3.5 right-3.5 rounded-xl border border-line bg-[#fbfcfe] p-3">
          <div className="flex items-center gap-2.5">
            <PhotoAvatar crop="profile" size={30} />
            <div className="min-w-0 flex-1"><p className="truncate text-[11px] font-bold">Azeem Khan</p><p className="text-[9px] text-muted">Owner · Active</p></div>
            <ChevronRight size={14} className="text-slate-400" />
          </div>
        </div>
      </aside>
      {mobile && <button aria-label="Close menu" onClick={() => setMobile(false)} className="fixed inset-0 z-40 bg-ink/30 backdrop-blur-sm lg:hidden" />}
      <div className="lg:pl-[210px]">
        <header className="sticky top-0 z-30 flex h-[62px] items-center justify-between border-b border-line bg-white/95 px-4 backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobile(true)} className="rounded-lg border border-line p-2 lg:hidden"><Menu size={17} /></button>
            <div><div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-slate-400"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Live Hub</div><div className="text-[12px] font-bold">Aleet · Driver Portal</div></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-lg border border-line bg-[#fbfcfe] px-2.5 py-1.5 md:flex">
              <div className="flex -space-x-1.5">{["member2", "member3", "qa"].map(crop => <PhotoAvatar key={crop} crop={crop} size={23} />)}</div>
              <span className="text-[9px] font-semibold text-muted">3 working now</span>
            </div>
            <button className="hidden items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-[10px] font-bold text-slate-600 sm:flex"><Video size={14} /> Huddle</button>
            <div className="hidden items-center gap-2 rounded-lg border border-line bg-[#fbfcfe] px-3 py-2 sm:flex">
              <Search size={14} className="text-slate-400" /><input aria-label="Search hub" className="w-40 bg-transparent text-[11px] outline-none" placeholder="Search this hub..." />
            </div>
            <button className="relative rounded-lg border border-line bg-white p-2"><Bell size={15} /><span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-brand" /></button>
            <PhotoAvatar crop="profile" size={32} />
          </div>
        </header>
        <main className={isChat ? "h-[calc(100vh-62px)] overflow-hidden" : "mx-auto max-w-[1240px] p-4 sm:p-6"}>{children}</main>
      </div>
    </div>
  );
}

export function AppPageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
      <div><p className="text-[9px] font-bold uppercase tracking-[.16em] text-brand">{eyebrow}</p><h1 className="mt-1.5 text-[25px] font-bold tracking-[-.04em]">{title}</h1><p className="mt-1.5 text-[12px] text-muted">{description}</p></div>
      {action}
    </div>
  );
}

export function Surface({ title, action, children, className = "" }) {
  return (
    <section className={`rounded-xl border border-line bg-white p-4 shadow-card ${className}`}>
      {(title || action) && <div className="mb-3.5 flex items-center justify-between"><h2 className="text-[13px] font-bold">{title}</h2>{action}</div>}
      {children}
    </section>
  );
}

export function Status({ children, tone = "blue" }) {
  const style = tone === "green" ? "bg-emerald-50 text-emerald-700" : tone === "orange" ? "bg-orange-50 text-orange-700" : tone === "slate" ? "bg-slate-100 text-slate-600" : "bg-blue-50 text-brand";
  return <span className={`whitespace-nowrap rounded-full px-2 py-1 text-[9px] font-bold ${style}`}>{children}</span>;
}
