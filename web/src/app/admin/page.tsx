import Link from "next/link";
import Image from "next/image";
import {
  Users,
  BriefcaseBusiness,
  Send,
  FolderKanban,
  ArrowUpRight,
  Clock,
  CheckCircle2,
} from "lucide-react";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";

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
      detail: "active",
      subValue: activeUsers,
      href: "/admin/users",
      icon: Users,
      tint: "bg-slate-100 text-slate-600",
      bar: "bg-slate-500",
    },
    {
      title: "Jobs",
      value: totalJobs,
      detail: "open",
      subValue: openJobs,
      href: "/admin/jobs",
      icon: BriefcaseBusiness,
      tint: "bg-violet-100 text-violet-600",
      bar: "bg-violet-500",
    },
    {
      title: "Applications",
      value: totalApplications,
      detail: "pending",
      subValue: pendingApplications,
      href: "/admin/applications",
      icon: Send,
      tint: "bg-amber-100 text-amber-600",
      bar: "bg-amber-500",
      flag: pendingApplications > 0,
    },
    {
      title: "Projects",
      value: totalProjects,
      detail: "active",
      subValue: activeProjects,
      href: "/admin/projects",
      icon: FolderKanban,
      tint: "bg-emerald-100 text-emerald-700",
      bar: "bg-emerald-600",
    },
  ];

  const queue = [
    {
      label: "Pending applications",
      note: "awaiting review",
      count: pendingApplications,
      href: "/admin/applications",
    },
    {
      label: "Open jobs",
      note: "unfilled listings",
      count: openJobs,
      href: "/admin/jobs",
    },
  ];

  const now = new Date();

  return (
    <main className="min-h-screen bg-bg">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-6 border-b border-line pb-8">
          <div className="flex items-center gap-5">
            <Image
              src="/mj-black-logo.png"
              alt="MicroJobs-SR"
              width={56}
              height={56}
              priority
              className="h-14 w-14 shrink-0 rounded-xl"
            />

            <div>
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                Administration
              </div>

              <h1 className="mt-1 font-display text-3xl text-ink">
                Admin Dashboard
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 font-mono text-xs text-ink-faint">
              <Clock size={13} />

              {now.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </div>

            <AdminLogoutButton />
          </div>
        </div>

        <p className="mt-4 max-w-2xl text-sm text-ink-muted">
          Manage users, jobs, applications, and projects across MicroJobs-SR.
        </p>

        {/* Stats */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.title}
                href={card.href}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-line
                  bg-white
                  p-6
                  shadow-sm
                  transition
                  hover:-translate-y-0.5
                  hover:border-ink/20
                  hover:shadow-md
                "
              >
                <span
                  className={`absolute inset-y-0 left-0 w-1 ${card.bar}`}
                />

                <div className="flex items-center justify-between">
                  <div
                    className={`grid h-10 w-10 place-items-center rounded-xl ${card.tint}`}
                  >
                    <Icon size={19} />
                  </div>

                  {card.flag && (
                    <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wide text-amber-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                      Review
                    </span>
                  )}
                </div>

                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
                  {card.title}
                </p>

                <div className="mt-1 flex items-baseline gap-2">
                  <p className="font-display text-3xl text-ink">
                    {card.value.toLocaleString()}
                  </p>

                  <span className="text-xs text-ink-muted">
                    {card.subValue} {card.detail}
                  </span>
                </div>

                <span className="mt-4 flex items-center gap-1 font-mono text-[11px] uppercase tracking-wide text-ink-faint opacity-0 transition group-hover:opacity-100">
                  Manage
                  <ArrowUpRight size={12} />
                </span>
              </Link>
            );
          })}
        </div>

        {/* Administration + Needs Attention */}
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {/* Administration */}
          <section className="rounded-2xl border border-line bg-white p-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl text-ink">
                Administration
              </h2>

              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
                4 sections
              </span>
            </div>

            <div className="mt-4 divide-y divide-line">
              {[
                {
                  href: "/admin/users",
                  label: "Manage users",
                  meta: `${totalUsers} total`,
                  icon: Users,
                },
                {
                  href: "/admin/jobs",
                  label: "Manage jobs",
                  meta: `${totalJobs} total`,
                  icon: BriefcaseBusiness,
                },
                {
                  href: "/admin/applications",
                  label: "View applications",
                  meta: `${totalApplications} total`,
                  icon: Send,
                },
                {
                  href: "/admin/projects",
                  label: "View projects",
                  meta: `${totalProjects} total`,
                  icon: FolderKanban,
                },
              ].map((row) => {
                const RowIcon = row.icon;

                return (
                  <Link
                    key={row.href}
                    href={row.href}
                    className="
                      group
                      flex
                      items-center
                      justify-between
                      py-3.5
                      text-sm
                      text-ink
                      transition
                      hover:text-emerald-700
                    "
                  >
                    <span className="flex items-center gap-3 font-medium">
                      <RowIcon
                        size={15}
                        className="
                          text-ink-faint
                          transition
                          group-hover:text-emerald-700
                        "
                      />

                      {row.label}
                    </span>

                    <span className="flex items-center gap-3">
                      <span className="font-mono text-xs text-ink-faint">
                        {row.meta}
                      </span>

                      <ArrowUpRight
                        size={14}
                        className="
                          text-ink-faint
                          transition
                          group-hover:text-emerald-700
                        "
                      />
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Needs Attention */}
          <section className="flex flex-col rounded-2xl border border-line bg-white p-6">
            <h2 className="font-display text-xl text-ink">
              Needs attention
            </h2>

            <div className="mt-4 flex-1 space-y-2.5">
              {queue.filter((item) => item.count > 0).length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line py-10 text-center">
                  <CheckCircle2
                    size={20}
                    className="text-emerald-600"
                  />

                  <p className="text-sm text-ink-muted">
                    All caught up
                  </p>
                </div>
              ) : (
                queue.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="
                      flex
                      items-center
                      justify-between
                      rounded-xl
                      bg-bg-sunken
                      px-4
                      py-3
                      text-sm
                      transition
                      hover:bg-emerald-50
                    "
                  >
                    <span>
                      <span className="block text-ink">
                        {item.label}
                      </span>

                      <span className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
                        {item.note}
                      </span>
                    </span>

                    <span
                      className={`font-mono text-sm font-semibold ${
                        item.count > 0
                          ? "text-emerald-700"
                          : "text-ink-faint"
                      }`}
                    >
                      {item.count}
                    </span>
                  </Link>
                ))
              )}
            </div>

            <p className="mt-5 border-t border-line pt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
              Synced just now
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}