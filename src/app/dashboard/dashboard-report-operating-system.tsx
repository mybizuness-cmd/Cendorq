import Link from "next/link";

const REPORT_SYSTEM_LANES = [
  {
    label: "Vault",
    title: "Reports live in one place",
    copy: "Free Scan, Deep Review, Build Fix, and Ongoing Control stay separated so customers know what is ready, held, or unavailable.",
    href: "/dashboard/reports",
    cta: "Open report vault",
  },
  {
    label: "PDF + email",
    title: "Approved artifacts match",
    copy: "Paid reports should use the same approved source for dashboard copy, PDF, and email delivery instead of conflicting versions.",
    href: "/dashboard/reports",
    cta: "View delivery state",
  },
  {
    label: "Workroom",
    title: "Repair work is scoped",
    copy: "Build Fix should show approved scope, before evidence, work state, after evidence, and completion report instead of vague promises.",
    href: "/dashboard/repair-workroom",
    cta: "Open repair workroom",
  },
  {
    label: "Control",
    title: "Monthly signal drift is watched",
    copy: "Ongoing Control should show monitored signals, drift, protected strengths, next priorities, and monthly report delivery.",
    href: "/dashboard/reports/ongoing-control",
    cta: "Open control artifact",
  },
] as const;

const DELIVERY_STEPS = ["Scan result", "Report vault", "Approved PDF", "Email delivery", "Next command"] as const;

export function DashboardReportOperatingSystem() {
  return (
    <section aria-label="Dashboard report operating system" className="overflow-hidden rounded-[2.25rem] border border-white/80 bg-slate-950 text-white shadow-[0_28px_90px_rgba(15,23,42,.24)]">
      <div className="grid gap-0 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="border-b border-white/10 p-5 sm:p-7 lg:border-b-0 lg:border-r">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-200">Dashboard operating system</p>
          <h2 className="mt-3 text-4xl font-semibold leading-[0.95] tracking-[-0.065em] text-white sm:text-5xl">Report vault, paid artifacts, repair workroom, and monthly control.</h2>
          <p className="mt-4 text-sm font-semibold leading-7 text-slate-300">The customer dashboard should explain what was found, what was delivered, what is still held, and what command is safe next.</p>
          <div className="mt-5 grid gap-2 sm:grid-cols-5 lg:grid-cols-1 xl:grid-cols-5">
            {DELIVERY_STEPS.map((step, index) => (
              <div key={step} className="rounded-2xl border border-white/10 bg-white/[.06] p-3">
                <span className="grid h-7 w-7 place-items-center rounded-xl bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span>
                <p className="mt-2 text-xs font-black leading-5 text-white">{step}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-0 sm:grid-cols-2">
          {REPORT_SYSTEM_LANES.map((lane) => (
            <Link key={lane.label} href={lane.href} className="group border-b border-white/10 p-5 transition hover:bg-white/[.08] focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950 sm:border-r sm:p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-200">{lane.label}</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-white">{lane.title}</h3>
              <p className="mt-3 text-xs font-semibold leading-6 text-slate-300">{lane.copy}</p>
              <span className="mt-4 inline-flex text-sm font-bold text-cyan-200 transition group-hover:text-white">{lane.cta} →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
