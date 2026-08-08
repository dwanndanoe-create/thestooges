"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
  error?: string;
  trailing?: ReactNode;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, icon, error, trailing, className, id, ...props }, ref) => {
    const inputId = id ?? props.name;
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-[13px] font-medium text-ink">
          {label}
        </label>
        <div
          className={cn(
            "flex items-center gap-2.5 h-11 px-3.5 rounded-[10px] border bg-bg-raised",
            "transition-colors duration-150",
            error
              ? "border-[#b3413a] focus-within:border-[#b3413a]"
              : "border-line-strong focus-within:border-emerald-700"
          )}
        >
          {icon && <span className="text-ink-faint shrink-0">{icon}</span>}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "flex-1 min-w-0 bg-transparent text-[14.5px] text-ink placeholder:text-ink-faint outline-none",
              className
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />
          {trailing}
        </div>
        {error && (
          <span id={`${inputId}-error`} className="text-[12.5px] text-[#b3413a]">
            {error}
          </span>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";
