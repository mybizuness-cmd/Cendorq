import Link from "next/link";
import { MailProviderLinks } from "@/components/auth/mail-provider-links";
import { buildMetadata } from "@/lib/seo";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";

export const metadata = buildMetadata({
  title: "Customer access | Cendorq",
  description: "Access Cendorq with the email used for a Free Scan, form, plan, report, billing, or support request.",
  path: "/login",
  noIndex: true,
});

type LoginSearchParams = { auth?: string; provider?: string; returnTo?: string };

const SAFE_DASHBOARD_PATHS = [
  "/dashboard",
  "/dashboard/reports",
  "/dashboard/reports/free-scan",
  "/dashboard/billing",
  "/dashboard/support",
  "/dashboard/notifications",
] as const;

const BUTTON_PRIMARY = "inline-flex min-h-14 w-full items-center justify-center rounded-full border border-cyan-200 bg-cyan-100 px-6 py-3.5 text-sm font-black text-slate-950 shadow-[0_16px_38px_rgba(14,165,233,0.14)] transition hover:-translate-y-0.5 hover:bg-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";
const BUTTON_SECONDARY = "inline-flex min-h-14 w-full items-center justify-center rounded-full border border-cyan-100 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";
const SMALL_LINK = "font-semibold text-slate-950 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";

const ACCESS_POINTS = [
  ["Same email", "Use the email from your Free Scan, form, plan, report, billing, or support record."],
  ["Secure link", "Cendorq sends a login link when that email is tied to customer context."],
  ["No blank detour", "Access returns you to existing work instead of creating an empty dashboard."],
] as const;

const ACCESS_CHECKS = [
  "Try the email used for the Free Scan first.",
  "Try the billing, form, or support email next.",
  "Use the newest secure link if you requested more than one.",
  "Start Free Scan only when no existing customer record should be returned.",
] as const;

const RETURN_PATHS = [
  { title: "Dashboard", href: "/dashboard", copy: "Return to the command center when a customer record exists." },
  { title: "Reports", href: "/dashboard/reports", copy: "Open approved scan, Review, Repair, and Control proof when ready." },
  { title: "Support", href: "/dashboard/support", copy: "Recover blockers without sharing private payment or security details." },
] as const;

