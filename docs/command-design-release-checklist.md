# Command Design Release Checklist

Use this checklist when a change affects public pages, fallback states, protected customer surfaces, internal operator routes, report shells, SEO/share surfaces, or validation guardrails.

The product direction is:

- Apple-level trust and authority
- Google-level simplicity
- ChatGPT-level immediate action

## Release question

Every release should answer this before merge:

> What is the safest next readiness move for the user?

## Pre-merge check

Confirm the change:

- keeps one dominant action per surface
- keeps Free Scan as the clearest first action when the user is uncertain
- keeps Plans as the clean comparison path
- keeps support for fit, scope, access, or timing only
- avoids competing CTAs
- avoids legacy routes as active recovery paths
- avoids old public labels
- keeps public/private boundaries intact
- avoids exposing scoring, evidence, prompts, private reports, or operator logic publicly
- makes loading, error, and not-found states recover into homepage, Free Scan, or Plans
- improves clarity, trust, action, speed, or protection

## Public surface check

Public surfaces should feel premium, direct, and easy to act on.

Confirm:

- the headline is immediately understandable
- the primary CTA is obvious within seconds
- supporting text is shorter than it wants to be
- secondary links clarify instead of competing
- route labels use current language: Free Scan, Plans, AI Readiness Review, Signal Repair, Readiness Control
- no public page behaves like an internal dashboard or route console

## Protected surface check

Protected surfaces should explain state without exposing private logic.

Confirm:

- the next safe action is clear
- customer-owned information stays protected
- private report, score, evidence, prompt, and operator details do not leak into public surfaces
- dashboard and report surfaces are noindex when they are not meant to be public landing pages

## Fallback surface check

Fallback surfaces are part of the product experience.

Confirm:

- loading states preserve sequence instead of adding route chaos
- error states retry once, then recover into the readiness path
- not-found states recover into Free Scan, Plans, or home when appropriate
- no fallback points to `/pricing`, `/diagnosis`, `/contact`, `/connect`, or old public labels as active user actions

## Validation check

Before merge, confirm:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

`pnpm validate:routes` should keep command design validation and public drift validation active.

## Release note check

For meaningful production-facing command design changes, the release note should say:

- what surface changed
- what user path became clearer
- what old label, route, or behavior was removed if applicable
- what validation passed

Keep release notes plain and short.
