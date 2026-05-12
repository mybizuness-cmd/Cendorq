import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";
import { SupportRequestForm } from "@/components/customer-support/support-request-form";
import { SupportRequestUpdateForm } from "@/components/customer-support/support-request-update-form";
import { CENDORQ_WORK_START_GATE_PROJECTIONS } from "@/lib/cendorq-work-start-intake-gates";
import { CUSTOMER_SUPPORT_INTAKE_FLOWS, CUSTOMER_SUPPORT_INTAKE_RISK_RULES } from "@/lib/customer-support-intake-architecture";

export const metadata = buildMetadata({ title: "Market resolution intake | Cendorq", description: "Start or safely update a protected Cendorq support request with guarded summaries and no raw secrets or payment data.", path: "/dashboard/support/request", noIndex: true });

const REQUEST_PATHS = [
  { title: "New blocker", href: "#new-support-request", copy: "Submit the narrowest safe summary for a new issue." },
  { title: "Asked for context", href: "#support-request-update", copy: "Update only when status asks for safer detail." },
  { title: "Already submitted", href: "/dashboard/support/status", copy: "Track status before creating duplicate requests." },
] as const;

const SAFE_SUMMARY_RULES = [
  "Say what happened, which area it affects, and what help you need.",
  "Do not paste passwords, card numbers, bank details, private keys, raw tokens, session tokens, or admin keys.",
  "Do not paste raw attack strings, prompt-injection text, raw evidence dumps, or private report internals.",
  "After submission, track status and notifications instead of creating duplicate requests.",
] as const;

