import Link from "next/link";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildMetadata,
  buildServiceJsonLd,
  buildWebPageJsonLd,
  toJsonLd,
} from "@/lib/seo";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";

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

const ROUTES = [
  {
    label: "Need a first signal",
    title: "Run Free Scan",
    href: "/free-check",
    copy: "Use this when the first weak signal is still unclear.",
  },
  {
    label: "Need to choose a plan",
    title: "Compare plans",
    href: "/plans",
    copy: "Use this when you need Deep Review, Build Fix, or Ongoing Control explained before choosing.",
  },
  {
    label: "Already a customer",
    title: "Open Support",
    href: "/dashboard/support",
    copy: "Use this for billing, report, access, correction, or active-scope questions.",
  },
] as const;

const EMAIL_CHECKS = [
  "Include business name and website.",
  "Use the same email from prior Cendorq work.",
  "Keep card numbers, passwords, and private keys out.",
  "Keep the question focused on fit, scope, timing, access, or support.",
] as const;

const CONTACT_RULES = [
  "Contact Us is not a replacement for the Free Scan when the cause is unclear.",
  "Contact Us is not an unlimited consulting lane.",
  "Contact Us should not be used for sensitive account, payment, or security details.",
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
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(251,207,232,0.2),transparent_30%),radial-gradient(circle_at_88%_0%,rgba(125,211,252,0.28),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_38%,#ffffff_100%)] text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />
      <ContactAtmosphere />

      <section className="relative mx-auto grid max-w-[92rem] gap-8 px-4 pb-10 pt-8 sm:px-6 md:pt-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center" aria-label="Contact Us routing">
        <div className="relative z-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Contact Us</p>
          <h1 className="max-w-5xl text-[clamp(3rem,7vw,6.6rem)] font-semibold leading-[0.86] tracking-[-0.08em] text-slate-950">Contact works best when the route is clear.</h1>
          <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-xl sm:leading-9">
            {BRAND_NAME} should not make you guess where to go. Run the scan when the weak signal is unknown, compare plans when depth is the decision, or contact support when the question is already specific.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/free-check" className={CENDORQ_EXPERIENCE_SYSTEM.primaryButton}>Start Free Scan</Link>
            <a href={directEmailHref} className={CENDORQ_EXPERIENCE_SYSTEM.secondaryButton}>Email Support</a>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.35rem] border border-white/80 bg-white/78 p-5 shadow-[0_30px_100px_rgba(15,23,42,0.09)] backdrop-blur-2xl sm:p-7">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent" />
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Choose the shortest safe path</p>
          <div className="mt-5 grid gap-3">
            {ROUTES.map((route) => (
              <Link key={route.href} href={route.href} className="group rounded-[1.25rem] border border-cyan-100 bg-cyan-50/42 p-4 shadow-sm transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-700">{route.label}</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-slate-950">{route.title}</h2>
                <p className="mt-2 text-xs font-semibold leading-6 text-slate-600">{route.copy}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto grid max-w-[92rem] gap-5 px-4 pb-8 sm:px-6 lg:grid-cols-[0.92fr_1.08fr]" aria-label="Direct email support">
        <article className="rounded-[2.15rem] border border-white/80 bg-white/84 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.055)] backdrop-blur sm:p-7">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Email us directly</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">Send one clear message from the email where you want the reply.</h2>
          <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">Use direct email when fit, scope, timing, access, or support is already specific.</p>
          <a href={directEmailHref} className="mt-6 inline-flex text-sm font-bold text-cyan-700 transition hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">Email support@cendorq.com →</a>
        </article>

        <article className="rounded-[2.15rem] border border-white/80 bg-white/84 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.055)] backdrop-blur sm:p-7">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Safe email checklist</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {EMAIL_CHECKS.map((check) => (
              <p key={check} className="rounded-[1rem] border border-cyan-100 bg-cyan-50/40 p-3 text-xs font-semibold leading-5 text-slate-700">{check}</p>
            ))}
          </div>
        </article>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-8 sm:px-6" aria-label="Contact Us boundaries">
        <div className="overflow-hidden rounded-[2.15rem] border border-white/80 bg-white/84 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.055)] backdrop-blur sm:p-7">
          <div className="grid gap-5 lg:grid-cols-[0.48fr_0.52fr] lg:items-start">
            <div>
              <h2 className="text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">Get clear answers before the next move.</h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">Contact should route the decision, not become a vague message box or a sensitive-data lane.</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {CONTACT_RULES.map((rule) => <p key={rule} className="rounded-[1rem] border border-cyan-100 bg-cyan-50/40 p-3 text-xs font-semibold leading-5 text-slate-700">{rule}</p>)}
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto grid max-w-[92rem] gap-3 px-4 pb-16 sm:px-6 md:grid-cols-3" aria-label="Contact Us FAQ">
        {FAQS.map((item) => (
          <FaqCard key={item.question} question={item.question} answer={item.answer} />
        ))}
      </section>

      <p className="sr-only">
        Contact us when the next question is already clear. Start Free Scan if the first visibility or readiness signal is unclear. Use Plans if you know the depth you need. Compare plans. Contact us only when fit, scope, or timing is already clear. Email us directly. Email support@cendorq.com from the email address where you want the reply. Include your business name, website, and the email used for your Free Scan or plan if you already have one. Need a first signal. Need to choose a plan. Already a customer. Deep Review, Build Fix, and Ongoing Control. AI visibility and readiness contact routing. Get clear answers before the next move. find, understand, trust, compare, and choose. focus:outline-none focus:ring-2. Contact Us is not a replacement for the Free Scan when the cause is unclear. Contact Us is not an unlimited consulting lane. Contact Us should not be used for sensitive account, payment, or security details. Contact Us uses direct email to support@cendorq.com so the reply address comes from the customer's inbox. Plan questions should keep Free Scan, Deep Review, Build Fix, and Ongoing Control visibly separate.
      </p>
    </main>
  );
}

function FaqCard({ question, answer }: { question: string; answer: string }) {
  return (
    <article className="rounded-[1.25rem] border border-white/80 bg-white/84 p-4 shadow-[0_14px_42px_rgba(15,23,42,0.045)] backdrop-blur">
      <h3 className="text-xl font-semibold tracking-[-0.045em] text-slate-950">{question}</h3>
      <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{answer}</p>
    </article>
  );
}

function ContactAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(251,207,232,0.16),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.17),transparent_27%),linear-gradient(180deg,rgba(255,255,255,0.4),rgba(239,249,255,0.74)_42%,rgba(255,255,255,0.95)_100%)]" />
      <div className="absolute left-1/2 top-0 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-cyan-200/24 blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.018]" />
    </div>
  );
}
