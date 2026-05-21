# Presence Report validation runbook

Run before merge:

```bash
pnpm validate:routes
node ./src/scripts/validate-presence-report-system.mjs
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
