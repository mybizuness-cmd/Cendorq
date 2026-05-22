# Visual Command Surface Review Register

This register applies the visual command standard to current high-value Cendorq surfaces. It records what each surface currently protects, what must not regress, and what should be reviewed next.

## Review standard

Use `docs/visual-command-review-template.md` and `docs/visual-command-quality-standard.md` for every major customer-facing or protected surface.

Each surface should preserve:

- one obvious safest next command
- premium restraint
- strong hierarchy
- immediate scannability
- clear proof sequence
- mobile clarity
- report readability
- dashboard command clarity
- no decorative overload
- no unsupported certainty

## Homepage `/`

Source surface: `src/app/page.tsx`

Current visual command:

- The page leads with AI Search Presence Repair.
- The main command is Run Free Scan.
- Secondary commands stay visible: Start Free Scan, See Sample Report, View Plans, Contact Us.
- The hero pairs category positioning with Presence Report preview.
- The page explains Scan, Review, Repair, and Control as one simple path.

Do not regress:

- Keep Run Free Scan as the clearest first command.
- Keep Sample Report and Plans secondary.
- Keep Free Scan framed as a first signal.
- Keep Review, Repair, and Control distinct.
- Keep the visual tone premium, restrained, and evidence-led.

Next review:

- Mobile hero stacking.
- Button hierarchy on small screens.
- Whether the Presence Report preview is immediately understandable without crowding.

## Sample Presence Report `/sample-report`

Source surface: `src/app/sample-report/page.tsx`

Current visual command:

- The page names Sample Presence Report directly.
- The first actions are Run Free Scan and View Plans.
- The report object is followed by evidence boundaries, next move policy, vertical standards, and guardrail copy.
- The sample is explicitly framed as an example, not a promise.

Do not regress:

- Keep sample language educational, not promissory.
- Keep score, finding, proof, limitation, next move, and repair priority visually separated.
- Keep evidence boundaries and next move policy close to the sample object.
- Keep vertical samples framed as proof standards, not guaranteed outcomes.

Next review:

- Whether the report object is readable on mobile before the evidence panels.
- Whether vertical sample cards feel helpful rather than noisy.
- Whether the example-not-promise section is visible enough before conversion.

## Protected Free Scan Presence Report `/dashboard/reports/free-scan`

Source surface: `src/app/dashboard/reports/free-scan/page.tsx`

Current visual command:

- The page makes the result state clear: Scan, first signal only, next command Review.
- The main action points to Deep Review with price.
- The protected report preview stays inside dashboard context.
- Evidence, confidence, priority, AI/search posture, and methodology remain separated.
- The page says the Scan cannot claim complete diagnosis, ranking, placement, or lead guarantees.

Do not regress:

- Keep first signal only visible.
- Keep complete diagnosis out of the Free Scan layer.
- Keep Review as the paid next command only when the signal matters enough.
- Keep protected result language separate from public marketing language.
- Keep proof, risk, limit, and next command separate.

Next review:

- Whether the Deep Review price CTA dominates too early before proof is understood.
- Whether methodology sections are scannable on mobile.
- Whether report preview and finding cards have enough spacing.

## Dashboard Presence Command Snapshot

Source surface: `src/app/dashboard/dashboard-presence-command-snapshot.tsx`

Current visual command:

- The dashboard snapshot shows Presence Score, next move, five pillars, Choice Gap, Repair Queue, and Control Snapshot.
- The main action is Open Free Scan result.
- The snapshot uses a command-center card layout rather than a generic dashboard grid.
- The visual order moves from state to next move to repair and control.

Do not regress:

- Keep current state obvious.
- Keep next action visible.
- Keep Choice Gap, Repair Queue, and Control Snapshot distinct.
- Keep dashboard clarity higher than decoration.
- Keep the snapshot tied to `getPresenceReportPackage()` instead of hardcoded presentation data.

Next review:

- Whether five pillar cards remain readable at tablet width.
- Whether the next move card needs stronger priority than the score card.
- Whether Repair Queue should expose a clearer link to the next paid command.

## Plans, FAQ, and mobile flows

Status: needs next visual-command review.

Required review questions:

- Does each plan show the safest next command without overloading the buyer?
- Does FAQ reduce hesitation without hiding limits?
- Does mobile preserve command hierarchy, readable cards, and spacing?
- Does every CTA connect back to Free Scan, Review, Repair, Control, Contact Us, or dashboard continuation?

## Release use

Before a future visual change is marked ready, add or update the relevant surface section in this register when the change affects homepage, sample report, protected Free Scan report, dashboard snapshot, plans, FAQ, or mobile command hierarchy.
