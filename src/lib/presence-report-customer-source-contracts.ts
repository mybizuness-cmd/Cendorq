export type PresenceReportPackageSourceKind = "demo" | "customer-latest-free-scan" | "customer-released-report";

export type PresenceReportPackageSourceState = "available" | "pending-storage" | "requires-customer-ownership" | "requires-release-approval";

export type PresenceReportCustomerSourceContract = {
  readonly kind: PresenceReportPackageSourceKind;
  readonly label: string;
  readonly state: PresenceReportPackageSourceState;
  readonly customerSafePurpose: string;
  readonly requiredOwnershipProof: readonly string[];
  readonly allowedSurfaces: readonly string[];
  readonly fallbackSource: PresenceReportPackageSourceKind;
  readonly mustNotExpose: readonly string[];
};

export const PRESENCE_REPORT_CUSTOMER_SOURCE_CONTRACTS: readonly PresenceReportCustomerSourceContract[] = [
  {
    kind: "demo",
    label: "Demo Presence Report package",
    state: "available",
    customerSafePurpose: "Render the shared Sandwork demo report through the package-source helper until customer-owned storage is available.",
    requiredOwnershipProof: ["demo fixture only", "no customer ownership claim"],
    allowedSurfaces: ["sample report", "protected preview fallback", "dashboard snapshot fallback"],
    fallbackSource: "demo",
    mustNotExpose: ["raw evidence", "private scoring internals", "customer-owned claim"],
  },
  {
    kind: "customer-latest-free-scan",
    label: "Customer latest Free Scan package",
    state: "pending-storage",
    customerSafePurpose: "Resolve the latest customer-owned Free Scan snapshot into the same public-safe Presence Report package shape.",
    requiredOwnershipProof: ["verified customer email", "server-side scan ownership", "same-account access gate"],
    allowedSurfaces: ["protected Free Scan result", "dashboard Presence snapshot", "report vault"],
    fallbackSource: "demo",
    mustNotExpose: ["raw intake payload", "private scoring internals", "account existence internals"],
  },
  {
    kind: "customer-released-report",
    label: "Customer released report package",
    state: "requires-release-approval",
    customerSafePurpose: "Resolve an approved paid report package only after release gates confirm customer ownership and operator approval.",
    requiredOwnershipProof: ["verified customer email", "paid entitlement", "released report ownership", "operator approval gate"],
    allowedSurfaces: ["protected report vault", "dashboard Presence snapshot", "support status"],
    fallbackSource: "customer-latest-free-scan",
    mustNotExpose: ["draft report", "unapproved finding", "raw evidence", "operator notes"],
  },
] as const;

export function getPresenceReportCustomerSourceContracts() {
  return PRESENCE_REPORT_CUSTOMER_SOURCE_CONTRACTS;
}

export function getPresenceReportCustomerSourceContract(kind: PresenceReportPackageSourceKind) {
  return PRESENCE_REPORT_CUSTOMER_SOURCE_CONTRACTS.find((contract) => contract.kind === kind) ?? PRESENCE_REPORT_CUSTOMER_SOURCE_CONTRACTS[0];
}
