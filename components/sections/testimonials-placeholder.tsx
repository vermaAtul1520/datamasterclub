import { MessagesSquare } from "lucide-react";

export function TestimonialsPlaceholder() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border bg-card/30 px-6 py-16 text-center">
        <div className="flex size-12 items-center justify-center rounded-full border border-border bg-background text-muted-foreground">
          <MessagesSquare className="size-5" />
        </div>
        <h3 className="font-heading text-xl font-medium text-foreground">
          Student stories — coming soon
        </h3>
        <p className="max-w-md text-sm text-muted-foreground">
          Reviews from the community will show up here as they come in.
        </p>
      </div>
    </section>
  );
}
