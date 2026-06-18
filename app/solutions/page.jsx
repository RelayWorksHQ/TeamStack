import { BriefcaseBusiness, Building2, Crown, Factory, HardHat, Users } from "lucide-react";
import { CompactPublicPage } from "../../components/CompactPublicPage";

const solutions = [
  [Crown, "Founders", "See priorities, ownership, progress, and proof without chasing the team."],
  [HardHat, "Contractors", "Give clients a clean record of work, updates, files, and delivery."],
  [BriefcaseBusiness, "Agencies", "Keep each client’s people and operating records in the right hub."],
  [Factory, "Operators", "Run recurring work with visible dates, risks, and completion records."],
  [Users, "Small Teams", "Replace scattered chats, folders, and status checks with one workspace."],
  [Building2, "Multi-Business Owners", "Switch between businesses while keeping every context separate."]
];

export default function SolutionsPage() {
  return (
    <CompactPublicPage kicker="Solutions" title="Built for the teams doing the work." description="A simple operating workspace for the people responsible for getting work finished.">
      <section className="mx-auto mt-9 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {solutions.map(([Icon, title, desc]) => (
          <article key={title} className="flex gap-4 rounded-xl border border-line bg-white p-5 shadow-card">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-brand"><Icon size={19} /></span>
            <div><h2 className="text-[15px] font-bold">{title}</h2><p className="mt-2 text-[12px] leading-5 text-muted">{desc}</p></div>
          </article>
        ))}
      </section>
    </CompactPublicPage>
  );
}
