import Link from "next/link";

import { getOwnerReportTestApiResponseContract } from "@/lib/owner-report-test-api-response-contract";
import { buildOwnerReportTestBatchManifest } from "@/lib/owner-report-test-batch-manifest";
import { buildOwnerReportTestCommandCenterHandoff } from "@/lib/owner-report-test-command-center-handoff";
import { buildOwnerReportTestFixtureBatchRunner } from "@/lib/owner-report-test-fixture-batch-runner";
import { getOwnerReportTestControlSummary } from "@/lib/owner-report-test-control-summary";
import { getOwnerReportTestFixtureCommands } from "@/lib/owner-report-test-fixture-matrix";
import { buildOwnerReportTestOperatorSignoffSet } from "@/lib/owner-report-test-operator-signoff";
import { buildOwnerReportTestReportExperienceScorecards } from "@/lib/owner-report-test-report-experience-scorecard";
import { getOwnerReportTestResultReviewContract } from "@/lib/owner-report-test-result-review-contract";
import { getOwnerReportTestTerminalRunbook } from "@/lib/owner-report-test-terminal-runbook";
import { buildOwnerReportTestVisualQualityGate } from "@/lib/owner-report-test-visual-quality-gate";
import { buildOwnerReportTerminalTestCommand } from "@/lib/owner-report-terminal-test-command-contract";
import { OWNER_REPORT_TEST_MODE_STANDARD } from "@/lib/owner-report-test-mode-standard";
import { OWNER_REPORT_TEST_PREVIEW_BLUEPRINTS, OWNER_REPORT_TEST_PREVIEW_STANDARD } from "@/lib/owner-report-test-preview-rendering";
import { OWNER_REPORT_TEST_SAMPLE_OUTPUTS } from "@/lib/owner-report-test-sample-output";

const apiResponseContract = getOwnerReportTestApiResponseContract();
const commandCenterHandoff = buildOwnerReportTestCommandCenterHandoff();
const controlSummary = getOwnerReportTestControlSummary();
const operatorSignoff = buildOwnerReportTestOperatorSignoffSet();
const reportExperienceScorecards = buildOwnerReportTestReportExperienceScorecards();
const resultReview = getOwnerReportTestResultReviewContract();
const terminalRunbook = getOwnerReportTestTerminalRunbook();
const terminalCommand = buildOwnerReportTerminalTestCommand({ companyName: "Example Public Company", companyUrl: "https://example.com" });
const visualQualityGate = buildOwnerReportTestVisualQualityGate();
const fixtureCommands = getOwnerReportTestFixtureCommands();
const fixtureBatch = buildOwnerReportTestFixtureBatchRunner();
const batchManifest = buildOwnerReportTestBatchManifest();

