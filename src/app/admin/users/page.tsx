import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { toggleUserStatus, toggleAdminStatus } from "@/app/actions/admin";
import { AdminNav } from "@/components/admin/AdminNav";

export default async function AdminUsersPage() {
  await requireAdmin();

  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      email: true,
      location: true,
      isAdmin: true,
      isActive: true,
      createdAt: true,
    },
  });

  return (
    <main className="min-h-screen bg-bg">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <AdminNav />
        <h1 className="font-display text-3xl text-ink">
          Users
        </h1>

        <p className="mt-2 text-sm text-ink-muted">
          Manage MicroJobs-SR accounts.
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-white">
          <div className="divide-y divide-line">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-medium text-ink">
                      {user.name}
                    </h2>

                    {user.isAdmin && (
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                        Admin
                      </span>
                    )}

                    <span
                      className={
                        user.isActive
                          ? "rounded-full bg-emerald-50 px-2.5 py-1 text-xs text-emerald-700"
                          : "rounded-full bg-red-50 px-2.5 py-1 text-xs text-red-700"
                      }
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-ink-muted">
                    {user.email}
                  </p>

                  {user.location && (
                    <p className="mt-1 text-xs text-ink-faint">
                      {user.location}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  <form action={toggleUserStatus}>
                    <input
                      type="hidden"
                      name="userId"
                      value={user.id}
                    />

                    <button
                      type="submit"
                      className="rounded-xl border border-line px-3 py-2 text-xs font-medium text-ink transition hover:border-emerald-600"
                    >
                      {user.isActive ? "Deactivate" : "Activate"}
                    </button>
                  </form>

                  <form action={toggleAdminStatus}>
                    <input
                      type="hidden"
                      name="userId"
                      value={user.id}
                    />

                    <button
                      type="submit"
                      className="rounded-xl border border-line px-3 py-2 text-xs font-medium text-ink transition hover:border-emerald-600"
                    >
                      {user.isAdmin ? "Remove admin" : "Make admin"}
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}