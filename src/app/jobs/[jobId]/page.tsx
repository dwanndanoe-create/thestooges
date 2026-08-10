import Link from "next/link";
import { ArrowLeft, BriefcaseBusiness, MapPin, Wallet } from "lucide-react";
import { notFound, redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { ApplyToJobButton } from "@/components/jobs/ApplyToJobButton";

interface JobPageProps {
  params: Promise<{
    jobId: string;
  }>;
}

export default async function JobPage({
  params,
}: JobPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const { jobId } = await params;

  const job = await prisma.job.findUnique({
        where: {
            id: jobId,
        },
        include: {
            creator: {
            select: {
                id: true,
                name: true,
                location: true,
            },
            },
            applications: {
            where: {
                userId: user.id,
            },
            select: {
                id: true,
                status: true,
            },
            },
        },
        });

  if (!job) {
    notFound();
  }

const isCreator = job.creatorId === user.id;
const existingApplication = job.applications[0];
const hasApplied = !!existingApplication;

  const initials = job.creator.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">

        {/* Back */}
        <Link
          href="/listings"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            text-ink-muted
            transition
            hover:text-emerald-700
          "
        >
          <ArrowLeft size={15} />
          Back to listings
        </Link>

        {/* Job */}
        <section
          className="
            mt-8
            overflow-hidden
            rounded-3xl
            border
            border-line
            bg-white
            shadow-sm
          "
        >
          <div className="h-2 bg-emerald-700" />

          <div className="p-6 sm:p-8">

            {/* Status */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`
                  rounded-full
                  px-2.5
                  py-1
                  text-xs
                  font-medium
                  ${
                    job.status === "OPEN"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-bg-sunken text-ink-muted"
                  }
                `}
              >
                {job.status}
              </span>
            </div>

            {/* Title */}
            <h1
              className="
                mt-4
                font-display
                text-3xl
                tracking-[-0.025em]
                text-ink
                sm:text-4xl
              "
            >
              {job.title}
            </h1>

            {/* Description */}
            <p
              className="
                mt-4
                max-w-2xl
                whitespace-pre-wrap
                text-base
                leading-relaxed
                text-ink-muted
              "
            >
              {job.description}
            </p>

            {/* Details */}
            <div className="mt-6 flex flex-wrap gap-4">
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-bg-sunken
                  px-4
                  py-3
                  text-sm
                  text-ink-muted
                "
              >
                <Wallet size={16} />
                Budget: {job.budget}
              </div>

              {job.location && (
                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-bg-sunken
                    px-4
                    py-3
                    text-sm
                    text-ink-muted
                  "
                >
                  <MapPin size={16} />
                  {job.location}
                </div>
              )}
            </div>

            {/* Skills */}
            {job.skills.length > 0 && (
              <div className="mt-6">
                <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">
                  Skills
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="
                        rounded-full
                        bg-emerald-50
                        px-3
                        py-1.5
                        text-xs
                        font-medium
                        text-emerald-800
                      "
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
        
            {/* Application */}
    {!isCreator && (
      <section
        className="
          mt-6
          rounded-2xl
          border
          border-line
          bg-white
          p-6
        "
      >
        <div>
          <p
            className="
              font-mono
              text-xs
              uppercase
              tracking-[0.12em]
              text-emerald-700
            "
          >
            Interested?
          </p>

          <h2
            className="
              mt-1
              font-display
              text-xl
              text-ink
            "
          >
            Apply for this job
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            Send your application to {job.creator.name} and let
            them know you&apos;re interested in working on this
            project.
          </p>

          <div className="mt-5">
            {job.status !== "OPEN" ? (
              <p className="text-sm text-ink-muted">
                This job is no longer accepting applications.
              </p>
            ) : hasApplied ? (
              <div
                className="
                  rounded-xl
                  bg-emerald-50
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-emerald-800
                "
              >
                Application submitted — {existingApplication.status}
              </div>
            ) : (
              <ApplyToJobButton jobId={job.id} />
            )}
          </div>
        </div>
      </section>
    )}

        {/* Creator */}
        <section
          className="
            mt-6
            rounded-2xl
            border
            border-line
            bg-white
            p-6
          "
        >
          <div className="flex items-center gap-4">
            <div
              className="
                grid
                h-12
                w-12
                shrink-0
                place-items-center
                rounded-xl
                bg-emerald-50
                font-display
                font-semibold
                text-emerald-800
              "
            >
              {initials}
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">
                Posted by
              </p>

              <p className="mt-1 font-medium text-ink">
                {job.creator.name}
              </p>

              {job.creator.location && (
                <p className="text-sm text-ink-muted">
                  {job.creator.location}
                </p>
              )}
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}