import { buildMetadata } from "@/lib/seo";
import Link from "next/link";

const BRAND_NAME = "Cendorq";

export const metadata = buildMetadata({
  title: "Cendorq | Business Command Intelligence",
  description:
    "Cendorq helps business owners find the hidden reason customers do not choose them, then shows the right next move before they buy the wrong fix.",
  path: "/",
  keywords: [
    "cendorq",
    "business command intelligence",
    "ai search visibility",
    "customer hesitation analysis",
    "business clarity system",
    "website trust analysis",
    "conversion decision system",
    "free business scan",
  ],
  image: { alt: "Cendorq business command intelligence homepage." },
});

const DECISION_BREAKS = [
  {
    title: "People do not understand you fast enough.",
    copy: "Your offer may be clear to you, but customers may still be unsure what you do, who it is for, or why it matters now.",
  },
  {
    title: "They do not trust the choice yet.",
    copy: "Weak proof, unclear credibility, thin reviews, or unsupported claims can make people leave without saying why.",
  },
  {
    title: "They find a confusing version of you.",
    copy: "Search, maps, reviews, social profiles, and AI answers may describe your business in a way that weakens the decision.",
  },
  {
    title: "The next step feels harder than leaving.",
    copy: "If contacting, booking, buying, or opening the dashboard feels unclear, interest turns into silence.",
  },
] as const;

const PLAN_PATH = [
  {
    title: "Free Scan",
    price: "$0",
    copy: "Find the first likely break before spending deeper.",
    href: "/free-check",
    cta: "Start free scan",
  },
  {
    title: "Deep Review",
    price: "$300",
    copy: "Get the fuller diagnosis when the business needs evidence and priority.",
    href: "/plans/deep-review",
    cta: "See Deep Review",
  },
  {
    title: "Build Fix / Ongoing Control",
    price: "$750+ / $300 mo",
    copy: "Improve the weak parts or keep the business under monthly review.",
    href: "/plans",
    cta: "Compare pricing",
  },
] as const;

export default function HomePage() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 pb-8 pt-5 text-white sm:px-6 md:pb-12 md:pt-8">
      <HomeAtmosphere />

      <section className="relative z-10 grid gap-6 lg:min-h-[calc(100vh-8rem)] lg:grid-cols-[1.05fr_0.95fr] lg:items-center" aria-label="Cendorq entry">
        <div className="max-w-5xl">
          <p className="text-sm font-semibold text-cyan-100">Find why customers leave before you buy the fix.</p>
          <h1 className="system-hero-title mt-4 max-w-5xl text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl xl:text-[5.7rem]">
            Become the business customers understand, trust, find, and choose.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            {BRAND_NAME} finds the hidden reason customers hesitate, then shows the right next move before you buy the wrong fix.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/free-check" className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Start free scan
            </Link>
            <Link href="/plans" className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              View pricing
            </Link>
          </div>
          <p className="mt-5 max-w-2xl text-sm font-medium leading-6 text-slate-400">Free first read. Clear pricing. Protected platform after verification.</p>
          <p className="sr-only">Free first read. Clear pricing when you need the next depth.</p>
        </div>

        <aside className="system-panel-authority rounded-[1.7rem] p-5 sm:p-6" aria-label="What Cendorq checks first">
          <h2 className="text-2xl font-semibold tracking-tight text-white">What is stopping the decision?</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">Cendorq looks at the parts customers judge before they contact you.</p>
          <div className="mt-5 grid gap-3">
            {[
              "Can they understand you quickly?",
              "Do they trust you enough to continue?",
              "Can search and AI describe you correctly?",
              "Is the next step obvious?",
            ].map((item) => (
              <div key={item} className="rounded-[1.15rem] border border-white/10 bg-slate-950/45 px-4 py-3 text-sm font-medium leading-6 text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="relative z-10 mt-7 rounded-[1.7rem] border border-cyan-300/14 bg-[radial-gradient(circle_at_top_right,rgba(103,232,249,0.1),transparent_34%),rgba(2,8,23,0.68)] p-5 shadow-[0_24px_80px_rgba(2,8,23,0.32)] sm:p-7" aria-label="Why Cendorq matters now">
        <h2 className="max-w-5xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          Customers decide before they talk to you.
        </h2>
        <p className="mt-5 max-w-4xl text-base leading-8 text-slate-300 sm:text-lg">
          They compare your site, search results, maps, reviews, social proof, and AI answers. If the story is unclear, the proof feels weak, or the next step is hard, they leave quietly.
        </p>
      </section>

      <section className="relative z-10 mt-7 grid gap-4 lg:grid-cols-4" aria-label="Decision breaks">
        {DECISION_BREAKS.map((block) => (
          <article key={block.title} className="system-surface rounded-[1.45rem] p-5">
            <h2 className="text-xl font-semibold tracking-tight text-white">{block.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{block.copy}</p>
          </article>
        ))}
      </section>

      <section className="relative z-10 mt-7 rounded-[1.7rem] border border-white/10 bg-slate-950/55 p-5 sm:p-7" aria-label="Cendorq pricing options">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">Start small. Move deeper only when it makes sense.</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">No fake urgency. No wrong-depth push. Diagnosis comes before bigger spend.</p>
          </div>
          <Link href="/plans" className="text-sm font-semibold text-cyan-200 transition hover:text-white">View pricing from $0 -&gt;</Link>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {PLAN_PATH.map((plan) => (
            <Link key={plan.title} href={plan.href} className="rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-5 transition hover:border-cyan-300/24 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-2xl font-semibold tracking-tight text-white">{plan.title}</h3>
                <span className="text-sm font-semibold text-cyan-100">{plan.price}</span>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-300">{plan.copy}</p>
              <span className="mt-5 inline-flex text-sm font-semibold text-cyan-100">{plan.cta} -&gt;</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

function HomeAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-16 top-10 h-72 w-72 rounded-full bg-cyan-400/8 blur-3xl sm:h-96 sm:w-96" />
      <div className="absolute -right-20 top-32 h-64 w-64 rounded-full bg-sky-400/8 blur-3xl sm:h-80 sm:w-80" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.016]" />
    </div>
  );
}
