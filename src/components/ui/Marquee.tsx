"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Marquee({
  items,
  durationSeconds = 26,
  reverse = false,
}: {
  items: ReactNode[];
  durationSeconds?: number;
  reverse?: boolean;
}) {
  return (
    <div className="relative overflow-hidden no-scrollbar [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <motion.div
        className="marquee-track"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: durationSeconds, ease: "linear", repeat: Infinity }}
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} className="shrink-0">
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
