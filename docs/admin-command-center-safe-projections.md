# Admin Command Center Safe Projections

This runbook defines how the private command center uses admin command-center safe projections.

## Operating posture

- The command-center API index and child endpoints are preview-gated.
- All access checks must resolve through the shared safe-access helper.
- All responses must use `no-store` cache posture.
- The endpoints are read-only review surfaces.
- The endpoints show posture, counts, decisions, and references only.
- Action lanes still require their separate approval gates before customer-facing, launch, billing, provider, report, or production-impacting use.

## Source of truth

The canonical endpoint list is `src/lib/admin-command-center-safe-projection-registry.ts`.

The canonical access helper is `src/lib/admin-command-center-safe-access.ts`.

The canonical response helper is `src/lib/admin-command-center-safe-response.ts`.

Do not duplicate the endpoint list in UI or API routes. The private command-center panel and API index must import the registry so route discovery cannot drift.

Do not duplicate preview-gate access checks in individual projection routes. Each admin command-center projection route must use `resolveAdminCommandCenterSafeAccess` and `adminCommandCenterAccessDeniedPayload` so closed-by-default behavior remains consistent.

Do not duplicate response headers in individual projection routes. Each admin command-center projection route must use `adminCommandCenterJsonNoStore` so no-store and noindex behavior remains consistent.

## Endpoint map

| Lane | Endpoint | Purpose |
| --- | --- | --- |
| Index | `/api/admin/command-center` | Lists all safe projection endpoints and boundaries. |
| Summary | `/api/admin/command-center/summary` | Reviews foundation, access, mission, findings, forecast, and audit posture. |
| Audit trail | `/api/admin/command-center/audit` | Reviews safe audit projections. |
| Mission brief | `/api/admin/command-center/mission-brief` | Reviews chief-agent mission brief readiness before dispatch. |
| Agent findings | `/api/admin/command-center/agent-findings` | Reviews structured agent and scout findings posture. |
| Forecast escalation | `/api/admin/command-center/forecast-escalation` | Reviews expansion, hardening, risk coverage, mitigation, and escalation posture. |

## Operator sequence

1. Open the private command-center panel.
2. Confirm the safe projection links render from the shared registry.
3. Review the API index first to confirm the endpoint map.
4. Review the lane-specific endpoint for the current decision.
5. Treat the response as posture only.
6. Use the relevant approval gate before any external, customer-facing, or production-affecting step.

## Validation requirements

Any update to these endpoints must update validation coverage for:

- `src/scripts/validate-admin-command-center-projection-registry.mjs`
- `src/scripts/validate-admin-command-center-safe-response.mjs`
- `src/scripts/validate-admin-command-center-api-index.mjs`
- `src/scripts/validate-command-center-admin-control-panel.mjs`
- `src/scripts/validate-routes-chain.mjs`

The route-chain must include the registry validator and the shared safe-response validator so endpoint discovery and response posture cannot drift silently.

Until a dedicated safe-access validator can be wired without a large route-chain rewrite, the projection route validators must keep verifying the shared access helper through route-level validation anchors.
