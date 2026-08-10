import Link from "next/link";
import { FolderKanban, Users, ArrowRight } from "lucide-react";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { MarketplaceHeader } from "@/components/layout/MarketplaceHeader";

export default async function ProjectsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const projects = await prisma.project.findMany({
    where: {
      OR: [
        {
          creatorId: user.id,
        },
        {
          members: {
            some: {
              userId: user.id,
              status: "ACCEPTED",
            },
          },
        },
      ],
    },
    include: {
      creator: {
        select: {
          id: true,
          name: true,
        },
      },
      members: {
        where: {
          status: "ACCEPTED",
        },
        select: {
          id: true,
          userId: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <MarketplaceHeader
          title="Your Projects"
          description="Projects you're creating and collaborating on."
        />

        {/* Projects */}
        <section className="mt-10">
          {projects.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2">
              {projects.map((project) => {
                const isCreator = project.creatorId === user.id;

                return (
                  <article
                    key={project.id}
                    className="
                      group
                      overflow-hidden
                      rounded-2xl
                      border
                      border-line
                      bg-white
                      shadow-sm
                      transition-all
                      hover:-translate-y-0.5
                      hover:border-emerald-200
                      hover:shadow-md
                    "
                  >
                    {/* Accent */}
                    <div className="h-1.5 bg-emerald-700" />

                    <div className="p-6">
                      {/* Top row */}
                      <div className="flex items-start justify-between gap-4">
                        <div
                          className="
                            grid
                            h-11
                            w-11
                            shrink-0
                            place-items-center
                            rounded-xl
                            bg-emerald-50
                            text-emerald-700
                          "
                        >
                          <FolderKanban size={20} />
                        </div>

                        <div className="flex flex-wrap justify-end gap-2">
                          <span
                            className="
                              rounded-full
                              bg-emerald-50
                              px-2.5
                              py-1
                              text-[11px]
                              font-medium
                              text-emerald-800
                            "
                          >
                            {project.type === "COLLABORATION"
                              ? "Collaboration"
                              : "Mentorship"}
                          </span>

                          <span
                            className="
                              rounded-full
                              bg-bg-sunken
                              px-2.5
                              py-1
                              text-[11px]
                              font-medium
                              text-ink-muted
                            "
                          >
                            {project.status}
                          </span>
                        </div>
                      </div>

                      {/* Project info */}
                      <div className="mt-5">
                        <h2
                          className="
                            font-display
                            text-xl
                            tracking-[-0.015em]
                            text-ink
                          "
                        >
                          {project.title}
                        </h2>

                        <p
                          className="
                            mt-2
                            line-clamp-3
                            text-sm
                            leading-relaxed
                            text-ink-muted
                          "
                        >
                          {project.description}
                        </p>
                      </div>

                      {/* Meta */}
                      <div
                        className="
                          mt-5
                          flex
                          flex-wrap
                          items-center
                          gap-x-5
                          gap-y-2
                          border-t
                          border-line
                          pt-4
                        "
                      >
                        <div className="flex items-center gap-2">
                          <Users
                            size={15}
                            className="text-emerald-700"
                          />

                          <span className="text-xs text-ink-muted">
                            {project.members.length + 1}{" "}
                            {project.members.length + 1 === 1
                              ? "person"
                              : "people"}
                          </span>
                        </div>

                        <span className="text-xs text-ink-faint">
                          {isCreator
                            ? "You are the creator"
                            : `Created by ${project.creator.name}`}
                        </span>
                      </div>

                      {/* Action */}
                      <div className="mt-5">
                        <Link
                          href={`/projects/${project.id}`}
                          className="
                            group/link
                            inline-flex
                            items-center
                            gap-2
                            text-sm
                            font-medium
                            text-emerald-700
                            transition-colors
                            hover:text-emerald-900
                          "
                        >
                          View project

                          <ArrowRight
                            size={15}
                            className="
                              transition-transform
                              duration-200
                              group-hover/link:translate-x-0.5
                            "
                          />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            /* Empty state */
            <section
              className="
                rounded-3xl
                border
                border-line
                bg-white
                px-6
                py-16
                text-center
                shadow-sm
              "
            >
              <div
                className="
                  mx-auto
                  grid
                  h-14
                  w-14
                  place-items-center
                  rounded-2xl
                  bg-emerald-50
                  text-emerald-700
                "
              >
                <FolderKanban size={24} />
              </div>

              <h2
                className="
                  mt-5
                  font-display
                  text-2xl
                  text-ink
                "
              >
                No projects yet
              </h2>

              <p
                className="
                  mx-auto
                  mt-2
                  max-w-md
                  text-sm
                  leading-relaxed
                  text-ink-muted
                "
              >
                You haven&apos;t created or joined any projects yet.
                Find someone to work with and start your first project.
              </p>

              <Link
                href="/talent"
                className="
                  mt-6
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-emerald-800
                  px-5
                  py-3
                  text-sm
                  font-medium
                  text-white
                  shadow-sm
                  transition-all
                  hover:bg-emerald-900
                  hover:-translate-y-0.5
                "
              >
                Browse talent
                <ArrowRight size={15} />
              </Link>
            </section>
          )}
        </section>
      </div>
    </main>
  );
}