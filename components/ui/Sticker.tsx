import React from "react";
import { ProductBadge } from "@/lib/types/domain";
import { idMessages } from "@/lib/i18n";
import { cn } from "@/lib/utils/cn";

interface StickerProps {
  badge: ProductBadge;
  tilt?: "left" | "right" | "flat";
  className?: string;
}

/**
 * Product status pill sticker (DESIGN.md Section 5):
 * - rounded-full pill (explicitly allowed exception)
 * - rotated -2deg to +2deg
 * - 2px ink border
 * - gold background + ink text, EXCEPT SOLD_OUT ("Habis") which uses ink background + surface text
 * - micro 13px weight 600, sentence case
 */
export function Sticker({ badge, tilt = "left", className }: StickerProps) {
  const isSoldOut = badge === "SOLD_OUT";
  const label = idMessages.badges[badge];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border-base px-3 py-1 type-micro select-none",
        isSoldOut ? "bg-ink text-surface" : "bg-gold text-ink",
        tilt === "left" && "-rotate-2",
        tilt === "right" && "rotate-2",
        className
      )}
    >
      {label}
    </span>
  );
}

