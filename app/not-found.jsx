import Link from "next/link";
import { Brand } from "../components/Brand";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f7f9fc] p-6 text-center">
      <div><div className="mb-10 flex justify-center"><Brand /></div><div className="text-sm font-bold text-brand">404</div><h1 className="mt-3 text-4xl font-bold tracking-[-.04em]">This page isn’t in the hub.</h1><p className="mt-4 text-muted">The route may have moved or no longer exists.</p><Link href="/" className="mt-8 inline-flex rounded-xl bg-ink px-6 py-4 text-sm font-bold text-white">Back to Teamstack</Link></div>
    </main>
  );
}
