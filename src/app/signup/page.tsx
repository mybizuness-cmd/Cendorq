import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";

export const metadata = buildMetadata({
  title: "Start Free Scan | Cendorq",
  description: "Start with the Free Scan, or return with the email already connected to your Cendorq scan, form, or plan.",
  path: "/signup",
  noIndex: true,
});

type SignupSearchParams = { returnTo?: string };
type SignupPageProps = { searchParams?: Promise<SignupSearchParams> | SignupSearchParams };

const SAFE_DASHBOARD_PATHS = [
  "/dashboard",
  "/dashboard/reports",
  "/dashboard/reports/free-scan",
  "/dashboard/billing",
  "/dashboard/support",
  "/dashboard/notifications",
] as const;

const ACCESS_POINTS = [
  { title: "Start Free Scan", copy: "New visitors should begin here so Cendorq can understand the business and its first AI Visibility signal." },
  { title: "Use the same email", copy: "Returning customers should use the email from their scan, form, or plan." },
  { title: "Open real results", copy: "The dashboard should open only when there is something useful to show: scan, Diagnosis, report, plan, billing, or support context." },
] as const;

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams || {});
  const returnTo = safeReturnTo(resolvedSearchParams.returnTo);

  return (
    <main className={CENDORQ_EXPERIENCE_SYSTEM.pageShell}>
      <section className="relative overflow-hidden px-5 py-8 sm:px-8 lg:py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_0%,rgba(125,211,252,0.28),transparent_32%),linear-gradient(180deg,#ffffff,#f7fcff_54%,#edf9ff)]" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[auto] max-w-7xl gap-7 lg:min-h-[min(38rem,calc(100vh-4.25rem))] lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div>
            <h1 className="max-w-5xl text-[clamp(2.7rem,5vw,5.25rem)] font-semibold leading-[0.94] tracking-[-0.076em] text-slate-950">Start with the Free Scan.</h1>
            <p className="mt-5 max-w-3xl text-base font-medium leading-7 text-slate-600 sm:text-lg sm:leading-8">Cendorq checks the first AI Visibility signal: whether AI, search, and customers can understand, trust, and choose the business clearly.</p>
            <p className="mt-3 max-w-2xl text-xs font-semibold leading-5 text-slate-500">Already have an account? <Link href={`/login?returnTo=${encodeURIComponent(returnTo)}`} className="text-slate-950 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">Use customer access</Link>. Use the same email you used for your Free Scan, form, or plan.</p>
            <div className="mt-6 grid gap-3 sm:max-w-xl sm:grid-cols-2">
              <Link href="/free-check?access=free-scan-required&method=signup" className={`${CENDORQ_EXPERIENCE_SYSTEM.primaryButton} ${CENDORQ_EXPERIENCE_SYSTEM.mobileTouchButton}`}>Start Free Scan</Link>
              <Link href={`/login?returnTo=${encodeURIComponent(returnTo)}`} className={`${CENDORQ_EXPERIENCE_SYSTEM.secondaryButton} ${CENDORQ_EXPERIENCE_SYSTEM.mobileTouchButton}`}>Already have an account?</Link>
            </div>
          </div>

          <div className="mx-auto w-full max-w-xl rounded-[2.35rem] border border-white/80 bg-white/76 p-3 shadow-[0_26px_90px_rgba(15,23,42,0.1)] backdrop-blur-2xl">
            <div className="rounded-[1.9rem] border border-slate-200 bg-white p-5 sm:p-7">
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Cendorq access</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-4xl">Your account starts with the scan.</h2>
                <p className="mt-3 text-sm font-medium leading-6 text-slate-600">If you already submitted a Free Scan or bought a plan, use customer access with the same email. If not, start the scan first.</p>
              </div>

              <div className="mt-6 grid gap-3">
                {ACCESS_POINTS.map((step) => (
                  <article key={step.title} className="rounded-[1.45rem] border border-cyan-100 bg-cyan-50/45 p-4">
                    <h3 className="text-lg font-semibold tracking-[-0.035em] text-slate-950">{step.title}</h3>
                    <p className="mt-2 text-sm font-medium leading-6 text-slate-600">{step.copy}</p>
                  </article>
                ))}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Link href="/free-check?access=free-scan-required&method=signup-card" className={`${CENDORQ_EXPERIENCE_SYSTEM.primaryButton} ${CENDORQ_EXPERIENCE_SYSTEM.mobileTouchButton}`}>Start Free Scan</Link>
                <Link href={`/login?returnTo=${encodeURIComponent(returnTo)}`} className={`${CENDORQ_EXPERIENCE_SYSTEM.secondaryButton} ${CENDORQ_EXPERIENCE_SYSTEM.mobileTouchButton}`}>Customer access</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Signup access guardrails">
        Signup points first-time visitors to Free Scan. Returning customers use customer access with the same email used for a Free Scan or plan. Signup return paths use the same dashboard allowlist as customer access. Free Scan captures the first AI Visibility signal before Diagnosis, Review, Repair, Control, reports, billing, or support need dashboard access.
      </section>
    </main>
  );
}

function safeReturnTo(value: string | undefined) {
  if (!value) return "/dashboard";
  return SAFE_DASHBOARD_PATHS.find((path) => value === path || value.startsWith(`${path}/`)) || "/dashboard";
}
