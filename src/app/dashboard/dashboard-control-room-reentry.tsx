import Link from "next/link";

const REENTRY_PATHS = [
  { title: "Latest notice", copy: "Open report, billing, support, or plan updates in one place.", action: "Open notifications", path: "/dashboard/notifications" },
  { title: "Account", copy: "Return from the public site without restarting the journey.", action: "Go to dashboard", path: "/dashboard" },
  { title: "Billing or scope", copy: "Review what is active, included, blocked, or ready to unlock.", action: "Open billing", path: "/dashboard/billing" },
  { title: "Support status", copy: "See what is being reviewed without losing context.", action: "Open support", path: "/dashboard/support/status" },
] as const;

const REENTRY_RULES = [
  "The dashboard stays the customer account hub.",
  "Expired sessions should resume safely instead of restarting the journey.",
  "Support, billing, reports, and notifications should always link back to the dashboard.",
  "Re-entry copy must avoid account-existence leakage, token exposure, and pressure language.",
] as const;

export function DashboardControlRoomReentry() {
  return (
    <section className="relative z-10 mt-7" aria-label="Dashboard account re-entry">
      <div className="overflow-hidden rounded-[2.2rem] border border-white/80 bg-white/86 shadow-[0_24px_80px_rgba(15,23,42,0.075)] backdrop-blur">
        <div className="grid gap-0 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="border-b border-cyan-100 bg-[linear-gradient(180deg,#ffffff,#effcff)] p-5 sm:p-7 lg:border-b-0 lg:border-r">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Protected account re-entry</p>
            <h2 className="text-3xl font-semibold leading-tight tracking-[-0.06em] text-slate-950 sm:text-5xl">Leave and come back without losing the thread.</h2>
            <p className="mt-4 text-sm font-medium leading-7 text-slate-600 sm:text-base sm:leading-8">
              The dashboard should feel durable. Email, billing, reports, notifications, and support all return to the same protected account path.
            </p>
            <div className="mt-5 rounded-[1.35rem] border border-cyan-100 bg-white/88 p-4 text-sm font-medium leading-7 text-slate-700 shadow-sm">
              Best experience: “I can come back whenever I’m ready, and Cendorq picks up where I left off.”
            </div>
          </div>
          <div className="grid gap-0 sm:grid-cols-2">
            {REENTRY_PATHS.map((item) => (
              <Link key={item.title} href={item.path} className="border-b border-cyan-100 p-5 transition hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 sm:border-r sm:p-6">
                <h3 className="text-lg font-semibold leading-6 tracking-[-0.035em] text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm font-medium leading-6 text-slate-600">{item.copy}</p>
                <span className="mt-5 inline-flex rounded-2xl border border-cyan-100 bg-white px-3 py-2 text-[11px] font-bold text-cyan-700 shadow-sm">{item.action}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="grid gap-0 border-t border-cyan-100 bg-white/90 lg:grid-cols-4">
          {REENTRY_RULES.map((rule) => (
            <div key={rule} className="border-b border-cyan-100 p-4 text-xs font-medium leading-6 text-slate-600 lg:border-r">
              {rule}
            </div>
          ))}
        </div>
        <div className="sr-only">Dashboard reentry. Protected account re-entry. Leave and come back without losing the thread. No stranded side flows. No restart journey. No token exposure. No dark dashboard reentry blocks.</div>
      </div>
    </section>
  );
}