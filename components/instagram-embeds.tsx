"use client";

import Script from "next/script";
import { ArrowUpRight } from "lucide-react";
import { InstagramIcon } from "@/components/icons/brand-icons";
import { TopicVisual } from "@/components/topic-visual";
import { instagramShowcase } from "@/lib/site-config";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

// embed.js can report "ready" before its own init finishes, in which case a
// single process() call silently does nothing. process() only touches
// blockquotes that haven't been converted yet, so retrying is safe.
function processEmbeds() {
  for (const delay of [0, 800, 2500]) {
    setTimeout(() => window.instgrm?.Embeds.process(), delay);
  }
}

// Height of Instagram's embed header row (avatar + name + "View profile").
const IG_HEADER_PX = 55;

// Official Instagram embeds (blockquote + embed.js). embed.js swaps each
// blockquote for an iframe of the real post. Posts differ in shape (1:1,
// 4:5) and the embed adds a white likes/comments footer, so every card is
// cropped to the same window — Instagram's header + a square of the post —
// and our own dark footer carries the title and comment keyword. Until the
// script runs (or if a blocker stops it) the blockquote's own content, a
// topic tile, fills the same window.
export function InstagramEmbeds() {
  const { posts } = instagramShowcase;

  return (
    <>
      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:thin] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
        {posts.map((post) => (
          <article
            key={post.href}
            className="@container flex w-[78%] max-w-[340px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/50 sm:w-auto sm:max-w-none"
          >
            <div
              className="relative overflow-hidden bg-background [&_iframe]:m-0! [&_iframe]:w-full! [&_iframe]:min-w-0! [&_iframe]:max-w-none! [&_iframe]:rounded-none! [&_iframe]:border-0! [&_iframe]:shadow-none!"
              style={{ height: `calc(100cqw + ${IG_HEADER_PX}px)` }}
            >
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
                  height: "100%",
                }}
              >
                <a
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex h-full items-center justify-center bg-gradient-to-br from-primary/25 via-card to-background p-5"
                >
                  {post.visual && <TopicVisual kind={post.visual} />}
                  <InstagramIcon className="absolute right-3 top-3 size-4 text-muted-foreground" />
                </a>
              </blockquote>
            </div>

            <a
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-1 flex-col gap-2 border-t border-border p-4"
            >
              <span className="w-fit rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {post.tag}
              </span>
              <p className="text-sm font-medium leading-snug text-foreground">{post.title}</p>
              <div className="mt-auto flex items-center justify-between gap-2 pt-1 text-xs text-muted-foreground">
                {post.keyword ? (
                  <span>
                    Comment <span className="font-mono text-primary">{post.keyword}</span> for the PDF
                  </span>
                ) : (
                  <span>View on Instagram</span>
                )}
                <ArrowUpRight className="size-3.5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </div>
            </a>
          </article>
        ))}
      </div>

      {/* lazyOnload: Instagram's script is heavy — fetch it only after the
          rest of the page has loaded. onReady re-processes on re-mounts. */}
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onReady={processEmbeds}
      />
    </>
  );
}
