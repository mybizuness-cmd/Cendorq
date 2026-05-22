# Visual Command Device-Width Review Protocol

This protocol defines how to review Cendorq customer-facing surfaces across device widths without weakening visual command, report truth, or buyer-path clarity.

## Purpose

Device-width review exists to confirm that the safest next command remains obvious when the page collapses from desktop to tablet to mobile.

The review is not a generic responsive-design check. It is a command-quality check.

## Required surfaces

Review these surfaces when visual hierarchy, CTA placement, report readability, pricing hierarchy, or mobile layout changes:

- Homepage `/`
- Plans `/plans`
- FAQ `/faq`
- Sample Presence Report `/sample-report`
- Protected Free Scan Presence Report `/dashboard/reports/free-scan`
- Dashboard Presence Command Snapshot when dashboard layout changes

## Required widths

Capture or inspect each relevant surface at:

- 390px mobile portrait
- 430px large mobile portrait
- 768px tablet portrait
- 1024px tablet landscape
- 1440px desktop

## Required capture bands

For each surface, inspect these bands when present:

- hero and first command
- primary CTA row or button stack
- proof or report preview
- plan cards or decision cards
- evidence, limit, or no-guarantee copy
- footer or support path
- protected dashboard/report command area

## Pass criteria

A surface passes only when:

- one dominant next command is visible per screen band
- secondary commands do not overpower the safest next command
- proof appears before high-commitment paid action pressure
- report sections remain readable without cramped cards
- no-guarantee, first-signal, privacy, or access-limit copy remains findable
- Contact Us or Customer Access remains reachable without competing with the main buyer path
- card spacing, tap targets, and text hierarchy stay readable on mobile
- mobile does not become a compressed desktop page

## Fail criteria

A surface fails when:

- two or more CTAs compete as equal primary actions in the same band
- price or paid action appears stronger than proof or limits too early
- report proof, limitation, next move, and repair priority blur together
- FAQ or plan answers hide important limits behind visual clutter
- dashboard state, next action, and support path are unclear
- cards crowd so tightly that scanning breaks
- mobile ordering hides the safest next command below decorative or secondary content

## Surface-specific checks

### Homepage `/`

- Run Free Scan remains the clearest first command.
- Sample Report and Plans remain secondary.
- Presence Report preview supports the hero rather than crowding it.
- Scan, Review, Repair, and Control stay understandable as one path.

### Plans `/plans`

- Free Scan remains the safest starting command for unsure visitors.
- Scan, Review, Repair, and Control stay visually separated.
- Paid plan CTAs do not all compete as equal first actions.
- Sample Presence Report remains available as an evidence-led path.
- No-guarantee language remains visible in the plan separation section.

### FAQ `/faq`

- Start Free Scan remains first in quick links.
- Sample Report remains available before plan pressure.
- Customer access and same-email recovery remain clear.
- Guarantees, privacy, account access, and support answers remain easy to find.
- Details summaries have comfortable tap targets.

### Sample Presence Report `/sample-report`

- Sample language remains educational, not promissory.
- The report object is readable before supporting evidence panels.
- Score, finding, proof, limitation, next move, and repair priority stay separated.
- Evidence boundaries and next-move policy stay findable before conversion pressure.

### Protected Free Scan Presence Report `/dashboard/reports/free-scan`

- First signal only remains visible.
- Deep Review CTA does not overpower proof before the report is understood.
- Methodology, evidence, confidence, priority, and limitation sections remain scannable.
- Protected language remains separate from public marketing language.

### Dashboard Presence Command Snapshot

- Current state is obvious.
- Next action is visible.
- Choice Gap, Repair Queue, and Control Snapshot remain distinct.
- Tablet-width pillar cards remain readable.
- Dashboard clarity stays higher than decoration.

## Required review record

When a device-width review is completed, update `docs/visual-command-surface-review-register.md` with:

- surfaces reviewed
- widths inspected
- strongest pass
- highest-risk mobile issue
- required fix or no-fix decision
- release-captain decision

## Release rule

Do not mark a major customer-facing visual change ready if this protocol finds a dominant-command, proof-before-pressure, no-guarantee, first-signal, access, or mobile-readability failure that is still unresolved.
