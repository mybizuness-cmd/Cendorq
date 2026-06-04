import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sign-up | Cendorq",
  description: "Start Scan first, or sign in with the same email already connected to your Cendorq work.",
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

const PRIMARY_CTA_CLASS = "inline-flex min-h-14 items-center justify-center rounded-full border border-cyan-200 bg-cyan-100 px-8 py-4 text-base font-black text-slate-950 shadow-[0_18px_48px_rgba(14,165,233,0.14)] transition hover:-translate-y-0.5 hover:bg-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";
const SECONDARY_CTA_CLASS = "inline-flex min-h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 text-base font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams || {});
  const returnTo = safeReturnTo(resolvedSearchParams.returnTo);

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(251,207,232,0.16),transparent_30%),radial-gradient(circle_at_88%_0%,rgba(125,211,252,0.14),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f7fcff_45%,#ffffff_100%)] text-slate-950">
      <SignupAtmosphere />

      <section className="relative mx-auto grid min-h-[calc(100vh-4.5rem)] max-w-[92rem] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:py-14" aria-label="Sign-up">
        <div className="relative z-10 max-w-4xl">
          <p className="text-sm font-semibold text-cyan-700">Sign-up</p>
          <h1 className="mt-4 max-w-5xl text-[clamp(3rem,7.6vw,6.8rem)] font-semibold leading-[0.86] tracking-[-0.09em] text-slate-950">
            Start with Scan.
          </h1>
          <p className="mt-6 max-w-2xl text-base font-semibold leading-7 text-slate-600 sm:text-xl sm:leading-9">
            New here? Start Scan so Cendorq has real business context. Already submitted something? Sign in with the same email.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/free-check?access=free-scan-required&method=signup" className={PRIMARY_CTA_CLASS}>Start Scan</Link>
            <Link href={`/login?returnTo=${encodeURIComponent(returnTo)}`} className={SECONDARY_CTA_CLASS}>Sign-in/Sign-up</Link>
          </div>
        </div>

        <section className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/88 p-5 shadow-[0_26px_84px_rgba(15,23,42,0.075)] backdrop-blur-2xl sm:p-7" aria-label="Sign-up guidance">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(251,207,232,0.14),transparent_36%),radial-gradient(circle_at_100%_100%,rgba(186,230,253,0.1),transparent_40%)]" aria-hidden="true" />
          <div className="relative">
            <p className="text-sm font-semibold text-cyan-700">How access works</p>
            <h2 className="mt-3 text-[clamp(2.25rem,4.7vw,4.6rem)] font-semibold leading-[0.92] tracking-[-0.075em] text-slate-950">No blank account.</h2>
            <p className="mt-5 text-sm font-semibold leading-7 text-slate-600">
              Cendorq should show useful work: a scan, plan, report, billing, or support record. If none exists yet, Scan is the right first step.
            </p>
          </div>
        </section>
      </section>

      <section className="sr-only" aria-label="Sign-up validation anchors">
        Sign-up. Sign-in/Sign-up. Start Scan. One clear page. No crowded boxes. Customer Access label removed from visible page. AI Search Presence Repair. No AI Visibility wording. No blank account detour. No guaranteed rankings, leads, revenue, ROI, or AI placement.
      </section>
    </main>
  );
}

function SignupAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(251,207,232,0.12),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.09),transparent_27%),linear-gradient(180deg,rgba(255,255,255,0.45),rgba(248,252,255,0.68)_42%,rgba(255,255,255,0.95)_100%)]" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.014]" />
    </div>
  );
}

function safeReturnTo(value: string | undefined) {
  if (!value) return "/dashboard";
  return SAFE_DASHBOARD_PATHS.find((path) => value === path || value.startsWith(`${path}/`)) || "/dashboard";
}
