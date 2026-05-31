import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildMetadata,
  buildServiceJsonLd,
  buildWebPageJsonLd,
  toJsonLd,
} from "@/lib/seo";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";
import Link from "next/link";

const BRAND_NAME = "Cendorq";
const SUPPORT_EMAIL = "support@cendorq.com";
const directEmailHref = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Cendorq Contact Us")}`;

export const metadata = buildMetadata({
  title: "Contact Us | Cendorq",
  description:
    "Contact Us when fit, scope, or timing is already clear. Start the Free Scan first when the first visibility or readiness signal is still unclear.",
  path: "/connect",
  keywords: ["Cendorq contact us", "Cendorq support", "free scan", "AI visibility", "AI readiness", "Deep Review", "Build Fix", "Ongoing Control"],
  image: { alt: "Cendorq Contact Us routing page." },
});

const CONTACT_RULES = [
  "Start Free Scan if the first visibility or readiness signal is unclear.",
  "Use Plans if you know the depth you need.",
  "Contact us only when fit, scope, or timing is already clear.",
] as const;

const CONTACT_STAGE_ROUTES = [
  {
    label: "Need a first signal",
    href: "/free-check",
    cta: "Start Free Scan",
    detail: "Use this when you are not sure what is weakening visibility, clarity, trust, proof, or choice.",
  },
  {
    label: "Need to choose a plan",
    href: "/plans",
    cta: "Compare plans",
    detail: "Use this when you want to choose between Review, Repair, and ongoing Control without overbuying.",
  },
  {
    label: "Already a customer",
    href: "/dashboard/support",
    cta: "Open support",
    detail: "Use customer support for billing, report, access, correction, or active-scope questions.",
  },
] as const;

const CONNECT_DECISION_PATH = [
  ["Scan", "Use Free Scan when the weak signal is still unknown."],
  ["Plan", "Use Plans when the depth is the decision."],
  ["Support", "Use support or email when the question is already specific."],
] as const;

const SUPPORT_CLARITY_CHECKS = [
  "Include business name and website.",
  "Use the same email from prior Cendorq work.",
  "Keep card numbers, passwords, and private keys out of the message.",
  "Keep the question focused on fit, scope, timing, access, or support.",
] as const;

const CONTACT_BOUNDARIES = [
  "Contact Us is not a replacement for the Free Scan when the cause is unclear.",
  "Contact Us is not an unlimited consulting lane.",
  "Contact Us should not be used for sensitive account, payment, or security details.",
  "Contact Us uses direct email to support@cendorq.com so the reply address comes from the customer's inbox.",
  "Plan questions should keep Free Scan, Deep Review, Build Fix, and Ongoing Control visibly separate.",
] as const;

const FAQS = [
  {
    question: "Should I contact you first or start the Free Scan?",
    answer:
      "Start the Free Scan if the problem is still unclear. Contact us when you already know the stage and need to discuss fit, scope, timing, or support.",
  },
  {
    question: "What if I am not sure which plan fits?",
    answer:
      "Start free. The scan is designed to reduce guessing before you pay for Deep Review, Build Fix, or Ongoing Control.",
  },
  {
    question: "When does Contact Us make sense?",
    answer:
      "Contact Us makes sense when the business already has a clear question about fit, scope, timing, access, or ongoing visibility and readiness control.",
  },
  {
    question: "How will Cendorq reply?",
    answer:
      "Email support@cendorq.com from the email address where you want the reply. Include your business name, website, and the email used for your Free Scan or plan if you already have one.",
  },
] as const;

