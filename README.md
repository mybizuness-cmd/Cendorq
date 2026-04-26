# Cendorq

Cendorq is a premium Search Presence OS for businesses that need to become easier to understand, easier to trust, and easier to choose before spending more in the wrong place.

The public buyer path is intentionally simple:

1. **Free Scan** — the safest first step
2. **Plans** — compare the path without confusion
3. **Deep Review** — understand what is weakening clarity, trust, and choice
4. **Build Fix** — strengthen pages, message, trust, and action path
5. **Ongoing Control** — keep improving with continued direction
6. **Connect** — choose the right communication lane

The homepage has one job: get the right customer to start the **Free Scan**.

## Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 3
- ESLint
- PostCSS
- Node 24 CI
- pnpm 9.15.9

## Runtime

Use Node 24 and pnpm 9.15.9.

Runtime pins are kept in:

- `.nvmrc`
- `.node-version`
- `package.json` `packageManager`
- `package.json` `engines.node`

## Environment

Use `.env.example` as the safe local template. Copy it to `.env.local` only when local development needs environment values.

Never commit real secrets, private tokens, customer data, private keys, report tokens, service-role credentials, or private prompts.

## Operating doctrine

Cendorq is public where it must convert and private where it must protect intelligence.

The public surface sells the outcome. The private system holds the engine.

Full operating standards are protected in:

- [`docs/closed-intelligence-operating-standard.md`](docs/closed-intelligence-operating-standard.md)
- [`docs/data-quality-governance-standard.md`](docs/data-quality-governance-standard.md)
- [`docs/learning-memory-standard.md`](docs/learning-memory-standard.md)
- [`docs/pure-signal-authority-standard.md`](docs/pure-signal-authority-standard.md)
- [`docs/adaptive-signal-evolution-standard.md`](docs/adaptive-signal-evolution-standard.md)
- [`docs/resilience-continuity-standard.md`](docs/resilience-continuity-standard.md)
- [`docs/maximum-protection-standard.md`](docs/maximum-protection-standard.md)
- [`docs/foundation-hardening-standard.md`](docs/foundation-hardening-standard.md)
- [`docs/foundation-elevation-standard.md`](docs/foundation-elevation-standard.md)
- [`docs/system-synchronization-qa-standard.md`](docs/system-synchronization-qa-standard.md)
- [`docs/internal-command-center-standard.md`](docs/internal-command-center-standard.md)
- [`docs/score-threshold-operating-standard.md`](docs/score-threshold-operating-standard.md)

This means:

- public pages may explain the buyer path and high-level outcome
- private systems hold scoring, evidence, reports, AI-agent prompts, and operating logic
- client reports and evidence must not be publicly indexed
- database access must stay behind controlled server-side services
- direct client-side database credentials are not allowed
- exact scoring logic, private report schemas, and private agent chains stay protected
- every serious AI-agent finding must be evidence-gated
- meaningful changes must preserve the public/private boundary
- data quality is source-aware, confidence-scored, freshness-aware, and evidence-linked where possible
- learning memory separates raw, exploration, operational, authority, and rejected memory
- pure signal rules determine whether data can influence durable reports, scores, playbooks, and benchmarks
- adaptive signal evolution lets Cendorq evolve safely without uncontrolled production self-modification
- resilience standards require safe degradation, recovery, vendor-risk awareness, and long-horizon continuity
- maximum protection requires deny-by-default access, secret protection, anti-exfiltration, prompt-injection containment, auditability, and emergency controls
- foundation hardening protects the base before new features are built on top of it
- foundation elevation forces the base to become clearer, safer, more scalable, more converting, and easier to build on every time it is touched
- system synchronization keeps docs, validation, release gates, PR gates, and future architecture telling the same truth
- internal command center work must make Cendorq easier to operate without exposing the private engine
- score thresholds guide internal routing and automation while public pages stay simple and uncluttered

## Editor and Git baseline

`.editorconfig` keeps local editor behavior aligned across contributors:

- UTF-8
- LF line endings
- final newlines
- trimmed trailing whitespace outside Markdown
- two-space indentation by default

`.gitattributes` keeps Git behavior predictable across operating systems:

- normalizes text files to LF
- keeps common binary assets out of text diffs
- keeps source, Markdown, JSON, and workflow files stable as text

## Core commands

```bash
pnpm install
pnpm dev
pnpm build
```

Before merging production changes, run:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

After deployment, run:

```bash
CENDORQ_BASE_URL=https://cendorq.com pnpm smoke:production
```

or:

