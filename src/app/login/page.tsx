import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";
import { CUSTOMER_AUTH_PROVIDERS, type CustomerAuthProviderKey } from "@/lib/customer-auth-provider-config";
import { CUSTOMER_AUTH_METHODS, CUSTOMER_EMAIL_DELIVERABILITY_STANDARD, CUSTOMER_EMAIL_ORCHESTRATION_STEPS, CUSTOMER_EMAIL_REVENUE_SEQUENCE } from "@/lib/customer-auth-orchestration";

export const metadata = buildMetadata({
  title: "Sign in | Cendorq",
  description: "Sign in to your Cendorq workspace with email or a supported identity provider while keeping Free Scan business context separate.",
  path: "/login",
  noIndex: true,
});

type LoginSearchParams = {
  auth?: string;
  provider?: string;
  returnTo?: string;
};

const BUTTON_PRIMARY = "inline-flex min-h-14 w-full items-center justify-center rounded-full border border-slate-950 bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08),0_8px_24px_rgba(15,23,42,0.08)] transition hover:border-slate-700 hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2";
const BUTTON_SECONDARY = "inline-flex min-h-14 w-full items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-500 hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2";
const SMALL_LINK = "font-semibold text-slate-950 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2";

const CUSTOMER_ACCESS_POINTS = [
  "Use the same email you used for the Free Scan, purchase, or support request.",
  "Email access is passwordless. Cendorq should never ask you to remember a generated password.",
  "Provider sign-in is account identity only. It does not replace the Free Scan business intake.",
  "If provider access is not connected yet, use email or contact support@cendorq.com with your Cendorq email.",
] as const;

const PROVIDER_BRAND: Record<CustomerAuthProviderKey, { mark: string; label: string; unavailable: string; className: string }> = {
  google: {
    mark: "G",
    label: "Continue with Google",
    unavailable: "Google sign-in is not connected yet. Use email access or support.",
    className: "border-slate-300 bg-white text-slate-950 hover:border-slate-500 hover:bg-slate-50",
  },
  microsoft: {
    mark: "M",
    label: "Continue with Microsoft",
    unavailable: "Microsoft sign-in is not connected yet. Use email access or support.",
    className: "border-slate-300 bg-white text-slate-950 hover:border-slate-500 hover:bg-slate-50",
  },
  apple: {
    mark: "APPLE",
    label: "Continue with Apple",
    unavailable: "Apple sign-in is not connected yet. Use email access or support.",
    className: "border-slate-950 bg-slate-950 text-white hover:bg-slate-800",
  },
  linkedin: {
    mark: "in",
    label: "Continue with LinkedIn",
    unavailable: "LinkedIn sign-in is not connected yet. Use email access or support.",
    className: "border-[#0A66C2] bg-[#0A66C2] text-white hover:bg-[#0759aa]",
  },
  facebook: {
    mark: "f",
    label: "Continue with Facebook",
    unavailable: "Facebook sign-in is not connected yet. Use email access or support.",
    className: "border-[#1877F2] bg-[#1877F2] text-white hover:bg-[#1265d8]",
  },
};

