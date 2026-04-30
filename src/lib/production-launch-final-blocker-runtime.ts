import { PRODUCTION_LAUNCH_FINAL_BLOCKER_CONTRACT } from "./production-launch-final-blocker-contracts";

export type ProductionLaunchFinalBlockerInput = {
  ownerConfigurationComplete?: boolean;
  productionSmokeComplete?: boolean;
  rollbackEvidenceComplete?: boolean;
  auditEvidenceComplete?: boolean;
  hardLocksClear?: boolean;
};

export type ProductionLaunchFinalBlockerProjection = {
  blockerKey: string;
  label: string;
  blocks: string;
  requiredEvidence: readonly string[];
  evidenceStatus: "complete" | "blocked";
  safeNextAction: string;
  publicClaimAllowed: false;
};

export type ProductionLaunchFinalBlockerSummary = {
  releaseState: string;
  publicClaimAllowed: boolean;
  paidClaimAllowed: boolean;
  reportClaimAllowed: boolean;
  blockers: readonly ProductionLaunchFinalBlockerProjection[];
  blockedCount: number;
  completeCount: number;
  safeNextActions: readonly string[];
};

export function projectProductionLaunchFinalBlockers(input: ProductionLaunchFinalBlockerInput): ProductionLaunchFinalBlockerSummary {
  const statuses: Record<string, boolean | undefined> = {
    "owner-configuration": input.ownerConfigurationComplete,
    "production-smoke-target": input.productionSmokeComplete,
    "rollback-evidence": input.rollbackEvidenceComplete,
    "audit-evidence": input.auditEvidenceComplete,
    "hard-lock-clearance": input.hardLocksClear,
  };

  const blockers = PRODUCTION_LAUNCH_FINAL_BLOCKER_CONTRACT.blockerGroups.map((group) => {
    const complete = Boolean(statuses[group.key]);
    return {
      blockerKey: group.key,
      label: group.label,
      blocks: group.blocks,
      requiredEvidence: group.requiredEvidence,
      evidenceStatus: complete ? "complete" : "blocked",
      safeNextAction: complete ? "Evidence recorded. Keep proof preserved and continue release-captain review." : `Complete ${group.label.toLowerCase()} evidence before any matching launch claim.`,
      publicClaimAllowed: false,
    } satisfies ProductionLaunchFinalBlockerProjection;
  });

  const allComplete = blockers.every((blocker) => blocker.evidenceStatus === "complete");
  const ownerComplete = Boolean(input.ownerConfigurationComplete);
  const smokeComplete = Boolean(input.productionSmokeComplete);
  const rollbackComplete = Boolean(input.rollbackEvidenceComplete);
  const auditComplete = Boolean(input.auditEvidenceComplete);
  const hardLocksClear = Boolean(input.hardLocksClear);
  const allLaunchClaimEvidenceComplete = Boolean(ownerComplete && smokeComplete && rollbackComplete && auditComplete && hardLocksClear && allComplete);

  return {
    releaseState: chooseReleaseState({ ownerComplete, smokeComplete, rollbackComplete, auditComplete, hardLocksClear, allComplete }),
    publicClaimAllowed: allLaunchClaimEvidenceComplete,
    paidClaimAllowed: allLaunchClaimEvidenceComplete,
    reportClaimAllowed: allLaunchClaimEvidenceComplete,
    blockers,
    blockedCount: blockers.filter((blocker) => blocker.evidenceStatus === "blocked").length,
    completeCount: blockers.filter((blocker) => blocker.evidenceStatus === "complete").length,
    safeNextActions: blockers.filter((blocker) => blocker.evidenceStatus === "blocked").map((blocker) => blocker.safeNextAction),
  };
}

function chooseReleaseState(input: { ownerComplete: boolean; smokeComplete: boolean; rollbackComplete: boolean; auditComplete: boolean; hardLocksClear: boolean; allComplete: boolean }) {
  if (!input.ownerComplete) return "blocked-by-owner-configuration";
  if (!input.smokeComplete) return "blocked-by-production-smoke";
  if (!input.rollbackComplete) return "blocked-by-rollback-evidence";
  if (!input.auditComplete) return "blocked-by-audit-evidence";
  if (!input.hardLocksClear) return "blocked-by-hard-lock";
  if (input.allComplete) return "ready-for-release-captain-launch-review";
  return "ready-for-owner-review";
}
