"use client";

import {
  Activity, Bell, CalendarDays, CheckCircle2, ChevronDown, CircleAlert,
  ClipboardCheck, Clock3, FileCheck2, FileText, FolderOpen, LayoutDashboard,
  Link2, ListTodo, MessageSquareText, Plus, Settings,
  ShieldCheck, Users, Workflow
} from "lucide-react";
import { useState } from "react";
import { Brand } from "./Brand";

export const navItems = [
  ["Overview", LayoutDashboard, "/app"],
  ["Work", Workflow, "/app/work"],
  ["Tasks", ListTodo, "/app/tasks"],
  ["Calendar", CalendarDays, "/app/calendar"],
  ["Files", FolderOpen, "/app/files"],
  ["Updates", MessageSquareText, "/app/updates"],
  ["Proof", ShieldCheck, "/app/proof"],
  ["Members", Users, "/app/members"],
  ["Settings", Settings, "/app/settings"]
];

const hubs = ["Aleet", "Nutree", "Honey Crust", "Fonic", "Teamstack"];

export function PhotoAvatar({ crop = "profile", size = 24, className = "" }) {
  const crops = {
    profile: [1404, 141],
    azeem: [725, 270],
    member2: [747, 270],
    member3: [769, 270],
    member4: [791, 270],
    qa: [849, 669]
  };
  const [x, y] = crops[crop] || crops.profile;
  return (
    <span
      className={`block shrink-0 rounded-full border border-white bg-slate-200 shadow-sm ${className}`}
      style={{
        width: size,
        height: size,
        backgroundImage: "url('/site-mockup.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "1536px 1024px",
        backgroundPosition: `-${x}px -${y}px`
      }}
      aria-hidden="true"
    />
  );
}

