import React from "react";

import { ContainerScroll } from "@/components/ui/container-scroll";
import { CheckCircle, CalendarRange } from "lucide-react";
import { Navigation } from "@/components/Navigation";

export function HeroSection() {
  return (
    <>
      <Navigation />

      <section className="relative isolate overflow-hidden bg-white">
        <div className="relative">
          <ContainerScroll
            titleComponent={
              <div className="text-slate-900">
                <h1 className="text-5xl font-bold tracking-tight sm:text-7xl md:text-8xl">
                  Conference Explorer
                </h1>
              </div>
            }
          >
            <div className="flex h-full flex-col justify-between space-y-6 bg-white p-6 text-left text-slate-900">
              <div className="space-y-6">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
                  <p className="text-sm uppercase tracking-wide text-amber-500">Featured</p>
                  <h3 className="mt-2 text-2xl font-semibold text-slate-900">React Summit • Amsterdam</h3>
                  <p className="mt-3 text-sm text-slate-600">
                    Connect with 10K+ React engineers exploring the future of UI development.
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-600">
                      Registration open
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                      June 12-14 • Hybrid
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 text-slate-700 sm:grid-cols-2">
                  <Feature
                    icon={<CalendarRange className="size-5" />}
                    title="Smart schedules"
                    description="Filter by date, track deadlines, and plan your conference season with confidence."
                  />
                  <Feature
                    icon={<CheckCircle className="size-5" />}
                    title="Personal dashboard"
                    description="Manage registrations, favorites, and team attendance in one dashboard."
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
                Trusted by developer advocates at Vercel, Stripe, GitHub, and more.
              </div>
            </div>
          </ContainerScroll>
        </div>
      </section>
    </>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
      <span className="mt-1 flex size-9 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
        {icon}
      </span>
      <div className="space-y-1">
        <p className="text-base font-semibold text-slate-900">{title}</p>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
    </div>
  );
}
