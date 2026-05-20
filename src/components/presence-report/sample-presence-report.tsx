const PRESENCE_PILLARS = [
  {
    label: "Findability",
    score: 58,
    state: "Needs structure",
    copy: "Can search and AI systems locate the business, service area, pages, and public facts?",
  },
  {
    label: "Understanding",
    score: 39,
    state: "Weak signal",
    copy: "Can a customer or public answer system quickly understand what the business does and when it is relevant?",
  },
  {
    label: "Trust",
    score: 44,
    state: "Proof buried",
    copy: "Are reviews, credentials, policies, testimonials, photos, and experience visible near the decision point?",
  },
  {
    label: "Choice",
    score: 31,
    state: "Competitor clearer",
    copy: "Does the business explain why someone should choose it over alternatives that may be easier to compare?",
  },
  {
    label: "Action",
    score: 52,
    state: "Path uneven",
    copy: "Can the next customer step happen quickly without confusion, extra searching, or buried calls to action?",
  },
] as const;

const REPAIR_QUEUE = [
  {
    title: "Clarify the service offer above the fold.",
    copy: "The first screen should say what the business does, who it helps, where it operates, and what action to take next.",
  },
  {
    title: "Move proof closer to the decision point.",
    copy: "Trust evidence should appear before customers need to compare another provider, not only at the bottom of the page.",
  },
  {
    title: "Add answer-ready service questions.",
    copy: "Public pages should answer the practical questions customers and AI summaries need before a recommendation can make sense.",
  },
  {
    title: "Strengthen choice contrast carefully.",
    copy: "The business needs a clear reason to choose it without unsupported claims, pressure language, or risky promises.",
  },
] as const;

const REPORT_SECTIONS = [
  "First signal summary",
  "Business truth profile",
  "Pillar scores",
  "Choice-gap notes",
  "Repair queue",
  "Recommended next move",
] as const;

export function SamplePresenceReport() {
  return (
    <section className="rounded-[2.4rem] border border-white/85 bg-white/82 p-3 shadow-[0_30px_100px_rgba(15,23,42,0.12)] backdrop-blur-2xl sm:rounded-[3rem]" aria-label="Sample Cendorq Presence Report">
      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f2fbff)] sm:rounded-[2.55rem]">
        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border-b border-slate-200 bg-[radial-gradient(circle_at_18%_0%,rgba(125,211,252,0.26),transparent_36%),linear-gradient(180deg,#ffffff,#effcff)] p-6 sm:p-8 lg:border-b-0 lg:border-r">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Sample Presence Report</p>
            <h2 className="mt-4 text-[clamp(2.4rem,8vw,4.75rem)] font-semibold leading-[0.94] tracking-[-0.08em] text-slate-950">
              Visible, but not easy to choose.
            </h2>
            <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-600">
              This example shows how Cendorq turns the first scan signal into a repair path. It is not a ranking, lead, revenue, or placement promise.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-cyan-200 bg-cyan-50 p-5 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-700">Presence Score</p>
                <p className="mt-2 text-6xl font-semibold tracking-[-0.09em] text-slate-950">42</p>
                <p className="mt-1 text-xs font-semibold text-slate-500">out of 100</p>
              </div>
              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Recommended next move</p>
                <p className="mt-3 text-2xl font-semibold tracking-[-0.055em] text-slate-950">Deep Review or Build Fix</p>
                <p className="mt-3 text-xs font-semibold leading-5 text-slate-500">Depends on whether the cause is already clear enough to repair safely.</p>
              </div>
            </div>

            <div className="mt-7 rounded-[1.5rem] border border-slate-200 bg-white p-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Report sections</p>
              <div className="mt-4 grid gap-2">
                {REPORT_SECTIONS.map((section) => (
                  <div key={section} className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-3">
                    <span className="h-2 w-2 rounded-full bg-cyan-400" />
                    <span className="text-sm font-semibold text-slate-700">{section}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-7 lg:p-8">
            <div className="grid gap-3">
              {PRESENCE_PILLARS.map((pillar) => (
                <article key={pillar.label} className="rounded-[1.45rem] border border-slate-200 bg-white p-4 shadow-[0_12px_35px_rgba(15,23,42,0.045)]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-semibold tracking-[-0.04em] text-slate-950">{pillar.label}</h3>
                        <span className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-cyan-700">{pillar.state}</span>
                      </div>
                      <p className="mt-2 text-sm font-medium leading-6 text-slate-600">{pillar.copy}</p>
                    </div>
                    <p className="text-3xl font-semibold tracking-[-0.06em] text-slate-950">{pillar.score}</p>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                    <span className="block h-full rounded-full bg-cyan-300" style={{ width: `${pillar.score}%` }} />
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-5 rounded-[1.65rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_18px_55px_rgba(15,23,42,0.18)]">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-200">Repair queue</p>
              <div className="mt-4 grid gap-3">
                {REPAIR_QUEUE.map((item, index) => (
                  <article key={item.title} className="grid gap-3 rounded-[1.15rem] border border-white/10 bg-white/7 p-4 sm:grid-cols-[2rem_1fr]">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-200 text-sm font-black text-slate-950">{index + 1}</span>
                    <div>
                      <h3 className="text-base font-semibold leading-6 text-white">{item.title}</h3>
                      <p className="mt-2 text-sm font-medium leading-6 text-slate-300">{item.copy}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
