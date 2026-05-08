# Cendorq Backend Handoff Checklist

Use this checklist when backend ZIP files, API routes, databases, services, background jobs, authentication, payments, AI services, email, CRM, storage, webhooks, or server-side integrations are introduced.

The goal is simple: connect backend work only after the public buyer path, configuration, integration, privacy, operational, and AI-agent handoff guardrails are ready.

## Backend handoff principle

Backend work should make the product more reliable, not harder to trust. If a backend change exposes buyer data, creates unclear failure states, breaks the buyer path, or lacks recovery behavior, it is not production-ready.

Protect the core path:

1. Free Scan
2. Plans
3. Deep Review
4. Build Fix
5. Ongoing Control
6. Connect

## Required pre-handoff checks

Before unpacking or merging backend ZIP work, confirm:

- The ZIP source is known and expected.
- The ZIP contents are inspected before any code is run.
- Service credentials and private runtime values are kept out of the repository.
- Environment variables are listed in `.env.example` using safe placeholder values only.
- Public and private configuration boundaries are clear.
- API routes fail safely and do not expose implementation details.
- Form submissions avoid logging sensitive buyer content by default.
- Third-party services are documented and necessary.
- Database or storage assumptions are documented.
- Error states are buyer-friendly and recoverable.
- Health and smoke checks are updated when runtime behavior changes.
- Privacy, policy, integration, analytics, observability, and AI-agent handoff expectations are considered.

## Current backend ZIP intake finding

The uploaded backend ZIP named `cendorq_ultra_pass_backend_and_system_sweep (1).zip` was inspected as a static intake package.

Important finding: this ZIP is not a clean backend-only package. It is a full older or alternate Next.js App Router system snapshot that includes frontend pages, old pricing routes, public layout files, API routes, middleware, report surfaces, console surfaces, scoring logic, signal logic, validation logic, config files, lockfiles, and generated build artifacts.

Do not merge this ZIP directly into `main`.

Treat the ZIP as a reference source library, not as the source of truth.

The current `main` frontend and buyer path remain the source of truth:

1. Free Scan
2. Plans
3. Deep Review
4. Build Fix
5. Ongoing Control
6. Connect

## Current ZIP contents to avoid importing wholesale

Do not wholesale import these ZIP areas without separate review and deliberate rewrite:

- `src/app/page.tsx`
- `src/app/free-check/page.tsx`
- `src/app/pricing/**`
- `src/app/contact/**`
- `src/components/free-check/free-check-form.tsx`
- `src/layout/site-header.tsx`
- `src/layout/site-footer.tsx`
- `next.config.ts`
- `package.json`
- `README.md`
- `tsconfig.tsbuildinfo`

Reason: those files conflict with the current hardened route strategy, current buyer language, current public frontend, current runtime pins, and current production governance.

## Current ZIP contents worth reviewing selectively

The strongest backend or backend-adjacent candidates to review selectively are:

- `src/app/api/free-check/route.ts`
- `src/app/report/page.tsx`
- `src/app/intake-console/page.tsx`
- `src/lib/intelligence/free-check-intelligence.ts`
- `src/lib/reports/free-check-report.ts`
- `src/lib/scoring/free-check-score.ts`
- `src/lib/signals/free-check-signal.ts`
- `src/lib/validation/free-check.ts`
- `src/middleware.ts`

These should be compared against current `main` before any extraction. Current `main` already contains much of this backend/intelligence layer, so extraction should be patch-level, not replacement-level.

## Current ZIP conflict notes

The ZIP uses older public labels and route posture in several places, including:

- Search Presence Snapshot
- Visibility Blueprint
- Presence Infrastructure
- Presence Command
- `/pricing`
- `/pricing/full-diagnosis`
- `/pricing/optimization`
- `/pricing/monthly-partner`
- `/contact`

Those should not be revived as active buyer-facing language or active route strategy.

The ZIP `next.config.ts` redirects current `/plans` style paths back toward older `/pricing` paths. That is the opposite of current `main`, where legacy pricing paths redirect into the current buyer path.

The ZIP package baseline is also behind current `main` governance. The ZIP package uses an older Node expectation and lacks the current `validate:routes` and production smoke governance.

The ZIP also includes generated build state such as `tsconfig.tsbuildinfo`, which should not be committed.

## Current ZIP API caution

The ZIP version of `src/app/api/free-check/route.ts` contains useful ideas, including report token handling, stricter no-store response headers, submission-origin checks, JSON content-type checks, and minimum form-completion timing.

However, that ZIP API file must not be copied directly. It contains old public language and static review showed syntax-level defects in the ZIP copy. Any API improvements should be reimplemented carefully in current `main` instead of replacing the current route file.

## Recommended first backend PR

The first backend integration PR should be narrow and safe:

- Compare current `src/app/api/free-check/route.ts` against the ZIP version.
- Extract only proven safe improvements.
- Preserve current buyer language.
- Preserve current `next.config.ts` route strategy.
- Preserve Node 24 and pnpm governance.
- Keep `.env.example` limited to safe placeholders.
- Keep storage behavior documented before production use.
- Keep health and smoke checks aligned if runtime behavior changes.
- Update this checklist and `CHANGELOG.md` when meaningful backend intake work lands.

Suggested branch name:

```bash
backend/free-check-intake-hardening
```

## ZIP intake checks

For each backend ZIP:

- Inspect the file tree before merging.
- Identify runtime, framework, package manager, and service dependencies.
- Identify entrypoints, API routes, jobs, scripts, migrations, and config files.
- Identify generated files, build outputs, logs, or local-only artifacts that should not be committed.
- Identify package or lockfile changes before installing.
- Identify network calls or third-party SDKs before running code.

## Security and privacy checks

Before running backend code, confirm:

- Private runtime values are not stored in the repo.
- Local environment files with real values are not committed.
- Webhook verification is planned when webhooks exist.
- Server-only values are not exposed client-side.
- Logs redact sensitive data.
- Production error responses stay safe and plain.

## Data handling checks

For data handling, confirm:

- Collected fields are necessary.
- Storage behavior is documented.
- Retention expectations are clear when relevant.
- Customer-sensitive information is not included in examples.
- Submitted form content is not sent to third parties unnecessarily.
- Analytics events do not include private form content.

## AI-agent handoff checks

Before handing backend work to another AI agent, ChatGPT chat, or developer, confirm:

- `docs/ai-agent-handoff.md` is current.
- The latest branch or PR status is clear.
- The current validation status is clear.
- The next intended backend step is stated.
- The backend ZIP intake status is stated.
- Required files to read first are listed.
- Known risks, open questions, and non-goals are written plainly.
- Future work is not described as already complete.

## Operational checks

Before production use, confirm:

- Health checks still work.
- Smoke checks cover changed public dependencies.
- Failure modes are visible without leaking private data.
- Rollback path is clear.
- Manual QA covers the changed flow.
- Release notes describe what changed without overpromising.

## Validation expectation

Run the standard checks:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

For production-impacting backend changes, also run after deployment:

```bash
CENDORQ_BASE_URL=https://cendorq.com pnpm smoke:production
```

## Non-goals

Do not use backend work as a reason to add:

- unreviewed ZIP contents
- private runtime values in the repository
- unnecessary third-party services
- private data exposure
- unclear failure states
- unsupported automation claims
- frontend clutter
- technical language that reduces buyer clarity
