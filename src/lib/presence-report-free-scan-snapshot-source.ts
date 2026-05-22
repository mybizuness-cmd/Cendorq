import { mapLiveScanSnapshotToPresenceReport } from "@/lib/live-scan-presence-report-mapping";
import type { GeneratedPresenceReportPackage, PresenceReportGenerationInput } from "@/lib/presence-report-generation-adapter";
import type { FreeCheckReportSnapshot } from "@/lib/reports/free-check-report";

export type FreeScanSnapshotOwnershipProof = Readonly<{
  verifiedCustomerEmail: string | null;
  requestedCustomerEmail: string | null;
  customerId: string | null;
  scanOwnerCustomerId: string | null;
  sameAccountAccessGate: boolean;
  serverSideScanOwnership: boolean;
}>;

export type FreeScanSnapshotRecord = Readonly<{
  sourceKind: "customer-latest-free-scan";
  scanId: string;
  customerId: string;
  customerEmail: string;
  snapshot: FreeCheckReportSnapshot;
  generationInput: PresenceReportGenerationInput;
  capturedAt: string;
  updatedAt: string;
}>;

export type FreeScanSnapshotRetrievalResolution = Readonly<{
  state: "resolved-customer-snapshot" | "blocked-needs-ownership" | "blocked-missing-snapshot";
  package: GeneratedPresenceReportPackage | null;
  customerSafeReason: string;
  requiredGates: readonly string[];
  passedGates: readonly string[];
  blockedGates: readonly string[];
}>;

const REQUIRED_FREE_SCAN_SNAPSHOT_GATES = [
  "verified customer email",
  "server-side scan ownership",
  "same-account access gate",
  "customer-owned Free Scan snapshot",
] as const;

export function resolveCustomerLatestFreeScanSnapshotPackage(record: FreeScanSnapshotRecord | null, ownershipProof: FreeScanSnapshotOwnershipProof): FreeScanSnapshotRetrievalResolution {
  if (!record) {
    return blockedResolution("blocked-missing-snapshot", "No customer-owned Free Scan snapshot is available yet; keep the protected report on the demo fallback until storage returns a verified record.", [], ["customer-owned Free Scan snapshot"]);
  }

  const passedGates = getPassedOwnershipGates(record, ownershipProof);
  const blockedGates = REQUIRED_FREE_SCAN_SNAPSHOT_GATES.filter((gate) => !passedGates.includes(gate));

  if (blockedGates.length) {
    return blockedResolution("blocked-needs-ownership", "The latest Free Scan snapshot is not safe to render until customer identity, same-account access, and server-side scan ownership all pass.", passedGates, blockedGates);
  }

  return {
    state: "resolved-customer-snapshot",
    package: mapLiveScanSnapshotToPresenceReport(record.snapshot, record.generationInput),
    customerSafeReason: "Resolved a customer-owned latest Free Scan snapshot through verified email, server-side scan ownership, and same-account access before customer-safe rendering.",
    requiredGates: REQUIRED_FREE_SCAN_SNAPSHOT_GATES,
    passedGates,
    blockedGates: [],
  } as const;
}

function getPassedOwnershipGates(record: FreeScanSnapshotRecord, ownershipProof: FreeScanSnapshotOwnershipProof) {
  const passed: string[] = [];
  const verifiedEmail = ownershipProof.verifiedCustomerEmail?.trim().toLowerCase();
  const requestedEmail = ownershipProof.requestedCustomerEmail?.trim().toLowerCase();
  const recordEmail = record.customerEmail.trim().toLowerCase();

  if (verifiedEmail && requestedEmail && recordEmail && verifiedEmail === requestedEmail && requestedEmail === recordEmail) passed.push("verified customer email");
  if (ownershipProof.serverSideScanOwnership && ownershipProof.customerId && ownershipProof.scanOwnerCustomerId && ownershipProof.customerId === ownershipProof.scanOwnerCustomerId && record.customerId === ownershipProof.customerId) passed.push("server-side scan ownership");
  if (ownershipProof.sameAccountAccessGate) passed.push("same-account access gate");
  if (record.snapshot.reportId && record.sourceKind === "customer-latest-free-scan") passed.push("customer-owned Free Scan snapshot");

  return passed;
}

function blockedResolution(state: "blocked-needs-ownership" | "blocked-missing-snapshot", customerSafeReason: string, passedGates: readonly string[], blockedGates: readonly string[]): FreeScanSnapshotRetrievalResolution {
  return {
    state,
    package: null,
    customerSafeReason,
    requiredGates: REQUIRED_FREE_SCAN_SNAPSHOT_GATES,
    passedGates,
    blockedGates,
  } as const;
}
