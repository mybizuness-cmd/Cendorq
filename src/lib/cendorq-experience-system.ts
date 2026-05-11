export const CENDORQ_EXPERIENCE_SYSTEM = {
  pageShell: "min-h-screen overflow-hidden bg-slate-50 text-slate-950",
  atmosphericShell: "relative overflow-hidden bg-gradient-to-b from-white via-sky-50 to-slate-50",
  maxWidth: "mx-auto max-w-7xl",
  heroGrid: "relative mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center",
  eyebrow: "inline-flex rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 shadow-sm backdrop-blur",
  heroHeadline: "text-[clamp(3.05rem,14vw,6.35rem)] font-semibold leading-[0.88] tracking-[-0.084em] text-slate-950 sm:text-[clamp(3.4rem,8vw,6.35rem)] lg:text-[clamp(3.4rem,6.25vw,6.35rem)]",
  pageHeadline: "text-[clamp(2.85rem,12vw,5.9rem)] font-semibold leading-[0.92] tracking-[-0.078em] text-slate-950 sm:text-[clamp(3.1rem,7vw,5.9rem)] lg:text-[clamp(3rem,5.8vw,5.9rem)]",
  sectionHeadline: "text-[clamp(2.45rem,10vw,5.2rem)] font-semibold leading-[0.96] tracking-[-0.07em] text-slate-950 sm:text-[clamp(2.8rem,6vw,5.2rem)] lg:text-[clamp(2.6rem,4.8vw,5.2rem)]",
  cardHeadline: "text-3xl font-semibold leading-tight tracking-[-0.055em] text-slate-950",
  body: "text-base font-medium leading-8 text-slate-600 sm:text-lg sm:leading-8",
  supportText: "text-sm font-medium leading-7 text-slate-600",
  mutedText: "text-sm font-medium leading-7 text-slate-500",
  mobileActionRow: "grid gap-3 sm:flex sm:flex-row",
  mobileTouchButton: "min-h-14 w-full sm:w-auto",
  primaryButton: "inline-flex min-h-14 items-center justify-center rounded-full border border-slate-950 bg-white px-8 py-4 text-base font-semibold text-slate-950 shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 active:translate-y-0 sm:w-auto",
  secondaryButton: "inline-flex min-h-14 items-center justify-center rounded-full border border-slate-200 bg-white/70 px-8 py-4 text-base font-semibold text-slate-700 shadow-sm backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 active:translate-y-0 sm:w-auto",
  glassPanel: "rounded-[2.2rem] border border-white/80 bg-white/70 p-2.5 shadow-2xl backdrop-blur-2xl sm:rounded-[3rem] sm:p-3",
  whitePanel: "rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl sm:rounded-[2.5rem] sm:p-8",
  darkPanel: "rounded-[2.25rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-2xl sm:rounded-[3rem] sm:p-8 lg:p-12",
  card: "rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 active:translate-y-0 sm:rounded-[1.85rem]",
} as const;

export const CENDORQ_TYPOGRAPHY_STANDARD = {
  hero: "Use only on the main homepage-level emotional idea. Large and cinematic, but capped for laptop and mobile readability.",
  page: "Use on major subpage heroes such as Plans, Free Scan, and Login. Premium but calmer than homepage hero.",
  section: "Use for chapter headings and decision sections. Big enough to feel premium without overwhelming cards.",
  body: "Use medium weight and readable contrast. Avoid faint low-contrast body copy on public pages.",
  support: "Use for card and form support copy. Keep at least text-sm with font-medium and leading-7.",
} as const;

export const CENDORQ_MOBILE_EXPERIENCE_STANDARD = {
  priority: "Mobile is a first-class experience because most traffic is expected to come from phones.",
  hero: "Mobile first fold must show the core message, primary action, and enough visual depth without requiring awkward sideways scanning.",
  actions: "Primary actions must be thumb-friendly, full-width when stacked, and at least min-h-14.",
  cards: "Cards must stack cleanly, avoid long clutter walls, and keep text readable at mobile widths.",
  forms: "Forms must feel guided, calm, and easy to complete with clear touch targets.",
  motion: "Use visual depth carefully; do not add heavy effects that slow mobile interaction.",
} as const;

export const CENDORQ_EXPERIENCE_GUARDRAILS = [
  "World-class visual experience without copying another brand's layout, imagery, animation, or identity.",
  "Uncluttered pages with one clear customer action at a time.",
  "Cendorq-specific signal language: clarity, trust, proof, choice, readiness, and control.",
  "Public pages stay simple while private dashboards feel like the same premium product system.",
  "Typography is cinematic but capped so laptop and mobile screens do not crop awkwardly.",
  "Body copy stays readable with medium weight and enough contrast.",
  "Mobile is a first-class premium experience with thumb-friendly actions and clean stacking.",
] as const;

export const CENDORQ_SIGNAL_WORDS = ["Clarity", "Trust", "Proof", "Choice"] as const;
