"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { talentProfiles } from "@/data/site-data";
import { cn } from "@/lib/cn";
import type { AvailabilityStatus } from "@/lib/types";

const availabilityTone: Record<AvailabilityStatus, "emerald" | "gold" | "neutral"> = {
  Available: "emerald",
  "Open to offers": "gold",
  Booked: "neutral",
};

const accentGradient: Record<string, string> = {
  emerald: "linear-gradient(135deg, var(--color-emerald-700), var(--color-emerald-300))",
  teal: "linear-gradient(135deg, var(--color-teal-700), var(--color-emerald-300))",
  gold: "linear-gradient(135deg, var(--color-gold-600), var(--color-emerald-300))",
};

export function TalentSection() {
  return (
    <section id="talent" className="py-[80px] md:py-[96px]">
      <div className="container-page">
        <SectionHeading
          eyebrow="Talent"
          title="Profiles built to show real work"
          description="Skills, availability, and a portfolio link — everything you need to make the first move."
          className="mb-10"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {talentProfiles.map((person, i) => (
            <motion.div
              key={person.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <Card className="p-6 flex flex-col gap-4 h-full">
                <div className="flex items-start justify-between">
                  <div
                    className="h-12 w-12 rounded-full grid place-items-center font-display text-[14px] font-semibold text-white"
                    style={{ background: accentGradient[person.accent] }}
                    aria-hidden
                  >
                    {person.initials}
                  </div>
                  <Badge tone={availabilityTone[person.availability]}>
                    {person.availability}
                  </Badge>
                </div>

                <div className="flex flex-col gap-0.5">
                  <h3 className="font-display text-[16px] font-medium text-ink">
                    {person.name}
                  </h3>
                  <p className="text-[13px] text-ink-muted">{person.role}</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {person.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-bg-sunken px-2.5 py-1 text-[11.5px] font-medium text-ink-muted"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between pt-3 border-t border-line">
                  <span className="font-mono text-[12px] text-ink-faint">
                    {person.experience} experience
                  </span>
                  <button
                    className={cn(
                      "inline-flex items-center gap-1 text-[12.5px] font-medium text-emerald-700",
                      "hover:text-emerald-900 transition-colors"
                    )}
                  >
                    Portfolio <ExternalLink size={12} />
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
