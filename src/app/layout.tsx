import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Microjobs.sr — Find work, build projects, meet local talent",
  description:
    "Microjobs.sr is where people in Suriname hire, get hired, and collaborate on real projects — all from a single profile.",
  keywords: [
    "Microjobs.sr",
    "jobs Suriname",
    "freelance Paramaribo",
    "local talent marketplace",
    "collaboration projects Suriname",
  ],
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Microjobs.sr — Find work, build projects, meet local talent",
    description:
      "One profile for hiring, applying, and collaborating on work across Suriname.",
    siteName: "Microjobs.sr",
    locale: "en_SR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Microjobs.sr — Find work, build projects, meet local talent",
    description:
      "One profile for hiring, applying, and collaborating on work across Suriname.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Microjobs.sr",
  url: siteUrl,
  description:
    "A local marketplace connecting talent through jobs, freelance work, and collaboration projects in Suriname.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a
          href="#top-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:bg-emerald-700 focus:text-white focus:px-4 focus:py-2 focus:rounded-md"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
