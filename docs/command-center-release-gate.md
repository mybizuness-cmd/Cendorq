# Command Center Release Gate

Use this gate before merging or deploying changes that touch the private Command Center, readiness endpoint, migration safety, private modules, support routing, or internal operating layer.

## Principle

The Command Center is private infrastructure. It should grow only through protected, validated, closed-by-default layers.

Public Contact Us support routing remains outside the private Command Center: `/connect` serves Contact Us, `/contact` redirects to `/connect`, and public support uses `support@cendorq.com` unless a real tested send pipeline exists.

## Required checks before merge

Confirm:

- Command Center routes stay closed by default.
- Command Center module routes use the centralized access helper.
- The readiness route stays protected.
- Readiness output stays metadata-only.
- No live customer records are read by shell pages.
- No provider values are returned by readiness helpers.
- No private report, file, payment, automation, evidence, or intelligence details appear on public surfaces.
- Metadata remains noindex and nofollow for private routes.
- Migration files remain sequential and additive by default.
- Migration safety validation remains active.
- Production smoke coverage still includes closed Command Center route checks.
- Production smoke coverage still includes protected readiness route checks.
- Public Contact Us support routing stays direct-email based unless a real tested send pipeline exists.
- The Command Center incident playbook remains current.

## Required validation

Run or confirm CI passed:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

## Post-deploy checks

After deployment, run:

```bash
CENDORQ_BASE_URL=https://www.cendorq.com pnpm smoke:production
```

Confirm:

- `/command-center` shows only the closed page without access.
- `/command-center/intake` shows only the closed page without access.
- `/api/command-center/readiness` returns the protected unauthorized response without access.
- Public buyer routes still work.
- `/connect` still serves Contact Us.
- `/contact` still redirects to `/connect`.
- `support@cendorq.com` remains the public support email.
- Legacy redirects still return strict redirect status and Location headers.
- Free Scan API protected read behavior remains closed by default.

## Do not merge if

Do not merge if:

- a private route becomes public by accident.
- readiness output exposes live operational details without access.
- a migration contains destructive data, table, or column operations without a recovery plan.
- validation is weakened to make a failing change pass.
- production smoke coverage loses private route or readiness checks.
- public Contact Us support routing is replaced by an untested message box or fake success state.
- retired public buyer language returns to active surfaces.

## Related docs

- `docs/command-center-incident-playbook.md`
- `docs/command-center-migration-operating-standard.md`
- `docs/internal-command-center-standard.md`
- `docs/maximum-protection-standard.md`
- `docs/closed-intelligence-operating-standard.md`
- `docs/release-checklist.md`
- `docs/command-center-delivery-readiness.md`
