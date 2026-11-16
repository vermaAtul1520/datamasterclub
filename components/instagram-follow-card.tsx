import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { InstagramIcon } from "@/components/icons/brand-icons";
import { buttonVariants } from "@/components/ui/button";
import { instagramShowcase, socialLinks } from "@/lib/site-config";
import { cn } from "cn";

/** Compact profile preview + follow button. Used in the thank-you panel. */
export function InstagramFollowCard() {
  return (
    <div className="flex flex-col gap-4">
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
        <div className="min-w-0">
          <p className="font-medium text-foreground">{instagramShowcase.handle}</p>
          <p className="text-xs text-muted-foreground">
            {instagramShowcase.followers
              ? `${instagramShowcase.followers} followers · Data & AI in 60 seconds`
              : "Data & AI in 60 seconds"}
          </p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{instagramShowcase.pitch}</p>
      <a
        href={socialLinks.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(buttonVariants({ size: "lg" }), "h-11 rounded-xl text-sm")}
      >
        <InstagramIcon className="size-4" />
        Follow on Instagram
        <ArrowUpRight className="size-4" />
      </a>
    </div>
  );
}
