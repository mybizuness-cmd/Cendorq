import type { PlanPageData } from "@/components/plans/conversion-plan-page";

export const FREE_SCAN_PLAN: PlanPageData & { href: string; label: string } = {
  href: "/free-check",
  label: "Free Scan",
  eyebrow: "Free first step",
  title: "Find what is making people hesitate",
  gradient: "before you spend more.",
  intro:
    "A guided free scan for businesses that feel stronger than their current online read. It helps reveal whether people are confused, unsure, comparing you away, or leaving before they act.",
  ctaHref: "/free-check",
  ctaLabel: "Start free scan",
  secondaryHref: "/plans/deep-review",
  secondaryLabel: "See deep review",
  painTitle: "Most businesses do not need a bigger fix first. They need a clearer first read.",
  painCopy:
    "When the problem is unclear, paying for more strategy, more build work, or more ongoing support can waste money. The scan gives the business a safer first move.",
  stats: [
    { label: "Best for", value: "Businesses that are unsure what is blocking trust, clarity, or action." },
    { label: "Main result", value: "A clearer first direction before choosing deeper work." },
    { label: "Buyer risk reduced", value: "Spending too early on the wrong fix." },
    { label: "Commitment", value: "Free guided first step." },
  ],
  features: [
    {
      title: "Find the hesitation",
      copy: "See whether customers may be stopping because they do not understand, do not trust, or do not see why they should choose you.",
    },
    {
      title: "Stop guessing",
      copy: "Get a clearer first read before paying for heavier decisions or bigger changes.",
    },
    {
      title: "Know the next move",
      copy: "If deeper help makes sense, the scan makes the next step easier to understand and easier to choose.",
    },
  ],
  fit: {
    good: [
      "The business looks better in real life than it feels online.",
      "People visit, compare, or ask questions but do not choose fast enough.",
      "You want the safest first step before paying for deeper work.",
    ],
    bad: [
      "You already know the exact problem and are ready for implementation now.",
      "You want guaranteed rankings, guaranteed leads, or fake certainty.",
      "You do not want to answer basic business questions clearly.",
    ],
  },
  finalTitle: "Start with the free scan when the real problem is still unclear.",
  finalCopy:
    "The scan is the cleanest first move because it helps reveal what is making customers pause before you commit to deeper spend.",
};

export const DEEP_REVIEW_PLAN: PlanPageData & { href: string; label: string } = {
  href: "/plans/deep-review",
  label: "Deep Review",
  eyebrow: "Paid plan 01",
  title: "Know what is broken",
  gradient: "before you try to fix it.",
  intro:
    "Deep Review is for businesses that already know a surface answer is not enough. It explains what is weakening trust, clarity, positioning, and customer action before bigger changes begin.",
  ctaHref: "/plans/build-fix",
  ctaLabel: "See build fix",
  secondaryHref: "/free-check",
  secondaryLabel: "Start free scan",
  painTitle: "Making bigger changes without a clear diagnosis is how businesses waste money.",
  painCopy:
    "More content, a redesign, ads, or random optimization can feel productive while still attacking the wrong problem. This plan protects the next investment by making the real issue easier to see.",
  stats: [
    { label: "Best for", value: "Businesses that need a real explanation before bigger action." },
    { label: "Main result", value: "Clearer priorities and a stronger reason for the next move." },
    { label: "Buyer risk reduced", value: "Fixing the wrong problem faster." },
    { label: "Comes after", value: "Free Scan or a clear internal first signal." },
  ],
  features: [
    {
      title: "Expose the real problem",
      copy: "See whether the slowdown is coming from trust, message clarity, positioning, page flow, or a mix of issues.",
    },
    {
      title: "Protect the budget",
      copy: "Avoid spending on a fix that looks impressive but does not solve the reason people hesitate.",
    },
    {
      title: "Create a sharper path",
      copy: "Walk away with a cleaner direction for whether the next move should be build work, ongoing support, or something else.",
    },
  ],
  fit: {
    good: [
      "You know something is wrong, but you cannot explain the real cause clearly.",
      "You are considering bigger changes and want better confidence before spending.",
      "The business feels misunderstood, under-trusted, or too easy to compare away.",
    ],
    bad: [
      "You only need a quick first read and should start with the free scan.",
      "You already know exactly what needs to be built next.",
      "You want reassurance instead of a clear diagnosis.",
    ],
  },
  finalTitle: "Use Deep Review when clarity is the thing missing before bigger work.",
  finalCopy:
    "This is the right plan when the business needs a stronger explanation before it commits to implementation or ongoing support.",
};