export default function SupportRequestPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[linear-gradient(180deg,#fff7fb_0%,#e9fbff_18%,#eff9ff_62%,#ffffff_100%)] text-slate-950">
      <RequestAtmosphere />
      <section className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-[92rem] gap-8 px-4 pb-12 pt-6 sm:px-6 md:pb-18 md:pt-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <div className="relative z-10">
          <h1 className="max-w-5xl text-[clamp(3.2rem,7.3vw,7.5rem)] font-semibold leading-[0.84] tracking-[-0.08em] text-slate-950">Send the safe summary that moves the blocker forward.</h1>
          <p className="mt-6 max-w-3xl text-lg font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">Intake should collect enough context to help without turning into a private data dump, duplicate request loop, or command-depth shortcut. Work starts only when the right Cendorq gate is clear.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="#work-start-gates" className={CENDORQ_EXPERIENCE_SYSTEM.primaryButton}>Check work-start gates</Link><Link href="#new-support-request" className={CENDORQ_EXPERIENCE_SYSTEM.secondaryButton}>Start safe request</Link></div>
        </div>
        <div className="relative overflow-hidden rounded-[2.7rem] border border-white/80 bg-white/74 p-5 shadow-[0_30px_100px_rgba(15,23,42,0.1)] backdrop-blur-2xl sm:p-7">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent" />
          <h2 className="text-5xl font-semibold tracking-[-0.07em] text-slate-950 sm:text-6xl">Gate the queue.</h2>
          <p className="mt-5 text-base font-medium leading-8 text-slate-600">Review needs intake. Repair needs diagnosis and scope. Control needs a baseline. Payment alone should not start the wrong work.</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {REQUEST_PATHS.slice(1).map((item) => <Link key={item.title} href={item.href} className="rounded-[1.6rem] border border-cyan-100 bg-cyan-50/50 p-5 shadow-sm transition hover:border-cyan-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2"><div className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-700">{item.title}</div><p className="mt-3 text-sm font-medium leading-7 text-slate-600">{item.copy}</p></Link>)}
          </div>
        </div>
      </section>

      <section id="work-start-gates" className="relative mx-auto max-w-[92rem] scroll-mt-8 px-4 pb-10 sm:px-6" aria-label="Cendorq work start gates">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/82 shadow-[0_24px_80px_rgba(15,23,42,0.065)] backdrop-blur">
          <div className="border-b border-cyan-100 p-6 sm:p-8 lg:p-10">
            <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-end"><h2 className="text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-6xl">What Cendorq needs before backend work starts.</h2><p className="max-w-3xl text-base font-medium leading-8 text-slate-600">These gates keep delivery clean. They tell the customer what to provide and tell the backend whether to collect intake, hold for evidence, or move the work into the right queue.</p></div>
          </div>
          <div className="grid gap-0 lg:grid-cols-3">
            {CENDORQ_WORK_START_GATE_PROJECTIONS.map((gate) => (
              <article key={gate.key} className="border-b border-cyan-100 p-5 lg:border-b-0 lg:border-r last:lg:border-r-0 sm:p-6">
                <div className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-700">{gate.customerTitle}</div><h3 className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-slate-950">{gate.planKey === "deep-review" ? "Review" : gate.planKey === "build-fix" ? "Repair" : "Control"}</h3><p className="mt-4 text-sm font-medium leading-7 text-slate-600">{gate.customerPromise}</p>
                <div className="mt-5 rounded-[1.35rem] border border-cyan-100 bg-cyan-50/45 p-4"><div className="text-[11px] font-black uppercase tracking-[0.18em] text-cyan-700">Backend rule</div><p className="mt-2 text-sm font-semibold leading-7 text-slate-600">{gate.backendStartRule}</p></div>
                <div className="mt-4 rounded-[1.35rem] border border-cyan-100 bg-white p-4"><div className="text-[11px] font-black uppercase tracking-[0.18em] text-cyan-700">Required before queue</div><ul className="mt-3 grid gap-2 text-sm font-medium leading-6 text-slate-600">{gate.requiredBeforeQueue.slice(0, 4).map((item) => <li key={item}>• {item}</li>)}</ul></div>
                <p className="mt-4 text-sm font-semibold leading-7 text-amber-700">{gate.blockedPattern}</p><Link href={gate.dashboardHref} className="mt-5 inline-flex text-sm font-bold text-cyan-700 transition hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2">Open gate path →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Support request paths"><div className="grid gap-4 md:grid-cols-3">{REQUEST_PATHS.map((item, index) => <Link key={item.title} href={item.href} className={index === 0 ? "rounded-[2rem] border border-cyan-200 bg-cyan-50/75 p-6 shadow-[0_20px_65px_rgba(14,165,233,0.08)] md:-mt-6 md:mb-6" : "rounded-[2rem] border border-white/80 bg-white/82 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.055)] backdrop-blur transition hover:-translate-y-1 hover:border-cyan-200 hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2"}><h2 className="text-3xl font-semibold tracking-[-0.055em] text-slate-950">{item.title}</h2><p className="mt-4 text-sm font-medium leading-7 text-slate-600">{item.copy}</p></Link>)}</div></section>

      <section id="new-support-request" className="relative mx-auto grid max-w-[92rem] scroll-mt-8 gap-6 px-4 pb-10 sm:px-6 lg:grid-cols-[1.08fr_0.92fr]"><div className="rounded-[2.5rem] border border-white/80 bg-white/82 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.065)] backdrop-blur sm:p-6"><SupportRequestForm /></div><aside className="rounded-[2.5rem] border border-white/80 bg-white/82 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.055)] backdrop-blur sm:p-8"><h2 className="text-4xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-5xl">Enough context. No secrets.</h2><div className="mt-6 grid gap-3">{SAFE_SUMMARY_RULES.map((rule) => <p key={rule} className="rounded-[1.35rem] border border-cyan-100 bg-cyan-50/45 p-4 text-sm font-semibold leading-7 text-slate-600 shadow-sm">{rule}</p>)}</div></aside></section>

      <section id="support-request-update" className="relative mx-auto grid max-w-[92rem] scroll-mt-8 gap-6 px-4 pb-16 sm:px-6 lg:grid-cols-[1.08fr_0.92fr]"><div className="rounded-[2.5rem] border border-white/80 bg-white/82 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.065)] backdrop-blur sm:p-6"><SupportRequestUpdateForm /></div><aside className="rounded-[2.5rem] border border-white/80 bg-white/82 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.055)] backdrop-blur sm:p-8"><h2 className="text-4xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-5xl">Do not create duplicate noise.</h2><p className="mt-5 text-sm font-medium leading-7 text-slate-600">Use update mode only when the status page asks for safer customer context. Approved updates return the request to protected review.</p><Link href="/dashboard/support/status" className="mt-6 inline-flex text-sm font-bold text-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2">Check status first →</Link></aside></section>

      <section className="sr-only" aria-label="Support request guardrails">Market resolution intake. Light support request page. No black support request blocks. No dark blue support request blocks. Send the safe summary that moves the blocker forward. Work-start gates. What Cendorq needs before backend work starts. Review intake gate. Repair prerequisite gate. Control baseline gate. Safe summary only. Update only when asked. No duplicate requests. No private data dump. No command-depth shortcut. Track status first. {SAFE_SUMMARY_RULES.join(" ")} {REQUEST_PATHS.map((item) => `${item.title} ${item.copy} ${item.href}`).join(" ")} {CENDORQ_WORK_START_GATE_PROJECTIONS.map((gate) => `${gate.key} ${gate.planKey} ${gate.customerTitle} ${gate.customerPromise} ${gate.backendStartRule} ${gate.customerSafeAction} ${gate.blockedPattern} ${gate.requiredBeforeQueue.join(" ")} ${gate.decision.fulfillmentState} ${gate.decision.backendWorkState}`).join(" ")} {CUSTOMER_SUPPORT_INTAKE_FLOWS.map((flow) => `${flow.key} ${flow.label} ${flow.primaryOutcome} ${flow.purpose} ${flow.requiredGuards.join(" ")}`).join(" ")} {CUSTOMER_SUPPORT_INTAKE_RISK_RULES.map((rule) => `${rule.key} ${rule.decision} ${rule.customerMessage}`).join(" ")}</section>
    </main>
  );
}

function RequestAtmosphere() { return <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"><div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(251,207,232,0.16),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.17),transparent_27%),linear-gradient(180deg,rgba(255,255,255,0.4),rgba(239,249,255,0.74)_42%,rgba(255,255,255,0.95)_100%)]" /><div className="absolute left-1/2 top-0 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-cyan-200/24 blur-3xl" /><div className="system-grid-wide absolute inset-0 opacity-[0.018]" /></div>; }
