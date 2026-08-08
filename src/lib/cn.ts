import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind class lists safely, resolving conflicts left-to-right. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
