import Link from "next/link";
import { Check } from "lucide-react";
import { CompactPublicPage } from "../../components/CompactPublicPage";

const plans = [
  ["Free", "$0", ["1 hub", "Up to 3 members", "Basic tasks, updates, and proof"]],
  ["Starter", "$12", ["More hubs", "Up to 7 members per hub", "Client and contractor access", "Higher storage and usage"]],
  ["Growth", "$29", ["More hubs", "Up to 15 members per hub", "Advanced proof and history", "Admin controls", "Higher storage and usage"]],
  ["Pro", "$59", ["More hubs", "Up to 30 members per hub", "Advanced proof and history", "Full client and contractor access", "Advanced admin controls", "Highest storage and usage"]]
];

export default function PricingPage() {
  return (
    <CompactPublicPage kicker="Pricing" title="Simple plans for real teams." description="Early pricing designed to stay clear as your team grows. Placeholder prices shown.">
      <section className="mx-auto mt-9 grid max-w-5xl gap-4 md:grid-cols-2 lg:grid-cols-4">
        {plans.map(([name, price, features], index) => (
          <article key={name} className={`rounded-xl border p-5 ${index === 2 ? "border-brand bg-ink text-white" : "border-line bg-white shadow-card"}`}>
            <h2 className="text-[15px] font-bold">{name}</h2>
            <div className="mt-4 text-3xl font-bold tracking-[-.05em]">{price}<span className={`ml-1 text-[11px] font-normal ${index === 2 ? "text-slate-400" : "text-muted"}`}>/mo</span></div>
            <div className="my-5 h-px bg-current opacity-10" />
            <div className="min-h-[150px] space-y-3">{features.map(item => <p key={item} className="flex gap-2 text-[11px] font-semibold"><Check size={14} className="shrink-0 text-brand" />{item}</p>)}</div>
            <Link href="/signup" className={`mt-5 block rounded-lg py-3 text-center text-[11px] font-bold ${index === 2 ? "bg-white text-ink" : "bg-ink text-white"}`}>Get started</Link>
          </article>
        ))}
      </section>
    </CompactPublicPage>
  );
}