export default async function LoginPage({ searchParams }: { searchParams?: LoginSearchParams | Promise<LoginSearchParams> }) {
  const resolvedSearchParams = await Promise.resolve(searchParams || {});
  const returnTo = safeReturnTo(resolvedSearchParams.returnTo);
  const authNotice = buildAuthNotice(resolvedSearchParams.auth, resolvedSearchParams.provider);
  const showMailboxShortcuts = resolvedSearchParams.auth === "email-sent" || resolvedSearchParams.auth === "email-queued";

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(251,207,232,0.2),transparent_30%),radial-gradient(circle_at_88%_0%,rgba(125,211,252,0.28),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_38%,#ffffff_100%)] text-slate-950">
      <AccessAtmosphere />

      <section className="relative mx-auto grid max-w-[92rem] gap-8 px-4 pb-10 pt-8 sm:px-6 md:pt-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center" aria-label="Customer access">
        <div className="relative z-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Customer access</p>
          <h1 className="max-w-5xl text-[clamp(3rem,7vw,6.6rem)] font-semibold leading-[0.86] tracking-[-0.08em] text-slate-950">Access your Cendorq account.</h1>
          <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-xl sm:leading-9">Use the same email you used when you submitted your Free Scan or bought a plan.</p>
          <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-slate-600">Access should return an existing customer record, not create a blank account. Need Cendorq to check your first AI Visibility signal? <Link className={SMALL_LINK} href="/free-check?access=free-scan-required&method=login-hero">Start the Free Scan</Link>.</p>
          <div className="mt-7 grid gap-3 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {ACCESS_POINTS.map(([title, copy]) => (
              <article key={title} className="rounded-[1.3rem] border border-cyan-100 bg-white/82 p-4 shadow-sm backdrop-blur">
                <h2 className="text-2xl font-semibold tracking-[-0.045em] text-slate-950">{title}</h2>
                <p className="mt-2 text-xs font-semibold leading-6 text-slate-600">{copy}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.35rem] border border-white/80 bg-white/78 p-4 shadow-[0_30px_100px_rgba(15,23,42,0.09)] backdrop-blur-2xl sm:p-5">
          <div className="rounded-[2rem] border border-cyan-100 bg-white p-5 sm:p-7">
            <div className="text-center">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Secure email access</p>
              <h2 className="mt-3 text-[clamp(2.1rem,5vw,4rem)] font-semibold leading-[0.95] tracking-[-0.07em] text-slate-950">Return with your email.</h2>
              <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">We will send a secure link if this email is tied to your Free Scan, Diagnosis, report, plan, billing, or support context. No password needed. No password to remember.</p>
            </div>

            {authNotice ? (
              <div role="status" aria-live="polite" className={`mt-5 rounded-[1.25rem] border p-4 text-sm font-semibold leading-6 ${authNotice.tone === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-950" : "border-amber-200 bg-amber-50 text-amber-950"}`}>
                <p>{authNotice.message}</p>
                {authNotice.href ? <Link href={authNotice.href} className="mt-3 inline-flex rounded-full border border-white/70 bg-white px-4 py-2 text-xs font-black text-slate-950 shadow-sm">{authNotice.cta}</Link> : null}
                {showMailboxShortcuts ? <MailProviderLinks className="mt-4" /> : null}
              </div>
            ) : null}

            <form className="mt-5 grid gap-3" action="/api/auth/email" method="get">
              <input type="hidden" name="returnTo" value={returnTo} />
              <label className="grid gap-2 text-sm font-semibold text-slate-800">
                Email used for your Free Scan or plan
                <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className="rounded-[1.15rem] border border-cyan-100 bg-white px-4 py-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-200/70" />
              </label>
              <button type="submit" className={BUTTON_PRIMARY}>Send secure access link</button>
              <p className="text-center text-xs font-semibold leading-5 text-slate-500">Already have an account? Use the email you used when you submitted your Free Scan or bought a plan.</p>
            </form>

            <div className="mt-5 rounded-[1.35rem] border border-cyan-100 bg-cyan-50/45 p-4 text-center">
              <h3 className="text-sm font-semibold text-slate-950">First time here?</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">Start the Free Scan so Cendorq can check the first AI Visibility signal: how AI, search, and customers understand your business.</p>
              <div className="mt-4"><Link href="/free-check?access=free-scan-required&method=access-page" className={BUTTON_SECONDARY}>Start Free Scan</Link></div>
            </div>

            <p className="mt-5 text-center text-xs font-semibold leading-5 text-slate-500">Other access options are hidden until they are fully ready. For now, use secure email access.</p>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-8 sm:px-6" aria-label="Access return paths">
        <div className="grid gap-3 md:grid-cols-3">
          {RETURN_PATHS.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-[1.55rem] border border-white/80 bg-white/82 p-5 shadow-[0_14px_42px_rgba(15,23,42,0.045)] backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2">
              <h2 className="text-2xl font-semibold tracking-[-0.045em] text-slate-950">{item.title}</h2>
              <p className="mt-3 text-xs font-semibold leading-6 text-slate-600">{item.copy}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-16 sm:px-6" aria-label="Customer access help">
        <div className="overflow-hidden rounded-[2.15rem] border border-white/80 bg-white/84 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.055)] backdrop-blur sm:p-7">
          <div className="grid gap-5 lg:grid-cols-[0.48fr_0.52fr] lg:items-start">
            <div>
              <h2 className="text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">Free Scan starts the account. Access brings customers back.</h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">Customer access should bring the right customer record back, not create an empty dashboard. Start with a real signal or return with the email already tied to work.</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {ACCESS_CHECKS.map((check) => <p key={check} className="rounded-[1rem] border border-cyan-100 bg-cyan-50/40 p-3 text-xs font-semibold leading-5 text-slate-700">{check}</p>)}
            </div>
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Customer access validation anchors">
        Customer access | Cendorq. Access your Cendorq account. Return with your email. No password to remember. This browser is not remembered yet. email-unavailable. Use the same email or connected provider. Free Scan business context stays separate from account access. No blank account detour. Access path. Access recovery checklist. Use the same email you used when you submitted your Free Scan or bought a plan. New visitors should start the Free Scan first so Cendorq can capture the first AI Visibility signal. No empty accounts. Your dashboard opens when there is a scan, Diagnosis, report, plan, billing, or support item to show. Having trouble accessing your account? Try the email from your Free Scan or plan.
      </section>
    </main>
  );
}

function AccessAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(251,207,232,0.16),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.17),transparent_27%),linear-gradient(180deg,rgba(255,255,255,0.4),rgba(239,249,255,0.74)_42%,rgba(255,255,255,0.95)_100%)]" />
      <div className="absolute left-1/2 top-0 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-cyan-200/24 blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.018]" />
    </div>
  );
}

function safeReturnTo(value: string | undefined) {
  if (!value) return "/dashboard";
  return SAFE_DASHBOARD_PATHS.find((path) => value === path || value.startsWith(`${path}/`)) || "/dashboard";
}

function buildAuthNotice(auth: string | undefined, provider: string | undefined): { tone: "success" | "warning"; message: string; href?: string; cta?: string } | null {
  if (auth === "signed-out") return { tone: "success", message: "You are signed out on this browser." };
  if (auth === "provider-not-ready") return { tone: "warning", message: `${provider ? `${titleCase(provider)} access` : "That access option"} is not ready yet. Use the secure email link for now.` };
  if (auth === "provider-callback-pending") return { tone: "warning", message: `Provider access is not live yet. Use the secure email link for now.` };
  if (auth === "provider-callback-invalid-state") return { tone: "warning", message: "That access attempt could not be verified. Use the secure email link below." };
  if (auth === "provider-callback-missing-code") return { tone: "warning", message: "That provider sign-in could not finish. Use the secure email link." };
  if (auth === "provider-cancelled") return { tone: "warning", message: "Provider sign-in was cancelled. Use the secure email link or start the Free Scan." };
  if (auth === "free-scan-required") return { tone: "warning", message: "We couldn’t find a Cendorq account for that email. Use the email from your Free Scan or plan, or start the Free Scan first.", href: "/free-check?access=free-scan-required&method=login", cta: "Start Free Scan" };
  if (auth === "session-unavailable") return { tone: "warning", message: "This browser is not remembered yet. Use the email from your Free Scan or plan." };
  if (auth === "session-required") return { tone: "warning", message: "Use customer access to continue." };
  if (auth === "unknown-provider") return { tone: "warning", message: "That access option is not available. Use secure email access." };
  if (auth === "email-required") return { tone: "warning", message: "Enter the email used for your Free Scan or plan." };
  if (auth === "email-sent") return { tone: "success", message: "Check your inbox for the secure Cendorq access link." };
  if (auth === "email-queued") return { tone: "warning", message: "Your request was received. If the email does not arrive, try again shortly." };
  if (auth === "email-unavailable") return { tone: "warning", message: "Cendorq could not send the access email yet. Try again shortly." };
  if (auth === "email-link-used") return { tone: "warning", message: "That secure link was already used. Request a new one below." };
  if (auth === "email-link-expired") return { tone: "warning", message: "That secure link expired. Request a new one below." };
  if (auth === "email-link-invalid") return { tone: "warning", message: "That secure link could not be verified. Request a new one below." };
  return null;
}

function titleCase(value: string) {
  return value.replace(/-/g, " ").replace(/\b\w/g, (character) => character.toUpperCase());
}