export const BUILD_FIX_PLAN: PlanPageData & { href: string; label: string } = {
  href: "/plans/build-fix",
  label: "Build Fix",
  eyebrow: "Paid plan 02",
  title: "Strengthen the parts",
  gradient: "customers judge first.",
  intro:
    "Build Fix is focused implementation for businesses that already know what needs to improve and are ready to strengthen the page, message, trust signals, and path to action.",
  ctaHref: "/plans/ongoing-control",
  ctaLabel: "See ongoing control",
  secondaryHref: "/plans/deep-review",
  secondaryLabel: "See deep review",
  painTitle: "The right changes matter more than more changes.",
  painCopy:
    "A business can look busy improving things and still leave the weak points untouched. Build Fix focuses effort where it can make the business easier to understand, trust, and choose.",
  stats: [
    { label: "Best for", value: "Businesses ready to move from diagnosis into action." },
    { label: "Main result", value: "A stronger business presence with clearer customer movement." },
    { label: "Buyer risk reduced", value: "Cosmetic changes that do not improve decisions." },
    { label: "Comes after", value: "Deep Review or a clear internal diagnosis." },
  ],
  features: [
    {
      title: "Strengthen trust",
      copy: "Improve the parts that help people believe the business is credible, current, real, and safe to choose.",
    },
    {
      title: "Sharpen the message",
      copy: "Make the offer easier to understand and harder to confuse with every other option in the market.",
    },
    {
      title: "Improve the action path",
      copy: "Reduce friction so serious customers know what to do next and feel more confident doing it.",
    },
  ],
  fit: {
    good: [
      "The business already knows what needs work and is ready to improve it.",
      "The current website, message, or page flow is making the business harder to choose.",
      "You want focused work, not more vague advice.",
    ],
    bad: [
      "The real problem is still unclear and needs Deep Review first.",
      "You want random activity instead of focused priorities.",
      "You expect one build pass to replace every future improvement need.",
    ],
  },
  finalTitle: "Use Build Fix when the business is ready for real improvement work.",
  finalCopy:
    "This is the right plan when the next value comes from strengthening the page, message, trust, and action path customers actually use.",
};

export const ONGOING_CONTROL_PLAN: PlanPageData & { href: string; label: string } = {
  href: "/plans/ongoing-control",
  label: "Ongoing Control",
  eyebrow: "Paid plan 03",
  title: "Keep the business sharp",
  gradient: "as the market changes.",
  intro:
    "Ongoing Control is for businesses that already have a stronger base and need continued attention, adjustment, and direction so the presence does not drift, weaken, or fall behind.",
  ctaHref: "/contact",
  ctaLabel: "Talk through fit",
  secondaryHref: "/plans",
  secondaryLabel: "Compare plans",
  painTitle: "A strong business presence can still weaken when nobody is watching it.",
  painCopy:
    "Markets change. Competitors move. Search surfaces shift. Customer expectations evolve. Ongoing Control keeps the business from treating visibility like a one-time project.",
  stats: [
    { label: "Best for", value: "Businesses with a strong enough base to keep improving." },
    { label: "Main result", value: "Continued direction, monitoring, and controlled adjustment." },
    { label: "Buyer risk reduced", value: "Letting the presence decay after a strong build." },
    { label: "Comes after", value: "Build Fix or an already-strong internal base." },
  ],
  features: [
    {
      title: "Keep improving",
      copy: "Give the business ongoing attention instead of waiting until the presence feels weak again.",
    },
    {
      title: "Adapt faster",
      copy: "Adjust to changes in competitors, search behavior, customer expectations, and business priorities.",
    },
    {
      title: "Protect the base",
      copy: "Keep the stronger system from drifting, getting stale, or losing the clarity that made it work.",
    },
  ],
  fit: {
    good: [
      "The business already has a strong enough base to maintain and improve.",
      "You want continued direction instead of occasional emergency fixes.",
      "The business needs a steady system, not a one-time push.",
    ],
    bad: [
      "The business still needs a first scan or deep diagnosis.",
      "The foundation is too unclear for ongoing control to be useful yet.",
      "You want monthly work to replace the earlier clarity and build stages.",
    ],
  },
  finalTitle: "Use Ongoing Control when the business is ready to keep compounding.",
  finalCopy:
    "This is the right plan when the base is strong enough and the next challenge is continued attention, adjustment, and control over time.",
};

export const PLANS = [FREE_SCAN_PLAN, DEEP_REVIEW_PLAN, BUILD_FIX_PLAN, ONGOING_CONTROL_PLAN] as const;
