import { PublicNav } from "./PublicNav";

export function CompactPublicPage({ kicker, title, description, children }) {
  return (
    <div className="min-h-screen bg-white">
      <PublicNav />
      <main className="page-shell py-10 sm:py-14">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[.16em] text-brand">{kicker}</p>
          <h1 className="mt-3 text-[34px] font-bold tracking-[-.045em] sm:text-[42px]">{title}</h1>
          <p className="mx-auto mt-3 max-w-xl text-[14px] leading-6 text-muted">{description}</p>
        </div>
        {children}
      </main>
    </div>
  );
}
