# Command Center Docs Index

This private documentation index keeps the Command Center operating standards easy to find without exposing private records, evidence, intelligence, secrets, reports, prompts, scoring internals, customer data, billing records, PDF internals, deliverability internals, or private customer conversation contents.

## Core standards

- `docs/current-operating-research-notes.md` — current-source refresh standard for search, AI discovery, analytics, performance, advertising readiness, brand filing preparation, security, deployment posture, public sharing, campaign naming, and the rule to not move from stale memory.
- `docs/brand-trademark-operating-standard.md` — brand and trademark operating standard for wordmark, signal mark, logo ownership, source artwork, clearance review, five owner filing steps, specimens, qualified legal review, and no guaranteed trademark registration or competitor blocking claims.
- `docs/legal-trust-crawler-readiness-standard.md` — legal, trust, crawler, ad-platform, and public reputation readiness standard for policy pages, concise claim boundaries, crawler-friendly public trust signals, private-customer discovery boundaries, and dispute-risk reduction.
- `docs/owner-brand-legal-trust-addendum.md` — owner addendum for logo provenance, Cendorq signal-mark consistency, brand/trademark clearance, legal review, crawler/public trust alignment, and customer-confidence-safe boundary language.
- `src/lib/command-center/validation-registry-brand-legal-addendum.ts` — brand/legal validation registry addendum that makes current research, brand/trademark, logo readiness, legal/trust/crawler readiness, and owner brand/legal/trust validators discoverable without rewriting the large core registry.
- `docs/best-of-best-operating-standard.md` — best-of-best operating standard translating Apple-level clarity, Stripe-level billing trust, Shopify-level owner empowerment, Salesforce-level system consistency, Microsoft-level calm interaction, Atlassian-level documented foundations, Nielsen Norman usability discipline, Intercom-level support, page/subpage architecture, no-clutter design, and future-proofing into Cendorq-specific product quality, revenue-surface, dashboard, report, billing, support, lifecycle, document-delivery, and validator-backed operating rules.
- `docs/acquisition-to-retention-operating-system.md` — full journey operating standard for public discovery, SEO/AI-readiness visibility, landing clarity, public page roles, conversion, checkout, lifecycle email, dashboard retention, report value, support recovery, security/privacy boundaries, reactivation, and continuous improvement without guaranteed ranking, traffic, indexing, AI placement, or revenue claims.
- `docs/build-gate-hardening-standard.md` — build gate hardening standard for locked install, validate:routes, typecheck, lint, production build, CodeQL adjacency, minimal workflow permissions, no deploy mutation in validation workflow, rollback posture, and release-captain review.
- `docs/device-experience-performance-standard.md` — device experience and performance standard for mobile-first entry, desktop command-room quality, LCP, INP, CLS, responsive recovery, readable plan comparison, and intentional mobile/desktop behavior.
- `docs/support-channel-operating-standard.md` — support channel operating standard for support aliases, billing support, report support, security concerns, partner paths, legal notice routing, dashboard-first support, AI-assisted support posture, and SPF, DKIM, and DMARC owner setup.
- `docs/command-design-operating-standard.md` — command design standard for Apple-level trust and authority, Google-level simplicity, ChatGPT-level immediate action, safest-next-command rule, public/private boundaries, fallback recovery, and validation guardrails.
- `docs/maximum-protection-standard.md` — maximum protection standard for safe indexing, data protection, detection, response, recovery, public/private boundaries, and protection of private mechanics.
- `docs/owner-maximum-protection-posture.md` — owner maximum protection posture for daily operating decisions, Required owner decisions, Hard owner locks, and Operating rule discipline.
- `docs/command-center-operator-runbook.md` — cockpit runbook. Keep every validation guard wired into `validate:routes`. Vercel is green.
- `docs/admin-command-center-safe-projections.md` — admin safe projection map with Operating posture, Source of truth, and Validation requirements.
- `docs/owner-operating-manual.md` — owner-level operating manual for proof before output, evidence before recommendation, Conversion moat, vault-first report access, dashboard message mirroring, safe PDF/document delivery, unified surface lock, operating memory lock, and post-build operating cadence.
- `docs/repo-update-scanning-automation.md` — repo update scanning automation for Dependabot, CodeQL workflow, dependency integrity, most-pristine checks, and release-captain review.
- `docs/controlled-continuous-evolution.md` — controlled continuous evolution for monitored, validated, reviewable, reversible updates, release-captain approval before merge, and Documentation rule discipline.
- `docs/controlled-maintenance.md` — controlled maintenance standard for safe update queues, review streams, validation gates, rollback planning, and audit-ready maintenance posture.

