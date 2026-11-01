import React from "react";
import { cn } from "@/lib/utils/cn";

export interface PoliceTapeProps {
  items?: string[];
  variant?: "hazard" | "brick" | "ink" | "white";
  speed?: "normal" | "slow" | "fast";
  reverse?: boolean;
  angle?: number;
  showHazardBorder?: boolean;
  className?: string;
  repeatCount?: number;
}

const DEFAULT_TAPE_ITEMS = [
  "⚠️ POLICE LINE DO NOT CROSS",
  "MANDIRI GLOBAL MAKASSAR",
  "DROP 01 // EDISI PESISIR",
  "KATUN TENUN 100% ASLI",
  "JANGAN DILINTASI // STOK TERBATAS",
  "PENGIRIMAN DARI MAKASSAR",
  "GARANSI RETUR 7 HARI",
  "KOTAK DAN LIPATAN",
];

/**
 * Neo-Brutalist Police Line / Caution Tape Ticker:
 * - Repeating caution banner with hazard stripes and bold typography
 * - Infinite seamless CSS marquee scroll
 * - Pauses on hover
 * - Zero roundness, crisp 3px/2px ink borders
 */
export function PoliceTape({
  items = DEFAULT_TAPE_ITEMS,
  variant = "hazard",
  speed = "normal",
  reverse = false,
  angle = 0,
  showHazardBorder = true,
  className,
  repeatCount = 4,
}: PoliceTapeProps) {
  // Build a repeating string array to guarantee seamless loop
  const tapeSequence = Array.from({ length: repeatCount }, () => items).flat();

  const variantStyles = {
    hazard: "bg-gold text-ink border-y-strong",
    brick: "bg-brick text-surface border-y-strong",
    ink: "bg-ink text-surface border-y-strong",
    white: "bg-surface text-ink border-y-strong",
  }[variant];

  const speedClass = {
    normal: reverse ? "animate-ticker-reverse" : "animate-ticker",
    slow: "animate-ticker-slow",
    fast: "animate-ticker-fast",
  }[speed];

  const transformStyle = angle !== 0 ? { transform: `rotate(${angle}deg)` } : undefined;

  return (
    <div
      role="marquee"
      aria-label="Peringatan rilisan Mandiri Global"
      style={transformStyle}
      className={cn(
        "relative w-full overflow-hidden select-none",
        variantStyles,
        className
      )}
    >
      {/* Top hazard stripe accent line */}
      {showHazardBorder && (
        <div
          aria-hidden="true"
          className="h-1.5 w-full hazard-tape-sm border-b border-ink/40"
        />
      )}

      {/* Main scrolling text track */}
      <div className="py-2 sm:py-2.5">
        <div className={speedClass}>
          {/* Track 1 */}
          <div className="flex shrink-0 items-center gap-6 sm:gap-8 px-4">
            {tapeSequence.map((text, idx) => (
              <span
                key={`t1-${idx}`}
                className="flex items-center gap-4 text-[13px] sm:text-[15px] font-black tracking-wider uppercase font-display whitespace-nowrap"
              >
                <span>{text}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "inline-block h-2 w-2 border border-ink",
                    variant === "hazard" ? "bg-ink" : "bg-gold"
                  )}
                />
              </span>
            ))}
          </div>

          {/* Track 2 (duplicate for continuous loop) */}
          <div className="flex shrink-0 items-center gap-6 sm:gap-8 px-4" aria-hidden="true">
            {tapeSequence.map((text, idx) => (
              <span
                key={`t2-${idx}`}
                className="flex items-center gap-4 text-[13px] sm:text-[15px] font-black tracking-wider uppercase font-display whitespace-nowrap"
              >
                <span>{text}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "inline-block h-2 w-2 border border-ink",
                    variant === "hazard" ? "bg-ink" : "bg-gold"
                  )}
                />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom hazard stripe accent line */}
      {showHazardBorder && (
        <div
          aria-hidden="true"
          className="h-1.5 w-full hazard-tape-sm border-t border-ink/40"
        />
      )}
    </div>
  );
}

