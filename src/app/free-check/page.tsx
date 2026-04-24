import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
  buildWebPageJsonLd,
  toJsonLd,
} from "@/lib/seo";
import { FreeCheckForm } from "@/components/free-check/free-check-form";
import { FreeCheckIntro } from "@/components/free-check/free-check-intro";
import { FreeCheckTrustStrip } from "@/components/free-check/free-check-trust-strip";

const FAQS = [
  {
    question: "What is Search Presence Scan in simple terms?",
    answer:
      "It is the first serious review layer. It helps the business get a clearer read on what may be weakening trust, clarity, positioning, and customer response before it moves deeper.",
  },
  {
    question: "Who should start here?",
    answer:
      "Most businesses should start here if they know something feels off but still need a cleaner first explanation before strategy or implementation is chosen.",
  },
  {
    question: "What happens after submission?",
    answer:
      "The business enters the system with a stronger first signal. From there, the next move becomes easier to judge, whether that means staying at first-read level or moving into Visibility Blueprint.",
  },
] as const;

export default function FreeCheckPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Search Presence Scan",
    description:
      "The first serious signal layer inside Cendorq for businesses that need a stronger first read before deeper pressure is applied.",
    path: "/free-check",
  });
  const serviceJsonLd = buildServiceJsonLd({
    title: "Cendorq Search Presence Scan",
    description:
      "A structured first-read intake designed to improve the quality of the next decision before strategy, implementation, or recurring command is chosen.",
    path: "/free-check",
    serviceType: "Initial search-presence review",
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Search Presence Scan", path: "/free-check" },
  ]);
  const faqJsonLd = buildFaqJsonLd(FAQS);

  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-12 text-white sm:px-6 md:py-16 xl:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />
      <FreeCheckIntro />
      <FreeCheckTrustStrip />
      <FreeCheckForm />
    </main>
  );
}
