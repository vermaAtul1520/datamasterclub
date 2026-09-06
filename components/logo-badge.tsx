import { SafeLogo } from "@/components/safe-logo";
import { cn } from "@/lib/utils";

// Renders a company logo next to a label. If the logo asset isn't in
// /public yet (or fails to load), it quietly falls back to text-only so
// nothing breaks visually before the real file is dropped in.
export function LogoBadge({
  src,
  alt,
  label,
  width = 16,
  height = 16,
  className,
}: {
  src: string;
  alt: string;
  label: string;
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground",
        className
      )}
    >
      <SafeLogo src={src} alt={alt} width={width} height={height} />
      <span>{label}</span>
    </div>
  );
}
