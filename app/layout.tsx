import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// Set NEXT_PUBLIC_SITE_URL once the real domain/Vercel URL is live so
// OpenGraph/Twitter share images resolve to absolute URLs.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const title =
  "Data Master Club — Practical Data & AI Skills, Taught by an Engineer Who Does It Daily";
const description =
  "Data Master Club is Krishna Verma's community for learning real-world data engineering and AI — SQL, Python, GCP & BigQuery, Kafka, Spark, Databricks, and ETL, taught by a working Data Engineer at Lowe's India.";

const heading = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono-brand",
  subsets: ["latin"],
  weight: ["400", "500"],
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
