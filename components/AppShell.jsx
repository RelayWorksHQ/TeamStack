"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell, BriefcaseBusiness, ChevronDown, ChevronRight, Files, LayoutDashboard, Menu,
  MessageCircle, Search, Settings, ShieldCheck, UserRound, Users, Video, X
} from "lucide-react";
import { useEffect, useState } from "react";
import { Brand } from "./Brand";
import { PhotoAvatar } from "./DashboardMockup";
import { defaultHub, defaultMembers } from "../lib/localStore";

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
  const [hub, setHub] = useState(defaultHub);
  const [hubs, setHubs] = useState([]);
  const [activeHubId, setActiveHubId] = useState(null);
  const [session, setSession] = useState(null);
  const [memberCount, setMemberCount] = useState(defaultMembers.length);
  const [hubModal, setHubModal] = useState(false);
  const [hubMenu, setHubMenu] = useState(false);
  const isChat = pathname === "/app/chat";

  useEffect(() => {
    const syncState = async () => {
      const response = await fetch("/api/hubs", { cache: "no-store" });
      if (!response.ok) return;
      const data = await response.json();
      setHubs(data.hubs || []);
      setActiveHubId(data.activeHubId || data.hub?.id || null);
      setHub(data.hub || defaultHub);
      setSession(data.user || null);
      setMemberCount(data.hub?.members?.length || 0);
      if ((data.hubs || []).length === 0) setHubModal(true);
    };
    syncState();
    window.addEventListener("teamstack:storage", syncState);
    return () => {
      window.removeEventListener("teamstack:storage", syncState);
    };
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  const selectHub = async hubId => {
    const response = await fetch("/api/hubs", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ activeHubId: hubId })
    });
    if (!response.ok) return;
    const data = await response.json();
    setHubs(data.hubs || []);
    setActiveHubId(data.activeHubId || data.hub?.id || null);
    setHub(data.hub || defaultHub);
    setMemberCount(data.hub?.members?.length || 0);
    window.dispatchEvent(new CustomEvent("teamstack:storage", { detail: { key: "teamstack.activeHub", value: data.hub } }));
  };

  const createHub = async event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const description = String(form.get("description") || "").trim();
    if (!name) return;
    const response = await fetch("/api/hubs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description })
    });
    if (!response.ok) return;
    const data = await response.json();
    setHubs(data.hubs || []);
    setActiveHubId(data.activeHubId || data.hub?.id || null);
    setHub(data.hub || defaultHub);
    setMemberCount(data.hub?.members?.length || 0);
    setHubModal(false);
    window.dispatchEvent(new CustomEvent("teamstack:storage", { detail: { key: "teamstack.activeHub", value: data.hub } }));
  };

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
          <div className="relative">
            <button onClick={() => setHubMenu(open => !open)} className="flex items-center gap-2 rounded-xl border border-transparent px-2 py-2 text-left text-sm font-bold hover:border-line hover:bg-slate-50 sm:text-base">
              <span className="truncate">{hub.fullName}</span><ChevronDown size={15} />
            </button>
            {hubMenu && <div className="absolute left-0 top-full z-50 mt-2 w-64 rounded-2xl border border-line bg-white p-2 shadow-soft">
              <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">Switch hub</p>
              {hubs.length === 0 && <p className="px-3 py-2 text-[11px] text-muted">No hubs yet.</p>}
              {hubs.map(item => <button key={item.id} onClick={() => { setHubMenu(false); selectHub(item.id); }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold hover:bg-blue-50 hover:text-brand ${activeHubId === item.id ? "bg-blue-50 text-brand" : ""}`}><span className="grid h-7 w-7 place-items-center rounded-lg bg-slate-100 text-[11px] font-black">{(item.name || item.fullName || "H")[0]}</span>{item.fullName || item.name}</button>)}
              <button onClick={() => { setHubMenu(false); setHubModal(true); }} className="mt-1 flex w-full items-center gap-3 rounded-xl border border-dashed border-line px-3 py-2.5 text-left text-sm font-bold text-brand hover:bg-blue-50"><span className="grid h-7 w-7 place-items-center rounded-lg bg-blue-50 text-[13px] font-black">+</span>New Hub</button>
            </div>}
          </div>
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
            <div className="min-w-0 flex-1"><p className="truncate text-[11px] font-bold">{session?.name || "Azeem Khan"}</p><p className="text-[9px] text-muted">Owner · Active</p></div>
            <ChevronRight size={14} className="text-slate-400" />
          </div>
          <button onClick={logout} className="mt-3 w-full rounded-lg border border-line bg-white py-2 text-[9px] font-bold text-slate-600">Log out</button>
        </div>
      </aside>
      {mobile && <button aria-label="Close menu" onClick={() => setMobile(false)} className="fixed inset-0 z-40 bg-ink/30 backdrop-blur-sm lg:hidden" />}
      <div className="lg:pl-[210px]">
        <header className="sticky top-0 z-30 flex h-[62px] items-center justify-between border-b border-line bg-white/95 px-4 backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobile(true)} className="rounded-lg border border-line p-2 lg:hidden"><Menu size={17} /></button>
            <div><div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-slate-400"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Live Hub</div><div className="text-[12px] font-bold">{hub.name}</div></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-lg border border-line bg-[#fbfcfe] px-2.5 py-1.5 md:flex">
              <div className="flex -space-x-1.5">{["member2", "member3", "qa"].map(crop => <PhotoAvatar key={crop} crop={crop} size={23} />)}</div>
              <span className="text-[9px] font-semibold text-muted">{Math.max(0, memberCount - 3)} working now</span>
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
      {hubModal && <div className="fixed inset-0 z-[90] grid place-items-center bg-ink/30 p-5 backdrop-blur-sm"><form onSubmit={createHub} className="w-full max-w-sm rounded-2xl border border-line bg-white p-6 shadow-soft"><h2 className="text-[15px] font-bold">Create Hub</h2><p className="mt-1 text-[10px] text-muted">Set up a workspace for this account.</p><label className="mt-5 block text-[10px] font-bold">Hub name<input name="name" autoFocus required className="mt-2 w-full rounded-lg border border-line px-3 py-3 text-[11px] outline-none focus:border-brand" /></label><label className="mt-4 block text-[10px] font-bold">Description<textarea name="description" rows="3" className="mt-2 w-full resize-none rounded-lg border border-line px-3 py-3 text-[11px] outline-none focus:border-brand" /></label><div className="mt-5 flex gap-2">{hubs.length > 0 && <button type="button" onClick={() => setHubModal(false)} className="flex-1 rounded-lg border border-line py-3 text-[11px] font-bold">Cancel</button>}<button className="flex-1 rounded-lg bg-ink py-3 text-[11px] font-bold text-white">Create Hub</button></div></form></div>}
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
