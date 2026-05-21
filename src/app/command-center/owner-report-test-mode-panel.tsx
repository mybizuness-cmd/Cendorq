import Link from "next/link";

import { buildOwnerReportTerminalTestCommand } from "@/lib/owner-report-terminal-test-command-contract";
import { OWNER_REPORT_TEST_MODE_STANDARD } from "@/lib/owner-report-test-mode-standard";
import { OWNER_REPORT_TEST_PREVIEW_BLUEPRINTS, OWNER_REPORT_TEST_PREVIEW_STANDARD } from "@/lib/owner-report-test-preview-rendering";
import { OWNER_REPORT_TEST_SAMPLE_OUTPUTS } from "@/lib/owner-report-test-sample-output";

const terminalCommand = buildOwnerReportTerminalTestCommand({
  companyName: "Example Public Company",
  companyUrl: "https://example.com",
});

// Owner report test mode validation anchors: owner-gated. Owner-only report testing for public companies.

export function OwnerReportTestModePanel() {
  return (
    <section className="mt-10 rounded-3xl border border-fuchsia-300/20 bg-fuchsia-950/15 p-6 shadow-2xl shadow-fuchsia-950/20">
      <p className="text-xs font-black uppercase tracking-[0.24em] text-fuchsia-200">Owner report test mode</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">Run every plan preview without checkout.</h2>
      <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-fuchsia-50/75">
        Owner-only report testing for public companies is owner-gated and covers plan visuals, operator trace, chief review posture, and release-captain gate posture.
      </p>
      <Link href="/command-center/owner-report-test" className="mt-5 inline-flex rounded-2xl bg-fuchsia-200 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-fuchsia-300 focus:ring-offset-2 focus:ring-offset-slate-950">
        Open owner test runner
      </Link>

      <div className="mt-6 rounded-2xl border border-fuchsia-300/20 bg-black/15 p-4">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-fuchsia-200">Backend terminal / API test command</p>
        <div className="mt-4 rounded-2xl border border-fuchsia-300/15 bg-slate-950 p-4 text-xs font-semibold leading-6 text-fuchsia-50/80">
          <code className="whitespace-pre-wrap break-words">{terminalCommand.curlPreview}</code>
        </div>
      </div>

      <div className="mt-6 grid gap-3 lg:grid-cols-4">
        <Metric label="Plans" value={OWNER_REPORT_TEST_PREVIEW_BLUEPRINTS.length} />
        <Metric label="Rules" value={OWNER_REPORT_TEST_MODE_STANDARD.length} />
        <Metric label="Preview rules" value={OWNER_REPORT_TEST_PREVIEW_STANDARD.length} />
        <Metric label="Samples" value={OWNER_REPORT_TEST_SAMPLE_OUTPUTS.length} />
      </div>

      <div className="mt-6 rounded-2xl border border-fuchsia-300/20 bg-black/15 p-4">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-fuchsia-200">Sample report output structure</p>
        <p className="mt-3 text-xs font-medium leading-6 text-fuchsia-50/70">Trace: operator, chief, and release-captain posture stay visible for the owner test runner.</p>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-fuchsia-300/20 bg-white/[0.045] px-4 py-3">
      <div className="text-2xl font-semibold text-white">{value}</div>
      <div className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-fuchsia-100/70">{label}</div>
    </div>
  );
}
