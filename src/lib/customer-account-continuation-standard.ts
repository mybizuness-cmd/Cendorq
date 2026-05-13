export type CustomerAccountOrigin = "free-scan" | "checkout" | "provider" | "email";

export type CustomerAccountContinuation = {
  workspaceEmail: string;
  accountCreationIntent: "create-or-return-workspace";
  primaryDestination: "/dashboard" | "/dashboard/reports/free-scan";
  customerMessage: string;
  operatorMessage: string;
  auditTags: readonly string[];
};

export function resolveCustomerAccountContinuation(input: {
  email: string;
  origin: CustomerAccountOrigin;
  businessName?: string;
  intakeId?: string;
  checkoutSessionId?: string;
  preferredDestination?: string;
}): CustomerAccountContinuation {
  const workspaceEmail = normalizeEmail(input.email);
  const originLabel = humanize(input.origin);
  const primaryDestination = input.preferredDestination === "/dashboard/reports/free-scan" ? "/dashboard/reports/free-scan" : "/dashboard";
  const businessLabel = clean(input.businessName) || "this business";

  return {
    workspaceEmail,
    accountCreationIntent: "create-or-return-workspace",
    primaryDestination,
    customerMessage: workspaceEmail
      ? `Cendorq will use ${workspaceEmail} to create or return your workspace for ${businessLabel}. Confirm once from your inbox, then continue.`
      : "Cendorq will use the email from this step to create or return your workspace. Confirm once from your inbox, then continue.",
    operatorMessage: `Create or return a customer workspace from the ${originLabel} email. Do not ask for a second email unless the customer changes it or support detects a mismatch.`,
    auditTags: [
      `account-origin:${input.origin}`,
      `workspace-email:${workspaceEmail ? "present" : "missing"}`,
      input.intakeId ? `intake:${input.intakeId}` : "intake:none",
      input.checkoutSessionId ? `checkout-session:${input.checkoutSessionId}` : "checkout-session:none",
      `destination:${primaryDestination}`,
    ],
  };
}

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

function clean(value: string | undefined) {
  return (value || "").trim().replace(/\s+/g, " ");
}

function humanize(value: string) {
  return value.replaceAll("-", " ");
}
