"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Brand } from "./Brand";

const links = [
  ["Product", "/product"],
  ["Solutions", "/solutions"],
  ["Resources", "/resources"],
  ["Pricing", "/pricing"],
  ["About", "/about"]
];

export function PublicNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-50 border-b border-line/80 bg-white">
      <div className="home-shell flex h-[72px] items-center justify-between">
        <Brand small />
        <nav className="hidden items-center gap-7 lg:flex">
          {links.map(([label, href]) => (
            <Link key={label} href={href} className="text-[12px] font-semibold text-slate-700 transition hover:text-brand">
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-5 lg:flex">
          <Link href="/login" className="text-[12px] font-semibold text-slate-700 hover:text-brand">
            Log in
          </Link>
          <Link href="/signup" className="rounded-lg bg-ink px-5 py-2.5 text-[12px] font-bold text-white shadow-lg shadow-slate-950/10">
            Get started free
          </Link>
        </div>
        <button onClick={() => setOpen(!open)} className="rounded-lg border border-line p-2 lg:hidden" aria-label="Toggle navigation">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="border-t border-line bg-white px-5 py-5 lg:hidden">
          <div className="flex flex-col gap-4">
            {links.map(([label, href]) => (
              <Link key={label} href={href} onClick={() => setOpen(false)} className="font-semibold text-slate-700">
                {label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-3">
              <Link href="/login" className="rounded-xl border border-line px-4 py-3 text-center font-bold">Log in</Link>
              <Link href="/signup" className="rounded-xl bg-ink px-4 py-3 text-center font-bold text-white">Get started</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
