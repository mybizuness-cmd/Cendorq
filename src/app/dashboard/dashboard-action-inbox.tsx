import Link from "next/link";

import { projectPlanRouting, type PlanRoutingInput } from "@/lib/plan-routing-runtime";

const ACTION_INBOX_CASES: readonly (PlanRoutingInput & {
  title: string;
  eyebrow: string;
  customerSummary: string;
  customerValue: string;
  href: string;
  cta: string;
})[] = [
  {
    title: "Confirm the inbox that owns this workspace",
    eyebrow: "Access",
    customerSummary:
      "Keep report-ready notices, billing updates, support replies, and plan status connected to the right email.",
    customerValue:
      "This protects the workspace and makes it easier to return when Cendorq has something ready.",
    href: "/dashboard/notifications",
    cta: "Confirm inbox",
    customerIdHashPresent: true,
    verifiedEmail: true,
    welcomeSent: false,
    inboxConfirmationSent: false,
    inboxConfirmationCompleted: false,
    selectedPlan: "deep-review",
    activeEntitlements: ["deep-review"],
    routingMode: "linear-stop",
    evidenceBackedRecommendation: false,
  },
  {
    title: "Review what Build Fix can change",
    eyebrow: "Scope",
    customerSummary:
      "Build Fix improves the approved target. Deep Review is separate when you need the full reason behind the work.",
    customerValue:
      "This prevents scope confusion and keeps implementation from pretending to be full diagnosis.",
    href: "/dashboard/billing",
    cta: "Review scope",
    customerIdHashPresent: true,
    verifiedEmail: true,
    welcomeSent: true,
    inboxConfirmationSent: true,
    inboxConfirmationCompleted: true,
    selectedPlan: "build-fix",
    activeEntitlements: ["build-fix"],
    routingMode: "direct-purchase",
    evidenceBackedRecommendation: true,
    intakeOrApprovalIncomplete: true,
  },
  {
    title: "Keep monthly control evidence-led",
    eyebrow: "Ongoing",
    customerSummary:
      "Ongoing Control keeps watch and decision support active. Build Fix stays separate when the evidence shows implementation is needed.",
    customerValue:
      "This keeps monthly guidance useful without turning it into unlimited implementation work.",
    href: "/dashboard/notifications",
    cta: "View updates",
    customerIdHashPresent: true,
    verifiedEmail: true,
    welcomeSent: true,
    inboxConfirmationSent: true,
    inboxConfirmationCompleted: true,
    selectedPlan: "ongoing-control",
    activeEntitlements: ["ongoing-control"],
    routingMode: "direct-purchase",
    evidenceBackedRecommendation: true,
  },
] as const;

const ACTION_INBOX_ITEMS = ACTION_INBOX_CASES.map((item) => ({
  ...item,
  projection: projectPlanRouting(item),
}));

export function DashboardActionInbox() {
  return (
    <section className="relative z-10 mt-7" aria-label="Dashboard action inbox">
      <div className="rounded-[1.7rem] border border-white/80 bg-white/82 p-4 shadow-[0_18px_55px_rgba(15,23,42,0.055)] backdrop-blur sm:p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="max-w-4xl text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
              Only the actions that protect progress stay here.
            </h2>
            <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-slate-600">
              No noise. No internal labels. Each action explains what it helps you do and where to go next.
            </p>
          </div>
          <Link href="/dashboard/notifications" className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-cyan-200 bg-white px-5 py-3 text-sm font-bold text-slate-900 shadow-sm transition hover:border-cyan-300 hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2">
            Open notifications
          </Link>
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-3">
          {ACTION_INBOX_ITEMS.map((item) => (
            <Link key={item.title} href={item.href} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/45 p-4 text-sm font-medium leading-6 text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 sm:p-5">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-700">{item.eyebrow}</span>
              <span className="mt-3 block text-xl font-semibold tracking-tight text-slate-950">{item.title}</span>
              <span className="mt-3 block text-sm font-medium leading-7 text-slate-600">{item.customerSummary}</span>
              <span className="mt-4 block rounded-[1rem] border border-cyan-100 bg-white px-4 py-3 text-xs font-medium leading-5 text-slate-600">
                Why it matters: {item.customerValue}
              </span>
              <span className="mt-4 inline-flex rounded-2xl border border-cyan-200 bg-white px-4 py-2 text-xs font-bold text-slate-900 shadow-sm">{item.cta}</span>
            </Link>
          ))}
        </div>

        <div className="sr-only">
          Customer-led dashboard action inbox. Only the actions that protect progress stay here. No internal labels. No conversion role label. No raw payloads. No dark action inbox blocks. Next best plan projection retained safely. {ACTION_INBOX_ITEMS.map((item) => `${item.title} ${item.customerSummary} ${item.customerValue} ${item.projection.nextBestPlan}`).join(" ")}
        </div>
      </div>
    </section>
  );
}
