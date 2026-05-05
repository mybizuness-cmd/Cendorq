import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Support and corrections | Cendorq",
  description: "Your private Cendorq support center for report questions, corrections, billing help, security review, and plan guidance.",
  path: "/dashboard/support",
  noIndex: true,
});

const SUPPORT_PATHS = [
  { label: "Report question", title: "Understand the finding", copy: "Clarify a score, confidence label, limitation, or recommendation.", href: "/dashboard/support/request" },
  { label: "Correction request", title: "Review something that may be wrong", copy: "Ask for a bounded correction review without exposing private material.", href: "/dashboard/support/request" },
  { label: "Billing help", title: "Fix a billing blocker", copy: "Resolve plan, invoice, entitlement, or checkout questions.", href: "/dashboard/billing" },
  { label: "Plan guidance", title: "Choose the paid next step", copy: "Understand whether Deep Review, Build Fix, or Ongoing Control fits now.", href: "/plans" },
] as const;

const SUPPORT_FIRST_USE_SNAPSHOT = [
  { label: "Help path", value: "Choose the right route", detail: "Customers should know whether they need report help, correction review, billing help, security review, or plan guidance." },
  { label: "Submission posture", value: "Safe summary only", detail: "Support should receive useful context without passwords, payment details, secrets, raw private evidence, or unnecessary payloads." },
  { label: "Status posture", value: "Track without internals", detail: "Status should show customer-safe progress, next actions, and hold reasons without internal notes or operator details." },
  { label: "Promise posture", value: "Approved outcomes only", detail: "Support copy must not promise refunds, legal outcomes, report changes, billing changes, or security outcomes without approval." },
] as const;

const SUPPORT_FIRST_USE_ACTIONS = [
  { title: "Start request", copy: "Use the protected intake when you need help or review.", href: "/dashboard/support/request" },
  { title: "Track status", copy: "Use status tracking when you already submitted a request.", href: "/dashboard/support/status" },
  { title: "Check alerts", copy: "Use notifications for support receipts and next actions.", href: "/dashboard/notifications" },
] as const;

const SUPPORT_FIRST_USE_RULES = [
  "Pick the narrowest help path that matches the problem before submitting a request.",
  "Do not submit passwords, card numbers, private keys, session tokens, raw attack strings, or unrelated private evidence.",
  "Waiting-on-customer states should ask for safe clarifications without echoing rejected unsafe content.",
  "Support can explain process, status, and next steps, but approved outcomes require the proper review gate.",
] as const;

const SUPPORT_SAFETY_RULES = [
  "Support requires customer ownership and route authorization.",
  "Support messages should use safe summaries, not raw evidence, secrets, passwords, billing IDs, or private report internals.",
  "Correction requests must stay review-gated before any report change is shown to the customer.",
  "Billing, refund, legal, or report outcome promises require approval before being stated as commitments.",
] as const;

export default function SupportCenterPage() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-8 text-white sm:px-6 md:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(103,232,249,0.12),transparent_34%)]" />

      <section className="system-panel-authority relative z-10 rounded-[1.8rem] p-5 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_18rem] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-cyan-100">Support and corrections</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Solve the blocker. Keep the customer moving.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">
              Support should answer the question, protect the proof trail, and route the customer back to the next decision instead of letting momentum die.
            </p>
          </div>
          <div className="rounded-[1.3rem] border border-cyan-300/20 bg-cyan-300/10 p-5">
            <div className="text-sm font-semibold text-cyan-100">Best recovery path</div>
            <div className="mt-3 text-2xl font-semibold text-white">Plan guidance</div>
            <p className="mt-2 text-sm leading-6 text-slate-200">When a customer is unsure, support should help choose the next paid depth.</p>
            <Link href="/plans" className="mt-4 inline-flex rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Compare plans
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4" aria-label="Support paths">
        {SUPPORT_PATHS.map((path) => (
          <Link key={path.label} href={path.href} className="system-surface rounded-[1.35rem] p-5 transition hover:border-cyan-300/30 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            <div className="text-xs font-semibold text-cyan-100">{path.label}</div>
            <h2 className="mt-3 text-xl font-semibold tracking-tight text-white">{path.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{path.copy}</p>
          </Link>
        ))}
      </section>

      <section className="relative z-10 mt-7 grid gap-4 md:grid-cols-3" aria-label="Support actions">
        <Link href="/dashboard/support/request" className="rounded-[1.2rem] border border-white/10 bg-white/[0.035] p-4 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/30 hover:bg-white/[0.06]">Start protected request →</Link>
        <Link href="/dashboard/support/status" className="rounded-[1.2rem] border border-white/10 bg-white/[0.035] p-4 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/30 hover:bg-white/[0.06]">View support status →</Link>
        <Link href="/dashboard/notifications" className="rounded-[1.2rem] border border-white/10 bg-white/[0.035] p-4 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/30 hover:bg-white/[0.06]">Open notifications →</Link>
      </section>

      <section className="sr-only" aria-label="Support guardrails">
        Get help without losing the proof trail. Start protected request. View support status. Open notification center. Support center first use snapshot. Support center first use guidance. First support visit. First-use rules. Start a protected request. Use a safe support summary. Support safety rules. Report question. Correction request. Billing help. Security concern. Plan guidance. {SUPPORT_FIRST_USE_SNAPSHOT.map((item) => `${item.label} ${item.value} ${item.detail}`).join(" ")} {SUPPORT_FIRST_USE_ACTIONS.map((item) => `${item.title} ${item.copy} ${item.href}`).join(" ")} {SUPPORT_FIRST_USE_RULES.join(" ")} {SUPPORT_SAFETY_RULES.join(" ")}
      </section>
    </main>
  );
}
