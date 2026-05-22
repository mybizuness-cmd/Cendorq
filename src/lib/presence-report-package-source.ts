import { PRESENCE_REPORT_OBJECT_INDEX } from "@/lib/presence-report-object-index";
import { getPresenceReportCustomerSourceContract, type PresenceReportPackageSourceKind } from "@/lib/presence-report-customer-source-contracts";

export type PresenceReportPackageSource = PresenceReportPackageSourceKind;

export type PresenceReportPackageSourceResolution = {
  readonly source: PresenceReportPackageSource;
  readonly resolvedSource: "demo";
  readonly state: ReturnType<typeof getPresenceReportCustomerSourceContract>["state"];
  readonly label: string;
  readonly customerSafePurpose: string;
  readonly fallbackReason: string | null;
  readonly package: typeof PRESENCE_REPORT_OBJECT_INDEX.demoReportPackage;
};

export function resolvePresenceReportPackageSource(source: PresenceReportPackageSource = "demo"): PresenceReportPackageSourceResolution {
  const contract = getPresenceReportCustomerSourceContract(source);
  const fallbackReason = contract.kind === "demo" ? null : `${contract.label} is ${contract.state}; using the demo package until server-side customer ownership and release storage are wired.`;

  return {
    source,
    resolvedSource: "demo",
    state: contract.state,
    label: contract.label,
    customerSafePurpose: contract.customerSafePurpose,
    fallbackReason,
    package: PRESENCE_REPORT_OBJECT_INDEX.demoReportPackage,
  };
}

export function getPresenceReportPackage(source: PresenceReportPackageSource = "demo") {
  return resolvePresenceReportPackageSource(source).package;
}
