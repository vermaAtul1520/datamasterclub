import { NextRequest, NextResponse } from "next/server";
import { isValidEmail } from "@/lib/validate-email";

// Apps Script cold-starts can be slow; give it real headroom before the
// serverless function itself gets killed.
export const maxDuration = 30;

// Keeps whatever the browser sends from bloating a sheet cell.
function clip(value: unknown, max = 200): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

// Swap point for Phase 2: today this forwards { fullName, email, pdf, note,
// source, utm_*, referrer, landingPath, timestamp } to a Google Apps Script
// Web App that appends a row to a Google Sheet (LEADS_WEBHOOK_URL). Later
// this can write to Supabase (or anywhere else) instead — the frontend and
// validation above never need to change.
//
// Note for the Apps Script: the new attribution fields (utm_source,
// utm_medium, utm_campaign, referrer, landingPath) are extra keys — add
// columns for them in the sheet to keep them, or the script ignores them.
export async function POST(req: NextRequest) {
  let body: {
    fullName?: string;
    email?: string;
    pdf?: string;
    note?: string;
    company?: string; // honeypot field
    source?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    referrer?: string;
    landingPath?: string;
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

  const fullName = body.fullName?.trim();
  const email = body.email?.trim().toLowerCase();
  const pdf = body.pdf?.trim();

  if (!fullName) {
    return NextResponse.json(
      { error: "Enter your full name." },
      { status: 400 }
    );
  }
  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 }
    );
  }
  if (!pdf) {
    return NextResponse.json(
      { error: "Let us know which PDF you'd like." },
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
        fullName,
        email,
        pdf,
        note: body.note?.trim() || "",
        source: clip(body.source, 40) || "website",
        utm_source: clip(body.utm_source, 100),
        utm_medium: clip(body.utm_medium, 100),
        utm_campaign: clip(body.utm_campaign, 100),
        referrer: clip(body.referrer, 300),
        landingPath: clip(body.landingPath, 300),
        timestamp: new Date().toISOString(),
      }),
      // Guards against an Apps Script cold-start/hang leaving the request
      // (and the user's "Sending…" state) open indefinitely.
      signal: AbortSignal.timeout(20000),
    });

    if (!upstream.ok) {
      throw new Error(`Upstream responded ${upstream.status}`);
    }

    const data = await upstream.json();

    // Apps Script's own try/catch can return { success: false, error }
    // with an HTTP 200 — treat that as a real failure, not a success, so
    // the frontend doesn't tell the user it worked when nothing was
    // actually written to the sheet.
    if (data?.success === false) {
      throw new Error(data.error || "Apps Script reported failure");
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Failed to forward signup to LEADS_WEBHOOK_URL:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again in a moment." },
      { status: 502 }
    );
  }
}
