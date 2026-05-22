import { PRESENCE_REPORT_OBJECT_INDEX } from "@/lib/presence-report-object-index";
import { getPresenceReportCustomerSourceContract, type PresenceReportPackageSourceKind } from "@/lib/presence-report-customer-source-contracts";
import { resolveCustomerLatestFreeScanSnapshotPackage, type FreeScanSnapshotOwnershipProof, type FreeScanSnapshotRecord } from "@/lib/presence-report-free-scan-snapshot-source";

export type PresenceReportPackageSource = PresenceReportPackageSourceKind;

export type PresenceReportPackageSourceOptions = Readonly<{
  latestFreeScanRecord?: FreeScanSnapshotRecord | null;
  ownershipProof?: FreeScanSnapshotOwnershipProof | null;
}>;

export type PresenceReportPackageSourceResolution = {
  readonly source: PresenceReportPackageSource;
  readonly resolvedSource: "demo" | "customer-latest-free-scan";
  readonly state: ReturnType<typeof getPresenceReportCustomerSourceContract>["state"];
  readonly label: string;
  readonly customerSafePurpose: string;
  readonly fallbackReason: string | null;
  readonly retrievalReason: string;
  readonly blockedGates: readonly string[];
  readonly package: typeof PRESENCE_REPORT_OBJECT_INDEX.demoReportPackage;
};

export function resolvePresenceReportPackageSource(source: PresenceReportPackageSource = "demo", options: PresenceReportPackageSourceOptions = {}): PresenceReportPackageSourceResolution {
  const contract = getPresenceReportCustomerSourceContract(source);

  if (source === "customer-latest-free-scan") {
    const snapshotResolution = resolveCustomerLatestFreeScanSnapshotPackage(options.latestFreeScanRecord ?? null, options.ownershipProof ?? emptyOwnershipProof());

    if (snapshotResolution.package) {
      return {
        source,
        resolvedSource: "customer-latest-free-scan",
        state: contract.state,
        label: contract.label,
        customerSafePurpose: contract.customerSafePurpose,
        fallbackReason: null,
        retrievalReason: snapshotResolution.customerSafeReason,
        blockedGates: snapshotResolution.blockedGates,
        package: snapshotResolution.package,
      };
    }

    return {
      source,
      resolvedSource: "demo",
      state: contract.state,
      label: contract.label,
      customerSafePurpose: contract.customerSafePurpose,
      fallbackReason: `${contract.label} is not customer-safe to render yet: ${snapshotResolution.customerSafeReason}`,
      retrievalReason: snapshotResolution.customerSafeReason,
      blockedGates: snapshotResolution.blockedGates,
      package: PRESENCE_REPORT_OBJECT_INDEX.demoReportPackage,
    };
  }

  const fallbackReason = contract.kind === "demo" ? null : `${contract.label} is ${contract.state}; using the demo package until server-side customer ownership and release storage are wired.`;

  return {
    source,
    resolvedSource: "demo",
    state: contract.state,
    label: contract.label,
    customerSafePurpose: contract.customerSafePurpose,
    fallbackReason,
    retrievalReason: contract.kind === "demo" ? "Demo package selected." : "Customer released report storage is not wired yet.",
    blockedGates: contract.kind === "demo" ? [] : ["released report ownership", "operator approval gate"],
    package: PRESENCE_REPORT_OBJECT_INDEX.demoReportPackage,
  };
}

export function getPresenceReportPackage(source: PresenceReportPackageSource = "demo", options: PresenceReportPackageSourceOptions = {}) {
  return resolvePresenceReportPackageSource(source, options).package;
}

function emptyOwnershipProof(): FreeScanSnapshotOwnershipProof {
  return {
    verifiedCustomerEmail: null,
    requestedCustomerEmail: null,
    customerId: null,
    scanOwnerCustomerId: null,
    sameAccountAccessGate: false,
    serverSideScanOwnership: false,
  };
}
