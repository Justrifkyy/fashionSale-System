import React from "react";
import { formatRupiah } from "@/lib/utils/money";
import { cn } from "@/lib/utils/cn";

interface PriceTagProps {
  price: number;
  compareAtPrice?: number | null;
  size?: "base" | "lg";
  className?: string;
}

/**
 * Price display in tabular numerals (`Rp\u00A0160.000`, bold 700) with optional strike-through compare price.
 */
export function PriceTag({
  price,
  compareAtPrice,
  size = "base",
  className,
}: PriceTagProps) {
  const hasDiscount =
    typeof compareAtPrice === "number" && compareAtPrice > price;

  return (
    <div className={cn("inline-flex flex-wrap items-baseline gap-2", className)}>
      <span
        className={cn(
          "font-bold tabular-nums text-ink",
          size === "lg" ? "text-[22px] sm:text-[26px]" : "text-[16px]"
        )}
      >
        {formatRupiah(price)}
      </span>
      {hasDiscount && (
        <span
          className={cn(
            "tabular-nums text-muted line-through font-normal",
            size === "lg" ? "text-[16px]" : "type-small"
          )}
        >
          {formatRupiah(compareAtPrice)}
        </span>
      )}
    </div>
  );
}

