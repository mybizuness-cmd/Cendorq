import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { commandCenterPreviewHeaderName, resolveCommandCenterAccessState } from "@/lib/command-center/access";
import { projectOwnerConfigurationEvidenceApprovalWorkflow } from "@/lib/owner-configuration-evidence-approval-workflow-runtime";
import { recordOwnerConfigurationEvidenceBatch } from "@/lib/owner-configuration-evidence-persistence-runtime";
import type { OwnerConfigurationEvidenceInput } from "@/lib/owner-configuration-evidence-runtime";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const sourceRoute = "/api/command-center/owner-configuration/workflow";

const workflowEvidence: readonly OwnerConfigurationEvidenceInput[] = [
  {
    areaKey: "auth-provider-configuration",
    approvalStatus: "pending",
    safeSummary: "Auth provider evidence is pending owner approval and remains blocked for launch review.",
    recordedByRole: "operator",
    sourceRoute,
    requestIdHash: "workflow-auth-provider",
  },
  {
    areaKey: "payment-mapping-configuration",
    approvalStatus: "pending",
    safeSummary: "Payment mapping evidence is pending owner approval and remains blocked for paid launch review.",
    recordedByRole: "operator",
    sourceRoute,
    requestIdHash: "workflow-payment-mapping",
  },
  {
    areaKey: "protected-runtime-configuration",
    approvalStatus: "pending",
    safeSummary: "Protected runtime evidence is pending owner approval and release captain review.",
    recordedByRole: "operator",
    sourceRoute,
    requestIdHash: "workflow-protected-runtime",
  },
  {
    areaKey: "launch-contact-configuration",
    approvalStatus: "missing",
    safeSummary: "Launch contact evidence is missing and must be recorded before review.",
    recordedByRole: "operator",
    sourceRoute,
    requestIdHash: "workflow-launch-contact",
  },
  {
    areaKey: "support-identity-configuration",
    approvalStatus: "pending",
    safeSummary: "Support identity evidence is pending owner approval and release captain review.",
    recordedByRole: "operator",
    sourceRoute,
    requestIdHash: "workflow-support-identity",
  },
];

export async function GET() {
  const headerList = await headers();
  const accessState = resolveCommandCenterAccessState(headerList.get(commandCenterPreviewHeaderName()));

  if (!accessState.allowed) {
    return NextResponse.json(
      { ok: false, status: 404, cache: "no-store" as const, error: "not_available" as const },
      { status: 404, headers: safeHeaders() },
    );
  }

  const persistence = recordOwnerConfigurationEvidenceBatch(workflowEvidence, {
    commandCenterAllowed: true,
    ownerApprovalRecorded: false,
    releaseCaptainReviewed: false,
    recordedByRole: "operator",
    requestIdHash: "workflow-safe-summary",
  });
  const workflow = projectOwnerConfigurationEvidenceApprovalWorkflow({
    records: persistence.records ?? [],
    ownerApprovalRecorded: false,
    releaseCaptainReviewed: false,
    reviewedByRole: "release-captain",
    requestIdHash: "workflow-release-captain-review",
  });

  return NextResponse.json(
    {
      ok: true,
      status: 200,
      cache: "no-store" as const,
      route: sourceRoute,
      commandCenterOnly: true,
      workflowMode: "release-captain-final-review-required" as const,
      publicLaunchAllowed: false,
      paidLaunchAllowed: false,
      reportLaunchAllowed: false,
      securityReadinessApproved: false,
      records: persistence.records,
      workflow,
    },
    { status: 200, headers: safeHeaders() },
  );
}

function safeHeaders() {
  return {
    "Cache-Control": "no-store, max-age=0",
    "Content-Type": "application/json; charset=utf-8",
    "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet",
  } as const;
}
