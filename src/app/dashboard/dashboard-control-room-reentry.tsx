import Link from "next/link";

const REENTRY_PATHS = [
  {
    title: "Use the dashboard link in any Cendorq email",
    copy: "Report-ready emails, billing updates, support messages, and plan-status follow-ups should always bring the customer back to the same private control room.",
    action: "Open latest email",
    path: "/dashboard/notifications",
  },
  {
    title: "Return from the public site",
    copy: "A returning customer should be able to use Sign in or Dashboard from public navigation and land back in the command center after safe session checks.",
    action: "Go to dashboard",
    path: "/dashboard",
  },
  {
    title: "Resume after session expiry",
    copy: "If the session is expired, route the customer through safe sign-in or magic-link re-auth, then return them to the dashboard without restarting the scan or purchase journey.",
    action: "Resume securely",
    path: "/dashboard",
  },
  {
    title: "Recover from support or billing",
    copy: "Support, billing, and report vault surfaces should always link back to the dashboard so the customer never feels stranded in a side flow.",
    action: "Back to control room",
    path: "/dashboard/support/status",
  },
] as const;

const REENTRY_RULES = [
  "The dashboard is the customer control room; every external email and protected surface should route back to it.",
  "Returning later must not require repeating one-time inbox confirmation, onboarding, or Free Scan intake unless the customer chooses to update information.",
  "Expired sessions should use safe re-auth and then return to the originally requested dashboard destination.",
  "Re-entry copy must avoid account-existence leakage, raw session tokens, magic-link token exposure, provider payloads, and pressure-based upgrade language.",
] as const;

export function DashboardControlRoomReentry() {
  return (
    <section className="relative z-10 mt-8" aria-label="Dashboard control room re-entry">
      <div className="system-surface rounded-[2rem] p-6 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">Return path</div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">They can leave today and come back to the same business control room tomorrow.</h2>
            <p className="mt-4 text-base leading-8 text-slate-300">
              The dashboard should feel permanent. If a customer is not ready on the first visit, Cendorq keeps the return path obvious through email links, public sign-in, safe session resume, and back-to-dashboard links from every protected customer surface.
            </p>
            <div className="mt-5 rounded-[1.35rem] border border-cyan-300/15 bg-cyan-300/[0.07] p-4 text-sm leading-7 text-cyan-50">
              Best experience: “I can come back whenever I’m ready, and Cendorq will pick up exactly where I left off.”
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {REENTRY_PATHS.map((item) => (
              <Link key={item.title} href={item.path} className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4 transition hover:border-cyan-300/30 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
                <h3 className="text-sm font-semibold leading-6 text-white">{item.title}</h3>
                <p className="mt-2 text-xs leading-6 text-slate-300">{item.copy}</p>
                <span className="mt-4 inline-flex rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-2 text-[11px] font-bold text-cyan-100">{item.action}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-6 grid gap-3 lg:grid-cols-4">
          {REENTRY_RULES.map((rule) => (
            <div key={rule} className="rounded-[1.2rem] border border-white/10 bg-slate-950/45 p-4 text-xs leading-6 text-slate-300">
              {rule}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
