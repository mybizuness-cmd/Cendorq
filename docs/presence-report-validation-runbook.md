# Presence Report validation runbook

Run before merge:

```bash
pnpm validate:routes
pnpm validate:presence-report
pnpm lint
pnpm typecheck
pnpm build
```

Deployment check:

- Confirm the latest PR head has a green Vercel status.
- Keep the PR in draft until validation is reviewed.
- Confirm the merge-readiness checklist passes before marking ready.

Presence Report spine:

- Business Truth Profile
- Presence Report
- Repair Queue
- Build Fix
- Control Snapshot

Release boundaries:

- Free Scan stays first-signal only.
- Sample reports stay examples.
- Report copy uses evidence boundaries.
- Release Gate checks approved facts, restricted claims, evidence boundary, and next move clarity.
- Merge readiness checks base-update risk, local validation, Sample Report navigation, public sitemap coverage, and no-guarantee language.

Live demo fixture boundaries:

- `src/lib/sandwork-presence-report-fixture.ts` is the shared demo source for Sandwork Free Scan input, generated snapshot, and public-safe Presence Report package.
- Protected Free Scan preview and Dashboard Presence Command Snapshot must consume the shared Sandwork report package instead of hardcoding sample report objects.
- The Presence Report object index registers the shared Sandwork package as the reusable demo report package for future report surfaces.
- `src/scripts/validate-sandwork-presence-report-fixture.mjs` guards the fixture directly, including live mapper usage, score modules, first-signal language, and forbidden guarantee language.
- `pnpm validate:presence-report` runs the Sandwork fixture validator through the Presence Report validation chain.
