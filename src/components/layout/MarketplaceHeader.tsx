"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

interface MarketplaceHeaderProps {
  title?: string;
  description?: string;
  action?: {
    label: string;
    href: string;
  };
}

export function MarketplaceHeader({
  title,
  description,
  action,
}: MarketplaceHeaderProps) {
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
        className="flex items-center gap-4 py-3"
      >
        {/* Brand */}
        <Link
          href="/dashboard"
          className="group inline-flex items-center"
          aria-label="Go to dashboard"
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
              alt="Microjobs logo"
              width={42}
              height={42}
              priority
              className="h-[42px] w-[42px] object-contain"
            />
          </motion.div>

          <span className="ml-2 font-display font-semibold text-xl tracking-[-0.01em] text-ink">
            Microjobs
            <span className="text-emerald-700 group-hover:text-emerald-800 transition-colors">
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

      {/* Page heading */}
      {title && description && (
        <motion.div
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 8 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0.01 : 0.35,
            delay: reduceMotion ? 0 : 0.08,
            ease: "easeOut",
          }}
          className="mt-12"
        >
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h1
                className="
                  font-display
                  text-3xl
                  sm:text-4xl
                  leading-tight
                  tracking-[-0.02em]
                  text-ink
                "
              >
                {title}
              </h1>

              <p
                className="
                  text-ink-muted
                  mt-3
                  max-w-2xl
                  leading-relaxed
                "
              >
                {description}
              </p>
            </div>

            {action && (
              <Link
                href={action.href}
                className="
                  inline-flex
                  items-center
                  gap-2
                  h-10
                  rounded-xl
                  bg-emerald-800
                  px-4
                  text-sm
                  font-medium
                  text-white
                  shadow-sm
                  hover:bg-emerald-900
                  hover:-translate-y-0.5
                  transition-all
                  shrink-0
                "
              >
                {action.label}
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}