import { getCommandCenterAuthReadiness } from "@/lib/command-center/auth-readiness";
import { getCommandCenterAutomationReadiness } from "@/lib/command-center/automation-readiness";
import { getCommandCenterBillingReadiness } from "@/lib/command-center/billing-readiness";
import { getCommandCenterDatabaseReadiness } from "@/lib/command-center/database-readiness";
import { getCommandCenterDeliveryReadiness } from "@/lib/command-center/delivery-readiness";
import { getCommandCenterFileStorageReadiness } from "@/lib/command-center/file-storage-readiness";
import { getCommandCenterGovernanceReadiness } from "@/lib/command-center/governance-readiness";
import { getCommandCenterIntelligenceReadiness } from "@/lib/command-center/intelligence-readiness";

export function OperatorReadinessMatrix() {
  const database = getCommandCenterDatabaseReadiness();
  const auth = getCommandCenterAuthReadiness();
  const files = getCommandCenterFileStorageReadiness();
  const billing = getCommandCenterBillingReadiness();
  const delivery = getCommandCenterDeliveryReadiness();
  const automation = getCommandCenterAutomationReadiness();
  const governance = getCommandCenterGovernanceReadiness();
  const intelligence = getCommandCenterIntelligenceReadiness();

  const rows = [
    {
      area: "Database",
      status: database.configured,
      config: getConfigLabel(database.requiredServerConfig.length, database.missingServerConfig.length),
      policy: database.serverOnly ? "server-only" : "blocked",
      review: database.migrationPolicy,
      blocked: database.publicExposureAllowed ? "public exposure allowed" : "public exposure blocked",
    },
    {
      area: "Auth",
      status: auth.configured,
      config: getConfigLabel(auth.requiredServerConfig.length, auth.missingServerConfig.length),
      policy: auth.sessionValidation,
      review: auth.rolePolicy,
      blocked: auth.publicBypassAllowed ? "public bypass allowed" : "public bypass blocked",
    },
    {
      area: "Files",
      status: files.configured,
      config: getConfigLabel(files.requiredServerConfig.length, files.missingServerConfig.length),
      policy: files.objectVisibility,
      review: files.downloadPolicy,
      blocked: files.publicListingAllowed ? "public listing allowed" : "public listing blocked",
    },
    {
      area: "Billing",
      status: billing.configured,
      config: getConfigLabel(billing.requiredServerConfig.length, billing.missingServerConfig.length),
      policy: billing.checkoutCreation,
      review: billing.webhookVerification,
      blocked: billing.unverifiedWebhookAllowed ? "unverified webhooks allowed" : "unverified webhooks blocked",
    },
    {
      area: "Delivery",
      status: delivery.configured,
      config: getConfigLabel(delivery.requiredServerConfig.length, delivery.missingServerConfig.length),
      policy: delivery.deliveryAuthorization,
      review: delivery.customerSendPolicy,
      blocked: delivery.unapprovedCustomerDeliveryAllowed ? "unapproved delivery allowed" : "unapproved delivery blocked",
    },
    {
      area: "Automation",
      status: automation.configured,
      config: getConfigLabel(automation.requiredServerConfig.length, automation.missingServerConfig.length),
      policy: automation.executionPolicy,
      review: automation.idempotencyPolicy,
      blocked: automation.unsignedInboundEventAllowed ? "unsigned events allowed" : "unsigned events blocked",
    },
    {
      area: "Governance",
      status: governance.configured,
      config: getConfigLabel(governance.requiredServerConfig.length, governance.missingServerConfig.length),
      policy: governance.privacyRequestPolicy,
      review: governance.retentionPolicy,
      blocked: governance.publicGovernanceRecordAccessAllowed ? "public records allowed" : "public records blocked",
    },
    {
      area: "Intelligence",
      status: intelligence.configured,
      config: getConfigLabel(intelligence.requiredServerConfig.length, intelligence.missingServerConfig.length),
      policy: intelligence.classificationPolicy,
      review: intelligence.memoryPromotionPolicy,
      blocked: intelligence.publicRawIntelligenceAllowed ? "raw public exposure allowed" : "raw public exposure blocked",
    },
  ] as const;

  return (
    <div className="mt-10 rounded-[2rem] border border-sky-200/10 bg-sky-200/[0.03] p-6 md:p-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-200">Operator Matrix</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">Readiness protection matrix</h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-slate-400">
          Metadata only. This matrix summarizes how each private system layer is protected before it can be treated as operationally ready. It shows counts and policy names only, never secret values, customer records, evidence, files, raw intelligence, or billing details.
        </p>
      </div>
      <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60">
        <div className="grid gap-px bg-white/10 text-sm md:grid-cols-[1fr_0.9fr_1.2fr_1.3fr_1.3fr]">
          <HeaderCell>Layer</HeaderCell>
          <HeaderCell>Status</HeaderCell>
          <HeaderCell>Config posture</HeaderCell>
          <HeaderCell>Required policy</HeaderCell>
          <HeaderCell>Blocked path</HeaderCell>
          {rows.map((row) => (
            <Row key={row.area} row={row} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Row({ row }: { row: { area: string; status: boolean; config: string; policy: string; review: string; blocked: string } }) {
  return (
    <>
      <Cell strong>{row.area}</Cell>
      <Cell>{row.status ? "ready" : "pending"}</Cell>
      <Cell>{row.config}</Cell>
      <Cell>
        <span>{row.policy}</span>
        <span className="mt-1 block text-xs text-slate-500">{row.review}</span>
      </Cell>
      <Cell>{row.blocked}</Cell>
    </>
  );
}

function HeaderCell({ children }: { children: React.ReactNode }) {
  return <div className="bg-slate-950 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{children}</div>;
}

function Cell({ children, strong = false }: { children: React.ReactNode; strong?: boolean }) {
  return <div className={`bg-slate-950/95 px-4 py-4 text-slate-400 ${strong ? "font-semibold text-white" : ""}`}>{children}</div>;
}

function getConfigLabel(requiredCount: number, missingCount: number) {
  return `${requiredCount - missingCount}/${requiredCount} configured · ${missingCount} missing`;
}
