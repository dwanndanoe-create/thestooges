"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Briefcase, Users, Sparkles, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { roleCards } from "@/data/site-data";
import { cn } from "@/lib/cn";

const icons = {
  briefcase: Briefcase,
  users: Users,
  sparkles: Sparkles,
  "layout-grid": LayoutGrid,
};

const tilts = [-9, -3, 3, 9];
const offsetsX = [-42, -14, 14, 42];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const stackY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const stackOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative pt-[140px] md:pt-[168px] pb-[80px] overflow-hidden bg-dot-grid [background-position:center_-4px] [mask-image:linear-gradient(to_bottom,black_70%,transparent)]"
    >
      {/* ambient river-light wash, sits behind the grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full opacity-[0.14] blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-river-500), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[10%] left-[-8%] h-[360px] w-[360px] rounded-full opacity-[0.12] blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-sun-500), transparent 70%)" }}
      />

      <div className="container-page relative">
        <div className="grid md:grid-cols-2 gap-12 md:gap-8 items-center">
          {/* Copy column */}
          <div className="flex flex-col gap-7">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-line-strong bg-bg-raised px-3 py-1.5 font-mono text-[12px] text-ink-muted"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Wan profile. Ala wroko.
              <span className="text-ink-faint">— one profile, every job</span>
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="font-display text-[44px] md:text-[58px] leading-[1.04] tracking-[-0.03em] text-ink text-balance"
            >
              Find work. Build projects.
              <br />
              Meet local talent.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[17px] leading-relaxed text-ink-muted max-w-md text-balance"
            >
              Microjobs.sr is where people in Suriname hire, get hired, and
              team up on real projects — all from a single profile that
              grows with them.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex flex-wrap items-center gap-3 pt-1"
            >
              <Magnetic>
                <Button variant="primary" size="lg">
                  Browse jobs <ArrowRight size={16} />
                </Button>
              </Magnetic>
              <Button variant="secondary" size="lg">
                Explore talent
              </Button>
            </motion.div>
          </div>

          {/* Signature visual: fanned role-card stack tied to one profile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ y: stackY, opacity: stackOpacity }}
            className="relative h-[380px] md:h-[440px] flex items-center justify-center"
          >
            {/* connecting line */}
            <div
              aria-hidden
              className="absolute top-[46%] left-1/2 -translate-x-1/2 w-[2px] h-[120px] bg-gradient-to-b from-emerald-300 to-transparent"
            />

            {/* central profile node */}
            <div
              aria-hidden
              className="absolute top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 grid place-items-center h-16 w-16 rounded-full bg-emerald-700 text-white shadow-[0_16px_40px_-12px_rgba(19,29,25,0.22)] font-display font-semibold"
            >
              You
            </div>

            <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 flex">
              {roleCards.map((role, i) => {
                const Icon = icons[role.icon];
                return (
                  <motion.div
                    key={role.id}
                    initial={{ opacity: 0, y: 20, rotate: 0 }}
                    animate={{ opacity: 1, y: 0, rotate: tilts[i] }}
                    whileHover={{ rotate: 0, y: -10, zIndex: 20 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                    style={{ marginLeft: i === 0 ? 0 : -28 }}
                    className={cn(
                      "relative w-[132px] rounded-[14px] border border-line bg-bg-raised p-4",
                      "shadow-[0_4px_16px_-4px_rgba(19,29,25,0.14)] cursor-default select-none"
                    )}
                  >
                    <div
                      className="grid place-items-center h-8 w-8 rounded-[8px] mb-3"
                      style={{
                        background:
                          i % 2 === 0
                            ? "var(--color-emerald-100)"
                            : "var(--color-gold-100)",
                      }}
                    >
                      <Icon
                        size={16}
                        color={
                          i % 2 === 0
                            ? "var(--color-emerald-700)"
                            : "var(--color-gold-600)"
                        }
                      />
                    </div>
                    <p className="font-display text-[14px] font-medium text-ink">
                      {role.label}
                    </p>
                    <p className="text-[11px] leading-snug text-ink-muted mt-1">
                      {role.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

