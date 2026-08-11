import Link from "next/link";
import {
  ArrowLeft,
  Send,
  MapPin,
  Wallet,
  Clock3,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export default async function RequestsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const requests = await prisma.jobApplication.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      status: true,
      message: true,
      createdAt: true,
      job: {
        select: {
          id: true,
          title: true,
          description: true,
          budget: true,
          location: true,
          skills: true,
          status: true,
          creator: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">

        {/* Back */}
        <Link
          href="/dashboard"
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
          Back to dashboard
        </Link>

        {/* Header */}
        <section className="mt-8">
          <div className="flex items-center gap-3">
            <div
              className="
                grid
                h-11
                w-11
                place-items-center
                rounded-xl
                bg-emerald-50
                text-emerald-700
              "
            >
              <Send size={20} />
            </div>

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
                Your workspace
              </p>

              <h1
                className="
                  font-display
                  text-3xl
                  tracking-[-0.025em]
                  text-ink
                "
              >
                Requests Sent
              </h1>
            </div>
          </div>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
            Track the jobs you&apos;ve applied to and see the status of
            your requests.
          </p>
        </section>

        {/* Requests */}
        {requests.length === 0 ? (
          <section
            className="
              mt-8
              rounded-2xl
              border
              border-line
              bg-white
              p-8
              text-center
            "
          >
            <div
              className="
                mx-auto
                grid
                h-12
                w-12
                place-items-center
                rounded-xl
                bg-bg-sunken
                text-ink-muted
              "
            >
              <Send size={20} />
            </div>

            <h2 className="mt-4 font-display text-xl text-ink">
              No requests yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">
              You haven&apos;t applied to any jobs yet. Browse available
              jobs and send your first application.
            </p>

            <Link
              href="/jobs"
              className="
                mt-5
                inline-flex
                items-center
                rounded-xl
                bg-emerald-800
                px-4
                py-2.5
                text-sm
                font-medium
                text-white
                transition
                hover:bg-emerald-900
              "
            >
              Browse jobs
            </Link>
          </section>
        ) : (
          <div className="mt-8 space-y-4">
            {requests.map((request) => (
              <article
                key={request.id}
                className="
                  rounded-2xl
                  border
                  border-line
                  bg-white
                  p-6
                  shadow-sm
                "
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">

                    {/* Title + application status */}
                    <div className="flex flex-wrap items-center gap-2">
                      <h2
                        className="
                          font-display
                          text-xl
                          text-ink
                        "
                      >
                        {request.job.title}
                      </h2>

                      <span
                        className={`
                          inline-flex
                          items-center
                          gap-1.5
                          rounded-full
                          px-2.5
                          py-1
                          text-[11px]
                          font-medium
                          ${
                            request.status === "PENDING"
                              ? "bg-amber-50 text-amber-700"
                              : request.status === "ACCEPTED"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-red-50 text-red-700"
                          }
                        `}
                      >
                        {request.status === "PENDING" && (
                          <Clock3 size={12} />
                        )}

                        {request.status === "ACCEPTED" && (
                          <CheckCircle2 size={12} />
                        )}

                        {request.status === "REJECTED" && (
                          <XCircle size={12} />
                        )}

                        {request.status}
                      </span>
                    </div>

                    {/* Job description */}
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
                      {request.job.description}
                    </p>

                    {/* Job details */}
                    <div className="mt-4 flex flex-wrap gap-4 text-xs text-ink-muted">
                      <span className="inline-flex items-center gap-1.5">
                        <Wallet size={14} />
                        {request.job.budget}
                      </span>

                      {request.job.location && (
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={14} />
                          {request.job.location}
                        </span>
                      )}

                      <span>
                        Posted by {request.job.creator.name}
                      </span>
                    </div>

                    {/* Skills */}
                    {request.job.skills.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {request.job.skills.map((skill) => (
                          <span
                            key={skill}
                            className="
                              rounded-full
                              bg-bg-sunken
                              px-2.5
                              py-1
                              text-xs
                              text-ink-muted
                            "
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Application message */}
                    {request.message && (
                      <div
                        className="
                          mt-5
                          rounded-xl
                          bg-bg-sunken
                          p-4
                        "
                      >
                        <p className="text-[11px] font-medium uppercase tracking-wide text-ink-faint">
                          Your application message
                        </p>

                        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                          {request.message}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* View job */}
                  <Link
                    href={`/jobs/${request.job.id}`}
                    className="
                      inline-flex
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-line
                      bg-white
                      px-4
                      py-2.5
                      text-sm
                      font-medium
                      text-ink
                      transition
                      hover:border-emerald-600
                      hover:text-emerald-700
                      hover:shadow-sm
                    "
                  >
                    View job
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}