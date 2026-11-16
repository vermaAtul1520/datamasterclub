import { MessagesSquare } from "lucide-react";
import { LinkedinShoutout } from "@/components/linkedin-shoutout";

// Until real learner posts are collected, this section invites visitors to
// write one. Later: feature the best LinkedIn shout-outs here (with permission).
export function TestimonialsPlaceholder() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="grid gap-8 rounded-3xl border border-dashed border-border bg-card/30 px-6 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-10">
        <div className="flex flex-col gap-4">
          <div className="flex size-12 items-center justify-center rounded-full border border-border bg-background text-muted-foreground">
            <MessagesSquare className="size-5" />
          </div>
          <h3 className="font-heading text-2xl font-medium text-foreground">
            Learned something here? Say it on LinkedIn.
          </h3>
          <p className="max-w-md text-sm text-muted-foreground">
            Student stories will show up on this page. The easiest way to share yours: a short
            LinkedIn post tagging Krishna — it helps other learners find these free resources.
          </p>
        </div>
        <LinkedinShoutout />
      </div>
    </section>
  );
}