## Required command design paths

- `docs/current-operating-research-notes.md`
- `src/scripts/validate-current-operating-research-notes.mjs`
- `docs/brand-trademark-operating-standard.md`
- `src/scripts/validate-brand-trademark-operating-standard.mjs`
- `src/scripts/validate-logo-readiness-standard.mjs`
- `docs/legal-trust-crawler-readiness-standard.md`
- `src/scripts/validate-legal-trust-crawler-readiness-standard.mjs`
- `docs/owner-brand-legal-trust-addendum.md`
- `src/scripts/validate-owner-brand-legal-trust-addendum.mjs`
- `src/lib/command-center/validation-registry-brand-legal-addendum.ts`
- `src/scripts/validate-brand-legal-validation-registry-addendum.mjs`
- `docs/best-of-best-operating-standard.md`
- `src/lib/best-of-best-operating-standard.ts`
- `src/scripts/validate-best-of-best-operating-standard.mjs`
- `docs/acquisition-to-retention-operating-system.md`
- `src/scripts/validate-acquisition-to-retention-operating-system.mjs`
- `docs/build-gate-hardening-standard.md`
- `src/scripts/validate-build-gate-hardening-standard.mjs`
- `docs/device-experience-performance-standard.md`
- `src/scripts/validate-device-experience-performance-standard.mjs`
- `docs/support-channel-operating-standard.md`
- `src/scripts/validate-support-channel-operating-standard.mjs`
- `docs/command-design-operating-standard.md`
- `docs/command-design-release-checklist.md`
- `.github/PULL_REQUEST_TEMPLATE/command-design.md`
- `src/scripts/validate-command-design-operating-standard.mjs`
- `src/scripts/validate-public-drift.mjs`

Command design applies to public pages, fallback states, protected customer surfaces, internal operator routes, report shells, SEO/share surfaces, legal/trust surfaces, crawler-facing public trust signals, and validation guardrails. It must preserve Apple-level trust and authority, Google-level simplicity, ChatGPT-level immediate action, and the safest-next-command rule without exposing private mechanics. Best-of-best operating standard applies before downstream customer-delivery validators so public pages, dashboard sales surfaces, billing, report vault, notifications, support, lifecycle, and plan delivery inherit one Cendorq quality bar. Acquisition-to-retention operating system applies across public discovery, landing, conversion, checkout, dashboard, reports, lifecycle email, support, retention, reactivation, and security/privacy boundaries.

## Required source-of-truth areas

- Best-of-best operating standard: `src/lib/best-of-best-operating-standard.ts`
- Acquisition-to-retention operating system: `docs/acquisition-to-retention-operating-system.md`
- Current operating research notes: `docs/current-operating-research-notes.md`
- Brand and trademark operating standard: `docs/brand-trademark-operating-standard.md`
- Legal, trust, and crawler readiness standard: `docs/legal-trust-crawler-readiness-standard.md`
- Owner brand/legal/trust addendum: `docs/owner-brand-legal-trust-addendum.md`
- Brand/legal validation registry addendum: `src/lib/command-center/validation-registry-brand-legal-addendum.ts`
- Build gate hardening standard: `docs/build-gate-hardening-standard.md`
- Device experience and performance standard: `docs/device-experience-performance-standard.md`
- Support channel operating standard: `docs/support-channel-operating-standard.md`
- Operating memory lock: `docs/operating-memory-lock.md`
- Unified experience alignment: `src/lib/unified-experience-alignment.ts`
- Access gate: `src/lib/command-center/access.ts`
- Security posture: `src/lib/command-center/security-posture.ts`
- Panel registry: `src/lib/command-center/panel-registry.ts`
- Validation registry: `src/lib/command-center/validation-registry.ts`
- Controlled continuous evolution: `src/lib/controlled-continuous-evolution-contracts.ts`
- Controlled maintenance: `src/lib/controlled-maintenance-contracts.ts`

