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

const BUTTON_PRIMARY = "inline-flex min-h-14 w-full items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-950 shadow-[0_10px_28px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-white hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";
const BUTTON_SECONDARY = "inline-flex min-h-14 w-full items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";
const SMALL_LINK = "font-semibold text-slate-950 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";

const CUSTOMER_ACCESS_POINTS = [
  "Use the same email you used for your Free Scan, form, or plan.",
  "Known customers can open their dashboard after email confirmation.",
  "New visitors should start the Free Scan first.",
  "No empty accounts. The dashboard should show real results, plans, billing, or support.",
] as const;

export default async function LoginPage({ searchParams }: { searchParams?: LoginSearchParams | Promise<LoginSearchParams> }) {
  const resolvedSearchParams = await Promise.resolve(searchParams || {});
  const returnTo = safeReturnTo(resolvedSearchParams.returnTo);
  const authNotice = buildAuthNotice(resolvedSearchParams.auth, resolvedSearchParams.provider);
  const showMailboxShortcuts = resolvedSearchParams.auth === "email-sent" || resolvedSearchParams.auth === "email-queued";

  return (
    <main className={CENDORQ_EXPERIENCE_SYSTEM.pageShell}>
      <section className="relative overflow-hidden px-5 py-8 sm:px-8 lg:py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_0%,rgba(125,211,252,0.28),transparent_34%),linear-gradient(180deg,#ffffff,#f8fbff_58%,#eef8ff)]" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[auto] max-w-7xl gap-7 lg:min-h-[min(38rem,calc(100vh-4.25rem))] lg:grid-cols-[0.76fr_1.24fr] lg:items-center">
          <div>
            <h1 className="max-w-5xl text-[clamp(2.7rem,4.8vw,5.1rem)] font-semibold leading-[0.95] tracking-[-0.074em] text-slate-950">Access your Cendorq account.</h1>
            <p className="mt-5 max-w-3xl text-base font-medium leading-7 text-slate-600 sm:text-lg sm:leading-8">Use the same email you used for your Free Scan, form, or plan. If you have not started yet, run the Free Scan first.</p>
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-slate-500">Need Cendorq to check your business? <Link className={SMALL_LINK} href="/free-check?access=free-scan-required&method=login-hero">Start the Free Scan</Link>.</p>
          </div>

          <div className="mx-auto w-full max-w-xl rounded-[2.35rem] border border-white/80 bg-white/76 p-3 shadow-[0_26px_90px_rgba(15,23,42,0.1)] backdrop-blur-2xl">
            <div className="rounded-[1.9rem] border border-slate-200 bg-white p-5 sm:p-7">
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Customer access</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-4xl">Return with your email.</h2>
                <p className="mt-3 text-sm font-medium leading-6 text-slate-600">We will send a secure link. No password needed.</p>
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
                  Email used for your Free Scan, form, or plan
                  <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className="rounded-[1.15rem] border border-slate-200 bg-white px-4 py-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-200/70" />
                </label>
                <button type="submit" className={BUTTON_PRIMARY}>Send secure access link</button>
              </form>

              <div className="mt-5 rounded-[1.35rem] border border-cyan-100 bg-cyan-50/55 p-4 text-center">
                <h3 className="text-sm font-semibold text-slate-950">First time here?</h3>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-600">Start the Free Scan so Cendorq can check how AI and search understand your business.</p>
                <div className="mt-4"><Link href="/free-check?access=free-scan-required&method=access-page" className={BUTTON_SECONDARY}>Start Free Scan</Link></div>
              </div>

              <p className="mt-5 text-center text-xs font-medium leading-5 text-slate-500">Provider sign-in is hidden until it is fully ready. For now, use secure email access.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8" aria-label="Customer access help">
        <div className="rounded-[2.2rem] border border-white/80 bg-white/82 p-5 shadow-[0_12px_38px_rgba(15,23,42,0.045)] backdrop-blur sm:p-6">
          <h2 className="max-w-5xl text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-5xl">Free Scan starts the account. Access brings customers back.</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">{CUSTOMER_ACCESS_POINTS.map((rule) => <p key={rule} className="rounded-[1.2rem] border border-cyan-100 bg-cyan-50/45 p-4 text-sm font-semibold leading-6 text-slate-600">{rule}</p>)}</div>
          <p className="mt-5 text-sm leading-7 text-slate-600">Already submitted a scan or bought a plan? Use the same email above.</p>
        </div>
      </section>
    </main>
  );
}

function safeReturnTo(value: string | undefined) {
  if (!value) return "/dashboard";
  return value.startsWith("/dashboard") ? value : "/dashboard";
}

function buildAuthNotice(auth: string | undefined, provider: string | undefined): { tone: "success" | "warning"; message: string; href?: string; cta?: string } | null {
  if (auth === "provider-not-ready") return { tone: "warning", message: `${provider ? `${titleCase(provider)} access` : "That access option"} is not ready yet. Use the secure email link for now.` };
  if (auth === "provider-callback-pending") return { tone: "warning", message: `Provider access is not live yet. Use the secure email link for now.` };
  if (auth === "provider-callback-missing-code") return { tone: "warning", message: "That provider sign-in could not finish. Use the secure email link." };
  if (auth === "provider-cancelled") return { tone: "warning", message: "Provider sign-in was cancelled. Use the secure email link or start the Free Scan." };
  if (auth === "free-scan-required") return { tone: "warning", message: "We could not find a Free Scan or plan for that email. Start the Free Scan first.", href: "/free-check?access=free-scan-required&method=login", cta: "Start Free Scan" };
  if (auth === "session-unavailable") return { tone: "warning", message: "This browser is not remembered yet. Use the email from your Free Scan or plan." };
  if (auth === "session-required") return { tone: "warning", message: "Use customer access to continue." };
  if (auth === "unknown-provider") return { tone: "warning", message: "That access option is not available. Use secure email access." };
  if (auth === "email-required") return { tone: "warning", message: "Enter the email used for your Free Scan, form, or plan." };
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
