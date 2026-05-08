# Command Design Hardening Release Note

This note records the command design hardening pass that aligned Cendorq around:

- Apple-level trust and authority
- Google-level simplicity
- ChatGPT-level immediate action

## What changed

Cendorq now has a documented and validated command design operating standard. The standard applies to public pages, protected customer surfaces, internal operator routes, report shells, SEO/share surfaces, fallback states, and validation guardrails.

## Buyer-path impact

The buyer path remains intentionally simple:

1. Free Scan
2. Plans
3. Deep Review
4. Build Fix
5. Ongoing Control
6. Connect

Loading, error, and not-found surfaces now recover into homepage, Free Scan, and Plans instead of legacy paths.

## Production-safety impact

The command design standard is now protected by validation and documentation coverage:

- `docs/command-design-operating-standard.md`
- `docs/command-design-release-checklist.md`
- `.github/PULL_REQUEST_TEMPLATE/command-design.md`
- `src/scripts/validate-command-design-operating-standard.mjs`
- `src/scripts/validate-public-drift.mjs`
- `src/scripts/validate-command-center-docs-index.mjs`

## Fixed drift

This pass removed or guarded against legacy fallback drift involving:

- `/pricing`
- `/diagnosis`
- `Pricing` as active fallback language
- `Search Presence Scan` as active recovery language

## Validation

Relevant changes were merged only after CI and CodeQL passed. `pnpm validate:routes` now covers command design and public drift enforcement through the normal route-validation chain.
