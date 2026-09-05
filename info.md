# Data Master Club — Landing Page Brief

**Prepared for:** Development handoff
**Client:** Krishna Verma (Educator, Data & AI)
**Brand:** Data Master Club
**Version:** 1.0 — Landing page (Phase 1)

---

## 1. Goal

Ship a single, high-quality landing page that:
1. Introduces Krishna Verma and the Data Master Club brand.
2. Drives one primary action: **join the community by submitting an email.**
3. Links out to his content on YouTube, Instagram, and LinkedIn.

Built on a stack that **scales into a full platform later** (courses, PDF sales, subscriptions, member logins) without a rebuild.

---

## 2. Brand & Positioning

- **Lead with both** the brand and the person: *Data Master Club* is the identity, *Krishna Verma* is the trusted face behind it. His photo and voice carry credibility; the Club name carries recall.
- **What he teaches:** data engineering, AI, analytics — Spark, Databricks, SQL, GCP/BigQuery, Kafka, and data pipelines — explained in a simple, practical, real-world way. (From his YouTube: *Open Data Insights by Krishna*.)
- **Who he is (the credibility engine):** Data Engineer @ **Lowe's India**, **Ex-Airtel Digital**, **6+ years** in software & data engineering, ✓ verified, **12.8K+ LinkedIn followers**. He teaches the exact tools he uses at work every day. This is the trust anchor for the whole page.
- **One-line positioning to build copy around:** *Practical, real-world data & AI skills — taught by an engineer who does it daily.*

## 3. Target Audience

**A broad funnel** — beginners breaking into data, students/job-seekers, and working professionals upskilling. Copy must welcome newcomers *without* feeling too basic for experienced folks. Avoid jargon walls; avoid oversimplifying.

## 4. Tone of Voice

**Calm, expert, no-hype.** Clear and credible over flashy. No "change your life in 30 days" energy. Think: a knowledgeable senior engineer who explains things plainly. Short sentences, concrete specifics, zero clickbait.

---

## 5. Visual Design Direction

**Style:** Modern & techy, **dark theme**, electric-blue accent. Clean, high-contrast, spacious. The "data/tech" look — subtle glows, thin lines, generous negative space. No stock-photo clutter.

**Suggested palette** (agent can refine; these are starting points):

| Role | Hex | Notes |
|---|---|---|
| Background (base) | `#0A0E1A` | Near-black navy |
| Surface / cards | `#111827` | Slightly lifted |
| Accent (electric blue) | `#3B82F6` | Buttons, links, highlights |
| Accent glow | `#4F8CFF` → `#00A3FF` | Gradient/glow on hero + CTAs |
| Text (primary) | `#E6EDF7` | High-contrast on dark |
| Text (muted) | `#8B97AD` | Secondary copy, labels |
| Border | `#1F2A3C` | Subtle dividers |

**Typography suggestion:** A clean geometric sans for headings (e.g. Space Grotesk or Inter) + Inter for body. Optionally a monospace (e.g. JetBrains Mono) for small labels/tags to reinforce the data theme.

**Assets:** Client **has a logo** (attach it) and an existing "AI & Data Engineering — datamasterclub" banner on LinkedIn, but **no formal color system** — build the palette from scratch around the above, keeping it consistent with the existing banner. Get Krishna's photo for the hero/about section.

---

## 6. Page Structure (top to bottom)

1. **Nav bar** — Logo (Data Master Club) left; single "Join the Community" button right. Sticky, minimal.

2. **Hero** — Big headline stating the practical promise; one supporting line; primary CTA (email field + Join button) directly in the hero. Krishna's photo or a clean data-themed visual on the side. Electric-blue glow accent.
   - *Copy direction:* lead with the outcome (real data & AI skills), name the Club, keep it calm and confident.

3. **What you'll get / Why join** — 3–4 short value cards. E.g. *Practical tutorials*, *Real-world data engineering*, *A community to learn with*, *Free resources*. Icon + one line each.

4. **Topics covered** — The pillars, as tags or a grid, using his actual stack: **SQL, Python, Java, GCP & BigQuery, Apache Kafka, Apache Spark, Databricks, ETL, Data Warehousing**, plus AI/Analytics. Signals real depth to the experienced without scaring beginners.

