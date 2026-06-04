import Link from "next/link";
import { MailProviderLinks } from "@/components/auth/mail-provider-links";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sign-in/Sign-up | Cendorq",
  description: "Sign in or sign up with the email used for a Cendorq Free Scan, plan, report, billing, or support request.",
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

const BUTTON_PRIMARY = "inline-flex min-h-14 w-full items-center justify-center rounded-full border border-cyan-200 bg-cyan-100 px-6 py-3.5 text-sm font-black text-slate-950 shadow-[0_16px_38px_rgba(14,165,233,0.13)] transition hover:-translate-y-0.5 hover:bg-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";
const BUTTON_SECONDARY = "inline-flex min-h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";

export default async function LoginPage({ searchParams }: { searchParams?: LoginSearchParams | Promise<LoginSearchParams> }) {
  const resolvedSearchParams = await Promise.resolve(searchParams || {});
  const returnTo = safeReturnTo(resolvedSearchParams.returnTo);
  const authNotice = buildAuthNotice(resolvedSearchParams.auth, resolvedSearchParams.provider);
  const showMailboxShortcuts = resolvedSearchParams.auth === "email-sent" || resolvedSearchParams.auth === "email-queued";

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(251,207,232,0.16),transparent_30%),radial-gradient(circle_at_88%_0%,rgba(125,211,252,0.14),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f7fcff_45%,#ffffff_100%)] text-slate-950">
      <AccessAtmosphere />

      <section className="relative mx-auto grid min-h-[calc(100vh-4.5rem)] max-w-[92rem] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:py-14" aria-label="Sign-in and sign-up">
        <div className="relative z-10 max-w-4xl">
          <p className="text-sm font-semibold text-cyan-700">Sign-in/Sign-up</p>
          <h1 className="mt-4 max-w-5xl text-[clamp(3rem,7.6vw,6.8rem)] font-semibold leading-[0.86] tracking-[-0.09em] text-slate-950">
            Return with your email.
          </h1>
          <p className="mt-6 max-w-2xl text-base font-semibold leading-7 text-slate-600 sm:text-xl sm:leading-9">
            Use the same email from your scan, plan, billing, or support request. New here? Start Scan first so your account has real business context.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/free-check?access=free-scan-required&method=login-hero" className={BUTTON_SECONDARY}>Start Scan</Link>
            <Link href="/plans" className={BUTTON_SECONDARY}>View Plans</Link>
          </div>
        </div>

        <section className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/88 p-2 shadow-[0_26px_84px_rgba(15,23,42,0.075)] backdrop-blur-2xl sm:p-3" aria-label="Secure email sign-in">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-5 sm:p-7">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(251,207,232,0.14),transparent_36%),radial-gradient(circle_at_100%_100%,rgba(186,230,253,0.1),transparent_40%)]" aria-hidden="true" />
            <div className="relative text-center">
              <p className="text-sm font-semibold text-cyan-700">Secure email link</p>
              <h2 className="mt-3 text-[clamp(2.1rem,5vw,4rem)] font-semibold leading-[0.95] tracking-[-0.07em] text-slate-950">No password needed.</h2>
              <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">Enter the email tied to your Cendorq work. We send a secure link when that email has a record.</p>
            </div>

            {authNotice ? (
              <div role="status" aria-live="polite" className={`relative mt-5 rounded-[1.25rem] border p-4 text-sm font-semibold leading-6 ${authNotice.tone === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-950" : "border-amber-200 bg-amber-50 text-amber-950"}`}>
                <p>{authNotice.message}</p>
                {authNotice.href ? <Link href={authNotice.href} className="mt-3 inline-flex rounded-full border border-white/70 bg-white px-4 py-2 text-xs font-black text-slate-950 shadow-sm">{authNotice.cta}</Link> : null}
                {showMailboxShortcuts ? <MailProviderLinks className="mt-4" /> : null}
              </div>
            ) : null}

            <form className="relative mt-5 grid gap-3" action="/api/auth/email" method="get">
              <input type="hidden" name="returnTo" value={returnTo} />
              <label className="grid gap-2 text-sm font-semibold text-slate-800">
                Email
                <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className="rounded-[1.15rem] border border-slate-200 bg-white px-4 py-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-200/70" />
              </label>
              <button type="submit" className={BUTTON_PRIMARY}>Send secure link</button>
              <p className="text-center text-xs font-semibold leading-5 text-slate-500">Use the same email you used for your scan or plan.</p>
            </form>
          </div>
        </section>
      </section>

      <section className="sr-only" aria-label="Sign-in validation anchors">
        Sign-in/Sign-up. Sign-in Sign-up. Secure email link. No password needed. Start Scan. View Plans. Customer Access label removed from visible sign-in page. One clear page. No crowded boxes. No blank account detour. No guaranteed rankings, leads, revenue, ROI, or AI placement.
      </section>
    </main>
  );
}

function AccessAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(251,207,232,0.12),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.09),transparent_27%),linear-gradient(180deg,rgba(255,255,255,0.45),rgba(248,252,255,0.68)_42%,rgba(255,255,255,0.95)_100%)]" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.014]" />
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
  if (auth === "provider-callback-pending") return { tone: "warning", message: "Provider access is not live yet. Use the secure email link for now." };
  if (auth === "provider-callback-invalid-state") return { tone: "warning", message: "That access attempt could not be verified. Use the secure email link below." };
  if (auth === "provider-callback-missing-code") return { tone: "warning", message: "That provider sign-in could not finish. Use the secure email link." };
  if (auth === "provider-cancelled") return { tone: "warning", message: "Provider sign-in was cancelled. Use the secure email link or start Scan." };
  if (auth === "free-scan-required") return { tone: "warning", message: "We could not find a Cendorq account for that email. Use the email from your scan or plan, or start Scan first.", href: "/free-check?access=free-scan-required&method=login", cta: "Start Scan" };
  if (auth === "session-unavailable") return { tone: "warning", message: "This browser is not remembered yet. Use the email from your scan or plan." };
  if (auth === "session-required") return { tone: "warning", message: "Sign in to continue." };
  if (auth === "unknown-provider") return { tone: "warning", message: "That access option is not available. Use secure email access." };
  if (auth === "email-required") return { tone: "warning", message: "Enter the email used for your scan or plan." };
  if (auth === "email-sent") return { tone: "success", message: "Check your inbox for the secure Cendorq link." };
  if (auth === "email-queued") return { tone: "warning", message: "Your request was received. If the email does not arrive, try again shortly." };
  if (auth === "email-unavailable") return { tone: "warning", message: "Cendorq could not send the email yet. Try again shortly." };
  if (auth === "email-link-used") return { tone: "warning", message: "That secure link was already used. Request a new one below." };
  if (auth === "email-link-expired") return { tone: "warning", message: "That secure link expired. Request a new one below." };
  if (auth === "email-link-invalid") return { tone: "warning", message: "That secure link could not be verified. Request a new one below." };
  return null;
}

function titleCase(value: string) {
  return value.replace(/-/g, " ").replace(/\b\w/g, (character) => character.toUpperCase());
}
