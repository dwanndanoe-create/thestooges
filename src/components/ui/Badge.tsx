import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "emerald" | "teal" | "gold" | "neutral";

const toneStyles: Record<Tone, string> = {
  emerald: "bg-emerald-100 text-emerald-900",
  teal: "bg-[color-mix(in_srgb,var(--color-teal-500)_16%,transparent)] text-teal-700",
  gold: "bg-gold-100 text-gold-600",
  neutral: "bg-bg-sunken text-ink-muted",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium leading-none font-mono tracking-tight",
        toneStyles[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
