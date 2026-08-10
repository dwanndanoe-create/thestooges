import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { AdminNav } from "@/components/admin/AdminNav";

export default async function AdminProjectsPage() {
  await requireAdmin();

  const projects = await prisma.project.findMany({
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
          members: true,
        },
      },
    },
  });

  return (
    <main className="min-h-screen bg-bg">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <AdminNav />
        <h1 className="font-display text-3xl text-ink">
          Projects
        </h1>

        <p className="mt-2 text-sm text-ink-muted">
          Monitor collaboration and mentorship projects.
        </p>

        <div className="mt-8 space-y-4">
          {projects.map((project) => (
            <article
              key={project.id}
              className="rounded-2xl border border-line bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="font-display text-xl text-ink">
                    {project.title}
                  </h2>

                  <p className="mt-1 text-sm text-ink-muted">
                    Created by {project.creator.name}
                  </p>

                  <p className="mt-1 text-xs text-ink-faint">
                    {project.creator.email}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-bg-sunken px-2.5 py-1 text-xs text-ink-muted">
                      {project.type}
                    </span>

                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs text-emerald-700">
                      {project.status}
                    </span>

                    <span className="rounded-full bg-bg-sunken px-2.5 py-1 text-xs text-ink-muted">
                      {project._count.members} member
                      {project._count.members === 1 ? "" : "s"}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}

          {projects.length === 0 && (
            <div className="rounded-2xl border border-line bg-white p-10 text-center text-sm text-ink-muted">
              No projects yet.
            </div>
          )}
        </div>

      </div>
    </main>
  );
}