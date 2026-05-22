# Command Center Command Workforce Bridge

This bridge connects the broader Command Center documentation set to the command workforce operating layer without rewriting the full global docs index in one step.

## Connected layer

The command workforce layer includes:

- `docs/command-workforce-operating-model.md`
- `docs/command-workforce-finding-template.md`
- `docs/command-workforce-quality-scorecard.md`
- `docs/visual-command-quality-standard.md`
- `docs/visual-command-review-template.md`
- `docs/command-workforce-release-runbook.md`
- `docs/command-workforce-docs-index.md`
- `docs/command-workforce-merge-readiness.md`
- `docs/command-workforce-handoff-addendum.md`
- `src/lib/command-workforce-quality-contracts.ts`
- `src/scripts/validate-command-workforce-quality-contracts.mjs`
- `pnpm validate:command-workforce`

## Command Center relationship

The broader Command Center index remains the private cockpit documentation map. This bridge makes the command workforce layer discoverable while avoiding a high-risk full rewrite of the large global index.

## Required posture

- Command workforce validation remains in Release Control.
- Visual command remains a real quality lane.
- Findings remain structured enough to become decisions, docs, validators, or scoped PRs.
- Bigger batches remain limited to coherent layers that can be validated together.
- Smaller batches remain required for live access, payment configuration, provider runtime, protected customer data, or high-risk customer-facing truth.

## Promotion path

A future guarded batch may fold these bridge anchors directly into `docs/command-center-docs-index.md` and `src/scripts/validate-command-center-docs-index.mjs` after the full-file rewrite risk is reduced.
