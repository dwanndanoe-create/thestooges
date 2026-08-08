"use client";

import { WelcomeHeader } from "@/components/dashboard/WelcomeHeader";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { JobCard } from "@/components/dashboard/JobCard";
import { ActivityPanel } from "@/components/dashboard/ActivityPanel";
import { ProfileCard } from "@/components/dashboard/ProfileCard";
import { DashboardTopActions } from "@/components/dashboard/DashboardTopActions";
import { WorkspaceCard } from "@/components/dashboard/WorkspaceCard";

import {
  FolderKanban,
  Send,
  BriefcaseBusiness,
} from "lucide-react";
import { ProfileProgressCard } from "@/components/dashboard/ProfileProgressCard";


const recommendedJobs = [
  {
    title: "Build a company website",
    company: "Local Startup",
    location: "Paramaribo",
    skills: ["React", "Tailwind"],
    budget: "500 SRD",
  },
  {
    title: "Design mobile app interface",
    company: "Student Project",
    location: "Wanica",
    skills: ["Figma", "UI/UX"],
    budget: "300 SRD",
  },
];



const workspaceCards = [
  {
    title: "Current Projects",
    count: "2 Active",
    description: "Projects you are currently working on.",
    icon: FolderKanban,
    href: "/projects",
    items: [
      "Website redesign",
      "Mobile app prototype",
    ],
  },


  {
    title: "Requests Sent",
    count: "3 Pending",
    description: "Jobs and collaborations you requested.",
    icon: Send,
    href: "/requests",
    items: [
      "Frontend Developer",
      "UI Designer",
    ],
  },


  {
    title: "My Listings",
    count: "4 Active",
    description: "Jobs you posted for others.",
    icon: BriefcaseBusiness,
    href: "/listings",
    items: [
      "Restaurant website",
      "Logo designer needed",
    ],
  },
];



export default function DashboardPage() {

  return (
    <main className="min-h-screen bg-bg px-6 py-8">


      <div className="max-w-6xl mx-auto">


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

          <WelcomeHeader />

          <DashboardTopActions />

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

          <ProfileCard />



          {/* Right side */}

          <div>


            <QuickActions />

            <div className="mt-8">
              <ProfileProgressCard />
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

            {
              workspaceCards.map((card)=>(

                <WorkspaceCard
                  key={card.title}
                  {...card}
                />

              ))
            }


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

            {
              recommendedJobs.map((job)=>(

                <JobCard
                  key={job.title}
                  job={job}
                />

              ))
            }


          </div>


        </section>







        {/* Activity */}

        <ActivityPanel />



      </div>


    </main>
  );
}