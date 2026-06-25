"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { MailCheck, RefreshCw } from "lucide-react";
import { Brand } from "../../components/Brand";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const status = searchParams.get("status") || "";
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(status === "success");

  useEffect(() => {
    if (status === "success") {
      setVerified(true);
      const timeout = window.setTimeout(() => window.location.replace("/app"), 1800);
      return () => window.clearTimeout(timeout);
    }

    if (status === "invalid") return undefined;

    let active = true;
    const checkVerification = async () => {
      const sessionResponse = await fetch("/api/auth/session", { cache: "no-store" }).catch(() => null);
      if (!active) return;
      if (sessionResponse?.ok) {
        setVerified(true);
        window.location.replace("/app");
        return;
      }

      if (!email) return;
      const statusResponse = await fetch(`/api/auth/verification-status?email=${encodeURIComponent(email)}`, { cache: "no-store" }).catch(() => null);
      if (!active) return;
      const data = await statusResponse?.json().catch(() => ({}));
      if (data?.verified) {
        setVerified(true);
        window.location.replace("/app");
      }
    };

    checkVerification();
    const interval = window.setInterval(checkVerification, 3500);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, [email, status]);

  const resendEmail = async () => {
    setLoading(true);
    setMessage("");
    const response = await fetch("/api/auth/resend-verification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
    const data = await response.json().catch(() => ({}));
    setLoading(false);
    setMessage(response.ok ? "Verification email sent again. Use the newest email link; older links will no longer work." : data.error || "Could not resend verification email.");
  };

  const headline = verified ? "Email verified." : "Verify your email";
  const bodyText = verified
    ? "Your TeamStack account is active. Taking you into your portal now."
    : status === "invalid"
      ? "This verification link is expired or no longer valid. Please request a new verification email."
      : `We sent a verification email to ${email || "your email address"}. Please click the verification link in your email to activate your TeamStack account. This page will update automatically once your email is verified.`;

  return (
    <main className="grid min-h-screen bg-white lg:grid-cols-[1fr_.9fr]">
      <section className="flex min-h-screen flex-col p-6 sm:p-10">
        <Brand />
        <div className="mx-auto my-auto w-full max-w-[460px] py-12">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-brand">
            <MailCheck size={24} />
          </div>
          <p className="section-kicker mt-8">Account verification</p>
          <h1 className="mt-3 text-4xl font-bold tracking-[-.045em]">{headline}</h1>
          <p className="mt-3 text-sm leading-6 text-muted">{bodyText}</p>
          <div className="mt-8 rounded-xl border border-line bg-[#fbfcfe] p-4">
            <p className="text-xs font-bold">Didn&apos;t receive it?</p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button disabled={!email || loading} onClick={resendEmail} className="flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-xs font-bold text-white disabled:cursor-not-allowed disabled:opacity-50">
                <RefreshCw size={14} /> {loading ? "Sending..." : "Resend email"}
              </button>
              <Link href="/signup" className="flex items-center justify-center rounded-xl border border-line bg-white px-4 py-3 text-xs font-bold text-slate-700">Change email address</Link>
            </div>
            {message && <p className="mt-3 text-xs font-semibold text-muted">{message}</p>}
          </div>
        </div>
      </section>
      <aside className="relative hidden overflow-hidden bg-ink p-12 text-white lg:flex lg:flex-col lg:justify-center">
        <div className="absolute inset-0 opacity-10 grid-fade" />
        <div className="relative mx-auto max-w-lg">
          <span className="eyebrow border-white/10 bg-white/10 text-blue-200">TeamStack account</span>
          <h2 className="mt-8 text-5xl font-bold leading-tight tracking-[-.055em]">One verified account for your hubs, proof, and work.</h2>
          <p className="mt-6 text-sm leading-6 text-slate-300">Verification keeps your workspace tied to the right person before TeamStack opens the hub.</p>
        </div>
      </aside>
    </main>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-white" />}>
      <VerifyEmailContent />
    </Suspense>
  );
}
