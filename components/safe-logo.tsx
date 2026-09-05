"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// A standalone logo image that quietly disappears if the asset is missing
// or fails to load, instead of showing a broken-image icon.
export function SafeLogo({
  src,
  alt,
  size = 20,
  className,
}: {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cn("shrink-0 object-contain", className)}
      onError={() => setFailed(true)}
    />
  );
}
