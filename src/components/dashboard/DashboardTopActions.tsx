"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Bell,
  LogOut,
  MessageCircle,
  Settings,
  User,
  X,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { logout } from "@/app/actions/auth";

type DashboardTopActionsProps = {
  name: string;
  email: string;
};

/** Small inline toucan — peeks in playfully when the account panel opens. */
function Toucan({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 60 52"
      width={30}
      height={26}
      aria-hidden="true"
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 14, rotate: 8 }}
      animate={
        reduceMotion
          ? { opacity: 1 }
          : {
              opacity: 1,
              x: [14, -2, 0],
              rotate: [8, -4, 0],
              y: [0, -3, 0],
            }
      }
      transition={
        reduceMotion
          ? { duration: 0.01 }
          : { duration: 0.55, times: [0, 0.7, 1], ease: "easeOut" }
      }
    >
      {/* body */}
      <ellipse cx="26" cy="30" rx="14" ry="16" fill="#0f172a" />
      {/* white chest */}
      <ellipse cx="22" cy="34" rx="8" ry="10" fill="#fafaf9" />
      {/* head */}
      <circle cx="30" cy="16" r="11" fill="#0f172a" />
      {/* eye area */}
      <circle cx="34" cy="14" r="4" fill="#fafaf9" />
      <circle cx="35" cy="14" r="1.6" fill="#0f172a" />
      {/* big beak */}
      <path
        d="M40 13c9-2 17 1 20 5-3 3-11 5-20 3-2-3-2-6 0-8z"
        fill="#f59e0b"
      />
      <path
        d="M40 15c7-1 13 1 15 4-2 2-8 3-15 2-1-2-1-4 0-6z"
        fill="#dc2626"
      />
      {/* feet */}
      <path d="M20 45l-3 5M28 46l0 5" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
      {/* tail */}
      <path d="M14 24c-6 1-10 5-11 10 5 0 10-2 13-6z" fill="#059669" />
    </motion.svg>
  );
}

export function DashboardTopActions({
  name,
  email,
}: DashboardTopActionsProps) {
  const [open, setOpen] = useState<
    "messages" | "notifications" | "account" | null
  >(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  async function handleLogout() {
    await logout();
  }

  const initials =
    name
      .trim()
      .split(/\s+/)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  const panelTransition = reduceMotion
    ? { duration: 0.01 }
    : { duration: 0.16, ease: "easeOut" as const };

  return (
    <div ref={containerRef} className="relative flex items-center gap-2">
      {/* Messages */}
      <button
        type="button"
        onClick={() => setOpen(open === "messages" ? null : "messages")}
        aria-label="Messages"
        className="
          relative
          h-11
          w-11
          rounded-xl
          border
          border-line
          bg-white
          hover:border-emerald-600
          transition
          grid
          place-items-center
        "
      >
        <MessageCircle size={19} className="text-emerald-700" />

        <span
          className="
            absolute
            -top-1
            -right-1
            h-5
            min-w-5
            px-1
            rounded-full
            bg-emerald-700
            text-white
            text-[10px]
            grid
            place-items-center
          "
        >
          0
        </span>
      </button>

      {/* Notifications */}
      <button
        type="button"
        onClick={() =>
          setOpen(open === "notifications" ? null : "notifications")
        }
        aria-label="Notifications"
        className="
          h-11
          w-11
          rounded-xl
          border
          border-line
          bg-white
          hover:border-emerald-600
          transition
          grid
          place-items-center
        "
      >
        <Bell size={19} className="text-emerald-700" />
      </button>

      {/* Account */}
      <button
        type="button"
        onClick={() => setOpen(open === "account" ? null : "account")}
        aria-label="Account menu"
        className="
          h-11
          min-w-11
          px-2
          rounded-xl
          border
          border-line
          bg-white
          hover:border-emerald-600
          transition
          flex
          items-center
          justify-center
          gap-2
        "
      >
        <span className="h-8 w-8 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-semibold grid place-items-center">
          {initials}
        </span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            key={open}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -6, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -6, scale: 0.98 }
            }
            transition={panelTransition}
            style={{ transformOrigin: "top right" }}
            className="
              absolute
              right-0
              top-14
              w-80
              rounded-2xl
              border
              border-line
              bg-white
              shadow-lg
              p-2
              z-50
              overflow-hidden
            "
          >
            {/* Messages */}
            {open === "messages" && (
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg text-ink">
                    Messages
                  </h3>

                  <button
                    type="button"
                    onClick={() => setOpen(null)}
                    className="
                      text-ink-faint
                      hover:text-ink
                      transition
                    "
                    aria-label="Close messages"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="mt-4 rounded-xl bg-bg-sunken p-4">
                  <div className="flex items-center gap-3">
                    <MessageCircle
                      size={18}
                      className="text-emerald-700"
                    />

                    <div>
                      <p className="text-sm font-medium text-ink">
                        No messages yet
                      </p>

                      <p className="text-xs text-ink-muted mt-0.5">
                        Your conversations will appear here.
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  href="/messages"
                  onClick={() => setOpen(null)}
                  className="
                    mt-4
                    flex
                    items-center
                    justify-center
                    h-10
                    w-full
                    rounded-xl
                    bg-emerald-800
                    text-sm
                    font-medium
                    text-white
                    hover:bg-emerald-900
                    transition
                  "
                >
                  View all messages
                </Link>
              </div>
            )}

            {/* Notifications */}
            {open === "notifications" && (
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg text-ink">
                    Notifications
                  </h3>

                  <button
                    type="button"
                    onClick={() => setOpen(null)}
                    className="text-ink-faint hover:text-ink transition"
                    aria-label="Close notifications"
                  >
                    <X size={16} />
                  </button>
                </div>

                <p className="text-sm text-ink-muted mt-3">
                  No notifications yet.
                </p>
              </div>
            )}

            {/* Account */}
            {open === "account" && (
              <>
                <div className="px-3 py-3 border-b border-line">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-800 font-semibold text-sm grid place-items-center">
                      {initials}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-ink truncate">
                        {name}
                      </p>

                      <p className="text-xs text-ink-faint truncate">
                        {email}
                      </p>
                    </div>

                    <Toucan reduceMotion={!!reduceMotion} />
                  </div>
                </div>

                <div className="py-1">
                  <Link
                    href="/profile"
                    onClick={() => setOpen(null)}
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-2.5
                      text-sm
                      text-ink
                      hover:bg-bg-sunken
                      transition
                    "
                  >
                    <User size={17} />
                    View profile
                  </Link>

                  <Link
                    href="/profile/edit"
                    onClick={() => setOpen(null)}
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-2.5
                      text-sm
                      text-ink
                      hover:bg-bg-sunken
                      transition
                    "
                  >
                    <Settings size={17} />
                    Edit profile
                  </Link>
                </div>

                <div className="border-t border-line pt-1">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="
                      w-full
                      flex
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-2.5
                      text-sm
                      text-red-600
                      hover:bg-red-50
                      transition
                    "
                  >
                    <LogOut size={17} />
                    Log out
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}