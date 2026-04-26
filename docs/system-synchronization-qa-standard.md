# Cendorq System Synchronization QA Standard

This standard keeps the project synchronized as it grows.

Cendorq should not rely on scattered notes, stale assumptions, or one-time hardening. Standards, validation, release gates, PR gates, documentation, backend architecture, AI-agent workflows, reports, and public buyer surfaces must stay coordinated.

## Core rule

If one part of the system changes, every affected operating layer must be checked and synchronized.

No standard should exist without a path to enforcement.
No validator should enforce rules that the operating docs do not explain.
No public change should bypass the public/private boundary.
No private-engine change should bypass data quality, protection, and learning-memory rules.

## Synchronization layers

Cendorq synchronization covers:

- README
- SECURITY
- CHANGELOG
- release checklist
- PR template
- route validation
- intelligence validation
- core standards docs
- production guide
- public buyer path
- backend architecture
- database access posture
- report access posture
- AI-agent workflows
- data-quality and learning-memory rules
- pure-signal and adaptive-evolution rules
- maximum-protection rules
- foundation hardening and elevation rules

## Required sync rule

When a new standard is added, update or verify:

1. README references it when it affects project operation.
2. SECURITY references it when it affects protection, data, reports, secrets, access, or privacy.
3. Release checklist references it when it affects release decisions.
4. PR template references it when future changes must consider it.
5. CHANGELOG records it as meaningful governance.
6. Validation enforces it when the standard is foundational.
7. Future architecture follows it.

## Sync failure patterns

Treat these as defects:

- standard exists but validation does not know it exists
- validation requires text that docs do not explain
- PR template lacks a gate for a foundational standard
- README omits a foundational standard
- SECURITY omits a protection-critical standard
- CHANGELOG omits a meaningful governance change
- release checklist omits a release-impacting standard
- public copy leaks private-engine mechanics
- private data flow bypasses closed-intelligence rules
- AI-agent workflow bypasses evidence or data-quality rules
- backend architecture bypasses closed database posture

## Clean replacement rule

Do not stack patches when the structure is wrong.

If standards, validation, or operating docs drift into repetitive or brittle form, replace them cleanly with a simpler synchronized structure.

A clean replacement should:

- preserve all stronger protections
- remove conflicting language
- reduce duplicate instructions
- improve validation clarity
- keep the buyer path stable
- keep private intelligence protected
- update changelog and operating docs

## Recurring sync checks

Run a synchronization check after:

- adding a standard
- editing validation
- editing README
- editing SECURITY
- editing release checklist
- editing PR template
- editing CHANGELOG
- changing routes
- changing backend/data architecture
- changing AI-agent workflows
- changing reports or evidence
- changing public/private boundaries

## Sync QA questions

Every synchronization pass should ask:

1. Are all foundational standards present?
2. Does validation enforce the standards that must not drift?
3. Do README and SECURITY point to the right standards?
4. Does the release checklist tell operators when to use each standard?
5. Does the PR template force future changes to acknowledge each standard?
6. Does CHANGELOG record meaningful governance changes?
7. Are public routes still clear and current?
8. Are private reports, evidence, scoring, prompts, and memory still protected?
9. Are data quality and learning boundaries still intact?
10. Are hardening and elevation both preserved?

## Validation sync direction

Validation should stay readable and maintainable.

As more standards are added, prefer a coordinated validation structure over scattered one-off checks.

Validation should check:

- required standard files exist
- each standard contains its core rules
- README references foundation standards
- SECURITY references protection standards
- release checklist references operating standards
- PR template contains decision gates
- CHANGELOG records meaningful governance

## No-downtime sync rule

Synchronization work should not break the public buyer path.

If a docs or validation update fails, keep the public site and intake path stable while fixing the governance layer.

## Final rule

Cendorq should remain synchronized from the inside out.

The system is only pristine when the public surface, private engine, standards, validation, release process, PR gates, documentation, and future architecture all tell the same truth.
