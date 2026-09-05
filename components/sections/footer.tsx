import Image from "next/image";
import { socialLinks } from "@/lib/site-config";
import { LinkedinIcon, InstagramIcon, YoutubeIcon } from "@/components/icons/brand-icons";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.webp"
              alt="Data Master Club"
              width={32}
              height={32}
              className="rounded-md"
            />
            <span className="font-heading text-sm font-semibold text-foreground">
              Data Master Club
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <YoutubeIcon className="size-5" />
            </a>
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <InstagramIcon className="size-5" />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <LinkedinIcon className="size-5" />
            </a>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center">
          <p>&copy; {year} Data Master Club. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="cursor-not-allowed opacity-50">Courses</span>
            <span className="cursor-not-allowed opacity-50">Resources</span>
            <span className="cursor-not-allowed opacity-50">Contact</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
