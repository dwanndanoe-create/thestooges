"use client";

import Image from "next/image";
import Link from "next/link";

interface WelcomeHeaderProps {
  name?: string;
}

export function WelcomeHeader({
  name = "Arnold",
}: WelcomeHeaderProps) {
  return (
    <div>

      {/* Brand */}
      <Link
        href="/"
        className="flex items-center gap-2 mb-8 group"
      >
        <Image
          src="/mj-logo-v2.png"
          alt="Microjobs logo"
          width={42}
          height={42}
          priority
        />

        <span
          className="
          font-display
          font-semibold
          text-xl
          tracking-[-0.01em]
          text-ink
          "
        >
          Microjobs<span className="text-emerald-700">.sr</span>
        </span>
      </Link>


      {/* Greeting */}
      <p
        className="
        font-mono
        text-xs
        uppercase
        tracking-[0.14em]
        text-emerald-700
        "
      >
        Dashboard
      </p>


      <h1
        className="
        font-display
        text-3xl
        leading-tight
        text-ink
        mt-2
        "
      >
        Good Afternoon, {name}
      </h1>


      <p
        className="
        text-ink-muted
        mt-3
        max-w-xl
        "
      >
        Your profile connects you with jobs, projects,
        and talented people across Suriname.
      </p>

    </div>
  );
}