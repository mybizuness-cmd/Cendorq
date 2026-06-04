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
- clear Scan, Review, Repair, and Control separation
- Choice Gap and Repair Queue language only where it helps the decision

## Homepage `/`

Source surface: `src/app/page.tsx`, `src/components/homepage/homepage-clarity-reset.tsx`, `src/components/homepage/cendorq-product-motion-demo.tsx`

Current visual command:

- The page leads with AI Search Presence Repair.
- The main command is Start Free Scan.
- Secondary commands stay visible: See Sample Report, View Plans, and Read FAQ.
- The hero pairs category positioning with an interactive Presence Report product-motion preview.
- The product motion now has Pause / Play, reduced-motion support, and manual scene selection.
- The page explains Scan, Review, Repair, and Control as one simple path.
- The read-order strip says: Read signal, See gap, Move once.

Do not regress:

- Keep Start Free Scan as the clearest first command.
- Keep Sample Report and Plans secondary.
- Keep Free Scan framed as a first signal.
- Keep Review, Repair, and Control distinct.
- Keep the visual tone premium, restrained, and evidence-led.
- Keep product motion controllable and respectful of reduced motion.

Next review:

- Live screenshot confirmation at 390px, 430px, 768px, 1024px, and 1440px.
- Whether the Presence Report preview is immediately understandable without crowding.
- Whether the product-motion card feels like a useful product preview rather than decoration.

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

## Dashboard `/dashboard`

Source surface: `src/app/dashboard/page.tsx`, `src/app/dashboard/dashboard-presence-command-snapshot.tsx`

Current visual command:

- The dashboard acts like a decision surface, not a clutter wall.
- The snapshot shows Presence Score, next move, five pillars, Choice Gap, Repair Queue, and Control Snapshot.
- The main action is Open Free Scan result.
- The read-order strip says: Check state, Open proof, Move once.
- The page keeps reports, billing, notifications, support, business command center, action inbox, and validation anchors connected.

Do not regress:

- Keep current state obvious.
- Keep next action visible.
- Keep Choice Gap, Repair Queue, and Control Snapshot distinct.
- Keep dashboard clarity higher than decoration.
- Keep the snapshot tied to `getPresenceReportPackage()` instead of hardcoded presentation data.
- Keep customer-owned routing clear and safe.

Next review:

- Live screenshot confirmation that five pillar cards remain readable at tablet width.
- Whether the next move card needs stronger priority than the score card.
- Whether Repair Queue should expose a clearer link to the next paid command.
- Whether the dashboard read-order strip reduces decision load without pushing key proof too low.

## Billing `/dashboard/billing`

Source surface: `src/app/dashboard/billing/page.tsx`

Current visual command:

- Billing is framed as AI Visibility plan depth, not a generic payment page.
- The read-order strip says: Verify state, Match depth, Recover safely.
- Review, Repair, and Control are separated so payment does not imply the wrong operating layer.
- Support and plan-detail routes remain visible for safe recovery and depth choice.

Do not regress:

- Keep billing calm, exact, and recoverable.
- Keep card/payment detail safety copy visible.
- Keep plan depth separated from account state.
- Keep plan-detail pages ahead of payment pressure.

Next review:

- Confirm mobile card order makes current access and next depth obvious.
- Confirm support recovery never feels like a second checkout path.

## Notifications `/dashboard/notifications`

Source surface: `src/app/dashboard/notifications/page.tsx`

Current visual command:

- Notifications are framed as an AI Visibility signal feed.
- The read-order strip says: Name signal, Open source, Act once.
- Proof, access, support, and security alerts route to the exact surface before deeper action.
- Support lifecycle notification list, priority feed, featured signals, and quiet-feed rules remain intact.

Do not regress:

- Keep one safe primary action per notification.
- Keep signals pointed to proof, access, status, or secure sign-in.
- Keep the feed from turning into generic notification clutter.
- Keep no raw internal detail in customer-facing alerts.

Next review:

- Confirm notification cards remain scannable on mobile.
- Confirm plan CTAs do not overpower proof or status actions.

## Support routing `/dashboard/support`

Source surface: `src/app/dashboard/support/page.tsx`

Current visual command:

- Support is framed as AI Visibility support routing.
- The read-order strip says: Check status, Route narrow, Submit safely.
- Routes are separated for access issue, proof question, repair scope, control priority, account access, and correction or dispute.
- Plan support boundaries keep Scan, Review, Repair, and Control distinct.

