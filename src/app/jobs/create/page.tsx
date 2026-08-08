import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

import { CreateJobForm } from "@/components/jobs/CreateJobForm";
import { MarketplaceHeader } from "@/components/layout/MarketplaceHeader";

export default async function CreateJobPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="max-w-6xl mx-auto px-30 py-10">
      <MarketplaceHeader
        title="Post a job"
        description="Tell the community what you need help with and find the right person for the job."
      />

      <div className="mt-18 max-w-4xl">
        <div
          className="
            rounded-2xl
            border
            border-line
            bg-bg-raised
            p-6
            sm:p-8
          "
        >
          <CreateJobForm />
        </div>
      </div>
    </main>
  );
}