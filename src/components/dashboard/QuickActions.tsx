"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  Briefcase,
  Users,
  PlusCircle,
  FolderKanban,
  ArrowRight,
} from "lucide-react";

const actions = [
  {
    title: "Find jobs",
    description: "Discover projects and paid opportunities.",
    icon: Briefcase,
    href: "/jobs",
  },
  {
    title: "Find talent",
    description: "Connect with skilled people.",
    icon: Users,
    href: "/talent",
  },
  {
    title: "Post a job",
    description: "Find the right person for your work.",
    icon: PlusCircle,
    href: "/jobs/create",
  },
  {
    title: "Create project",
    description: "Start something new with others.",
    icon: FolderKanban,
    href: "/projects/create",
  },
];

export function QuickActions() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="grid sm:grid-cols-2 gap-5">
      {actions.map((item, index) => {
        const Icon = item.icon;
        const isCreateAction =
          item.title === "Post a job" || item.title === "Create project";

        return (
          <motion.div
            key={item.title}
            initial={reduceMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: reduceMotion ? 0 : index * 0.08,
              duration: reduceMotion ? 0.01 : 0.4,
              ease: "easeOut",
            }}
          >
            <Link
              href={item.href}
              className="
                group
                block
                rounded-2xl
                border border-line
                bg-bg-raised
                p-6
                hover:border-emerald-600
                hover:-translate-y-1
                hover:shadow-md
                transition-all
                duration-200
              "
            >
              <motion.div
                className="
                  inline-flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-emerald-50
                  text-emerald-700
                  mb-5
                "
                whileHover={
                  reduceMotion
                    ? undefined
                    : { rotate: -8, scale: 1.08 }
                }
                transition={{ type: "spring", stiffness: 400, damping: 12 }}
              >
                <Icon size={22} />
              </motion.div>

              <h2 className="font-display text-xl text-ink">{item.title}</h2>

              <p className="text-sm text-ink-muted mt-2">
                {item.description}
              </p>

              <div
                className="
                  flex
                  items-center
                  gap-2
                  mt-5
                  text-sm
                  text-emerald-700
                  font-medium
                "
              >
                {isCreateAction ? "Create" : "Explore"}

                <motion.span
                  className="inline-flex"
                  animate={{ x: 0 }}
                  whileHover={reduceMotion ? undefined : { x: 4 }}
                  initial={false}
                >
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </motion.span>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </section>
  );
}