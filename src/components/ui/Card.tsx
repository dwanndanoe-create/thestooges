import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[16px] border border-line bg-bg-raised",
        "shadow-[0_1px_2px_rgba(19,29,25,0.06)]",
        "transition-shadow duration-200 ease-out",
        "hover:shadow-[0_4px_16px_-4px_rgba(19,29,25,0.12),0_1px_2px_rgba(19,29,25,0.06)]",
        className
      )}
      {...props}
    />
  );
}
