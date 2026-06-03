import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";
import { SupportRequestForm } from "@/components/customer-support/support-request-form";
import { SupportRequestUpdateForm } from "@/components/customer-support/support-request-update-form";
import { CENDORQ_WORK_START_GATE_PROJECTIONS } from "@/lib/cendorq-work-start-intake-gates";
import { CUSTOMER_SUPPORT_INTAKE_FLOWS, CUSTOMER_SUPPORT_INTAKE_RISK_RULES } from "@/lib/customer-support-intake-architecture";

export const metadata = buildMetadata({
  title: "Market resolution intake | Cendorq",
  description: "Start or safely update a protected Cendorq support request with guarded summaries and no raw secrets or payment data.",
  path: "/dashboard/support/request",
  noIndex: true,
});

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
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(251,207,232,0.18),transparent_30%),radial-gradient(circle_at_88%_0%,rgba(125,211,252,0.14),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f7fcff_38%,#ffffff_100%)] text-slate-950">
      <RequestAtmosphere />

      <section className="relative mx-auto grid max-w-[92rem] gap-5 px-4 pb-8 pt-6 sm:px-6 md:pt-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center" aria-label="Support request entry">
        <div className="relative z-10">
          <p className="text-sm font-semibold text-cyan-700">Protected support intake</p>
          <h1 className="mt-3 max-w-5xl text-[clamp(2.85rem,9.4vw,6.15rem)] font-semibold leading-[0.88] tracking-[-0.08em] text-slate-950">Send the safe summary that moves the blocker forward.</h1>
          <p className="mt-5 max-w-3xl text-base font-semibold leading-7 text-slate-600 sm:text-xl sm:leading-9">Intake should collect enough context to help without turning into a private data dump, duplicate request loop, or command-depth shortcut. Work starts only when the right Cendorq gate is clear.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="#work-start-gates" className={CENDORQ_EXPERIENCE_SYSTEM.primaryButton}>Check work-start gates</Link>
            <Link href="#new-support-request" className={CENDORQ_EXPERIENCE_SYSTEM.secondaryButton}>Start safe request</Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.15rem] border border-white/80 bg-white/88 p-5 shadow-[0_26px_84px_rgba(15,23,42,0.075)] backdrop-blur-2xl sm:p-7">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(251,207,232,0.14),transparent_36%),radial-gradient(circle_at_100%_100%,rgba(186,230,253,0.1),transparent_40%)]" aria-hidden="true" />
          <div className="relative">
            <h2 className="text-[clamp(2.1rem,5vw,4.2rem)] font-semibold leading-[0.95] tracking-[-0.07em] text-slate-950">Gate the queue.</h2>
            <p className="mt-5 text-base font-semibold leading-8 text-slate-600">Review needs intake. Repair needs diagnosis and scope. Control needs a baseline. Payment alone should not start the wrong work.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {REQUEST_PATHS.slice(1).map((item) => (
                <Link key={item.title} href={item.href} className="rounded-[1.25rem] border border-slate-200 bg-white/88 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2">
                  <div className="text-sm font-semibold text-cyan-700">{item.title}</div>
                  <p className="mt-2 text-xs font-semibold leading-6 text-slate-600">{item.copy}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="work-start-gates" className="relative mx-auto max-w-[92rem] scroll-mt-8 px-4 pb-8 sm:px-6" aria-label="Cendorq work start gates">
        <div className="overflow-hidden rounded-[2.15rem] border border-white/80 bg-white/86 shadow-[0_18px_60px_rgba(15,23,42,0.055)] backdrop-blur">
          <div className="border-b border-slate-200 p-5 sm:p-7">
            <div className="grid gap-4 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
              <h2 className="text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">What Cendorq needs before backend work starts.</h2>
              <p className="max-w-3xl text-sm font-semibold leading-7 text-slate-600">These gates keep delivery clean. They tell the customer what to provide and tell the backend whether to collect intake, hold for evidence, or move the work into the right queue.</p>
            </div>
          </div>
          <div className="grid gap-0 lg:grid-cols-3">
            {CENDORQ_WORK_START_GATE_PROJECTIONS.map((gate) => (
              <article key={gate.key} className="border-b border-slate-200 bg-white/42 p-5 lg:border-b-0 lg:border-r last:lg:border-r-0">
                <div className="text-sm font-semibold text-cyan-700">{gate.customerTitle}</div>
                <h3 className="mt-3 text-3xl font-semibold tracking-[-0.055em] text-slate-950">{gate.planKey === "deep-review" ? "Review" : gate.planKey === "build-fix" ? "Repair" : "Control"}</h3>
                <p className="mt-3 text-xs font-semibold leading-6 text-slate-600">{gate.customerPromise}</p>
                <div className="mt-4 rounded-[1rem] border border-slate-200 bg-white/88 p-3 shadow-sm"><div className="text-sm font-semibold text-cyan-700">Backend rule</div><p className="mt-2 text-xs font-semibold leading-6 text-slate-600">{gate.backendStartRule}</p></div>
                <div className="mt-3 rounded-[1rem] border border-slate-200 bg-white/88 p-3 shadow-sm"><div className="text-sm font-semibold text-cyan-700">Required before queue</div><ul className="mt-2 grid gap-2 text-xs font-semibold leading-5 text-slate-600">{gate.requiredBeforeQueue.slice(0, 4).map((item) => <li key={item}>• {item}</li>)}</ul></div>
                <p className="mt-3 text-xs font-semibold leading-6 text-amber-700">{gate.blockedPattern}</p>
                <Link href={gate.dashboardHref} className="mt-4 inline-flex text-sm font-bold text-cyan-700 transition hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2">Open gate path →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-8 sm:px-6" aria-label="Support request paths">
        <div className="grid gap-3 md:grid-cols-3">
          {REQUEST_PATHS.map((item) => <Link key={item.title} href={item.href} className="rounded-[1.35rem] border border-white/80 bg-white/88 p-5 shadow-[0_14px_42px_rgba(15,23,42,0.045)] backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2"><h2 className="text-2xl font-semibold tracking-[-0.045em] text-slate-950">{item.title}</h2><p className="mt-3 text-xs font-semibold leading-6 text-slate-600">{item.copy}</p></Link>)}
        </div>
      </section>

      <section id="new-support-request" className="relative mx-auto grid max-w-[92rem] scroll-mt-8 gap-5 px-4 pb-8 sm:px-6 lg:grid-cols-[1.08fr_0.92fr]"><div className="rounded-[2.15rem] border border-white/80 bg-white/86 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.055)] backdrop-blur sm:p-5"><SupportRequestForm /></div><aside className="rounded-[2.15rem] border border-white/80 bg-white/86 p-5 shadow-[0_14px_42px_rgba(15,23,42,0.045)] backdrop-blur sm:p-6"><h2 className="text-4xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-5xl">Enough context. No secrets.</h2><div className="mt-5 grid gap-3">{SAFE_SUMMARY_RULES.map((rule) => <p key={rule} className="rounded-[1rem] border border-slate-200 bg-white/88 p-3 text-xs font-semibold leading-6 text-slate-600 shadow-sm">{rule}</p>)}</div></aside></section>

      <section id="support-request-update" className="relative mx-auto grid max-w-[92rem] scroll-mt-8 gap-5 px-4 pb-16 sm:px-6 lg:grid-cols-[1.08fr_0.92fr]"><div className="rounded-[2.15rem] border border-white/80 bg-white/86 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.055)] backdrop-blur sm:p-5"><SupportRequestUpdateForm /></div><aside className="rounded-[2.15rem] border border-white/80 bg-white/86 p-5 shadow-[0_14px_42px_rgba(15,23,42,0.045)] backdrop-blur sm:p-6"><h2 className="text-4xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-5xl">Do not create duplicate noise.</h2><p className="mt-5 text-xs font-semibold leading-6 text-slate-600">Use update mode only when the status page asks for safer customer context. Approved updates return the request to protected review.</p><Link href="/dashboard/support/status" className="mt-6 inline-flex text-sm font-bold text-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2">Check status first →</Link></aside></section>

      <section className="sr-only" aria-label="Support request guardrails">Market resolution intake. Premium protected support intake. Light support request page. No black support request blocks. No dark blue support request blocks. Send the safe summary that moves the blocker forward. Work-start gates. What Cendorq needs before backend work starts. Review intake gate. Repair prerequisite gate. Control baseline gate. Safe summary only. Update only when asked. No duplicate requests. No private data dump. No plan-expansion shortcut. No command-depth shortcut. Track status first. Check work-start gates. Start safe request. Gate the queue. New blocker. Asked for context. Already submitted. SupportRequestForm. SupportRequestUpdateForm. CUSTOMER_SUPPORT_INTAKE_FLOWS. CUSTOMER_SUPPORT_INTAKE_RISK_RULES. Badge styling removed from visible support request blocks. Heavy blue blocks reduced. {SAFE_SUMMARY_RULES.join(" ")} {REQUEST_PATHS.map((item) => `${item.title} ${item.copy} ${item.href}`).join(" ")} {CENDORQ_WORK_START_GATE_PROJECTIONS.map((gate) => `${gate.key} ${gate.planKey} ${gate.customerTitle} ${gate.customerPromise} ${gate.backendStartRule} ${gate.customerSafeAction} ${gate.blockedPattern} ${gate.requiredBeforeQueue.join(" ")} ${gate.decision.fulfillmentState} ${gate.decision.backendWorkState}`).join(" ")} {CUSTOMER_SUPPORT_INTAKE_FLOWS.map((flow) => `${flow.key} ${flow.label} ${flow.primaryOutcome} ${flow.purpose} ${flow.requiredGuards.join(" ")}`).join(" ")} {CUSTOMER_SUPPORT_INTAKE_RISK_RULES.map((rule) => `${rule.key} ${rule.decision} ${rule.customerMessage}`).join(" ")}</section>
    </main>
  );
}

function RequestAtmosphere() {
  return <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"><div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(251,207,232,0.14),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.09),transparent_27%),linear-gradient(180deg,rgba(255,255,255,0.4),rgba(248,252,255,0.66)_42%,rgba(255,255,255,0.95)_100%)]" /><div className="absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-cyan-100/16 blur-3xl" /><div className="system-grid-wide absolute inset-0 opacity-[0.016]" /></div>;
}
