"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export function TalentHeader() {
  const reduceMotion = useReducedMotion();

  return (
    <div>
      {/* Top navigation */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduceMotion ? 0.01 : 0.3,
          ease: "easeOut",
        }}
        className="
          flex
          items-center
          gap-6
          pt-6
        "
      >
        {/* Brand */}
        <Link
          href="/dashboard"
          className="group flex items-center gap-2"
        >
          <motion.div
            whileHover={
              reduceMotion
                ? undefined
                : { rotate: -5, scale: 1.04 }
            }
            whileTap={
              reduceMotion
                ? undefined
                : { scale: 0.96 }
            }
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 15,
            }}
          >
            <Image
              src="/mj-logo-v2.png"
              alt="Microjobs"
              width={42}
              height={42}
              priority
            />
          </motion.div>

          <span
            className="
              font-display
              font-semibold
              text-xl
              tracking-[-0.01em]
              text-ink
            "
          >
            Microjobs
            <span
              className="
                text-emerald-700
                group-hover:text-emerald-800
                transition-colors
              "
            >
              .sr
            </span>
          </span>
        </Link>

        {/* Dashboard */}
        <Link
          href="/dashboard"
          className="
            group/back
            inline-flex
            items-center
            gap-2
            h-10
            rounded-xl
            border
            border-line
            bg-white
            px-4
            text-sm
            font-medium
            text-ink
            shadow-sm
            hover:border-emerald-600
            hover:text-emerald-700
            hover:shadow-md
            transition-all
          "
        >
          <ArrowLeft
            size={15}
            className="
              transition-transform
              duration-200
              group-hover/back:-translate-x-0.5
            "
          />

          Dashboard
        </Link>
      </motion.div>

      {/* Talent hero */}
      <motion.div
        initial={
          reduceMotion
            ? false
            : { opacity: 0, y: 10 }
        }
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduceMotion ? 0.01 : 0.4,
          delay: reduceMotion ? 0 : 0.08,
          ease: "easeOut",
        }}
        className="mt-14 max-w-3xl"
      >
        {/* Eyebrow */}
        <motion.div
          whileHover={
            reduceMotion
              ? undefined
              : { x: 2 }
          }
          className="
            inline-flex
            items-center
            gap-2
            font-mono
            text-xs
            uppercase
            tracking-[0.14em]
            text-emerald-700
          "
        >
          <span
            className="
              inline-flex
              h-6
              w-6
              items-center
              justify-center
              rounded-lg
              bg-emerald-50
              text-emerald-700
            "
          >
            <Users size={13} />
          </span>

          Talent network

          <span className="text-ink-faint">
            ·
          </span>

          <span className="text-ink-faint">
            Suriname
          </span>
        </motion.div>

        {/* Heading */}
        <h1
          className="
            font-display
            text-4xl
            sm:text-5xl
            leading-[1.05]
            tracking-[-0.035em]
            text-ink
            mt-5
          "
        >
          People behind
          <br />
          <span className="text-emerald-700">
            the work.
          </span>
        </h1>

        {/* Description */}
        <p
          className="
            text-base
            sm:text-lg
            text-ink-muted
            mt-5
            max-w-2xl
            leading-relaxed
          "
        >
          Find developers, designers, writers, builders,
          and other skilled people across Suriname.
          Connect with someone who can help bring your
          next idea to life.
        </p>
      </motion.div>
    </div>
  );
}