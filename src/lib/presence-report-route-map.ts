export const PRESENCE_REPORT_PUBLIC_ROUTES = [] as const;

export const PRESENCE_REPORT_PROTECTED_ROUTES = [
  "/dashboard/reports/free-scan",
] as const;

export const PRESENCE_REPORT_ROUTE_PURPOSES = {
  "/dashboard/reports/free-scan": "Protected first-signal result shell.",
} as const;

export const PRESENCE_REPORT_ROUTE_BOUNDARIES = {
  public: "Public pages can explain the product path, but report examples are no longer part of the public website.",
  protected: "Protected report routes can show customer-specific first signal output after verified access.",
  excluded: "Checkout, login, API, retired report examples, and internal operator routes must stay out of the public Presence Report route map.",
} as const;
