import Link from "next/link";

import { projectCustomerEmailConfirmationHandoff } from "@/lib/customer-email-confirmation-handoff-runtime";

const freeScanGate = projectCustomerEmailConfirmationHandoff({
  journeyKey: "free-scan-submitted",
  customerIdHashPresent: true,
  signupEmailPresent: true,
  emailAlreadyVerified: false,
  verificationTokenIssued: true,
  safeReleaseReady: false,
  customerOwnedDestination: true,
  requestedDestination: "/dashboard/reports",
});

export function FreeScanConfirmationGate() {
  return (
    <section className="mt-8 rounded-[2rem] border border-cyan-300/20 bg-cyan-300/[0.07] p-6 shadow-2xl shadow-cyan-950/20 sm:p-8" aria-label="Free Scan email confirmation gate">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-start">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-100">Verify to view</div>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white">
            Check your inbox, confirm once, then open your Free Scan results in your Cendorq command center.
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-300">{freeScanGate.checkInboxCopy}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/45 p-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100">Sender</div>
              <p className="mt-2 text-sm font-semibold text-white">Cendorq Support &lt;support@cendorq.com&gt;</p>
              <p className="mt-2 text-xs leading-5 text-slate-400">Save this sender or move it to your main inbox if your email app filters it.</p>
            </div>
            <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/45 p-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100">Subject</div>
              <p className="mt-2 text-sm font-semibold text-white">{freeScanGate.subject}</p>
              <p className="mt-2 text-xs leading-5 text-slate-400">{freeScanGate.preheader}</p>
            </div>
          </div>
        </div>
        <aside className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-5">
          <div className="text-sm font-semibold text-cyan-100">What happens after confirmation</div>
          <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-300">
            <p>1. Your signup email is verified server-side.</p>
            <p>2. The confirmation link is consumed once.</p>
            <p>3. You return to {freeScanGate.verifiedDestination}.</p>
            <p>4. Your report state opens in {freeScanGate.dashboardModule}.</p>
          </div>
          <Link href={freeScanGate.verifiedDestination} className="mt-5 inline-flex rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
            {freeScanGate.primaryCta}
          </Link>
          <p className="mt-4 text-xs leading-5 text-slate-500">
            The dashboard/report vault remains the protected place to view current report state and next steps. Email stays active for delivery and follow-up.
          </p>
        </aside>
      </div>
    </section>
  );
}
