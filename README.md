# Cendorq

Cendorq is AI Engine Visibility and Readiness for businesses that need to see where they appear, where they are missing, why they are not being understood, and what to fix so customers, search, maps, reviews, and AI engines can understand, trust, compare, and choose them before they spend more in the wrong place.

Cendorq should not stop at visibility. Visibility shows where the business is seen. Readiness explains why the business is or is not being understood. Execution fixes the weak points. Ongoing Control keeps visibility and readiness from drifting as search, AI answers, competitors, and customers change.

The public buyer path is intentionally simple:

1. **Free Scan** — show the first visibility and readiness signals when the weak point is unclear
2. **Plans** — choose the depth that fits the business problem
3. **Deep Review** — understand what is weakening visibility, clarity, trust, proof, or choice
4. **Build Fix** — improve the page, message, proof, or action path that matters most
5. **Ongoing Control** — keep visibility and readiness from drifting as search, AI answers, competitors, and customers change
6. **FAQ** — answer quick buyer questions without slowing the path
7. **Contact Us** — use direct support when fit, scope, timing, or account help needs clarification

The homepage has one job: get the right visitor to start the **Free Scan**.

## Public design standard

Every public surface should follow the Cendorq public design standard:

- Apple-level trust and authority
- Google-level simplicity
- ChatGPT-level immediate action
- plain customer-facing language
- no fake urgency, fake provider auth, or unsupported outcome promises

The full standard is documented and validated here:

- [`docs/command-design-operating-standard.md`](docs/command-design-operating-standard.md)

## Stack

- Next.js 16
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

Never commit real secrets, private tokens, customer data, private keys, webhook secrets, provider secrets, report tokens, service-role credentials, or private prompts.

Required production variables for the current customer journey:

- `NEXT_PUBLIC_SITE_URL`
- `CENDORQ_BASE_URL`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_DEEP_REVIEW`
- `STRIPE_PRICE_BUILD_FIX`
- `STRIPE_PRICE_ONGOING_CONTROL`
- `RESEND_API_KEY`
- `EMAIL_FROM`
- `EMAIL_REPLY_TO`
- `SUPPORT_EMAIL`
- `CENDORQ_CUSTOMER_SESSION_SECRET`

The session secret must be a random value with at least 32 characters. Without it, remembered-session access fails safely and sends the visitor back to Access.

Contact Us uses direct email to `support@cendorq.com` on the public route `/connect`. Customers should email from the address where they want the reply.

Optional provider auth start URLs:

- `CENDORQ_AUTH_GOOGLE_URL`
- `CENDORQ_AUTH_MICROSOFT_URL`
- `CENDORQ_AUTH_APPLE_URL`
- `CENDORQ_AUTH_LINKEDIN_URL`
- `CENDORQ_AUTH_FACEBOOK_URL`

Provider URLs must be HTTPS. Leave them blank until a provider is actually configured. Buttons fail safely when provider URLs are absent.

Public Stripe payment-link fallbacks are also documented in `.env.example`:

- `NEXT_PUBLIC_STRIPE_AI_READINESS_PAYMENT_LINK`
- `NEXT_PUBLIC_STRIPE_SIGNAL_REPAIR_PAYMENT_LINK`
- `NEXT_PUBLIC_STRIPE_READINESS_CONTROL_PAYMENT_LINK`

## Operating doctrine

Cendorq is public where it must convert and private where it must protect intelligence.

The public surface sells the customer path. The private system holds the engine.

Full operating standards are protected in:

- [`docs/command-design-operating-standard.md`](docs/command-design-operating-standard.md)
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

`pnpm validate:routes` includes command design standard validation, public drift validation, public sitemap and robots validation, strict legacy redirects, remembered customer header guards, Free Scan API `OPTIONS`, protected Free Scan API read behavior, and the no-fake-submission smoke rule.

After deployment, run:

```bash
CENDORQ_BASE_URL=https://www.cendorq.com pnpm smoke:production
```

or:

```bash
pnpm smoke:production https://www.cendorq.com
```

The production smoke workflow can also be run manually from GitHub Actions and runs automatically every day against `https://www.cendorq.com`.

## Production guide

Read the production operating guide before changing routes, public labels, crawler files, health checks, homepage funnel structure, copy, privacy, accessibility, performance, search discovery, dependencies, deployment environment, observability, releases, incidents, private intelligence, AI-agent workflows, reports, evidence, data quality, learning memory, pure signals, adaptive signal standards, resilience, continuity, maximum protection, foundation hardening, foundation elevation, system synchronization, internal command center, score thresholds, production verification status, or backend data access:

- [`docs/production-guide.md`](docs/production-guide.md)
- [`docs/release-checklist.md`](docs/release-checklist.md)
- [`docs/production-verification-status.md`](docs/production-verification-status.md)
- [`docs/command-design-operating-standard.md`](docs/command-design-operating-standard.md)
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

## Critical public routes

These routes must stay healthy:

- `/`
- `/free-check`
- `/plans`
- `/plans/deep-review`
- `/plans/build-fix`
- `/plans/ongoing-control`
- `/faq`
- `/connect` (Contact Us)

Customer access routes must stay protected and noindex when used:

- `/login`
- `/signup`
- `/verify-email`
- `/checkout/success`

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
- `/freecheck` -> `/free-check`
- `/full-diagnosis` -> `/plans/deep-review`
- `/optimization` -> `/plans/build-fix`
- `/monthly-partner` -> `/plans/ongoing-control`

FAQ is not a legacy redirect. It is an active public route for quick buyer answers. Contact Us is served by `/connect`; old `/contact` should redirect into it.

## Production assets

These files are intentional and protected:

- `/robots.txt`
- `/sitemap.xml`
- `/llms.txt`
- `/.well-known/security.txt`
- `/manifest.webmanifest`
- `/api/health`

## Language rule

Use plain customer language:

- AI Engine Visibility and Readiness
- Free Scan
- Plans
- Deep Review
- Build Fix
- Ongoing Control
- FAQ
- Contact Us
- Access
- Account
- Dashboard
- visibility shows where the business is seen
- readiness explains why the business is or is not understood
- execution fixes the weak points
- control keeps visibility and readiness from drifting
- make the business easier to understand
- make the business easier to trust
- make the business easier to choose
- stop guessing before spending more
- protect decisions as search and AI discovery change

Avoid reviving old public labels such as Business Command Intelligence, Market Command Intelligence, Search Presence OS, Visibility Blueprint, Presence Infrastructure, Presence Command, View Pricing, Start Search Presence Scan, or customer-facing Connect labels in active public surfaces.
