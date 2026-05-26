import type { PlanPageData } from "@/components/plans/conversion-plan-page";

export const FREE_SCAN_PLAN: PlanPageData & { href: string; label: string } = {
  href: "/free-check",
  label: "Free Scan",
  eyebrow: "Scan",
  title: "Start with the first AI Visibility and Readiness signal",
  gradient: "before paid depth.",
  intro:
    "Free Scan gives the business a clean first read on visibility and readiness: where it may be missing, unclear, under-trusted, less ready, or harder for customers and AI engines to choose.",
  ctaHref: "/free-check",
  ctaLabel: "Start Free Scan",
  secondaryHref: "/plans",
  secondaryLabel: "View Plans",
  painTitle: "The safest first move is to see what is weak before spending deeper.",
  painCopy:
    "More ads, more content, or a redesign can waste money when the real weak signal is still unknown. Free Scan gives the business a cleaner AI Visibility and Readiness read before paid work.",
  stats: [
    { label: "Best for", value: "Owners who want the safest first step." },
    { label: "Main result", value: "A clearer AI Visibility and Readiness signal before paid work." },
    { label: "Risk reduced", value: "Spending too early on the wrong repair." },
    { label: "Commitment", value: "Free guided first step." },
  ],
  features: [
    { title: "Find the signal", copy: "See where the business may be missing, unclear, under-trusted, less ready, or harder to choose." },
    { title: "Start safely", copy: "Use the first signal before paying for deeper Review or Repair work." },
    { title: "Choose the next depth", copy: "If deeper help makes sense, the scan makes the next command easier to understand." },
  ],
  fit: {
    good: [
      "You know the business should be seen or chosen faster, but you do not know what is weak first.",
      "Customers visit, compare, ask questions, or leave without acting.",
      "You want evidence before spending on bigger work.",
    ],
    bad: [
      "You already know the exact weak point and are ready for implementation.",
      "You need a complete evidence-backed Review instead of a first signal.",
      "You want guaranteed rankings, leads, revenue, or AI placement.",
    ],
  },
  finalTitle: "Start with Scan when the first weak signal is still unclear.",
  finalCopy:
    "It is the cleanest first move because it helps reveal what may be keeping customers and AI engines from seeing, understanding, trusting, or choosing the business clearly.",
};

export const DEEP_REVIEW_PLAN: PlanPageData & { href: string; label: string } = {
  href: "/plans/deep-review",
  label: "Deep Review",
  eyebrow: "Review",
  title: "Find what is weakening AI Visibility and Readiness",
  gradient: "before bigger work begins.",
  intro:
    "Deep Review turns the first signal into evidence: why customers and AI engines may not see, understand, trust, compare, or choose the business yet.",
  ctaHref: "/checkout/start?plan=deep-review",
  ctaLabel: "Start Deep Review",
  secondaryHref: "/free-check",
  secondaryLabel: "Start Free Scan",
  painTitle: "Bigger changes without proof can make the wrong problem more expensive.",
  painCopy:
    "A redesign, more ads, or random optimization can look productive while still missing the reason customers and AI answers hesitate. Deep Review keeps the business in Review until the likely cause is clear enough to choose Repair, Control, or no paid next step yet.",
  stats: [
    { label: "Best for", value: "Businesses that need cause proof before bigger action." },
    { label: "Main result", value: "Diagnosis evidence, readiness gaps, priorities, and a clearer next command." },
    { label: "Risk reduced", value: "Repairing the wrong problem faster." },
    { label: "Comes after", value: "Free Scan or a strong internal first signal." },
  ],
  features: [
    { title: "Prove the gap", copy: "Separate visibility weakness from readiness weakness so the business can see whether the issue is findability, clarity, trust proof, comparison friction, or action path confusion." },
    { title: "Protect the budget", copy: "Review before Repair when the cause still needs proof, so bigger work does not chase the wrong signal." },
    { title: "Create the repair path", copy: "Leave with a cleaner decision on whether the next step should be Build Fix, Ongoing Control, or a smaller no-pressure action first." },
  ],
  fit: {
    good: [
      "You know something is off, but cannot explain the cause clearly.",
      "You are considering bigger changes and want evidence before spending.",
      "The business feels unseen, misunderstood, under-trusted, unready, or too easy to compare away.",
    ],
    bad: [
      "You only need a quick first signal and should start with Free Scan.",
      "You already know exactly what needs to be repaired next.",
      "You want reassurance instead of an honest evidence-backed Review.",
    ],
  },
  finalTitle: "Use Deep Review when proof is the missing piece before bigger work.",
  finalCopy:
    "This is the right depth when the business needs the real reason before it commits to Build Fix, Ongoing Control, or another customer-facing repair path.",
};

