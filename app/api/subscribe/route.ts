import { NextRequest, NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Swap point for Phase 2: today this forwards to a Google Apps Script Web
// App that appends a row to a Google Sheet (LEADS_WEBHOOK_URL). Later this
// can write to Supabase (or anywhere else) instead — the frontend and
// validation above never need to change.
export async function POST(req: NextRequest) {
  let body: {
    email?: string;
    company?: string; // honeypot field
    source?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field.
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const email = body.email?.trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 }
    );
  }

  const webhookUrl = process.env.LEADS_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn(
      "LEADS_WEBHOOK_URL is not set — signup was not recorded anywhere."
    );
    return NextResponse.json(
      { error: "Signups aren't connected yet — check back soon." },
      { status: 503 }
    );
  }

  try {
    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        source: body.source || "landing_page",
        utm_source: body.utm_source || null,
        utm_medium: body.utm_medium || null,
        utm_campaign: body.utm_campaign || null,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!upstream.ok) {
      throw new Error(`Upstream responded ${upstream.status}`);
    }
  } catch (err) {
    console.error("Failed to forward signup to LEADS_WEBHOOK_URL:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again in a moment." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
