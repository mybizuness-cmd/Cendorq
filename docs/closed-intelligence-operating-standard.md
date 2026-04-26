# Cendorq Closed Intelligence Operating Standard

This is the default operating standard for every future Cendorq product, backend, report, AI-agent, GitHub, data, and business-model change.

Cendorq is public where it must convert and private where it must protect intelligence.

## Core rule

The public surface sells the outcome.
The private system holds the engine.

Public surfaces may explain what Cendorq does at a high level:

- make a business easier to discover
- make a business easier to understand
- make a business easier to trust
- make a business easier to recommend
- make a business easier to choose
- help the business avoid spending more in the wrong place

Private systems must protect the operating intelligence:

- scoring logic
- scoring weights
- report schemas
- AI-agent prompts
- pressure-test matrices
- evidence weighting
- buyer simulations
- vertical playbooks
- client reports
- client evidence
- outcome memory
- competitor intelligence
- implementation playbooks
- GitHub automation logic
- database records
- internal operating notes

## Database rule

The database must be closed by default.

No user, competitor, crawler, partner, public page, browser, or unauthenticated process should be able to query or browse the database directly.

All database access must go through controlled application services, internal tools, or approved automation paths.

Required database posture:

- no public database browser
- no direct client-side database credentials
- no anonymous read access to private business records
- no public report index
- no public client evidence index
- no secrets in public code
- no sensitive data in logs
- least-privilege service roles
- separate read/write privileges where possible
- private server-side environment variables only
- signed report access where reports are exposed
- audit trail for internal report and intake access
- encrypted transport for all production access
- encryption at rest when supported by the provider
- retention and deletion policy for sensitive data
- redaction rules for case studies and examples

## Public/private boundary

### Public may include

- the buyer path
- the Free Scan entry point
- plain explanation of the category
- high-level doctrine
- trust boundaries
- no-guarantee language
- anonymized examples
- redacted proof
- broad categories of what Cendorq checks
- public policy, security, and contact surfaces

### Public must not include

- exact scoring formulas
- exact weighting logic
- private AI prompts
- private agent chains
- raw competitor datasets
- client reports without access control
- private report URLs in indexes
- internal evidence snapshots
- unredacted screenshots
- private business data
- customer-sensitive notes
- private implementation playbooks
- proprietary benchmark logic
- direct database endpoints

## AI-agent rule

AI agents are a private workforce, not an uncontrolled public feature.

Every AI-agent workflow must be evidence-gated.

An AI agent may not create a serious finding without:

- evidence
- source or captured context
- confidence level
- business impact
- recommended fix
- route to review when confidence is low

AI agents must not make unsupported guarantees about rankings, leads, revenue, or perfect AI/search outcomes.

AI agents must separate:

- facts
- interpretation
- assumptions
- recommendations
- uncertain findings

## Report rule

Reports are protected business intelligence.

Reports should be accessible only through controlled routes, signed links, authenticated consoles, or approved delivery workflows.

Every report should follow the evidence standard:

- finding
- evidence
- source
- severity
- confidence
- business impact
- recommended fix
- next path

Report previews may be public only if they are anonymized, redacted, and stripped of private scoring details.

## Evidence rule

Cendorq must become evidence-backed, not just AI-written.

Evidence may include:

- source URLs
- screenshots
- search queries
- AI prompt outputs
- cited pages
- review excerpts
- competitor excerpts
- schema findings
- metadata findings
- crawlability findings
- route and discovery file findings

Evidence must be stored with access controls and should not be exposed publicly unless intentionally redacted.

## Competitive-defense rule

Competitors may be allowed to understand the public category, but not the private machine.

Public doctrine can be copied. Private operating intelligence must not be exposed.

Protect:

- Presence Graph structure beyond high-level description
- scoring details
- vertical packs
- prompt sets
- source weighting
- report generation logic
- outcome memory
- client evidence
- implementation recipes
- operational dashboards
- private benchmark data

## Operating loop

Every serious Cendorq workflow should support this loop:

1. Capture
2. Diagnose
3. Gather evidence
4. Score
5. Report
6. Recommend
7. Fix
8. Verify
9. Monitor
10. Improve

If a feature does not strengthen this loop, it should be delayed or removed.

## Pressure-test standard

Before major product, backend, frontend, AI-agent, report, or data changes, run independent pressure tests against these failure modes:

- category confusion
- competitor copying
- unsupported claims
- weak evidence
- weak conversion
- weak trust
- AI hallucination
- direct database exposure
- report leakage
- secret leakage
- public/private boundary failure
- weak storage durability
- weak access control
- weak auditability
- weak vertical fit
- weak buyer clarity
- weak implementation path
- weak ongoing-control value
- platform dependency
- crawler/search shifts
- competitor feature shifts
- economic downturn
- over-complexity
- under-powered product
- old label regression
- route/discovery regression

After each pressure test, improve the plan before implementation.

## Three-pass independent review norm

For major strategy changes, run three independent passes:

1. Market and competitor pass: can stronger competitors copy, outrun, or outspend this?
2. Product and conversion pass: does this make the buyer more likely to understand, trust, and act?
3. Security and data-defense pass: does this protect intelligence, client data, reports, and execution logic?

## Five-pass elevation norm

After the three independent passes, run five elevation passes:

1. Simplify the public promise.
2. Strengthen the private engine.
3. Increase evidence requirements.
4. Reduce operational risk.
5. Improve conversion, trust, and ongoing-control value.

Only then should implementation begin.

## GitHub execution rule

GitHub work must preserve control.

Default rules:

- prefer grouped, coherent changes over noisy one-file churn
- never reintroduce legacy public route files
- never revive old public labels in active public surfaces
- never commit secrets
- never expose private data
- never weaken route validation
- never bypass validation intentionally
- update release history for meaningful changes
- use validation gates before merge when pull-request flow is available
- verify production-sensitive work after deployment

Required checks remain:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

Production-sensitive changes should also use:

```bash
CENDORQ_BASE_URL=https://cendorq.com pnpm smoke:production
```

## Data architecture direction

The long-term data architecture should use a private database behind server-side services.

Preferred direction:

- storage adapter abstraction
- local/file adapter only for development or temporary fallback
- production database adapter for durable storage
- server-only database credentials
- signed report tokens
- role-based internal access
- audit events
- evidence table
- report table
- findings table
- agent runs table
- client/business table
- outcome memory table

## Final norm

Every step must ask:

1. Does this make Cendorq easier to understand publicly?
2. Does this strengthen the private intelligence engine?
3. Does this protect data and proprietary logic?
4. Does this make reports more evidence-backed?
5. Does this make the buyer more likely to act?
6. Does this make the business easier to discover, understand, trust, recommend, and choose?
7. Does this strengthen Ongoing Control?
8. Does this make Cendorq harder to copy?

If the answer is no, the step must be improved, delayed, or removed.
