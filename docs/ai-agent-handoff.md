# Cendorq AI Agent Handoff Guide

Use this guide when handing the project to another ChatGPT chat, AI agent, developer, or future working session.

The goal is simple: make the next agent productive immediately without guessing what has been done, what is protected, what must not be changed casually, and what comes next.

## Current project context

Cendorq is being prepared with a production-readiness foundation before backend ZIP work is introduced.

The public buyer path is:

1. Free Scan
2. Plans
3. Deep Review
4. Build Fix
5. Ongoing Control
6. Connect

The public site should stay plain, premium, trustworthy, buyer-focused, and easy to choose.

## Current readiness state

Before backend work, the repo has been hardened with governance for:

- final hardening sweeps
- backend handoff readiness
- manual QA and acceptance
- content freshness
- configuration safety
- integration readiness
- analytics and tracking
- policy and legal surfaces
- trust and credibility
- route and link integrity
- offer integrity
- lead intake
- conversion quality
- visual quality
- copy quality
- privacy and data handling
- accessibility
- performance
- search discovery
- dependencies
- deployment environment
- observability and diagnostics
- incident response
- release history

## Validation baseline

The standard validation commands are:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

For deployed production checks, use:

```bash
CENDORQ_BASE_URL=https://cendorq.com pnpm smoke:production
```

Do not call work complete until CI passes or the failure is understood, patched, and rechecked.

## Important protected files

The route validation script protects key production and governance surfaces, including:

- `src/scripts/validate-routes.mjs`
- `.github/pull_request_template.md`
- `CHANGELOG.md`
- `docs/final-hardening-sweep.md`
- `docs/backend-handoff-checklist.md`
- `docs/ai-agent-handoff.md`
- all major production-readiness checklists
- canonical buyer-path routes
- sitemap, robots, manifest, `llms.txt`, and security contact files
- runtime pins and CI workflow expectations

## Working rules for the next agent

Follow these rules:

- Keep the buyer path simple and current.
- Do not revive old public labels as active buyer language.
- Do not add homepage clutter.
- Do not describe future work as already complete.
- Do not add unsupported claims, guarantees, or proof.
- Do not store private runtime values in the repository.
- Do not expose private buyer data in examples, logs, screenshots, events, or copy.
- Do not merge backend ZIP content until it has been inspected and mapped.
- Keep release history updated for meaningful production or governance changes.
- Use the checklist gates in the PR template for every meaningful change.

## Backend ZIP handoff expectations

When backend ZIP files are provided:

1. Inspect the file tree before running code.
2. Identify runtime, package manager, entrypoints, API routes, services, jobs, config, migrations, and generated artifacts.
3. Identify third-party SDKs, network calls, storage assumptions, and environment variables.
4. Keep private runtime values out of the repo.
5. Update `.env.example` only with safe placeholders.
6. Preserve buyer-friendly failure states.
7. Update health and smoke checks when runtime behavior changes.
8. Run the standard validation commands.
9. Open a PR, check CI, patch failures, and merge only when green.

## Recommended next-session prompt

Copy this into the next ChatGPT chat or AI-agent session:

```text
You are continuing work on the Cendorq repository: mybizuness-cmd/Cendorq.

Current state:
- The public buyer path is Free Scan, Plans, Deep Review, Build Fix, Ongoing Control, and Connect.
- The repo has production-readiness governance for final hardening, backend handoff, manual QA, content freshness, configuration safety, integration readiness, analytics/tracking, policy/legal, trust/credibility, route/link integrity, offer integrity, lead intake, conversion quality, visual quality, copy quality, privacy/data, accessibility, performance, search discovery, dependency, deployment environment, observability, incident response, and release history.
- `pnpm validate:routes` protects the critical docs, routes, discovery files, runtime pins, PR gates, changelog, and production guardrails.
- Standard validation is `pnpm validate:routes`, `pnpm lint`, `pnpm typecheck`, and `pnpm build`.
- Production smoke validation is `CENDORQ_BASE_URL=https://cendorq.com pnpm smoke:production`.

Working rules:
- Do not revive old public labels as active buyer language.
- Keep the homepage focused on getting the right customer to start the Free Scan.
- Keep Plans, Deep Review, Build Fix, and Ongoing Control distinct.
- Keep Connect available for buyers who need conversation first.
- Do not add unsupported claims, hidden dependencies, private runtime values, or public clutter.
- Inspect backend ZIP contents before running or merging anything.
- Update `.env.example` only with safe placeholders.
- Update `CHANGELOG.md` for meaningful production or governance changes.
- Open PRs, check CI, patch failures, and merge only when green.

Start by reading:
- `docs/final-hardening-sweep.md`
- `docs/backend-handoff-checklist.md`
- `docs/ai-agent-handoff.md`
- `.github/pull_request_template.md`
- `src/scripts/validate-routes.mjs`
- `CHANGELOG.md`

Then continue from the current task, which is preparing for backend ZIP intake after the readiness foundation is complete.
```

## What to do before saying the handoff is complete

Before handing off, provide the next agent with:

- repo name and branch context
- latest merged PRs or current open PR
- current validation status
- next planned task
- files that must be read first
- any known risks or unresolved questions
- backend ZIP intake status
- exact commands to run
- exact buyer-path language to preserve

## Non-goals

Do not use a handoff as a reason to add:

- vague instructions
- missing validation status
- unsupported assumptions
- future work presented as complete
- private data or private runtime values
- old public labels as active language
- technical language that reduces buyer clarity
