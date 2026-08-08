"use client";

import Link from "next/link";
import { MapPin, Edit3, Star } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

type ProfileCardProps = {
  user: {
    name: string;
    location: string | null;
    skills: string[];
  };
};

export function ProfileCard({ user }: ProfileCardProps) {
  const reduceMotion = useReducedMotion();

  const initials =
    user.name
      .trim()
      .split(/\s+/)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.35, ease: "easeOut" }}
      className="rounded-2xl border border-line bg-white p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <div
          className="
            h-14
            w-14
            flex-shrink-0
            rounded-2xl
            bg-emerald-100
            text-emerald-800
            font-display
            text-lg
            grid
            place-items-center
          "
        >
          {initials}
        </div>

        <div className="min-w-0">
          <p className="text-xs font-mono uppercase tracking-[0.12em] text-emerald-700">
            Your profile
          </p>

          <h2 className="font-display text-2xl text-ink mt-1 truncate">
            {user.name}
          </h2>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 mt-5 text-sm text-ink-muted">
        <MapPin size={15} />
        <span>{user.location ?? "Location not added"}</span>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mt-5">
        {user.skills.length > 0 ? (
          user.skills.map((skill, index) => (
            <motion.span
              key={skill}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: reduceMotion ? 0.01 : 0.25,
                delay: reduceMotion ? 0 : 0.15 + index * 0.04,
              }}
              whileHover={
                reduceMotion
                  ? undefined
                  : { y: -2, backgroundColor: "#a7f3d0" }
              }
              className="
                px-3
                py-1
                rounded-full
                bg-emerald-100
                text-emerald-800
                text-xs
                font-medium
              "
            >
              {skill}
            </motion.span>
          ))
        ) : (
          <p className="text-sm text-ink-faint">No skills added yet.</p>
        )}
      </div>

      {/* Reputation */}
      <div className="flex items-center gap-2 mt-6">
        <motion.div
          initial={reduceMotion ? false : { scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: reduceMotion ? "tween" : "spring",
            stiffness: 400,
            damping: 15,
            delay: reduceMotion ? 0 : 0.3,
          }}
        >
          <Star size={16} className="text-emerald-700 fill-emerald-700" />
        </motion.div>

        <span className="font-medium text-ink">4.9</span>

        <span className="text-sm text-ink-muted">reputation</span>
      </div>

      {/* Action */}
      <Link
        href="/profile/edit"
        className="
          group
          mt-6
          inline-flex
          items-center
          gap-2
          text-sm
          font-medium
          text-emerald-700
          hover:text-emerald-900
          transition-colors
        "
      >
        <Edit3
          size={15}
          className="transition-transform duration-200 group-hover:-rotate-12"
        />
        Edit profile
      </Link>
    </motion.div>
  );
}