## Customer delivery and lifecycle source-of-truth areas

- Verify-to-view and email access contract: `src/lib/customer-email-confirmation-handoff-contracts.ts`
- Billing checkout and safe document contract: `src/lib/billing-checkout-contracts.ts`
- Pricing checkout orchestration and report trigger matrix: `src/lib/pricing-checkout-orchestration.ts`
- Plan delivery, report presentation, stage targeting, and continuous nurturing contract: `src/lib/plan-delivery-orchestration-contracts.ts`
- Dashboard conversion inbox: `src/app/dashboard/dashboard-action-inbox.tsx`
- Dashboard conversion command center: `src/app/dashboard/dashboard-business-command-center.tsx`
- Dashboard return path: `src/app/dashboard/dashboard-control-room-reentry.tsx`
- Checkout success activation surface: `src/app/checkout/success/page.tsx`
- Public plans path: `src/app/plans/page.tsx`
- Plan-detail shell: `src/components/plans/conversion-plan-page.tsx`
- Plan-detail data: `src/app/plans/plan-data.ts`

Customer delivery must remain vault-first, verified-access-first, dashboard-mirrored, and best-of-best aligned. Email, PDF attachments, downloadable PDFs, billing documents, dashboard messages, and report-vault display must all reflect the same safe customer-owned state without becoming separate truth sources.

## Customer delivery validation standard

These validators protect the current checkout-to-report-to-retention delivery chain:

- `src/scripts/validate-current-operating-research-notes.mjs` — current-source discipline for search, AI discovery, analytics, performance, advertising readiness, brand filing preparation, security, and deployment posture.
- `src/scripts/validate-brand-trademark-operating-standard.mjs` — brand/trademark operating discipline for distinctive assets, logo ownership posture, five owner filing steps, qualified legal review, no guaranteed registration, and no guaranteed competitor blocking.
- `src/scripts/validate-logo-readiness-standard.mjs` — signal-mark readiness validation for source artwork, visual clearance, owner files, small-size recognition, and wordmark-plus-signal consistency.
- `src/scripts/validate-legal-trust-crawler-readiness-standard.mjs` — legal/trust/crawler validation for policy pages, sitemap, robots, security contact, public trust signals, concise boundaries, and private-customer discovery separation.
- `src/scripts/validate-owner-brand-legal-trust-addendum.mjs` — owner addendum validation for logo provenance, legal review, crawler trust alignment, and confidence-safe public boundary language.
- `src/scripts/validate-brand-legal-validation-registry-addendum.mjs` — registry addendum validation for current research, brand/trademark, logo readiness, legal/trust/crawler readiness, and owner addendum discoverability.
- `src/scripts/validate-best-of-best-operating-standard.mjs` — research-inspired Cendorq-specific quality bar for product hierarchy, page/subpage architecture, no-clutter design, future-proofing, billing trust, customer empowerment, system consistency, calm interaction, documented foundations, usability discipline, human support, money-making recovery, and blocked generic patterns.
- `src/scripts/validate-acquisition-to-retention-operating-system.mjs` — full journey validation for discovery before the visit, landing clarity, public page roles, conversion, checkout, lifecycle email, dashboard retention, report value, support recovery, security/privacy boundaries, reactivation, and continuous improvement.
- `src/scripts/validate-build-gate-hardening-standard.mjs` — build-gate validation for locked install, validate:routes, typecheck, lint, production build, CodeQL adjacency, minimal workflow permissions, no deploy mutation, and rollback posture.
- `src/scripts/validate-device-experience-performance-standard.mjs` — mobile-first and desktop-command-room validation for LCP, INP, CLS, responsive recovery, readable plan comparison, dashboard state, billing, report vault, support, and notifications.
- `src/scripts/validate-support-channel-operating-standard.mjs` — support channel validation for aliases, dashboard-first recovery, billing, reports, security, partners, legal routing, AI-assisted support, and email-authentication setup.
- `src/scripts/validate-pricing-checkout-orchestration.mjs` — plan pricing, checkout metadata, post-payment emails, report triggers, and post-payment service sequence.
- `src/scripts/validate-billing-checkout-contracts.mjs` — webhook/idempotent fulfillment, entitlement projection, billing recovery, safe PDF document delivery, provider-authoritative billing documents, and no client-only paid access.
- `src/scripts/validate-dashboard-action-inbox.mjs` — dashboard conversion inbox, proof-first paid-depth path, verify-to-view, deliverability posture, dashboard-message mirror, and safe PDF attachment policy.
- `src/scripts/validate-plan-delivery-orchestration-contracts.mjs` — plan delivery boundaries, report presentation, stage-targeted retargeting, continuous nurturing, future-feature relevance, and report-vault/download parity.
- `src/scripts/validate-public-drift.mjs` — public buyer path, Plans alignment, dashboard command language, and old-route/old-language blocking.
- `src/scripts/validate-owner-operating-manual.mjs` — owner doctrine for vault-first access, deliverability, mirrored dashboard messages, safe PDF delivery, report truth, plan boundaries, and release-captain authority.

