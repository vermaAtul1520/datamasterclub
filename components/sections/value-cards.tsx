import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { valueCards } from "@/lib/site-config";
import { BookOpen, Database, Users, FileDown } from "lucide-react";

const icons = [BookOpen, Database, Users, FileDown];

export function ValueCards() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mb-12 flex flex-col gap-3 text-center">
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Why join Data Master Club
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Straightforward lessons and a community built for people actually
          trying to break into or grow in data.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {valueCards.map((card, i) => {
          const Icon = icons[i];
          return (
            <Card key={card.title} className="border-border bg-card/60 ring-0">
              <CardContent className="flex flex-col gap-3 pt-2">
                <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-background text-primary">
                  <Icon className="size-5" />
                </div>
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
