import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// Set NEXT_PUBLIC_SITE_URL once the real domain/Vercel URL is live so
// OpenGraph/Twitter share images resolve to absolute URLs.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const title =
  "Data Master Club — Practical Data & AI Skills, Taught by an Engineer Who Does It Daily";
const description =
  "Data Master Club is Krishna Verma's community for learning real-world data engineering and AI — SQL, Python, GCP & BigQuery, Kafka, Spark, Databricks, and ETL, taught by a working Data Engineer at Lowe's India.";

// Fonts are self-hosted from @fontsource-variable packages instead of
// next/font/google: Google's loader downloads the fonts at build time, and a
// failed download breaks the Turbopack build ("Can't resolve
// '@vercel/turbopack-next/internal/font/google/font'"). Local files make
// builds independent of the network. Variable fonts = one file per family.
const heading = localFont({
  src: "../node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2",
  variable: "--font-heading",
  weight: "300 700",
  display: "swap",
});

const body = localFont({
  src: "../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  variable: "--font-body",
  weight: "100 900",
  display: "swap",
});

const mono = localFont({
  src: "../node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2",
  variable: "--font-mono-brand",
  weight: "100 800",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "Data Master Club",
    "Krishna Verma",
    "data engineering",
    "AI engineering",
    "SQL",
    "Python",
    "GCP",
    "BigQuery",
    "Apache Kafka",
    "Apache Spark",
    "Databricks",
    "ETL",
    "data warehousing",
  ],
  authors: [{ name: "Krishna Verma" }],
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Data Master Club",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Data Master Club — Practical, real-world data & AI skills",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0E1A",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${heading.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col bg-background text-foreground"
        suppressHydrationWarning
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
