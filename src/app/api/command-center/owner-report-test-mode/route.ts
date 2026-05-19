import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { commandCenterPreviewHeaderName, resolveCommandCenterAccessState } from "@/lib/command-center/access";
import { buildOwnerPublicPageAcquisitionProjection } from "@/lib/owner-public-page-acquisition-contract";
import { validateOwnerPublicCompanyUrl } from "@/lib/owner-public-company-url-safety";
import { buildOwnerReportFindingEngineProjection } from "@/lib/owner-report-finding-engine-contract";
import { buildOwnerReportPreviewPackages } from "@/lib/owner-report-preview-package-runtime";
import { buildOwnerReportTestResultExportProjection } from "@/lib/owner-report-test-result-export-contract";
import { getOwnerReportTestPreviewBlueprint } from "@/lib/owner-report-test-preview-rendering";
import { getOwnerReportTestSampleOutput } from "@/lib/owner-report-test-sample-output";
import { buildOwnerReportTestRunnerState } from "@/lib/owner-report-test-runner-contract";
import { recordOwnerReportTestRun } from "@/lib/owner-report-test-run-persistence-runtime";
import { projectOwnerReportTestMode, type OwnerReportTestPlanKey } from "@/lib/owner-report-test-mode-standard";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const route = "/api/command-center/owner-report-test-mode";
const allowedPlans = new Set<OwnerReportTestPlanKey>(["free-scan", "deep-review", "build-fix", "ongoing-control"]);

export async function GET() {
  if (!(await hasAccess())) return deniedResponse();

  return json({
    ok: true,
    route,
    commandCenterOnly: true,
    checkoutRequired: false,
    customerDeliveryAllowed: false,
    allowedPlans: Array.from(allowedPlans),
    blueprints: Array.from(allowedPlans).map((planKey) => getOwnerReportTestPreviewBlueprint(planKey)),
    sampleOutputs: Array.from(allowedPlans).map((planKey) => getOwnerReportTestSampleOutput(planKey)),
  }, 200);
}

export async function POST(request: Request) {
  if (!(await hasAccess())) return deniedResponse();

  const body = await readJson(request);
  if (!isRecord(body) || containsBlockedShape(body)) return rejectedResponse();

  const companyName = getString(body, "companyName");
  const urlSafety = validateOwnerPublicCompanyUrl(getString(body, "companyUrl"));
  if (!urlSafety.ok) return rejectedResponse(urlSafety.reason);
  const acquisition = buildOwnerPublicPageAcquisitionProjection(urlSafety);
  if (!acquisition.ok) return rejectedResponse(acquisition.reason);

  const requestedPlans = getPlans(body);
  const runner = buildOwnerReportTestRunnerState({ companyName, companyUrl: urlSafety.normalizedUrl, requestedPlans });
  const projection = projectOwnerReportTestMode({
    companyName,
    companyUrl: urlSafety.normalizedUrl,
    requestedPlans: runner.input.requestedPlans,
    ownerAccessVerified: true,
  });

  if (!projection.ok || !projection.companyUrl) return rejectedResponse();

  const findings = buildOwnerReportFindingEngineProjection({
    acquisition,
    companyName,
    companyUrl: urlSafety.normalizedUrl,
    planKeys: projection.allowedPlans,
  });
  const sampleOutputs = projection.allowedPlans.flatMap((planKey) => {
    const sample = getOwnerReportTestSampleOutput(planKey);
    return sample ? [sample] : [];
  });
  const previewPackages = buildOwnerReportPreviewPackages({ samples: sampleOutputs, findings: findings.findings });
  const exportProjection = buildOwnerReportTestResultExportProjection({
    previewPackages,
    companyName,
    companyUrl: urlSafety.normalizedUrl,
  });

  const persistence = recordOwnerReportTestRun(runner, projection, {
    commandCenterAllowed: true,
    ownerAccessVerified: true,
    recordedByRole: "owner",
    sourceRoute: route,
    requestIdHash: safeRequestIdHash(request),
  });

  return json({
    ...projection,
    route,
    commandCenterOnly: true,
    runner,
    urlSafety,
    acquisition,
    findings,
    previewPackages,
    exportProjection,
    persistence,
    previewBlueprints: projection.allowedPlans.map((planKey) => getOwnerReportTestPreviewBlueprint(planKey)),
    sampleOutputs,
    acceptedInput: "public-company-url-only" as const,
    previewOnly: true,
    checkoutBypassedForOwnerTestOnly: true,
    customerDeliveryApproved: false,
    reportReleaseApproved: false,
    billingMutationAllowed: false,
    entitlementMutationAllowed: false,
  }, 202);
}

async function hasAccess() {
  const headerList = await headers();
  return resolveCommandCenterAccessState(headerList.get(commandCenterPreviewHeaderName())).allowed;
}

async function readJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

function getPlans(body: Record<string, unknown>): OwnerReportTestPlanKey[] {
  const value = body.requestedPlans;
  if (!Array.isArray(value)) return ["free-scan", "deep-review", "build-fix", "ongoing-control"];
  return value.filter((item): item is OwnerReportTestPlanKey => allowedPlans.has(item as OwnerReportTestPlanKey));
}

function getString(body: Record<string, unknown>, key: string) {
  const value = body[key];
  return typeof value === "string" ? value : "";
}

function safeRequestIdHash(request: Request) {
  const value = request.headers.get("x-request-id") ?? "owner-report-test-request";
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  return `owner-test-${hash.toString(16).padStart(8, "0")}`;
}

function containsBlockedShape(value: unknown): boolean {
  if (Array.isArray(value)) return value.some(containsBlockedShape);
  if (!isRecord(value)) return false;
  for (const [key, nested] of Object.entries(value)) {
    const normalizedKey = key.toLowerCase();
    if (["password", "secret", "token", "privatekey", "session", "credential", "rawpayload", "rawevidence", "billingpayload"].some((blocked) => normalizedKey.includes(blocked))) return true;
    if (typeof nested === "string" && containsBlockedText(nested)) return true;
    if (containsBlockedShape(nested)) return true;
  }
  return false;
}

function containsBlockedText(value: string) {
  const normalized = value.toLowerCase();
  return ["password=", "secret=", "token=", "private key", "session token", "guaranteed ranking", "guaranteed roi", "guaranteed revenue"].some((blocked) => normalized.includes(blocked));
}

function deniedResponse() {
  return json({ ok: false, status: 404, cache: "no-store" as const, error: "not_available" as const }, 404);
}

function rejectedResponse(reason: string = "public_company_test_input_required") {
  return json({ ok: false, status: 400, cache: "no-store" as const, error: "public_company_test_input_required" as const, reason }, 400);
}

function json(body: unknown, status: number) {
  return NextResponse.json(body, { status, headers: safeHeaders() });
}

function safeHeaders() {
  return {
    "Cache-Control": "no-store, max-age=0",
    "Content-Type": "application/json; charset=utf-8",
    "X-Content-Type-Options": "nosniff",
    "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet",
    "Referrer-Policy": "same-origin",
  } as const;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}
