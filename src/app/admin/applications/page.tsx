import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export default async function AdminApplicationsPage() {
  await requireAdmin();

  const applications = await prisma.jobApplication.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      job: {
        select: {
          title: true,
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
    <main className="min-h-screen bg-bg">
      <div className="mx-auto max-w-7xl px-6 py-10">

        <h1 className="font-display text-3xl text-ink">
          Applications
        </h1>

        <p className="mt-2 text-sm text-ink-muted">
          Monitor applications submitted across the platform.
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-white">
          <div className="divide-y divide-line">
            {applications.map((application) => (
              <div
                key={application.id}
                className="p-5"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="font-medium text-ink">
                      {application.job.title}
                    </h2>

                    <p className="mt-1 text-sm text-ink-muted">
                      Applicant: {application.user.name}
                    </p>

                    <p className="text-xs text-ink-faint">
                      {application.user.email}
                    </p>

                    <p className="mt-2 text-xs text-ink-faint">
                      Job owner: {application.job.creator.name}
                    </p>
                  </div>

                  <span className="rounded-full bg-bg-sunken px-2.5 py-1 text-xs text-ink-muted">
                    {application.status}
                  </span>
                </div>
              </div>
            ))}

            {applications.length === 0 && (
              <div className="p-10 text-center text-sm text-ink-muted">
                No applications yet.
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}