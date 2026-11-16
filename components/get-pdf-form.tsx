"use client";

import { useState, type FormEvent, type FocusEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { isValidEmail } from "@/lib/validate-email";
import { captureAttribution, useAttribution } from "@/lib/traffic-source";
import { ThankYouPanel } from "@/components/thank-you-panel";

type Status = "idle" | "loading" | "success" | "error";

export function GetPdfForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [requestedPdf, setRequestedPdf] = useState("");
  const attribution = useAttribution();

  function handleEmailBlur(e: FocusEvent<HTMLInputElement>) {
    const value = e.target.value.trim();
    setEmailError(value && !isValidEmail(value) ? "That email doesn't look valid." : null);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const email = data.get("email")?.toString().trim() || "";

    if (!isValidEmail(email)) {
      setEmailError("Enter a valid email address.");
      (form.elements.namedItem("email") as HTMLInputElement)?.focus();
      return;
    }
    setEmailError(null);
    setStatus("loading");

    const honeypot = data.get("dmc_hp")?.toString() || "";
    const pdf = data.get("pdf")?.toString().trim() || "";
    const attr = attribution ?? captureAttribution();

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.get("fullName"),
          email,
          pdf,
          note: data.get("note"),
          company: honeypot,
          source: attr.source,
          utm_source: attr.utm_source,
          utm_medium: attr.utm_medium,
          utm_campaign: attr.utm_campaign,
          referrer: attr.referrer,
          landingPath: attr.landingPath,
        }),
        signal: controller.signal,
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setMessage(result.error || "Something went wrong. Please try again.");
        return;
      }

      setRequestedPdf(pdf);
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error && err.name === "AbortError"
          ? "This is taking longer than expected. Please try again in a moment."
          : "Something went wrong. Please check your connection and try again."
      );
    } finally {
      clearTimeout(timeout);
    }
  }

  if (status === "success") {
    return <ThankYouPanel pdf={requestedPdf} source={attribution?.source ?? "direct"} />;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <div>
        <label htmlFor="fullName" className="mb-1.5 block text-sm text-muted-foreground">
          Full Name
        </label>
        <Input
          id="fullName"
          name="fullName"
          required
          placeholder="Your full name"
          className="h-11 rounded-xl border-border bg-background/60 px-4 text-base"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm text-muted-foreground">
          Email address
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@email.com"
          onBlur={handleEmailBlur}
          onChange={() => emailError && setEmailError(null)}
          aria-invalid={!!emailError}
          className="h-11 rounded-xl border-border bg-background/60 px-4 text-base"
        />
        {emailError && <p className="mt-1.5 text-sm text-destructive">{emailError}</p>}
      </div>

      <div>
        <label htmlFor="pdf" className="mb-1.5 block text-sm text-muted-foreground">
          Which PDF would you like?{" "}
          <span className="text-xs">(e.g. SQL, Window Functions, Python, NumPy)</span>
        </label>
        <Input
          id="pdf"
          name="pdf"
          required
          placeholder="SQL, Window Functions, Python..."
          className="h-11 rounded-xl border-border bg-background/60 px-4 text-base"
        />
      </div>

      <div>
        <label htmlFor="note" className="mb-1.5 block text-sm text-muted-foreground">
          UPI transaction note{" "}
          <span className="text-xs">(optional, if you sent support)</span>
        </label>
        <Input
          id="note"
          name="note"
          placeholder="e.g. Paid ₹49 via GPay"
          className="h-11 rounded-xl border-border bg-background/60 px-4 text-base"
        />
      </div>

      {/*
        Honeypot — hidden from real visitors, bots tend to fill every field.
        Named "dmc_hp" (not "company"/"website"/etc.) deliberately: those
        common names match browser autofill taxonomies, and a saved-address
        autofill can silently fill a hidden field named "company", making a
        real user's submission look like spam. autoComplete="off" plus a
        zero-size, off-screen, unlabeled field keeps autofill engines away.
      */}
      <input
        type="text"
        name="dmc_hp"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      {message && <p className="text-sm text-destructive">{message}</p>}

      <Button
        type="submit"
        size="lg"
        disabled={status === "loading"}
        className="h-11 rounded-xl text-base transition-transform hover:scale-[1.02] active:scale-[0.98]"
      >
        {status === "loading" ? "Sending…" : "Get Free PDFs"}
      </Button>
    </form>
  );
}
