import Link from "next/link";
import { ArrowLeft, BriefcaseBusiness, MapPin, Wallet } from "lucide-react";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export default async function ListingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const listings = await prisma.job.findMany({
    where: {
      creatorId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      description: true,
      budget: true,
      location: true,
      skills: true,
      status: true,
      createdAt: true,
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
              <BriefcaseBusiness size={20} />
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
                My Listings
              </h1>
            </div>
          </div>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
            Manage the jobs you&apos;ve posted and see how they appear
            to other users.
          </p>
        </section>

        {/* Listings */}
        {listings.length === 0 ? (
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
              <BriefcaseBusiness size={20} />
            </div>

            <h2 className="mt-4 font-display text-xl text-ink">
              No listings yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">
              You haven&apos;t posted a job yet. Create your first
              listing to start finding the right talent.
            </p>

            <Link
              href="/jobs/create"
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
              Post a job
            </Link>
          </section>
        ) : (
          <div className="mt-8 space-y-4">
            {listings.map((listing) => (
              <article
                key={listing.id}
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
                    <div className="flex flex-wrap items-center gap-2">
                      <h2
                        className="
                          font-display
                          text-xl
                          text-ink
                        "
                      >
                        {listing.title}
                      </h2>

                      <span
                        className={`
                          rounded-full
                          px-2.5
                          py-1
                          text-[11px]
                          font-medium
                          ${
                            listing.status === "OPEN"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-bg-sunken text-ink-muted"
                          }
                        `}
                      >
                        {listing.status}
                      </span>
                    </div>

                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
                      {listing.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-4 text-xs text-ink-muted">
                      <span className="inline-flex items-center gap-1.5">
                        <Wallet size={14} />
                        {listing.budget}
                      </span>

                      {listing.location && (
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={14} />
                          {listing.location}
                        </span>
                      )}
                    </div>

                    {listing.skills.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {listing.skills.map((skill) => (
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
                  </div>

                  <Link
                    href={`/jobs/${listing.id}`}
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
                    View details
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