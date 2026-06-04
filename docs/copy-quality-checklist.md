# Cendorq Copy Quality Checklist

Use this checklist for public page copy, CTAs, headings, metadata, trust messaging, plan descriptions, and buyer-path language changes.

The goal is simple: keep Cendorq plain, command-grade, evidence-led, clear, and easy to choose.

## Copy principle

Copy supports conversion. If the language is vague, technical, cluttered, outdated, or overpromising, the buyer path is weakened.

Protect the core path:

1. Free Scan
2. Sample Report
3. Plans
4. Deep Review
5. Build Fix
6. Ongoing Control
7. FAQ
8. Contact Us
9. Customer Access

## Required checks

Before merging public copy changes, confirm:

- The copy is plain and easy to understand.
- The primary action remains clear.
- CTAs use current buyer-path language.
- Headings are specific and useful.
- The page does not sound like a dashboard, route console, or internal tool.
- Claims are supportable and not exaggerated.
- Trust language is calm, direct, and credible.
- Plan descriptions are distinct and easy to compare.
- Customer-facing language says Contact Us, not Connect.
- Contact Us uses direct email to `support@cendorq.com` unless a real tested send pipeline exists.
- No untested public message box appears as a working support form.
- Old public labels were not revived in active surfaces.
- Copy does not add clutter or competing intent.
- Metadata stays aligned with current buyer language.
- The Free Scan remains the safest first step when the buyer is not ready for deeper work.
- Sample Report remains available before paid pressure.
- Choice Gap is used as the decision weakness, not generic criticism.
- Repair Queue is used as a scoped sequence, not unlimited implementation.
- Scan, Review, Repair, and Control stay distinct.

## Approved buyer language

Use plain buyer language:

- AI Search Presence Repair
- Presence Report
- Sample Report
- Choice Gap
- Repair Queue
- Scan
- Review
- Repair
- Control
- Free Scan
- Plans
- Deep Review
- Build Fix
- Ongoing Control
- FAQ
- Contact Us
- Customer Access
- Account
- Dashboard
- findability shows whether the business can be discovered
- understanding shows whether the business is clear enough to trust
- choice explains where comparison or action breaks down
- repair fixes the weak points after enough evidence supports the priority
- control keeps public presence and readiness from drifting
- make the business easier to find
- make the business easier to understand
- make the business easier to trust
- make the business easier to choose
- stop guessing before spending more
- protect decisions as search and AI discovery change

## Language to avoid in active public surfaces

Avoid reviving old public labels:

- Visibility Blueprint
- Presence Infrastructure
- Presence Command
- Search Presence OS
- Market Command
- AI Engine Visibility and Readiness
- AI visibility and readiness as the primary category
- Start Search Presence Scan
- Scan / Report / Plan
- generic audit language
- customer-facing Connect labels

Avoid vague or bloated phrases:

- AI-powered everything
- revolutionary platform
- guaranteed rankings
- guaranteed AI placement
- guaranteed revenue
- guaranteed ROI
- algorithm control
- unlimited implementation
- instant domination
- unlock your full potential
- best-in-class without proof

## CTA checks

Before changing CTAs, confirm:

- The homepage still favors Free Scan.
- Secondary CTAs do not compete with the main action.
- Sample Report remains a low-pressure proof path.
- Link text is clear without surrounding context.
- CTAs match the destination page.
- Button labels do not overpromise.
- Contact Us labels point to `/connect`.
- Customer Access points to the real access path, not blank account creation.

## Trust checks

Trust copy should be:

- specific
- calm
- credible
- buyer-focused
- easy to verify
- evidence-bounded

Do not use fear, hype, or unsupported guarantees.

## Validation expectation

Run the standard checks:

```bash
pnpm validate:routes
pnpm lint
pnpm typecheck
pnpm build
```

For production-impacting copy changes, also run the production smoke check after deployment:

```bash
CENDORQ_BASE_URL=https://www.cendorq.com pnpm smoke:production
```

## Non-goals

Do not use copy work as a reason to add:

- homepage clutter
- competing CTAs
- dashboard behavior
- route-console behavior
- unsupported guarantees
- untested public message boxes
- technical language that reduces buyer clarity
- old category language
- generic audit positioning
- fake certainty about rankings, AI placement, leads, revenue, inbox placement, or outcomes
