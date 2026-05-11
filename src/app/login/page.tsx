import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CUSTOMER_AUTH_PROVIDERS, CUSTOMER_AUTH_SESSION_STANDARD } from "@/lib/customer-auth-provider-config";
import { CUSTOMER_AUTH_METHODS, CUSTOMER_EMAIL_DELIVERABILITY_STANDARD, CUSTOMER_EMAIL_ORCHESTRATION_STEPS, CUSTOMER_EMAIL_REVENUE_SEQUENCE } from "@/lib/customer-auth-orchestration";

export const metadata = buildMetadata({
  title: "Sign in | Cendorq",
  description: "Sign in to your Cendorq workspace with email or a supported identity provider while keeping Free Scan business context separate.",
  path: "/login",
  noIndex: true,
});

const BUTTON_PRIMARY = "inline-flex min-h-14 w-full items-center justify-center rounded-full border border-slate-950 bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08),0_8px_24px_rgba(15,23,42,0.08)] transition hover:border-slate-700 hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2";
const BUTTON_SECONDARY = "inline-flex min-h-14 w-full items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2";
const SMALL_LINK = "font-semibold text-slate-950 underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2";

export default function LoginPage({ searchParams }: { searchParams?: { auth?: string; provider?: string; returnTo?: string } }) {
  const returnTo = safeReturnTo(searchParams?.returnTo);
  const authNotice = buildAuthNotice(searchParams?.auth, searchParams?.provider);

  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-950">
      <section className="mx-auto grid min-h-[calc(100vh-4.25rem)] max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-16">
        <div>
          <p className="text-sm font-semibold text-slate-400">Account access</p>
          <h1 className="mt-4 max-w-5xl text-[clamp(3rem,6vw,6.15rem)] font-semibold leading-[0.94] tracking-[-0.072em] text-slate-950">Sign in to your workspace.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">Returning customers should continue automatically when a trusted session exists. If the browser, device, or session changed, sign in again with email or a provider.</p>
          <div className="mt-8 grid gap-3 sm:max-w-xl sm:grid-cols-2">
            <Link href={`/api/auth/continue?returnTo=${encodeURIComponent(returnTo)}`} className={BUTTON_PRIMARY}>Continue if remembered</Link>
            <Link href="/free-check" className={BUTTON_SECONDARY}>Start Free Scan</Link>
          </div>
        </div>

        <div className="mx-auto w-full max-w-xl rounded-[2.35rem] border border-slate-200 bg-white p-6 shadow-[0_30px_110px_rgba(15,23,42,0.1)] sm:p-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Cendorq</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">Sign in</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">Use the account email tied to your Free Scan, report, billing, or support history.</p>
          </div>

          {authNotice ? <div className="mt-6 rounded-[1.25rem] border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">{authNotice}</div> : null}

          <form className="mt-6 grid gap-3" action="/api/auth/email" method="get">
            <input type="hidden" name="returnTo" value={returnTo} />
            <label className="grid gap-2 text-sm font-semibold text-slate-800">
              Email
              <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className="rounded-[1.15rem] border border-slate-200 bg-white px-4 py-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-950/10" />
            </label>
            <button type="submit" className={BUTTON_PRIMARY}>Continue with email</button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400"><span className="h-px flex-1 bg-slate-200" />or<span className="h-px flex-1 bg-slate-200" /></div>

          <div className="grid gap-3">
            {CUSTOMER_AUTH_PROVIDERS.map((provider) => (
              <Link key={provider.key} href={`/api/auth/provider/${provider.key}?returnTo=${encodeURIComponent(returnTo)}`} className={BUTTON_SECONDARY} aria-label={provider.cta}>
                {provider.cta}
              </Link>
            ))}
          </div>

          <div className="mt-6 rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4 text-center">
            <h3 className="text-sm font-semibold text-slate-950">New to Cendorq?</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">Start with the Free Scan so the workspace is built from business facts, not only personal account identity.</p>
            <Link href="/free-check" className="mt-4 inline-flex text-sm font-semibold text-slate-950 underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2">Start Free Scan</Link>
          </div>

          <p className="mt-5 text-center text-xs leading-5 text-slate-500">By continuing, use the account that should own the Cendorq workspace. Account sign-in does not replace business intake.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8" aria-label="Access architecture">
        <div className="rounded-[2.25rem] border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <p className="text-sm font-semibold text-slate-400">Access standard</p>
          <h2 className="mt-3 max-w-5xl text-4xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-5xl">Fast for returning customers. Clear for new ones.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{CUSTOMER_AUTH_SESSION_STANDARD.map((rule) => <p key={rule} className="rounded-[1.35rem] border border-slate-200 bg-white p-4 text-sm font-semibold leading-7 text-slate-600">{rule}</p>)}</div>
          <p className="mt-6 text-sm leading-7 text-slate-600">Need a new workspace? <Link className={SMALL_LINK} href="/free-check">Start Free Scan</Link>. Already verified? Continue with email or a provider above.</p>
        </div>
      </section>

      <section className="sr-only" aria-label="Customer auth provider guardrails">Sign in to your workspace. Continue if remembered. Continue with email. Continue with Google. Continue with Microsoft. Continue with Apple. Continue with LinkedIn. Continue with Facebook. Provider sign-in confirms account identity; Free Scan remains the business-context intake. Returning customers should continue automatically when a trusted session is present. Changed device, expired session, cleared browser, or risk signal should return to sign in. Provider routes must fail safely when provider URLs are not configured. {CUSTOMER_AUTH_PROVIDERS.map((provider) => `${provider.cta} ${provider.envKey} ${provider.trustRole}`).join(" ")} {CUSTOMER_AUTH_SESSION_STANDARD.join(" ")} {CUSTOMER_AUTH_METHODS.map((item) => `${item.label} ${item.priority} ${item.customerPromise} ${item.revenueRole}`).join(" ")} {CUSTOMER_EMAIL_ORCHESTRATION_STEPS.map((item) => `${item.label} ${item.customerPromise} ${item.revenueRole}`).join(" ")} {CUSTOMER_EMAIL_DELIVERABILITY_STANDARD.join(" ")} {CUSTOMER_EMAIL_REVENUE_SEQUENCE.map((item) => `${item.label} ${item.trigger} ${item.targetPath} ${item.purpose}`).join(" ")}</section>
    </main>
  );
}

function safeReturnTo(value: string | undefined) {
  if (!value) return "/dashboard";
  return value.startsWith("/dashboard") ? value : "/dashboard";
}

function buildAuthNotice(auth: string | undefined, provider: string | undefined) {
  if (auth === "provider-not-ready") return `${provider ? `${titleCase(provider)} sign-in` : "This sign-in option"} is not connected yet. Use email for now.`;
  if (auth === "session-required") return "Sign in again to continue. The browser did not have a trusted active session.";
  if (auth === "unknown-provider") return "That sign-in provider is not available. Use email or another provider.";
  if (auth === "email-required") return "Enter the account email that should receive the secure Cendorq access link.";
  if (auth === "email-sent" || auth === "email-queued") return "Check your inbox for Cendorq Support <support@cendorq.com>. If this email has access, the secure workspace link will be there.";
  return null;
}

function titleCase(value: string) {
  return value.replace(/-/g, " ").replace(/\b\w/g, (character) => character.toUpperCase());
}
