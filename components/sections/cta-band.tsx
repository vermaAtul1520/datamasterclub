import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-full w-full max-w-3xl -translate-x-1/2 rounded-full bg-[#3B82F6] opacity-10 blur-[140px]"
      />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6">
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Start learning the tools that actually run production data systems.
        </h2>
        <p className="max-w-xl text-muted-foreground">
          Join Data Master Club — free, practical, and taught by someone who
          builds this for a living.
        </p>
        <a
          href="#get-pdfs"
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "h-11 rounded-xl px-6 text-base transition-transform hover:scale-[1.02]"
          )}
        >
          Get Free PDFs
        </a>
      </div>
    </section>
  );
}
