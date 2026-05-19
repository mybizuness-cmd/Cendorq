import type { Metadata } from "next";
import { headers } from "next/headers";

import { commandCenterPreviewHeaderName, resolveCommandCenterAccessState } from "@/lib/command-center/access";
import { buildOwnerPublicPageAcquisitionProjection } from "@/lib/owner-public-page-acquisition-contract";
import { validateOwnerPublicCompanyUrl } from "@/lib/owner-public-company-url-safety";
import { buildOwnerReportFindingEngineProjection } from "@/lib/owner-report-finding-engine-contract";
import { buildOwnerReportPreviewPackages } from "@/lib/owner-report-preview-package-runtime";
import { buildOwnerReportTerminalTestCommand } from "@/lib/owner-report-terminal-test-command-contract";
import { buildOwnerReportTestResultExportProjection } from "@/lib/owner-report-test-result-export-contract";
import { buildOwnerReportTestRunnerState } from "@/lib/owner-report-test-runner-contract";
import { getOwnerReportTestPreviewBlueprint } from "@/lib/owner-report-test-preview-rendering";
import { getOwnerReportTestSampleOutput } from "@/lib/owner-report-test-sample-output";
import { projectOwnerReportTestMode, type OwnerReportTestPlanKey } from "@/lib/owner-report-test-mode-standard";
import { ClosedCommandCenterPanel } from "../closed-command-center-panel";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Owner report test mode | Cendorq",
  description: "Owner-only Cendorq report preview runner for public-company test inputs across every plan without checkout or customer delivery.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false, noimageindex: true } },
};

type SearchParams = { companyName?: string | string[]; companyUrl?: string | string[]; plan?: string | string[] };
type PageProps = { searchParams?: Promise<SearchParams> | SearchParams };

const ALL_PLANS: readonly OwnerReportTestPlanKey[] = ["free-scan", "deep-review", "build-fix", "ongoing-control"];

