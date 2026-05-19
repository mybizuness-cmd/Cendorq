import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { commandCenterPreviewHeaderName, resolveCommandCenterAccessState } from "@/lib/command-center/access";
import { getOwnerReportTestPreviewBlueprint } from "@/lib/owner-report-test-preview-rendering";
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
  }, 200);
}

export async function POST(request: Request) {
  if (!(await hasAccess())) return deniedResponse();

  const body = await readJson(request);
  if (!isRecord(body) || containsBlockedShape(body)) return rejectedResponse();

  const projection = projectOwnerReportTestMode({
    companyName: getString(body, "companyName"),
    companyUrl: getString(body, "companyUrl"),
    requestedPlans: getPlans(body),
    ownerAccessVerified: true,
  });

  if (!projection.ok || !projection.companyUrl) return rejectedResponse();

  return json({
    ...projection,
    route,
    commandCenterOnly: true,
    previewBlueprints: projection.allowedPlans.map((planKey) => getOwnerReportTestPreviewBlueprint(planKey)),
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

function rejectedResponse() {
  return json({ ok: false, status: 400, cache: "no-store" as const, error: "public_company_test_input_required" as const }, 400);
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
