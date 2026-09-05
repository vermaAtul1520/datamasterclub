import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { socialLinks } from "@/lib/site-config";
import { ArrowUpRight } from "lucide-react";
import { LinkedinIcon, InstagramIcon, YoutubeIcon } from "@/components/icons/brand-icons";

const cards = [
  {
    name: "YouTube",
    handle: "Open Data Insights by Krishna",
    href: socialLinks.youtube,
    icon: YoutubeIcon,
  },
  {
    name: "Instagram",
    handle: "@datamasterclub",
    href: socialLinks.instagram,
    icon: InstagramIcon,
  },
  {
    name: "LinkedIn",
    handle: "Krishna Verma",
    href: socialLinks.linkedin,
    icon: LinkedinIcon,
  },
];

export function SocialLinks() {
  return (
    <section className="border-y border-border/60 bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mb-10 flex flex-col gap-3 text-center">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Follow the content
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Tutorials and breakdowns posted regularly across these channels.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {cards.map((card) => (
            <a key={card.name} href={card.href} target="_blank" rel="noopener noreferrer">
              <Card className="h-full border-border bg-background ring-0 transition-colors hover:border-primary/50">
                <CardContent className="flex items-center gap-4 pt-2">
                  <div className="flex size-11 items-center justify-center rounded-lg border border-border bg-card text-primary">
                    <card.icon className="size-5" />
                  </div>
                  <div className="flex-1">
                    <CardTitle>{card.name}</CardTitle>
                    <CardDescription>{card.handle}</CardDescription>
                  </div>
                  <ArrowUpRight className="size-4 text-muted-foreground" />
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
