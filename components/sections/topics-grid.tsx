import { Badge } from "@/components/ui/badge";
import { topics } from "@/lib/site-config";

export function TopicsGrid() {
  return (
    <section className="border-y border-border/60 bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mb-10 flex flex-col gap-3 text-center">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Topics covered
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            The exact stack used in production data teams today.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {topics.map((topic) => (
            <Badge
              key={topic}
              variant="outline"
              className="h-auto rounded-full border-border bg-background px-4 py-2 font-mono text-sm font-normal text-foreground"
            >
              {topic}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
