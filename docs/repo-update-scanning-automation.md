# Repo Update Scanning Automation

Repo update scanning automation protects dependency and security workflow updates before they can drift away from the approved Cendorq guardrail posture.

## Purpose

The validator `src/scripts/validate-repo-update-scanning-automation.mjs` checks the automated update surface without adding that validator directly to the giant route-chain execution list. Route-chain integrity must centrally verify that this validator exists and covers the expected update automation rules.

## Required coverage

The repo update scanning automation must keep coverage for:

- `.github/dependabot.yml`
- `.github/workflows/codeql.yml`
- `src/scripts/validate-codeql-workflow-integrity.mjs`
- `src/scripts/validate-dependency-lockfile-integrity.mjs`
- `src/scripts/validate-most-pristine-system-standard.mjs`
- `package.json`
- `validate:routes`
- `actions/checkout@v6`
- `github/codeql-action/init@v4`
- `github/codeql-action/autobuild@v4`
- `github/codeql-action/analyze@v4`
- Dependabot update groups including `controlled-update`, `next-react-platform`, `typescript-tooling`, `styling-tooling`, `lint-tooling`, and `github-actions`

## Forbidden drift

The validator must continue blocking automation drift such as:

- Dependabot automerge settings that bypass release-captain review.
- Dependabot ignore blocks or broad allow-all shortcuts that hide update risk.
- CodeQL workflow downgrade to v1, v2, or v3 actions.
- Checkout downgrade below `actions/checkout@v6`.
- Missing CodeQL security query posture.
- Broad write permissions or `continue-on-error: true` for CodeQL analysis.

## Release-captain rule

Automated update scanning is advisory and protective only. It does not approve dependency updates, provider configuration, paid launch, public launch, security readiness, customer-facing reports, or customer-facing claims. Updates still require release-captain review, green validation, Vercel success, mergeability confirmation, and a guarded squash merge with the expected head SHA.

## Documentation rule

When Dependabot grouping, CodeQL action versions, dependency integrity anchors, or route-chain coverage expectations change, update this document and the validator in the same pull request. Do not leave repo update scanning automation as an invisible or undocumented guardrail.
