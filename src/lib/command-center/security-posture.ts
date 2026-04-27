export type CommandCenterSecurityPosture = {
  postureLabel: "maximum-practical-defense-in-depth";
  absoluteGuaranteeClaimAllowed: false;
  defaultAccess: "deny";
  privateDataAccess: "server-side-only";
  secretsPolicy: "server-env-only-never-client";
  databasePolicy: "private-server-only-no-public-browser";
  aiActionPolicy: "review-gated-no-autonomous-customer-output";
  publicSurfacePolicy: "buyer-facing-only-no-private-intelligence";
  validationPolicy: "no-downgrade-to-pass";
  auditPolicy: "sensitive-actions-recorded-without-secrets";
  requiredControls: readonly string[];
  forbiddenClaims: readonly string[];
};

export const COMMAND_CENTER_SECURITY_POSTURE: CommandCenterSecurityPosture = {
  postureLabel: "maximum-practical-defense-in-depth",
  absoluteGuaranteeClaimAllowed: false,
  defaultAccess: "deny",
  privateDataAccess: "server-side-only",
  secretsPolicy: "server-env-only-never-client",
  databasePolicy: "private-server-only-no-public-browser",
  aiActionPolicy: "review-gated-no-autonomous-customer-output",
  publicSurfacePolicy: "buyer-facing-only-no-private-intelligence",
  validationPolicy: "no-downgrade-to-pass",
  auditPolicy: "sensitive-actions-recorded-without-secrets",
  requiredControls: [
    "closed-by-default private routes",
    "server-side access checks",
    "least-privilege roles",
    "server-only secrets",
    "no private data in client bundles",
    "no public database access",
    "no public report index",
    "no public evidence index",
    "no private intelligence in public output",
    "signed or authenticated report access",
    "audit trails for sensitive actions",
    "migration safety validation",
    "production smoke validation",
    "AI output review before customer delivery",
    "prompt-injection resistant source handling",
    "provider keys scoped and rotatable",
    "incident and rollback path",
  ],
  forbiddenClaims: [
    "unhackable",
    "cannot be hacked ever",
    "perfect security",
    "zero risk",
    "guaranteed breach-proof",
  ],
};

export function getCommandCenterSecurityPosture() {
  return COMMAND_CENTER_SECURITY_POSTURE;
}
