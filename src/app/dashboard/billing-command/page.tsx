import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Billing Command Center | Cendorq",
  description: "Protected Cendorq Billing Command Center for checkout state, receipts, invoices, failed payments, refunds, disputes, entitlement sync, support-safe billing language, and recovery routing.",
  path: "/dashboard/billing-command",
  noIndex: true,
});

const BILLING_AREAS = [
  ["Checkout state", "Started, completed, abandoned, failed, expired, duplicate, or needs-support payment state."],
  ["Receipts and invoices", "Customer-visible proof of payment, invoice details, resend state, and download safety."],
  ["Failed payments", "Declines, expired methods, retry timing, plan hold state, and customer-safe recovery copy."],
  ["Refunds", "Requested, approved, rejected, partial, completed, or needs-review refund handling."],
  ["Disputes", "Chargebacks, evidence packets, support status, entitlement holds, and internal escalation state."],
  ["Entitlement sync", "Payment, plan, dashboard access, report delivery, PDF/email, and support permissions stay aligned."],
] as const;

const BILLING_CHECKS = [
  ["Payment truth", "Billing state must match the payment processor, dashboard, entitlement center, and support record."],
  ["Customer clarity", "The user sees what happened, what is available, and what to do next without confusing finance language."],
  ["Access safety", "Failed, refunded, disputed, or duplicate payments should not grant or remove access incorrectly."],
  ["Delivery sync", "Reports, PDFs, email, vault downloads, and support routes should reflect the active billing state."],
  ["Recovery route", "Every billing issue routes to retry, resend, support, manual review, or entitlement repair."],
  ["Audit trail", "Receipts, invoice references, refunds, disputes, access changes, and support actions stay traceable."],
] as const;

const BILLING_RULES = [
  "Do not invent payment status, invoice details, refunds, disputes, credits, or customer billing promises.",
  "Do not expose private payment details, card data, processor secrets, or internal dispute evidence to the wrong user.",
  "Do not let billing, pricing, entitlement, delivery, email, PDF, and support surfaces contradict each other.",
  "Do not remove or grant paid access unless Payment, Entitlement Center, Integration Registry, Support, and Audit Recovery can support the state.",
] as const;

export default function BillingCommandPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(125,211,252,.28),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(196,181,253,.2),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_42%,#ffffff_100%)] px-4 py-14 text-slate-950 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      <section className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="rounded-[2.25rem] border border-white/80 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,.065)] backdrop-blur sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">Billing Command Center</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[.86] tracking-[-.08em] text-slate-950">Billing state should never drift from customer access.</h1>
          <p className="mt-6 text-base font-semibold leading-8 text-slate-600">The Billing Command Center governs checkout state, receipts, invoices, failed payments, refunds, disputes, entitlement sync, support-safe language, audit trail, and recovery routing.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/pricing-command" className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">Open Pricing Command</Link>
            <Link href="/dashboard/entitlement-center" className="rounded-full border border-cyan-200 bg-white px-5 py-3 text-center text-sm font-bold text-cyan-700">Open Entitlement Center</Link>
          </div>
        </div>
        <section className="rounded-[2.25rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,.25)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Billing areas</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.065em] text-white sm:text-5xl">Checkout, receipts, failures, refunds, disputes, and entitlements.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{BILLING_AREAS.map(([label, copy], index) => <article key={label} className="rounded-[1.35rem] border border-white/10 bg-white/[.06] p-4"><span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span><h3 className="mt-3 text-xl font-semibold tracking-[-.04em] text-white">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{copy}</p></article>)}</div>
        </section>
      </section>
      <section className="mx-auto mt-6 grid max-w-[94rem] gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Billing checks</p><div className="mt-5 grid gap-3 md:grid-cols-2">{BILLING_CHECKS.map(([label, copy]) => <article key={label} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/45 p-4"><h3 className="text-xl font-semibold tracking-[-.04em] text-slate-950">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p></article>)}</div></div>
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Billing rules</p><div className="mt-5 grid gap-3">{BILLING_RULES.map((rule) => <p key={rule} className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/45 p-4 text-xs font-semibold leading-6 text-slate-700">{rule}</p>)}</div></div>
      </section>
      <section className="sr-only" aria-label="Billing command guardrails">Billing Command Center. Checkout state. Receipts and invoices. Failed payments. Refunds. Disputes. Entitlement sync. Payment truth. Customer clarity. Access safety. Delivery sync. Recovery route. Audit trail. billing-state integrity.</section>
    </main>
  );
}
