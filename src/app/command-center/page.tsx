import type { Metadata } from "next";
import { headers } from "next/headers";

import { commandCenterPreviewHeaderName, resolveCommandCenterAccessState } from "@/lib/command-center/access";
import { COMMAND_CENTER_MODULES } from "@/lib/command-center/modules";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Command Center | Cendorq",
  description: "Private Cendorq operating layer. Closed by default until authentication, database, and production access controls are configured.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default async function CommandCenterPage() {
  const headerList = await headers();
  const accessState = resolveCommandCenterAccessState(headerList.get(commandCenterPreviewHeaderName()));

  if (!accessState.allowed) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-24 text-white">
        <section className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-2xl shadow-cyan-950/20 md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">Private Command Center</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">Closed by default.</h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            This is the private Cendorq operating layer for intake, reports, projects, files, payments, delivery, intelligence, governance, and audit history.
            It will stay closed until production authentication, database access, and authorization controls are configured.
          </p>
          <div className="mt-8 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-5 text-sm leading-7 text-amber-100">
            No customer records, private intelligence, files, reports, evidence, payment data, automation controls, or dashboard modules are exposed from this route.
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-cyan-950/20 md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">Cendorq Command Center</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">Private operating system shell.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            The source-of-truth foundations are ready. Dashboard modules remain gated until production auth and durable database configuration are active.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {COMMAND_CENTER_MODULES.map((module) => (
            <div key={module.key} className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
              <div className="flex items-start justify-between gap-4">
                <p className="text-base font-semibold text-white">{module.label}</p>
                <span className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-100">
                  {module.status}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-400">{module.description}</p>
              <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">{module.requiredPermission}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
