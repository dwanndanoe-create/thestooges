import Link from "next/link";
import { Linkedin, Instagram, Facebook } from "lucide-react";

const columns = [
  {
    title: "Product",
    links: ["Browse jobs", "Explore projects", "Find talent", "Pricing"],
  },
  {
    title: "Resources",
    links: ["Help center", "Guides for hiring", "Community", "API"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Contact"],
  },
  {
    title: "Legal",
    links: ["Terms of service", "Privacy policy", "Cookie settings"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg-sunken">
      <div className="container-page py-14">
        <div className="grid md:grid-cols-[1.3fr_repeat(4,1fr)] gap-10">
          <div className="flex flex-col gap-4">
            <Link href="#top" className="flex items-center gap-2 w-fit">
              <span className="grid place-items-center h-8 w-8 rounded-[8px] bg-emerald-700 text-white font-display font-semibold text-[14px]">
                M
              </span>
              <span className="font-display font-semibold text-[16px] text-ink">
                Microjobs<span className="text-emerald-700">.sr</span>
              </span>
            </Link>
            <p className="text-[13.5px] text-ink-muted leading-relaxed max-w-[240px]">
              One profile for hiring, applying, and collaborating on work across Suriname.
            </p>
            <div className="flex items-center gap-3 mt-1">
              {[Linkedin, Instagram, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="h-8 w-8 grid place-items-center rounded-full border border-line-strong text-ink-muted hover:text-emerald-700 hover:border-emerald-700 transition-colors"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <span className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
                {col.title}
              </span>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[13.5px] text-ink-muted hover:text-ink transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="hairline my-10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[12.5px] text-ink-faint">
          <span>© {new Date().getFullYear()} Microjobs.sr. All rights reserved.</span>
          <span className="font-mono">Made in Paramaribo</span>
        </div>
      </div>
    </footer>
  );
}
