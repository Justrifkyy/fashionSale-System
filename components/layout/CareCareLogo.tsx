"use client";

import React, { useEffect, useId, useRef } from "react";
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
 * Authentic Care Care Interlocking Monogram Logo (Frame 1.svg / Frame 1.png):
 * - Interlocking geometric letter C monogram with folded-paper shading joint
 * - Terracotta (#B8523C) & Ink Navy (#2D2C56) branding blocks
 * - Beveled 45-degree fold shadow joint (#A6432E)
 * - Inner shadow filter on joint
 * - Vector-scaled with support for dark/light/monochrome variants
 */
export function CareCareLogo({
  variant = "color-on-light",
  withWordmark = false,
  animateOncePerSession = false,
  size = "md",
  className,
}: CareCareLogoProps) {
  const reactId = useId();
  const filterId = `carecare-logo-filter-${reactId.replace(/:/g, "")}`;
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

  // Color mapping based on variant
  const terracottaColor =
    variant === "all-navy"
      ? "#2D2C56"
      : variant === "all-white"
        ? "#FFFFFF"
        : "#B8523C";

  const foldColor =
    variant === "all-navy"
      ? "#2D2C56"
      : variant === "all-white"
        ? "#E4E4EE"
        : "#A6432E";

  const navyColor =
    variant === "color-on-dark" || variant === "all-white"
      ? "#FFFFFF"
      : "#2D2C56";

  const strokeColor = navyColor;

  const height = size === "lg" ? 44 : size === "sm" ? 26 : 34;
  const width = Math.round(height * (286 / 260));

  return (
    <span
      ref={wrapperRef}
      className={cn("inline-flex items-center gap-2.5 sm:gap-3 select-none", className)}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 286 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0 transition-transform duration-200 group-hover:scale-105"
      >
        <g filter={variant === "color-on-light" ? `url(#${filterId})` : undefined}>
          <path
            d="M176.5 109L149 135.501C149 135.501 145.734 132.574 143 131.5C140.266 130.426 135 130.001 135 130.001L141 124.5V93.5C141 93.5 148.849 93.8882 155 97.5005C161.151 101.113 176.5 109 176.5 109Z"
            fill={terracottaColor}
          />
        </g>
        <path
          d="M183.5 135.5H149L183 102L183.5 135.5Z"
          fill={terracottaColor}
        />
        <path
          d="M104.5 158V124.5H34V42C34 42 33.8781 38 36 35.5C38.1219 33 42 33 42 33H104.5V0H42C42 0 28.4391 -3.8147e-06 14.5 13.5C0.560879 27 0.507812 42 0.507812 42L0 158.5L104.5 158Z"
          fill={terracottaColor}
        />
        <path
          d="M141 33L104.5 0V33H141Z"
          fill={foldColor}
        />
        <path
          d="M141 93.5H104.5V124.5H141V93.5Z"
          fill={navyColor}
        />
        <path
          d="M141 33H104.5V64H141V33Z"
          fill={navyColor}
        />
        <path
          d="M141 124.5H104.5L104.5 158L141 124.5Z"
          fill={navyColor}
        />
        <path
          d="M286 102H183V135.5H253.5V165.5H286V102Z"
          fill={navyColor}
        />
        <path
          d="M183 225V135.5H149V225H183Z"
          fill={navyColor}
        />
        <path
          d="M149 225H183H247.5C247.5 225 250.932 224.599 252 223C253.068 221.401 253 218.5 253 218.5V196H286V223C286 223 286 235.5 273 246.5C260 257.5 247.5 259.261 247.5 259.261H183L149 225Z"
          fill={terracottaColor}
        />
        <path
          d="M58 158V213H149"
          strokeWidth="5"
          stroke={strokeColor}
        />
        <path
          d="M232 102V47H141"
          strokeWidth="5"
          stroke={strokeColor}
        />
        <defs>
          <filter
            id={filterId}
            x="135"
            y="93.5"
            width="41.5"
            height="46.001"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="8.4" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend mode="normal" in2="shape" result={`effect1_innerShadow_${filterId}`} />
          </filter>
        </defs>
      </svg>

      {withWordmark && (
        <span
          className={cn(
            "wordmark tracking-tight font-extrabold uppercase",
            size === "lg"
              ? "text-[24px]"
              : size === "sm"
                ? "text-[16px]"
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
