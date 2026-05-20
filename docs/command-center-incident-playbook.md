# Command Center Incident Playbook

Use this playbook when a private Command Center route, readiness route, production smoke check, support routing path, or database migration safety check fails.

## Principle

The public website must stay simple and buyer-facing. The Command Center must stay private and closed by default.

Contact Us remains a public buyer-support path: `/connect` serves Contact Us, `/contact` redirects to `/connect`, and public support uses `support@cendorq.com` unless a real tested send pipeline exists.

## Critical triggers

Treat this as critical when:

- a private Command Center route shows operational details without access
- the readiness route returns details without access
- production smoke reports that a private route is open
- migration validation allows a destructive change without a recovery plan
- `/connect` fails as the public Contact Us route
- `/contact` stops redirecting to `/connect`
- public Contact Us points to the wrong support inbox
- an untested public message box or fake support success state appears

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

## Contact Us routing failure

If public Contact Us support routing fails:

1. Confirm `/connect` is reachable and customer-facing labels say Contact Us.
2. Confirm `/contact` redirects to `/connect`.
3. Confirm public support uses `support@cendorq.com`.
4. Confirm direct email asks customers to email from the address where they want the reply.
5. Confirm no untested public message box, fake success state, or fake support record was added.
6. Confirm Contact Us does not replace Free Scan when the first visibility or readiness signal is unclear.

Do not add a quick public message box to make support look wired before a real tested send pipeline exists.

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
CENDORQ_BASE_URL=https://www.cendorq.com pnpm smoke:production
```

## Recovery rule

Use the smallest safe fix:

1. Revert the bad commit when the cause is clear.
2. Patch the narrow failing surface when a revert is riskier.
3. Keep Command Center routes closed by default.
4. Keep readiness metadata protected.
5. Keep migration safety validation active.
6. Keep Contact Us on `/connect` with direct email to `support@cendorq.com`.
7. Re-run CI and smoke.
