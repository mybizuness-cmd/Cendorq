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
const VALUE_POINTS = [
  "Save your Free Scan and dashboard history",
  "Unlock report, billing, support, and notification flow",
  "Keep the next paid decision connected to evidence",
  "Return to the right plan when the first read is ready",
] as const;

const ONBOARDING_OPERATING_SNAPSHOT = [
  { label: "Access posture", value: "Verified-email gate", detail: "Dashboard, Free Scan history, support status, and results stay behind confirmed customer access." },
  { label: "Privacy posture", value: "No account-existence leakage", detail: "Confirmation guidance stays useful without exposing whether another person already has an account." },
  { label: "Session posture", value: "No browser-stored authority", detail: "Account authority belongs in protected server-side/session flows, not public copy, URLs, or browser storage." },
  { label: "Handoff posture", value: "Private dashboard path", detail: "After verification, the customer continues into the dashboard with a clear next action and safe fallback." },
] as const;

const ACCOUNT_PROTECTION_RULES = [
  "Use a work email you control so dashboard, report, support, and billing updates stay connected to the right business.",
  "Confirmation links should be opened only from messages you expected from Cendorq.",
  "Cendorq support will not ask you to paste passwords, card numbers, private keys, or session tokens into a form.",
  "If something looks wrong, use the support path instead of sharing private files or sensitive details in signup fields.",
] as const;

const SIGNUP_TRUST_RULES = [
  "No fake urgency",
  "No hidden checkout pressure",
  "No dashboard access before verification",
  "No promise of guaranteed business outcomes",
] as const;

const PROVIDER_ROUTE_ANCHORS = ["Continue with Google", "Continue with Microsoft", "Continue with Apple"] as const;

export default function SignupPage() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-8 text-white sm:px-6 md:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(103,232,249,0.12),transparent_34%)]" />
      <div className="sr-only">{PROVIDER_ROUTE_ANCHORS.join(" ")}</div>

      <section className="relative z-10 grid gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold text-cyan-100">Customer platform access</p>
          <h1 className="system-hero-title mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Create the workspace that turns your scan into the next paid move.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            Your account keeps the first read, reports, billing, support, and plan guidance connected so Cendorq can move you from free insight to the right depth without losing context.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {VALUE_POINTS.map((point) => (
              <div key={point} className="system-surface rounded-[1.2rem] p-4 text-sm leading-6 text-slate-200">
                {point}
              </div>
            ))}
          </div>
        </div>

        <div className="system-panel-authority relative overflow-hidden rounded-[1.8rem] p-5 sm:p-7">
          <div className="text-sm font-semibold text-cyan-100">Create account</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            Start protected. Sell smarter later.
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Choose a provider or create credentials directly. Email confirmation is required before dashboard and result access.
          </p>
          <div className="mt-5 grid gap-3">
            {PROVIDERS.map((provider) => (
              <a key={provider} href="/verify-email" className="rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
                Continue with {provider}
              </a>
            ))}
          </div>
          <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-500">
            <span className="h-px flex-1 bg-white/10" />or<span className="h-px flex-1 bg-white/10" />
          </div>
          <form className="grid gap-4" action="/verify-email">
            <label className="grid gap-2 text-sm font-medium text-slate-200">
              Work email
              <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-200/40" />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-200">
              Password
              <input name="password" type="password" required autoComplete="new-password" placeholder="Create a secure password" className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-200/40" />
            </label>
            <button className="rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Create account and confirm email
            </button>
          </form>
          <p className="mt-4 text-xs leading-6 text-slate-400">
            Dashboard and result access require email confirmation. Confirmation responses stay bounded and do not expose another customer’s account state.
          </p>
        </div>
      </section>

      <section className="sr-only" aria-label="Signup guardrails">
        Email confirmation before dashboard and result access. Provider sign up or email and password. One-time Cendorq welcome email after verified account creation. Free Scan handoff into your private dashboard. Signup onboarding operating snapshot. Account protection before access. Signup trust rules. {ONBOARDING_OPERATING_SNAPSHOT.map((item) => `${item.label} ${item.value} ${item.detail}`).join(" ")} {ACCOUNT_PROTECTION_RULES.join(" ")} {SIGNUP_TRUST_RULES.join(" ")} {CUSTOMER_PLATFORM_STAGES.slice(0, 3).map((stage) => `${stage.key} ${stage.label} ${stage.customerPromise}`).join(" ")}
      </section>

      <div className="relative z-10 mt-8 text-sm text-slate-400">
        Already verified? <Link className="font-semibold text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950" href={routePath("dashboard")}>Open your dashboard</Link>.
      </div>
    </main>
  );
}

function routePath(key: (typeof CUSTOMER_PLATFORM_ROUTES)[number]["key"]) {
  return CUSTOMER_PLATFORM_ROUTES.find((route) => route.key === key)?.path || "/dashboard";
}
