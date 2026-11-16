"use client";

import { useState } from "react";
import { LinkedinShoutout } from "@/components/linkedin-shoutout";
import { InstagramFollowCard } from "@/components/instagram-follow-card";
import { siteConfig, socialLinks } from "@/lib/site-config";
import type { TrafficSource } from "@/lib/traffic-source";

// Shown after a PDF request. The PDF is never conditional on any of this —
// the asks are optional, one-tap, and dismissible.
//
//   came from Instagram (or anywhere else) → main ask: LinkedIn shout-out
//   came from LinkedIn                     → main ask: follow on Instagram
export function ThankYouPanel({ pdf, source }: { pdf: string; source: TrafficSource }) {
  const [dismissed, setDismissed] = useState(false);
  const [showShoutout, setShowShoutout] = useState(false);
  const fromLinkedin = source === "linkedin";

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-border bg-card/60 p-6">
      <div className="flex flex-col gap-1.5">
        <p className="font-heading text-lg font-medium text-foreground">You&apos;re in! 🎉</p>
        <p className="text-sm text-muted-foreground">
          Your {pdf ? <span className="text-foreground">{pdf}</span> : null} PDF is on its way —
          check your inbox shortly.
        </p>
      </div>

      {!dismissed && (
        <div className="flex flex-col gap-4 border-t border-border pt-5">
          {fromLinkedin ? (
            <>
              <div>
                <p className="font-medium text-foreground">Catch the quick versions on Instagram</p>
                <p className="text-sm text-muted-foreground">
                  Since you found us on LinkedIn — Krishna posts bite-sized visual breakdowns there too.
                </p>
              </div>
              <InstagramFollowCard />
              {showShoutout && <LinkedinShoutout topic={pdf} />}
            </>
          ) : (
            <>
              <div>
                <p className="font-medium text-foreground">
                  Found this useful? A quick LinkedIn shout-out helps a lot.
                </p>
                <p className="text-sm text-muted-foreground">
                  Krishna makes these for free. A short post tagging him helps more learners find
                  them — we&apos;ve drafted one you can edit.
                </p>
              </div>
              <LinkedinShoutout topic={pdf} />
            </>
          )}

          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <button
              type="button"
              onClick={() => setDismissed(true)}
              className="text-muted-foreground hover:text-foreground"
            >
              Maybe later
            </button>
            {/* Secondary option always points at the *other* platform from the main ask's
                origin: Instagram visitors → connect on LinkedIn; LinkedIn visitors → shout-out. */}
            {fromLinkedin ? (
              <button
                type="button"
                onClick={() => setShowShoutout((v) => !v)}
                className="text-muted-foreground hover:text-foreground"
              >
                {showShoutout ? "Hide LinkedIn post" : "Or post a thank-you on LinkedIn →"}
              </button>
            ) : (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                Or just connect with Krishna on LinkedIn →
              </a>
            )}
          </div>
        </div>
      )}

      {siteConfig.communityInviteUrl !== "#" && (
        <a
          href={siteConfig.communityInviteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-primary hover:underline"
        >
          Join the community →
        </a>
      )}
    </div>
  );
}
