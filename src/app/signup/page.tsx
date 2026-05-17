import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";

export const metadata = buildMetadata({
  title: "Start access | Cendorq",
  description: "Start Cendorq access through the Free Scan, or return with the email already connected to a scan, plan, report, billing, or support record.",
  path: "/signup",
  noIndex: true,
});

type SignupSearchParams = { returnTo?: string };
type SignupPageProps = { searchParams?: Promise<SignupSearchParams> | SignupSearchParams };

const ACCESS_POINTS = [
  { title: "Free Scan first", copy: "New customer access starts with the Free Scan so Cendorq understands the business before a dashboard opens." },
  { title: "One access page", copy: "Returning customers use the same customer access page with the email or provider from their scan, plan, report, billing, or support." },
  { title: "No blank account", copy: "If we cannot find your workspace, we send you to the Free Scan instead of opening an empty dashboard." },
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
            <p className="mt-5 max-w-3xl text-base font-medium leading-7 text-slate-600 sm:text-lg sm:leading-8">The Free Scan gives Cendorq the business context your workspace needs. If you already have an account, return with the same email you used for your Free Scan or plan.</p>
            <p className="mt-3 max-w-2xl text-xs font-semibold leading-5 text-slate-500">Already have an account? <Link href={`/login?returnTo=${encodeURIComponent(returnTo)}`} className="text-slate-950 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">Go to customer access</Link>. If you used a different email when you filled out the form or bought a plan, try that one.</p>
            <div className="mt-6 grid gap-3 sm:max-w-xl sm:grid-cols-2">
              <Link href="/free-check?access=free-scan-required&method=signup" className={`${CENDORQ_EXPERIENCE_SYSTEM.primaryButton} ${CENDORQ_EXPERIENCE_SYSTEM.mobileTouchButton}`}>Start Free Scan</Link>
              <Link href={`/login?returnTo=${encodeURIComponent(returnTo)}`} className={`${CENDORQ_EXPERIENCE_SYSTEM.secondaryButton} ${CENDORQ_EXPERIENCE_SYSTEM.mobileTouchButton}`}>Already have an account?</Link>
            </div>
          </div>

          <div className="mx-auto w-full max-w-xl rounded-[2.35rem] border border-white/80 bg-white/76 p-3 shadow-[0_26px_90px_rgba(15,23,42,0.1)] backdrop-blur-2xl">
            <div className="rounded-[1.9rem] border border-slate-200 bg-white p-5 sm:p-7">
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Cendorq access</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-4xl">Your workspace starts with the scan.</h2>
                <p className="mt-3 text-sm font-medium leading-6 text-slate-600">If you already submitted a Free Scan or bought a plan, use customer access with the same email or provider. If not, start the scan first.</p>
                <p className="mt-2 text-xs font-semibold leading-5 text-slate-500">Already have an account? <Link href={`/login?returnTo=${encodeURIComponent(returnTo)}`} className="text-slate-950 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">Use customer access</Link>.</p>
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
        Start access is a Free Scan handoff. No empty workspace accounts. Unknown visitors start Free Scan. Returning customers use customer access with the same email they used for a Free Scan or plan.
      </section>
    </main>
  );
}

function safeReturnTo(value: string | undefined) {
  if (!value) return "/dashboard";
  return value.startsWith("/dashboard") ? value : "/dashboard";
}
