import { BriefcaseBusiness, Search } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { JobCard } from "@/components/dashboard/JobCard";
import { MarketplaceHeader } from "@/components/layout/MarketplaceHeader";

export default async function JobsPage() {
  const jobs = await prisma.job.findMany({
    where: {
      status: "OPEN",
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      creator: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
      {/* Branded header */}
      <MarketplaceHeader
        title="Find jobs"
        description="Discover jobs and paid opportunities posted by people and businesses across Suriname."
        action={{
            label: "Post a job",
            href: "/jobs/create",
        }}
        />
      {/* Search */}
      <div className="mt-8 sm:mt-10">
        <div
          className="
            flex
            items-center
            gap-3
            h-12
            rounded-xl
            border
            border-line
            bg-white
            px-4
            shadow-sm
            focus-within:border-emerald-600
            focus-within:ring-2
            focus-within:ring-emerald-100
            transition
          "
        >
          <Search
            size={18}
            className="text-ink-faint shrink-0"
          />

          <input
            type="text"
            placeholder="Search jobs..."
            className="
              w-full
              bg-transparent
              text-sm
              text-ink
              outline-none
              placeholder:text-ink-faint
            "
          />
        </div>
      </div>

      {/* Results */}
      <section className="mt-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-display text-xl text-ink">
              Open jobs
            </h2>

            <p className="text-sm text-ink-muted mt-1">
              {jobs.length}{" "}
              {jobs.length === 1 ? "job" : "jobs"} available
            </p>
          </div>
        </div>

        {jobs.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-5">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={{
                  id: job.id,
                  title: job.title,
                  description: job.description,
                  company: job.creator.name,
                  location: job.location,
                  skills: job.skills,
                  budget: job.budget,
                }}
              />
            ))}
          </div>
        ) : (
          <div
            className="
              rounded-2xl
              border
              border-line
              bg-bg-raised
              px-6
              py-12
              text-center
            "
          >
            <BriefcaseBusiness
              size={30}
              className="mx-auto text-emerald-700"
            />

            <h3 className="font-display text-xl text-ink mt-4">
              No jobs yet
            </h3>

            <p className="text-sm text-ink-muted mt-2">
              Be the first person to post an opportunity.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
