# Command Workforce Handoff Addendum

This addendum tells the next worker how to use the command workforce and visual quality layer.

## Current layer

The command workforce layer is made of:

- `docs/command-workforce-operating-model.md`
- `docs/visual-command-quality-standard.md`
- `docs/command-workforce-release-runbook.md`
- `docs/command-workforce-docs-index.md`
- `docs/command-workforce-merge-readiness.md`
- `src/lib/command-workforce-quality-contracts.ts`
- `src/scripts/validate-command-workforce-quality-contracts.mjs`

## Operating posture

Use this layer when planning future work, reviewing visual quality, shaping findings, or deciding whether a batch should be larger or smaller.

## Visual posture

Every important public, report, dashboard, or mobile surface should make the safest next command obvious. Visual quality should improve trust, hierarchy, scannability, proof sequence, report readability, and dashboard command clarity.

## Finding posture

Findings should be structured enough to become a decision, doc update, validator, or scoped PR. Avoid vague notes that cannot be acted on.

## Batch posture

Use bigger batches when the work forms one coherent operating layer and can be validated together. Use smaller batches when the work touches high-risk runtime or customer-facing truth.

## Next promotion

After this PR is merged and stable, promote the command workforce validator into package scripts and the broader command-center docs index in a separate guarded batch.
