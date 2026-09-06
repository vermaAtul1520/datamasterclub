import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { LogoBadge } from "@/components/logo-badge";
import { krishnaBio } from "@/lib/site-config";

export function MeetKrishna() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-3xl border border-border bg-card">
          <Image
            src="/krishna.jpg"
            alt="Krishna Verma"
            fill
            sizes="(min-width: 1024px) 24rem, 20rem"
            className="object-cover object-[38%_18%]"
          />
        </div>
        <div className="flex flex-col gap-5">
          <span className="w-fit rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Meet Krishna
          </span>
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {krishnaBio.name}
          </h2>
          <div className="flex flex-wrap gap-2">
            {krishnaBio.employers.map((employer) => (
              <LogoBadge
                key={employer.name}
                src={employer.logo}
                alt={employer.name}
                label={employer.label}
                width={employer.logoWidth}
                height={employer.logoHeight}
              />
            ))}
            {krishnaBio.badges.map((badge) => (
              <Badge key={badge} variant="secondary" className="rounded-full px-3 py-1.5 text-xs">
                {badge}
              </Badge>
            ))}
          </div>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            {krishnaBio.bio}
          </p>
        </div>
      </div>
    </section>
  );
}
