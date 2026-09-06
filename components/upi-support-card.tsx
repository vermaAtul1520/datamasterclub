"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Copy } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { upiSupport, buildUpiLink } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function UpiSupportCard() {
  const [copied, setCopied] = useState(false);

  async function copyUpiId() {
    try {
      await navigator.clipboard.writeText(upiSupport.payeeId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — the UPI ID is still visible to copy manually.
    }
  }

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-border bg-card/60 p-6">
      <div>
        <h3 className="font-heading text-lg font-medium text-foreground">
          Support the work (optional)
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          All PDFs are completely free — no paywall, ever. If they helped
          you, a small UPI contribution helps fund more free resources.
        </p>
      </div>

      <div className="mx-auto overflow-hidden rounded-xl border border-border bg-white p-3">
        <Image
          src={upiSupport.qrImage}
          alt="Scan to pay via UPI"
          width={180}
          height={180}
        />
      </div>

      <button
        type="button"
        onClick={copyUpiId}
        className="flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm text-foreground transition-colors hover:border-primary/50"
      >
        {copied ? (
          <>
            <Check className="size-4 text-primary" /> Copied
          </>
        ) : (
          <>
            <Copy className="size-4 text-muted-foreground" />
            {upiSupport.payeeId}
          </>
        )}
      </button>

      <div className="flex flex-wrap justify-center gap-2">
        {upiSupport.suggestedAmounts.map((amount) => (
          <a
            key={amount}
            href={buildUpiLink(amount)}
            className="flex-1 rounded-lg border border-border bg-background py-2 text-center text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            ₹{amount}
          </a>
        ))}
      </div>

      <a
        href={buildUpiLink()}
        className={cn(buttonVariants({ variant: "default" }), "w-full")}
      >
        Pay via UPI app
      </a>

      <p className="text-center text-xs text-muted-foreground">
        Opens your UPI app on mobile. On desktop, scan the QR instead.
      </p>
    </div>
  );
}
