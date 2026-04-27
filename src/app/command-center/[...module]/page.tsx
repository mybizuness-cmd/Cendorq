import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { commandCenterPreviewHeaderName, resolveCommandCenterAccessState } from "@/lib/command-center/access";
import { getCommandCenterModule } from "@/lib/command-center/modules";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Command Center Module | Cendorq",
  description: "Private Cendorq Command Center module shell. Closed by default until authentication, database, and authorization controls are configured.",
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

type CommandCenterModulePageProps = {
  params: Promise<{
    module: string[];
  }>;
};

export default async function CommandCenterModulePage({ params }: CommandCenterModulePageProps) {
  const { module: modulePathParts } = await params;
  const path = `/command-center/${modulePathParts.join("/")}`;
  const module = getCommandCenterModule(path);

  if (!module || module.path === "/command-center") notFound();

  const headerList = await headers();
  const accessState = resolveCommandCenterAccessState(headerList.get(commandCenterPreviewHeaderName()));

  if (!accessState.allowed) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-24 text-white">
        <section className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-2xl shadow-cyan-950/20 md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">Private Command Center</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">{module.label} is closed by default.</h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            This private module is part of the Cendorq operating layer. It stays closed until production authentication, database access, and authorization controls are configured.
          </p>
          <div className="mt-8 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-5 text-sm leading-7 text-amber-100">
            No customer records, private intelligence, files, reports, evidence, payment data, automation controls, or module data are exposed from this route.
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
      <section className="mx-auto max-w-5xl">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-cyan-950/20 md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">Cendorq Command Center</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">{module.label}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{module.description}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Permission</p>
              <p className="mt-2 text-sm font-medium text-slate-200">{module.requiredPermission}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Status</p>
              <p className="mt-2 text-sm font-medium text-slate-200">{module.status}</p>
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-cyan-200/10 bg-cyan-200/5 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100">Schema anchors</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {module.schemaAnchors.map((anchor) => (
                <span key={anchor} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300">
                  {anchor}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
