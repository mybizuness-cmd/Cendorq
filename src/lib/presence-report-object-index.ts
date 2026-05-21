import { SAMPLE_PRESENCE_REPORT_EVIDENCE_BOUNDARIES } from "@/lib/presence-report-evidence-boundary";
import { PRESENCE_REPORT_LAUNCH_READINESS } from "@/lib/presence-report-launch-readiness";
import { PRESENCE_REPORT_PROTECTED_ROUTES, PRESENCE_REPORT_PUBLIC_ROUTES } from "@/lib/presence-report-route-map";
import { SAMPLE_PRESENCE_REPORT_RELEASE_CHECKS } from "@/lib/presence-report-release-gate";

export const PRESENCE_REPORT_OBJECT_INDEX = {
  category: "AI Search Presence Repair",
  coreLoop: ["Business Truth Profile", "Presence Report", "Repair Queue", "Build Fix", "Control Snapshot"],
  publicRoutes: PRESENCE_REPORT_PUBLIC_ROUTES,
  protectedRoutes: PRESENCE_REPORT_PROTECTED_ROUTES,
  evidenceBoundaries: SAMPLE_PRESENCE_REPORT_EVIDENCE_BOUNDARIES,
  launchReadiness: PRESENCE_REPORT_LAUNCH_READINESS,
  releaseChecks: SAMPLE_PRESENCE_REPORT_RELEASE_CHECKS,
  nextBuildLayer: "Live scan data should feed the same public-safe report package.",
} as const;
