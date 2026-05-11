import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";
import { CUSTOMER_PLATFORM_ROUTES, CUSTOMER_PLATFORM_STAGES } from "@/lib/customer-platform-route-map";
import { CUSTOMER_AUTH_PROVIDERS, CUSTOMER_AUTH_SESSION_STANDARD } from "@/lib/customer-auth-provider-config";
import { CUSTOMER_AUTH_METHODS, CUSTOMER_EMAIL_DELIVERABILITY_STANDARD, CUSTOMER_EMAIL_ORCHESTRATION_STEPS } from "@/lib/customer-auth-orchestration";

export const metadata = buildMetadata({
  title: "Create access | Cendorq",
  description: "Start a Cendorq workspace through the Free Scan, then return with secure email access or supported provider sign-in.",
  path: "/signup",
  noIndex: true,
});

const TRUST_STEPS = [
  { label: "Start", value: "Run the Free Scan.", detail: "Share the business context Cendorq needs to create or match your workspace." },
  { label: "Confirm", value: "Check your email.", detail: "Cendorq sends secure access from support@cendorq.com. No password is generated or emailed." },
  { label: "Return", value: "Use the same email later.", detail: "Come back with email access, a trusted session, or a connected provider when available." },
] as const;

const ACCESS_PROMISES = [
  "Your account email is the email used for the Free Scan or payment.",
  "Cendorq never emails a password or asks you to remember a generated password.",
  "A secure email link can restore access on a new device.",
  "The Free Scan captures business context; sign-in only brings you back to the workspace.",
] as const;

const SIGNUP_RULES = [
  "Private results open only after email confirmation.",
  "Use the same email for Free Scan, payments, support, and workspace access.",
  "Never send passwords, card numbers, private keys, or session tokens through support.",
  "Provider sign-in is for account access; it does not replace the business Free Scan.",
] as const;

