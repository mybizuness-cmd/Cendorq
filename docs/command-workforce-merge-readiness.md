# Command Workforce Merge Readiness

This checklist keeps the operating and visual quality layer ready for review without forcing it into the broader route chain too early.

## Required checks

Before marking this layer ready:

```bash
pnpm validate:command-workforce
pnpm lint
pnpm typecheck
pnpm build
```

## Readiness conditions

- CI is green.
- Release Control is green.
- CodeQL is green.
- Vercel is green.
- PR body names the latest checked head.
- The PR remains draft until the latest head is fully green.

## Operating layer review

- Owner command, release captain, chief lanes, scoped scouts, validators, and handoff memory remain separated.
- Finding shape remains structured enough to become decisions, docs, validators, or scoped PRs.
- Big-batch guidance supports larger coherent work without weakening caution around high-risk runtime or customer-facing truth.

## Visual quality review

- Visual command remains a real quality lane.
- Public, report, dashboard, and mobile surfaces keep one clear next action.
- Premium restraint, hierarchy, scannability, proof sequence, report readability, and dashboard command clarity remain visible in the standard.

## Promotion path

This PR installs the standalone `pnpm validate:command-workforce` package script.

After this PR is merged and stable, promote the command workforce validator into the broader command-center docs index or route-chain release guard in a separate guarded batch.