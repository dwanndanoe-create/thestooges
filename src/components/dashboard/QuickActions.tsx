"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Briefcase,
  Users,
  FolderKanban,
  ArrowRight,
} from "lucide-react";


const actions = [
  {
    title: "Find Jobs",
    description: "Discover projects and paid opportunities.",
    icon: Briefcase,
    href: "/jobs",
  },
  {
    title: "Find Talent",
    description: "Connect with skilled people.",
    icon: Users,
    href: "/talent",
  },
  {
    title: "Create Project",
    description: "Start something new with others.",
    icon: FolderKanban,
    href: "/projects",
  },
];


export function QuickActions() {

  return (
    <section className="grid md:grid-cols-3 gap-5 mb-12">

      {actions.map((item,index)=>{

        const Icon = item.icon;

        return (
          <motion.div
            key={item.title}
            initial={{
              opacity:0,
              y:15
            }}
            animate={{
              opacity:1,
              y:0
            }}
            transition={{
              delay:index * 0.1
            }}
          >

            <Link
              href={item.href}
              className="
              block
              rounded-2xl
              border border-line
              bg-bg-raised
              p-6
              hover:border-emerald-600
              hover:-translate-y-1
              transition-all
              "
            >

              <Icon
                size={24}
                className="
                text-emerald-700
                mb-5
                "
              />


              <h2 className="
              font-display
              text-xl
              text-ink
              ">
                {item.title}
              </h2>


              <p className="
              text-sm
              text-ink-muted
              mt-2
              ">
                {item.description}
              </p>


              <div className="
              flex items-center gap-2
              mt-5
              text-sm
              text-emerald-700
              font-medium
              ">

                Explore
                <ArrowRight size={15}/>

              </div>


            </Link>

          </motion.div>
        )

      })}


    </section>
  );
}