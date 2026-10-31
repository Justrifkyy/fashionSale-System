import React from "react";
import { cn } from "@/lib/utils/cn";

export interface StreetwearTickerProps {
  items?: string[];
  variant?: "ink" | "gold" | "brick" | "surface";
  speed?: "normal" | "slow" | "fast";
  reverse?: boolean;
  className?: string;
  repeatCount?: number;
  separatorIcon?: "star" | "diamond" | "dot";
}

const DEFAULT_TICKER_ITEMS = [
  "CARE CARE MAKASSAR",
  "DROP 01 // EDISI PESISIR",
  "235 GSM HEAVYWEIGHT TEE",
  "100% KATUN TENUN ASLI",
  "POLA BOXY SKENA",
  "KOTAK DAN LIPATAN",
  "BEBAS ONGKIR SE-SULAWESI",
  "GARANSI RETUR 7 HARI",
];

/**
 * Neo-Brutalist Streetwear Marquee Ticker:
 * - Continuous infinite CSS marquee loop with zero jitter
 * - Pauses on hover for tactile exploration
 * - 0px radius, crisp 3px/2px ink borders
 * - Accessible with prefers-reduced-motion
 */
export function StreetwearTicker({
  items = DEFAULT_TICKER_ITEMS,
  variant = "ink",
  speed = "normal",
  reverse = false,
  className,
  repeatCount = 4,
  separatorIcon = "star",
}: StreetwearTickerProps) {
  const sequence = Array.from({ length: repeatCount }, () => items).flat();

  const variantStyles = {
    ink: "bg-ink text-surface border-y-strong",
    gold: "bg-gold text-ink border-y-strong",
    brick: "bg-brick text-surface border-y-strong",
    surface: "bg-surface text-ink border-y-strong",
  }[variant];

  const speedClass = {
    normal: reverse ? "animate-ticker-reverse" : "animate-ticker",
    slow: "animate-ticker-slow",
    fast: "animate-ticker-fast",
  }[speed];

  const renderSeparator = () => {
    if (separatorIcon === "star") {
      return (
        <span
          aria-hidden="true"
          className={cn(
            "text-xs sm:text-sm font-black",
            variant === "gold" ? "text-brick" : "text-gold"
          )}
        >
          ★
        </span>
      );
    }
    if (separatorIcon === "diamond") {
      return (
        <span
          aria-hidden="true"
          className={cn(
            "h-2 w-2 border border-current rotate-45 shrink-0",
            variant === "gold" ? "bg-brick" : "bg-gold"
          )}
        />
      );
    }
    return (
      <span
        aria-hidden="true"
        className={cn(
          "h-2 w-2 rounded-full shrink-0",
          variant === "gold" ? "bg-brick" : "bg-gold"
        )}
      />
    );
  };

  return (
    <div
      role="marquee"
      aria-label="Pengumuman koleksi Care Care Makassar"
      className={cn(
        "relative w-full overflow-hidden select-none py-2.5 sm:py-3",
        variantStyles,
        className
      )}
    >
      <div className={speedClass}>
        {/* Track 1 */}
        <div className="flex shrink-0 items-center gap-6 sm:gap-10 px-4">
          {sequence.map((text, idx) => (
            <span
              key={`ticker-item-${idx}`}
              className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-black tracking-wider uppercase font-display whitespace-nowrap"
            >
              <span>{text}</span>
              {renderSeparator()}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

