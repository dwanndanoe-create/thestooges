"use client";

import { platformStats } from "@/data/site-data";
import { useCountUp } from "@/hooks/useCountUp";

function StatItem({ label, value }: { label: string; value: number }) {
  const { ref, value: display } = useCountUp(value);
  return (
    <div className="flex flex-col gap-1.5 py-6 px-6 border-l border-line first:border-l-0 md:first:border-l-0">
      <span
        ref={ref}
        className="font-display text-[34px] md:text-[40px] font-medium tracking-[-0.02em] text-ink tabular-nums"
      >
        {display.toLocaleString()}
        <span className="text-emerald-700">+</span>
      </span>
      <span className="text-[13px] text-ink-muted">{label}</span>
    </div>
  );
}

export function TrustStats() {
  return (
    <section className="border-y border-line bg-bg-sunken">
      <div className="container-page">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 divide-line">
          {platformStats.map((stat) => (
            <StatItem key={stat.id} label={stat.label} value={stat.value} />
          ))}
        </div>
      </div>
    </section>
  );
}
