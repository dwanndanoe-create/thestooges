"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, BarChart3 } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

type ProfileProgressCardProps = {
  user: {
    name: string;
    location: string | null;
    bio: string | null;
    skills: string[];
  };
};

/** Small inline tree frog — one-time celebration when the profile hits 100%. */
function TreeFrog({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 48 40"
      width={26}
      height={22}
      aria-hidden="true"
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.6 }}
      animate={
        reduceMotion
          ? { opacity: 1 }
          : { opacity: 1, y: [10, -3, 0], scale: [0.6, 1.08, 1] }
      }
      transition={
        reduceMotion
          ? { duration: 0.01 }
          : { duration: 0.5, times: [0, 0.65, 1], ease: "easeOut" }
      }
    >
      <ellipse cx="24" cy="24" rx="16" ry="12" fill="#059669" />
      <circle cx="12" cy="12" r="6" fill="#059669" />
      <circle cx="34" cy="12" r="6" fill="#059669" />
      <circle cx="12" cy="12" r="3" fill="#0f172a" />
      <circle cx="34" cy="12" r="3" fill="#0f172a" />
      <ellipse cx="18" cy="28" rx="4" ry="3" fill="#f59e0b" />
      <ellipse cx="30" cy="28" rx="4" ry="3" fill="#f59e0b" />
      <path d="M8 30c-3 2-4 5-3 8 3-1 6-3 7-6z" fill="#047857" />
      <path d="M40 30c3 2 4 5 3 8-3-1-6-3-7-6z" fill="#047857" />
    </motion.svg>
  );
}

function AnimatedNumber({
  value,
  reduceMotion,
}: {
  value: number;
  reduceMotion: boolean;
}) {
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(value);
      return;
    }

    const duration = 600;
    const start = performance.now();

    let frame: number;

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplay(Math.round(value * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    }

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [value, reduceMotion]);

  return <>{display}</>;
}

export function ProfileProgressCard({ user }: ProfileProgressCardProps) {
  const reduceMotion = useReducedMotion();
  const wasComplete = useRef(false);
  const [justCompleted, setJustCompleted] = useState(false);

  const profileFields = [
    {
      label: "Add your location",
      complete: !!user.location?.trim(),
    },
    {
      label: "Add a bio",
      complete: !!user.bio?.trim(),
    },
    {
      label: "Add your skills",
      complete: user.skills.length > 0,
    },
  ];

  const completedFields = profileFields.filter((field) => field.complete).length;
  const profileCompletion = Math.round(((1 + completedFields) / 4) * 100);
  const missingItems = profileFields
    .filter((field) => !field.complete)
    .map((field) => field.label);

  const isComplete = profileCompletion >= 100;

  useEffect(() => {
    if (isComplete && !wasComplete.current) {
      setJustCompleted(true);
    }

    wasComplete.current = isComplete;
  }, [isComplete]);

  const stats = [
    { label: "Profile views", value: 86 },
    { label: "Job matches", value: 24 },
    { label: "Response", value: 92, suffix: "%" },
  ];

  return (
    <div className="bg-bg-raised border border-line rounded-2xl p-6">
      {!isComplete ? (
        <>
          {/* Header */}
          <div>
            <h3 className="font-display text-xl text-ink">
              Complete your profile
            </h3>

            <p className="text-sm text-ink-muted mt-1">
              Improve your chances of getting matched.
            </p>
          </div>

          {/* Progress */}
          <div className="mt-5">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-ink-faint">
                Profile completion
              </span>

              <span className="text-sm font-medium text-ink">
                <AnimatedNumber value={profileCompletion} reduceMotion={!!reduceMotion} />%
              </span>
            </div>

            <div className="h-2 rounded-full bg-bg-sunken overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-emerald-700"
                initial={reduceMotion ? false : { width: 0 }}
                animate={{ width: `${profileCompletion}%` }}
                transition={
                  reduceMotion
                    ? { duration: 0.01 }
                    : { duration: 0.6, ease: "easeOut" }
                }
              />
            </div>
          </div>

          {/* Missing Items */}
          <motion.div layout className="mt-6 space-y-1">
            <AnimatePresence initial={false}>
              {missingItems.map((item, index) => (
                <motion.div 
                  key={item}
                  layout
                  initial={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, x: -8 }
                  }
                  animate={{ opacity: 1, x: 0 }}
                  exit={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, x: 8 }
                  }
                  transition={{
                    duration: reduceMotion ? 0.01 : 0.25,
                    delay: reduceMotion ? 0 : index * 0.05,
                  }}
                >
                  <Link
                    href="/profile/edit"
                    className="
                      flex
                      items-center
                      justify-between
                      text-sm
                      rounded-lg
                      -mx-2
                      px-2
                      py-2
                      hover:bg-bg-sunken
                      transition-colors
                    "
                  >
                    <span className="text-ink-muted">
                      {item}
                    </span>

                    <ArrowRight
                      size={15}
                      className="text-ink-faint"
                    />
                      </Link>
                   </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

          {/* CTA */}
          <Link
            href="/profile/edit"
            className="
              mt-6
              flex
              items-center
              justify-center
              gap-2
              h-10
              rounded-xl
              bg-emerald-800
              text-white
              text-sm
              font-medium
              hover:bg-emerald-900
              transition
            "
          >
            Finish profile
            <ArrowRight size={15} />
          </Link>
        </>
      ) : (
        <>
          {/* Stats Header */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-display text-xl text-ink">
                Your marketplace stats
              </h3>

              <p className="text-sm text-ink-muted mt-1">
                Your activity this week.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <AnimatePresence>
                {justCompleted && (
                  <TreeFrog reduceMotion={!!reduceMotion} />
                )}
              </AnimatePresence>

              <BarChart3 size={20} className="text-emerald-700" />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduceMotion ? 0.01 : 0.3,
                  delay: reduceMotion ? 0 : index * 0.08,
                }}
              >
                <p className="text-xl font-display text-ink">
                  <AnimatedNumber value={stat.value} reduceMotion={!!reduceMotion} />
                  {stat.suffix ?? ""}
                </p>

                <p className="text-xs text-ink-faint mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div
            className="
              mt-6
              pt-4
              border-t
              border-line
              flex
              items-center
              gap-2
              text-xs
              text-ink-faint
            "
          >
            <CheckCircle2 size={14} />
            Updated weekly
          </div>
        </>
      )}
    </div>
  );
}