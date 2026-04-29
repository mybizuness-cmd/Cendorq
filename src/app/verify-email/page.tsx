import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Confirm your email | Cendorq",
  description: "Confirm your Cendorq email address before opening your dashboard and Free Scan results.",
  path: "/verify-email",
  noIndex: true,
});

const CONFIRMATION_STEPS = [
  "Check the inbox for the address you used to sign up.",
  "Open the email from Cendorq Support <support@cendorq.com>.",
  "Select the confirmation link to unlock your dashboard and continue the Free Scan.",
] as const;

const VERIFICATION_SAFETY_NOTES = [
  "For privacy, Cendorq keeps confirmation guidance bounded and does not expose whether another customer account exists.",
  "Dashboard, Free Scan history, report status, billing, notifications, and support status stay gated until the email is verified.",
  "Cendorq will not ask for passwords, card numbers, private keys, or session tokens through email confirmation support.",
  "If the message is missing, use the retry path calmly rather than creating duplicate accounts or sharing private evidence.",
] as const;

const AFTER_CONFIRMATION_PATH = [
  { label: "Verified access", value: "Open dashboard", detail: "Your account can continue into the private customer dashboard after confirmation." },
  { label: "Next action", value: "Continue Free Scan", detail: "The scan path stays connected to the verified customer workspace." },
  { label: "Safe support", value: "Use bounded help", detail: "Support can help with confirmation without exposing another account or raw private details." },
] as const;

export default function VerifyEmailPage() {
  return (
    <main className="relative mx-auto max-w-6xl overflow-hidden px-4 py-10 text-white sm:px-6 md:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(103,232,249,0.12),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.09),transparent_32%)]" />
      <section className="system-panel-authority relative z-10 overflow-hidden rounded-[2.5rem] p-6 sm:p-10">
        <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">Email confirmation required</div>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Confirm your email before entering your Cendorq dashboard.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
          This protects your Free Scan, future report results, billing access, support history, notifications, and saved business history. Your welcome email is sent one time after verified account creation.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {CONFIRMATION_STEPS.map((step, index) => (
            <article key={step} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-300 text-sm font-black text-slate-950">{index + 1}</div>
              <p className="mt-4 text-sm leading-7 text-slate-200">{step}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-3 sm:flex sm:items-center">
          <Link href="/free-check" className="rounded-2xl bg-cyan-300 px-5 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
            Continue to Free Scan after confirmation
          </Link>
          <Link href="/signup" className="rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            Use a different email
          </Link>
        </div>

        <p className="mt-6 text-xs leading-6 text-slate-400">
          If you do not see the email, check spam or promotions. Future transactional messages use Cendorq Support from support@cendorq.com with authenticated sending requirements. Confirmation help stays intentionally bounded and does not reveal another customer’s account state.
        </p>
      </section>

      <section className="relative z-10 mt-8 grid gap-4 md:grid-cols-3" aria-label="After confirmation path">
        {AFTER_CONFIRMATION_PATH.map((item) => (
          <article key={item.label} className="system-surface rounded-[1.5rem] p-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">{item.label}</div>
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-white">{item.value}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-8 system-surface rounded-[2rem] p-6 sm:p-8" aria-label="Verification safety notes">
        <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">Verification safety notes</div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {VERIFICATION_SAFETY_NOTES.map((note) => (
            <div key={note} className="rounded-[1.2rem] border border-white/10 bg-white/[0.035] p-4 text-sm leading-7 text-slate-200">
              {note}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
