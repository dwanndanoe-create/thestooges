"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Magnetic } from "@/components/ui/Magnetic";
import { cn } from "@/lib/cn";
import Image from "next/image";

const navLinks = [
  { label: "Jobs", href: "#jobs" },
  { label: "Projects", href: "#projects" },
  { label: "Talent", href: "#talent" },
  { label: "About", href: "#why" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState<"EN" | "NL">("EN");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 300, damping: 40 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-[background-color,border-color,box-shadow] duration-300",
        scrolled
          ? "bg-bg-raised/90 backdrop-blur-md border-b border-line shadow-[0_1px_2px_rgba(19,29,25,0.05)]"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="container-page">
        <div
          className={cn(
            "flex items-center justify-between transition-[height] duration-300",
            scrolled ? "h-[64px]" : "h-[84px]"
          )}
        >
          <Link href="#top" className="flex items-center gap-2 group">
            <Image
              src="/mj-logo-v2.png"
              alt="Microjobs logo"
              width={80}
              height={80}
              priority
            />
            <span className="font-display font-semibold text-[30px] tracking-[-0.01em] text-ink">
              Microjobs<span className="text-emerald-700">.sr</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[14px] font-medium text-ink-muted hover:text-ink transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setLang((l) => (l === "EN" ? "NL" : "EN"))}
              className="font-mono text-[12px] text-ink-faint hover:text-ink transition-colors w-8"
              aria-label="Toggle language"
            >
              {lang}
            </button>
            <Link
              href="/login"
              className="inline-flex items-center h-10 px-4 text-sm font-medium text-ink-muted hover:text-ink transition-colors"
            >
              Log in
            </Link>
            <Magnetic strength={10}>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 h-10 px-4 rounded-[10px] text-sm font-medium bg-emerald-700 text-white hover:bg-emerald-900 transition-colors"
              >
                Sign up
              </Link>
            </Magnetic>
          </div>

          <button
            className="md:hidden grid place-items-center h-10 w-10 rounded-[8px] text-ink"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="h-[2px] w-full origin-left bg-emerald-500"
      />

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-line bg-bg-raised"
        >
          <div className="container-page py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-[15px] font-medium text-ink"
              >
                {link.label}
              </a>
            ))}
            <div className="hairline my-1" />
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center h-10 px-4 rounded-[10px] text-sm font-medium border border-line-strong text-ink hover:border-emerald-700 hover:text-emerald-700 transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center h-10 px-4 rounded-[10px] text-sm font-medium bg-emerald-700 text-white hover:bg-emerald-900 transition-colors"
            >
              Sign up
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}
