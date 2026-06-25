import { AppPageHeader, Surface } from "../../../components/AppShell";
import { PhotoAvatar } from "../../../components/DashboardMockup";

export default function ProfilePage() {
  return (
    <>
      <AppPageHeader eyebrow="Personal" title="My Profile" description="Your identity, availability, and hub memberships." />
      <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
        <Surface><div className="text-center"><div className="mx-auto w-fit"><PhotoAvatar crop="profile" size={76} /></div><h2 className="mt-4 text-lg font-bold">Azeem Khan</h2><p className="mt-1 text-[10px] text-muted">Owner · Available</p></div></Surface>
        <Surface title="Hub memberships">{[["Aleet · Driver Portal", "Owner", "Full access"], ["Teamstack", "Admin", "Full access"], ["Nutree", "Member", "Assigned work"]].map(([hub, role, access]) => <div key={hub} className="grid gap-2 border-b border-line py-3 last:border-0 sm:grid-cols-[1fr_120px_120px]"><b className="text-[11px]">{hub}</b><span className="text-[10px] text-muted">{role}</span><span className="text-[10px] text-muted">{access}</span></div>)}</Surface>
      </div>
    </>
  );
}
