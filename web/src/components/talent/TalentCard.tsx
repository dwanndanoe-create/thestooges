"use client";

import { MapPin, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

interface Talent {
  id: string;
  name: string;
  location: string | null;
  bio: string | null;
  skills: string[];
}

interface TalentCardProps {
  talent: Talent;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function TalentCard({ talent }: TalentCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: reduceMotion ? 0.01 : 0.35,
        ease: "easeOut",
      }}
      className="
        group
        rounded-2xl
        border
        border-line
        bg-white
        p-6
        transition-all
        duration-200
        hover:-translate-y-1
        hover:border-emerald-200
        hover:shadow-lg
      "
    >
      {/* Identity */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3.5">
          {/* Avatar */}
          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-emerald-50
              font-display
              text-sm
              font-semibold
              text-emerald-800
              ring-1
              ring-emerald-100
            "
          >
            {getInitials(talent.name)}
          </div>

          {/* Name + Location */}
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-xl leading-tight text-ink">
                {talent.name}
              </h2>

              {/* Active indicator */}
              <span
                className="relative h-2 w-2"
                title="Active profile"
              >
                <span className="absolute inset-0 rounded-full bg-emerald-500" />

                {!reduceMotion && (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-emerald-400"
                    animate={{
                      scale: [1, 1.9],
                      opacity: [0.6, 0],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                )}
              </span>
            </div>

            {talent.location && (
              <div className="flex items-center gap-1.5 mt-1.5 text-sm text-ink-muted">
                <MapPin size={13} />
                {talent.location}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bio */}
      <p
        className="
          mt-5
          min-h-[60px]
          line-clamp-3
          text-sm
          leading-relaxed
          text-ink-muted
        "
      >
        {talent.bio || "This person hasn't added a bio yet."}
      </p>

      {/* Skills */}
      {talent.skills.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {talent.skills.slice(0, 6).map((skill, index) => (
            <motion.span
              key={skill}
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, scale: 0.85 }
              }
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{ once: true }}
              transition={{
                duration: reduceMotion ? 0.01 : 0.2,
                delay: reduceMotion
                  ? 0
                  : index * 0.04,
              }}
              className="
                rounded-full
                bg-emerald-50
                px-3
                py-1.5
                text-xs
                font-medium
                text-emerald-800
              "
            >
              {skill}
            </motion.span>
          ))}

          {talent.skills.length > 6 && (
            <span
              className="
                rounded-full
                bg-bg-sunken
                px-3
                py-1.5
                text-xs
                font-medium
                text-ink-muted
              "
            >
              +{talent.skills.length - 6}
            </span>
          )}
        </div>
      )}

      {/* Profile action */}
      <div className="mt-6 border-t border-line pt-4">
        <Link
          href={`/talent/${talent.id}`}
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            text-emerald-700
            group-hover:text-emerald-900
            transition-colors
          "
        >
          View profile

          <ArrowUpRight
            size={15}
            className="
              transition-transform
              duration-200
              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
            "
          />
        </Link>
      </div>
    </motion.article>
  );
}