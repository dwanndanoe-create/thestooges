import Link from "next/link";
import { ArrowLeft, MapPin, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { MessageButton } from "@/components/messages/MessageButton";

interface TalentProfilePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TalentProfilePage({
  params,
}: TalentProfilePageProps) {
  const { id } = await params;

  const talent = await prisma.user.findUnique({
    where: {
      id,
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

  if (!talent || !talent.isActive) {
    notFound();
  }

  const initials = talent.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <main className="min-h-screen bg-bg">
      <div className="mx-auto max-w-5xl px-5 py-6 sm:px-6 lg:px-8">
        {/* Top navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/talent"
            className="
              group
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-ink-muted
              hover:text-emerald-700
              transition
            "
          >
            <ArrowLeft
              size={16}
              className="
                transition-transform
                duration-200
                group-hover:-translate-x-0.5
              "
            />

            Back to talent
          </Link>
        </div>

        {/* Profile hero */}
        <section
          className="
            mt-8
            rounded-3xl
            border
            border-line
            bg-white
            overflow-hidden
            shadow-sm
          "
        >
          {/* Accent */}
          <div className="h-2 bg-emerald-700" />

          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start gap-5">
              {/* Avatar */}
              <div
                className="
                  flex
                  h-20
                  w-20
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-emerald-50
                  text-emerald-800
                  font-display
                  text-2xl
                  font-semibold
                  border
                  border-emerald-100
                "
              >
                {initials}
              </div>

              {/* Identity */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1
                    className="
                      font-display
                      text-3xl
                      sm:text-4xl
                      tracking-[-0.025em]
                      text-ink
                    "
                  >
                    {talent.name}
                  </h1>

                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-full
                      bg-emerald-50
                      px-2.5
                      py-1
                      text-xs
                      font-medium
                      text-emerald-800
                    "
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Active
                  </span>
                </div>

                {talent.location && (
                  <div
                    className="
                      flex
                      items-center
                      gap-1.5
                      mt-2
                      text-sm
                      text-ink-muted
                    "
                  >
                    <MapPin size={14} />
                    {talent.location}
                  </div>
                )}
              </div>

              {/* Contact through Microjobs */}
              <MessageButton 
              userId={talent.id}
              userName={talent.name}
              />
            </div>

            {/* Bio */}
            <div className="mt-8 max-w-2xl">
              <p
                className="
                  text-base
                  leading-relaxed
                  text-ink-muted
                "
              >
                {talent.bio ||
                  "This person hasn't added a bio yet."}
              </p>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-emerald-50
                text-emerald-700
              "
            >
              <Sparkles size={16} />
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
                Expertise
              </p>

              <h2
                className="
                  font-display
                  text-xl
                  text-ink
                "
              >
                Skills
              </h2>
            </div>
          </div>

          {talent.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {talent.skills.map((skill) => (
                <span
                  key={skill}
                  className="
                    rounded-full
                    border
                    border-emerald-100
                    bg-emerald-50
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-emerald-800
                  "
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-ink-muted">
              No skills have been added yet.
            </p>
          )}
        </section>

        {/* About / collaboration */}
        <section className="mt-10">
          <div
            className="
              rounded-2xl
              border
              border-line
              bg-bg-raised
              p-6
              sm:p-7
            "
          >
            <p
              className="
                font-mono
                text-xs
                uppercase
                tracking-[0.12em]
                text-ink-faint
              "
            >
              Looking to work together?
            </p>

            <h2
              className="
                font-display
                text-2xl
                text-ink
                mt-2
              "
            >
              Start a conversation
            </h2>

            <p
              className="
                text-sm
                leading-relaxed
                text-ink-muted
                mt-2
                max-w-xl
              "
            >
              Reach out to {talent.name.split(" ")[0]} if
              you think their skills could be a good fit
              for your next project.
            </p>

            <div className="mt-5">
              <MessageButton 
              userId={talent.id} 
              userName={talent.name}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}