import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CUSTOMER_PLATFORM_ROUTES, CUSTOMER_PLATFORM_STAGES } from "@/lib/customer-platform-route-map";
import { CUSTOMER_AUTH_METHODS, CUSTOMER_EMAIL_DELIVERABILITY_STANDARD, CUSTOMER_EMAIL_ORCHESTRATION_STEPS } from "@/lib/customer-auth-orchestration";

export const metadata = buildMetadata({
  title: "Create your Cendorq account | Cendorq",
  description:
    "Create a secure Cendorq account, confirm your email, and start the Free Scan inside your customer dashboard.",
  path: "/signup",
  noIndex: true,
});

const PROVIDERS = ["Google", "Microsoft", "Apple"] as const;
const VALUE_POINTS = [
  "Save the Free Scan and every dashboard handoff under one verified workspace",
  "Keep report, billing, support, and notification context connected",
  "Use the first signal before choosing Deep Review, Build Fix, or Ongoing Control",
  "Return by magic link without restarting the customer journey",
] as const;

const ACCESS_TO_FIRST_SIGNAL_JOURNEY = [
  { label: "1 / Create", value: "Use a business email", detail: "Start with the address that should own reports, billing, support status, and lifecycle messages." },
  { label: "2 / Verify", value: "Confirm the inbox", detail: "Dashboard and result access stay gated until the email proves customer ownership." },
  { label: "3 / Scan", value: "Submit safe business context", detail: "The Free Scan needs business context only, never passwords, card numbers, tokens, or private keys." },
  { label: "4 / Decide", value: "Open the result path", detail: "Use the Free Scan result to choose whether diagnosis, scoped implementation, or monthly control fits next." },
] as const;

const FIRST_SIGNAL_HANDOFF_STANDARDS = [
  { label: "Account purpose", value: "Own the workspace", detail: "Signup should explain why the account exists before asking for credentials." },
  { label: "Verification purpose", value: "Protect result access", detail: "Email confirmation is a customer-safety gate, not a vague signup delay." },
  { label: "Free Scan purpose", value: "Earn the first paid decision", detail: "Free Scan creates the first visible signal without pretending to be full diagnosis." },
  { label: "Paid path purpose", value: "Different depth, not pressure", detail: "Plan choice should come from result stage, evidence, and fit." },
] as const;

const ONBOARDING_OPERATING_SNAPSHOT = [
  { label: "Access posture", value: "Verified-email gate", detail: "Dashboard, Free Scan history, support status, and results stay behind confirmed customer access." },
  { label: "Privacy posture", value: "No account-existence leakage", detail: "Confirmation guidance stays useful without exposing whether another person already has an account." },
  { label: "Session posture", value: "Magic-link-first re-entry", detail: "Returning customers should use email magic link first, passkey-ready access later, and password as fallback." },
  { label: "Handoff posture", value: "Private dashboard path", detail: "After verification, the customer continues into the dashboard with a clear next action and safe fallback." },
] as const;

const ACCOUNT_PROTECTION_RULES = [
  "Use a work email you control so dashboard, report, support, billing, and lifecycle emails stay connected to the right business.",
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
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-6 text-white sm:px-6 md:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(103,232,249,0.12),transparent_32%),radial-gradient(circle_at_86%_8%,rgba(14,165,233,0.08),transparent_34%)]" />
      <div className="sr-only">{PROVIDER_ROUTE_ANCHORS.join(" ")}</div>

      <section className="relative z-10 grid gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold text-cyan-100">Customer platform access</p>
          <h1 className="system-hero-title mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Create the workspace that protects your first signal and keeps every next step connected.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            Your account is not just a login. It becomes the verified place for the Free Scan, result path, plan decision, billing, notifications, and support history.
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
            Verify once. Continue the scan safely.
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Choose a provider or create credentials directly. Email confirmation is required before dashboard and result access, and the next destination is the Free Scan or the dashboard result path.
          </p>
          <div className="mt-5 grid gap-3">
            {PROVIDERS.map((provider) => (
              <Link key={provider} href="/verify-email" className="rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
                Continue with {provider}
              </Link>
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
              <input name="password" type="password" required autoComplete="new-password" placeholder="Create a secure fallback password" className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-200/40" />
            </label>
            <button type="submit" className="rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Create account and confirm email
            </button>
          </form>
          <p className="mt-4 text-xs leading-6 text-slate-400">
            Dashboard and result access require email confirmation. Confirmation responses stay bounded and do not expose another customer’s account state.
          </p>
        </div>
      </section>

      <section className="relative z-10 mt-8 rounded-[1.55rem] border border-white/10 bg-white/[0.035] p-4 sm:rounded-[1.7rem] sm:p-6" aria-label="Access to first signal journey">
        <div>
          <p className="text-sm font-semibold text-cyan-100">Access to first signal journey</p>
          <h2 className="mt-2 max-w-4xl text-2xl font-semibold tracking-tight text-white sm:text-4xl">
            The account exists to get the customer to a verified first result.
          </h2>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {ACCESS_TO_FIRST_SIGNAL_JOURNEY.map((step) => (
            <article key={step.label} className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4 sm:p-5">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-100">{step.label}</div>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">{step.value}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{step.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4" aria-label="First signal handoff standards">
        {FIRST_SIGNAL_HANDOFF_STANDARDS.map((item) => (
          <article key={item.label} className="system-surface rounded-[1.35rem] p-5">
            <div className="text-sm font-semibold text-cyan-100">{item.label}</div>
            <div className="mt-3 text-xl font-semibold tracking-tight text-white">{item.value}</div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="sr-only" aria-label="Signup guardrails">
        Email confirmation before dashboard and result access. Access to first signal journey. The account exists to get the customer to a verified first result. First signal handoff standards. Provider sign up or email and password. Email magic link. Magic-link-first re-entry. One-time Cendorq welcome email after verified account creation. Free Scan handoff into your private dashboard. Signup onboarding operating snapshot. Account protection before access. Signup trust rules. Transactional emails and marketing follow-up remain separated. {ACCESS_TO_FIRST_SIGNAL_JOURNEY.map((item) => `${item.label} ${item.value} ${item.detail}`).join(" ")} {FIRST_SIGNAL_HANDOFF_STANDARDS.map((item) => `${item.label} ${item.value} ${item.detail}`).join(" ")} {ONBOARDING_OPERATING_SNAPSHOT.map((item) => `${item.label} ${item.value} ${item.detail}`).join(" ")} {ACCOUNT_PROTECTION_RULES.join(" ")} {SIGNUP_TRUST_RULES.join(" ")} {CUSTOMER_AUTH_METHODS.map((method) => `${method.label} ${method.customerPromise}`).join(" ")} {CUSTOMER_EMAIL_ORCHESTRATION_STEPS.map((step) => `${step.label} ${step.customerPromise}`).join(" ")} {CUSTOMER_EMAIL_DELIVERABILITY_STANDARD.join(" ")} {CUSTOMER_PLATFORM_STAGES.slice(0, 4).map((stage) => `${stage.key} ${stage.label} ${stage.customerPromise}`).join(" ")}
      </section>

      <div className="relative z-10 mt-8 text-sm text-slate-400">
        Already verified? <Link className="font-semibold text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950" href={routePath("login")}>Send a magic link</Link>.
      </div>
    </main>
  );
}

function routePath(key: (typeof CUSTOMER_PLATFORM_ROUTES)[number]["key"]) {
  return CUSTOMER_PLATFORM_ROUTES.find((route) => route.key === key)?.path || "/dashboard";
}
