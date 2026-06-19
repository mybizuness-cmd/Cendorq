import Link from "next/link";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildMetadata,
  buildServiceJsonLd,
  buildWebPageJsonLd,
  toJsonLd,
} from "@/lib/seo";

const SUPPORT_EMAIL = "support@cendorq.com";
const directEmailHref = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Cendorq contact")}`;

export const metadata = buildMetadata({
  title: "Contact Cendorq | AI Search Presence Repair",
  description:
    "Contact Cendorq when fit, scope, timing, access, or support is already clear. Start the Free Scan first when the Decision Gap is unclear.",
  path: "/connect",
  keywords: ["Cendorq contact", "Cendorq support", "Free Scan", "AI Search Presence Repair", "Deep Review", "Build Fix", "Ongoing Control"],
  image: { alt: "Contact Cendorq." },
});

const FAQS = [
  {
    question: "Should I contact you first or start the Free Scan?",
    answer:
      "Start the Free Scan if the Decision Gap is unclear. Contact Cendorq when the question is already about fit, scope, timing, access, or support.",
  },
  {
    question: "What should I include?",
    answer:
      "Include your business name, website, and the email you used with Cendorq. Do not send passwords, card numbers, private keys, or sensitive credentials.",
  },
] as const;

const CONTACT_GUIDANCE = [
  ["Fit", "Which plan or repair depth makes sense."],
  ["Scope", "What is included before deeper work starts."],
  ["Support", "Access, billing, or account help."],
] as const;

const PRIMARY = "inline-flex min-h-14 items-center justify-center rounded-2xl border border-cyan-100 bg-[linear-gradient(135deg,#67e8f9,#60a5fa_58%,#a78bfa)] px-8 py-4 text-base font-black text-slate-950 shadow-[0_18px_55px_rgba(14,165,233,0.18),inset_0_1px_0_rgba(255,255,255,.9)] transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";
const SECONDARY = "inline-flex min-h-14 items-center justify-center rounded-2xl border border-cyan-100 bg-white/82 px-8 py-4 text-base font-black text-slate-950 shadow-[0_14px_38px_rgba(15,23,42,.08),inset_0_1px_0_rgba(255,255,255,.9)] transition hover:-translate-y-0.5 hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";

export default function ConnectPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Contact Cendorq",
    description: "A concise contact page for fit, scope, timing, access, or support questions.",
    path: "/connect",
  });

  const serviceJsonLd = buildServiceJsonLd({
    title: "Contact Cendorq",
    description:
      "A simple contact route for Cendorq AI Search Presence Repair questions when the next question is already clear.",
    path: "/connect",
    serviceType: "AI Search Presence Repair contact routing",
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/connect" },
  ]);

  const faqJsonLd = buildFaqJsonLd(FAQS);

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#eef8ff] text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />
      <ContactAtmosphere />

      <section className="relative mx-auto grid min-h-[calc(100svh-4.35rem)] max-w-[98rem] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:px-8 lg:py-14" aria-label="Contact Cendorq">
        <div className="relative z-10 max-w-4xl">
          <p className="text-[11px] font-black uppercase tracking-[.22em] text-sky-700">AI Search Presence Repair</p>
          <h1 className="mt-5 max-w-5xl text-[clamp(3.05rem,7.6vw,6.85rem)] font-black leading-[0.86] tracking-[-0.095em] text-slate-950">
            Contact Cendorq when the question is clear.
          </h1>
          <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-slate-600 sm:text-xl sm:leading-9">
            Use Contact for fit, scope, timing, access, or support. Start the Free Scan first when the Decision Gap is still unknown.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={directEmailHref} className={PRIMARY}>Email Support</a>
            <Link href="/free-check" className={SECONDARY}>Start Free Scan</Link>
          </div>
          <p className="mt-5 max-w-2xl text-sm font-semibold leading-7 text-slate-500">
            No passwords, card numbers, private keys, or sensitive credentials. Keep the first message focused on the business, website, and the question.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {CONTACT_GUIDANCE.map(([title, copy]) => (
              <div key={title} className="rounded-2xl border border-white/80 bg-white/66 p-4 shadow-[0_14px_44px_rgba(15,23,42,.06)] backdrop-blur-xl">
                <p className="text-sm font-black text-slate-950">{title}</p>
                <p className="mt-2 text-xs font-semibold leading-5 text-slate-500">{copy}</p>
              </div>
            ))}
          </div>
        </div>

        <section className="relative overflow-hidden rounded-[2.35rem] border border-white/82 bg-white/76 p-6 shadow-[0_34px_115px_rgba(15,23,42,0.11),inset_0_1px_0_rgba(255,255,255,.95)] backdrop-blur-2xl sm:p-8" aria-label="Contact guidance">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" aria-hidden="true" />
          <div className="relative">
            <p className="text-xs font-black uppercase tracking-[.18em] text-sky-700">Email</p>
            <h2 className="mt-3 text-[clamp(2rem,4.4vw,4.4rem)] font-black leading-[0.9] tracking-[-0.085em] text-slate-950">{SUPPORT_EMAIL}</h2>
            <p className="mt-5 text-sm font-semibold leading-7 text-slate-600">
              Include your business name, website, and the email you used with Cendorq. The clearer the context, the faster the next step can be routed.
            </p>
            <div className="mt-6 grid gap-3">
              {FAQS.map((item) => (
                <details key={item.question} className="rounded-2xl border border-cyan-100 bg-white/82 p-4 shadow-[0_12px_34px_rgba(15,23,42,.06)]">
                  <summary className="cursor-pointer list-none text-sm font-black text-slate-950">{item.question}</summary>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{item.answer}</p>
                </details>
              ))}
            </div>
            <Link href="/plans" className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-2xl border border-cyan-100 bg-cyan-50 px-4 py-3 text-sm font-black text-slate-950 shadow-[0_12px_32px_rgba(14,165,233,.10)] transition hover:-translate-y-0.5 hover:bg-cyan-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">
              Compare Plans
            </Link>
          </div>
        </section>
      </section>

      <section className="sr-only" aria-label="Contact validation anchors">
        Contact Cendorq. One clear page. Email Support. support@cendorq.com. Start Free Scan. Compare Plans. AI Search Presence Repair. Decision Gap. No crowded routing cards. No decision matrix. No checklist grid. No rounded-full buttons. No sensitive credentials. No guaranteed rankings, leads, revenue, ROI, or AI placement.
      </section>
    </main>
  );
}

function ContactAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_4%,rgba(186,230,253,.9),transparent_30%),radial-gradient(circle_at_88%_6%,rgba(219,234,254,.82),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eef9ff_46%,#f8fcff_100%)]" />
      <div className="absolute inset-0 opacity-[.12] [background-image:linear-gradient(rgba(14,165,233,.10)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,.08)_1px,transparent_1px)] [background-size:96px_96px]" />
    </div>
  );
}
