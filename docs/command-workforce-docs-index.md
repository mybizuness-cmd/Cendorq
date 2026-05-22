# Command Workforce Docs Index

This index keeps the new operating and visual quality layer easy to find without changing the broader Command Center docs index yet.

## Operating layer

- `docs/command-workforce-operating-model.md` — hierarchy, chief lanes, scout lanes, required finding shape, and big-batch rule.
- `docs/command-workforce-release-runbook.md` — finding intake, review lanes, batch sizing, acceptance, and memory requirements.
- `docs/command-workforce-finding-template.md` — structured finding capture for decisions, docs, validators, and scoped PRs.

## Visual quality layer

- `docs/visual-command-quality-standard.md` — safest-next-command review, premium restraint, hierarchy, scannability, proof sequence, dominant action, mobile clarity, report readability, and dashboard command clarity.
- `docs/visual-command-review-template.md` — review checklist for public pages, reports, dashboards, protected surfaces, and mobile flows.

## Typed source of truth

- `src/lib/command-workforce-quality-contracts.ts` — typed operating model and visual command quality standard.

## Validator

- `src/scripts/validate-command-workforce-quality-contracts.mjs` — validates the operating model, visual standard, review templates, release runbook, typed contracts, and this index.
- `pnpm validate:command-workforce` — package shortcut for the command workforce validator.

## Promotion path

After this layer stays green, promote it into the broader command-center docs index or route-chain release guard in a separate guarded batch.