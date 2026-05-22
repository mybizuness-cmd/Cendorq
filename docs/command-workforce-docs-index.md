# Command Workforce Docs Index

This index keeps the new operating and visual quality layer easy to find without changing the broader Command Center docs index yet.

## Operating layer

- `docs/command-workforce-operating-model.md` — hierarchy, chief lanes, scout lanes, required finding shape, and big-batch rule.
- `docs/command-workforce-release-runbook.md` — finding intake, review lanes, batch sizing, acceptance, and memory requirements.

## Visual quality layer

- `docs/visual-command-quality-standard.md` — safest-next-command review, premium restraint, hierarchy, scannability, proof sequence, dominant action, mobile clarity, report readability, and dashboard command clarity.

## Typed source of truth

- `src/lib/command-workforce-quality-contracts.ts` — typed operating model and visual command quality standard.

## Validator

- `src/scripts/validate-command-workforce-quality-contracts.mjs` — validates the operating model, visual standard, release runbook, typed contracts, and this index.

## Promotion path

After this layer stays green, promote it into the broader command-center docs index and package scripts in a separate guarded batch.