5. **Meet Krishna** — The credibility section. Photo + credential badges (Lowe's India, Ex-Airtel, 6+ yrs, verified) + a short bio. This is where the "learn from someone actually in the field" angle lands.
   - *Drafted bio (calm/expert tone, ready to use):* "Krishna Verma is a Data Engineer at Lowe's India with 6+ years building real-world data systems, previously at Airtel Digital. He works daily with the same tools he teaches — GCP, BigQuery, Kafka, Spark, Databricks, and large-scale ETL. Through Data Master Club, he breaks data engineering and AI down into simple, practical lessons for people at every stage."

6. **Follow the content** — Three social cards linking **out** to YouTube, Instagram, LinkedIn (links in §9). No embeds for v1.

7. **Primary CTA band** — Repeat the email/join capture with a strong closing line.

8. **Footer** — Logo, socials, copyright, and a small placeholder for future links (Courses, Resources, Contact).

**Add a stats/credibility band** (near the hero or above "Meet Krishna"): *6+ years in data engineering · Data Engineer @ Lowe's India · Ex-Airtel Digital · 12.8K+ followers*. This is real, current social proof — use it prominently.

> **Placeholder for later:** a testimonials/student-reviews section (none exist yet). Build the slot now so reviews drop in cleanly once they come in.

---

## 7. Email Capture Flow (the core interaction)

- **Now:** just collect emails to a list (store in DB). Simple form — email field + Join button, with inline validation and a friendly error/success state.
- **On success:** show a "You're in!" state with a **"Join the community" button**. The community platform is **not decided yet** — recommend **WhatsApp** (highest adoption for an Indian audience, lowest friction). Build the success button to point to a **single configurable invite link** so it can be swapped to Telegram/Discord later without code changes.
- **Store per signup:** email, timestamp, source (page/UTM). Keep the schema extensible so these leads become user accounts later.
- Add basic **spam protection** (honeypot field or lightweight captcha) and store emails deduplicated.

---

## 8. Tech Stack & Architecture

Chosen so Phase 1 doesn't get thrown away when the platform grows.

- **Framework:** Next.js (App Router) + TypeScript — great SEO for a landing page, scales into a full app.
- **Styling:** Tailwind CSS + shadcn/ui — fast, consistent, component library that grows with the product.
- **Backend/DB:** **Supabase** (Postgres + Auth + Storage). Today it holds the email list; later the *same* project handles user accounts, course enrollment, and PDF storage — no migration needed.
- **Email (transactional), if/when needed:** Resend — for future welcome emails. Not required for v1 (list-only), but easy to add.
- **Payments (future):** **Razorpay** — best for an Indian audience (UPI, cards, recurring subscriptions). Not built now; just the chosen direction so data models are payment-ready.
- **Hosting:** Vercel — zero-config with Next.js, fast global delivery.
- **Analytics:** add a lightweight tool (Vercel Analytics or Plausible) from day one to measure signups.

**Data model note:** even for v1, create a `leads` (or `subscribers`) table with room to become `users`. Keeps Phase 2 clean.

---

## 9. Social Links to Wire Up

- **LinkedIn:** https://www.linkedin.com/in/krishna-verma-3989a4171
- **Instagram:** https://www.instagram.com/datamasterclub
- **YouTube:** https://youtube.com/@opendatainsightsbykrishna

---

## 10. Domain

None secured yet. Suggestions (check availability):
- **datamaster.club** — clever use of the `.club` TLD, on-brand
- datamasterclub.com
- datamasterclub.in
- thedatamasterclub.com
- joindatamasterclub.com

Secure one before launch; point DNS to Vercel.

---

## 11. Assets Needed From Client

- [ ] Logo file (has one — get high-res PNG/SVG)
- [ ] Photo of Krishna (hero + about section)
- [ ] Final decision on community platform + invite link (WhatsApp recommended)
- [x] Bio — drafted from his LinkedIn (see §6.5); have him approve/tweak
- [ ] Chosen domain

---

## 12. Future Roadmap (design now, build later)

- **Phase 2:** User accounts (Supabase Auth), course listings, free PDF downloads gated by email/login.
- **Phase 3:** Paid courses + PDF sales via Razorpay, subscriptions/membership tiers, a student dashboard, and basic course management (upload lessons, track progress).
- **Later:** live content embeds, testimonials, community integrations, blog for SEO.

Keep every Phase-1 decision compatible with the above — same Next.js app, same Supabase project, same design system.