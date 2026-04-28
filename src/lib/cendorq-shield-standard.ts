export type CendorqShieldArea =
  | "governance"
  | "edge"
  | "device-session"
  | "authentication"
  | "authorization"
  | "api"
  | "input"
  | "ai"
  | "data"
  | "billing-email-provider"
  | "monitoring"
  | "incident-response";

export type CendorqShieldRule = {
  key: string;
  label: string;
  area: CendorqShieldArea;
  requirement: string;
  requiredControls: readonly string[];
  blockedBehavior: readonly string[];
};

export type HostileInputDecision = "allow" | "sanitize" | "challenge" | "block" | "quarantine";

export type HostileInputControl = {
  key: string;
  decision: HostileInputDecision;
  customerMessage: string;
  internalAction: string;
};

export const CENDORQ_SHIELD_RULES = [
  {
    key: "deny-by-default",
    label: "Deny by default",
    area: "governance",
    requirement: "Every route, API, dashboard action, report workflow, AI workflow, billing flow, and internal tool starts closed and receives explicit tested access only when needed.",
    requiredControls: ["deny by default", "least privilege", "explicit route inventory", "secure defaults", "validation gate", "security owner", "rollback path"],
    blockedBehavior: ["open by default", "temporary public bypass", "untested route", "security through secrecy only", "missing owner", "missing rollback"],
  },
  {
    key: "edge-traffic-defense",
    label: "Edge traffic defense",
    area: "edge",
    requirement: "Public traffic must pass layered controls before application logic: TLS, security headers, bot controls, rate limits, size limits, method allowlists, origin allowlists, redirect allowlists, and safe errors.",
    requiredControls: ["TLS", "security headers", "rate limits", "payload size limits", "method allowlist", "bot abuse controls", "safe errors", "origin allowlist", "redirect allowlist"],
    blockedBehavior: ["unbounded public request", "unsafe redirect", "raw stack trace", "missing method guard", "missing size limit", "open CORS"],
  },
  {
    key: "device-session-fortress",
    label: "Device and session fortress",
    area: "device-session",
    requirement: "Even if a customer or operator device is compromised, Cendorq must limit damage with phishing-resistant MFA readiness, passkey/WebAuthn path, risk-based reauthentication, session rotation, token revocation, device trust, alerts, and least privilege.",
    requiredControls: ["phishing-resistant MFA readiness", "passkey/WebAuthn path", "risk-based reauthentication", "session rotation", "token revocation", "trusted-device state", "new-device alert", "suspicious-login alert", "least privilege"],
    blockedBehavior: ["long-lived unrevocable session", "password-only admin access", "silent new-device login", "device trust without verification", "operator session without reauth for sensitive action", "unbounded stolen-cookie usefulness"],
  },
  {
    key: "auth-account-fortress",
    label: "Authentication and account fortress",
    area: "authentication",
    requirement: "Customer, operator, and admin access must resist credential stuffing, brute force, session fixation, account enumeration, unsafe recovery, and unverified email access.",
    requiredControls: ["email verification", "generic auth messaging", "secure session cookies", "logout invalidation", "MFA-ready architecture", "rate-limited recovery", "risk-based lockout"],
    blockedBehavior: ["dashboard before verification", "account enumeration", "session ID in URL", "weak recovery", "default credentials", "unlimited login attempts", "password in email"],
  },
  {
    key: "authorization-ownership-core",
    label: "Authorization ownership core",
    area: "authorization",
    requirement: "Every customer object, report, evidence record, billing record, business profile, conversation, and dashboard module must enforce server-side object ownership, property allowlists, and function-level authorization.",
    requiredControls: ["server-side authorization", "customer ownership check", "business boundary check", "role/function permission", "property allowlist", "no mass assignment", "authorization audit"],
    blockedBehavior: ["ID-only access", "client-side-only authorization", "cross-customer read", "cross-business leak", "generic object serialization", "unauthorized property update"],
  },
  {
    key: "api-resource-defense",
    label: "API resource defense",
    area: "api",
    requirement: "APIs must prevent unrestricted resource use, sensitive business-flow abuse, unsafe provider spend, forced browsing, hidden endpoint exposure, and replay-sensitive workflows.",
    requiredControls: ["operation limits", "pagination", "timeouts", "request body limits", "provider spend alerts", "endpoint inventory", "idempotency keys", "safe retry policy"],
    blockedBehavior: ["unbounded list", "unlimited email resend", "unlimited scan creation", "unbounded provider call", "hidden debug endpoint", "missing idempotency"],
  },
  {
    key: "hostile-input-rejection",
    label: "Hostile input rejection",
    area: "input",
    requirement: "All user submissions, dashboard messages, business details, URLs, forms, support messages, and uploaded text must be treated as untrusted and rejected, sanitized, challenged, or quarantined when malicious or outside the expected shape.",
    requiredControls: ["server-side schema validation", "allowlist-first fields", "length limits", "semantic validation", "danger-pattern screening", "quarantine state", "safe customer message", "no raw echo"],
    blockedBehavior: ["trusting client validation", "raw HTML acceptance", "raw prompt execution", "SQL-like query composition", "path traversal", "SSRF fetch", "secret exfiltration request", "malicious text echoed raw"],
  },
  {
    key: "ai-prompt-injection-shield",
    label: "AI prompt injection shield",
    area: "ai",
    requirement: "User-provided business text, URLs, reports, social content, emails, and dashboard conversation are data only and cannot override Cendorq system policy, agent policy, report truth rules, or data boundaries.",
    requiredControls: ["data/instruction separation", "prompt-injection detection", "tool-call allowlist", "no secret/tool disclosure", "evidence-only grounding", "blocked instruction log", "operator review for high-risk content"],
    blockedBehavior: ["user text overrides agent", "tool call from customer text", "revealing prompts", "revealing secrets", "changing report methods", "unapproved customer output"],
  },
  {
    key: "data-secret-vault",
    label: "Data and secret vault",
    area: "data",
    requirement: "Customer data, evidence, reports, billing metadata, secrets, prompts, scoring internals, and internal intelligence must be segmented, protected, redacted in logs, retention-bound, and never sent to public surfaces.",
    requiredControls: ["data classification", "encryption in transit", "secret isolation", "log redaction", "retention class", "delete/correction path", "backup and recovery plan", "private/public boundary"],
    blockedBehavior: ["secret in client", "raw evidence in public", "sensitive logs", "mixed tenant records", "unclassified data", "missing retention", "prompt leakage"],
  },
  {
    key: "billing-email-provider-defense",
    label: "Billing email provider defense",
    area: "billing-email-provider",
    requirement: "Billing, email, and provider flows must be scoped, webhook-verified, replay-resistant, spend-aware, deliverability-authenticated, entitlement-safe, and resilient to abuse.",
    requiredControls: ["webhook signature verification", "idempotent webhook processing", "billing entitlement check", "provider scope review", "SPF", "DKIM", "DMARC", "bounce/complaint handling", "send limits"],
    blockedBehavior: ["unverified webhook", "replayed billing event", "paid access without entitlement", "unauthenticated email", "unlimited transactional email", "overbroad provider scope"],
  },
  {
    key: "detect-contain-lock",
    label: "Detect contain and lock",
    area: "monitoring",
    requirement: "Suspicious activity must be detected, scored, logged, throttled, challenged, blocked, quarantined, or locked out according to risk, with no retaliation or unauthorized counterattack.",
    requiredControls: ["security event taxonomy", "risk score", "rate-limit escalation", "challenge step", "temporary lockout", "quarantine", "operator alert", "incident timeline"],
    blockedBehavior: ["silent repeated failure", "retaliatory hacking", "unlogged lockout", "raw attacker payload in dashboard", "no operator alert", "no appeal/support path"],
  },
  {
    key: "incident-response-recovery-loop",
    label: "Incident response recovery loop",
    area: "incident-response",
    requirement: "Cendorq must govern, identify, protect, detect, respond, and recover with containment, evidence preservation, customer-safe communication, recovery, root-cause review, and validation improvements.",
    requiredControls: ["incident owner", "containment runbook", "evidence preservation", "customer-safe comms", "recovery plan", "root-cause review", "post-incident validator update"],
    blockedBehavior: ["no incident owner", "destroying evidence", "unsafe public disclosure", "manual-only memory", "no recovery path", "same issue can repeat unguarded"],
  },
] as const satisfies readonly CendorqShieldRule[];

