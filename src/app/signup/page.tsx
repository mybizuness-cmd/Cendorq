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
  { title: "Open useful results", copy: "The dashboard should open only when there is something useful to show: scan, Diagnosis, report, plan, billing, or support context." },
] as const;

const START_CHECKS = [
  "Free Scan captures the first AI Visibility signal before Diagnosis, Review, Repair, Control, reports, billing, or support need dashboard access.",
  "Use the same email you used for your Free Scan, form, or plan.",
  "Signup return paths use the same dashboard allowlist as customer access.",
  "If work already exists, customer access should bring the customer back to it.",
] as const;

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams || {});
  const returnTo = safeReturnTo(resolvedSearchParams.returnTo);

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(251,207,232,0.2),transparent_30%),radial-gradient(circle_at_88%_0%,rgba(125,211,252,0.28),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_38%,#ffffff_100%)] text-slate-950">
      <SignupAtmosphere />

      <section className="relative mx-auto grid max-w-[92rem] gap-8 px-4 pb-10 pt-8 sm:px-6 md:pt-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center" aria-label="Free Scan first access">
        <div className="relative z-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Free Scan first</p>
          <h1 className="max-w-5xl text-[clamp(3rem,7vw,6.6rem)] font-semibold leading-[0.86] tracking-[-0.08em] text-slate-950">Start with the Free Scan.</h1>
          <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-xl sm:leading-9">Cendorq checks the first AI Visibility signal: whether AI, search, and customers can understand, trust, and choose the business clearly.</p>
          <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-slate-600">Already have an account? <Link href={`/login?returnTo=${encodeURIComponent(returnTo)}`} className="font-semibold text-slate-950 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">Use customer access</Link>. Use the same email you used for your Free Scan, form, or plan.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/free-check?access=free-scan-required&method=signup" className={CENDORQ_EXPERIENCE_SYSTEM.primaryButton}>Start Free Scan</Link>
            <Link href={`/login?returnTo=${encodeURIComponent(returnTo)}`} className={CENDORQ_EXPERIENCE_SYSTEM.secondaryButton}>Already have an account?</Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.35rem] border border-white/80 bg-white/78 p-5 shadow-[0_30px_100px_rgba(15,23,42,0.09)] backdrop-blur-2xl sm:p-7">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent" />
          <h2 className="text-[clamp(2.1rem,5vw,4.2rem)] font-semibold leading-[0.95] tracking-[-0.07em] text-slate-950">Your account starts with the scan.</h2>
          <p className="mt-5 text-base font-semibold leading-8 text-slate-600">If you already submitted a Free Scan or bought a plan, use customer access with the same email. If not, start the scan first.</p>
          <div className="mt-6 grid gap-3">
            {ACCESS_POINTS.map((step) => (
              <article key={step.title} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/42 p-4 shadow-sm">
                <h3 className="text-2xl font-semibold tracking-[-0.045em] text-slate-950">{step.title}</h3>
                <p className="mt-2 text-xs font-semibold leading-6 text-slate-600">{step.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-16 sm:px-6" aria-label="Signup access checks">
        <div className="overflow-hidden rounded-[2.15rem] border border-white/80 bg-white/84 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.055)] backdrop-blur sm:p-7">
          <div className="grid gap-5 lg:grid-cols-[0.48fr_0.52fr] lg:items-start">
            <div>
              <h2 className="text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">First-time customers need a real business signal.</h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">This path keeps signup from becoming an empty account. Start with a scan, or return through Customer Access when a customer record already exists.</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {START_CHECKS.map((check) => <p key={check} className="rounded-[1rem] border border-cyan-100 bg-cyan-50/40 p-3 text-xs font-semibold leading-5 text-slate-700">{check}</p>)}
            </div>
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Signup access guardrails">
        Signup points first-time visitors to Free Scan. Returning customers use customer access with the same email used for a Free Scan or plan. Signup return paths use the same dashboard allowlist as customer access. Free Scan captures the first AI Visibility signal before Diagnosis, Review, Repair, Control, reports, billing, or support need dashboard access. New visitors should begin here so Cendorq can understand the business and its first AI Visibility signal. scan, Diagnosis, report, plan, billing, or support context. SAFE_DASHBOARD_PATHS. focus:outline-none. focus-visible:ring-2.
      </section>
    </main>
  );
}

function SignupAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(251,207,232,0.16),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.17),transparent_27%),linear-gradient(180deg,rgba(255,255,255,0.4),rgba(239,249,255,0.74)_42%,rgba(255,255,255,0.95)_100%)]" />
      <div className="absolute left-1/2 top-0 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-cyan-200/24 blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.018]" />
    </div>
  );
}

function safeReturnTo(value: string | undefined) {
  if (!value) return "/dashboard";
  return SAFE_DASHBOARD_PATHS.find((path) => value === path || value.startsWith(`${path}/`)) || "/dashboard";
}
