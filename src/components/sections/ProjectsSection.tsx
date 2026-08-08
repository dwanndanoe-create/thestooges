"use client";

import { motion } from "framer-motion";
import { Users2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { projectListings } from "@/data/site-data";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-[80px] md:py-[96px] bg-bg-sunken border-y border-line">
      <div className="container-page">
        <SectionHeading
          eyebrow="Projects"
          title="Teams forming right now"
          description="Join a project that needs your specific skill, or start one of your own."
          className="mb-10"
        />

        <div className="grid md:grid-cols-3 gap-5">
          {projectListings.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <Card className="p-6 h-full flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <span className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
                    {project.owner}
                  </span>
                  <h3 className="font-display text-[18px] font-medium text-ink leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-[13.5px] text-ink-muted leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {project.skillsNeeded.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-line-strong px-2.5 py-1 text-[11.5px] font-medium text-ink-muted"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex flex-col gap-2.5 pt-3 border-t border-line">
                  <div className="flex items-center justify-between text-[12.5px] text-ink-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <Users2 size={13} />
                      {project.membersJoined}/{project.teamSize} joined
                    </span>
                    <span className="font-mono">{project.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-bg-sunken overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${project.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full rounded-full bg-emerald-500"
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