Delivery validation must preserve: acquisition-to-retention operating system, brand and trademark operating standard, legal/trust/crawler readiness, owner brand/legal/trust addendum, brand/legal validation registry addendum, best-of-best operating standard, verified email before protected report access, dashboard/report vault as source of truth, mirrored dashboard messages for important emails, safe PDF delivery only after gates pass, provider-authoritative billing PDFs, no guaranteed deliverability claims, no guaranteed inbox placement claims, no guaranteed ranking or traffic promises, no guaranteed indexing or AI answer placement promises, no guaranteed trademark registration or competitor blocking claims, no PDF-only access path, and no raw/private data projection.

## Route-chain integrity standard

`src/scripts/validate-routes-chain-integrity.mjs` must run first in `validate:routes`, preserve validator ordering, block duplicate validators, require high-risk guardrail files, verify current research, brand/trademark operating standard, logo readiness, legal/trust/crawler readiness, owner brand/legal/trust addendum, brand/legal validation registry addendum, best-of-best, unified experience alignment, surface-level alignment, device experience and performance, acquisition-to-retention, build gates, support channels, maximum-protection standard coverage, CodeQL workflow integrity coverage, repo update scanning automation coverage, controlled continuous evolution coverage, and indirect report evidence validators.

## Maximum protection standard

`src/scripts/validate-maximum-protection-standard.mjs` must keep `docs/maximum-protection-standard.md`, `src/lib/command-center/validation-registry.ts`, and `validate:routes` aligned with Cendorq's highest-protection doctrine. Maximum protection must preserve data classification, deny-by-default access, server-side private data handling, secret handling, exfiltration prevention, AI-agent containment, report protection, evidence protection, supply-chain protection, database protection, auditability, emergency controls, partner boundaries, safe indexing, detection, response, recovery, and public doctrine boundaries without exposing private mechanics.

## Maintenance rule

When a new private cockpit panel, source-of-truth module, validator, report evidence standard, command design standard, brand/trademark operating standard, logo readiness standard, legal/trust/crawler readiness standard, owner brand/legal/trust addendum, brand/legal validation registry addendum, best-of-best operating standard, acquisition-to-retention operating system, build gate hardening standard, device experience and performance standard, support channel operating standard, current operating research note, fallback recovery guard, route-chain integrity rule, maximum protection rule, owner maximum-protection posture rule, repo update scanning automation rule, customer delivery or safe document delivery rule, dashboard message mirror rule, controlled continuous evolution rule, controlled maintenance rule, workflow integrity rule, or owner operating standard is added, update this index and its validation coverage in the same pull request. The index is metadata only and must never include secret values, live customer data, raw intelligence, raw evidence, billing records, report internals, PDF internals, deliverability internals, prompts, scoring weights, audit-defense legal strategy beyond approved metadata anchors, private dashboard conversation text, or non-public quality-review details.
