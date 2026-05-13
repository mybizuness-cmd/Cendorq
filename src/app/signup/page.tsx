import Link from "next/link";
import { MailProviderLinks } from "@/components/auth/mail-provider-links";
import { buildMetadata } from "@/lib/seo";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";
import { CUSTOMER_AUTH_PROVIDERS, isCustomerAuthProviderConfigured, type CustomerAuthProviderKey } from "@/lib/customer-auth-provider-config";

export const metadata = buildMetadata({
  title: "Create account | Cendorq",
  description: "Create or access a Cendorq workspace with a secure email link or a connected identity provider.",
  path: "/signup",
  noIndex: true,
});

type SignupSearchParams = { returnTo?: string };
type SignupPageProps = { searchParams?: Promise<SignupSearchParams> | SignupSearchParams };

const ACCESS_POINTS = [
  { title: "Use one access method", copy: "Email, Google, Apple, or Microsoft should create the account or return the customer to it." },
  { title: "Land in the dashboard", copy: "A new customer can enter the workspace first, then start the Free Scan from the dashboard." },
  { title: "Keep the scan separate", copy: "Account access should not force a business scan before the customer can reach the workspace." },
] as const;

const PROVIDER_BRAND: Record<CustomerAuthProviderKey, { label: string; mark: string; className: string }> = {
  google: { label: "Continue with Google", mark: "G", className: "border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50" },
  microsoft: { label: "Continue with Microsoft", mark: "▦", className: "border-sky-100 bg-white text-slate-800 hover:border-sky-200 hover:bg-sky-50" },
  apple: { label: "Continue with Apple", mark: "", className: "border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:bg-slate-50" },
  linkedin: { label: "Continue with LinkedIn", mark: "in", className: "border-blue-100 bg-white text-slate-800 hover:border-blue-200 hover:bg-blue-50" },
  facebook: { label: "Continue with Facebook", mark: "f", className: "border-blue-100 bg-white text-slate-800 hover:border-blue-200 hover:bg-blue-50" },
};

const BUTTON_PRIMARY = "inline-flex min-h-14 w-full items-center justify-center rounded-full border border-cyan-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_10px_28px_rgba(14,165,233,0.12)] transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams || {});
  const returnTo = safeReturnTo(resolvedSearchParams.returnTo);
  const configuredProviders = CUSTOMER_AUTH_PROVIDERS.filter((provider) => isCustomerAuthProviderConfigured(provider));

  return (
    <main className={CENDORQ_EXPERIENCE_SYSTEM.pageShell}>
      <section className="relative overflow-hidden px-5 py-8 sm:px-8 lg:py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_0%,rgba(125,211,252,0.28),transparent_32%),linear-gradient(180deg,#ffffff,#f7fcff_54%,#edf9ff)]" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[auto] max-w-7xl gap-7 lg:min-h-[min(38rem,calc(100vh-4.25rem))] lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div>
            <h1 className="max-w-5xl text-[clamp(2.7rem,5vw,5.25rem)] font-semibold leading-[0.94] tracking-[-0.076em] text-slate-950">Create your Cendorq workspace.</h1>
            <p className="mt-5 max-w-3xl text-base font-medium leading-7 text-slate-600 sm:text-lg sm:leading-8">Use email to create or return to your workspace. When Google, Apple, Microsoft, or another provider is connected, the same button should sign you in or create the account automatically.</p>
            <div className="mt-6 grid gap-3 sm:max-w-xl sm:grid-cols-2">
              <Link href={`/login?returnTo=${encodeURIComponent(returnTo)}`} className={`${CENDORQ_EXPERIENCE_SYSTEM.primaryButton} ${CENDORQ_EXPERIENCE_SYSTEM.mobileTouchButton}`}>Already have access?</Link>
              <Link href="/free-check" className={`${CENDORQ_EXPERIENCE_SYSTEM.secondaryButton} ${CENDORQ_EXPERIENCE_SYSTEM.mobileTouchButton}`}>Start Free Scan</Link>
            </div>
          </div>

          <div className="mx-auto w-full max-w-xl rounded-[2.35rem] border border-white/80 bg-white/76 p-3 shadow-[0_26px_90px_rgba(15,23,42,0.1)] backdrop-blur-2xl">
            <div className="rounded-[1.9rem] border border-cyan-100 bg-white p-5 sm:p-7">
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-700">Cendorq</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-4xl">Create or access your workspace.</h2>
                <p className="mt-3 text-sm font-medium leading-6 text-slate-600">No password to remember. Cendorq sends a secure link to your inbox.</p>
              </div>

              {configuredProviders.length > 0 ? (
                <div className="mt-5 grid gap-2">
                  {configuredProviders.map((provider) => <ProviderButton key={provider.key} providerKey={provider.key} returnTo={returnTo} />)}
                  <div className="flex items-center gap-3 pt-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400"><span className="h-px flex-1 bg-slate-200" />or use email<span className="h-px flex-1 bg-slate-200" /></div>
                </div>
              ) : null}

              <form className="mt-5 grid gap-3" action="/api/auth/email" method="get">
                <input type="hidden" name="returnTo" value={returnTo} />
                <label className="grid gap-2 text-sm font-semibold text-slate-800">Email<input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className="rounded-[1.15rem] border border-slate-200 bg-white px-4 py-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-200/70" /></label>
                <button type="submit" className={BUTTON_PRIMARY}>Send secure access link</button>
              </form>

              <div className="mt-5 rounded-[1.35rem] border border-cyan-100 bg-cyan-50/55 p-4">
                <h3 className="text-sm font-semibold text-slate-950">After you send the link</h3>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-600">Open the email from Cendorq Support, confirm once, and continue to your dashboard. From there, Cendorq can guide you to the Free Scan if you have not started one yet.</p>
                <MailProviderLinks className="mt-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto grid max-w-7xl gap-3 px-5 pb-10 sm:px-8 md:grid-cols-3">
        {ACCESS_POINTS.map((step) => (
          <article key={step.title} className="rounded-[1.45rem] border border-white/80 bg-white/82 p-4 shadow-[0_12px_38px_rgba(15,23,42,0.045)] backdrop-blur">
            <h2 className="text-xl font-semibold tracking-[-0.035em]">{step.title}</h2>
            <p className="mt-2 text-sm font-medium leading-6 text-slate-600">{step.copy}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

function ProviderButton({ providerKey, returnTo }: { providerKey: CustomerAuthProviderKey; returnTo: string }) {
  const brand = PROVIDER_BRAND[providerKey];
  return (
    <Link href={`/api/auth/provider/${providerKey}?returnTo=${encodeURIComponent(returnTo)}`} className={`inline-flex min-h-12 w-full items-center justify-between gap-3 rounded-full border px-4 py-3 text-sm font-semibold shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 ${brand.className}`} aria-label={brand.label}>
      <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full border border-slate-200 bg-white px-2 text-xs font-black text-slate-950 shadow-sm">{brand.mark}</span>
      <span>{brand.label}</span>
      <span className="text-xs opacity-70">↗</span>
    </Link>
  );
}

function safeReturnTo(value: string | undefined) {
  if (!value) return "/dashboard";
  return value.startsWith("/dashboard") ? value : "/dashboard";
}
