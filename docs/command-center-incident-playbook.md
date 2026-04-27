# Command Center Incident Playbook

Use this playbook when a private Command Center route, readiness route, production smoke check, or database migration safety check fails.

## Principle

The public website must stay simple and buyer-facing. The Command Center must stay private and closed by default.

## Critical triggers

Treat this as critical when:

- a private Command Center route shows operational details without access
- the readiness route returns details without access
- production smoke reports that a private route is open
- migration validation allows a destructive change without a recovery plan

## Private route failure

If a Command Center route fails smoke:

1. Confirm the route uses the centralized Command Center access helper.
2. Confirm the closed page only shows safe closure copy.
3. Confirm private module details are only shown after access is allowed.
4. Confirm the route remains noindex and nofollow.
5. Confirm validation still protects the route.

Do not open the route just to make smoke pass.

## Readiness route failure

If the readiness route fails protection smoke:

1. Confirm the route uses the centralized access helper.
2. Confirm unauthenticated reads return `401`.
3. Confirm the response uses no-store headers.
4. Confirm the response never returns live records.
5. Confirm the response never returns provider values.

Do not weaken the authorization boundary.

## Migration safety failure

If migration validation fails:

1. Read the exact failure.
2. Confirm files remain sequential.
3. Confirm migration names stay ordered and snake_case.
4. Confirm new migrations are additive by default.
5. Confirm any destructive change has a backup and recovery plan before production.

Do not disable the validator.

## Required validation

Before closing the incident, run:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

Then run production smoke:

```bash
CENDORQ_BASE_URL=https://cendorq.com pnpm smoke:production
```

## Recovery rule

Use the smallest safe fix:

1. Revert the bad commit when the cause is clear.
2. Patch the narrow failing surface when a revert is riskier.
3. Keep Command Center routes closed by default.
4. Keep readiness metadata protected.
5. Keep migration safety validation active.
6. Re-run CI and smoke.