export function HubSwitcher({ full = false }) {
  const [open, setOpen] = useState(false);
  const [hub, setHub] = useState("Launch Crew — Aleet Driver Portal");
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className={`flex items-center gap-2 rounded-xl border border-transparent px-2 py-2 text-left font-bold hover:border-line hover:bg-slate-50 ${full ? "text-sm sm:text-base" : "max-w-[260px] text-[12px]"}`}>
        <span className="truncate">{hub}</span><ChevronDown size={15} />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-64 rounded-2xl border border-line bg-white p-2 shadow-soft">
          <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">Switch hub</p>
          {hubs.map((name) => (
            <button key={name} onClick={() => { setHub(name); setOpen(false); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold hover:bg-blue-50 hover:text-brand">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-slate-100 text-[11px] font-black">{name[0]}</span>{name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const currentWork = [
  ["Driver Onboarding Flow", "Azeem", "Jun 24", "On Track"],
  ["AQD Deployment", "Azeem", "Jun 24", "On Track"],
  ["Driver Presence Testing", "QA Team", "Jun 22", "At Risk"]
];

function MiniCard({ title, value, note, icon: Icon, tone = "blue" }) {
  const colors = {
    blue: "text-brand bg-blue-50",
    green: "text-emerald-600 bg-emerald-50",
    orange: "text-orange-500 bg-orange-50",
    slate: "text-slate-600 bg-slate-100"
  };
  return (
    <div className="min-w-0 rounded-xl border border-line bg-white p-3.5 shadow-card">
      <div className="mb-4 flex items-center gap-2 text-[10px] font-bold text-slate-600">
        <span className={`grid h-6 w-6 place-items-center rounded-lg ${colors[tone]}`}><Icon size={13} /></span>{title}
      </div>
      <div className="text-[24px] font-bold tracking-[-.05em]">{value}</div>
      {title === "Members" ? (
        <div className="mt-2 flex items-center">
          {["azeem", "member2", "member3", "member4"].map((crop, index) => <PhotoAvatar key={crop} crop={crop} size={20} className={index ? "-ml-1.5" : ""} />)}
          <span className="-ml-1 grid h-5 w-5 place-items-center rounded-full border border-white bg-slate-100 text-[7px] font-bold text-muted">+2</span>
        </div>
      ) : <div className="mt-1 text-[9px] text-muted">{note}</div>}
    </div>
  );
}

function Panel({ title, action, children, className = "" }) {
  return (
    <div className={`rounded-xl border border-line bg-white p-3.5 shadow-card ${className}`}>
      <div className="mb-3 flex items-center justify-between border-b border-line pb-2.5">
        <h3 className="text-[11px] font-bold">{title}</h3>
        {action && <span className="text-[9px] font-bold text-brand">{action}</span>}
      </div>
      {children}
    </div>
  );
}

export function DashboardMockup({ className = "" }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-line bg-[#fbfcfe] shadow-soft ${className}`}>
      <div className="flex h-[58px] items-center justify-between border-b border-line bg-white px-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-5">
          <Brand compact />
          <HubSwitcher />
          <span className="hidden rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-700 md:inline">On Track</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="hidden items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-[10px] font-bold sm:flex"><Link2 size={13} /> Share</button>
          <Bell size={17} />
          <PhotoAvatar crop="profile" size={32} />
        </div>
      </div>
      <div className="flex">
        <aside className="hidden w-[126px] shrink-0 border-r border-line bg-white p-2.5 md:block">
          {navItems.map(([label, Icon], i) => (
            <div key={label} className={`mb-1 flex items-center gap-2 rounded-lg px-2.5 py-2 text-[10px] font-semibold ${i === 0 ? "bg-blue-50 text-brand" : "text-slate-600"}`}>
              <Icon size={13} /> {label}
            </div>
          ))}
        </aside>
        <div className="min-w-0 flex-1 p-3">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            <MiniCard title="Members" value="6" note="+2 contractors" icon={Users} />
            <MiniCard title="Tasks" value="18" note="Total tasks" icon={ListTodo} />
            <MiniCard title="Completed" value="12" note="67% complete" icon={CheckCircle2} tone="green" />
            <MiniCard title="At Risk" value="1" note="Needs attention" icon={CircleAlert} tone="orange" />
            <MiniCard title="Due Soon" value="3" note="This week" icon={CalendarDays} tone="slate" />
          </div>
          <div className="mt-2 grid gap-2 lg:grid-cols-[1.25fr_1fr_.95fr]">
            <Panel title="Current Work" action="View all">
              <div className="space-y-1">
                {currentWork.map(([name, owner, date, status]) => (
                  <div key={name} className="grid grid-cols-[1fr_auto] items-center gap-2 border-b border-line py-2 last:border-0">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <PhotoAvatar crop={owner === "QA Team" ? "qa" : "azeem"} size={18} />
                        <div className="min-w-0">
                          <div className="truncate text-[10px] font-bold">{name}</div>
                          <div className="mt-1 flex gap-3 text-[8px] text-muted"><span>{owner}</span><span>{date}</span></div>
                        </div>
                      </div>
                    </div>
                    <span className={`rounded-full px-2 py-1 text-[8px] font-bold ${status === "At Risk" ? "bg-orange-50 text-orange-600" : "bg-emerald-50 text-emerald-700"}`}>{status}</span>
                  </div>
                ))}
              </div>
              <button className="mt-2 flex items-center gap-1 text-[9px] font-bold text-brand"><Plus size={12} /> Add task</button>
            </Panel>
            <div className="space-y-2">
              <Panel title="Progression Schedule" action="View calendar">
                {[["Tue", "Jun 18"], ["Wed", "Jun 19"], ["Thu", "Jun 20"]].map(([day, date]) => (
                  <div key={day} className="grid grid-cols-[28px_1fr_auto] items-center border-b border-line py-2 text-[8px] last:border-0">
                    <b>{day}</b><span className="text-muted">{date}</span><span className="text-muted">5:00 PM – 8:00 PM</span>
                  </div>
                ))}
              </Panel>
              <div className="rounded-xl border border-line bg-white p-3 shadow-card">
                <div className="text-[8px] font-bold">Next update</div>
                <div className="mt-1 text-[15px] font-bold">Today · 5:00 PM</div>
                <div className="mt-1 text-[8px] text-muted">Expected update window</div>
              </div>
            </div>
            <div className="space-y-2">
              <Panel title="Recent Updates" action="View all">
                {["Driver Portal connected", "AQD fix deployed", "Testing started"].map((text, i) => (
                  <div key={text} className="flex gap-2 border-b border-line py-1.5 last:border-0">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <div><div className="text-[9px] font-semibold">{text}</div><div className="text-[8px] text-muted">{i === 2 ? "QA Team" : "Azeem"} · {i * 2 + 2}h ago</div></div>
                  </div>
                ))}
              </Panel>
              <Panel title="Files" action="View all">
                {["Driver Portal Repo", "Deployment Notes", "Testing Results"].map((text, i) => (
                  <div key={text} className="flex items-center gap-2 border-b border-line py-1.5 text-[9px] font-semibold last:border-0">
                    {i === 0 ? <Link2 size={11} /> : <FileText size={11} />}{text}
                  </div>
                ))}
              </Panel>
            </div>
          </div>
          <div className="mt-2 hidden rounded-xl border border-line bg-white p-3 shadow-card sm:block">
            <div className="mb-3 flex items-center justify-between"><b className="text-[10px]">Activity Feed</b><span className="text-[8px] font-bold text-brand">View all</span></div>
            <div className="grid grid-cols-3 gap-4">
              {[
                ["Azeem uploaded Deployment Notes.pdf", FileCheck2],
                ["QA Team marked testing in progress", Activity],
                ["Azeem completed AQD Fix", ClipboardCheck]
              ].map(([text, Icon], i) => (
                <div key={text} className="flex items-center gap-2 text-[8px]">
                  {i === 2 ? <Icon size={14} className="text-emerald-500" /> : <PhotoAvatar crop={i === 1 ? "qa" : "azeem"} size={18} />}
                  <span className="truncate font-semibold">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
