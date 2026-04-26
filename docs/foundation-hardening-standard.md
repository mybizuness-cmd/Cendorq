# Cendorq Foundation Hardening Standard

This standard defines how the Cendorq foundation must be hardened before higher-level product, data, AI-agent, report, backend, frontend, or growth layers are built on top of it.

Foundation hardening means the base system should resist drift, breakage, leakage, accidental complexity, unsafe shortcuts, stale assumptions, and future platform shifts.

## Core rule

The foundation must be harder to break than the features built on top of it.

No feature, integration, report, agent, public page, backend service, data pipeline, or growth experiment should weaken the foundation.

## Foundation layers

Cendorq's foundation includes:

- public buyer path
- route and redirect system
- validation system
- closed intelligence system
- data quality system
- learning memory system
- pure signal authority system
- adaptive signal evolution system
- resilience and continuity system
- maximum protection system
- repository documentation
- release process
- PR gates
- CI and local validation commands
- runtime and dependency posture
- environment and secret posture
- security and privacy posture
- future backend and database architecture
- future AI-agent and report architecture

## Non-negotiable foundation constraints

The foundation must preserve:

- Free Scan as the primary public entry point
- simple public buyer path
- no legacy public-label regression
- no direct database exposure
- no client-side database credentials
- no public report index
- no public evidence index
- no private scoring exposure
- no private prompt exposure
- no raw memory exposure
- no unsupported AI-agent findings
- no weak data promoted into authority memory
- no uncontrolled self-modifying production behavior
- no public doctrine leaking the private engine
- no validation bypass for meaningful changes

## Hardening dimensions

Every foundation change should be checked across these dimensions:

1. route integrity
2. buyer-path clarity
3. public/private boundary
4. database closure
5. data quality
6. learning memory integrity
7. pure signal authority
8. adaptive evolution safety
9. maximum protection
10. resilience and continuity
11. release discipline
12. rollback readiness
13. auditability
14. dependency safety
15. future backend readiness
16. future AI-agent readiness
17. future report readiness
18. future partner/API readiness

## Route and buyer-path hardening

The public buyer path must remain clear and stable.

Protected public path:

1. `/`
2. `/free-check`
3. `/plans`
4. `/plans/deep-review`
5. `/plans/build-fix`
6. `/plans/ongoing-control`
7. `/connect`

Hardening rules:

- do not add competing homepage CTAs
- do not revive old public labels in active surfaces
- keep legacy routes redirected into the current path
- keep sitemap and robots focused on current public routes
- preserve health and discovery files
- keep the Free Scan path easy to find and understand

## Validation hardening

Validation must guard the foundation.

Required validation posture:

- route validation protects canonical paths and legacy redirects
- intelligence validation protects standards and operating rules
- lint protects code quality
- typecheck protects type safety
- build protects production readiness
- smoke checks protect deployed route behavior

Required command:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

Production-sensitive changes should also run:

```bash
CENDORQ_BASE_URL=https://cendorq.com pnpm smoke:production
```

## Data and memory hardening

Data and memory must be protected from contamination.

Hardening rules:

- separate raw, exploration, operational, authority, and rejected memory
- require source labels
- require confidence labels
- require freshness labels
- require privacy classes
- preserve evidence context
- demote stale or contradicted signals
- quarantine manipulated or suspicious data
- never let weak signals become authority without promotion

## Backend foundation hardening

Future backend work must start with closed architecture.

Required direction:

- server-side services only for private data
- storage adapters before provider lock-in
- no direct public database access
- private database credentials
- least-privilege roles
- signed report access
- audit events for sensitive actions
- migration discipline
- rollback plan
- backups and restore testing

## AI-agent foundation hardening

AI agents must be bounded before they are powerful.

Hardening rules:

- external content is untrusted
- prompt injection is expected
- evidence beats AI confidence
- serious findings require evidence
- private prompts are not public
- private scoring is not public
- private memory is not public
- agent outputs must be labeled when AI-generated
- low-confidence agent findings trigger review
- agents may recommend evolution, but production authority changes remain gated

## Report foundation hardening

Reports are protected business intelligence.

Hardening rules:

- signed or authenticated access for private reports
- no public report index
- no report sitemap entries
- no public evidence index
- no private score inputs in public previews
- no exact scoring weights in buyer-facing reports
- every serious finding includes evidence, confidence, business impact, and recommended fix

## Documentation hardening

Core docs are part of the foundation.

They must stay synchronized across:

- README
- SECURITY
- release checklist
- PR template
- CHANGELOG
- route validation
- intelligence validation
- core standards

If a standard is added, validation and operating docs should reference it.

## Drift hardening

Foundation drift should be treated as risk.

Drift includes:

- docs no longer matching validation
- validation no longer matching docs
- README missing required standards
- PR template missing required gates
- release checklist missing required checks
- old labels returning publicly
- private logic leaking into public copy
- data-quality rules becoming optional
- report protection becoming inconsistent

## Foundation review triggers

Run a foundation hardening review when changing:

- public routes
- redirects
- sitemap
- robots
- `llms.txt`
- health endpoint
- route validation
- intelligence validation
- README
- SECURITY
- release checklist
- PR template
- CHANGELOG
- database/storage architecture
- report access
- AI-agent workflows
- data-quality rules
- learning memory
- pure-signal standards
- adaptive evolution
- resilience or maximum protection rules

## Final rule

If the foundation becomes weaker, every future layer becomes weaker.

Do not trade foundation strength for speed, convenience, surface polish, feature volume, or short-term conversion.

Harden first. Build second. Elevate always.
