import Link from "next/link";
import { ArrowLeft, Users, GraduationCap } from "lucide-react";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CreateProjectForm } from "@/components/projects/CreateProjectForm";

interface CreateProjectPageProps {
  searchParams: Promise<{
    talent?: string;
  }>;
}

export default async function CreateProjectPage({
  searchParams,
}: CreateProjectPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const { talent } = await searchParams;

  // A project must always start from a selected talent.
  if (!talent) {
    redirect("/talent");
  }

  const selectedTalent = await prisma.user.findUnique({
    where: {
      id: talent,
    },
    select: {
      id: true,
      name: true,
      location: true,
      bio: true,
      skills: true,
      isActive: true,
    },
  });

  if (!selectedTalent || !selectedTalent.isActive) {
    redirect("/talent");
  }

  // Prevent users from creating a project with themselves.
  if (selectedTalent.id === user.id) {
    redirect("/talent");
  }

  const initials = selectedTalent.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <main>
      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <div className="pt-10">
          <Link
            href={`/talent/${selectedTalent.id}`}
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              text-ink-muted
              hover:text-emerald-700
              transition
            "
          >
            <ArrowLeft size={15} />
            Back to profile
          </Link>
        </div>

        {/* Header */}
        <div className="mt-8">
          <p
            className="
              font-mono
              text-xs
              uppercase
              tracking-[0.12em]
              text-emerald-700
            "
          >
            New project
          </p>

          <h1
            className="
              font-display
              text-3xl
              sm:text-4xl
              tracking-[-0.025em]
              text-ink
              mt-2
            "
          >
            Start something together
          </h1>

          <p
            className="
              text-sm
              sm:text-base
              text-ink-muted
              mt-3
              max-w-2xl
              leading-relaxed
            "
          >
            You&apos;re inviting someone from the Microjobs
            community to work with you. Give them an idea of
            what you want to build and how you&apos;d like to work
            together.
          </p>
        </div>

        {/* Selected talent */}
        <section
          className="
            mt-8
            rounded-2xl
            border
            border-emerald-100
            bg-emerald-50
            p-5
            sm:p-6
          "
        >
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div
              className="
                h-14
                w-14
                shrink-0
                rounded-2xl
                bg-white
                border
                border-emerald-100
                text-emerald-800
                font-display
                text-lg
                font-semibold
                grid
                place-items-center
              "
            >
              {initials}
            </div>

            {/* Talent info */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p
                  className="
                    text-xs
                    font-medium
                    uppercase
                    tracking-[0.1em]
                    text-emerald-700
                  "
                >
                  Inviting
                </p>

                <span
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    bg-white
                    border
                    border-emerald-100
                    px-2
                    py-1
                    text-[11px]
                    font-medium
                    text-emerald-800
                  "
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Active
                </span>
              </div>

              <h2
                className="
                  font-display
                  text-xl
                  sm:text-2xl
                  text-ink
                  mt-1
                "
              >
                {selectedTalent.name}
              </h2>

              {selectedTalent.location && (
                <p className="text-sm text-ink-muted mt-1">
                  {selectedTalent.location}
                </p>
              )}

              {selectedTalent.bio && (
                <p
                  className="
                    text-sm
                    leading-relaxed
                    text-ink-muted
                    mt-3
                    max-w-2xl
                  "
                >
                  {selectedTalent.bio}
                </p>
              )}

              {selectedTalent.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {selectedTalent.skills.slice(0, 6).map((skill) => (
                    <span
                      key={skill}
                      className="
                        rounded-full
                        bg-white
                        border
                        border-emerald-100
                        px-2.5
                        py-1
                        text-xs
                        font-medium
                        text-emerald-800
                      "
                    >
                      {skill}
                    </span>
                  ))}

                  {selectedTalent.skills.length > 6 && (
                    <span
                      className="
                        rounded-full
                        bg-white
                        border
                        border-emerald-100
                        px-2.5
                        py-1
                        text-xs
                        font-medium
                        text-ink-muted
                      "
                    >
                      +{selectedTalent.skills.length - 6}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Project form */}
        <section
          className="
            mt-8
            rounded-2xl
            border
            border-line
            bg-bg-raised
            p-6
            sm:p-8
          "
        >
          <div className="flex items-center gap-3 mb-7">
            <div
              className="
                h-10
                w-10
                rounded-xl
                bg-emerald-50
                text-emerald-700
                grid
                place-items-center
              "
            >
              <Users size={18} />
            </div>

            <div>
              <p
                className="
                  font-mono
                  text-[11px]
                  uppercase
                  tracking-[0.12em]
                  text-emerald-700
                "
              >
                Project setup
              </p>

              <h2 className="font-display text-xl text-ink mt-0.5">
                Project details
              </h2>

              <p className="text-sm text-ink-muted mt-0.5">
                Tell {selectedTalent.name.split(" ")[0]} what you want
                to work on together.
              </p>
            </div>
          </div>

          <CreateProjectForm talent={selectedTalent} />
        </section>

        {/* Project types */}
        <section className="mt-8 mb-12">
          <div className="mb-4">
            <p
              className="
                font-mono
                text-[11px]
                uppercase
                tracking-[0.12em]
                text-ink-faint
              "
            >
              What can this be?
            </p>

            <h2
              className="
                font-display
                text-xl
                text-ink
                mt-1
              "
            >
              Choose the kind of experience
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div
              className="
                rounded-2xl
                border
                border-line
                bg-white
                p-5
              "
            >
              <div
                className="
                  h-9
                  w-9
                  rounded-xl
                  bg-emerald-50
                  text-emerald-700
                  grid
                  place-items-center
                "
              >
                <Users size={17} />
              </div>

              <h3 className="font-display text-lg text-ink mt-3">
                Collaboration
              </h3>

              <p className="text-sm text-ink-muted mt-2 leading-relaxed">
                Work together on a real project, share
                responsibilities, and gain practical experience
                by building something as a team.
              </p>
            </div>

            <div
              className="
                rounded-2xl
                border
                border-line
                bg-white
                p-5
              "
            >
              <div
                className="
                  h-9
                  w-9
                  rounded-xl
                  bg-emerald-50
                  text-emerald-700
                  grid
                  place-items-center
                "
              >
                <GraduationCap size={17} />
              </div>

              <h3 className="font-display text-lg text-ink mt-3">
                Mentorship
              </h3>

              <p className="text-sm text-ink-muted mt-2 leading-relaxed">
                Learn from someone with relevant experience while
                working together toward a practical goal.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

