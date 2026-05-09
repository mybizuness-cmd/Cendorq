# Cendorq Production Guide

Cendorq is built around one protected buyer path:

1. Free Scan
2. Plans
3. AI Readiness Review
4. Signal Repair
5. Readiness Control

The homepage should stay focused on getting the right customer into the Free Scan. Do not turn the homepage back into a dashboard, route console, pricing comparison, or multi-offer page.

For release-specific steps, use [`docs/release-checklist.md`](release-checklist.md).
For deployment environment checks, use [`docs/deployment-environment-checklist.md`](deployment-environment-checklist.md).
For production verification status, use [`docs/production-verification-status.md`](production-verification-status.md).
For production failures, use [`docs/incident-response.md`](incident-response.md).

## Command design rule

Every production-facing surface should follow the command design standard:

- Apple-level trust and authority
- Google-level simplicity
- ChatGPT-level immediate action

Use [`docs/command-design-operating-standard.md`](command-design-operating-standard.md) before changing public pages, fallback states, protected customer surfaces, internal operator routes, report shells, SEO/share surfaces, or validation guardrails.

Core question for every important surface:

> What is the safest next readiness move?

## Operating standards

Before changing production behavior, use the standard that matches the change:

- [`docs/command-design-operating-standard.md`](command-design-operating-standard.md)
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

## Canonical production host

Production currently uses:

```bash
NEXT_PUBLIC_SITE_URL=https://www.cendorq.com
CENDORQ_BASE_URL=https://www.cendorq.com
```

The apex domain `https://cendorq.com` redirects to the canonical `www` host. Run strict production smoke against `https://www.cendorq.com` unless the canonical host is intentionally changed.

## Before merging

Run the same checks GitHub CI runs:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

These checks protect canonical buyer routes, public fallback surfaces, legacy redirect behavior, production headers, sitemap and robots focus, manifest shortcuts, llms.txt context, health behavior, Free Scan route behavior, release discipline, incident response, closed intelligence, data quality, learning memory, resilience, maximum protection, foundation hardening, system synchronization, internal command center boundaries, and score threshold discipline.

## After deployment

Run the production smoke check against the deployed canonical URL:

```bash
CENDORQ_BASE_URL=https://www.cendorq.com pnpm smoke:production
```

or:

```bash
pnpm smoke:production https://www.cendorq.com
```

The manual production smoke workflow can also be run from GitHub Actions, and the scheduled workflow runs daily against `https://www.cendorq.com`.

If smoke checks fail or production weakens, follow the incident response runbook before making broad changes.

## Critical public routes

These routes must stay healthy:

- `/`
- `/free-check`
- `/plans`
- `/plans/deep-review`
- `/plans/build-fix`
- `/plans/ongoing-control`

Fallback surfaces must also stay present and readiness-path aligned:

- `src/app/loading.tsx`
- `src/app/error.tsx`
- `src/app/not-found.tsx`

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
- `/contact` -> `/free-check`
- `/connect` -> `/free-check`
- `/how-it-works` -> `/plans`
- `/diagnosis` -> `/plans/deep-review`
- `/profile` -> `/plans`
- `/faq` -> `/plans`
- `/freecheck` -> `/free-check`
- `/full-diagnosis` -> `/plans/deep-review`
- `/optimization` -> `/plans/build-fix`
- `/monthly-partner` -> `/plans/ongoing-control`

Do not list redirected legacy routes in sitemap entries, robots allowlists, navigation, footer links, metadata, manifest shortcuts, or active CTA destinations.

Production smoke must verify each legacy URL returns a real redirect status and a `Location` header before following it into the current buyer path. Do not weaken this into final-destination-only validation.

## Discovery and trust files

These files are intentional and should stay present:

- `/robots.txt`
- `/sitemap.xml`
- `/llms.txt`
- `/.well-known/security.txt`
- `/manifest.webmanifest`

They support crawler clarity, browser metadata, AI-readable context, and public trust hygiene.

Discovery should open the right public pages to search and AI discovery while keeping private surfaces closed.

## Health endpoint

`/api/health` is the production health endpoint. It should stay dynamic, no-store, noindex, lightweight, and safe to expose publicly.

## Free Scan API production rule

Production smoke verifies `OPTIONS /api/free-check` returns the allowed methods without creating fake submissions.

For non-local production URLs, production smoke also verifies unauthenticated `GET /api/free-check` stays protected with the expected response. Localhost remains excluded from protected-read smoke so local development does not require production credentials.

Set the intake read key in the production hosting environment before relying on the protected intake console. Keep it long, random, server-only, and never committed.

Do not weaken the Free Scan API read boundary, remove the `OPTIONS` check, or create fake Free Scan submissions during smoke checks.

## Intake storage posture

The current Free Scan API stores early intake data through a local runtime file-backed envelope.

Treat this as an early production bridge, not the final durable customer-data system.

Before scaling intake volume or treating submissions as durable business records, choose and implement a real persistence layer that preserves validation, duplicate detection, scoring, signal intelligence, report snapshots, no-store responses, protected admin reads, production smoke behavior, and private/public boundary separation.

Do not expose raw intake records publicly. Do not add public report indexes. Do not weaken protected reads to make dashboards easier.

## Language rules

Use plain buyer language:

- AI Engine Readiness
- Free Scan
- Plans
- AI Readiness Review
- Signal Repair
- Readiness Control
- Scan, Review, Repair, Control
- make the business easier to understand
- make the business easier to trust
- make the business easier to choose
- stop guessing before spending more

Avoid reviving old public labels:

- Search Presence Scan
- Visibility Blueprint
- Presence Infrastructure
- Presence Command
- Deep Review
- Build Fix
- Ongoing Control
- Diagnose
- Fix as a plan label
- Start Search Presence Scan

## Homepage rule

The homepage has one job:

Get the right customer to start the Free Scan.

Keep it short, strong, readiness-grade, and conversion-focused. Every homepage block should either improve trust, clarity, desire, or action. If it does not, remove it or reduce it.

## Internal command center rule

The internal command center is private by default.

It may manage Free Scan review, AI Readiness Review automation, Signal Repair control, Readiness Control cycles, report center, automation command deck, data-quality and learning board, score threshold routing, and smart insights.

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

Do not weaken command design, strict route validation, public fallback validation, Node 24 CI, production security headers, API no-store/noindex behavior, legacy redirect checks, smoke checks, production verification status, Free Scan API smoke coverage, protected Free Scan API read behavior, no-fake-submission discipline, Free Scan funnel focus, release checklist discipline, incident response discipline, closed intelligence, data quality, learning memory separation, pure signal authority, adaptive evolution safety, maximum protection, foundation hardening, foundation elevation, system synchronization, internal command center boundaries, or score threshold discipline.