export function OwnerReportTestModePanel() {
  return (
    <section className="mt-10 rounded-3xl border border-fuchsia-300/20 bg-fuchsia-950/15 p-6 shadow-2xl shadow-fuchsia-950/20">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-fuchsia-200">Owner report test mode</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">Run every plan preview without checkout.</h2>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-fuchsia-50/75">
            Owner-only report testing for public companies, plan visuals, operator trace, chief review posture, and release-captain gate posture. No billing, customer delivery, entitlement mutation, or customer email.
          </p>
          <Link href="/command-center/owner-report-test" className="mt-5 inline-flex rounded-2xl bg-fuchsia-200 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-fuchsia-300 focus:ring-offset-2 focus:ring-offset-slate-950">
            Open owner test runner
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <Metric label="Plans" value={OWNER_REPORT_TEST_PREVIEW_BLUEPRINTS.length} />
          <Metric label="Rules" value={OWNER_REPORT_TEST_MODE_STANDARD.length} />
          <Metric label="Fixtures" value={fixtureBatch.fixtureCount} />
        </div>
      </div>

      <div className="mt-6 grid gap-3 lg:grid-cols-6">
        <Metric label="Visual gate" value={visualQualityGate.score} />
        <Metric label="Signoffs" value={operatorSignoff.signoffs.length} />
        <Metric label="Experience" value={reportExperienceScorecards.overallScore} />
        <Metric label="Handoff ready" value={commandCenterHandoff.terminalRunbookReady && commandCenterHandoff.apiResponseContractReady && commandCenterHandoff.resultReviewReady && commandCenterHandoff.batchManifestReady ? 1 : 0} />
        <Metric label="Response keys" value={apiResponseContract.requiredTopLevelKeys.length} />
        <Metric label="Customer mutation" value={controlSummary.billingMutationAllowed || controlSummary.entitlementMutationAllowed ? 1 : 0} />
      </div>

      <div className="mt-6 rounded-2xl border border-fuchsia-300/20 bg-black/15 p-4">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-fuchsia-200">Backend terminal / API test command</p>
        <p className="mt-2 text-xs font-medium leading-6 text-fuchsia-50/70">
          Handoff: {commandCenterHandoff.handoffId}. Signoff: {operatorSignoff.signoffId}. Runbook helper: {terminalRunbook.helperScript}. Route: {terminalRunbook.route}. Required response keys: {apiResponseContract.requiredTopLevelKeys.length}. Visual gate: {visualQualityGate.score}/10 {visualQualityGate.status}. Review threshold: {resultReview.passThreshold}%. Report experience: {reportExperienceScorecards.status}.
        </p>
        <div className="mt-4 rounded-2xl border border-fuchsia-300/15 bg-slate-950 p-4 text-xs font-semibold leading-6 text-fuchsia-50/80">
          <code className="whitespace-pre-wrap break-words">{terminalCommand.curlPreview}</code>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <Metric label="Owner only" value={terminalCommand.safety.ownerOnly ? 1 : 0} />
          <Metric label="No checkout" value={terminalCommand.safety.noCheckout ? 1 : 0} />
          <Metric label="No mutation" value={terminalCommand.safety.noBillingMutation && terminalCommand.safety.noEntitlementMutation ? 1 : 0} />
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-violet-300/20 bg-violet-950/15 p-4">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-violet-100">Operator / chief / captain signoff</p>
        <div className="mt-4 grid gap-3 lg:grid-cols-4">
          {operatorSignoff.signoffs.map((signoff) => (
            <article key={signoff.role} className="rounded-2xl border border-violet-300/15 bg-white/[0.035] p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-violet-100/70">{signoff.role}</p>
              <p className="mt-2 text-xs font-semibold leading-5 text-white">{signoff.status}</p>
              <p className="mt-2 text-[11px] font-medium leading-5 text-violet-50/65">Owner test only. Required before any future customer release path; does not approve release.</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-cyan-300/20 bg-cyan-950/15 p-4">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-100">Seeded owner test fixtures</p>
        <p className="mt-2 text-xs font-medium leading-6 text-cyan-50/70">Batch ID: {fixtureBatch.batchId}. Manifest ID: {batchManifest.manifestId}. Expected outputs per fixture: {batchManifest.items[0]?.expectedOutputs.length ?? 0}.</p>
        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          {fixtureCommands.map((fixture) => (
            <article key={fixture.fixtureId} className="rounded-2xl border border-cyan-300/15 bg-slate-950 p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-100/70">{fixture.testPurpose}</p>
              <code className="mt-3 block whitespace-pre-wrap break-words text-[11px] font-semibold leading-6 text-cyan-50/80">{fixture.command.curlPreview}</code>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-950/15 p-4">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-amber-100">10/10 visual quality gate</p>
        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          {visualQualityGate.dimensions.map((dimension) => (
            <article key={dimension.key} className="rounded-2xl border border-amber-300/15 bg-white/[0.035] p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-amber-100/70">{dimension.key}</p>
              <p className="mt-2 text-xs font-semibold leading-5 text-white">{dimension.label}</p>
              <p className="mt-2 text-xs font-black uppercase tracking-[0.14em] text-amber-100">{dimension.score}/10</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-emerald-300/20 bg-emerald-950/15 p-4">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-100">Report experience scorecards</p>
        <div className="mt-4 grid gap-3 lg:grid-cols-4">
          {reportExperienceScorecards.scorecards.map((scorecard) => (
            <article key={scorecard.planKey} className="rounded-2xl border border-emerald-300/15 bg-white/[0.035] p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-100/70">{scorecard.planKey}</p>
              <h3 className="mt-2 text-sm font-semibold leading-6 text-white">{scorecard.title}</h3>
              <p className="mt-2 text-xs font-black uppercase tracking-[0.14em] text-emerald-100">{scorecard.score}% {scorecard.status}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-3 lg:grid-cols-4">
        {OWNER_REPORT_TEST_PREVIEW_BLUEPRINTS.map((blueprint) => (
          <article key={blueprint.planKey} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-fuchsia-100/70">{blueprint.planKey}</div>
            <h3 className="mt-2 text-lg font-semibold tracking-[-0.03em] text-white">{blueprint.title}</h3>
            <div className="mt-3 rounded-xl border border-fuchsia-300/20 bg-fuchsia-900/20 px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-fuchsia-100">
              {blueprint.previewWatermark}
            </div>
            <p className="mt-3 text-xs font-medium leading-6 text-fuchsia-50/70">
              Visuals: {blueprint.visualStandard.join(" • ")}
            </p>
            <p className="mt-3 text-xs font-medium leading-6 text-fuchsia-50/60">
              Trace: {blueprint.operatorTrace.join(" • ")}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-fuchsia-300/20 bg-black/15 p-4">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-fuchsia-200">Sample report output structure</p>
        <div className="mt-4 grid gap-3 lg:grid-cols-4">
          {OWNER_REPORT_TEST_SAMPLE_OUTPUTS.map((sample) => (
            <article key={sample.planKey} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <div className="text-[10px] font-black uppercase tracking-[0.16em] text-fuchsia-100/65">{sample.planKey}</div>
              <h3 className="mt-2 text-sm font-semibold leading-6 text-white">{sample.title}</h3>
              <div className="mt-3 grid gap-2">
                {sample.reportSections.map((section) => (
                  <div key={section.heading} className="rounded-xl border border-fuchsia-300/10 bg-fuchsia-950/20 p-3">
                    <p className="text-xs font-semibold text-white">{section.heading}</p>
                    <p className="mt-1 text-[11px] font-medium leading-5 text-fuchsia-50/60">{section.visual}</p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[11px] font-medium leading-5 text-fuchsia-50/55">
                Trace: {sample.operatorTrace.map((trace) => `${trace.role}: ${trace.action}`).join(" • ")}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-3 lg:grid-cols-2">
        <RuleBlock title="Owner test requirements" rules={OWNER_REPORT_TEST_MODE_STANDARD} />
        <RuleBlock title="Preview rendering requirements" rules={OWNER_REPORT_TEST_PREVIEW_STANDARD} />
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

function RuleBlock({ title, rules }: { title: string; rules: readonly string[] }) {
  return (
    <div className="rounded-2xl border border-fuchsia-300/20 bg-fuchsia-900/15 p-4">
      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-fuchsia-200">{title}</p>
      <ul className="mt-3 grid gap-2 text-xs font-medium leading-6 text-fuchsia-50/70">
        {rules.map((rule) => <li key={rule}>• {rule}</li>)}
      </ul>
    </div>
  );
}
