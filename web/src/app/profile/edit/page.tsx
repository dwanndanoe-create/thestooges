import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";
import { ProfileEditForm } from "./ProfileEditForm";

export default async function EditProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-bg px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-emerald-700">
            Your Profile
          </p>

          <h1 className="font-display text-3xl text-ink mt-2">
            Edit your profile
          </h1>

          <p className="text-ink-muted mt-2">
            Keep your profile up to date so people know who
            they are working with.
          </p>
        </div>

        <div className="rounded-2xl border border-line bg-white p-6 md:p-8">
          <ProfileEditForm
            initialName={user.name}
            initialLocation={user.location}
            initialBio={user.bio}
            initialSkills={user.skills}
            email={user.email}
          />
        </div>
      </div>
    </main>
  );
}