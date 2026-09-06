export const siteConfig = {
  name: "Data Master Club",
  tagline: "Practical, real-world data & AI skills — taught by an engineer who does it daily.",
  communityInviteUrl:
    process.env.NEXT_PUBLIC_COMMUNITY_INVITE_URL || "#",
};

export const upiSupport = {
  payeeId: "krishnaverma2281@okhdfcbank",
  payeeName: "Krishna Verma",
  suggestedAmounts: [9, 49, 99],
  qrImage: "/upi-qr.png",
};

export function buildUpiLink(amount?: number) {
  const params = new URLSearchParams({
    pa: upiSupport.payeeId,
    pn: upiSupport.payeeName,
    cu: "INR",
  });
  if (amount) params.set("am", String(amount));
  return `upi://pay?${params.toString()}`;
}

export const socialLinks = {
  linkedin: "https://www.linkedin.com/in/krishna-verma-3989a4171",
  instagram: "https://www.instagram.com/datamasterclub",
  youtube: "https://youtube.com/@opendatainsightsbykrishna",
};

export const stats = [
  { label: "Years in data engineering", value: "6+" },
  {
    label: "Data Engineer",
    value: "Lowe's India",
    logo: "/logos/lowes.svg",
    logoWidth: 47, // lowes.svg is a ~2.12:1 wide mark — keep its real aspect ratio
    logoHeight: 22,
  },
  {
    label: "Previously",
    value: "Ex-Airtel Digital",
    logo: "/logos/airtel.svg",
    logoWidth: 22,
    logoHeight: 22,
  },
  { label: "LinkedIn followers", value: "12.8K+" },
];

export const valueCards = [
  {
    title: "Practical tutorials",
    description:
      "Step-by-step lessons on the tools used in production — not toy examples.",
  },
  {
    title: "Real-world data engineering",
    description:
      "Pipelines, warehousing, and ETL patterns pulled straight from daily engineering work.",
  },
  {
    title: "A community to learn with",
    description:
      "Ask questions, compare notes, and stay accountable alongside other learners.",
  },
  {
    title: "Free resources",
    description:
      "Guides, cheat sheets, and project ideas — no paywall on the fundamentals.",
  },
];

export const topics = [
  "SQL",
  "Python",
  "Java",
  "GCP & BigQuery",
  "Apache Kafka",
  "Apache Spark",
  "Databricks",
  "ETL",
  "Data Warehousing",
  "AI & Analytics",
];

export const krishnaBio = {
  name: "Krishna Verma",
  role: "Data Engineer @ Lowe's India",
  bio: "Krishna Verma is a Data Engineer at Lowe's India with 6+ years building real-world data systems, previously at Airtel Digital. He works daily with the same tools he teaches — GCP, BigQuery, Kafka, Spark, Databricks, and large-scale ETL. Through Data Master Club, he breaks data engineering and AI down into simple, practical lessons for people at every stage.",
  // Drop the real logo files in public/logos/ (lowes.svg, airtel.svg) — the
  // badge quietly falls back to text-only until they're there.
  employers: [
    {
      name: "Lowe's India",
      logo: "/logos/lowes.svg",
      label: "Data Engineer @ Lowe's India",
      logoWidth: 34, // lowes.svg is a ~2.12:1 wide mark — keep its real aspect ratio
      logoHeight: 16,
    },
    {
      name: "Airtel Digital",
      logo: "/logos/airtel.svg",
      label: "Ex-Airtel Digital",
      logoWidth: 16,
      logoHeight: 16,
    },
  ],
  badges: ["6+ years experience", "Verified"],
};
