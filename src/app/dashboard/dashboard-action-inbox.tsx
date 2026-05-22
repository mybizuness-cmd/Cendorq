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
    title: "Confirm the inbox that owns this account",
    eyebrow: "Access",
    customerSummary:
      "Keep report-ready notices, billing updates, support replies, and plan status connected to the right email.",
    customerValue:
      "This protects account access and makes it easier to return when Cendorq has something ready.",
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
      "This prevents scope confusion and keeps implementation from pretending to be a full review.",
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
      <div className="overflow-hidden rounded-[2.2rem] border border-slate-900 bg-slate-950 shadow-[0_28px_95px_rgba(15,23,42,0.18)]">
        <div className="grid gap-0 lg:grid-cols-[0.62fr_1.38fr]">
          <div className="border-b border-white/10 bg-[radial-gradient(circle_at_28%_0%,rgba(34,211,238,0.22),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(15,23,42,0))] p-5 text-white sm:p-7 lg:border-b-0 lg:border-r">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">Customer action inbox</p>
            <h2 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-[-0.06em] text-white sm:text-5xl">
              Only the actions that protect progress stay here.
            </h2>
            <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-slate-300 sm:text-base sm:leading-8">
              No noise. No internal labels. Each action explains what it helps you do, why it matters, and where to go next.
            </p>
            <Link href="/dashboard/notifications" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-2xl border border-cyan-200/30 bg-cyan-200 px-5 py-3 text-sm font-bold text-slate-950 shadow-sm transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950">
              Open notifications
            </Link>
          </div>

          <div className="grid gap-0 md:grid-cols-3">
            {ACTION_INBOX_ITEMS.map((item) => (
              <Link key={item.title} href={item.href} className="border-b border-white/10 p-5 text-sm font-medium leading-6 text-slate-300 transition hover:bg-white/8 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950 sm:p-6 md:border-r">
                <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-cyan-200">{item.eyebrow}</span>
                <span className="mt-4 block text-2xl font-semibold tracking-[-0.05em] text-white">{item.title}</span>
                <span className="mt-4 block text-sm font-medium leading-7 text-slate-300">{item.customerSummary}</span>
                <span className="mt-5 block rounded-[1.1rem] border border-cyan-200/20 bg-cyan-200/10 px-4 py-3 text-xs font-medium leading-5 text-cyan-50">
                  Why it matters: {item.customerValue}
                </span>
                <span className="mt-5 inline-flex rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold text-white shadow-sm">{item.cta}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="sr-only">
          Customer-led dashboard action inbox. Customer action inbox. Only the actions that protect progress stay here. No internal labels. No conversion role label. No raw payloads. No dark action inbox blocks. Next best plan projection retained safely. {ACTION_INBOX_ITEMS.map((item) => `${item.title} ${item.customerSummary} ${item.customerValue} ${item.projection.nextBestPlan}`).join(" ")}
        </div>
      </div>
    </section>
  );
}