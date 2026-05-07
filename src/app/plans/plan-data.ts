import type { PlanPageData } from "@/components/plans/conversion-plan-page";

export const FREE_SCAN_PLAN: PlanPageData & { href: string; label: string } = {
  href: "/free-check",
  label: "Free Scan",
  eyebrow: "Scan",
  title: "Find the first market signal",
  gradient: "before you spend deeper.",
  intro:
    "A guided free scan for business owners who know the market should understand, trust, and choose them faster — but do not want to guess what to fix first.",
  ctaHref: "/free-check",
  ctaLabel: "Start free scan",
  secondaryHref: "/plans/deep-review",
  secondaryLabel: "See Diagnose",
  painTitle: "Most businesses do not need more noise first. They need to know what the market is missing.",
  painCopy:
    "More ads, more SEO, more redesign ideas, or random fixes can waste money when the real market signal is unclear. The scan gives the business a safer first read.",
  stats: [
    { label: "Best for", value: "Owners who feel the business should be found, trusted, and chosen faster." },
    { label: "Main result", value: "A clearer first signal before paying for deeper work." },
    { label: "Risk reduced", value: "Spending too early on the wrong fix." },
    { label: "Commitment", value: "Free guided first step." },
  ],
  features: [
    {
      title: "Find the signal",
      copy: "See where customers, search, or AI answers may be losing clarity, trust, choice, or action.",
    },
    {
      title: "Stop guessing",
      copy: "Start with a sharper first read before paying for diagnosis, implementation, or monthly control.",
    },
    {
      title: "Choose the right depth",
      copy: "If deeper help makes sense, the scan makes the next command stage easier to understand and easier to choose.",
    },
  ],
  fit: {
    good: [
      "The business is good, but the market is not choosing fast enough.",
      "People visit, compare, ask questions, or disappear without choosing.",
      "You want the safest first step before deeper spend.",
    ],
    bad: [
      "You already know exactly what needs to be built and are ready for implementation.",
      "You want guaranteed rankings, guaranteed leads, or fake certainty.",
      "You do not want to answer simple business questions clearly.",
    ],
  },
  finalTitle: "Start with Scan when the real market signal is still unclear.",
  finalCopy:
    "It is the cleanest first move because it helps reveal what may be keeping customers, search, or AI answers from understanding the business clearly.",
};

export const DEEP_REVIEW_PLAN: PlanPageData & { href: string; label: string } = {
  href: "/plans/deep-review",
  label: "Deep Review",
  eyebrow: "Diagnose",
  title: "Prove what is breaking",
  gradient: "before you fix the wrong thing.",
  intro:
    "Deep Review is for businesses that need the real reason the market is not finding, trusting, understanding, or choosing them. It turns scattered symptoms into a cause-level diagnosis.",
  ctaHref: "/plans/build-fix",
  ctaLabel: "See Fix",
  secondaryHref: "/free-check",
  secondaryLabel: "Start Scan",
  painTitle: "Bigger changes without diagnosis can make the wrong problem look expensive.",
  painCopy:
    "A redesign, more content, more ads, or random optimization can feel productive while still missing the reason the market does not choose. Deep Review protects the next investment by making the real cause visible.",
  stats: [
    { label: "Best for", value: "Businesses that need proof before bigger action." },
    { label: "Main result", value: "Cause-level priorities and a stronger reason for the next move." },
    { label: "Risk reduced", value: "Fixing the wrong problem faster." },
    { label: "Comes after", value: "Free Scan or a strong internal first signal." },
  ],
  features: [
    {
      title: "Expose the real cause",
      copy: "See whether the slowdown is coming from weak trust, unclear words, poor positioning, page friction, visibility gaps, or comparison pressure.",
    },
    {
      title: "Protect the budget",
      copy: "Stop spending on work that looks impressive but does not solve why customers, search, or AI answers hesitate.",
    },
    {
      title: "Create the path",
      copy: "Leave with a cleaner decision on whether the next command should be Fix, Control, or something else.",
    },
  ],
  fit: {
    good: [
      "You know something is wrong, but cannot explain the cause clearly.",
      "You are considering bigger changes and want confidence before spending.",
      "The business feels misunderstood, under-trusted, or too easy to compare away.",
    ],
    bad: [
      "You only need a quick first read and should start with Scan.",
      "You already know exactly what needs to be built next.",
      "You want reassurance instead of a real diagnosis.",
    ],
  },
  finalTitle: "Use Diagnose when proof is the missing piece before bigger work.",
  finalCopy:
    "This is the right command when the business needs the real reason before it commits to implementation or monthly control.",
};

