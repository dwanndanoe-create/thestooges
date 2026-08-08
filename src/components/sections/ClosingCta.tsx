"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";

export function ClosingCta() {
  return (
    <section className="py-[80px] md:py-[96px]">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[22px] bg-emerald-900 px-8 py-14 md:px-16 md:py-16 text-center flex flex-col items-center gap-6"
        >
          <div
            aria-hidden
            className="absolute -top-24 -right-24 h-64 w-64 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, var(--color-emerald-300), transparent 70%)" }}
          />
          <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-emerald-300">
            Get started
          </span>
          <h2 className="font-display text-[30px] md:text-[38px] leading-[1.15] tracking-[-0.02em] text-white max-w-xl text-balance">
            Set up your profile once. Use it for every job, project, and collaboration after.
          </h2>
          <Magnetic>
            <Button
              variant="primary"
              size="lg"
              className="bg-white text-emerald-900 hover:bg-emerald-100"
            >
              Create your profile <ArrowRight size={16} />
            </Button>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