export default async function OwnerReportTestPage({ searchParams }: PageProps) {
  const headerList = await headers();
  const accessState = resolveCommandCenterAccessState(headerList.get(commandCenterPreviewHeaderName()));
  if (!accessState.allowed) return <ClosedCommandCenterPanel />;

  const params = await searchParams;
  const companyName = normalizeValue(params?.companyName) || "Example Public Company";
  const rawCompanyUrl = normalizeValue(params?.companyUrl) || "https://example.com";
  const urlSafety = validateOwnerPublicCompanyUrl(rawCompanyUrl);
  const companyUrl = urlSafety.ok ? urlSafety.normalizedUrl : "https://example.com";
  const safeUrlSafety = validateOwnerPublicCompanyUrl(companyUrl);
  const requestedPlans = normalizePlans(params?.plan);
  const runner = buildOwnerReportTestRunnerState({ companyName, companyUrl, requestedPlans });
  const projection = projectOwnerReportTestMode({ companyName, companyUrl, requestedPlans: runner.input.requestedPlans, ownerAccessVerified: true });
  const acquisition = buildOwnerPublicPageAcquisitionProjection(safeUrlSafety);
  const findings = buildOwnerReportFindingEngineProjection({ acquisition, companyName, companyUrl, planKeys: projection.allowedPlans });
  const sampleOutputs = projection.allowedPlans.flatMap((planKey) => {
    const sample = getOwnerReportTestSampleOutput(planKey);
    return sample ? [sample] : [];
  });
  const previewPackages = buildOwnerReportPreviewPackages({ samples: sampleOutputs, findings: findings.findings });
  const exportProjection = buildOwnerReportTestResultExportProjection({ previewPackages, companyName, companyUrl });
  const terminalCommand = buildOwnerReportTerminalTestCommand({ companyName, companyUrl, requestedPlans: runner.input.requestedPlans });
  const previews = projection.allowedPlans.map((planKey) => ({
    blueprint: getOwnerReportTestPreviewBlueprint(planKey),
    sample: getOwnerReportTestSampleOutput(planKey),
    previewPackage: previewPackages.packages.find((pkg) => pkg.planKey === planKey),
  }));

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <section className="mx-auto max-w-7xl">
        <a href="/command-center" className="text-xs font-black uppercase tracking-[0.2em] text-fuchsia-200 transition hover:text-white">← Command Center</a>
        <div className="mt-6 rounded-[2rem] border border-fuchsia-300/20 bg-fuchsia-950/20 p-6 shadow-2xl shadow-fuchsia-950/20 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-fuchsia-200">Owner-only report test runner</p>
          <h1 className="mt-4 max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.07em] md:text-7xl">Preview every Cendorq report without checkout.</h1>
          <p className="mt-5 max-w-4xl text-sm font-medium leading-7 text-fuchsia-50/75 md:text-base md:leading-8">
            Run public-company test inputs across Free Scan, Deep Review, Build Fix, and Ongoing Control. Outputs stay watermarked, owner-only, noindexed, not customer delivery, and unable to mutate billing, entitlements, customer email, or report release state.
          </p>
        </div>

        {!urlSafety.ok ? (
          <div className="mt-6 rounded-2xl border border-amber-300/25 bg-amber-300/10 p-4 text-sm font-semibold leading-6 text-amber-100">
            Public URL safety blocked that input ({urlSafety.reason}). Showing the safe example preview instead.
          </div>
        ) : null}

        <form method="get" className="mt-6 grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 md:grid-cols-[1fr_1fr_auto] md:items-end">
          <label className="block">
            <span className="text-[11px] font-black uppercase tracking-[0.18em] text-fuchsia-100/70">Company name</span>
            <input name="companyName" defaultValue={projection.companyName} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm font-semibold text-white outline-none ring-fuchsia-300 transition focus:ring-2" />
          </label>
          <label className="block">
            <span className="text-[11px] font-black uppercase tracking-[0.18em] text-fuchsia-100/70">Public company URL</span>
            <input name="companyUrl" defaultValue={projection.companyUrl} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm font-semibold text-white outline-none ring-fuchsia-300 transition focus:ring-2" />
          </label>
          <button className="rounded-2xl bg-fuchsia-200 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-fuchsia-300 focus:ring-offset-2 focus:ring-offset-slate-950" type="submit">Run preview</button>
          <div className="md:col-span-3 grid gap-3 sm:grid-cols-4">
            {ALL_PLANS.map((plan) => (
              <label key={plan} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-xs font-bold text-fuchsia-50/80">
                <input name="plan" type="checkbox" value={plan} defaultChecked={runner.input.requestedPlans.includes(plan)} />
                {plan}
              </label>
            ))}
          </div>
        </form>

        <div className="mt-6 rounded-[2rem] border border-cyan-300/20 bg-cyan-950/15 p-5">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-100">Backend terminal / API command</p>
          <p className="mt-2 text-xs font-medium leading-6 text-cyan-50/70">
            Same owner-only test path as this page. Public URL only; no checkout, no customer delivery, no billing mutation, no entitlement mutation.
          </p>
          <div className="mt-4 rounded-2xl border border-cyan-300/15 bg-slate-950 p-4 text-xs font-semibold leading-6 text-cyan-50/80">
            <code className="whitespace-pre-wrap break-words">{terminalCommand.curlPreview}</code>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-5">
          <StateCard label="Checkout" value={projection.checkoutRequired ? "required" : "not required"} />
          <StateCard label="Customer delivery" value={projection.safety.noCustomerDelivery ? "blocked" : "allowed"} />
          <StateCard label="Acquisition" value={acquisition.status} />
          <StateCard label="Preview packages" value={`${previewPackages.packages.length} ready`} />
          <StateCard label="Owner export" value={exportProjection.status} />
        </div>

        <div className="mt-6 rounded-[2rem] border border-emerald-300/20 bg-emerald-950/15 p-5">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-100">Owner-only export projection</p>
          <p className="mt-2 text-xs font-medium leading-6 text-emerald-50/70">
            Export ID: {exportProjection.exportRecord.exportId}. Format: {exportProjection.exportRecord.format}. Includes safety, acquisition, findings, preview packages, sample outputs, and quality gate posture. Not downloadable from customer dashboard and not emailed to customers.
          </p>
        </div>

        <div className="mt-6 grid gap-5">
          {previews.map(({ blueprint, sample, previewPackage }) => {
            if (!blueprint || !sample) return null;
            return (
              <article key={blueprint.planKey} className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/20">
                <div className="border-b border-white/10 bg-gradient-to-r from-fuchsia-950/60 to-cyan-950/30 p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-fuchsia-300/30 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-fuchsia-100">{blueprint.planKey}</span>
                    <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-amber-100">{sample.watermark}</span>
                    <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-100">quality gate: {previewPackage?.qualityGate.status ?? "blocked"}</span>
                  </div>
                  <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white md:text-5xl">{blueprint.title}</h2>
                  <p className="mt-3 max-w-4xl text-sm font-medium leading-7 text-fuchsia-50/70">{previewPackage?.summary ?? sample.reportSections[0]?.customerSafePreview}</p>
                </div>

                <div className="grid gap-4 p-5 lg:grid-cols-[1.2fr_0.8fr]">
                  <div className="grid gap-3 md:grid-cols-3">
                    {sample.reportSections.map((section) => (
                      <section key={section.heading} className="rounded-2xl border border-fuchsia-300/15 bg-fuchsia-950/20 p-4">
                        <p className="text-[11px] font-black uppercase tracking-[0.18em] text-fuchsia-100/65">{section.visual}</p>
                        <h3 className="mt-3 text-xl font-semibold tracking-[-0.035em] text-white">{section.heading}</h3>
                        <p className="mt-3 text-xs font-medium leading-6 text-fuchsia-50/65">{section.purpose}</p>
                      </section>
                    ))}
                  </div>

                  <div className="grid gap-4">
                    <div className="rounded-2xl border border-cyan-300/15 bg-cyan-950/20 p-4">
                      <p className="text-[11px] font-black uppercase tracking-[0.18em] text-cyan-100/70">Agent / chief / captain trace</p>
                      <div className="mt-4 grid gap-3">
                        {sample.operatorTrace.map((trace) => (
                          <div key={`${trace.role}-${trace.action}`} className="rounded-xl border border-cyan-300/10 bg-white/[0.035] p-3">
                            <div className="text-xs font-black uppercase tracking-[0.16em] text-cyan-100">{trace.role}</div>
                            <p className="mt-2 text-xs font-medium leading-6 text-cyan-50/65">{trace.action}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-emerald-300/15 bg-emerald-950/20 p-4">
                      <p className="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-100/70">Preview package</p>
                      <p className="mt-3 text-xs font-medium leading-6 text-emerald-50/70">Findings linked: {previewPackage?.findingCount ?? 0}</p>
                      <p className="mt-3 text-xs font-medium leading-6 text-emerald-50/70">Next command: {previewPackage?.nextCommand ?? "Review owner-only preview output before release."}</p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

function StateCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="text-[10px] font-black uppercase tracking-[0.18em] text-fuchsia-100/60">{label}</div>
      <div className="mt-2 text-lg font-semibold text-white">{value}</div>
    </div>
  );
}

function normalizeValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function normalizePlans(value: string | string[] | undefined): OwnerReportTestPlanKey[] {
  const values = Array.isArray(value) ? value : value ? [value] : [...ALL_PLANS];
  return values.filter((plan): plan is OwnerReportTestPlanKey => ALL_PLANS.includes(plan as OwnerReportTestPlanKey));
}
