import Link from "next/link";
import { MapPin, Pencil } from "lucide-react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { MarketplaceHeader } from "@/components/layout/MarketplaceHeader";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const initials =
    user.name
      .trim()
      .split(/\s+/)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <main className="min-h-screen">
      <div className="max-w-5xl mx-auto">
        <MarketplaceHeader
          title="My Profile"
          description="View your profile, skills, and experience."
        />
    
        {/* Profile Header */}
        <section
          className="
            rounded-3xl
            border
            border-line
            bg-white
            p-8
            shadow-sm
          "
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">

            {/* Avatar */}
            <div
              className="
                h-24
                w-24
                shrink-0
                rounded-3xl
                bg-emerald-100
                text-emerald-800
                text-2xl
                font-semibold
                grid
                place-items-center
              "
            >
              {initials}
            </div>

            {/* Identity */}
            <div className="flex-1">

              <h1
                className="
                  font-display
                  text-3xl
                  text-ink
                "
              >
                {user.name}
              </h1>

              {user.location && (
                <div className="flex items-center gap-1.5 mt-2">
                  <MapPin
                    size={15}
                    className="text-emerald-700"
                  />

                  <span className="text-sm text-ink-muted">
                    {user.location}
                  </span>
                </div>
              )}

            </div>

            {/* Edit */}
            <Link
              href="/profile/edit"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                h-10
                px-4
                rounded-xl
                border
                border-line
                text-sm
                font-medium
                text-ink
                hover:border-emerald-600
                hover:text-emerald-700
                transition
              "
            >
              <Pencil size={16} />
              Edit profile
            </Link>

          </div>
        </section>


        {/* About */}
        <section className="mt-8">

          <h2
            className="
              font-display
              text-2xl
              text-ink
            "
          >
            About
          </h2>

          <div
            className="
              mt-4
              rounded-2xl
              border
              border-line
              bg-white
              p-6
            "
          >
            {user.bio ? (
              <p className="text-sm leading-7 text-ink-muted whitespace-pre-line">
                {user.bio}
              </p>
            ) : (
              <p className="text-sm text-ink-faint">
                No bio added yet.
              </p>
            )}
          </div>

        </section>


        {/* Skills */}
        <section className="mt-8">

          <div>
            <h2
              className="
                font-display
                text-2xl
                text-ink
              "
            >
              Skills & Technologies
            </h2>

            <p className="text-sm text-ink-muted mt-1">
              Technologies and skills this user works with.
            </p>
          </div>


          <div className="mt-4">

            {user.skills.length > 0 ? (
              <div className="flex flex-wrap gap-3">

                {user.skills.map((skill) => (
                  <div
                    key={skill}
                    className="
                      rounded-xl
                      border
                      border-line
                      bg-white
                      px-4
                      py-3
                      text-sm
                      font-medium
                      text-ink
                      shadow-sm
                    "
                  >
                    {skill}
                  </div>
                ))}

              </div>
            ) : (
              <div
                className="
                  rounded-2xl
                  border
                  border-line
                  bg-white
                  p-6
                "
              >
                <p className="text-sm text-ink-faint">
                  No skills added yet.
                </p>
              </div>
            )}

          </div>

        </section>

      </div>
    </main>
  );
}