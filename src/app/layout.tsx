import type { Metadata } from "next";
import { cookies } from "next/headers";
import {
  Space_Grotesk,
  Inter,
  IBM_Plex_Mono,
} from "next/font/google";

import {
  LanguageProvider,
  type Language,
} from "@/i18n/LanguageProvider";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const siteUrl = "https://microjobs.sr";

async function getLanguage(): Promise<Language> {
  const cookieStore = await cookies();

  return cookieStore.get(
    "microjobs_language"
  )?.value === "nl"
    ? "nl"
    : "en";
}

export async function generateMetadata(): Promise<Metadata> {
  const language = await getLanguage();

  const title =
    language === "nl"
      ? "Microjobs.sr — Vind werk, bouw projecten en ontmoet lokaal talent"
      : "Microjobs.sr — Find work, build projects, meet local talent";

  const description =
    language === "nl"
      ? "Microjobs.sr is de plek waar mensen in Suriname anderen inhuren, werk vinden en samenwerken aan echte projecten — allemaal vanuit één profiel."
      : "Microjobs.sr is where people in Suriname hire, get hired, and collaborate on real projects — all from a single profile.";

  const socialDescription =
    language === "nl"
      ? "Eén profiel om mensen in te huren, te solliciteren en samen te werken in heel Suriname."
      : "One profile for hiring, applying, and collaborating on work across Suriname.";

  return {
    metadataBase: new URL(siteUrl),

    title,

    description,

    icons: {
      icon: "/mj-black-logo.png",
    },

    keywords:
      language === "nl"
        ? [
            "Microjobs.sr",
            "vacatures Suriname",
            "freelance Paramaribo",
            "lokale talentmarktplaats",
            "samenwerkingsprojecten Suriname",
          ]
        : [
            "Microjobs.sr",
            "jobs Suriname",
            "freelance Paramaribo",
            "local talent marketplace",
            "collaboration projects Suriname",
          ],

    alternates: {
      canonical: siteUrl,
    },

    openGraph: {
      type: "website",
      url: siteUrl,
      title,
      description: socialDescription,
      siteName: "Microjobs.sr",
      locale:
        language === "nl"
          ? "nl_SR"
          : "en_SR",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description: socialDescription,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const language = await getLanguage();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Microjobs.sr",
    url: siteUrl,

    inLanguage:
      language === "nl"
        ? "nl-SR"
        : "en-SR",

    description:
      language === "nl"
        ? "Een lokale marktplaats die talent in Suriname verbindt via vacatures, freelancewerk en samenwerkingsprojecten."
        : "A local marketplace connecting talent through jobs, freelance work, and collaboration projects in Suriname.",
  };

  return (
    <html
      lang={language}
      className={`
        ${spaceGrotesk.variable}
        ${inter.variable}
        ${plexMono.variable}
      `}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>

      <body>
        <LanguageProvider
          initialLanguage={language}
        >
          <a
            href="#top-content"
            className="
              sr-only
              focus:not-sr-only
              focus:absolute
              focus:top-3
              focus:left-3
              focus:z-[100]
              focus:bg-emerald-700
              focus:text-white
              focus:px-4
              focus:py-2
              focus:rounded-md
            "
          >
            Skip to content
          </a>

          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}