Do not regress:

- Keep status review ahead of duplicate request creation.
- Keep the narrowest path rule visible.
- Keep support from becoming a dumping ground.
- Keep paid-plan links as plan-detail pages before payment.

Next review:

- Confirm the route selector is usable on mobile without feeling heavy.
- Confirm support boundaries are readable before a user starts a request.

## Support status `/dashboard/support/status`

Source surface: `src/app/dashboard/support/status/page.tsx`

Current visual command:

- Status is framed as a calm resolution surface.
- The read-order strip says: Read status, Follow ask, Return lane.
- Status actions route to status review, safe update, and command depth.
- SupportStatusList remains the source display for customer-safe status states.

Do not regress:

- Keep status states clear without exposing internal notes.
- Keep waiting-on-customer copy narrow and safe.
- Keep resolved or closed language bounded.
- Keep customers returning to the right lane after a blocker is clear.

Next review:

- Confirm the status list is visually primary enough after the hero.
- Confirm update and billing routes do not compete with the status action.

## Support request `/dashboard/support/request`

Source surface: `src/app/dashboard/support/request/page.tsx`

Current visual command:

- Intake is framed as protected support intake.
- The read-order strip says: Check gates, Choose mode, Write safe.
- Work-start gates clarify Review, Repair, and Control prerequisites before backend work starts.
- New request and update modes stay separated to reduce duplicate support noise.

Do not regress:

- Keep gates visible before the form.
- Keep new blocker and asked-for-context paths separated.
- Keep safe summary guidance visible beside the form.
- Keep status-first behavior visible before updates.

Next review:

- Confirm form sections do not fall too low on mobile.
- Confirm the work-start gates clarify rather than slow the user.

## Legal trust surfaces `/privacy`, `/terms`, `/disclaimer`

Source surfaces: `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`, `src/app/disclaimer/page.tsx`

Current visual command:

- Privacy has a read-order strip: Submit carefully, Use verified access, Ask for review.
- Terms has a read-order strip: Choose route, Check scope, Use safely.
- Disclaimer has a read-order strip: Read evidence, Check boundary, Choose depth.
- All three legal surfaces now behave like practical trust and boundary pages, not just legal copy.
- All three preserve no-guarantee posture and route customers toward Free Scan, dashboard support, Terms, Privacy, or plan depth as appropriate.

Do not regress:

- Keep legal pages light, premium, and readable.
- Keep no-guarantee language visible and plain.
- Keep customer action routes clear.
- Keep plan boundaries consistent with Scan, Review, Repair, and Control.

Next review:

- Confirm legal pages stay readable on mobile without dense blocks.
- Confirm support and Free Scan CTAs do not make legal pages feel sales-heavy.

## Route recovery `/not-found`

Source surface: `src/app/not-found.tsx`

Current visual command:

- 404 recovery uses the current light Cendorq visual system.
- The read-order strip says: Recover, Route, Continue.
- Safe routes point to Start Free Scan, Sample Report, Plans, and Customer Access.
- The page avoids exposing private dashboard details.

Do not regress:

- Keep route recovery useful, not decorative.
- Keep public safe routes visible.
- Keep Customer Access separate from public report and plan paths.

Next review:

- Confirm the 404 page feels like a controlled recovery point and not a dead end.

## Header, footer, metadata, and share surfaces

Source surfaces: `src/layout/site-header-conversion.tsx`, `src/layout/site-footer.tsx`, `src/lib/seo.ts`, `src/app/opengraph-image.tsx`, `src/app/twitter-image.tsx`, `src/app/icon.tsx`, `src/app/apple-icon.tsx`, `src/app/manifest.ts`, `src/app/robots.ts`, `src/app/sitemap.ts`

Current visual command:

- Header wide-screen badge uses Scan → Review → Repair → Control.
- Footer path uses Scan, Review, Repair, and Control.
- SEO, Open Graph image, Twitter image, app icon, Apple icon, manifest, robots, and sitemap now align with the current light premium Cendorq direction.
- Public shortcuts emphasize Start Free Scan, Sample Report, and Plans.

Do not regress:

- Keep header mobile compression focused on the main buyer path.
- Keep footer helpful without becoming a heavy plan section.
- Keep share images and icons aligned with AI Search Presence Repair, Presence Report, Choice Gap, and Repair Queue.
- Keep private/dashboard paths out of public crawler encouragement.

