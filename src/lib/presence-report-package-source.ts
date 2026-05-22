import { PRESENCE_REPORT_OBJECT_INDEX } from "@/lib/presence-report-object-index";

export type PresenceReportPackageSource = "demo";

export function getPresenceReportPackage(source: PresenceReportPackageSource = "demo") {
  if (source === "demo") return PRESENCE_REPORT_OBJECT_INDEX.demoReportPackage;

  return PRESENCE_REPORT_OBJECT_INDEX.demoReportPackage;
}
