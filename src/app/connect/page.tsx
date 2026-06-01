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

const ROUTES = [
  {
    label: "Start here",
    title: "Run Free Scan",
    href: "/free-check",
    copy: "Use this when the first weak signal is still unclear.",
  },
  {
    label: "Choose depth",
    title: "View Plans",
    href: "/plans",
    copy: "Use this when you need Review, Repair, or Control explained before choosing.",
  },
  {
    label: "Customer help",
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
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(251,207,232,0.2),transparent_30%),radial-gradient(circle_at_88%_0%,rgba(125,211,252,0.28),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_38%,#ffffff_100%)] text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />

      <section className="relative px-5 py-10 sm:px-8 lg:py-14" aria-label="Contact Us routing">
        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.74fr_1.26fr] lg:items-end">
          <div>
            <h1 className="max-w-5xl text-[clamp(3rem,8vw,6.35rem)] font-semibold leading-[0.86] tracking-[-0.09em] text-slate-950">
              Contact works best when the route is clear.
            </h1>
            <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-lg">
              {BRAND_NAME} should not make you guess where to go. Run the scan when the weak signal is unknown, compare plans when depth is the decision, or contact support when the question is already specific.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/free-check" className={CENDORQ_EXPERIENCE_SYSTEM.primaryButton}>Run Free Scan</Link>
              <a href={directEmailHref} className={CENDORQ_EXPERIENCE_SYSTEM.secondaryButton}>Email Support</a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/80 bg-white/82 p-5 shadow-[0_22px_70px_rgba(14,165,233,0.09)] backdrop-blur sm:p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Choose the shortest safe path</p>
            <div className="mt-4 grid gap-3">
              {ROUTES.map((route) => (
                <Link key={route.href} href={route.href} className="group rounded-[1.25rem] border border-cyan-100 bg-white/88 p-4 shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-50/45 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-700">{route.label}</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-slate-950">{route.title}</h2>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{route.copy}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8" aria-label="Direct email support">
        <div className="rounded-[2rem] border border-cyan-100 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.05)] sm:p-6">
          <div className="grid gap-5 lg:grid-cols-[0.58fr_1.42fr] lg:items-start">
            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">
                Send one clear message from the email where you want the reply.
              </h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600 sm:text-base">
                Use direct email when fit, scope, timing, access, or support is already specific.
              </p>
              <a href={directEmailHref} className="mt-6 inline-flex text-sm font-bold text-cyan-700 transition hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">Email support@cendorq.com →</a>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {EMAIL_CHECKS.map((check) => (
                <p key={check} className="rounded-[1rem] border border-cyan-100 bg-cyan-50/34 p-3 text-xs font-semibold leading-5 text-slate-700">{check}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 pb-16 sm:px-8 md:grid-cols-3">
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
    <article className="rounded-[1.25rem] border border-cyan-100 bg-white/88 p-4 shadow-sm">
      <h3 className="text-xl font-semibold tracking-[-0.045em] text-slate-950">{question}</h3>
      <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">{answer}</p>
    </article>
  );
}