export const BUILD_FIX_PLAN: PlanPageData & { href: string; label: string } = {
  href: "/plans/build-fix",
  label: "Build Fix",
  eyebrow: "Fix",
  title: "Strengthen the parts",
  gradient: "the market judges first.",
  intro:
    "Build Fix is focused implementation for businesses ready to make the page, message, trust signals, proof, and action path stronger — without wasting motion on things that do not move the decision.",
  ctaHref: "/plans/ongoing-control",
  ctaLabel: "See Control",
  secondaryHref: "/plans/deep-review",
  secondaryLabel: "See Diagnose",
  painTitle: "The right changes matter more than more changes.",
  painCopy:
    "A business can look busy improving things and still leave the weak points untouched. Build Fix focuses effort where customers decide whether to believe, compare, call, book, or leave.",
  stats: [
    { label: "Best for", value: "Businesses ready to move from diagnosis into action." },
    { label: "Main result", value: "A stronger market-facing path with clearer customer movement." },
    { label: "Risk reduced", value: "Cosmetic changes that do not improve decisions." },
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
      title: "Clean the action path",
      copy: "Reduce friction so serious customers know what to do next and feel more confident doing it.",
    },
  ],
  fit: {
    good: [
      "The business knows what needs work and is ready to improve it.",
      "The website, message, proof, or page flow is making the business harder to choose.",
      "You want focused work, not more vague advice.",
    ],
    bad: [
      "The real problem is still unclear and needs Diagnose first.",
      "You want random activity instead of focused priorities.",
      "You expect one build pass to replace future improvement forever.",
    ],
  },
  finalTitle: "Use Fix when the business is ready for real improvement work.",
  finalCopy:
    "This is the right command when the next value comes from strengthening the page, message, trust, proof, and action path customers actually use.",
};

export const ONGOING_CONTROL_PLAN: PlanPageData & { href: string; label: string } = {
  href: "/plans/ongoing-control",
  label: "Ongoing Control",
  eyebrow: "Control",
  title: "Keep the business sharp",
  gradient: "as search and customers change.",
  intro:
    "Ongoing Control is for businesses with a strong enough base that need continued attention, monitoring, adjustment, and direction so market understanding does not drift, weaken, or fall behind.",
  ctaHref: "/connect",
  ctaLabel: "Talk through fit",
  secondaryHref: "/plans",
  secondaryLabel: "Compare command path",
  painTitle: "A strong market presence can still weaken when nobody is watching it.",
  painCopy:
    "Markets change. Competitors move. Search surfaces shift. AI answers evolve. Customer expectations move. Ongoing Control keeps the business from treating trust and visibility like a one-time project.",
  stats: [
    { label: "Best for", value: "Businesses with a strong enough base to keep improving." },
    { label: "Main result", value: "Continued direction, monitoring, and controlled adjustment." },
    { label: "Risk reduced", value: "Letting the market presence decay after strong work." },
    { label: "Comes after", value: "Build Fix or an already-strong internal base." },
  ],
  features: [
    {
      title: "Keep improving",
      copy: "Give the business steady attention instead of waiting until the presence feels weak again.",
    },
    {
      title: "Adapt faster",
      copy: "Respond to changes in competitors, search behavior, AI answers, customer expectations, and business priorities.",
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
  finalTitle: "Use Control when the business is ready to keep compounding.",
  finalCopy:
    "This is the right command when the base is strong enough and the next challenge is continued attention, adjustment, and control over time.",
};

export const PLANS = [FREE_SCAN_PLAN, DEEP_REVIEW_PLAN, BUILD_FIX_PLAN, ONGOING_CONTROL_PLAN] as const;
