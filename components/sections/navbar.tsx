import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.webp"
            alt="Data Master Club"
            width={36}
            height={36}
            className="rounded-md"
            priority
          />
          <span className="font-heading text-base font-semibold tracking-tight text-foreground">
            Data Master Club
          </span>
        </Link>
        <a
          href="#join"
          className={cn(buttonVariants({ variant: "default" }), "rounded-lg px-4")}
        >
          Join the Community
        </a>
      </div>
    </header>
  );
}
