import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildMetadata,
  buildServiceJsonLd,
  buildWebPageJsonLd,
  toJsonLd,
} from "@/lib/seo";
import Link from "next/link";
import type { ReactNode } from "react";

const BRAND_NAME = "Cendorq";

const contactEmail = normalizeEmail(process.env.NEXT_PUBLIC_CONTACT_EMAIL);
const directEmailHref = contactEmail ? `mailto:${contactEmail}` : "";

export const metadata = buildMetadata({
  title: "Connect | Cendorq",
  description:
    "Choose the right Cendorq next move: start the free scan, compare plans, or use direct contact when the question is already clear.",
  path: "/connect",
  keywords: ["cendorq connect", "cendorq contact", "free scan", "deep review", "build fix", "ongoing control"],
  image: { alt: "Cendorq connect page." },
});

const ROUTES = [
  {
    label: "Start here if unsure",
    title: "Free Scan",
    copy: "Use this when you need to find what is making people hesitate before spending more.",
    href: "/free-check",
    cta: "Start free scan",
    highlighted: true,
  },
  {
    label: "Need the real reason",
    title: "Deep Review",
    copy: "Use this when you know something is wrong, but you need to understand what and why.",
    href: "/plans/deep-review",
    cta: "See deep review",
  },
  {
    label: "Ready to fix it",
    title: "Build Fix",
    copy: "Use this when the weak points are clear and the business needs stronger pages, message, trust, or action flow.",
    href: "/plans/build-fix",
    cta: "See build fix",
  },
  {
    label: "Need continued control",
    title: "Ongoing Control",
    copy: "Use this when the business already has a stronger base and needs continued direction and adjustment.",
    href: "/plans/ongoing-control",
    cta: "See ongoing control",
  },
] as const;

const FAQS = [
  {
    question: "Should I contact first or start the free scan?",
    answer:
      "Start the free scan if the problem is still unclear. Use direct contact when you already know what stage you are in and need to discuss fit, scope, or timing.",
  },
  {
    question: "What if I am not sure which plan fits?",
    answer:
      "That is exactly why the free scan exists. It gives the business a safer first read before choosing a deeper plan.",
  },
  {
    question: "When does direct contact make sense?",
    answer:
      "Direct contact makes sense when the question is already clear enough to discuss fit, scope, timing, or ongoing control without replacing the scan or review stage.",
  },
] as const;

export default function ConnectPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq Connect",
    description: "A concise routing page that helps businesses choose the right next Cendorq move.",
    path: "/connect",
  });

  const serviceJsonLd = buildServiceJsonLd({
    title: "Cendorq Connection Routing",
    description:
      "A simple routing page for choosing between the free scan, paid plans, and direct contact.",
    path: "/connect",
    serviceType: "Business presence routing",
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Connect", path: "/connect" },
  ]);

  const faqJsonLd = buildFaqJsonLd(FAQS);

  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-8 text-white sm:px-6 md:py-12 xl:py-14">
      <ConnectAtmosphere />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />

      <section className="relative z-10 grid gap-8 lg:min-h-[calc(100vh-8rem)] lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <div>
          <TopChip>Choose the right lane</TopChip>
          <h1 className="system-hero-title mt-5 max-w-5xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl xl:text-[4.75rem]">
            Get to the right next move without making the path harder.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            {BRAND_NAME} works best when the business enters the right lane. Start with the free scan when the problem is unclear. Use direct contact only when the question is already sharp enough.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="/free-check" className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition">
              Start free scan
            </Link>
            <Link href="/plans" className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition">
              Compare plans
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {ROUTES.map((item) => (
            <RouteCard key={item.href} {...item} />
          ))}
        </div>
      </section>

      <section className="relative z-10 mt-12 grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-start">
        <div className="system-panel-authority rounded-[2rem] p-6 sm:p-8">
          <TopChip>Direct contact</TopChip>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Use direct contact when the question is already clear.
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-300">
            Direct contact is strongest for fit, scope, timing, and ongoing control questions. It should not replace the free scan when the business still needs a first read.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            {contactEmail ? (
              <a href={directEmailHref} className="system-button-primary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition">
                Email Cendorq
              </a>
            ) : null}
            <Link href="/free-check" className="system-button-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold transition">
              Start free scan instead
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          {FAQS.map((item, index) => (
            <FaqCard key={item.question} question={item.question} answer={item.answer} highlighted={index === 0} />
          ))}
        </div>
      </section>
    </main>
  );
}

function RouteCard({
  label,
  title,
  copy,
  href,
  cta,
  highlighted = false,
}: {
  label: string;
  title: string;
  copy: string;
  href: string;
  cta: string;
  highlighted?: boolean;
}) {
  return (
    <article className={highlighted ? "system-panel-authority rounded-[1.7rem] p-5" : "system-surface rounded-[1.7rem] p-5"}>
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200">{label}</div>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-slate-300">{copy}</p>
      <Link href={href} className={highlighted ? "system-button-primary mt-5 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition" : "system-button-secondary mt-5 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition"}>
        {cta}
      </Link>
    </article>
  );
}

function FaqCard({ question, answer, highlighted = false }: { question: string; answer: string; highlighted?: boolean }) {
  return (
    <article className={highlighted ? "system-panel-authority rounded-[1.5rem] p-5" : "system-surface rounded-[1.5rem] p-5"}>
      <h3 className="text-xl font-semibold tracking-tight text-white">{question}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{answer}</p>
    </article>
  );
}

function TopChip({ children }: { children: ReactNode }) {
  return (
    <div className="system-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">
      <span className="system-pulse-dot inline-flex h-2 w-2 rounded-full bg-cyan-300" />
      {children}
    </div>
  );
}

function ConnectAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-10 top-8 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl sm:h-96 sm:w-96" />
      <div className="absolute -right-8 top-24 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl sm:h-80 sm:w-80" />
      <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/8 blur-3xl sm:h-[24rem] sm:w-[24rem]" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.025]" />
    </div>
  );
}

function normalizeEmail(value: string | undefined) {
  const cleaned = (value || "").trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned) ? cleaned : "";
}