Next review:

- Confirm generated images render correctly in preview cards.
- Confirm manifest shortcuts and crawler routes stay public-safe.
- Confirm header and footer remain readable on mobile.

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

Source surfaces: homepage, sample report, protected Free Scan report, dashboard, billing, notifications, support, plans, FAQ, legal pages, and route recovery.

Current visual command:

- Primary surfaces already use stacked mobile layouts, touch-sized buttons, rounded cards, and single-column progression where needed.
- The protected Free Scan report now resolves the known source-level paid-pressure risk by putting report reading before the Review CTA.
- Dashboard, billing, notifications, support, support status, support request, privacy, terms, disclaimer, and route recovery now include read-order strips.
- The key remaining mobile risk is rendered density: compressed cards, proof sections appearing too low, or CTAs becoming too loud after responsive wrapping.

Do not regress:

- Keep one dominant next action per screen band.
- Keep cards readable without cramping.
- Keep proof, limits, and next command visible before high-commitment paid actions.
- Keep Contact Us and Customer Access reachable without competing with the main buyer path.
- Keep mobile surfaces from becoming compressed desktop pages.

Next review:

- Run live device-width screenshots for homepage, `/plans`, `/faq`, `/sample-report`, `/dashboard`, `/dashboard/reports/free-scan`, `/dashboard/billing`, `/dashboard/notifications`, `/dashboard/support`, `/dashboard/support/status`, `/dashboard/support/request`, `/privacy`, `/terms`, `/disclaimer`, and the 404 route.
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
- Dashboard `/dashboard`
- Billing `/dashboard/billing`
- Notifications `/dashboard/notifications`
- Support `/dashboard/support`
- Support status `/dashboard/support/status`
- Support request `/dashboard/support/request`
- Privacy `/privacy`
- Terms `/terms`
- Disclaimer `/disclaimer`
- Route recovery `/not-found`
- Header, footer, metadata, share images, icons, robots, sitemap, and manifest

Widths inspected:

- 390px mobile portrait by source-level mobile-first layout inspection
- 430px large mobile portrait by source-level mobile-first layout inspection
- 768px tablet portrait by `md` and `sm` breakpoint inspection
- 1024px tablet landscape by `lg` breakpoint inspection
- 1440px desktop by max-width and desktop grid inspection

Strongest pass:

- Homepage, FAQ, Sample Report, protected report preview, dashboard, billing, notifications, support, legal pages, and route recovery use mobile-first stacking, touch-sized actions, and larger-grid promotion only at tablet or desktop breakpoints.
- Plans keeps Scan, Review, Repair, and Control separated and keeps no-guarantee copy in the plan separation section.
- Sample Report keeps the report object before evidence boundaries, next-move policy, vertical samples, and example-not-promise copy.
- Dashboard and customer support surfaces now use explicit read-order strips to reduce decision load.
- Share, icon, manifest, header, footer, sitemap, and robots surfaces now align with the light premium Cendorq command path.

Highest-risk mobile issue:

- Live rendered screenshots are still required before calling the device-width protocol fully complete.
- The strongest source-level risk remains density across cards and repeated read-order strips on narrow screens.
- If live mobile screenshots show paid-action pressure before proof comprehension on `/dashboard/reports/free-scan`, further demote or reposition the Deep Review CTA.

Required fix or no-fix decision:

- Source-code visual fixes have been applied across the protected Free Scan report, dashboard, billing, notifications, support, support status, support request, privacy, terms, disclaimer, route recovery, header, footer, homepage motion, share images, icons, manifest, robots, sitemap, SEO, agent playbooks, and owner manual.
- A future live screenshot pass is still required before calling the device-width protocol fully complete.

Release-captain decision:

- Source-level device-width review is acceptable as a guarded review record.
- The protected Free Scan CTA ordering fix is accepted at source level.
- The current read-order expansion is accepted at source level.
- Do not treat this as final screenshot approval.
- Next visual execution should capture or inspect real rendered output at 390px, 430px, 768px, 1024px, and 1440px and update this register with screenshot-based findings.

## Release use

Before a future visual change is marked ready, add or update the relevant surface section in this register when the change affects homepage, sample report, protected Free Scan report, dashboard, billing, notifications, support, legal trust pages, route recovery, header, footer, generated images, icons, sitemap, robots, manifest, FAQ, plans, or mobile command hierarchy.
