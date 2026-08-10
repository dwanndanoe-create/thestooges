import { WelcomeHeader } from "@/components/dashboard/WelcomeHeader";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { JobCard } from "@/components/dashboard/JobCard";
import { ActivityPanel } from "@/components/dashboard/ActivityPanel";
import { ProfileCard } from "@/components/dashboard/ProfileCard";
import { DashboardTopActions } from "@/components/dashboard/DashboardTopActions";
import { WorkspaceCard } from "@/components/dashboard/WorkspaceCard";
import { ProfileProgressCard } from "@/components/dashboard/ProfileProgressCard";

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getGreeting } from "@/lib/greetings";
import { prisma } from "@/lib/prisma";

import {
  FolderKanban,
  Send,
  BriefcaseBusiness,
} from "lucide-react";


export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

const projectInvitations = await prisma.projectMember.findMany({
  where: {
    userId: user.id,
    status: "PENDING",
  },
  include: {
    project: {
      select: {
        id: true,
        title: true,
        type: true,
        creator: {
          select: {
            name: true,
          },
        },
      },
    },
  },
  orderBy: {
    createdAt: "desc",
  },
});

const currentProjects = await prisma.project.findMany({
  where: {
    status: "ACTIVE",
      OR: [
        {
          creatorId: user.id,
        },
        {
          members: {
            some: {
              userId: user.id,
              status: "ACCEPTED",
            },
          },
        },
      ],
    },
    select: {
      id: true,
      title: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

const myListings = await prisma.job.findMany({
  where: {
    creatorId: user.id,
    status: "OPEN",
  },
  select: {
    id: true,
    title: true,
  },
  orderBy: {
    createdAt: "desc",
  },
});

const requestsSent = await prisma.jobApplication.findMany({
  where: {
    userId: user.id,
  },
  select: {
    id: true,
    status: true,
    job: {
      select: {
        id: true,
        title: true,
      },
    },
  },
  orderBy: {
    createdAt: "desc",
  },
});

const recommendedJobs = await prisma.job.findMany({
  where: {
    status: "OPEN",
    creatorId: {
      not: user.id,
    },
    applications: {
      none: {
        userId: user.id,
      },
    },
  },
  select: {
    id: true,
    title: true,
    description: true,
    budget: true,
    location: true,
    skills: true,
    creator: {
      select: {
        name: true,
      },
    },
  },
  orderBy: {
    createdAt: "desc",
  },
  take: 2,
});

const greeting = getGreeting(user.name);

  return (
    <main>
      <div className="max-w-6xl mx-auto pt-8">

        {/* Header */}

        <div
          className="
            flex
            justify-between
            items-start
            gap-5
            flex-wrap
          "
        >
          <WelcomeHeader greeting={greeting} />

          <DashboardTopActions
            name={user.name}
            email={user.email}
            projectInvitations={projectInvitations}
          />
        </div>

        {/* Profile */}

        <div
          className="
            grid
            lg:grid-cols-[320px_1fr]
            gap-8
            mt-10
          "
        >
          {/* Left side */}

          <ProfileCard
            user={{
              name: user.name,
              location: user.location,
              skills: user.skills,
            }}
          />

          {/* Right side */}

          <div>
            <QuickActions />

            <div className="mt-8">
              <ProfileProgressCard user={user} />
            </div>
          </div>
        </div>

        {/* Workspace */}

        <section className="mt-12">

          <div className="mb-5">
            <h2
              className="
                font-display
                text-2xl
                text-ink
              "
            >
              Your Workspace
            </h2>

            <p
              className="
                text-sm
                text-ink-muted
                mt-1
              "
            >
              Manage your projects, requests, and listings.
            </p>
          </div>

          <div
            className="
              grid
              md:grid-cols-3
              gap-5
            "
          >
            <WorkspaceCard
              title="Current Projects"
              count={`${currentProjects.length} Active`}
              description="Projects you are currently working on."
              icon={FolderKanban}
              href="/projects"
              items={currentProjects.map((project) => project.title)}
            />

            <WorkspaceCard
              title="Requests Sent"
              count={`${requestsSent.filter(
                (request) => request.status === "PENDING"
              ).length} Pending`}
              description="Jobs and collaborations you requested."
              icon={Send}
              href="/requests"
              items={requestsSent.map((request) => request.job.title)}
            />

            <WorkspaceCard
              title="My Listings"
              count={`${myListings.length} Active`}
              description="Jobs you posted for others."
              icon={BriefcaseBusiness}
              href="/listings"
              items={myListings.map((job) => job.title)}
            />
          </div>
        </section>

        {/* Recommended Jobs */}

        <section className="mt-12">

          <div
            className="
              flex
              justify-between
              items-center
              mb-5
            "
          >
            <h2
              className="
                font-display
                text-2xl
                text-ink
              "
            >
              Recommended Jobs
            </h2>

            <a
              href="/jobs"
              className="
                text-sm
                text-emerald-700
                hover:text-emerald-900
              "
            >
              View all
            </a>
          </div>

          <div
            className="
              grid
              md:grid-cols-2
              gap-5
            "
          >
            {recommendedJobs.length > 0 ? (
              recommendedJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={{
                    id: job.id,
                    title: job.title,
                    description: job.description,
                    company: job.creator.name,
                    location: job.location,
                    skills: job.skills,
                    budget: job.budget,
                  }}
                />
              ))
            ) : (
              <div
                className="
                  rounded-2xl
                  border
                  border-line
                  bg-bg-raised
                  px-6
                  py-10
                  text-center
                  md:col-span-2
                "
              >
                <BriefcaseBusiness
                  size={28}
                  className="mx-auto text-emerald-700"
                />

                <h3 className="mt-3 font-display text-lg text-ink">
                  No recommendations yet
                </h3>

                <p className="mt-1 text-sm text-ink-muted">
                  Check back later for new job opportunities.
                </p>
              </div>
            )}
          </div>
        </section>

      </div>
    </main>
  );
}

