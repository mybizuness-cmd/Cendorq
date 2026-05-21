import type { PlanPageData } from "@/components/plans/conversion-plan-page";

export const FREE_SCAN_PLAN: PlanPageData & { href: string; label: string } = {
  href: "/free-check",
  label: "Free Scan",
  eyebrow: "Scan",
  title: "Start with the first AI Visibility and Readiness signal",
  gradient: "before paid depth.",
  intro:
    "Free Scan gives the business a clean first read on where it may be missing, unclear, under-trusted, less ready, or harder for customers and AI engines to choose.",
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
    "Deep Review explains why customers and AI engines may not see, understand, trust, compare, or choose the business yet.",
  ctaHref: "/checkout/start?plan=deep-review",
  ctaLabel: "Start Deep Review",
  secondaryHref: "/free-check",
  secondaryLabel: "Start Free Scan",
  painTitle: "Bigger changes without evidence can make the wrong problem more expensive.",
  painCopy:
    "A redesign, more ads, or random optimization can look productive while still missing the reason customers and AI answers hesitate. Deep Review makes the likely cause visible before Repair work begins.",
  stats: [
    { label: "Best for", value: "Businesses that need proof before bigger action." },
    { label: "Main result", value: "Diagnosis evidence, readiness gaps, priorities, and a clearer next command." },
    { label: "Risk reduced", value: "Repairing the wrong problem faster." },
    { label: "Comes after", value: "Free Scan or a strong internal first signal." },
  ],
  features: [
    { title: "Expose the cause", copy: "See whether the issue is visibility gaps, readiness gaps, clarity, trust proof, page friction, or comparison pressure." },
    { title: "Protect the budget", copy: "Stop spending on work that does not solve why customers, search, or AI answers hesitate." },
    { title: "Create the path", copy: "Leave with a cleaner decision on whether the next step should be Build Fix, Ongoing Control, or something else." },
  ],
  fit: {
    good: [
      "You know something is off, but cannot explain the cause clearly.",
      "You are considering bigger changes and want confidence before spending.",
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
    "This is the right depth when the business needs the real reason before it commits to Build Fix or Ongoing Control.",
};

export const BUILD_FIX_PLAN: PlanPageData & { href: string; label: string } = {
  href: "/plans/build-fix",
  label: "Build Fix",
  eyebrow: "Repair",
  title: "Repair the signal",
  gradient: "customers notice first.",
  intro:
    "Build Fix improves one approved page, message, proof point, visibility gap, readiness gap, or action path that may be making the business harder to see, understand, trust, or choose.",
  ctaHref: "/checkout/start?plan=build-fix",
  ctaLabel: "Start Build Fix",
  secondaryHref: "/plans",
  secondaryLabel: "View Plans",
  painTitle: "Focused Repair matters more than more activity.",
  painCopy:
    "A business can keep changing things and still leave the true weak point untouched. Build Fix focuses work where customers decide whether to believe, compare, call, book, or leave.",
  stats: [
    { label: "Best for", value: "Businesses ready to move from evidence into action." },
    { label: "Main result", value: "A stronger customer-facing and AI-readable path." },
    { label: "Risk reduced", value: "Cosmetic work that does not improve decisions." },
    { label: "Comes after", value: "Deep Review or a clear internal priority." },
  ],
  features: [
    { title: "Strengthen trust", copy: "Improve the parts that help people believe the business is credible, current, real, and safe to choose." },
    { title: "Sharpen the message", copy: "Make the offer easier to understand and harder to confuse with every other option in the market." },
    { title: "Clean the action path", copy: "Reduce friction so serious customers know what to do next and feel more confident doing it." },
  ],
  fit: {
    good: [
      "The business knows what needs work and is ready to improve it.",
      "The website, message, proof, or page flow is making the business harder to find or choose.",
      "You want focused Repair, not more vague advice.",
    ],
    bad: [
      "The real problem is still unclear and needs Review first.",
      "You want random activity instead of focused priorities.",
      "You expect one Repair pass to replace future improvement forever.",
    ],
  },
  finalTitle: "Use Build Fix when the business is ready for focused improvement.",
  finalCopy:
    "This is the right depth when the next value comes from strengthening the page, message, trust, proof, readiness, and action path customers actually use.",
};

export const ONGOING_CONTROL_PLAN: PlanPageData & { href: string; label: string } = {
  href: "/plans/ongoing-control",
  label: "Ongoing Control",
  eyebrow: "Control",
  title: "Keep AI Visibility and Readiness from drifting",
  gradient: "as search and customers change.",
  intro:
    "Ongoing Control keeps visibility, readiness, clarity, trusted proof, public signals, AI understanding, and customer action paths under ongoing review.",
  ctaHref: "/checkout/start?plan=ongoing-control",
  ctaLabel: "Start Ongoing Control",
  secondaryHref: "/plans",
  secondaryLabel: "View Plans",
  painTitle: "A strong business signal can weaken when nobody is watching it.",
  painCopy:
    "Markets change. Competitors move. Search surfaces shift. AI answers evolve. Customer expectations move. Ongoing Control keeps the business from treating trust, visibility, and readiness like a one-time project.",
  stats: [
    { label: "Best for", value: "Businesses with a strong enough base to maintain and improve." },
    { label: "Main result", value: "Continued direction, monitoring, and controlled adjustment." },
    { label: "Risk reduced", value: "Letting the customer-facing signal decay after strong work." },
    { label: "Comes after", value: "Build Fix or an already-strong internal base." },
  ],
  features: [
    { title: "Keep improving", copy: "Give the business steady attention instead of waiting until the signal feels weak again." },
    { title: "Adapt faster", copy: "Respond to changes in competitors, search behavior, AI answers, customer expectations, and business priorities." },
    { title: "Protect the base", copy: "Keep the stronger system from drifting, getting stale, or losing the clarity that made it work." },
  ],
  fit: {
    good: [
      "The business already has a strong enough base to maintain and improve.",
      "You want continued direction instead of occasional emergency fixes.",
      "The business needs a steady system, not a one-time push.",
    ],
    bad: [
      "The business still needs a first Scan or evidence-backed Review.",
      "The foundation is too unclear for ongoing Control to be useful yet.",
      "You want monthly work to replace the earlier clarity and Repair stages.",
    ],
  },
  finalTitle: "Use Ongoing Control when the business is ready to keep compounding.",
  finalCopy:
    "This is the right depth when the base is strong enough and the next challenge is continued attention, adjustment, readiness, and control over time.",
};

export const PLANS = [FREE_SCAN_PLAN, DEEP_REVIEW_PLAN, BUILD_FIX_PLAN, ONGOING_CONTROL_PLAN] as const;