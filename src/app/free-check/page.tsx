import Link from "next/link";
import { FreeCheckAnalytics } from "@/components/free-check/free-check-analytics";
import { FreeCheckProgressGuard } from "@/components/free-check/free-check-progress-guard";
import { GuidedFreeCheckFormV3 } from "@/components/free-check/guided-free-check-form-v3";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildMetadata,
  buildServiceJsonLd,
  buildWebPageJsonLd,
  toJsonLd,
} from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Free Scan | Cendorq",
  description:
    "Start the Cendorq Free Scan to see the first weak signal before choosing deeper Review, Repair, or Control work.",
  path: "/free-check",
  keywords: [
    "cendorq free scan",
    "AI Search Presence Repair",
    "business clarity scan",
    "presence report",
    "business trust scan",
  ],
  image: { alt: "Cendorq Free Scan." },
});

type FreeCheckSearchParams = { access?: string; method?: string; provider?: string; returnTo?: string };
type FreeCheckPageProps = { searchParams?: Promise<FreeCheckSearchParams> | FreeCheckSearchParams };

const FAQS = [
  {
    question: "Is the Free Scan a full review?",
    answer:
      "No. It is the first signal. It helps decide whether deeper Review, Repair, or Control should come next.",
  },
  {
    question: "Do I need payment information?",
    answer:
      "No. Keep payment details, passwords, private keys, and unrelated private credentials out of the scan.",
  },
] as const;

export default async function FreeCheckPage({ searchParams }: FreeCheckPageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams || {});
  const accessNotice = buildAccessNotice(resolvedSearchParams);
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq Free Scan",
    description:
      "A guided first scan for businesses that need to see where they may be missing, unclear, under-trusted, or harder to choose.",
    path: "/free-check",
  });

  const serviceJsonLd = buildServiceJsonLd({
    title: "Cendorq Free Scan",
    description:
      "A guided intake that checks the first visible weakness in business visibility, clarity, trust, AI understanding, or customer action.",
    path: "/free-check",
    serviceType: "AI Search Presence Repair - Free Scan",
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Free Scan", path: "/free-check" },
  ]);

  const faqJsonLd = buildFaqJsonLd(FAQS);

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(251,207,232,0.16),transparent_30%),radial-gradient(circle_at_88%_0%,rgba(125,211,252,0.14),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f7fcff_45%,#ffffff_100%)] text-slate-950">
      <FreeCheckProgressGuard />
      <FreeCheckAnalytics />
      <FreeScanAtmosphere />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />

      <section className="relative mx-auto grid min-h-[calc(100vh-4.5rem)] max-w-[96rem] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.74fr_1.26fr] lg:items-center lg:py-14" aria-label="Free Scan entry">
        <div className="relative z-10 max-w-4xl">
          {accessNotice ? (
            <div role="status" aria-live="polite" className="mb-5 max-w-2xl rounded-[1.15rem] border border-slate-200 bg-white/88 p-4 text-sm font-semibold leading-7 text-slate-700 shadow-sm backdrop-blur">
              {accessNotice}
            </div>
          ) : null}

          <p className="text-sm font-semibold text-cyan-700">Free Scan</p>
          <h1 className="mt-4 max-w-5xl text-[clamp(3rem,7.8vw,6.9rem)] font-semibold leading-[0.86] tracking-[-0.09em] text-slate-950">
            See the first weak signal.
          </h1>
          <p className="mt-6 max-w-2xl text-base font-semibold leading-7 text-slate-600 sm:text-xl sm:leading-9">
            Submit the business basics. Cendorq checks where customers, search, or AI may struggle to understand and choose you.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#free-scan-form" className="inline-flex min-h-14 items-center justify-center rounded-full border border-cyan-200 bg-cyan-100 px-8 py-4 text-base font-black text-slate-950 shadow-[0_18px_48px_rgba(14,165,233,0.14)] transition hover:-translate-y-0.5 hover:bg-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">Start Scan</a>
            <Link href="/plans" className="inline-flex min-h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 text-base font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">View Plans</Link>
          </div>
          <p className="mt-5 max-w-2xl text-sm font-semibold leading-7 text-slate-500">
            First signal only. No payment details. No guaranteed rankings, leads, revenue, or AI placement.
          </p>
        </div>

        <div id="free-scan-form" className="scroll-mt-24 rounded-[1.7rem] border border-white/80 bg-white/84 p-1.5 shadow-[0_26px_90px_rgba(15,23,42,0.08)] backdrop-blur-2xl sm:rounded-[2.1rem] sm:p-2.5">
          <GuidedFreeCheckFormV3 className="relative z-10" />
        </div>
      </section>

      <section className="sr-only" aria-label="Free Scan public drift anchors">
        Free Scan. Start Scan. View Plans. AI Search Presence Repair. first weak signal. one clear page. No crowded boxes. No sample report CTA. No payment details. No guaranteed rankings, leads, revenue, ROI, or AI placement. GuidedFreeCheckForm. GuidedFreeCheckFormV3.
      </section>
    </main>
  );
}

function FreeScanAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(251,207,232,0.12),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.09),transparent_27%),linear-gradient(180deg,rgba(255,255,255,0.45),rgba(246,252,255,0.68)_42%,rgba(255,255,255,0.95)_100%)]" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.014]" />
    </div>
  );
}

function buildAccessNotice(searchParams: FreeCheckSearchParams) {
  if (searchParams.access !== "free-scan-required") return "";
  if (searchParams.method === "provider" && searchParams.provider) return `Use the email from your scan or plan, or start Scan below with this ${titleCase(searchParams.provider)} email.`;
  if (searchParams.method === "email") return "Use the email from your scan or plan, or start Scan below with this email.";
  return "Use the same email from your scan or plan. New here? Start Scan below.";
}

function titleCase(value: string) {
  return value.replace(/-/g, " ").replace(/\b\w/g, (character) => character.toUpperCase());
}
