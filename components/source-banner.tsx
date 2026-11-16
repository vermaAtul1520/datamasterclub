"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { InstagramIcon, LinkedinIcon } from "@/components/icons/brand-icons";
import { socialLinks } from "@/lib/site-config";
import { useAttribution, useClientValue } from "@/lib/traffic-source";

const DISMISS_KEY = "dmc_source_banner_dismissed";

// A slim, dismissible welcome strip that points each platform's visitors at
// the *other* platform. Hidden for direct/unknown visitors.
export function SourceBanner() {
  const attribution = useAttribution();
  const dismissedEarlier = useClientValue(() => {
    try {
      return sessionStorage.getItem(DISMISS_KEY) === "1";
    } catch {
      return false;
    }
  }, true);
  const [dismissedNow, setDismissedNow] = useState(false);

  const source = attribution?.source;
  if (dismissedEarlier || dismissedNow || (source !== "instagram" && source !== "linkedin")) {
    return null;
  }

  const fromInstagram = source === "instagram";

  function dismiss() {
    setDismissedNow(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {}
  }

  return (
    <div className="border-b border-border/60 bg-primary/10">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5 text-sm sm:px-6">
        {fromInstagram ? (
          <LinkedinIcon className="size-4 shrink-0 text-primary" />
        ) : (
          <InstagramIcon className="size-4 shrink-0 text-primary" />
        )}
        <p className="flex-1 text-muted-foreground">
          {fromInstagram ? (
            <>
              Hey Instagram fam 👋 Krishna writes deeper breakdowns on LinkedIn too.{" "}
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                Connect with him →
              </a>
            </>
          ) : (
            <>
              Welcome from LinkedIn 👋 Prefer quick visual explainers?{" "}
              <a
                href="#instagram"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                See the Instagram page →
              </a>
            </>
          )}
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss"
          className="rounded p-1 text-muted-foreground hover:text-foreground"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
