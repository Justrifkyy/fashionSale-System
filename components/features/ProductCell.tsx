"use client";

import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import {
  getProductDisplayPrice,
  getProductTotalStock,
  Product,
  resolveProductBadge,
} from "@/lib/types/domain";
import { formatMessage, idMessages } from "@/lib/i18n";
import { Sticker } from "@/components/ui/Sticker";
import { PriceTag } from "@/components/ui/PriceTag";
import { Button } from "@/components/ui/Button";
import { GarmentPhoto } from "@/components/features/GarmentPhoto";
import { useStore } from "@/components/providers/StoreProvider";
import { cn } from "@/lib/utils/cn";

interface ProductCellProps {
  product: Product;
  featured2x2?: boolean;
  index?: number;
}

/**
 * Shared-border lattice product cell (DESIGN.md Section 5, 6 & 9):
 * - Shares 2px ink borders via `.lattice-cell`, zero radius, zero card shadow
 * - Max 1 sticker per product; SOLD_OUT overrides all
 * - Top-right folded corner (dog-ear) for wishlist with 44x44px touch target
 * - Desktop: full-width secondary "Tambah cepat" button
 * - Mobile: 44x44 square icon button at bottom-right
 * - Multi-variant quick-add opens size drawer instead of picking a random variant
 */
export function ProductCell({
  product,
  featured2x2 = false,
  index = 0,
}: ProductCellProps) {
  const { addToCart, openQuickAdd, wishlistIds, toggleWishlist } = useStore();

  const totalStock = getProductTotalStock(product);
  const isSoldOut = totalStock <= 0;
  const badge = resolveProductBadge(product);
  const { price, compareAtPrice } = getProductDisplayPrice(product);
  const isWishlisted = wishlistIds.includes(product.id);

  const activeVariants = product.variants.filter((v) => v.isActive);
  const firstImage = product.images[0];
  const secondImage = product.images[1];
  const primaryColor = activeVariants[0]?.color ?? "";
  const variantCount = activeVariants.length;

  const variantSummary =
    variantCount <= 1
      ? formatMessage(idMessages.product.singleVariantSummary, {
          color: primaryColor,
        })
      : formatMessage(idMessages.product.sizesSummary, {
          color: primaryColor,
          count: variantCount,
        });

  const handleQuickAdd = () => {
    if (isSoldOut) return;
    if (activeVariants.length === 1 && activeVariants[0]) {
      addToCart(product, activeVariants[0], 1);
    } else {
      openQuickAdd(product);
    }
  };

  return (
    <article
      className={cn(
        "lattice-cell group relative flex flex-col justify-between transition-colors hover:bg-page/50",
        featured2x2 && "lg:col-span-2 lg:row-span-2"
      )}
    >
      {/* Image block */}
      <div className="relative border-b-base bg-page overflow-hidden">
        <Link
          href={`/products/${product.slug}`}
          className="block focus-visible:relative focus-visible:z-10"
        >
          <GarmentPhoto
            url={firstImage?.url ?? null}
            alt={firstImage?.alt ?? product.name}
            secondaryUrl={secondImage?.url ?? null}
            secondaryAlt={secondImage?.alt}
            swatchHex={
              firstImage?.swatchHex ?? activeVariants[0]?.colorHex ?? "#2D2D56"
            }
            categoryName={product.categoryName}
            frameLabel={firstImage?.label}
            isSoldOut={isSoldOut}
            isFoldedWishlist={isWishlisted}
            priority={index < 4}
          />
        </Link>

        {/* Single product sticker at top-left (max 1 per product) */}
        {badge && (
          <div className="pointer-events-none absolute top-2.5 left-2.5 z-10">
            <Sticker
              badge={badge}
              tilt={index % 2 === 0 ? "left" : "right"}
            />
          </div>
        )}

        {/* Wishlist dog-ear folded corner at top-right (44x44px touch target) */}
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-pressed={isWishlisted}
          aria-label={formatMessage(
            isWishlisted
              ? idMessages.product.wishlistRemoveAria
              : idMessages.product.wishlistAddAria,
            { name: product.name }
          )}
          className="absolute top-0 right-0 z-10 flex h-[44px] w-[44px] items-start justify-end"
        >
          {isWishlisted ? (
            <span aria-hidden="true" className="dog-ear-flap block" />
          ) : (
            <span
              aria-hidden="true"
              className="m-2 flex h-7 w-7 items-center justify-center border-base bg-surface text-ink hover:bg-page"
            >
              {/* Small corner fold outline icon (20px visual cue) */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 2H10L14 6V14H2V2Z"
                  stroke="currentColor"
                  strokeWidth="1.75"
                />
                <path
                  d="M10 2V6H14"
                  stroke="currentColor"
                  strokeWidth="1.75"
                />
              </svg>
            </span>
          )}
        </button>
      </div>

      {/* Product metadata & quick-add action */}
      <div className="flex flex-1 flex-col justify-between gap-3 p-3.5 sm:p-4 bg-surface">
        <div className="flex items-end justify-between gap-2">
          <div className="flex flex-col gap-1 min-w-0">
            <h3 className="type-h4 text-ink line-clamp-2">
              <Link
                href={`/products/${product.slug}`}
                className="transition-colors group-hover:text-brick-deep"
              >
                {product.name}
              </Link>
            </h3>
            <p className="type-small text-muted truncate">{variantSummary}</p>
            <PriceTag price={price} compareAtPrice={compareAtPrice} />
          </div>

          {/* Mobile 44x44 square quick-add icon button (DESIGN.md Section 9) */}
          {!isSoldOut && (
            <div className="sm:hidden shrink-0">
              <Button
                variant="secondary"
                squareIcon
                onClick={handleQuickAdd}
                aria-label={formatMessage(idMessages.product.quickAddAria, {
                  name: product.name,
                })}
              >
                <Plus className="h-5 w-5" aria-hidden="true" />
              </Button>
            </div>
          )}
        </div>

        {/* Sold-out mobile text or Desktop full-width secondary action */}
        {isSoldOut ? (
          <div className="flex min-h-[44px] w-full items-center justify-center border-base bg-line-soft px-4 type-small font-semibold text-muted select-none">
            {idMessages.product.outOfStock}
          </div>
        ) : (
          <div className="hidden sm:block">
            <Button variant="secondary" fullWidth onClick={handleQuickAdd}>
              {idMessages.product.quickAdd}
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}

