"use client";

import { motion } from "framer-motion";
import { roleCards } from "@/data/site-data";

type AuthBrandPanelProps = {
  mode?: "login" | "signup";
};

export function AuthBrandPanel({
  mode = "login",
}: AuthBrandPanelProps) {
  return (
    <div
      className="
        relative
        overflow-hidden
        h-full
        flex
        items-center
        justify-center
        p-16
        bg-[#0B3D2E]
      "
    >
      {/* Sunset gradient wash */}
      <div
        aria-hidden
        className="
          absolute inset-0
          bg-[radial-gradient(120%_90%_at_85%_-10%,#F2A65A_0%,transparent_55%),radial-gradient(90%_70%_at_10%_115%,#1E6F5C_0%,transparent_60%)]
          opacity-80
        "
      />

      {/* Sun */}
      <motion.div
        aria-hidden
        className="
          absolute
          -top-24
          -right-24
          h-[380px]
          w-[380px]
          rounded-full
          bg-[radial-gradient(circle,#FBC77C_0%,#F2A65A_45%,transparent_72%)]
          blur-[2px]
        "
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.9, 1, 0.9],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Fine grain texture */}
      <div
        aria-hidden
        className="
          absolute inset-0
          opacity-[0.06]
          [background-image:radial-gradient(#FDF6EC_1px,transparent_1px)]
          [background-size:24px_24px]
        "
      />

      {/* River bands, bottom */}
      <svg
        aria-hidden
        className="absolute bottom-0 left-0 w-full text-[#134E3A]"
        viewBox="0 0 500 160"
        preserveAspectRatio="none"
        height="160"
      >
        <motion.path
          d="M0 90 C 90 60, 160 120, 260 90 S 420 60, 500 95 L500 160 L0 160 Z"
          fill="currentColor"
          opacity="0.55"
          animate={{
            d: [
              "M0 90 C 90 60, 160 120, 260 90 S 420 60, 500 95 L500 160 L0 160 Z",
              "M0 100 C 100 75, 150 105, 260 100 S 410 70, 500 105 L500 160 L0 160 Z",
              "M0 90 C 90 60, 160 120, 260 90 S 420 60, 500 95 L500 160 L0 160 Z",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <path
          d="M0 120 C 110 100, 180 140, 280 118 S 430 100, 500 125 L500 160 L0 160 Z"
          fill="currentColor"
          opacity="0.9"
        />
      </svg>

      {/* Palm silhouette, foreground right */}
      <motion.div
        aria-hidden
        className="absolute -bottom-4 -right-10 text-[#0A2E22]"
        animate={{ rotate: [0, 1.5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "bottom center" }}
      >
        <svg width="280" height="300" viewBox="0 0 260 260" fill="none">
          <path
            d="M135 260 C130 200 145 130 155 80"
            stroke="currentColor"
            strokeWidth="16"
            strokeLinecap="round"
          />
          <path d="M155 90 C90 70 40 35 20 10 C80 25 130 40 155 90Z" fill="currentColor" />
          <path d="M155 90 C190 35 220 15 250 5 C230 60 190 85 155 90Z" fill="currentColor" />
          <path d="M155 90 C220 90 245 120 260 150 C200 140 170 115 155 90Z" fill="currentColor" />
          <path d="M155 90 C100 120 65 160 45 210 C120 180 150 130 155 90Z" fill="currentColor" />
        </svg>
      </motion.div>

      {/* Second, smaller palm, back left, softer tone */}
      <div
        aria-hidden
        className="absolute -bottom-6 -left-6 text-[#134E3A] opacity-70"
      >
        <svg width="170" height="190" viewBox="0 0 260 260" fill="none">
          <path
            d="M135 260 C130 200 145 130 155 80"
            stroke="currentColor"
            strokeWidth="16"
            strokeLinecap="round"
          />
          <path d="M155 90 C90 70 40 35 20 10 C80 25 130 40 155 90Z" fill="currentColor" />
          <path d="M155 90 C190 35 220 15 250 5 C230 60 190 85 155 90Z" fill="currentColor" />
          <path d="M155 90 C220 90 245 120 260 150 C200 140 170 115 155 90Z" fill="currentColor" />
        </svg>
      </div>

      {/* Toucan mark, small accent near top left */}
      <motion.svg
        aria-hidden
        className="absolute top-12 left-14 text-[#E8734A]"
        width="46"
        height="46"
        viewBox="0 0 64 64"
        fill="none"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 0.9, y: [0, -4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <circle cx="26" cy="24" r="10" fill="#0A2E22" />
        <path d="M35 22 C48 20 56 25 58 30 C48 33 40 31 35 26 Z" fill="currentColor" />
        <path d="M20 32 C18 42 20 50 26 54" stroke="#0A2E22" strokeWidth="4" strokeLinecap="round" fill="none" />
      </motion.svg>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-9 max-w-[440px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {mode === "login" ? (
            <>
              <p
                className="
                  font-mono
                  uppercase
                  tracking-[0.2em]
                  text-[11px]
                  text-[#F2A65A]
                  mb-5
                "
              >
                Welcome back
              </p>

              <p
                className="
                  font-display
                  text-[30px]
                  leading-[1.3]
                  tracking-[-0.02em]
                  text-[#FDF6EC]
                "
              >
                &ldquo;I found a developer for my startup project through
                Microjobs — the platform made finding local talent
                simple.&rdquo;
              </p>

              <motion.footer
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="flex items-center gap-3 mt-7"
              >
                <div
                  className="
                    h-10 w-10 rounded-full grid place-items-center
                    bg-[#E8734A] text-[#0A2E22]
                    font-semibold text-[12px]
                    ring-2 ring-[#F2A65A]/30
                  "
                >
                  NV
                </div>
                <div>
                  <p className="text-[#FDF6EC] text-[13.5px] font-medium">
                    Naomi Vrede
                  </p>
                  <p className="text-[12px] text-[#9FD8C4]">
                    Product Designer, Paramaribo
                  </p>
                </div>
              </motion.footer>
            </>
          ) : (
            <>
              <p
                className="
                  font-mono
                  uppercase
                  tracking-[0.2em]
                  text-[11px]
                  text-[#F2A65A]
                "
              >
                Join the community
              </p>

              <h2
                className="
                  font-display
                  text-[38px]
                  leading-[1.05]
                  tracking-[-0.03em]
                  text-[#FDF6EC]
                  mt-4
                "
              >
                Build your presence.
              </h2>

              <p
                className="
                  text-[#CFE9DD]
                  leading-relaxed
                  mt-4
                  text-[15px]
                "
              >
                Create your account and start connecting with
                opportunities across Suriname.
              </p>
            </>
          )}
        </motion.div>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="h-px bg-gradient-to-r from-[#F2A65A]/60 via-[#F2A65A]/20 to-transparent origin-left"
        />

        <div className="flex flex-wrap gap-2.5">
          {roleCards.map((role, i) => (
            <motion.span
              key={role.id}
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.55 + i * 0.08, type: "spring", stiffness: 120 }}
              className="
                rounded-full
                border border-[#F2A65A]/25
                bg-[#FDF6EC]/[0.06]
                backdrop-blur-sm
                px-3 py-1.5
                text-[12.5px]
                font-medium
                text-[#EFE3D3]
              "
            >
              {role.label}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}
