"use client";

import React, { useEffect, useRef } from "react";
import { idMessages } from "@/lib/i18n";
import { cn } from "@/lib/utils/cn";

export type LogoVariant =
  | "color-on-light"
  | "color-on-dark"
  | "all-navy"
  | "all-white";

interface CareCareLogoProps {
  variant?: LogoVariant;
  withWordmark?: boolean;
  animateOncePerSession?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SESSION_LOGO_KEY = "carecare_hero_logo_assembled_v1";

/**
 * Interlocking geometric double-C monogram built from square blocks with a folded-paper
 * shading joint (spec: brand.logo & DESIGN.md Section 1 & 7).
 * Minimum digital height 24px enforced.
 */
export function CareCareLogo({
  variant = "color-on-light",
  withWordmark = false,
  animateOncePerSession = false,
  size = "md",
  className,
}: CareCareLogoProps) {
  const wrapperRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!animateOncePerSession) return;
    try {
      const alreadyPlayed = window.sessionStorage.getItem(SESSION_LOGO_KEY);
      if (!alreadyPlayed) {
        wrapperRef.current?.classList.add("logo-assemble");
        window.sessionStorage.setItem(SESSION_LOGO_KEY, "1");
      }
    } catch {
      // Ignore sessionStorage restrictions
    }
  }, [animateOncePerSession]);

  const leftBlockColor =
    variant === "all-navy"
      ? "#2D2D56"
      : variant === "all-white"
        ? "#FFFFFF"
        : "#B8523C";

  const rightBlockColor =
    variant === "color-on-dark" || variant === "all-white"
      ? "#FFFFFF"
      : "#2D2D56";

  const foldShadowColor =
    variant === "all-navy"
      ? "#2D2D56"
      : variant === "all-white"
        ? "#E4E4EE"
        : "#9A3F2B";

  const pxSize = size === "lg" ? 56 : size === "sm" ? 28 : 36;

  return (
    <span
      ref={wrapperRef}
      className={cn("inline-flex items-center gap-3 select-none", className)}
    >
      <svg
        width={pxSize}
        height={pxSize}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0 min-h-[24px] min-w-[24px]"
      >
        {/* Left geometric C block (terracotta) */}
        <g className="logo-c-left">
          <path
            d="M4 6H28L22 14H12V30H28V38H4V6Z"
            fill={leftBlockColor}
          />
        </g>

        {/* Right interlocking geometric C block (navy or white on dark) */}
        <g className="logo-c-right">
          <path
            d="M20 12H44V20H28V34H38L44 42H20V12Z"
            fill={rightBlockColor}
          />
        </g>

        {/* Folded-paper 45-degree corner shadow detail at the interlocking joint */}
        <polygon
          className="logo-c-fold"
          points="20,12 28,12 20,20"
          fill={foldShadowColor}
        />
      </svg>

      {withWordmark && (
        <span
          className={cn(
            "wordmark tracking-tight",
            size === "lg"
              ? "text-[26px]"
              : size === "sm"
                ? "text-[17px]"
                : "text-[20px]",
            variant === "color-on-dark" || variant === "all-white"
              ? "text-surface"
              : "text-ink"
          )}
        >
          {idMessages.common.wordmark}
        </span>
      )}
    </span>
  );
}
