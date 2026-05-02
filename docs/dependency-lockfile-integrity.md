# Dependency Lockfile Integrity

This document records the package and lockfile integrity posture for the Cendorq platform.

## Protected files

- `package.json`
- `pnpm-lock.yaml`
- `src/scripts/validate-dependency-lockfile-integrity.mjs`
- `src/scripts/validate-routes-chain-integrity.mjs`

## Required posture

- Package manager stays `pnpm@9.15.9`.
- Node engine stays `>=24.0.0`.
- `validate:routes` stays delegated to `node ./src/scripts/validate-routes-chain.mjs`.
- Core package ranges stay intentional in `package.json`.
- Resolved versions stay represented in `pnpm-lock.yaml`.
- The dependency integrity validator remains covered through route-chain integrity.

## Current dependency anchors

- Next resolved version: `16.2.4`
- React resolved version: `19.2.5`
- React DOM resolved version: `19.2.5`
- TypeScript resolved version: `6.0.3`
- ESLint resolved version: `10.2.1`
- TypeScript ESLint parser resolved version: `8.59.1`

## Maintenance rule

When dependency ranges, package manager, Node engine, or the lockfile are intentionally changed, update the dependency integrity validator and this document in the same pull request. Do not let dependency PRs merge with unreviewed package and lockfile drift.
