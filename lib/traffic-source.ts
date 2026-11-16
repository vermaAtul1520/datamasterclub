"use client";

import { useSyncExternalStore } from "react";

// Where a visitor came from, so the page can tailor its "next step" ask:
// Instagram visitors get nudged toward a LinkedIn shout-out, LinkedIn
// visitors toward Instagram.
//
// Detection order (most → least reliable):
//   1. ?utm_source=… on the URL — put tagged links in each bio:
//        Instagram bio: https://<site>/?utm_source=instagram&utm_medium=bio
//        LinkedIn:      https://<site>/?utm_source=linkedin&utm_medium=profile
//   2. In-app browser user agent ("Instagram" / "LinkedInApp")
//   3. document.referrer host
//
// First touch wins for the session-less case: once stored, a later untagged
// visit doesn't overwrite it; a new explicit utm_source does.

export type TrafficSource =
  | "instagram"
  | "linkedin"
  | "youtube"
  | "whatsapp"
  | "direct"
  | "other";

export type Attribution = {
  source: TrafficSource;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referrer?: string;
  landingPath?: string;
};

const STORAGE_KEY = "dmc_attribution";

function classify(value: string): TrafficSource | null {
  const v = value.toLowerCase();
  if (/(^|[^a-z])(ig|insta|instagram)/.test(v)) return "instagram";
  if (/linkedin|lnkd\.in/.test(v)) return "linkedin";
  if (/youtube|youtu\.be|^yt$/.test(v)) return "youtube";
  if (/whatsapp|wa\.me/.test(v)) return "whatsapp";
  return null;
}

function detect(): Attribution {
  const params = new URLSearchParams(window.location.search);
  const utm_source = params.get("utm_source") || undefined;
  const utm_medium = params.get("utm_medium") || undefined;
  const utm_campaign = params.get("utm_campaign") || undefined;
  const ua = navigator.userAgent || "";
  const referrer = document.referrer || "";
  let refHost = "";
  try {
    refHost = referrer ? new URL(referrer).hostname : "";
  } catch {}
  // Our own domain as referrer is an internal navigation, not a source.
  if (refHost === window.location.hostname) refHost = "";

  const source: TrafficSource =
    (utm_source && classify(utm_source)) ||
    (/Instagram/i.test(ua) && "instagram") ||
    (/LinkedInApp/i.test(ua) && "linkedin") ||
    (refHost && classify(refHost)) ||
    (utm_source || refHost ? "other" : "direct");

  return {
    source,
    utm_source,
    utm_medium,
    utm_campaign,
    referrer: refHost || undefined,
    landingPath: window.location.pathname + window.location.search,
  };
}

function read(): Attribution | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}

/** Detects + persists attribution. Safe to call repeatedly. */
export function captureAttribution(): Attribution {
  const fresh = detect();
  const stored = read();
  // A plain "direct" revisit keeps the earlier real source.
  const result = fresh.source === "direct" && stored ? stored : fresh;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
  } catch {}
  return result;
}

// Captured once per page load; the cache keeps the snapshot referentially
// stable, as useSyncExternalStore requires.
let cached: Attribution | null = null;
const noopSubscribe = () => () => {};

/** null during SSR/hydration, then the visitor's attribution. */
export function useAttribution(): Attribution | null {
  return useSyncExternalStore(
    noopSubscribe,
    () => (cached ??= captureAttribution()),
    () => null
  );
}

/** Reads a browser-only value without a hydration mismatch. */
export function useClientValue<T extends string | number | boolean>(
  get: () => T,
  serverValue: T
): T {
  return useSyncExternalStore(noopSubscribe, get, () => serverValue);
}
