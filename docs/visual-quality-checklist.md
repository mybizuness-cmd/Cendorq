# Cendorq Visual Quality Checklist

Use this checklist for public layout, spacing, hierarchy, responsive behavior, card density, trust cues, visual polish, and command-grade experience changes.

The goal is simple: keep Cendorq calm, polished, readable, and easy to choose.

## Visual quality principle

Visual quality supports trust. If the page feels crowded, inconsistent, noisy, or unfinished, the buyer path is weakened.

Protect the core path:

1. Free Scan
2. Plans
3. Deep Review
4. Build Fix
5. Ongoing Control
6. Connect

## Required checks

Before merging visual changes, confirm:

- The page still feels polished, calm, and direct.
- The primary action remains visually clear.
- Section hierarchy is easy to scan.
- Spacing is consistent across sections.
- Cards do not feel crowded or uneven.
- Trust cues support the buyer decision without visual noise.
- Visual emphasis matches buyer priority.
- The page does not add dashboard behavior or route-console behavior.
- The layout remains readable on mobile.
- No horizontal scrolling is introduced.
- No decorative element competes with the Free Scan path.
- Visual changes do not hide important copy or actions.

## Layout checks

For layout changes, confirm:

- The first screen is focused.
- Content order makes sense.
- Sections have enough breathing room.
- Cards align cleanly.
- Important actions are not buried.
- The layout does not create unnecessary choices.

## Mobile checks

On small screens, confirm:

- CTAs remain visible and tappable.
- Text remains readable.
- Cards stack in a useful order.
- Spacing does not collapse into clutter.
- No important context depends on side-by-side layout.

## Visual polish checks

Before merging, look for:

- uneven spacing
- weak hierarchy
- crowded cards
- inconsistent button treatment
- visual noise near CTAs
- cramped mobile sections
- decorative elements that reduce clarity

## Validation expectation

Run the standard checks:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

For production-impacting visual changes, also run the production smoke check after deployment:

```bash
CENDORQ_BASE_URL=https://cendorq.com pnpm smoke:production
```

## Non-goals

Do not use visual work as a reason to add:

- homepage clutter
- competing CTAs
- dashboard behavior
- route-console behavior
- unsupported guarantees
- technical language that reduces buyer clarity
