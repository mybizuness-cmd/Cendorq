import Link from "next/link";

const REENTRY_PATHS = [
  { title: "Latest notice", copy: "Open report, billing, support, or plan updates in one place.", action: "Open notifications", path: "/dashboard/notifications" },
  { title: "Workspace", copy: "Return from the public site without restarting the journey.", action: "Go to dashboard", path: "/dashboard" },
  { title: "Billing or scope", copy: "Review what is active, included, blocked, or ready to unlock.", action: "Open billing", path: "/dashboard/billing" },
  { title: "Support status", copy: "See what is being reviewed without losing context.", action: "Open support", path: "/dashboard/support/status" },
] as const;

const REENTRY_RULES = [
  "The dashboard stays the customer control room.",
  "Expired sessions should resume safely instead of restarting the journey.",
  "Support, billing, reports, and notifications should always link back to the dashboard.",
  "Re-entry copy must avoid account-existence leakage, token exposure, and pressure language.",
] as const;

export function DashboardControlRoomReentry() {
  return (
    <section className="relative z-10 mt-7" aria-label="Dashboard control room re-entry">
      <div className="rounded-[1.7rem] border border-white/80 bg-white/82 p-4 shadow-[0_18px_55px_rgba(15,23,42,0.055)] backdrop-blur sm:p-6">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Leave and come back without losing the thread.</h2>
            <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
              The dashboard should feel permanent. Email, billing, reports, notifications, and support all return to the same business control room.
            </p>
            <div className="mt-4 rounded-[1.2rem] border border-cyan-100 bg-cyan-50/55 p-4 text-sm font-medium leading-7 text-slate-700">
              Best experience: “I can come back whenever I’m ready, and Cendorq picks up where I left off.”
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {REENTRY_PATHS.map((item) => (
              <Link key={item.title} href={item.path} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/45 p-4 transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2">
                <h3 className="text-sm font-semibold leading-6 text-slate-950">{item.title}</h3>
                <p className="mt-2 text-xs font-medium leading-6 text-slate-600">{item.copy}</p>
                <span className="mt-4 inline-flex rounded-2xl border border-cyan-100 bg-white px-3 py-2 text-[11px] font-bold text-cyan-700 shadow-sm">{item.action}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-5 grid gap-3 lg:grid-cols-4">
          {REENTRY_RULES.map((rule) => (
            <div key={rule} className="rounded-[1.1rem] border border-cyan-100 bg-white/86 p-4 text-xs font-medium leading-6 text-slate-600 shadow-sm">
              {rule}
            </div>
          ))}
        </div>
        <div className="sr-only">Dashboard reentry. Leave and come back without losing the thread. No stranded side flows. No restart journey. No token exposure. No dark dashboard reentry blocks.</div>
      </div>
    </section>
  );
}