export const HOSTILE_INPUT_CONTROLS = [
  { key: "oversized-payload", decision: "block", customerMessage: "The submission is too large to process safely. Please shorten it and try again.", internalAction: "Record a security event, block downstream processing, and preserve safe metadata only." },
  { key: "script-or-markup-injection", decision: "quarantine", customerMessage: "This submission contains content that cannot be accepted in that field. Please remove formatting or code-like content and try again.", internalAction: "Quarantine payload, strip public rendering, and require operator review before downstream use." },
  { key: "query-or-command-manipulation", decision: "block", customerMessage: "This submission could not be accepted. Please use normal business information only.", internalAction: "Block processing, increment risk score, and prevent query, file, path, shell, or system interpretation." },
  { key: "ssrf-or-external-fetch-abuse", decision: "challenge", customerMessage: "The submitted URL needs verification before Cendorq can safely scan it.", internalAction: "Validate URL scheme, host, DNS/IP, private network, redirect, timeout, and fetch allowlist before any fetch." },
  { key: "prompt-injection-or-agent-override", decision: "quarantine", customerMessage: "This content includes instructions that cannot control Cendorq systems. It may be reviewed as business text only.", internalAction: "Treat content as data, block instruction execution, log prompt-injection risk, and route to safe summarization or review." },
  { key: "credential-secret-or-token-exposure", decision: "quarantine", customerMessage: "This submission appears to include sensitive credentials or tokens. Please remove them before continuing.", internalAction: "Quarantine, redact from logs and analytics, and prevent downstream disclosure." },
  { key: "spam-or-automation", decision: "challenge", customerMessage: "Please verify the request before continuing.", internalAction: "Apply rate-limit escalation, bot challenge, duplicate detection, and temporary lockout when repeated." },
  { key: "billing-or-business-flow-abuse", decision: "block", customerMessage: "This action cannot be completed safely. Please contact Cendorq Support if you believe this is an error.", internalAction: "Block action, preserve audit record, verify entitlement, and require operator review if repeated." },
  { key: "compromised-device-or-risky-session", decision: "challenge", customerMessage: "For your protection, please re-confirm your account before continuing.", internalAction: "Require reauthentication, rotate session, revoke suspicious tokens, alert account owner, and lock sensitive actions until trust is restored." },
  { key: "unknown-high-risk", decision: "quarantine", customerMessage: "This submission needs review before Cendorq can process it safely.", internalAction: "Quarantine with minimal metadata, block downstream processing, and require operator review." },
] as const satisfies readonly HostileInputControl[];

export const CENDORQ_SHIELD_RELEASE_GATES = [
  "Every public input has server-side schema validation and length limits.",
  "Every authenticated route has server-side authorization and ownership checks.",
  "Every customer object response uses explicit property allowlists.",
  "Every long or expensive operation has queue, timeout, idempotency, and spend controls.",
  "Every AI use treats customer content as data, never system instructions.",
  "Every risky session can be challenged, rotated, revoked, or locked out.",
  "Every protected surface is denied by default until explicit grants are implemented and validated.",
] as const;

export function getCendorqShieldStandard() {
  return {
    rules: CENDORQ_SHIELD_RULES,
    hostileInputControls: HOSTILE_INPUT_CONTROLS,
    releaseGates: CENDORQ_SHIELD_RELEASE_GATES,
  };
}
