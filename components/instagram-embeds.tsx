"use client";

import Script from "next/script";
import { InstagramIcon } from "@/components/icons/brand-icons";
import { TopicVisual } from "@/components/topic-visual";
import { instagramShowcase } from "@/lib/site-config";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

// Official Instagram embeds (blockquote + embed.js). embed.js swaps each
// blockquote for an iframe of the real post and sizes it. Until then — or if
// an ad/privacy blocker stops embed.js — the blockquote's own content (our
// topic tile) is what people see, so the row never looks broken.
export function InstagramEmbeds() {
  const { posts } = instagramShowcase;

  return (
    <>
      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 [scrollbar-width:thin]">
        {posts.map((post) => (
          <div key={post.href} className="flex w-[300px] shrink-0 snap-start flex-col gap-2 sm:w-[340px]">
            <blockquote
              className="instagram-media"
              data-instgrm-permalink={`${post.href}?utm_source=ig_embed`}
              data-instgrm-version="14"
              style={{
                background: "transparent",
                border: 0,
                margin: 0,
                padding: 0,
                width: "100%",
                minWidth: 0,
                maxWidth: "100%",
              }}
            >
              <a
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/25 via-card to-background p-4"
              >
                {post.visual && (
                  <div className="absolute inset-x-4 top-10 bottom-[7rem] flex items-center justify-center">
                    <TopicVisual kind={post.visual} />
                  </div>
                )}
                <div className="relative flex flex-col gap-2 rounded-xl bg-background/70 p-3 backdrop-blur-sm">
                  <span className="w-fit rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {post.tag}
                  </span>
                  <p className="text-sm font-medium leading-snug text-foreground">{post.title}</p>
                  <p className="text-[11px] text-muted-foreground">View this post on Instagram</p>
                </div>
                <InstagramIcon className="absolute right-3 top-3 size-4 text-muted-foreground" />
              </a>
            </blockquote>
            {post.keyword && (
              <p className="px-1 text-xs text-muted-foreground">
                Comment <span className="font-mono text-primary">{post.keyword}</span> on this post
                to get the PDF in your DMs
              </p>
            )}
          </div>
        ))}
      </div>

      {/* lazyOnload: Instagram's script is heavy — fetch it only after the
          rest of the page has loaded. onReady re-processes on re-mounts. */}
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onReady={() => window.instgrm?.Embeds.process()}
      />
    </>
  );
}
