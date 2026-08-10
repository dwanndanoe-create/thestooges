import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { toggleJobStatus } from "@/app/actions/adminJobs";

export default async function AdminJobsPage() {
  await requireAdmin();

  const jobs = await prisma.job.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      creator: {
        select: {
          name: true,
          email: true,
        },
      },
      _count: {
        select: {
          applications: true,
        },
      },
    },
  });

  return (
    <main className="min-h-screen bg-bg">
      <div className="mx-auto max-w-7xl px-6 py-10">

        <h1 className="font-display text-3xl text-ink">
          Jobs
        </h1>

        <p className="mt-2 text-sm text-ink-muted">
          Monitor and manage posted jobs.
        </p>

        <div className="mt-8 space-y-4">
          {jobs.map((job) => (
            <article
              key={job.id}
              className="rounded-2xl border border-line bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-display text-xl text-ink">
                      {job.title}
                    </h2>

                    <span className="rounded-full bg-bg-sunken px-2.5 py-1 text-xs text-ink-muted">
                      {job.status}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-ink-muted">
                    Posted by {job.creator.name} ({job.creator.email})
                  </p>

                  <p className="mt-3 text-sm text-ink-muted">
                    Budget: {job.budget} SRD
                  </p>

                  <p className="mt-1 text-xs text-ink-faint">
                    {job._count.applications} application
                    {job._count.applications === 1 ? "" : "s"}
                  </p>
                </div>

                <form action={toggleJobStatus}>
                  <input
                    type="hidden"
                    name="jobId"
                    value={job.id}
                  />

                  <button
                    type="submit"
                    className="rounded-xl border border-line px-4 py-2.5 text-sm font-medium text-ink transition hover:border-emerald-600 hover:text-emerald-700"
                  >
                    {job.status === "OPEN" ? "Close job" : "Reopen job"}
                  </button>
                </form>
              </div>
            </article>
          ))}
        </div>

      </div>
    </main>
  );
}