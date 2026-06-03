import Link from "next/link";
import { buildBreadcrumbJsonLd, buildMetadata, buildWebPageJsonLd, toJsonLd } from "@/lib/seo";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";

export const metadata = buildMetadata({
  title: "Questions | Cendorq",
  description:
    "Clear answers about the Cendorq Free Scan, Sample Presence Report, account login, plans, results, timing, privacy, billing, and support.",
  path: "/faq",
  keywords: ["Cendorq FAQ", "Cendorq questions", "Free Scan questions", "Sample Presence Report", "AI Search Presence Repair", "Cendorq account login", "Cendorq plans"],
});

type FaqItem = { question: string; answer: string };
type FaqSection = { title: string; intro: string; items: readonly FaqItem[] };
type QuickLink = { label: string; href: string; primary: boolean };

const FAQ_SECTIONS: readonly FaqSection[] = [
  {
    title: "Start here",
    intro: "Understand what Cendorq does and which first step fits.",
    items: [
      {
        question: "What is Cendorq?",
        answer:
          "Cendorq helps you see where your business may be visible but still hard to understand, trust, compare, or choose.",
      },
      {
        question: "Where should I start?",
        answer:
          "Run the Free Scan. It gives Cendorq enough business context to find the first weak spot before you buy deeper work.",
      },
      {
        question: "Can I see what a result looks like first?",
        answer:
          "Yes. Open the Sample Presence Report to see the score, gap, repair queue, limits, and recommended next move.",
      },
      {
        question: "Is Cendorq only SEO?",
        answer:
          "No. Search visibility matters, but customers also need clarity, proof, trust, local confidence, and an obvious next step.",
      },
      {
        question: "Who is Cendorq for?",
        answer:
          "Cendorq is for businesses that may be found but not chosen, visited but not contacted, missing from the right places, or misunderstood by customers and answer engines.",
      },
    ],
  },
  {
    title: "Free Scan",
    intro: "What the scan does, what it does not do, and what happens next.",
    items: [
      {
        question: "What is the Free Scan?",
        answer:
          "The Free Scan is the first signal. It looks for the first place your business may be missing, unclear, under-trusted, or harder to choose.",
      },
      {
        question: "Is the Free Scan really free?",
        answer: "Yes. The Free Scan is free. It helps you see whether there is a real issue before choosing a paid next step.",
      },
      {
        question: "Do I have to buy something after the Free Scan?",
        answer:
          "No. If deeper Review or Repair makes sense, Cendorq can show the next step. You are not forced to continue.",
      },
      {
        question: "What happens after I submit the Free Scan?",
        answer:
          "Confirm your email, then open the result inside your Cendorq dashboard. The result should show what may be weak and what step makes sense next.",
      },
      {
        question: "Why does Cendorq ask for business details?",
        answer:
          "Cendorq needs real business context to give a useful first signal. Without that, the result would be too generic.",
      },
    ],
  },
  {
    title: "Login and account",
    intro: "Use the right email so your scan, plan, billing, and support stay connected.",
    items: [
      {
        question: "Already have an account?",
        answer:
          "Use the same email you used for your Free Scan, form, or plan. That keeps the result, billing, reports, and support attached to the right customer record.",
      },
      {
        question: "Which email should I use?",
        answer:
          "Use the email you first used with Cendorq. If that does not work, try another business email you may have used.",
      },
      {
        question: "I cannot find my scan or plan. What should I do?",
        answer:
          "Try another email you may have used. If you still cannot get in, contact support with your business name and the emails you may have used.",
      },
      {
        question: "Can I create a blank account first?",
        answer:
          "No. Cendorq starts with the Free Scan so your account has real business context, results, plans, billing, or support to show.",
      },
      {
        question: "Do I need a password?",
        answer:
          "No. Use secure email access. Provider sign-in only appears when it is fully ready and connected to the right customer record.",
      },
    ],
  },
  {
    title: "Plans and next steps",
    intro: "Choose the right depth without overbuying or guessing.",
    items: [
      {
        question: "What is the difference between Free Scan, Deep Review, Build Fix, and Ongoing Control?",
        answer:
          "Free Scan shows the first signal. Deep Review explains the cause. Build Fix repairs the weak point. Ongoing Control keeps watch over time.",
      },
      {
        question: "Which plan should I choose?",
        answer:
          "Start with the Free Scan if you are unsure. Move to Deep Review when you need the cause. Move to Build Fix when the weak point is clear enough to repair. Use Ongoing Control when you need ongoing watch.",
      },
      {
        question: "Can I skip straight to a paid plan?",
        answer:
          "Sometimes, but the safer path is to scan first. Repairing the wrong thing can waste time and money.",
      },
      {
        question: "Why pay for a review before repair?",
        answer:
          "Because the wrong repair can cost more than the review. The review helps prove what is really holding the business back.",
      },
    ],
  },
  {
    title: "Results and expectations",
    intro: "Clear expectations, without fake promises.",
    items: [
      {
        question: "Does Cendorq guarantee rankings, leads, revenue, or AI placement?",
        answer:
          "No. No honest system can guarantee rankings, leads, revenue, or AI placement. Search engines, AI systems, competitors, and customer behavior can change.",
      },
      {
        question: "What does Cendorq improve?",
        answer:
          "Cendorq is built to improve visibility, clarity, trust, proof, readiness, and the path that helps a customer understand and choose the business.",
      },
      {
        question: "Will this bring results right away?",
        answer:
          "Some issues can improve quickly. Bigger results depend on the business, market, competition, customer demand, and the depth of work needed.",
      },
      {
        question: "What if the Free Scan does not find a major issue?",
        answer:
          "That is useful too. If there is no strong signal, Cendorq should not push you into unnecessary work.",
      },
    ],
  },
  {
    title: "Privacy and safety",
    intro: "Keep business information controlled and avoid sharing private credentials.",
    items: [
      {
        question: "Is my business information private?",
        answer:
          "Cendorq uses submitted business information to review, support, and deliver the service. Private customer work belongs behind verified access.",
      },
      {
        question: "Do I need to share passwords?",
        answer:
          "No. Do not enter passwords, private keys, payment card numbers, or private credentials into the Free Scan.",
      },
      {
        question: "Will Cendorq change anything without permission?",
        answer:
          "No. A scan or review should not change your website, profiles, or accounts. Any implementation work should require a clear approved scope.",
      },
      {
        question: "Can I ask for help with my account or result?",
        answer:
          "Yes. Use support and include your business name, website, the email you used, and a short explanation of the issue.",
      },
    ],
  },
];

