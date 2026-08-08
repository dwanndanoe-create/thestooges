"use client";

import { motion } from "framer-motion";
import { UserCircle2, Handshake, FolderGit2, MapPinned } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const values = [
  {
    icon: UserCircle2,
    title: "One profile, not five accounts",
    description:
      "Your work history, skills, and portfolio live in one place — whether you're hiring, applying, or joining a team.",
  },
  {
    icon: Handshake,
    title: "Collaborators, not just candidates",
    description:
      "Projects section connects you with people building things, not just companies filling seats.",
  },
  {
    icon: FolderGit2,
    title: "A portfolio that grows with you",
    description:
      "Every job and project you complete adds to a track record other people can actually see.",
  },
  {
    icon: MapPinned,
    title: "Built around local work",
    description:
      "Listings are grounded in Suriname — from Paramaribo studios to district-level community projects.",
  },
];

export function WhyMicrojobs() {
  return (
    <section id="why" className="py-[80px] md:py-[96px] border-t border-line">
      <div className="container-page">
        <SectionHeading
          eyebrow="Why Microjobs"
          title="One account. Every way to work."
          align="center"
          className="mb-14"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line rounded-[16px] overflow-hidden border border-line">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="bg-bg-raised p-7 flex flex-col gap-4"
            >
              <div className="h-10 w-10 rounded-[10px] bg-emerald-100 grid place-items-center">
                <value.icon size={18} color="var(--color-emerald-700)" />
              </div>
              <h3 className="font-display text-[16px] font-medium text-ink leading-snug">
                {value.title}
              </h3>
              <p className="text-[13.5px] leading-relaxed text-ink-muted">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
