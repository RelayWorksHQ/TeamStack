import Link from "next/link";
import { Brand } from "./Brand";

const groups = {
  Product: [["Overview", "/product"], ["Pricing", "/pricing"], ["Log in", "/login"], ["Get started", "/signup"]],
  Company: [["About", "/about"], ["Solutions", "/solutions"], ["Contact", "/contact"]],
  Resources: [["Guides", "/resources"], ["Help center", "/resources"], ["System status", "/resources"]],
  Legal: [["Privacy", "/privacy"], ["Terms", "/terms"], ["Security", "/security"]]
};

export function Footer() {
  return (
    <footer className="border-t border-line bg-[#fbfcfe]">
      <div className="page-shell grid gap-10 py-16 md:grid-cols-[1.5fr_repeat(4,1fr)]">
        <div>
          <Brand />
          <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
            The operating workspace for modern teams. Keep work, people, proof, and progress together.
          </p>
        </div>
        {Object.entries(groups).map(([title, items]) => (
          <div key={title}>
            <h3 className="mb-4 text-sm font-bold">{title}</h3>
            <div className="flex flex-col gap-3">
              {items.map(([label, href]) => <Link key={label} href={href} className="text-sm text-muted hover:text-brand">{label}</Link>)}
            </div>
          </div>
        ))}
      </div>
      <div className="page-shell flex flex-col justify-between gap-3 border-t border-line py-6 text-xs text-muted sm:flex-row">
        <span>© 2026 Teamstack. All rights reserved.</span>
        <span>Designed for teams who care about follow-through.</span>
      </div>
    </footer>
  );
}