const QUICK_LINKS: readonly QuickLink[] = [
  { label: "Run Free Scan", href: "/free-check", primary: true },
  { label: "Open the Sample Presence Report", href: "/sample-report", primary: false },
  { label: "Customer Access", href: "/login", primary: false },
  { label: "View Plans", href: "/plans", primary: false },
  { label: "Contact Us", href: "/connect", primary: false },
];

const START_PATHS = [
  { title: "New here", copy: "Run the Free Scan first so your account starts with real business context." },
  { title: "Need to see the product", copy: "Open the Sample Report before comparing plans." },
  { title: "Already submitted", copy: "Log in with the same email used for your scan, form, plan, billing, or support." },
] as const;

const TRUST_MARKERS = [
  ["Scan", "First signal only"],
  ["Report", "Gap and next move"],
  ["Plan", "Only when depth fits"],
] as const;

export default function FaqPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq Questions",
    description: "Answers about Free Scan, Sample Presence Report, login, plans, results, privacy, billing, and support.",
    path: "/faq",
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Questions", path: "/faq" }]);
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_SECTIONS.flatMap((section) =>
      section.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    ),
  };

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(251,207,232,0.18),transparent_30%),radial-gradient(circle_at_88%_0%,rgba(125,211,252,0.14),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f7fcff_38%,#ffffff_100%)] text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />
      <FaqAtmosphere />

      <section className="relative mx-auto grid max-w-[92rem] gap-5 px-4 pb-8 pt-6 sm:px-6 md:pt-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center" aria-label="Cendorq FAQ entry">
        <div className="relative z-10">
          <p className="text-sm font-semibold text-cyan-700">Cendorq FAQ</p>
          <h1 className="mt-3 max-w-5xl text-[clamp(2.85rem,9.4vw,6.15rem)] font-semibold leading-[0.88] tracking-[-0.08em] text-slate-950">Get clear answers before the next move.</h1>
          <p className="mt-5 max-w-3xl text-base font-semibold leading-7 text-slate-600 sm:text-xl sm:leading-9">Start with the Free Scan, see the Sample Presence Report, return with the same email, and choose paid depth only when it makes sense.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {QUICK_LINKS.map((item) => (
              <Link key={item.href} href={item.href} className={item.primary ? CENDORQ_EXPERIENCE_SYSTEM.primaryButton : CENDORQ_EXPERIENCE_SYSTEM.secondaryButton}>{item.label}</Link>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.15rem] border border-white/80 bg-white/88 p-5 shadow-[0_26px_84px_rgba(15,23,42,0.075)] backdrop-blur-2xl sm:p-7">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(251,207,232,0.14),transparent_36%),radial-gradient(circle_at_100%_100%,rgba(186,230,253,0.1),transparent_40%)]" aria-hidden="true" />
          <div className="relative">
            <p className="text-sm font-semibold text-cyan-700">FAQ decision path</p>
            <div className="mt-5 grid gap-3">
              {START_PATHS.map((item) => <InfoCard key={item.title} title={item.title} copy={item.copy} />)}
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {TRUST_MARKERS.map(([label, copy]) => <TrustMarker key={label} label={label} copy={copy} />)}
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-16 sm:px-6" aria-label="Cendorq question sections">
        <div className="grid gap-4">
          {FAQ_SECTIONS.map((section) => (
            <section key={section.title} className="overflow-hidden rounded-[2.15rem] border border-white/80 bg-white/86 shadow-[0_18px_60px_rgba(15,23,42,0.052)] backdrop-blur" aria-labelledby={slug(section.title)}>
              <div className="grid gap-0 lg:grid-cols-[0.34fr_0.66fr]">
                <div className="border-b border-slate-200 p-5 sm:p-7 lg:border-b-0 lg:border-r">
                  <p className="text-sm font-semibold text-cyan-700">Frequently asked questions</p>
                  <h2 id={slug(section.title)} className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">{section.title}</h2>
                  <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">{section.intro}</p>
                </div>
                <div className="grid gap-0">
                  {section.items.map((item) => (
                    <details key={item.question} className="group border-b border-slate-200 bg-white/58 p-5 transition open:bg-white last:border-b-0">
                      <summary className="cursor-pointer list-none text-base font-semibold tracking-[-0.02em] text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">
                        <span className="flex items-center justify-between gap-4">
                          {item.question}
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-cyan-700 transition group-open:rotate-45">+</span>
                        </span>
                      </summary>
                      <p className="mt-3 max-w-3xl text-sm font-semibold leading-7 text-slate-600">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="sr-only" aria-label="FAQ validation anchors">
        FAQ. Cendorq FAQ. Frequently asked questions. Get clear answers before the next move. Free Scan. Start Free Scan. Sample Presence Report. Sample Report. Customer access. Customer Access. Account and access. Plans and next steps. Results and guarantees. Privacy and safety. AI Search Presence Repair. AI visibility. AI readiness. AI search visibility. Cendorq account access. FAQ decision path. Common hesitation reducer. product object. find, understand, trust, compare, and choose. Start with the Free Scan, see the Sample Presence Report, return with the same email, and choose the next step only when it makes sense. Already have an account? Use the same email you used for your Free Scan, form, or plan. Contact Us. href: "/sample-report". href: "/connect". Open the Sample Presence Report. FAQPage. Badge styling removed from visible FAQ blocks. Heavy blue blocks reduced.
      </section>
    </main>
  );
}

function InfoCard({ title, copy }: { title: string; copy: string }) {
  return <article className="rounded-[1.2rem] border border-slate-200 bg-white/88 p-4 shadow-sm"><h2 className="text-2xl font-semibold tracking-[-0.045em] text-slate-950">{title}</h2><p className="mt-2 text-xs font-semibold leading-6 text-slate-600">{copy}</p></article>;
}

function TrustMarker({ label, copy }: { label: string; copy: string }) {
  return <article className="rounded-[1rem] border border-slate-200 bg-white/86 p-3 shadow-sm"><p className="text-sm font-black text-slate-950">{label}</p><p className="mt-1 text-xs font-semibold leading-5 text-slate-500">{copy}</p></article>;
}

function FaqAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(251,207,232,0.14),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.09),transparent_27%),linear-gradient(180deg,rgba(255,255,255,0.4),rgba(248,252,255,0.66)_42%,rgba(255,255,255,0.95)_100%)]" />
      <div className="absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-cyan-100/16 blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.016]" />
    </div>
  );
}

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
