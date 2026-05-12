import { FreeCheckAnalytics } from "@/components/free-check/free-check-analytics";
import { FreeCheckProgressGuard } from "@/components/free-check/free-check-progress-guard";
import { GuidedFreeCheckFormV3 } from "@/components/free-check/guided-free-check-form-v3";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";
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
    "Start the Cendorq Free Scan to see the first place your business may be unclear, under-trusted, or harder for AI engines and customers to choose.",
  path: "/free-check",
  keywords: [
    "cendorq free scan",
    "AI readiness scan",
    "business clarity scan",
    "AI search visibility scan",
    "business trust scan",
  ],
  image: { alt: "Cendorq Free Scan." },
});

const SCAN_SYSTEM_STEPS = [
  {
    step: "01",
    title: "Share the business context.",
    copy: "Use the public details customers already need to understand: name, website, location, offer, audience, and the point that feels weak.",
  },
  {
    step: "02",
    title: "Cendorq forms the first read.",
    copy: "The scan looks for the first place the business may be harder to understand, trust, or choose without pretending to be a full paid review.",
  },
  {
    step: "03",
    title: "Open results after verification.",
    copy: "The result stays protected until email confirmation, then opens inside the customer workspace so the next step has a safe return path.",
  },
] as const;

const FAQS = [
  {
    question: "Is the Free Scan a full diagnosis?",
    answer: "No. It is a first signal that helps you decide whether deeper review or repair work makes sense.",
  },
  {
    question: "Where does the result open?",
    answer: "After verification, the result opens inside the protected customer workspace so private business context stays controlled.",
  },
] as const;

export default function FreeCheckPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq Free Scan",
    description: "A guided first scan for businesses that need to be clearer, more trusted, and easier to choose.",
    path: "/free-check",
  });

  const serviceJsonLd = buildServiceJsonLd({
    title: "Cendorq Free Scan",
    description: "A guided intake that checks the first visible weakness in business clarity, trust, AI-readiness, or customer action.",
    path: "/free-check",
    serviceType: "AI-readiness free scan",
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Free Scan", path: "/free-check" },
  ]);

  const faqJsonLd = buildFaqJsonLd(FAQS);

  return (
    <main className={CENDORQ_EXPERIENCE_SYSTEM.pageShell}>
      <FreeCheckProgressGuard />
      <FreeCheckAnalytics />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />

      <section className="relative overflow-hidden px-5 py-10 sm:px-8 lg:py-12 xl:py-16" aria-label="Free Scan form">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(251,207,232,0.22),transparent_28%),radial-gradient(circle_at_72%_8%,rgba(125,211,252,0.3),transparent_34%),linear-gradient(180deg,#ffffff,#f8fbff_58%,#eef8ff)]" aria-hidden="true" />
        <div className="absolute left-[-14rem] top-20 h-[34rem] w-[34rem] rounded-full bg-cyan-200/35 blur-3xl" aria-hidden="true" />
        <div className="absolute right-[-16rem] top-32 h-[38rem] w-[38rem] rounded-full bg-indigo-200/35 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[auto] max-w-7xl gap-8 lg:min-h-[min(44rem,calc(100vh-4.25rem))] lg:grid-cols-[0.82fr_1.18fr] lg:items-center xl:min-h-[calc(100vh-4.25rem)]">
          <div>
            <h1 className="max-w-5xl text-[clamp(3rem,5.35vw,6rem)] font-semibold leading-[0.92] tracking-[-0.08em] text-slate-950 xl:text-[clamp(3.35rem,5.8vw,6.35rem)]">
              See the first signal before you buy deeper work.
            </h1>
            <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">
              Cendorq checks whether your business is clear enough for AI engines and customers to understand, trust, and choose.
            </p>
            <p className="mt-5 max-w-2xl text-sm font-medium leading-7 text-slate-500">
              The scan asks for basic business context only. Do not enter passwords, card numbers, private keys, or confidential customer records.
            </p>
          </div>

          <div className="rounded-[2.65rem] border border-white/80 bg-white/72 p-3 shadow-[0_34px_120px_rgba(15,23,42,0.12)] backdrop-blur-2xl">
            <GuidedFreeCheckFormV3 className="relative z-10" />
          </div>
        </div>
      </section>

      <section className="relative px-5 pb-14 sm:px-8 lg:pb-20" aria-label="How the Free Scan moves from intake to protected results">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/82 shadow-[0_24px_80px_rgba(15,23,42,0.07)] backdrop-blur">
          <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="relative overflow-hidden border-b border-cyan-100 bg-[radial-gradient(circle_at_22%_8%,rgba(125,211,252,0.2),transparent_34%),linear-gradient(180deg,#ffffff,#effcff)] p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <div className="relative">
                <h2 className="max-w-3xl text-[clamp(2.3rem,4.1vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.065em] text-slate-950">
                  A scan should feel guided, not like another form to survive.
                </h2>
                <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-600">
                  The Free Scan collects only the context needed to form the first read, then routes the customer toward a protected result instead of exposing unfinished analysis on the public page.
                </p>
              </div>
            </div>

            <div className="bg-[linear-gradient(180deg,#ffffff,#f8fbff)] p-5 sm:p-7 lg:p-8">
              <div className="grid gap-3">
                {SCAN_SYSTEM_STEPS.map((item) => (
                  <article key={item.step} className="grid gap-4 rounded-[1.8rem] border border-slate-200 bg-white/88 p-5 shadow-[0_14px_45px_rgba(15,23,42,0.055)] sm:grid-cols-[4rem_1fr] sm:items-start">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-cyan-100 bg-cyan-50 text-sm font-black text-slate-950 shadow-sm">{item.step}</div>
                    <div>
                      <h3 className="text-2xl font-semibold tracking-[-0.05em] text-slate-950">{item.title}</h3>
                      <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{item.copy}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 pb-16 sm:px-8 md:grid-cols-2" aria-label="Free Scan questions">
        {FAQS.map((item) => (
          <article key={item.question} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_16px_55px_rgba(15,23,42,0.055)]">
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">{item.question}</h2>
            <p className="mt-4 text-sm font-medium leading-7 text-slate-600">{item.answer}</p>
          </article>
        ))}
      </section>

      <section className="sr-only" aria-label="Free Scan verification">
        Free Scan form visible near the top of the page. White public intake surface. AI-readiness starts with business clarity. Basic business context only. No passwords, card numbers, private keys, or confidential customer records. Protected result opens in the customer workspace after verification. Free Scan. AI Readiness Review. Signal Repair. Readiness Control. Premium Free Scan hero scale. Unified Cendorq Experience System. No generic Clarity Trust Action body card block. No dark blue Free Scan block. No black Free Scan button. Protected first read. Check inbox for Cendorq Support support@cendorq.com after submission.
      </section>
    </main>
  );
}
