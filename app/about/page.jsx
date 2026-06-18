import Link from "next/link";
import { CompactPublicPage } from "../../components/CompactPublicPage";

export default function AboutPage() {
  return (
    <CompactPublicPage kicker="About" title="A clean operating home for the work." description="Teamstack was built to give teams one place to run work, manage accountability, and keep proof of what happened.">
      <section className="mx-auto mt-9 max-w-3xl rounded-xl border border-line bg-white p-7 shadow-card">
        <div className="space-y-4 text-[14px] leading-7 text-muted">
          <p>Most teams work across chats, files, task lists, and inboxes. That makes ownership difficult to see and progress difficult to trust.</p>
          <p>Teamstack brings people, work, tasks, files, updates, proof, and members together inside hubs. Each hub keeps the right team and records in one clear context.</p>
          <p>The result is a simpler way to run the work, see the progress, and keep everyone accountable.</p>
        </div>
        <Link href="/signup" className="mt-6 inline-flex rounded-lg bg-ink px-5 py-3 text-[12px] font-bold text-white">Get started free</Link>
      </section>
    </CompactPublicPage>
  );
}
