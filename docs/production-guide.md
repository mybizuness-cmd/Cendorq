# Cendorq Production Guide

Cendorq is built around one protected buyer path:

1. Free Scan
2. Plans
3. Deep Review
4. Build Fix
5. Ongoing Control
6. Connect

The homepage should stay focused on getting the right customer into the Free Scan. Do not turn the homepage back into a dashboard, route console, pricing comparison, or multi-offer page.

For release-specific steps, use [`docs/release-checklist.md`](release-checklist.md).
For production failures, use [`docs/incident-response.md`](incident-response.md).

## Operating standards

Before changing production behavior, use the standard that matches the change:

- [`docs/closed-intelligence-operating-standard.md`](closed-intelligence-operating-standard.md)
- [`docs/data-quality-governance-standard.md`](data-quality-governance-standard.md)
- [`docs/learning-memory-standard.md`](learning-memory-standard.md)
- [`docs/pure-signal-authority-standard.md`](pure-signal-authority-standard.md)
- [`docs/adaptive-signal-evolution-standard.md`](adaptive-signal-evolution-standard.md)
- [`docs/resilience-continuity-standard.md`](resilience-continuity-standard.md)
- [`docs/maximum-protection-standard.md`](maximum-protection-standard.md)
- [`docs/foundation-hardening-standard.md`](foundation-hardening-standard.md)
- [`docs/foundation-elevation-standard.md`](foundation-elevation-standard.md)
- [`docs/system-synchronization-qa-standard.md`](system-synchronization-qa-standard.md)
- [`docs/internal-command-center-standard.md`](internal-command-center-standard.md)
- [`docs/score-threshold-operating-standard.md`](score-threshold-operating-standard.md)

Core operating rule:

> The public surface sells the outcome. The private system holds the engine.

## Before merging

Run the same checks GitHub CI runs:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

These checks protect:

- canonical buyer routes
- legacy public-route redirects
- production hardening headers
- plain-language buyer labels
- sitemap and robots canonical route focus
- manifest shortcuts
- llms.txt context
- security.txt
- health endpoint
- production smoke script
- manual and scheduled smoke workflow
- release checklist
- incident response runbook
- closed intelligence
- data quality
- learning memory
- pure signal authority
- adaptive signal evolution
- resilience and continuity
- maximum protection
- foundation hardening
- foundation elevation
- system synchronization QA
- internal command center boundaries
- score threshold discipline

## After deployment

Run the production smoke check against the deployed URL:

```bash
CENDORQ_BASE_URL=https://cendorq.com pnpm smoke:production
```

or:

```bash
pnpm smoke:production https://cendorq.com
```

You can also run the manual GitHub Actions workflow:

- Actions
- Production Smoke Check
- Run workflow
- Enter deployed URL

The production smoke workflow also runs automatically every day against `https://cendorq.com`.

If smoke checks fail or production weakens, follow the incident response runbook before making broad changes.

## Critical public routes

These routes must stay healthy:

- `/`
- `/free-check`
- `/plans`
- `/plans/deep-review`
- `/plans/build-fix`
- `/plans/ongoing-control`
- `/connect`

Policy and trust routes may remain public when current:

- `/privacy`
- `/terms`
- `/disclaimer`

## Legacy public routes

Legacy routes should redirect only into the current buyer path:

- `/pricing` -> `/plans`
- `/pricing/full-diagnosis` -> `/plans/deep-review`
- `/pricing/optimization` -> `/plans/build-fix`
- `/pricing/monthly-partner` -> `/plans/ongoing-control`
- `/contact` -> `/connect`
- `/how-it-works` -> `/plans`
- `/diagnosis` -> `/plans/deep-review`
- `/profile` -> `/plans`
- `/faq` -> `/plans`
- `/freecheck` -> `/free-check`
- `/full-diagnosis` -> `/plans/deep-review`
- `/optimization` -> `/plans/build-fix`
- `/monthly-partner` -> `/plans/ongoing-control`

Do not list redirected legacy routes in sitemap entries, robots allowlists, navigation, footer links, metadata, manifest shortcuts, or active CTA destinations.

## Discovery and trust files

These files are intentional and should stay present:

- `/robots.txt`
- `/sitemap.xml`
- `/llms.txt`
- `/.well-known/security.txt`
- `/manifest.webmanifest`

They support crawler clarity, browser metadata, AI-readable context, and public trust hygiene.

Discovery should open the right public pages to search and AI discovery while keeping private surfaces closed:

- no public report index
- no public evidence index
- no internal command center indexing
- no API indexing except safe health behavior
- no private scoring, prompts, score thresholds, or authority memory in public discovery files

## Health endpoint

`/api/health` is the production health endpoint.

It should stay:

- dynamic
- no-store
- noindex
- lightweight
- safe to expose publicly

Expected shape:

```json
{
  "ok": true,
  "service": "cendorq-platform",
  "status": "healthy",
  "environment": "...",
  "commit": "...",
  "timestamp": "..."
}
```

## Language rules

Use plain buyer language:

- Free Scan
- Plans
- Deep Review
- Build Fix
- Ongoing Control
- Connect
- make the business easier to understand
- make the business easier to trust
- make the business easier to choose
- stop guessing before spending more

Avoid reviving old public labels:

- Visibility Blueprint
- Presence Infrastructure
- Presence Command
- Start Search Presence Scan

## Homepage rule

The homepage has one job:

Get the right customer to start the Free Scan.

Keep it short, strong, premium, and conversion-focused. Every homepage block should either improve trust, clarity, desire, or action. If it does not, remove it or reduce it.

## Internal command center rule

The internal command center is private by default.

It may manage:

- Free Scan review
- Deep Review automation
- Build Fix control
- Ongoing Control cycles
- report center
- automation command deck
- data-quality and learning board
- score threshold routing
- smart insights

It must not expose private reports, evidence, score inputs, authority memory, prompts, customer history, internal notes, or automation controls publicly.

## Score threshold rule

Use scores internally to drive routing, alerts, automation, and review posture.

Public pages should translate scores into simple action language instead of cluttering the customer experience with raw numbers.

Protected internal bands:

- 65-69 watch-grade
- 70-79 operational-grade
- 80-89 strong operational-grade
- 90-100 authority-grade candidate

## Safe production posture

Do not weaken:

- strict route validation
- Node 24 CI
- production security headers
- API no-store/noindex behavior
- legacy redirect checks
- smoke checks
- Free Scan funnel focus
- release checklist discipline
- incident response discipline
- closed intelligence
- data quality
- learning memory separation
- pure signal authority
- adaptive evolution safety
- maximum protection
- foundation hardening
- foundation elevation
- system synchronization
- internal command center boundaries
- score threshold discipline
