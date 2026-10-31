"use client";

import React from "react";
import { Minus, Plus } from "lucide-react";
import { idMessages } from "@/lib/i18n";
import { cn } from "@/lib/utils/cn";

interface QuantityStepperProps {
  value: number;
  min?: number;
  max: number;
  onChange: (nextValue: number) => void;
  showMaxHint?: boolean;
  className?: string;
}

/**
 * Three-box quantity stepper (DESIGN.md Section 7 & 9):
 * - 2px ink border, 44px height
 * - Numbers change instantaneously (0ms, no animation)
 * - `+` disabled at max stock with "Maksimal sesuai stok" message
 */
export function QuantityStepper({
  value,
  min = 1,
  max,
  onChange,
  showMaxHint = true,
  className,
}: QuantityStepperProps) {
  const atMin = value <= min;
  const atMax = value >= max;

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <div className="inline-flex items-stretch border-base bg-surface w-fit">
        <button
          type="button"
          onClick={() => !atMin && onChange(value - 1)}
          disabled={atMin}
          aria-label={idMessages.product.decreaseQty}
          className="flex h-[44px] w-[44px] items-center justify-center text-ink hover:bg-page disabled:bg-line-soft disabled:text-muted disabled:cursor-not-allowed"
        >
          <Minus className="h-4 w-4" aria-hidden="true" />
        </button>
        <div
          aria-live="polite"
          className="flex h-[44px] min-w-[48px] items-center justify-center border-l-base border-r-base px-3 font-semibold tabular-nums text-ink select-none"
        >
          {value}
        </div>
        <button
          type="button"
          onClick={() => !atMax && onChange(value + 1)}
          disabled={atMax}
          aria-label={idMessages.product.increaseQty}
          className="flex h-[44px] w-[44px] items-center justify-center text-ink hover:bg-page disabled:bg-line-soft disabled:text-muted disabled:cursor-not-allowed"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      {showMaxHint && atMax && max > 0 && (
        <span className="type-small text-muted">
          {idMessages.product.maxStockReached}
        </span>
      )}
    </div>
  );
}

