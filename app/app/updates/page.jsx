import { CheckCircle2, CircleDot, MessageSquareText, Rocket } from "lucide-react";
import { AppPageHeader, Status, Surface } from "../../../components/AppShell";

const updates = [
  ["Today, 3:42 PM", "Azeem Khan", "Driver Portal connected", "The production repository is now connected to the hub. Commit activity and deployment references can be attached directly to work records.", "Completed", Rocket],
  ["Today, 1:18 PM", "Azeem Khan", "AQD fix deployed", "The connection timeout fix is live in production. Monitoring through the next progression window before final approval.", "Review", CheckCircle2],
  ["Today, 9:06 AM", "QA Team", "Testing started", "Driver presence testing has started across iOS and Android. Initial results are attached to the testing work item.", "In Progress", CircleDot],
  ["Yesterday, 6:30 PM", "Maya Chen", "Onboarding content updated", "Final copy and empty states were uploaded for review. Two comments remain open.", "In Progress", MessageSquareText]
];

export default function UpdatesPage() {
  return (
    <>
      <AppPageHeader eyebrow="Updates" title="Operational updates" description="A timestamped record of progress, decisions, and changes in this hub." action={<button className="rounded-xl bg-ink px-4 py-3 text-xs font-bold text-white">Post update</button>} />
      <Surface>
        <div className="relative ml-2 border-l border-line pl-7">
          {updates.map(([time, author, title, body, status, Icon], i) => <article key={title} className="relative border-b border-line py-6 first:pt-0 last:border-0 last:pb-0"><span className="absolute -left-[40px] top-6 grid h-6 w-6 place-items-center rounded-full border-4 border-white bg-brand text-white first:top-0"><Icon size={10} /></span><div className="flex flex-wrap items-center gap-3"><span className="text-[11px] font-bold text-brand">{time}</span><span className="text-[11px] text-muted">by {author}</span><Status tone={status === "Completed" ? "green" : "blue"}>{status}</Status></div><h2 className="mt-3 text-lg font-bold">{title}</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-muted">{body}</p></article>)}
        </div>
      </Surface>
    </>
  );
}
