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
