import Link from "next/link";
import {
  Activity, CalendarDays, CheckCircle2, CircleAlert, ClipboardCheck,
  FileCheck2, FileText, Link2, ListTodo, Plus, Users
} from "lucide-react";
import { Status } from "../../components/AppShell";
import { PhotoAvatar } from "../../components/DashboardMockup";

const summaryCards = [
  {
    title: "Members",
    value: "6",
    icon: Users,
    tone: "blue",
    content: (
      <div className="mt-4 flex items-center">
        {["azeem", "member2", "member3", "member4"].map((crop, index) => (
          <PhotoAvatar key={crop} crop={crop} size={24} className={index ? "-ml-1.5" : ""} />
        ))}
        <span className="-ml-1 grid h-6 w-6 place-items-center rounded-full border border-white bg-slate-100 text-[8px] font-bold text-muted">+2</span>
      </div>
    )
  },
  { title: "Tasks", value: "18", icon: ListTodo, tone: "blue", note: "Total tasks" },
  { title: "Completed", value: "12", icon: CheckCircle2, tone: "green", note: "67% complete" },
  { title: "At Risk", value: "1", icon: CircleAlert, tone: "orange", note: "Needs attention" },
  { title: "Due Soon", value: "3", icon: CalendarDays, tone: "slate", note: "This week" }
];

const currentWork = [
  ["Driver Onboarding Flow", "Azeem", "Jun 24", "On Track", "green", "azeem"],
  ["AQD Deployment", "Azeem", "Jun 24", "On Track", "green", "azeem"],
  ["Driver Presence Testing", "QA Team", "Jun 22", "At Risk", "orange", "qa"]
];

const schedule = [
  ["Tue", "Jun 18", "5:00 PM – 8:00 PM"],
  ["Wed", "Jun 19", "5:00 PM – 8:00 PM"],
  ["Thu", "Jun 20", "5:00 PM – 8:00 PM"]
];

const updates = [
  ["Driver Portal connected", "Azeem · 2h ago"],
  ["AQD fix deployed", "Azeem · 4h ago"],
  ["Testing started", "QA Team · 6h ago"]
];

const files = [
  ["Driver Portal Repo", Link2],
  ["Deployment Notes", FileText],
  ["Testing Results", FileText]
];

const activity = [
  ["azeem", "Azeem uploaded Deployment Notes.pdf", FileCheck2],
  ["qa", "QA Team marked testing in progress", Activity],
  ["azeem", "Azeem completed AQD Fix", ClipboardCheck]
];

function SummaryCard({ card }) {
  const Icon = card.icon;
  const tones = {
    blue: "bg-blue-50 text-brand",
    green: "bg-emerald-50 text-emerald-600",
    orange: "bg-orange-50 text-orange-500",
    slate: "bg-slate-100 text-slate-600"
  };

  return (
    <section className="min-h-[144px] rounded-xl border border-line bg-white p-5 shadow-card">
      <div className="flex items-center gap-3 text-[12px] font-bold">
        <span className={`grid h-8 w-8 place-items-center rounded-lg ${tones[card.tone]}`}>
          <Icon size={16} />
        </span>
        {card.title}
      </div>
      <div className="mt-6 text-[30px] font-bold tracking-[-.05em]">{card.value}</div>
      {card.content || <p className="mt-2 text-[10px] font-semibold text-muted">{card.note}</p>}
    </section>
  );
}

function Panel({ title, action, children, className = "" }) {
  return (
    <section className={`rounded-xl border border-line bg-white shadow-card ${className}`}>
      <header className="flex items-center justify-between border-b border-line px-4 py-3.5">
        <h2 className="text-[13px] font-bold">{title}</h2>
        {action && <Link href={action.href} className="text-[9px] font-bold text-brand">{action.label}</Link>}
      </header>
      <div className="p-4">{children}</div>
    </section>
  );
}

export default function HubOverviewPage() {
  return (
    <div className="space-y-4">
      <section className="pb-6 pt-2 sm:pb-8 sm:pt-3">
        <p className="text-[11px] font-bold uppercase tracking-[.22em] text-brand">Hub Overview</p>
        <h1 className="mt-4 text-[34px] font-bold leading-tight tracking-[-.04em] text-ink sm:text-[42px]">
          Good afternoon.
        </h1>
        <p className="mt-3 max-w-[620px] text-[14px] leading-6 text-muted">
          Here’s what’s moving inside Launch Crew Aleet Driver Portal.
        </p>
      </section>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {summaryCards.map((card) => (
          <SummaryCard key={card.title} card={card} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.35fr_1.05fr_.95fr]">
        <Panel title="Current Work" action={{ href: "/app/work", label: "View all" }} className="min-h-[420px]">
          <div className="divide-y divide-line">
            {currentWork.map(([name, owner, date, status, tone, crop]) => (
              <div key={name} className="grid grid-cols-[1fr_auto] items-center gap-3 py-4 first:pt-1">
                <div className="flex min-w-0 items-center gap-3">
                  <PhotoAvatar crop={crop} size={26} />
                  <div className="min-w-0">
                    <h3 className="truncate text-[12px] font-bold">{name}</h3>
                    <p className="mt-1 flex gap-4 text-[9px] text-muted">
                      <span>{owner}</span>
                      <span>{date}</span>
                    </p>
                  </div>
                </div>
                <Status tone={tone}>{status}</Status>
              </div>
            ))}
          </div>
          <Link href="/app/work" className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-bold text-brand">
            <Plus size={13} /> Add task
          </Link>
        </Panel>

        <div className="space-y-4">
          <Panel title="Progression Schedule" action={{ href: "/app/calendar", label: "View calendar" }}>
            <div className="divide-y divide-line">
              {schedule.map(([day, date, time]) => (
                <div key={day} className="grid grid-cols-[36px_1fr_auto] items-center gap-3 py-3 text-[10px]">
                  <b>{day}</b>
                  <span className="text-muted">{date}</span>
                  <span className="text-muted">{time}</span>
                </div>
              ))}
            </div>
          </Panel>

          <section className="rounded-xl border border-line bg-white p-5 shadow-card">
            <p className="text-[10px] font-bold">Next update</p>
            <h2 className="mt-2 text-[23px] font-bold tracking-[-.04em]">Today · 5:00 PM</h2>
            <p className="mt-1 text-[10px] text-muted">Expected update window</p>
          </section>
        </div>

        <div className="space-y-4">
          <Panel title="Recent Updates" action={{ href: "/app/updates", label: "View all" }}>
            <div className="divide-y divide-line">
              {updates.map(([title, meta]) => (
                <div key={title} className="flex gap-3 py-3 first:pt-1">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-emerald-500" />
                  <div>
                    <h3 className="text-[11px] font-bold">{title}</h3>
                    <p className="mt-1 text-[9px] text-muted">{meta}</p>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Files" action={{ href: "/app/files", label: "View all" }}>
            <div className="divide-y divide-line">
              {files.map(([title, Icon]) => (
                <div key={title} className="flex items-center gap-3 py-3 first:pt-1 text-[11px] font-bold">
                  <Icon size={14} className="text-slate-500" />
                  {title}
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>

      <Panel title="Activity Feed" action={{ href: "/app/updates", label: "View all" }}>
        <div className="grid gap-4 md:grid-cols-3">
          {activity.map(([crop, text, Icon], index) => (
            <div key={text} className="flex min-w-0 items-center gap-3">
              {index === 2 ? (
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
                  <Icon size={15} />
                </span>
              ) : (
                <PhotoAvatar crop={crop} size={28} />
              )}
              <span className="truncate text-[10px] font-semibold">{text}</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