export const BUILD_FIX_PLAN: PlanPageData & { href: string; label: string } = {
  href: "/plans/build-fix",
  label: "Build Fix",
  eyebrow: "Repair",
  title: "Repair the signal",
  gradient: "customers notice first.",
  intro:
    "Build Fix turns one approved weak point into scoped Repair: a page, message, proof point, visibility gap, readiness gap, or action path that needs to be clearer before customers act.",
  ctaHref: "/checkout/start?plan=build-fix",
  ctaLabel: "Start Build Fix",
  secondaryHref: "/plans",
  secondaryLabel: "View Plans",
  painTitle: "Focused Repair matters more than more activity.",
  painCopy:
    "More content, more design changes, or more tools can still leave the decision gap untouched. Build Fix keeps the work focused on the specific customer-facing signal that Review or clear internal evidence says should be repaired next.",
  stats: [
    { label: "Best for", value: "Businesses ready to move from evidence into scoped action." },
    { label: "Main result", value: "A stronger customer-facing and AI-readable path." },
    { label: "Risk reduced", value: "Broad rebuilds, cosmetic work, or fixes that do not improve decisions." },
    { label: "Comes after", value: "Deep Review, Free Scan, or a clear approved repair priority." },
  ],
  features: [
    { title: "Repair the approved weak point", copy: "Improve the page, message, proof, readiness gap, or action path that is most likely to affect customer understanding, trust, comparison, or action." },
    { title: "Strengthen proof and clarity", copy: "Make the offer easier to understand, easier to believe, and harder to confuse with every similar option in the market." },
    { title: "Keep the scope controlled", copy: "Focus on the selected repair path without implying unlimited implementation, full rebuilds, guaranteed rankings, leads, revenue, or AI placement." },
  ],
  fit: {
    good: [
      "The weak point is clear enough to improve without another full Review first.",
      "The website, message, proof, or page flow is making the business harder to understand, trust, compare, or choose.",
      "You want focused Repair with a clear customer decision purpose, not more vague activity.",
    ],
    bad: [
      "The real problem is still unclear and needs Review before Repair.",
      "You want a full rebuild, unlimited implementation, or open-ended revision cycles.",
      "You expect one Repair pass to guarantee rankings, leads, revenue, AI placement, or permanent improvement forever.",
    ],
  },
  finalTitle: "Use Build Fix when the next weak point is clear enough to repair.",
  finalCopy:
    "This is the right depth when evidence has already pointed to the repair path and the next value comes from strengthening the page, message, trust, proof, readiness, or action step customers actually use.",
};

export const ONGOING_CONTROL_PLAN: PlanPageData & { href: string; label: string } = {
  href: "/plans/ongoing-control",
  label: "Ongoing Control",
  eyebrow: "Control",
  title: "Keep AI Visibility and Readiness from drifting",
  gradient: "with a monthly Control Snapshot.",
  intro:
    "Ongoing Control gives the business a steady watch layer for visibility, readiness, trusted proof, AI understanding, public signal drift, and the next command that deserves attention.",
  ctaHref: "/checkout/start?plan=ongoing-control",
  ctaLabel: "Start Ongoing Control",
  secondaryHref: "/plans",
  secondaryLabel: "View Plans",
  painTitle: "A strong signal can decay when nobody owns the watch layer.",
  painCopy:
    "Search surfaces shift, AI answers evolve, competitors move, pages age, and customer expectations change. Ongoing Control keeps the business from treating visibility, trust, proof, and readiness like a one-time project after Scan, Review, or Repair.",
  stats: [
    { label: "Best for", value: "Businesses with a strong enough base to monitor, protect, and improve." },
    { label: "Main result", value: "A recurring Control Snapshot, drift view, and clearer next command." },
    { label: "Risk reduced", value: "Letting repaired pages, proof, and customer-facing signals decay quietly." },
    { label: "Comes after", value: "Build Fix, Deep Review, or an already-strong customer-facing base." },
  ],
  features: [
    { title: "Watch the signal", copy: "Track whether visibility, clarity, proof, readiness, public facts, and customer action paths are staying aligned or starting to drift." },
    { title: "Keep the next command clear", copy: "Use a recurring Control Snapshot to decide what needs attention next without turning every signal into noise." },
    { title: "Maintain the boundary", copy: "Control is monitoring and decision support, not a promise of rankings, leads, revenue, AI placement, or algorithm control." },
  ],
  fit: {
    good: [
      "The business already has a strong enough base to protect, monitor, and keep improving.",
      "You want continued direction, monthly signal clarity, and decision support instead of occasional emergency fixes.",
      "The business needs drift, customer expectation changes, competitor movement, and public signal changes kept visible over time.",
    ],
    bad: [
      "The business still needs a first Scan, evidence-backed Review, or scoped Repair before monitoring can help.",
      "The foundation is too unclear for ongoing Control to produce useful next commands yet.",
      "You want monthly work to guarantee rankings, leads, revenue, AI placement, or replace earlier Review and Repair depth.",
    ],
  },
  finalTitle: "Use Ongoing Control when the business is ready to keep the signal watched.",
  finalCopy:
    "This is the right depth when the base is strong enough and the next challenge is recurring attention, drift visibility, readiness control, and a calm next command over time.",
};

export const PLANS = [FREE_SCAN_PLAN, DEEP_REVIEW_PLAN, BUILD_FIX_PLAN, ONGOING_CONTROL_PLAN] as const;
