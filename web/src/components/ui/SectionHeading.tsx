import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 max-w-2xl",
        align === "center" && "items-center text-center mx-auto",
        className
      )}
    >
      {eyebrow && (
        <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-emerald-700">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-[32px] md:text-[40px] leading-[1.1] tracking-[-0.02em] text-ink text-balance">
        {title}
      </h2>
      {description && (
        <p className="text-[16px] leading-relaxed text-ink-muted text-balance">
          {description}
        </p>
      )}
    </div>
  );
}
