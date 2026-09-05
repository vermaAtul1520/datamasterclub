"use client";

import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

type Status = "idle" | "loading" | "success" | "error";

export function SignupForm({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage(null);

    const form = e.currentTarget;
    const honeypot = (form.elements.namedItem("company") as HTMLInputElement)
      ?.value;

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          company: honeypot,
          source: typeof window !== "undefined" ? window.location.pathname : undefined,
          utm_source: getParam("utm_source"),
          utm_medium: getParam("utm_medium"),
          utm_campaign: getParam("utm_campaign"),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        id={id}
        className={cn(
          "flex flex-col items-start gap-3 rounded-2xl border border-border bg-card/60 p-5",
          className
        )}
      >
        <p className="font-heading text-lg font-medium text-foreground">
          You&apos;re in! 🎉
        </p>
        <p className="text-sm text-muted-foreground">
          Welcome to Data Master Club. Join the community to say hi and get
          updates first.
        </p>
        <a
          href={siteConfig.communityInviteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "default", size: "lg" }))}
        >
          Join the community
        </a>
      </div>
    );
  }

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-2 sm:flex-row sm:items-start", className)}
      noValidate
    >
      <div className="flex-1">
        <label htmlFor={`${id}-email`} className="sr-only">
          Email address
        </label>
        <Input
          id={`${id}-email`}
          type="email"
          required
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-11 rounded-xl border-border bg-background/60 px-4 text-base"
          aria-invalid={status === "error"}
        />
        {/* Honeypot — hidden from real visitors, bots tend to fill every field */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
          aria-hidden="true"
        />
        {message && (
          <p className="mt-2 text-sm text-destructive">{message}</p>
        )}
      </div>
      <Button
        type="submit"
        size="lg"
        disabled={status === "loading"}
        className="h-11 rounded-xl px-6 text-base transition-transform hover:scale-[1.02] active:scale-[0.98]"
      >
        {status === "loading" ? "Joining…" : "Join the Community"}
      </Button>
    </form>
  );
}

function getParam(key: string): string | undefined {
  if (typeof window === "undefined") return undefined;
  return new URLSearchParams(window.location.search).get(key) || undefined;
}
