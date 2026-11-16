"use client";

import { useState } from "react";
import { useClientValue } from "@/lib/traffic-source";
import { Check, Copy } from "lucide-react";
import { LinkedinIcon } from "@/components/icons/brand-icons";
import { buttonVariants } from "@/components/ui/button";
import {
  krishnaLinkedinName,
  linkedinComposeUrl,
  shoutoutTemplates,
} from "@/lib/linkedin-share";
import { cn } from "cn";

// Clipboard API is missing/blocked in some in-app browsers — fall back to a
// hidden textarea + execCommand so "copy" still works there.
function copyText(text: string): Promise<boolean> {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text).then(
      () => true,
      () => legacyCopy(text)
    );
  }
  return Promise.resolve(legacyCopy(text));
}

function legacyCopy(text: string): boolean {
  try {
    const el = document.createElement("textarea");
    el.value = text;
    el.setAttribute("readonly", "");
    el.style.position = "fixed";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(el);
    return ok;
  } catch {
    return false;
  }
}

export function LinkedinShoutout({ topic = "" }: { topic?: string }) {
  const [templateId, setTemplateId] = useState(shoutoutTemplates[0].id);
  const [text, setText] = useState(() => shoutoutTemplates[0].build(topic));
  const [copied, setCopied] = useState(false);
  const inAppBrowser = useClientValue(
    () => /Instagram|FBAN|FBAV|LinkedInApp/i.test(navigator.userAgent),
    false
  );

  // Switching template replaces the draft (the user can still edit after).
  function pickTemplate(id: string) {
    const t = shoutoutTemplates.find((x) => x.id === id);
    if (!t) return;
    setTemplateId(id);
    setText(t.build(topic));
  }

  async function handleCopy() {
    const ok = await copyText(text);
    setCopied(ok);
    if (ok) setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Message style">
        {shoutoutTemplates.map((t) => (
          <button
            key={t.id}
            type="button"
            role="radio"
            aria-checked={t.id === templateId}
            onClick={() => pickTemplate(t.id)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs transition-colors",
              t.id === templateId
                ? "border-primary/60 bg-primary/15 text-foreground"
                : "border-border text-muted-foreground hover:text-foreground"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <label className="sr-only" htmlFor="shoutout-text">
        Your LinkedIn post (editable)
      </label>
      <textarea
        id="shoutout-text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={7}
        className="w-full resize-y rounded-xl border border-border bg-background/60 p-3 text-sm leading-relaxed text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      />

      <div className="flex flex-col gap-2 sm:flex-row">
        {/* A real link (not window.open) so popup blockers and in-app
            browsers treat it as a normal user tap. Copy fires on the same tap. */}
        <a
          href={linkedinComposeUrl(text)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => void handleCopy()}
          className={cn(buttonVariants({ size: "lg" }), "h-11 flex-1 rounded-xl text-sm")}
        >
          <LinkedinIcon className="size-4" />
          Copy &amp; open LinkedIn
        </a>
        <button
          type="button"
          onClick={() => void handleCopy()}
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 rounded-xl text-sm")}
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          {copied ? "Copied" : "Copy text"}
        </button>
      </div>

      <ol className="list-decimal space-y-1 pl-5 text-xs text-muted-foreground">
        <li>If the post box opens empty, just paste — the text is already copied.</li>
        <li>
          Type <span className="font-mono text-foreground">@Krishna</span> and pick{" "}
          <span className="text-foreground">{krishnaLinkedinName}</span> from the list so he gets
          tagged (LinkedIn doesn&apos;t let websites add tags for you).
        </li>
        {inAppBrowser && (
          <li>
            You&apos;re in an in-app browser — if LinkedIn asks you to log in, tap{" "}
            <span className="text-foreground">⋯ → Open in browser</span> first.
          </li>
        )}
      </ol>
    </div>
  );
}
