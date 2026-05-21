export const PRESENCE_REPORT_PUBLIC_ROUTES = [
  "/sample-report",
  "/sample-report/dentist",
  "/sample-report/med-spa",
  "/sample-report/law-firm",
  "/sample-report/contractor",
] as const;

export const PRESENCE_REPORT_PROTECTED_ROUTES = [
  "/dashboard/reports/free-scan",
] as const;

export const PRESENCE_REPORT_ROUTE_PURPOSES = {
  "/sample-report": "Core public product object.",
  "/sample-report/dentist": "Dental trust standard sample.",
  "/sample-report/med-spa": "Med spa trust standard sample.",
  "/sample-report/law-firm": "Law firm trust standard sample.",
  "/sample-report/contractor": "Contractor trust standard sample.",
  "/dashboard/reports/free-scan": "Protected first-signal result shell.",
} as const;
