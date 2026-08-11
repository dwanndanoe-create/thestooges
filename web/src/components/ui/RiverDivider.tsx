"use client";

import { motion } from "framer-motion";

export function RiverDivider({ tone = "line" }: { tone?: "line" | "emerald" }) {
  const stroke = tone === "emerald" ? "var(--color-emerald-500)" : "var(--color-line-strong)";
  return (
    <div className="w-full overflow-hidden leading-[0]" aria-hidden>
      <svg
        viewBox="0 0 1440 60"
        className="w-full h-[36px] md:h-[48px]"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,30 C 180,60 360,0 540,30 C 720,60 900,0 1080,30 C 1260,60 1350,15 1440,30"
          fill="none"
          stroke={stroke}
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
