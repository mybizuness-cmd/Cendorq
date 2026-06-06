import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Pricing Command Center | Cendorq",
  description: "Protected Cendorq Pricing Command Center for plan prices, upgrade triggers, plan boundaries, proof-before-payment CTAs, billing-safe language, discounts, refunds, and conversion clarity.",
  path: "/dashboard/pricing-command",
  noIndex: true,
});

const PRICING_AREAS = [
  ["Plan price", "Published plan amount, billing cadence, included deliverables, and customer-facing value promise."],
  ["Upgrade trigger", "The proof, gap, or next decision that makes a paid plan relevant without pressure."],
  ["Plan boundary", "What Free Scan, Deep Review, Build Fix, and Ongoing Control include, exclude, and defer."],
  ["Billing language", "Payment, invoice, receipt, resend, failed payment, refund, and support-safe wording."],
  ["Discount control", "Promotions, coupons, exceptions, expirations, and whether they are approved for public use."],
  ["Conversion clarity", "Price appears after value, proof, plan fit, expected outcome, and safe next command."],
] as const;

const PRICING_CHECKS = [
  ["Source of truth", "Pricing copy must match the approved plan matrix, payment system, and customer dashboard state."],
  ["Proof first", "The customer should understand the issue, benefit, scope, and next step before payment pressure appears."],
  ["No false scarcity", "Urgency, discounts, or deadlines must be true, approved, and visible in the correct context."],
  ["Billing safety", "Failed, duplicate, refunded, disputed, or partial payment states route to support-safe recovery."],
  ["Plan fit", "Paid action should map to the actual customer problem rather than pushing the highest tier by default."],
  ["Delivery match", "The paid plan should align with the dashboard, PDF, email, entitlement, and delivery workflow."],
] as const;

const PRICING_RULES = [
  "Do not invent prices, discounts, coupons, billing promises, refunds, guarantees, or included work.",
  "Do not use aggressive payment pressure before the customer sees useful proof and a clear reason to act.",
  "Do not let public pricing, checkout, dashboard CTAs, emails, PDFs, and support answers contradict each other.",
  "Do not publish pricing or upgrade language unless Plan Matrix, Entitlement Center, Integration Registry, Conversion Command, and Quality Gate can support it.",
] as const;

export default function PricingCommandPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(125,211,252,.28),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(196,181,253,.2),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_42%,#ffffff_100%)] px-4 py-14 text-slate-950 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      <section className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="rounded-[2.25rem] border border-white/80 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,.065)] backdrop-blur sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">Pricing Command Center</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[.86] tracking-[-.08em] text-slate-950">Pricing should feel like the next clear decision, not a trap.</h1>
          <p className="mt-6 text-base font-semibold leading-8 text-slate-600">The Pricing Command Center governs plan prices, upgrade triggers, boundaries, proof-before-payment CTAs, billing-safe language, discounts, refunds, checkout state, and conversion clarity.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/plan-command-matrix" className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">Open Plan Matrix</Link>
            <Link href="/dashboard/conversion-command" className="rounded-full border border-cyan-200 bg-white px-5 py-3 text-center text-sm font-bold text-cyan-700">Open Conversion Command</Link>
          </div>
        </div>
        <section className="rounded-[2.25rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,.25)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Pricing areas</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.065em] text-white sm:text-5xl">Prices, triggers, boundaries, billing, discounts, and conversion clarity.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{PRICING_AREAS.map(([label, copy], index) => <article key={label} className="rounded-[1.35rem] border border-white/10 bg-white/[.06] p-4"><span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span><h3 className="mt-3 text-xl font-semibold tracking-[-.04em] text-white">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{copy}</p></article>)}</div>
        </section>
      </section>
      <section className="mx-auto mt-6 grid max-w-[94rem] gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Pricing checks</p><div className="mt-5 grid gap-3 md:grid-cols-2">{PRICING_CHECKS.map(([label, copy]) => <article key={label} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/45 p-4"><h3 className="text-xl font-semibold tracking-[-.04em] text-slate-950">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p></article>)}</div></div>
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Pricing rules</p><div className="mt-5 grid gap-3">{PRICING_RULES.map((rule) => <p key={rule} className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/45 p-4 text-xs font-semibold leading-6 text-slate-700">{rule}</p>)}</div></div>
      </section>
      <section className="sr-only" aria-label="Pricing command guardrails">Pricing Command Center. Plan price. Upgrade trigger. Plan boundary. Billing language. Discount control. Conversion clarity. Source of truth. Proof first. No false scarcity. Billing safety. Plan fit. Delivery match. pricing trust and conversion clarity.</section>
    </main>
  );
}
