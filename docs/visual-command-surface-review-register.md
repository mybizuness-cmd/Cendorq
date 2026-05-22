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

- Live screenshot confirmation at 390px, 430px, 768px, 1024px, and 1440px.
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

- Live screenshot confirmation that the report object is readable on mobile before the evidence panels.
- Whether vertical sample cards feel helpful rather than noisy.
- Whether the example-not-promise section is visible enough before conversion.

## Protected Free Scan Presence Report `/dashboard/reports/free-scan`

Source surface: `src/app/dashboard/reports/free-scan/page.tsx`

Current visual command:

- The page makes the result state clear: Scan, first signal only, next command Review.
- The hero now points to Read Free Scan report first instead of opening paid Review immediately.
- The protected report preview appears before the Proof before paid pressure Review CTA section.
- Evidence, confidence, priority, AI/search posture, and methodology remain separated.
- The page says the Scan cannot claim complete diagnosis, ranking, placement, or lead guarantees.

Do not regress:

- Keep first signal only visible.
- Keep complete diagnosis out of the Free Scan layer.
- Keep the protected report preview before the paid Review CTA.
- Keep Review as the paid next command only when the signal matters enough.
- Keep protected result language separate from public marketing language.
- Keep proof, risk, limit, and next command separate.

Next review:

- Live screenshot confirmation that Read Free Scan report first remains the dominant mobile hero action.
- Live screenshot confirmation that the Proof before paid pressure section does not overpower the protected report preview.
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

- Live screenshot confirmation that five pillar cards remain readable at tablet width.
- Whether the next move card needs stronger priority than the score card.
- Whether Repair Queue should expose a clearer link to the next paid command.

## Plans `/plans`

Source surface: `src/app/plans/page.tsx`

Current visual command:

- The page states the plan decision as AI Visibility and Readiness depth.
- The four cards preserve the operating sequence: Free Scan, Deep Review, Build Fix, Ongoing Control.
- Each plan has one direct CTA: Start Free Scan, Open Review page, Open Repair page, or Open Control page.
- The page uses Presence Report preview to make plan choice report-led instead of pressure-led.
- The plan separation standard states that Cendorq does not guarantee rankings, leads, revenue, or AI placement.

Do not regress:

- Keep Free Scan as the safest starting command when the buyer is unsure.
- Keep Scan, Review, Repair, and Control visually separated.
- Keep paid-plan CTAs direct without making all plans compete equally.
- Keep the Sample Presence Report link visible as an evidence-led path.
- Keep no-guarantee language in the plan separation section.

Next review:

- Live screenshot confirmation that the four plan cards do not feel equally loud on mobile.
- Whether Free Scan needs stronger visual priority for unsure visitors.
- Whether paid plan pages preserve the same Scan, Review, Repair, Control command sequence.

## FAQ `/faq`

Source surface: `src/app/faq/page.tsx`

Current visual command:

- The page gives a simple rule: new visitors start Free Scan, evaluators open Sample Report, returning customers use the same email.
- Quick links route to Start Free Scan, Sample Report, Customer access, Compare plans, and Contact Us.
- FAQ sections reduce hesitation without hiding limits around guarantees, privacy, account access, and plan fit.
- The details pattern keeps the page scannable instead of dumping every answer at once.

Do not regress:

- Keep Start Free Scan first in quick links.
- Keep Sample Report available before plan pressure.
- Keep Customer access and same-email language clear.
- Keep guarantee boundaries explicit.
- Keep Contact Us visible for support paths.

Next review:

- Live screenshot confirmation that quick links wrap cleanly on small screens.
- Whether details summaries have enough tap target spacing.
- Whether high-risk answers about guarantees, privacy, and access remain easy to find.

## Mobile command hierarchy

Source surfaces: homepage, sample report, protected Free Scan report, dashboard snapshot, Plans, and FAQ.

Current visual command:

- Primary surfaces already use stacked mobile layouts, touch-sized buttons, rounded cards, and single-column progression where needed.
- The protected Free Scan report now resolves the known source-level paid-pressure risk by putting report reading before the Review CTA.
- The key remaining mobile risk is rendered density: compressed cards, proof sections appearing too low, or CTAs becoming too loud after responsive wrapping.

Do not regress:

- Keep one dominant next action per screen band.
- Keep cards readable without cramping.
- Keep proof, limits, and next command visible before high-commitment paid actions.
- Keep Contact Us and Customer Access reachable without competing with the main buyer path.
- Keep mobile surfaces from becoming compressed desktop pages.

Next review:

- Run live device-width screenshots for homepage, `/plans`, `/faq`, `/sample-report`, and `/dashboard/reports/free-scan`.
- Check whether price CTAs overpower proof or limits on narrow screens.
- Check whether dashboard and report cards remain readable at tablet widths.

## Device-width source review record

Review type: source-level device-width protocol execution. Live screenshots were not captured in this pass.

Surfaces reviewed:

- Homepage `/`
- Plans `/plans`
- FAQ `/faq`
- Sample Presence Report `/sample-report`
- Protected Free Scan Presence Report `/dashboard/reports/free-scan`
- Protected Free Scan report preview component
- Sample Presence Report component

Widths inspected:

- 390px mobile portrait by source-level mobile-first layout inspection
- 430px large mobile portrait by source-level mobile-first layout inspection
- 768px tablet portrait by `md` and `sm` breakpoint inspection
- 1024px tablet landscape by `lg` breakpoint inspection
- 1440px desktop by max-width and desktop grid inspection

Strongest pass:

- Homepage, FAQ, Sample Report, and the protected report preview use mobile-first stacking, full-width or touch-sized actions, and larger-grid promotion only at tablet or desktop breakpoints.
- Plans keeps Scan, Review, Repair, and Control separated and keeps no-guarantee copy in the plan separation section.
- Sample Report keeps the report object before evidence boundaries, next-move policy, vertical samples, and example-not-promise copy.

Highest-risk mobile issue:

- Protected Free Scan report placed the Deep Review price CTA in the hero before the protected report preview. This source-level risk has been addressed by moving the paid Review CTA after the protected report preview and adding proof-before-paid-pressure framing.

Required fix or no-fix decision:

- Source-code visual fix applied for the protected Free Scan paid-pressure risk.
- A future live screenshot pass is still required before calling the device-width protocol fully complete.
- If live mobile screenshots still show paid-action pressure before proof comprehension on `/dashboard/reports/free-scan`, further demote or reposition the Deep Review CTA.

Release-captain decision:

- Source-level device-width review is acceptable as a guarded review record.
- The protected Free Scan CTA ordering fix is accepted at source level.
- Do not treat this as final screenshot approval.
- Next visual execution should capture or inspect real rendered output at 390px, 430px, 768px, 1024px, and 1440px and update this register with screenshot-based findings.

## Release use

Before a future visual change is marked ready, add or update the relevant surface section in this register when the change affects homepage, sample report, protected Free Scan report, dashboard snapshot, plans, FAQ, or mobile command hierarchy.