export default async function LoginPage({ searchParams }: { searchParams?: LoginSearchParams | Promise<LoginSearchParams> }) {
  const resolvedSearchParams = await Promise.resolve(searchParams || {});
  const returnTo = safeReturnTo(resolvedSearchParams.returnTo);
  const authNotice = buildAuthNotice(resolvedSearchParams.auth, resolvedSearchParams.provider);

  return (
    <main className={CENDORQ_EXPERIENCE_SYSTEM.pageShell}>
      <section className="relative overflow-hidden px-5 py-10 sm:px-8 lg:py-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_0%,rgba(125,211,252,0.28),transparent_34%),linear-gradient(180deg,#ffffff,#f8fbff_58%,#eef8ff)]" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[calc(100vh-4.25rem)] max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div>
            <p className={CENDORQ_EXPERIENCE_SYSTEM.eyebrow}>Account access</p>
            <h1 className="mt-6 max-w-5xl text-[clamp(3rem,5.2vw,5.4rem)] font-semibold leading-[0.94] tracking-[-0.076em] text-slate-950">Return to your Cendorq workspace.</h1>
            <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">Use the same email from your Free Scan, purchase, or support history. Signing in confirms account identity; the Free Scan is where Cendorq learns the business.</p>
            <div className="mt-8 grid gap-3 sm:max-w-xl sm:grid-cols-2">
              <Link href={`/api/auth/continue?returnTo=${encodeURIComponent(returnTo)}`} className={BUTTON_PRIMARY}>Continue if remembered</Link>
              <Link href="/signup" className={BUTTON_SECONDARY}>Sign up</Link>
            </div>
          </div>

          <div className="mx-auto w-full max-w-xl rounded-[2.75rem] border border-white/80 bg-white/76 p-3 shadow-[0_36px_130px_rgba(15,23,42,0.13)] backdrop-blur-2xl">
            <div className="rounded-[2.2rem] border border-slate-200 bg-white p-6 sm:p-8">
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Cendorq</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">Sign in</h2>
                <p className="mt-4 text-sm font-medium leading-7 text-slate-600">Choose how you want to access your workspace.</p>
              </div>

              {authNotice ? <div role="status" aria-live="polite" className={`mt-6 rounded-[1.25rem] border p-4 text-sm font-semibold leading-6 ${authNotice.tone === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-950" : "border-amber-200 bg-amber-50 text-amber-950"}`}>{authNotice.message}</div> : null}

              <form className="mt-6 grid gap-3" action="/api/auth/email" method="get">
                <input type="hidden" name="returnTo" value={returnTo} />
                <label className="grid gap-2 text-sm font-semibold text-slate-800">
                  Email
                  <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className="rounded-[1.15rem] border border-slate-200 bg-white px-4 py-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-950/10" />
                </label>
                <button type="submit" className={BUTTON_PRIMARY}>Send secure access link</button>
              </form>

              <div className="my-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400"><span className="h-px flex-1 bg-slate-200" />or<span className="h-px flex-1 bg-slate-200" /></div>

              <div className="grid gap-3">
                {CUSTOMER_AUTH_PROVIDERS.map((provider) => (
                  <ProviderButton key={provider.key} providerKey={provider.key} returnTo={returnTo} />
                ))}
              </div>

              <div className="mt-6 rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4 text-center">
                <h3 className="text-sm font-semibold text-slate-950">New to Cendorq?</h3>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-600">Start with the Free Scan when you want Cendorq to understand the business. Sign up when you only need account identity and workspace access.</p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row"><Link href="/free-check" className={BUTTON_PRIMARY}>Start Free Scan</Link><Link href="/signup" className={BUTTON_SECONDARY}>Sign up</Link></div>
              </div>

              <p className="mt-5 text-center text-xs font-medium leading-5 text-slate-500">Cendorq never emails a password. Access uses a secure email link, a trusted session, or a connected provider.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8" aria-label="Customer access help">
        <div className="rounded-[2.5rem] border border-slate-200 bg-white p-6 shadow-[0_16px_55px_rgba(15,23,42,0.055)] sm:p-8">
          <p className="text-sm font-bold text-slate-500">How access works</p>
          <h2 className="mt-3 max-w-5xl text-4xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-5xl">Account access and business intake are separate.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{CUSTOMER_ACCESS_POINTS.map((rule) => <p key={rule} className="rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4 text-sm font-semibold leading-7 text-slate-600">{rule}</p>)}</div>
          <p className="mt-6 text-sm leading-7 text-slate-600">Need Cendorq to understand your business? <Link className={SMALL_LINK} href="/free-check">Run the Free Scan</Link>. Already have a workspace? Use the same email or provider above.</p>
        </div>
      </section>

      <section className="sr-only" aria-label="Customer auth provider guardrails">Return to your Cendorq workspace. Send secure access link. Email accepted. Email queued. Email unavailable. Trusted browser access may require secure session configuration. Continue with Google. Continue with Microsoft. Continue with Apple. Continue with LinkedIn. Continue with Facebook. Sign up. Create account. Account access and business intake are separate. Cendorq never emails a password. Provider sign-in confirms account identity; Free Scan remains the business-context intake. Unified Cendorq Experience System. {CUSTOMER_AUTH_PROVIDERS.map((provider) => `${provider.cta} ${provider.envKey} ${provider.trustRole}`).join(" ")} {CUSTOMER_ACCESS_POINTS.join(" ")} {CUSTOMER_AUTH_METHODS.map((item) => `${item.label} ${item.priority} ${item.customerPromise} ${item.revenueRole}`).join(" ")} {CUSTOMER_EMAIL_ORCHESTRATION_STEPS.map((item) => `${item.label} ${item.customerPromise} ${item.revenueRole}`).join(" ")} {CUSTOMER_EMAIL_DELIVERABILITY_STANDARD.join(" ")} {CUSTOMER_EMAIL_REVENUE_SEQUENCE.map((item) => `${item.label} ${item.trigger} ${item.targetPath} ${item.purpose}`).join(" ")}</section>
    </main>
  );
}

