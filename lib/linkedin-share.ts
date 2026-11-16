import { siteConfig, socialLinks } from "@/lib/site-config";

// LinkedIn does NOT let a website insert a real @mention — "@Krishna Verma"
// in pre-filled text is plain text. The UI therefore tells people to type
// "@Krishna" and pick his profile from LinkedIn's dropdown so he's tagged.

export const krishnaLinkedinName = "Krishna Verma";

/** Link placed inside the shout-out — tagged so shout-out traffic is measurable. */
export function shoutoutSiteLink() {
  const base = siteConfig.publicUrl.replace(/\/$/, "");
  // Kept short — it's visible in the learner's post.
  return `${base}/?utm_source=linkedin&utm_medium=shoutout`;
}

export type ShoutoutTemplate = { id: string; label: string; build: (topic: string) => string };

function topicOrDefault(topic: string) {
  const t = topic.trim();
  return t ? t : "data engineering";
}

export const shoutoutTemplates: ShoutoutTemplate[] = [
  {
    id: "thanks",
    label: "Quick thanks",
    build: (topic) =>
      `Big thanks to ${krishnaLinkedinName} for the free ${topicOrDefault(topic)} PDF from Data Master Club 🙌

Clear, practical, and straight from someone who does data engineering every day. If you're learning data or AI, it's worth a look:
${shoutoutSiteLink()}

#DataEngineering #LearningInPublic #DataMasterClub`,
  },
  {
    id: "learning",
    label: "Learning in public",
    build: (topic) =>
      `Currently levelling up on ${topicOrDefault(topic)} 📚

Found ${krishnaLinkedinName}'s Data Master Club resources really helpful — no fluff, just the stuff that's actually used in real data teams. Sharing in case it helps someone else on the same path:
${shoutoutSiteLink()}

#DataEngineering #AI #LearningInPublic`,
  },
  {
    id: "recommend",
    label: "Recommend to network",
    build: (topic) =>
      `If you're getting into data engineering or AI, follow ${krishnaLinkedinName}.

His ${topicOrDefault(topic)} notes explain concepts the way you'd actually use them at work. Free resources here:
${shoutoutSiteLink()}

#DataEngineering #SQL #CareerGrowth`,
  },
];

/** Opens LinkedIn's post composer. Pre-fill works reliably on desktop web;
 *  mobile apps may drop the text, which is why we also copy it. */
export function linkedinComposeUrl(text: string) {
  return `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text)}`;
}

export const krishnaLinkedinProfile = socialLinks.linkedin;
