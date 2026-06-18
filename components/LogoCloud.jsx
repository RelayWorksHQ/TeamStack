import { Github, Mail } from "lucide-react";

export function LogoCloud() {
  const logos = [
    [<Github key="g" />, "GitHub"],
    [<span key="d" className="text-lg">▲</span>, "Google Drive"],
    [<span key="s" className="text-xl text-emerald-500">✣</span>, "Slack"],
    [<span key="dc" className="text-xl text-indigo-500">◉</span>, "Discord"],
    [<span key="z" className="font-bold text-blue-500">zoom</span>, ""],
    [<Mail key="m" />, "Email"]
  ];

  return (
    <section className="pb-5 pt-7">
      <p className="mb-6 text-center text-[12px] text-muted">Connect the tools you already use</p>
      <div className="grid grid-cols-2 items-center gap-5 sm:grid-cols-4 lg:grid-cols-7">
        {logos.map(([icon, label], i) => (
          <div key={i} className="flex items-center justify-center gap-2 text-[14px] font-bold text-slate-800">
            {icon}{label}
          </div>
        ))}
        <div className="hidden text-center text-[12px] font-semibold text-muted lg:block">+ More integrations</div>
      </div>
    </section>
  );
}