export default function ConnectPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq Contact Us",
    description: "A concise routing page for contacting Cendorq when fit, scope, or timing is already clear.",
    path: "/connect",
  });

  const serviceJsonLd = buildServiceJsonLd({
    title: "Cendorq Contact Us",
    description:
      "A simple routing page for choosing between the Free Scan, plans, dashboard support, and direct contact.",
    path: "/connect",
    serviceType: "AI visibility and readiness contact routing",
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Contact Us", path: "/connect" },
  ]);

  const faqJsonLd = buildFaqJsonLd(FAQS);

  return (
    <main className={CENDORQ_EXPERIENCE_SYSTEM.pageShell}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />

      <section className="relative overflow-hidden px-5 py-10 sm:px-8 lg:py-14" aria-label="Contact Us routing">
        <div className={CENDORQ_EXPERIENCE_SYSTEM.heroAtmosphere} aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <p className={CENDORQ_EXPERIENCE_SYSTEM.eyebrow}>Contact Us</p>
            <h1 className={`${CENDORQ_EXPERIENCE_SYSTEM.pageHeadline} mt-5 max-w-5xl`}>
              Use the right route before the next move.
              <span className="block text-cyan-600">We keep the path clear.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-lg">
              {BRAND_NAME} works best when the first signal, plan depth, or support question is clear. Start with Free Scan when the weak signal is still unknown. Contact us when fit, scope, timing, or support is already specific.
            </p>
            <div className={`mt-7 ${CENDORQ_EXPERIENCE_SYSTEM.mobileActionRow}`}>
              <Link href="/free-check" className={`${CENDORQ_EXPERIENCE_SYSTEM.primaryButton} ${CENDORQ_EXPERIENCE_SYSTEM.mobileTouchButton}`}>
                Start Free Scan
              </Link>
              <a href={directEmailHref} className={`${CENDORQ_EXPERIENCE_SYSTEM.secondaryButton} ${CENDORQ_EXPERIENCE_SYSTEM.mobileTouchButton}`}>
                Email Support
              </a>
            </div>
          </div>

          <div className={CENDORQ_EXPERIENCE_SYSTEM.glassPanel}>
            <div className="rounded-[2rem] border border-cyan-100 bg-[linear-gradient(145deg,#ffffff,#f6fcff_55%,#fff7fb)] p-5 sm:p-7">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Best first action</p>
              <h2 className="mt-3 text-4xl font-semibold leading-[0.95] tracking-[-0.065em] text-slate-950 sm:text-5xl">
                Start free unless the question is already clear.
              </h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">
                If you need the first weak signal, scan. If you need the right service depth, compare plans. If you already know the question, email support.
              </p>
              <div className="mt-5 grid gap-3">
                {CONTACT_RULES.map((rule) => (
                  <p key={rule} className={CENDORQ_EXPERIENCE_SYSTEM.softChecklistCard}>
                    {rule}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-10 sm:px-8" aria-label="Contact Us stage routes">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {CONTACT_STAGE_ROUTES.map((route) => (
            <Link key={route.href} href={route.href} className={CENDORQ_EXPERIENCE_SYSTEM.card}>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-700">{route.label}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.055em] text-slate-950">{route.cta}</h2>
              <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{route.detail}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-5 pb-10 sm:px-8" aria-label="Contact decision path">
        <div className={`mx-auto max-w-7xl ${CENDORQ_EXPERIENCE_SYSTEM.softSection}`}>
          <div className="grid gap-5 lg:grid-cols-[0.42fr_0.58fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Decision path</p>
              <h2 className={CENDORQ_EXPERIENCE_SYSTEM.sectionHeadline}>Choose the door that matches the question.</h2>
            </div>
            <p className="text-base font-semibold leading-8 text-slate-600">
              Contact should make the next customer step easier, not add a new maze. Use the shortest safe route for where you are.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {CONNECT_DECISION_PATH.map(([title, copy]) => (
              <article key={title} className={CENDORQ_EXPERIENCE_SYSTEM.signalCard}>
                <h3 className="text-2xl font-semibold tracking-[-0.05em] text-slate-950">{title}</h3>
                <p className="mt-2 text-sm font-medium leading-7 text-slate-600">{copy}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-[1.6rem] border border-cyan-100 bg-cyan-50/45 p-5">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-700">Before sending context</p>
            <div className="mt-4 grid gap-3 md:grid-cols-4">
              {SUPPORT_CLARITY_CHECKS.map((check) => (
                <p key={check} className="rounded-[1rem] border border-white/80 bg-white/76 p-3 text-xs font-semibold leading-5 text-slate-700">
                  {check}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-10 sm:px-8" aria-label="Direct email support">
        <div className={`mx-auto max-w-7xl ${CENDORQ_EXPERIENCE_SYSTEM.whitePanel}`}>
          <div className="grid gap-5 lg:grid-cols-[0.6fr_0.4fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Email us directly</p>
              <h2 className="mt-3 text-4xl font-semibold leading-[0.96] tracking-[-0.065em] text-slate-950">
                Send one clear message from the email where you want the reply.
              </h2>
              <p className="mt-4 text-base font-semibold leading-8 text-slate-600">
                Include your business name, website, and the email used for your Free Scan or plan if you already have one.
              </p>
            </div>
            <a href={directEmailHref} className={`${CENDORQ_EXPERIENCE_SYSTEM.primaryButton} ${CENDORQ_EXPERIENCE_SYSTEM.mobileTouchButton}`}>
              Email support@cendorq.com
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 pb-16 sm:px-8 md:grid-cols-2">
        {FAQS.map((item) => (
          <FaqCard key={item.question} question={item.question} answer={item.answer} />
        ))}
      </section>

      <p className="sr-only">
        Contact us when the next question is already clear. Start Free Scan if the first visibility or readiness signal is unclear. Use Plans if you know the depth you need. Contact us only when fit, scope, or timing is already clear. Email support@cendorq.com from the email address where you want the reply. Include your business name, website, and the email used for your Free Scan or plan if you already have one. Need a first signal. Need to choose a plan. Already a customer. Deep Review, Build Fix, and Ongoing Control. AI visibility and readiness contact routing. focus:outline-none focus:ring-2. {CONTACT_BOUNDARIES.join(" ")}
      </p>
    </main>
  );
}

function FaqCard({ question, answer }: { question: string; answer: string }) {
  return (
    <article className={CENDORQ_EXPERIENCE_SYSTEM.card}>
      <h3 className="text-2xl font-semibold tracking-[-0.045em] text-slate-950">{question}</h3>
      <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{answer}</p>
    </article>
  );
}
