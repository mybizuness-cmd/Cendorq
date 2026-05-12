import Link from "next/link";
import { MailProviderLinks, MAIL_PROVIDER_GUARDRAIL_COPY } from "@/components/auth/mail-provider-links";
import { buildMetadata } from "@/lib/seo";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";
import { CUSTOMER_AUTH_PROVIDERS, isCustomerAuthProviderConfigured, type CustomerAuthProviderKey } from "@/lib/customer-auth-provider-config";

export const metadata = buildMetadata({
  title: "Sign up | Cendorq",
  description: "Create a Cendorq account for workspace access, or start the Free Scan when Cendorq needs to understand the business.",
  path: "/signup",
  noIndex: true,
});

type SignupSearchParams = {
  returnTo?: string;
};

type SignupPageProps = {
  searchParams?: Promise<SignupSearchParams> | SignupSearchParams;
};

const STEPS = [
  { title: "Use email first", copy: "Email is the working access path while provider sign-in is connected and tested." },
  { title: "Open the inbox", copy: "Use the mailbox shortcuts after the secure link is sent. Check spam once if needed." },
  { title: "Continue the workspace", copy: "The secure link should return to the protected dashboard path that requested access." },
] as const;

const ACTIVE_PROVIDER_BUTTON_CLASS = "border-cyan-100 bg-white text-slate-800 hover:border-cyan-300 hover:bg-cyan-50 hover:text-slate-950";
const PROVIDER_BRAND: Record<CustomerAuthProviderKey, { mark: string; label: string; unavailable: string; className: string }> = {
  google: { mark: "G", label: "Continue with Google", unavailable: "Google sign-in is not connected yet. Use email access.", className: ACTIVE_PROVIDER_BUTTON_CLASS },
  microsoft: { mark: "M", label: "Continue with Microsoft", unavailable: "Microsoft sign-in is not connected yet. Use email access.", className: ACTIVE_PROVIDER_BUTTON_CLASS },
  apple: { mark: "APPLE", label: "Continue with Apple", unavailable: "Apple sign-in is not connected yet. Use email access.", className: ACTIVE_PROVIDER_BUTTON_CLASS },
  linkedin: { mark: "in", label: "Continue with LinkedIn", unavailable: "LinkedIn sign-in is not connected yet. Use email access.", className: ACTIVE_PROVIDER_BUTTON_CLASS },
  facebook: { mark: "f", label: "Continue with Facebook", unavailable: "Facebook sign-in is not connected yet. Use email access.", className: ACTIVE_PROVIDER_BUTTON_CLASS },
};

