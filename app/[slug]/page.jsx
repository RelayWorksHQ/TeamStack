import { notFound } from "next/navigation";
import { Bell, BookOpen, CircleHelp, Mail, Scale, ShieldCheck } from "lucide-react";
import { CompactPublicPage } from "../../components/CompactPublicPage";

const pages = {
  resources: {
    title: "Helpful Teamstack resources.",
    description: "Simple support for setting up and using your workspace.",
    cards: [
      [BookOpen, "Guides", "Short guides for hubs, work, updates, files, and proof."],
      [CircleHelp, "Help Center", "Clear answers for setup, access, and daily use."],
      [Bell, "Updates", "See the latest Teamstack product changes."]
    ]
  },
  contact: {
    title: "Talk to Teamstack.",
    description: "Questions about setup or early access? We’re here to help.",
    cards: [[Mail, "General", "hello@teamstack.app"], [CircleHelp, "Support", "support@teamstack.app"], [ShieldCheck, "Security", "security@teamstack.app"]]
  },
  privacy: {
    title: "Privacy, written clearly.",
    description: "How Teamstack handles and protects workspace information.",
    cards: [[ShieldCheck, "Workspace data", "Records remain scoped to the access you choose."], [Scale, "Data handling", "We collect what is needed to provide the service."], [Mail, "Questions", "privacy@teamstack.app"]]
  },
  terms: {
    title: "Straightforward terms.",
    description: "Simple expectations for using a shared operating workspace.",
    cards: [[Scale, "Fair use", "Use Teamstack responsibly."], [ShieldCheck, "Account access", "Owners manage member access and permissions."], [Mail, "Questions", "legal@teamstack.app"]]
  },
  security: {
    title: "Secure operating records.",
    description: "Member access, proof, and workspace history are core responsibilities.",
    cards: [[ShieldCheck, "Permissions", "Hub access keeps records with the right people."], [Scale, "Core records", "Proof and permissions remain protected."], [Mail, "Report an issue", "security@teamstack.app"]]
  }
};

export default function InfoPage({ params }) {
  const page = pages[params.slug];
  if (!page) notFound();
  return (
    <CompactPublicPage kicker={params.slug === "resources" ? "Resources" : "Teamstack"} title={page.title} description={page.description}>
      <section className="mx-auto mt-9 grid max-w-4xl gap-4 md:grid-cols-3">
        {page.cards.map(([Icon, title, desc]) => (
          <article key={title} className="rounded-xl border border-line bg-white p-6 shadow-card">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-brand"><Icon size={19} /></span>
            <h2 className="mt-4 text-[15px] font-bold">{title}</h2>
            <p className="mt-2 text-[12px] leading-5 text-muted">{desc}</p>
          </article>
        ))}
      </section>
    </CompactPublicPage>
  );
}
