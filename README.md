# Data Master Club — Landing Page

Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui. See `info.md` for
the full client brief and roadmap.

## Getting started

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Lead capture

The signup form posts to `app/api/subscribe/route.ts`, which forwards
`{ email, source, utm_source, utm_medium, utm_campaign, timestamp }` as JSON
to `LEADS_WEBHOOK_URL` — meant to be a Google Apps Script Web App that appends
a row to a Google Sheet. Until that URL is set, the form correctly shows a
"not connected yet" error instead of pretending to succeed.

**To swap the backend later** (e.g. to Supabase, per the Phase 2 roadmap in
`info.md`), only the inside of `app/api/subscribe/route.ts` needs to change —
the frontend, validation, and honeypot logic stay the same.

The post-signup "Join the community" button points at
`NEXT_PUBLIC_COMMUNITY_INVITE_URL` (a WhatsApp group link, most likely) — set
this once a community platform is finalized.

## Deployment

```bash
npx vercel
```

Set `LEADS_WEBHOOK_URL` and `NEXT_PUBLIC_COMMUNITY_INVITE_URL` as environment
variables in the Vercel project settings once they're available.
