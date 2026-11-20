import { NextResponse } from "next/server";

export const maxDuration = 30;

// Proxies the Apps Script doGet so the SECRET never reaches the browser.
// Returns { topics: string[] } — the PDF topic names from the sheet's Config tab.
export async function GET() {
  const webhookUrl = process.env.LEADS_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ topics: [] });
  }

  try {
    const url = new URL(webhookUrl);
    url.searchParams.set("token", process.env.SECRET || "");

    const upstream = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    });
    if (!upstream.ok) throw new Error(`Upstream responded ${upstream.status}`);

    const data = await upstream.json();
    if (data?.ok === false || !Array.isArray(data?.topics)) {
      throw new Error(data?.error || "Unexpected topics response");
    }

    const topics: string[] = data.topics
      .filter((t: unknown): t is string => typeof t === "string" && !!t.trim())
      .map((t: string) => t.trim());

    return NextResponse.json(
      { topics },
      { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } }
    );
  } catch (err) {
    console.error("Failed to load topics from LEADS_WEBHOOK_URL:", err);
    // Form still works as free text if suggestions are unavailable.
    return NextResponse.json({ topics: [] });
  }
}
