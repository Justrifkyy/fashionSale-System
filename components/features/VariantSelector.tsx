"use client";

import React from "react";
import { Check } from "lucide-react";
import { ProductVariant } from "@/lib/types/domain";
import { formatMessage, idMessages } from "@/lib/i18n";
import { cn } from "@/lib/utils/cn";

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariantId: string;
  onSelectVariant: (variant: ProductVariant) => void;
  lowStockThreshold?: number;
}

/**
 * Size & Color selector (DESIGN.md Section 9):
 * - Size: 48x48 square chips, 2px ink border; selected = ink bg + white text;
 *   out of stock = muted text + diagonal line + accessible "Habis" label, focusable
 * - Color: 40x40 square swatch, 2px border; selected = 3px border + checkmark; color name below
 * - Low stock hint ("Stok tinggal 3") when selected variant stock is > 0 and <= threshold
 */
export function VariantSelector({
  variants,
  selectedVariantId,
  onSelectVariant,
  lowStockThreshold = 5,
}: VariantSelectorProps) {
  const activeVariants = variants.filter((v) => v.isActive);
  const selected =
    activeVariants.find((v) => v.id === selectedVariantId) ?? activeVariants[0];

  const uniqueColors = Array.from(
    new Map(
      activeVariants.map((v) => [v.color, { color: v.color, hex: v.colorHex }])
    ).values()
  );

  const selectedColor = selected?.color ?? uniqueColors[0]?.color ?? "";
  const sizesForColor = activeVariants.filter((v) => v.color === selectedColor);

  const handleSelectColor = (colorName: string) => {
    const matchSameSize = activeVariants.find(
      (v) => v.color === colorName && v.size === selected?.size && v.stock > 0
    );
    const firstAvailable = activeVariants.find(
      (v) => v.color === colorName && v.stock > 0
    );
    const fallback = activeVariants.find((v) => v.color === colorName);
    const next = matchSameSize ?? firstAvailable ?? fallback;
    if (next) onSelectVariant(next);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Color selector */}
      {uniqueColors.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-[14px] font-semibold text-ink">
            {idMessages.product.colorLabel}:{" "}
            <span className="font-normal text-muted">{selectedColor}</span>
          </span>
          <div className="flex flex-wrap gap-2.5">
            {uniqueColors.map((c) => {
              const isSelected = c.color === selectedColor;
              const isLight =
                c.hex.toUpperCase() === "#FFFFFF" ||
                c.hex.toUpperCase() === "#F3F3F8";
              return (
                <button
                  key={c.color}
                  type="button"
                  onClick={() => handleSelectColor(c.color)}
                  aria-label={`${idMessages.product.colorLabel} ${c.color}`}
                  aria-pressed={isSelected}
                  style={{ backgroundColor: c.hex }}
                  className={cn(
                    "flex h-[44px] w-[44px] items-center justify-center",
                    isSelected ? "border-strong" : "border-base"
                  )}
                >
                  {isSelected && (
                    <Check
                      aria-hidden="true"
                      className={cn(
                        "h-5 w-5",
                        isLight ? "text-ink" : "text-surface"
                      )}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Size selector */}
      <div className="flex flex-col gap-2">
        <span className="text-[14px] font-semibold text-ink">
          {idMessages.product.sizeLabel}
        </span>
        <div className="flex flex-wrap gap-2.5" role="radiogroup" aria-label={idMessages.product.sizeLabel}>
          {sizesForColor.map((variant) => {
            const isSelected = variant.id === selected?.id;
            const isOut = variant.stock <= 0;
            const ariaText = isOut
              ? `${variant.size} (${idMessages.product.sizeSoldOutSuffix})`
              : variant.size;

            return (
              <button
                key={variant.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                aria-disabled={isOut}
                aria-label={ariaText}
                onClick={() => {
                  if (!isOut) {
                    onSelectVariant(variant);
                  }
                }}
                className={cn(
                  "relative flex h-[48px] min-w-[48px] items-center justify-center px-3.5 text-[16px] font-semibold tabular-nums",
                  isOut
                    ? "border-base bg-surface text-muted chip-diagonal-slash cursor-not-allowed"
                    : isSelected
                      ? "border-base bg-ink text-surface"
                      : "border-base bg-surface text-ink hover:bg-page"
                )}
              >
                {variant.size}
              </button>
            );
          })}
        </div>

        {/* Low stock hint */}
        {selected &&
          selected.stock > 0 &&
          selected.stock <= lowStockThreshold && (
            <p className="type-small font-semibold text-brick-deep">
              {formatMessage(idMessages.product.lowStockHint, {
                count: selected.stock,
              })}
            </p>
          )}
      </div>
    </div>
  );
}

