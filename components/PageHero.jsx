export function PageHero({ kicker, title, description, children }) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-[#fbfcfe]">
      <div className="absolute inset-0 grid-fade opacity-70" />
      <div className="page-shell relative py-20 text-center sm:py-28">
        <p className="section-kicker">{kicker}</p>
        <h1 className="mx-auto mt-5 max-w-4xl text-5xl font-bold leading-[1.08] tracking-[-.055em] sm:text-6xl">{title}</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted">{description}</p>
        {children}
      </div>
    </section>
  );
}