export default function SignupPage() {
  return (
    <main className={CENDORQ_EXPERIENCE_SYSTEM.pageShell}>
      <section className="relative overflow-hidden px-5 py-12 sm:px-8 lg:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_0%,rgba(125,211,252,0.28),transparent_34%),linear-gradient(180deg,#ffffff,#f8fbff_58%,#eef8ff)]" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[calc(100vh-4.25rem)] max-w-7xl gap-8 lg:grid-cols-[0.84fr_1.16fr] lg:items-center">
          <div>
            <p className={CENDORQ_EXPERIENCE_SYSTEM.eyebrow}>Create access</p>
            <h1 className={`mt-6 max-w-5xl ${CENDORQ_EXPERIENCE_SYSTEM.pageHeadline}`}>Start with the Free Scan.</h1>
            <p className={`mt-6 max-w-3xl ${CENDORQ_EXPERIENCE_SYSTEM.body}`}>Cendorq creates or matches your workspace from the business context you submit. The email you use becomes the way back in.</p>
            <div className={`mt-8 ${CENDORQ_EXPERIENCE_SYSTEM.mobileActionRow}`}>
              <Link href="/free-check" className={`${CENDORQ_EXPERIENCE_SYSTEM.primaryButton} ${CENDORQ_EXPERIENCE_SYSTEM.mobileTouchButton}`}>Start Free Scan</Link>
              <Link href={routePath("login")} className={`${CENDORQ_EXPERIENCE_SYSTEM.secondaryButton} ${CENDORQ_EXPERIENCE_SYSTEM.mobileTouchButton}`}>Sign in</Link>
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">{ACCESS_PROMISES.map((promise) => <div key={promise} className="rounded-[1.35rem] border border-slate-200 bg-white/88 p-4 text-sm font-semibold leading-7 text-slate-600 shadow-sm">{promise}</div>)}</div>
          </div>

          <div className={CENDORQ_EXPERIENCE_SYSTEM.glassPanel}>
            <div className="rounded-[1.85rem] border border-slate-200 bg-white p-5 sm:rounded-[2.35rem] sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Access method</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">Email link first.</h2>
              <p className={`mt-5 ${CENDORQ_EXPERIENCE_SYSTEM.body}`}>Use your email to receive a secure access link from Cendorq Support. When provider access is connected, you can also return with Google, Microsoft, Apple, LinkedIn, or Facebook.</p>
              <div className="mt-7 grid gap-3">
                <Link href="/free-check" className={`${CENDORQ_EXPERIENCE_SYSTEM.primaryButton} w-full`}>Start Free Scan</Link>
                <Link href={routePath("login")} className={`${CENDORQ_EXPERIENCE_SYSTEM.secondaryButton} w-full`}>Send secure access link</Link>
                {CUSTOMER_AUTH_PROVIDERS.map((provider) => <Link key={provider.key} href={`/api/auth/provider/${provider.key}`} className={`${CENDORQ_EXPERIENCE_SYSTEM.secondaryButton} w-full`}>{provider.cta}</Link>)}
              </div>
              <p className="mt-5 rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4 text-sm font-medium leading-7 text-slate-600">On a new device, use the same email from your Free Scan or purchase. Cendorq will never email a password.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 pb-12 sm:px-8 md:grid-cols-3" aria-label="Create access path">
        {TRUST_STEPS.map((step) => <article key={step.label} className="rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-[0_16px_55px_rgba(15,23,42,0.055)]"><div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">{step.label}</div><h2 className={CENDORQ_EXPERIENCE_SYSTEM.cardHeadline}>{step.value}</h2><p className={`mt-4 ${CENDORQ_EXPERIENCE_SYSTEM.supportText}`}>{step.detail}</p></article>)}
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8" aria-label="Access safety">
        <div className="rounded-[2.25rem] border border-slate-200 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-8">
          <p className="text-sm font-bold text-slate-500">Access safety</p>
          <h2 className={`mt-3 max-w-5xl ${CENDORQ_EXPERIENCE_SYSTEM.sectionHeadline}`}>Your workspace starts with business context, then stays protected.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{SIGNUP_RULES.map((rule) => <p key={rule} className="rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4 text-sm font-semibold leading-7 text-slate-600">{rule}</p>)}</div>
          <div className="mt-7 text-sm text-slate-600">Already verified? <Link className="font-semibold text-slate-950 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2" href={routePath("login")}>Sign in</Link>.</div>
        </div>
      </section>

      <section className="sr-only" aria-label="Signup trust guardrails">Create access. Start with the Free Scan. Run the Free Scan. Check your email. Use the same email later. Cendorq sends secure access from support@cendorq.com. No password is generated or emailed. The account email is the email used for the Free Scan or payment. Provider sign-in confirms identity; it does not replace the business Free Scan intake. Premium signup hero scale. Responsive mobile-first signup page. Unified Cendorq Experience System. Continue with Google. Continue with Microsoft. Continue with Apple. Continue with LinkedIn. Continue with Facebook. {TRUST_STEPS.map((item) => `${item.label} ${item.value} ${item.detail}`).join(" ")} {ACCESS_PROMISES.join(" ")} {SIGNUP_RULES.join(" ")} {CUSTOMER_AUTH_PROVIDERS.map((provider) => `${provider.cta} ${provider.trustRole}`).join(" ")} {CUSTOMER_AUTH_SESSION_STANDARD.join(" ")} {CUSTOMER_AUTH_METHODS.map((method) => `${method.label} ${method.customerPromise}`).join(" ")} {CUSTOMER_EMAIL_ORCHESTRATION_STEPS.map((step) => `${step.label} ${step.customerPromise}`).join(" ")} {CUSTOMER_EMAIL_DELIVERABILITY_STANDARD.join(" ")} {CUSTOMER_PLATFORM_STAGES.slice(0, 4).map((stage) => `${stage.key} ${stage.label} ${stage.customerPromise}`).join(" ")}</section>
    </main>
  );
}

function routePath(key: (typeof CUSTOMER_PLATFORM_ROUTES)[number]["key"]) {
  return CUSTOMER_PLATFORM_ROUTES.find((route) => route.key === key)?.path || "/dashboard";
}
