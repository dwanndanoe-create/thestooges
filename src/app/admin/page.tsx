import Link from "next/link";
import {
  Users,
  BriefcaseBusiness,
  Send,
  FolderKanban,
  ShieldCheck,
} from "lucide-react";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";

export default async function AdminDashboardPage() {
  await requireAdmin();

  const [
    totalUsers,
    activeUsers,
    totalJobs,
    openJobs,
    totalApplications,
    pendingApplications,
    totalProjects,
    activeProjects,
  ] = await Promise.all([
    prisma.user.count(),

    prisma.user.count({
      where: {
        isActive: true,
      },
    }),

    prisma.job.count(),

    prisma.job.count({
      where: {
        status: "OPEN",
      },
    }),

    prisma.jobApplication.count(),

    prisma.jobApplication.count({
      where: {
        status: "PENDING",
      },
    }),

    prisma.project.count(),

    prisma.project.count({
      where: {
        status: "ACTIVE",
      },
    }),
  ]);

  const cards = [
    {
      title: "Users",
      value: totalUsers,
      detail: `${activeUsers} active`,
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "Jobs",
      value: totalJobs,
      detail: `${openJobs} open`,
      href: "/admin/jobs",
      icon: BriefcaseBusiness,
    },
    {
      title: "Applications",
      value: totalApplications,
      detail: `${pendingApplications} pending`,
      href: "/admin/applications",
      icon: Send,
    },
    {
      title: "Projects",
      value: totalProjects,
      detail: `${activeProjects} active`,
      href: "/admin/projects",
      icon: FolderKanban,
    },
  ];

  return (
    <main className="min-h-screen bg-bg">
      <div className="mx-auto max-w-7xl px-6 py-10">

        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
            <ShieldCheck size={21} />
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-emerald-700">
              Administration
            </p>

            <h1 className="font-display text-3xl text-ink">
              Admin Dashboard
            </h1>
          </div>
        </div>

        <p className="mt-3 max-w-2xl text-sm text-ink-muted">
          Manage users, jobs, applications, and projects across MicroJobs-SR.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.title}
                href={card.href}
                className="
                  rounded-2xl
                  border
                  border-line
                  bg-white
                  p-6
                  shadow-sm
                  transition
                  hover:-translate-y-0.5
                  hover:border-emerald-600
                  hover:shadow-md
                "
              >
                <div className="flex items-center justify-between">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-bg-sunken text-emerald-700">
                    <Icon size={19} />
                  </div>

                  <span className="text-xs text-ink-faint">
                    Manage →
                  </span>
                </div>

                <p className="mt-5 text-sm text-ink-muted">
                  {card.title}
                </p>

                <p className="mt-1 font-display text-3xl text-ink">
                  {card.value}
                </p>

                <p className="mt-1 text-xs text-ink-muted">
                  {card.detail}
                </p>
              </Link>
            );
          })}
        </div>

        <section className="mt-10 rounded-2xl border border-line bg-white p-6">
          <h2 className="font-display text-xl text-ink">
            Administration
          </h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link
              href="/admin/users"
              className="rounded-xl bg-bg-sunken p-4 text-sm font-medium text-ink transition hover:bg-emerald-50"
            >
              Manage users →
            </Link>

            <Link
              href="/admin/jobs"
              className="rounded-xl bg-bg-sunken p-4 text-sm font-medium text-ink transition hover:bg-emerald-50"
            >
              Manage jobs →
            </Link>

            <Link
              href="/admin/applications"
              className="rounded-xl bg-bg-sunken p-4 text-sm font-medium text-ink transition hover:bg-emerald-50"
            >
              View applications →
            </Link>

            <Link
              href="/admin/projects"
              className="rounded-xl bg-bg-sunken p-4 text-sm font-medium text-ink transition hover:bg-emerald-50"
            >
              View projects →
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}