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

Never commit real secrets, private tokens, customer data, or private keys.

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

Read the production operating guide before changing routes, public labels, crawler files, health checks, homepage funnel structure, copy, accessibility, performance, search discovery, releases, or incidents:

- [`docs/production-guide.md`](docs/production-guide.md)
- [`docs/release-checklist.md`](docs/release-checklist.md)
- [`docs/copy-quality-checklist.md`](docs/copy-quality-checklist.md)
- [`docs/accessibility-checklist.md`](docs/accessibility-checklist.md)
- [`docs/performance-checklist.md`](docs/performance-checklist.md)
- [`docs/search-discovery-checklist.md`](docs/search-discovery-checklist.md)
- [`docs/incident-response.md`](docs/incident-response.md)
- [`CHANGELOG.md`](CHANGELOG.md)

The guides cover:

- protected buyer path
- pre-merge checks
- copy quality checks
- accessibility checks
- performance checks
- search discovery checks
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

Legacy public URLs redirect into the current buyer path. Keep the canonical pages above as the source of truth.

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
- Deep Review
- Build Fix
- Ongoing Control
- make the business easier to understand
- make the business easier to trust
- make the business easier to choose
- stop guessing before spending more

Avoid reviving old public labels such as Visibility Blueprint, Presence Infrastructure, Presence Command, or Start Search Presence Scan in active public surfaces.
