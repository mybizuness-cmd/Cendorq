export const PRODUCTION_SMOKE_FINALIZATION_CONTRACT = {
  id: "production-smoke-finalization-contract",
  name: "Production Smoke Finalization Coverage Contract",
  purpose:
    "Keep final production smoke coverage aligned with Cendorq public entry, customer platform, command center, auth, welcome email, report rendering, billing checkout, and maintenance safeguards without requiring live secrets in default smoke runs.",
  coverageGroups: [
    {
      key: "public-conversion-routes",
      routes: ["/", "/free-check", "/plans", "/plans/deep-review", "/plans/build-fix", "/plans/ongoing-control", "/connect"],
      requiredPosture: "Public routes must render premium conversion copy, Free Scan entry, plan clarity, and safe contact paths without fake urgency or unsupported guarantees.",
    },
    {
      key: "customer-platform-routes",
      routes: ["/dashboard", "/dashboard/notifications", "/dashboard/reports", "/dashboard/billing", "/dashboard/support", "/dashboard/support/status", "/dashboard/support/request"],
      requiredPosture: "Customer routes must stay protected or safely no-indexed, handoff-driven, customer-owned, and free of raw/internal leakage.",
    },
    {
      key: "closed-command-center-routes",
      routes: ["/command-center", "/command-center/intake"],
      requiredPosture: "Command center routes must remain closed by default without exposing customer records, schema anchors, required permissions, database URLs, provider secrets, payment secrets, or internal modules.",
    },
    {
      key: "protected-api-boundaries",
      routes: ["/api/free-check", "/api/customer/notifications", "/api/customer/support/status", "/api/customer/support/request", "/api/command-center/readiness"],
      requiredPosture: "Protected APIs must return no-store safe failures or authorized safe projections only; default smoke must verify denial posture without needing customer secrets.",
    },
    {
      key: "finalization-contracts",
      routes: ["production-auth-provider-contracts", "verified-welcome-email-contracts", "report-generation-rendering-contracts", "billing-checkout-contracts", "controlled-maintenance-contracts"],
      requiredPosture: "Finalization contracts must stay wired into validate:routes so auth, welcome email, reports, billing checkout, and controlled maintenance cannot drift silently.",
    },
  ],
  defaultSmokeRules: [
    "Default production smoke must not require live customer session tokens, CSRF tokens, provider secrets, webhook secrets, admin keys, support context keys, payment provider keys, or real payment links.",
    "Default production smoke may verify public route rendering, redirects, health, OPTIONS, protected denial states, closed command-center posture, and contract wiring.",
    "Default production smoke must never log raw payloads, raw evidence, raw billing data, provider secrets, customer secrets, internal notes, operator identities, risk internals, attacker details, prompts, session tokens, CSRF tokens, admin keys, or support context keys.",
    "Default production smoke must treat protected-route denial as success when the expected safe denial status and copy are returned.",
  ],
  releaseGateCoverage: [
    "production auth provider contracts validation",
    "verified welcome email contracts validation",
    "report generation rendering contracts validation",
    "billing checkout contracts validation",
    "controlled maintenance contracts validation",
    "customer platform handoff contracts validation",
    "customer platform handoff runtime validation",
    "production smoke coverage validation",
  ],
  blockedSmokePatterns: [
    "liveSecretRequiredForDefaultSmoke",
    "rawPayloadLogged",
    "rawEvidenceLogged",
    "rawBillingDataLogged",
    "providerSecretLogged",
    "sessionTokenLogged",
    "csrfTokenLogged",
    "adminKeyLogged",
    "supportContextKeyLogged",
    "localStorageSecretSmoke",
    "sessionStorageSecretSmoke",
    "accountExistenceLeakSmoke",
    "commandCenterLeakSmoke",
    "clientAuthoritativeBillingSmoke",
    "unverifiedWebhookEntitlementSmoke",
    "pendingReportFinalSmoke",
    "paidReportWithoutEntitlementSmoke",
    "fakeUrgencySmoke",
    "guaranteedOutcomeSmoke",
  ],
  releaseRules: [
    "No release is final unless production smoke coverage and all finalization contract validators are wired into validate:routes.",
    "No smoke check may require production mutation, real payment, real customer session, or uncontrolled AI action.",
    "No protected route may pass smoke by exposing internal data; safe denial is acceptable and expected where authorization is absent.",
    "No public conversion route may pass smoke if it relies on fake urgency, guaranteed outcomes, or unsafe data collection.",
  ],
} as const;

export function getProductionSmokeFinalizationContract() {
  return PRODUCTION_SMOKE_FINALIZATION_CONTRACT;
}
