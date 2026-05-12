import Link from "next/link";
import { MailProviderLinks, MAIL_PROVIDER_GUARDRAIL_COPY } from "@/components/auth/mail-provider-links";
import { buildMetadata } from "@/lib/seo";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";
import { CUSTOMER_AUTH_PROVIDERS, type CustomerAuthProviderKey } from "@/lib/customer-auth-provider-config";

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
  {
    title: "Create account access",
    copy: "Use email or a connected provider to enter the protected Cendorq workspace.",
  },
  {
    title: "Confirm the inbox",
    copy: "Open the secure Cendorq Support email, then return to the dashboard path that requested access.",
  },
  {
    title: "Start or continue Free Scan",
    copy: "Use Free Scan when Cendorq needs business facts before showing readiness results.",
  },
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

const BUTTON_PRIMARY = "inline-flex min-h-14 w-full items-center justify-center rounded-full border border-slate-950 bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08),0_8px_24px_rgba(15,23,42,0.08)] transition hover:border-slate-700 hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2";
const BUTTON_SECONDARY = "inline-flex min-h-14 w-full items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-500 hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2";

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams || {});
  const returnTo = safeReturnTo(resolvedSearchParams.returnTo);

  return (
    <main className={CENDORQ_EXPERIENCE_SYSTEM.pageShell}>
      <section className="relative overflow-hidden px-5 py-10 sm:px-8 lg:py-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_0%,rgba(125,211,252,0.28),transparent_32%),linear-gradient(180deg,#ffffff,#f7fcff_54%,#edf9ff)]" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[calc(100vh-4.25rem)] max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <p className={CENDORQ_EXPERIENCE_SYSTEM.eyebrow}>Account access</p>
            <h1 className="mt-6 max-w-5xl text-[clamp(3rem,5.4vw,5.9rem)] font-semibold leading-[0.92] tracking-[-0.078em] text-slate-950">Create account access without breaking the scan path.</h1>
            <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">Use email or a connected provider to open a protected workspace. Start Free Scan when Cendorq needs business context before showing readiness results.</p>
            <div className="mt-8 grid gap-3 sm:max-w-xl sm:grid-cols-2">
              <Link href="/free-check" className={`${CENDORQ_EXPERIENCE_SYSTEM.primaryButton} ${CENDORQ_EXPERIENCE_SYSTEM.mobileTouchButton}`}>Start Free Scan</Link>
              <Link href={`/login?returnTo=${encodeURIComponent(returnTo)}`} className={`${CENDORQ_EXPERIENCE_SYSTEM.secondaryButton} ${CENDORQ_EXPERIENCE_SYSTEM.mobileTouchButton}`}>Sign in</Link>
            </div>
          </div>

          <div className="mx-auto w-full max-w-xl rounded-[2.75rem] border border-white/80 bg-white/76 p-3 shadow-[0_36px_130px_rgba(15,23,42,0.13)] backdrop-blur-2xl">
            <div className="rounded-[2.2rem] border border-slate-200 bg-white p-6 sm:p-8">
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Cendorq</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">Choose account access.</h2>
                <p className="mt-4 text-sm font-medium leading-7 text-slate-600">Use a secure email link now, or a connected provider when provider access is configured.</p>
              </div>

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

              <div className="mt-6 rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-semibold text-slate-950">After the link is sent</h3>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-600">Open the message from Cendorq Support at support@cendorq.com. The secure link should return to the protected workspace path that requested access.</p>
                <MailProviderLinks className="mt-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto grid max-w-7xl gap-4 px-5 pb-16 sm:px-8 md:grid-cols-3">
        {STEPS.map((step) => (
          <article key={step.title} className="rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-[0_16px_55px_rgba(15,23,42,0.055)]">
            <h2 className="text-2xl font-semibold tracking-[-0.04em]">{step.title}</h2>
            <p className="mt-4 text-sm font-medium leading-7 text-slate-600">{step.copy}</p>
          </article>
        ))}
      </section>

      <section className="sr-only" aria-label="Signup access guardrails">
        Sign up. Account access. Create account access without breaking the scan path. Send secure access link. Continue with Google. Continue with Microsoft. Continue with Apple. Continue with LinkedIn. Continue with Facebook. Provider sign-in confirms account identity; Free Scan remains the business-context intake. Secure email link. returnTo {returnTo}. {MAIL_PROVIDER_GUARDRAIL_COPY}
      </section>
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
