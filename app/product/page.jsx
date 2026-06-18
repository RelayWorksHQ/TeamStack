import { Building2, CalendarDays, FolderOpen, ListTodo, MessageSquareText, ShieldCheck, Users, Workflow } from "lucide-react";
import { CompactPublicPage } from "../../components/CompactPublicPage";

const areas = [
  [Building2, "Hubs", "Switch the whole workspace between companies, teams, clients, or projects."],
  [Workflow, "Work", "Keep outcomes, owners, deadlines, and progression clear."],
  [ListTodo, "Tasks", "Track the actions required to complete the work."],
  [CalendarDays, "Calendar", "See final dates, progression dates, and update windows."],
  [FolderOpen, "Files", "Keep links and documents beside the work they support."],
  [MessageSquareText, "Updates", "Share timestamped progress without chasing status."],
  [ShieldCheck, "Proof", "Record submissions, approvals, and completed work."],
  [Users, "Members", "Manage roles, access, status, and responsibility."]
];

export default function ProductPage() {
  return (
    <CompactPublicPage kicker="Product" title="One clear place to run the work." description="Teamstack keeps the essential operating areas together inside each hub.">
      <section className="mx-auto mt-9 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {areas.map(([Icon, title, desc]) => (
          <article key={title} className="rounded-xl border border-line bg-white p-5 shadow-card">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-50 text-brand"><Icon size={18} /></span>
            <h2 className="mt-4 text-[15px] font-bold">{title}</h2>
            <p className="mt-2 text-[12px] leading-5 text-muted">{desc}</p>
          </article>
        ))}
      </section>
    </CompactPublicPage>
  );
}
