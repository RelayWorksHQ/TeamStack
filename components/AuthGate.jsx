"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function AuthGate({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let active = true;
    const checkSession = async () => {
      const response = await fetch("/api/auth/session", { cache: "no-store" });
      if (!active) return;
      if (!response.ok) {
        router.replace(`/login?next=${encodeURIComponent(pathname)}`);
        return;
      }
      setChecked(true);
    };
    checkSession();
    return () => {
      active = false;
    };
  }, [pathname, router]);

  if (!checked) {
    return <div className="min-h-screen bg-[#f8fafc]" />;
  }

  return children;
}
