# Microjobs.sr — Homepage

A production-quality homepage for Microjobs.sr, a Suriname-based marketplace where one profile lets people hire, apply for jobs, join projects, and showcase their work.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (CSS-variable design tokens, no default palette)
- Framer Motion for scroll reveals, hover states, and the hero's animated role-stack
- Lucide React for icons
- Fonts: Space Grotesk (display), Inter (body), IBM Plex Mono (data/labels) via `next/font`

## Design system

Tokens live in `src/app/globals.css` (`:root` custom properties, mapped into Tailwind via `@theme inline`) — colors, radii, shadows, spacing, and font stacks all flow from there. The palette is a deep emerald/teal with warm ink neutrals and a muted gold accent used only for status chips, avoiding both default Tailwind blue and generic "AI palette" clichés.

**Signature element:** the hero's fanned "role-stack" — four cards (Hire / Apply / Collaborate / Showcase) tied by a connecting line to a single "You" node, visualizing the product's core idea that one profile covers every role on the platform.

## Structure

```
src/
  app/            layout.tsx (fonts, metadata, JSON-LD), page.tsx, globals.css
  components/
    layout/       Navbar, Footer
    sections/     Hero, TrustStats, JobsPreview, ProjectsSection, TalentSection, WhyMicrojobs, ClosingCta
    ui/           Button, Badge, Card, SectionHeading — shared primitives
  data/           site-data.ts — mock jobs/projects/talent/stats, separated from components
  lib/            types.ts (data models), cn.ts (class merge helper)
  hooks/          useCountUp.ts — scroll-triggered animated counters, reduced-motion aware
```

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Notes

- All motion respects `prefers-reduced-motion`.
- Focus states are visible and not suppressed anywhere.
- Mock data in `src/data/site-data.ts` is realistic but fictional — swap in real API calls when ready.
- Build was verified with `next build` (font fetching requires network access to Google Fonts at build time).
