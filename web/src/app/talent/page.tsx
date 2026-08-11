import Link from "next/link";
import { Search, Users, X } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { TalentCard } from "@/components/talent/TalentCard";
import { TalentHeader } from "@/components/layout/TalentHeader";

interface TalentPageProps {
  searchParams: Promise<{
    q?: string;
    skill?: string;
  }>;
}

export default async function TalentPage({
  searchParams,
}: TalentPageProps) {
  const params = await searchParams;

  const query = params.q?.trim() || "";
  const selectedSkill = params.skill?.trim() || "";

  const talent = await prisma.user.findMany({
    where: {
      isActive: true,
      skills: {
        isEmpty: false,
      },

      ...(query
        ? {
            OR: [
              {
                name: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                bio: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                location: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                skills: {
                  has: query,
                },
              },
            ],
          }
        : {}),

      ...(selectedSkill
        ? {
            skills: {
              has: selectedSkill,
            },
          }
        : {}),
    },

    orderBy: {
      createdAt: "desc",
    },

    select: {
      id: true,
      name: true,
      location: true,
      bio: true,
      skills: true,
    },
  });

  // Get skills from the currently available network.
  const allTalent = await prisma.user.findMany({
    where: {
      isActive: true,
      skills: {
        isEmpty: false,
      },
    },
    select: {
      skills: true,
    },
  });

  const popularSkills = Array.from(
    new Set(allTalent.flatMap((person) => person.skills))
  ).slice(0, 8);

  const hasFilters = Boolean(query || selectedSkill);

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
      {/* Header */}
      <TalentHeader />

      {/* Search */}
      <section className="mt-10">
        <form
          action="/talent"
          method="GET"
          className="
            flex
            items-center
            gap-3
            h-13
            rounded-2xl
            border
            border-line
            bg-white
            px-5
            shadow-sm
            focus-within:border-emerald-500
            focus-within:ring-4
            focus-within:ring-emerald-50
            transition
          "
        >
          <Search
            size={19}
            className="text-ink-faint shrink-0"
          />

          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search people, skills, or locations..."
            className="
              w-full
              bg-transparent
              text-sm
              text-ink
              outline-none
              placeholder:text-ink-faint
            "
          />

          {selectedSkill && (
            <input
              type="hidden"
              name="skill"
              value={selectedSkill}
            />
          )}

          <button
            type="submit"
            className="
              hidden
              sm:inline-flex
              h-9
              items-center
              rounded-lg
              bg-emerald-800
              px-4
              text-sm
              font-medium
              text-white
              hover:bg-emerald-900
              transition
            "
          >
            Search
          </button>
        </form>
      </section>

      {/* Active filters */}
      {hasFilters && (
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <span className="text-xs text-ink-faint">
            Filtering by
          </span>

          {query && (
            <span
              className="
                inline-flex
                items-center
                gap-1.5
                rounded-full
                bg-emerald-50
                px-3
                py-1.5
                text-xs
                font-medium
                text-emerald-800
              "
            >
              “{query}”
            </span>
          )}

          {selectedSkill && (
            <span
              className="
                inline-flex
                items-center
                gap-1.5
                rounded-full
                bg-emerald-50
                px-3
                py-1.5
                text-xs
                font-medium
                text-emerald-800
              "
            >
              {selectedSkill}
            </span>
          )}

          <Link
            href="/talent"
            className="
              inline-flex
              items-center
              gap-1
              text-xs
              font-medium
              text-ink-muted
              hover:text-emerald-700
              transition
            "
          >
            Clear
            <X size={13} />
          </Link>
        </div>
      )}

      {/* Skill discovery */}
      {popularSkills.length > 0 && (
        <section className="mt-7">
          <div className="flex items-center gap-3 mb-3">
            <p
              className="
                font-mono
                text-xs
                uppercase
                tracking-[0.12em]
                text-ink-faint
              "
            >
              Explore skills
            </p>

            <div className="h-px flex-1 bg-line" />
          </div>

          <div className="flex flex-wrap gap-2">
            {popularSkills.map((skill) => {
              const isSelected = selectedSkill === skill;

              return (
                <Link
                  key={skill}
                  href={
                    isSelected
                      ? "/talent"
                      : `/talent?skill=${encodeURIComponent(skill)}`
                  }
                  className={`
                    rounded-full
                    border
                    px-4
                    py-2
                    text-xs
                    font-medium
                    transition-all
                    ${
                      isSelected
                        ? "border-emerald-600 bg-emerald-700 text-white"
                        : "border-line bg-white text-ink-muted hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
                    }
                  `}
                >
                  {skill}
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* People */}
      <section className="mt-12">
        <div
          className="
            flex
            items-end
            justify-between
            gap-4
            mb-5
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
              The community
            </p>

            <h2
              className="
                font-display
                text-2xl
                sm:text-3xl
                text-ink
                mt-2
              "
            >
              {hasFilters
                ? "Matching people"
                : "Skilled people"}
            </h2>
          </div>

          <p className="text-sm text-ink-muted">
            {talent.length}{" "}
            {talent.length === 1
              ? "person"
              : "people"}
          </p>
        </div>

        {talent.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-5">
            {talent.map((person) => (
              <TalentCard
                key={person.id}
                talent={person}
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
              py-14
              text-center
            "
          >
            <Users
              size={30}
              className="mx-auto text-emerald-700"
            />

            <h3
              className="
                font-display
                text-xl
                text-ink
                mt-4
              "
            >
              No matching people
            </h3>

            <p
              className="
                text-sm
                text-ink-muted
                mt-2
                max-w-md
                mx-auto
              "
            >
              Try another name, skill, or location.
            </p>

            <Link
              href="/talent"
              className="
                inline-flex
                items-center
                mt-5
                text-sm
                font-medium
                text-emerald-700
                hover:text-emerald-900
                transition
              "
            >
              View everyone
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}