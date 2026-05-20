import Link from "next/link";
import { buildBreadcrumbJsonLd, buildMetadata, buildWebPageJsonLd, toJsonLd } from "@/lib/seo";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";

export const metadata = buildMetadata({
  title: "FAQ | Cendorq",
  description:
    "Simple answers about the Cendorq Free Scan, account access, plans, results, timing, privacy, billing, and support.",
  path: "/faq",
  keywords: ["Cendorq FAQ", "Free Scan questions", "AI visibility", "AI readiness", "AI search visibility", "Cendorq account access", "Cendorq plans"],
});

type FaqItem = { question: string; answer: string };
type FaqSection = { title: string; intro: string; items: readonly FaqItem[] };

const FAQ_SECTIONS: readonly FaqSection[] = [
  {
    title: "Start here",
    intro: "The fastest way to understand Cendorq and the right first step.",
    items: [
      {
        question: "What is Cendorq?",
        answer:
          "Cendorq helps you see where your business is visible, where it may be missing, and whether AI, search, and customers can understand, trust, and choose it clearly.",
      },
      {
        question: "Where should I start?",
        answer:
          "Start with the Free Scan. It gives Cendorq the business details needed to find the first weak spot before you pay for deeper work.",
      },
      {
        question: "Is Cendorq only SEO?",
        answer:
          "No. Search visibility matters, but Cendorq also looks at clarity, trust, proof, customer action, local presence, and how AI systems may understand the business.",
      },
      {
        question: "Who is Cendorq for?",
        answer:
          "Cendorq is for businesses that may be found but not chosen, visited but not contacted, missing from the right places, or misunderstood by search, AI answers, or customers.",
      },
    ],
  },
  {
    title: "Free Scan",
    intro: "What the scan does, what it does not do, and what happens after you send it.",
    items: [
      {
        question: "What is the Free Scan?",
        answer:
          "The Free Scan is the first signal. It looks for the first place your business may be missing, unclear, under-trusted, or harder for AI and customers to choose.",
      },
      {
        question: "Is the Free Scan really free?",
        answer: "Yes. The Free Scan is free. It helps you see if there is a real issue before choosing a paid next step.",
      },
      {
        question: "Do I have to buy something after the Free Scan?",
        answer:
          "No. If deeper Review or Repair makes sense, Cendorq can show the next step. You are not forced to continue.",
      },
      {
        question: "What happens after I submit the Free Scan?",
        answer:
          "Confirm your email, then open the result inside your Cendorq dashboard. The result should show what may be weak and what step makes the most sense next.",
      },
      {
        question: "Why does Cendorq ask for business details?",
        answer:
          "Cendorq needs real business context to give a useful first signal. Without that, the dashboard would be empty and the result would be too generic.",
      },
    ],
  },
  {
    title: "Account and access",
    intro: "Use the right email and return to the right customer record.",
    items: [
      {
        question: "Already have an account?",
        answer:
          "Use the same email you used for your Free Scan, form, or plan. If that does not work, try another email you may have used with Cendorq.",
      },
      {
        question: "Which email should I use?",
        answer:
          "Use the email you first used with Cendorq. That may be the email from your Free Scan, a form, a plan purchase, billing, or support.",
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
    title: "Results and guarantees",
    intro: "Clear expectations. No fake promises.",
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
          "Cendorq should use your submitted business information to review, support, and deliver the service. Private customer work belongs behind verified access.",
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

const QUICK_LINKS = [
  { label: "Start Free Scan", href: "/free-check" },
  { label: "Customer access", href: "/login" },
  { label: "Compare plans", href: "/plans" },
  { label: "Contact Us", href: "/connect" },
] as const;

export default function FaqPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq FAQ",
    description: "Answers about Free Scan, account access, plans, results, privacy, billing, and support.",
    path: "/faq",
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]);
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
    <main className="min-h-screen bg-[linear-gradient(180deg,#fff7fb_0%,#e9fbff_18%,#eff9ff_62%,#ffffff_100%)] text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />

      <section className="relative overflow-hidden px-5 py-8 sm:px-8 lg:py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(251,207,232,0.22),transparent_28%),radial-gradient(circle_at_65%_0%,rgba(125,211,252,0.3),transparent_36%),linear-gradient(180deg,#ffffff,#f8fbff_58%,#eef8ff)]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-7 lg:min-h-[min(34rem,calc(100vh-4.25rem))] lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Cendorq FAQ</p>
            <h1 className="mt-4 max-w-5xl text-[clamp(2.7rem,5vw,5.25rem)] font-semibold leading-[0.94] tracking-[-0.078em] text-slate-950">Get clear answers before the next move.</h1>
            <p className="mt-4 max-w-3xl text-base font-medium leading-7 text-slate-600 sm:text-lg sm:leading-8">Start with the Free Scan, return with the same email, and choose the next step only when it makes sense.</p>
            <div className="mt-6 grid gap-3 sm:max-w-2xl sm:grid-cols-2 lg:grid-cols-4">
              {QUICK_LINKS.map((item) => (
                <Link key={item.href} href={item.href} className={`${CENDORQ_EXPERIENCE_SYSTEM.secondaryButton} ${CENDORQ_EXPERIENCE_SYSTEM.mobileTouchButton}`}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[2.2rem] border border-white/80 bg-white/78 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.085)] backdrop-blur-2xl sm:p-7">
            <h2 className="text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">Fast rule.</h2>
            <p className="mt-4 text-base font-medium leading-8 text-slate-600">If you are new, start the Free Scan. If you already submitted a scan, form, or plan, use the same email to return.</p>
            <div className="mt-5 rounded-[1.35rem] border border-cyan-100 bg-cyan-50/60 p-4 text-sm font-semibold leading-7 text-slate-700">Already have an account? Use the same email you used for your Free Scan, form, or plan.</div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8" aria-label="Cendorq FAQ sections">
        <div className="grid gap-5">
          {FAQ_SECTIONS.map((section) => (
            <section key={section.title} className="rounded-[2.2rem] border border-white/80 bg-white/82 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.055)] backdrop-blur sm:p-6" aria-labelledby={slug(section.title)}>
              <div className="grid gap-5 lg:grid-cols-[0.35fr_0.65fr]">
                <div>
                  <h2 id={slug(section.title)} className="text-3xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-5xl">{section.title}</h2>
                  <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{section.intro}</p>
                </div>
                <div className="grid gap-3">
                  {section.items.map((item) => (
                    <details key={item.question} className="group rounded-[1.35rem] border border-cyan-100 bg-cyan-50/35 p-4 open:bg-white">
                      <summary className="cursor-pointer list-none text-base font-semibold tracking-[-0.02em] text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">
                        <span className="flex items-center justify-between gap-4">
                          {item.question}
                          <span className="text-cyan-700 transition group-open:rotate-45">+</span>
                        </span>
                      </summary>
                      <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}