```bash
pnpm smoke:production https://cendorq.com
```

The production smoke workflow can also be run manually from GitHub Actions and runs automatically every day against `https://cendorq.com`.

## Production guide

Read the production operating guide before changing routes, public labels, crawler files, health checks, homepage funnel structure, copy, privacy, accessibility, performance, search discovery, dependencies, deployment environment, observability, releases, incidents, private intelligence, AI-agent workflows, reports, evidence, data quality, learning memory, pure signals, adaptive signal standards, resilience, continuity, maximum protection, foundation hardening, foundation elevation, system synchronization, internal command center, score thresholds, or backend data access:

- [`docs/production-guide.md`](docs/production-guide.md)
- [`docs/release-checklist.md`](docs/release-checklist.md)
- [`docs/closed-intelligence-operating-standard.md`](docs/closed-intelligence-operating-standard.md)
- [`docs/data-quality-governance-standard.md`](docs/data-quality-governance-standard.md)
- [`docs/learning-memory-standard.md`](docs/learning-memory-standard.md)
- [`docs/pure-signal-authority-standard.md`](docs/pure-signal-authority-standard.md)
- [`docs/adaptive-signal-evolution-standard.md`](docs/adaptive-signal-evolution-standard.md)
- [`docs/resilience-continuity-standard.md`](docs/resilience-continuity-standard.md)
- [`docs/maximum-protection-standard.md`](docs/maximum-protection-standard.md)
- [`docs/foundation-hardening-standard.md`](docs/foundation-hardening-standard.md)
- [`docs/foundation-elevation-standard.md`](docs/foundation-elevation-standard.md)
- [`docs/system-synchronization-qa-standard.md`](docs/system-synchronization-qa-standard.md)
- [`docs/internal-command-center-standard.md`](docs/internal-command-center-standard.md)
- [`docs/score-threshold-operating-standard.md`](docs/score-threshold-operating-standard.md)
- [`docs/route-link-integrity-checklist.md`](docs/route-link-integrity-checklist.md)
- [`docs/search-discovery-checklist.md`](docs/search-discovery-checklist.md)
- [`docs/copy-quality-checklist.md`](docs/copy-quality-checklist.md)
- [`docs/privacy-data-checklist.md`](docs/privacy-data-checklist.md)
- [`docs/accessibility-checklist.md`](docs/accessibility-checklist.md)
- [`docs/performance-checklist.md`](docs/performance-checklist.md)
- [`docs/dependency-checklist.md`](docs/dependency-checklist.md)
- [`docs/deployment-environment-checklist.md`](docs/deployment-environment-checklist.md)
- [`docs/observability-diagnostics-checklist.md`](docs/observability-diagnostics-checklist.md)
- [`docs/incident-response.md`](docs/incident-response.md)
- [`CHANGELOG.md`](CHANGELOG.md)

The guides cover:

- protected buyer path
- closed intelligence
- public/private boundary
- protected reports and evidence
- private database posture
- data quality
- learning memory
- pure signal authority
- adaptive signal evolution
- resilience and continuity
- maximum protection
- foundation hardening
- foundation elevation
- system synchronization QA
- internal command center
- score threshold operating rules
- legacy public routes and redirects
- pre-merge checks
- copy quality checks
- privacy and data handling checks
- accessibility checks
- performance checks
- search discovery checks
- dependency and supply-chain checks
- deployment environment checks
- observability and diagnostics checks
- post-deploy smoke checks
- release checklist
- rollback checklist
- incident response
- release history
- critical route list
- discovery and trust files
- health endpoint expectations
- language rules
- homepage conversion rule
- safe production posture

## Critical public routes

These routes must stay healthy:

- `/`
- `/free-check`
- `/plans`
- `/plans/deep-review`
- `/plans/build-fix`
- `/plans/ongoing-control`
- `/connect`

Policy and trust routes may stay public when current:

- `/privacy`
- `/terms`
- `/disclaimer`

## Legacy public routes

Legacy public routes redirect into the current buyer path. They should not be listed in sitemap entries, robots allowlists, navigation, footer links, metadata, manifest shortcuts, or active CTA destinations.

Protected redirects include:

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

## Production assets

These files are intentional and protected:

- `/robots.txt`
- `/sitemap.xml`
- `/llms.txt`
- `/.well-known/security.txt`
- `/manifest.webmanifest`
- `/api/health`

## Language rule

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

Avoid reviving old public labels such as Visibility Blueprint, Presence Infrastructure, Presence Command, or Start Search Presence Scan in active public surfaces.
