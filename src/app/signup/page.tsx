import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CUSTOMER_PLATFORM_ROUTES, CUSTOMER_PLATFORM_STAGES } from "@/lib/customer-platform-route-map";

export const metadata = buildMetadata({
  title: "Create your Cendorq account | Cendorq",
  description:
    "Create a secure Cendorq account, confirm your email, and start the Free Scan inside your customer dashboard.",
  path: "/signup",
  noIndex: true,
});

const PROVIDERS = ["Google", "Microsoft", "Apple"] as const;
const TRUST_POINTS = [
  "Email confirmation before dashboard and result access",
  "Provider sign up or email and password",
  "One-time Cendorq welcome email after verified account creation",
  "Free Scan handoff into your private dashboard",
] as const;

export default function SignupPage() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-8 text-white sm:px-6 md:py-12 xl:py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(103,232,249,0.12),transparent_34%),radial-gradient(circle_at_82%_8%,rgba(14,165,233,0.11),transparent_32%)]" />
      <section className="relative z-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <div className="system-chip inline-flex rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">
            Customer platform access
          </div>
          <h1 className="system-hero-title mt-5 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Create your Cendorq account before the Free Scan.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            Cendorq starts with verified access so your scan, report status, billing, saved recommendations, and future business history stay connected inside your own dashboard.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {TRUST_POINTS.map((point) => (
              <div key={point} className="system-surface rounded-[1.25rem] p-4 text-sm leading-6 text-slate-200">
                {point}
              </div>
            ))}
          </div>
        </div>

        <div className="system-panel-authority relative overflow-hidden rounded-[2.25rem] p-6 sm:p-8">
          <div className="relative z-10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">
              Sign up options
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
              Fast, secure, and built to keep your scan connected.
            </h2>
            <div className="mt-6 grid gap-3">
              {PROVIDERS.map((provider) => (
                <a
                  key={provider}
                  href="/verify-email"
                  className="rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
                >
                  Continue with {provider}
                </a>
              ))}
            </div>

            <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-500">
              <span className="h-px flex-1 bg-white/10" />
              or
              <span className="h-px flex-1 bg-white/10" />
            </div>

            <form className="grid gap-4" action="/verify-email">
              <label className="grid gap-2 text-sm font-medium text-slate-200">
                Work email
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-slate-200">
                Password
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="Create a secure password"
                  className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60"
                />
              </label>
              <button className="rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200">
                Create account and confirm email
              </button>
            </form>
            <p className="mt-4 text-xs leading-6 text-slate-400">
              By continuing, you agree to Cendorq account, email confirmation, and customer dashboard access controls. Dashboard and result access require email confirmation.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-10 grid gap-4 md:grid-cols-3">
        {CUSTOMER_PLATFORM_STAGES.slice(0, 3).map((stage) => (
          <article key={stage.key} className="system-surface rounded-[1.5rem] p-5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">{stage.label}</div>
            <p className="mt-3 text-sm leading-7 text-slate-300">{stage.customerPromise}</p>
          </article>
        ))}
      </section>

      <div className="relative z-10 mt-8 text-sm text-slate-400">
        Already verified? <Link className="font-semibold text-cyan-200" href={routePath("dashboard")}>Open your dashboard</Link>.
      </div>
    </main>
  );
}

function routePath(key: (typeof CUSTOMER_PLATFORM_ROUTES)[number]["key"]) {
  return CUSTOMER_PLATFORM_ROUTES.find((route) => route.key === key)?.path || "/dashboard";
}