function ProviderButton({ providerKey, returnTo }: { providerKey: CustomerAuthProviderKey; returnTo: string }) {
  const brand = PROVIDER_BRAND[providerKey];
  return (
    <Link href={`/api/auth/provider/${providerKey}?returnTo=${encodeURIComponent(returnTo)}`} className={`inline-flex min-h-14 w-full items-center justify-between gap-3 rounded-full border px-5 py-3.5 text-sm font-semibold shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 ${brand.className}`} aria-label={brand.label} title={brand.unavailable}>
      <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-white px-2 text-xs font-black text-slate-950 shadow-sm">{brand.mark}</span>
      <span>{brand.label}</span>
      <span className="text-xs opacity-70">Not connected</span>
    </Link>
  );
}

function safeReturnTo(value: string | undefined) {
  if (!value) return "/dashboard";
  return value.startsWith("/dashboard") ? value : "/dashboard";
}

function buildAuthNotice(auth: string | undefined, provider: string | undefined): { tone: "success" | "warning"; message: string } | null {
  if (auth === "provider-not-ready") return { tone: "warning", message: `${provider ? `${titleCase(provider)} sign-in` : "This sign-in option"} is not connected yet. Use email access or contact support@cendorq.com for workspace help.` };
  if (auth === "session-unavailable") return { tone: "warning", message: "Trusted browser access is not fully connected yet. Sign in with email or a provider to continue." };
  if (auth === "session-required") return { tone: "warning", message: "This browser does not have an active Cendorq session yet. Sign in with email or a provider to continue." };
  if (auth === "unknown-provider") return { tone: "warning", message: "That sign-in provider is not available. Use email or another provider." };
  if (auth === "email-required") return { tone: "warning", message: "Enter the account email that should receive the secure Cendorq access link." };
  if (auth === "email-sent") return { tone: "success", message: "Cendorq accepted your access request. Check your inbox and spam for Cendorq Support <support@cendorq.com>. If it does not arrive, contact support@cendorq.com with the same email." };
  if (auth === "email-queued") return { tone: "warning", message: "Your access request was saved, but email delivery has not completed yet. Try again shortly or contact support@cendorq.com." };
  if (auth === "email-unavailable") return { tone: "warning", message: "Email delivery is not fully connected yet. Contact support@cendorq.com for access help and include the email you used for Cendorq." };
  return null;
}

function titleCase(value: string) {
  return value.replace(/-/g, " ").replace(/\b\w/g, (character) => character.toUpperCase());
}