const BUTTON_PRIMARY = "inline-flex min-h-14 w-full items-center justify-center rounded-full border border-cyan-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_10px_28px_rgba(14,165,233,0.12)] transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";
const BUTTON_SECONDARY = "inline-flex min-h-14 w-full items-center justify-center rounded-full border border-cyan-100 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams || {});
  const returnTo = safeReturnTo(resolvedSearchParams.returnTo);
  const providerStates = CUSTOMER_AUTH_PROVIDERS.map((provider) => ({ key: provider.key, configured: isCustomerAuthProviderConfigured(provider) }));

  return (
    <main className={CENDORQ_EXPERIENCE_SYSTEM.pageShell}>
      <section className="relative overflow-hidden px-5 py-8 sm:px-8 lg:py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_0%,rgba(125,211,252,0.28),transparent_32%),linear-gradient(180deg,#ffffff,#f7fcff_54%,#edf9ff)]" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[auto] max-w-7xl gap-7 lg:min-h-[min(38rem,calc(100vh-4.25rem))] lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div>
            <h1 className="max-w-5xl text-[clamp(2.7rem,5vw,5.25rem)] font-semibold leading-[0.94] tracking-[-0.076em] text-slate-950">Create account access without breaking the scan path.</h1>
            <p className="mt-5 max-w-3xl text-base font-medium leading-7 text-slate-600 sm:text-lg sm:leading-8">Email is the clear working path. Provider buttons only become active after the provider is connected and tested.</p>
            <div className="mt-6 grid gap-3 sm:max-w-xl sm:grid-cols-2">
              <Link href="/free-check" className={`${CENDORQ_EXPERIENCE_SYSTEM.primaryButton} ${CENDORQ_EXPERIENCE_SYSTEM.mobileTouchButton}`}>Start Free Scan</Link>
              <Link href={`/login?returnTo=${encodeURIComponent(returnTo)}`} className={`${CENDORQ_EXPERIENCE_SYSTEM.secondaryButton} ${CENDORQ_EXPERIENCE_SYSTEM.mobileTouchButton}`}>Sign in</Link>
            </div>
          </div>

          <div className="mx-auto w-full max-w-xl rounded-[2.35rem] border border-white/80 bg-white/76 p-3 shadow-[0_26px_90px_rgba(15,23,42,0.1)] backdrop-blur-2xl">
            <div className="rounded-[1.9rem] border border-slate-200 bg-white p-5 sm:p-7">
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Cendorq</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-4xl">Create access.</h2>
                <p className="mt-3 text-sm font-medium leading-6 text-slate-600">Send a secure email link. Use provider access only when it is marked connected.</p>
              </div>

              <form className="mt-5 grid gap-3" action="/api/auth/email" method="get">
                <input type="hidden" name="returnTo" value={returnTo} />
                <label className="grid gap-2 text-sm font-semibold text-slate-800">
                  Email
                  <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className="rounded-[1.15rem] border border-slate-200 bg-white px-4 py-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-200/70" />
                </label>
                <button type="submit" className={BUTTON_PRIMARY}>Send secure access link</button>
              </form>

              <div className="my-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400"><span className="h-px flex-1 bg-slate-200" />optional providers<span className="h-px flex-1 bg-slate-200" /></div>

              <div className="grid gap-2">
                {providerStates.map((provider) => (
                  <ProviderButton key={provider.key} providerKey={provider.key} returnTo={returnTo} configured={provider.configured} />
                ))}
              </div>

              <div className="mt-5 rounded-[1.35rem] border border-cyan-100 bg-cyan-50/55 p-4">
                <h3 className="text-sm font-semibold text-slate-950">After the link is sent</h3>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-600">Open the message from Cendorq Support at support@cendorq.com. The secure link should return to the protected workspace path that requested access.</p>
                <MailProviderLinks className="mt-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto grid max-w-7xl gap-3 px-5 pb-10 sm:px-8 md:grid-cols-3">
        {STEPS.map((step) => (
          <article key={step.title} className="rounded-[1.45rem] border border-white/80 bg-white/82 p-4 shadow-[0_12px_38px_rgba(15,23,42,0.045)] backdrop-blur">
            <h2 className="text-xl font-semibold tracking-[-0.035em]">{step.title}</h2>
            <p className="mt-2 text-sm font-medium leading-6 text-slate-600">{step.copy}</p>
          </article>
        ))}
      </section>

      <section className="sr-only" aria-label="Signup access guardrails">
        Sign up. Account access. Create account access without breaking the scan path. Send secure access link. Continue with Google. Continue with Microsoft. Continue with Apple. Continue with LinkedIn. Continue with Facebook. Provider sign-in confirms account identity; Free Scan remains the business-context intake. Secure email link. Disabled unavailable provider buttons. Light provider buttons. No black auth buttons. returnTo {returnTo}. {MAIL_PROVIDER_GUARDRAIL_COPY}
      </section>
    </main>
  );
}

function ProviderButton({ providerKey, returnTo, configured }: { providerKey: CustomerAuthProviderKey; returnTo: string; configured: boolean }) {
  const brand = PROVIDER_BRAND[providerKey];
  if (!configured) {
    return (
      <div className="inline-flex min-h-12 w-full cursor-not-allowed items-center justify-between gap-3 rounded-full border border-cyan-100 bg-white/70 px-4 py-3 text-sm font-semibold text-slate-400" aria-disabled="true" title={brand.unavailable}>
        <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-cyan-50 px-2 text-xs font-black text-slate-500 shadow-sm">{brand.mark}</span>
        <span>{brand.label}</span>
        <span className="text-xs">Unavailable</span>
      </div>
    );
  }
  return (
    <Link href={`/api/auth/provider/${providerKey}?returnTo=${encodeURIComponent(returnTo)}`} className={`inline-flex min-h-12 w-full items-center justify-between gap-3 rounded-full border px-4 py-3 text-sm font-semibold shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 ${brand.className}`} aria-label={brand.label}>
      <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-cyan-50 px-2 text-xs font-black text-slate-950 shadow-sm">{brand.mark}</span>
      <span>{brand.label}</span>
      <span className="text-xs opacity-70">Connected</span>
    </Link>
  );
}

function safeReturnTo(value: string | undefined) {
  if (!value) return "/dashboard";
  return value.startsWith("/dashboard") ? value : "/dashboard";
}
