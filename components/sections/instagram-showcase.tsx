import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { InstagramIcon } from "@/components/icons/brand-icons";
import { InstagramEmbeds } from "@/components/instagram-embeds";
import { buttonVariants } from "@/components/ui/button";
import { instagramShowcase, socialLinks } from "@/lib/site-config";
import { cn } from "cn";

// Real Instagram posts via the official embed (see InstagramEmbeds). Which
// posts show is set in site-config → instagramShowcase.posts.
export function InstagramShowcase() {
  const { handle, followers, pitch } = instagramShowcase;

  return (
    <section id="instagram" className="scroll-mt-20 mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex max-w-2xl flex-col gap-4">
          <span className="w-fit rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            On Instagram
          </span>
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            The 60-second version
          </h2>
          <p className="text-muted-foreground">{pitch}</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] p-[2px]">
              <div className="relative size-12 overflow-hidden rounded-full border-2 border-background">
                <Image
                  src="/krishna.jpg"
                  alt="Krishna Verma"
                  fill
                  sizes="48px"
                  className="object-cover object-[38%_18%]"
                />
              </div>
            </div>
            <div>
              <p className="font-medium text-foreground">{handle}</p>
              <p className="text-sm text-muted-foreground">
                {followers ? `${followers} followers` : "Data Master Club"}
              </p>
            </div>
          </div>
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "lg" }), "h-11 rounded-xl px-5 text-sm")}
          >
            <InstagramIcon className="size-4" />
            Follow
            <ArrowUpRight className="size-4" />
          </a>
        </div>
      </div>

      <InstagramEmbeds />
    </section>
  );
}
