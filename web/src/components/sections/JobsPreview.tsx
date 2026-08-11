"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { jobListings } from "@/data/site-data";

export function JobsPreview() {
  return (
    <section id="jobs" className="py-[80px] md:py-[96px]">
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <SectionHeading
            eyebrow="Jobs"
            title="Open roles, posted this week"
            description="Real listings from local companies and small teams — updated daily."
          />
          <Button variant="secondary" size="md" className="w-fit shrink-0">
            View all jobs <ArrowUpRight size={15} />
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {jobListings.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <Card className="p-5 h-full flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div className="h-9 w-9 rounded-[8px] bg-emerald-100 grid place-items-center font-display text-[13px] font-semibold text-emerald-700">
                    {job.company.charAt(0)}
                  </div>
                  <Badge tone="neutral">{job.type}</Badge>
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="font-display text-[16px] font-medium text-ink leading-snug">
                    {job.title}
                  </h3>
                  <p className="text-[13px] text-ink-muted">{job.company}</p>
                </div>

                <div className="flex flex-col gap-1.5 text-[12.5px] text-ink-muted mt-auto pt-2 border-t border-line">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={13} />
                    {job.location}
                    {job.remote ? " · Remote friendly" : ""}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={13} />
                    Posted {job.postedDaysAgo}d ago
                  </span>
                  <span className="font-mono text-[12.5px] text-ink pt-1">
                    {job.budget}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
