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
const directEmailHref = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Cendorq Contact Us")}`;

export const metadata = buildMetadata({
  title: "Contact Us | Cendorq",
  description:
    "Contact Cendorq when fit, scope, timing, access, or support is already clear. Start Scan first when the weak signal is unclear.",
  path: "/connect",
  keywords: ["Cendorq contact us", "Cendorq support", "Free Scan", "AI Search Presence Repair", "Deep Review", "Build Fix", "Ongoing Control"],
  image: { alt: "Cendorq Contact Us page." },
});

const FAQS = [
  {
    question: "Should I contact you first or start Scan?",
    answer:
      "Start Scan if the weak signal is unclear. Contact us when the question is already about fit, scope, timing, access, or support.",
  },
  {
    question: "What should I include?",
    answer:
      "Include your business name, website, and the email you used with Cendorq. Do not send passwords, card numbers, private keys, or sensitive credentials.",
  },
] as const;

export default function ConnectPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq Contact Us",
    description: "A concise contact page for fit, scope, timing, access, or support questions.",
    path: "/connect",
  });

  const serviceJsonLd = buildServiceJsonLd({
    title: "Cendorq Contact Us",
    description:
      "A simple contact route for Cendorq AI Search Presence Repair questions when the next question is already clear.",
    path: "/connect",
    serviceType: "AI Search Presence Repair contact routing",
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Contact Us", path: "/connect" },
  ]);

  const faqJsonLd = buildFaqJsonLd(FAQS);

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(251,207,232,0.16),transparent_30%),radial-gradient(circle_at_88%_0%,rgba(125,211,252,0.14),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f7fcff_45%,#ffffff_100%)] text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />
      <ContactAtmosphere />

      <section className="relative mx-auto grid min-h-[calc(100vh-4.5rem)] max-w-[92rem] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:py-14" aria-label="Contact Us">
        <div className="relative z-10 max-w-4xl">
          <p className="text-sm font-semibold text-cyan-700">Contact Us</p>
          <h1 className="mt-4 max-w-5xl text-[clamp(3rem,7.6vw,6.8rem)] font-semibold leading-[0.86] tracking-[-0.09em] text-slate-950">
            Ask when the question is clear.
          </h1>
          <p className="mt-6 max-w-2xl text-base font-semibold leading-7 text-slate-600 sm:text-xl sm:leading-9">
            Use Contact Us for fit, scope, timing, access, or support. Start Scan first when the weak signal is still unknown.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={directEmailHref} className="inline-flex min-h-14 items-center justify-center rounded-full border border-cyan-200 bg-cyan-100 px-8 py-4 text-base font-black text-slate-950 shadow-[0_18px_48px_rgba(14,165,233,0.14)] transition hover:-translate-y-0.5 hover:bg-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">Email Support</a>
            <Link href="/free-check" className="inline-flex min-h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 text-base font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">Start Scan</Link>
          </div>
        </div>

        <section className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/88 p-5 shadow-[0_26px_84px_rgba(15,23,42,0.075)] backdrop-blur-2xl sm:p-7" aria-label="Contact guidance">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(251,207,232,0.14),transparent_36%),radial-gradient(circle_at_100%_100%,rgba(186,230,253,0.1),transparent_40%)]" aria-hidden="true" />
          <div className="relative">
            <p className="text-sm font-semibold text-cyan-700">Email</p>
            <h2 className="mt-3 text-[clamp(2.25rem,4.7vw,4.6rem)] font-semibold leading-[0.92] tracking-[-0.075em] text-slate-950">{SUPPORT_EMAIL}</h2>
            <p className="mt-5 text-sm font-semibold leading-7 text-slate-600">
              Include your business name, website, and the email you used with Cendorq. Do not send passwords, card numbers, private keys, or sensitive credentials.
            </p>
            <div className="mt-6 grid gap-3">
              {FAQS.map((item) => (
                <details key={item.question} className="rounded-[1.15rem] border border-slate-200 bg-white/88 p-4 shadow-sm">
                  <summary className="cursor-pointer list-none text-sm font-black text-slate-950">{item.question}</summary>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </section>

      <section className="sr-only" aria-label="Contact Us validation anchors">
        Contact Us. One clear page. Email Support. support@cendorq.com. Start Scan. No crowded routing cards. No decision matrix. No checklist grid. AI Search Presence Repair. No sensitive credentials. No guaranteed rankings, leads, revenue, ROI, or AI placement.
      </section>
    </main>
  );
}

function ContactAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(251,207,232,0.12),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.09),transparent_27%),linear-gradient(180deg,rgba(255,255,255,0.45),rgba(248,252,255,0.68)_42%,rgba(255,255,255,0.95)_100%)]" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.014]" />
    </div>
  );
}
