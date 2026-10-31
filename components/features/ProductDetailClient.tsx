"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  getProductTotalStock,
  Product,
  ProductVariant,
  resolveProductBadge,
  SizeGuideRow,
} from "@/lib/types/domain";
import { GarmentPhoto } from "@/components/features/GarmentPhoto";
import { VariantSelector } from "@/components/features/VariantSelector";
import { Sticker } from "@/components/ui/Sticker";
import { PriceTag } from "@/components/ui/PriceTag";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Disclosure";
import { Drawer } from "@/components/ui/Overlay";
import { useStore } from "@/components/providers/StoreProvider";
import { formatMessage, idMessages } from "@/lib/i18n";
import { cn } from "@/lib/utils/cn";

interface ProductDetailClientProps {
  product: Product;
  sizeGuideRows: SizeGuideRow[];
}

export function ProductDetailClient({
  product,
  sizeGuideRows,
}: ProductDetailClientProps) {
  const { addToCart, wishlistIds, toggleWishlist } = useStore();

  const activeVariants = product.variants.filter((v) => v.isActive);
  const initialVariant =
    activeVariants.find((v) => v.stock > 0) ?? activeVariants[0];

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    initialVariant
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const totalStock = getProductTotalStock(product);
  const isProductSoldOut = totalStock <= 0;
  const isVariantSoldOut = !selectedVariant || selectedVariant.stock <= 0;
  const badge = resolveProductBadge(product);
  const isWishlisted = wishlistIds.includes(product.id);

  const currentImage =
    product.images[selectedImageIndex] ?? product.images[0];

  const handleSelectVariant = (next: ProductVariant) => {
    setSelectedVariant(next);
    setQuantity((prev) => Math.min(Math.max(1, prev), Math.max(1, next.stock)));
  };

  const handleAddToCart = () => {
    if (!selectedVariant || selectedVariant.stock <= 0) return;
    addToCart(product, selectedVariant, quantity);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        {/* Left: Gallery with vertical thumbnails on desktop */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          {product.images.length > 1 && (
            <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:w-20 shrink-0">
              {product.images.map((img, idx) => {
                const active = idx === selectedImageIndex;
                return (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    aria-label={img.alt}
                    aria-pressed={active}
                    className={cn(
                      "w-16 sm:w-20 shrink-0 bg-photo p-1 transition-all",
                      active
                        ? "border-strong scale-105"
                        : "border-base opacity-75 hover:opacity-100"
                    )}
                  >
                    <div
                      style={{ backgroundColor: img.swatchHex }}
                      className="relative aspect-[4/5] w-full overflow-hidden border border-ink"
                    >
                      {img.url ? (
                        <Image
                          src={img.url}
                          alt={img.alt}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Main 4:5 Photo Frame with Sticker + Wishlist Dog-Ear */}
          <div className="relative flex-1 border-base bg-page">
            <GarmentPhoto
              url={currentImage?.url ?? null}
              alt={currentImage?.alt ?? product.name}
              swatchHex={
                currentImage?.swatchHex ?? selectedVariant?.colorHex ?? "#2D2D56"
              }
              categoryName={product.categoryName}
              frameLabel={currentImage?.label}
              isSoldOut={isProductSoldOut}
              isFoldedWishlist={isWishlisted}
              priority
            />

            {badge && (
              <div className="pointer-events-none absolute top-3 left-3 z-10">
                <Sticker badge={badge} tilt="left" />
              </div>
            )}

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
                  className="m-2.5 flex h-8 w-8 items-center justify-center border-base bg-surface text-ink hover:bg-page"
                >
                  <svg
                    width="18"
                    height="18"
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
        </div>

        {/* Right: Sticky Purchase Info Panel */}
        <div className="lg:col-span-5 lg:sticky lg:top-[88px] border-base bg-surface p-5 sm:p-7 flex flex-col gap-6">
          <div className="flex flex-col gap-2 border-b border-line-soft pb-5">
            <h1 className="type-h2 text-ink">{product.name}</h1>
            <PriceTag
              price={selectedVariant?.price ?? 0}
              compareAtPrice={selectedVariant?.compareAtPrice}
              size="lg"
            />
          </div>

          <VariantSelector
            variants={product.variants}
            selectedVariantId={selectedVariant?.id ?? ""}
            onSelectVariant={handleSelectVariant}
          />

          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-[14px] font-semibold text-ink">
                {idMessages.product.quantityLabel}
              </span>
              <QuantityStepper
                value={quantity}
                max={Math.max(1, selectedVariant?.stock ?? 1)}
                onChange={setQuantity}
              />
            </div>

            <Button
              variant="text"
              onClick={() => setIsSizeGuideOpen(true)}
              className="type-small"
            >
              {idMessages.product.sizeGuideTrigger}
            </Button>
          </div>

          {/* Low stock caution banner */}
          {selectedVariant && selectedVariant.stock > 0 && selectedVariant.stock <= 5 && (
            <div className="border-base bg-gold/30 p-2.5 flex items-center gap-2 text-[12px] font-bold text-ink">
              <span className="h-2 w-2 bg-brick border border-ink animate-ping" />
              <span>⚠️ STOK TERBATAS: TERSISA {selectedVariant.stock} PCS DI GUDANG MAKASSAR</span>
            </div>
          )}

          {/* Desktop Primary CTA (hidden on < sm where sticky bottom bar renders, keeping strictly 1 primary CTA visible) */}
          <div className="hidden sm:block pt-1">
            <Button
              variant="primary"
              fullWidth
              disabled={isProductSoldOut || isVariantSoldOut}
              onClick={handleAddToCart}
            >
              {isProductSoldOut || isVariantSoldOut
                ? idMessages.product.outOfStock
                : idMessages.product.addToCart}
            </Button>
          </div>

          {/* SKU & Shipping weight transparency */}
          {selectedVariant && (
            <dl className="grid grid-cols-2 gap-2 border-t border-line-soft pt-4 type-small">
              <div>
                <dt className="text-muted">{idMessages.product.skuLabel}</dt>
                <dd className="font-semibold tabular-nums text-ink">
                  {selectedVariant.sku}
                </dd>
              </div>
              <div>
                <dt className="text-muted">{idMessages.product.weightLabel}</dt>
                <dd className="font-semibold tabular-nums text-ink">
                  {selectedVariant.weightGram} gram
                </dd>
              </div>
            </dl>
          )}

          {/* Product Details Accordion */}
          <Accordion
            sections={[
              {
                id: "desc",
                title: idMessages.product.accordionDescription,
                defaultOpen: true,
                content: (
                  <div className="flex flex-col gap-2">
                    <p>{product.description}</p>
                    <p className="font-medium text-ink">
                      {product.materialNote}
                    </p>
                  </div>
                ),
              },
              {
                id: "size",
                title: idMessages.product.accordionSizeGuide,
                content: (
                  <div className="flex flex-col items-start gap-2">
                    <p>{idMessages.info.sizeGuideIntro}</p>
                    <Button
                      variant="text"
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="type-small"
                    >
                      {idMessages.product.sizeGuideTrigger}
                    </Button>
                  </div>
                ),
              },
              {
                id: "shipping",
                title: idMessages.product.accordionShippingReturns,
                content: <p>{idMessages.product.shippingReturnsBody}</p>,
              },
            ]}
          />
        </div>
      </div>

      {/* Mobile Sticky Bottom Add-to-Cart Bar (DESIGN.md Section 6 & 10) */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t-strong bg-surface p-3 sm:hidden">
        <Button
          variant="primary"
          fullWidth
          disabled={isProductSoldOut || isVariantSoldOut}
          onClick={handleAddToCart}
        >
          {isProductSoldOut || isVariantSoldOut
            ? idMessages.product.outOfStock
            : idMessages.product.addToCart}
        </Button>
      </div>

      {/* Size Guide Drawer (opens without leaving PDP per DESIGN.md Section 10) */}
      <Drawer
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        title={idMessages.info.sizeGuideHeading}
        side="responsive"
      >
        <div className="flex flex-col gap-4">
          <p className="type-small text-muted">
            {idMessages.info.sizeGuideIntro}
          </p>
          <div className="overflow-x-auto border-base">
            <table className="w-full text-left type-small">
              <thead className="bg-ink text-surface">
                <tr>
                  <th className="px-3.5 py-2.5 font-semibold">
                    {idMessages.info.colSize}
                  </th>
                  <th className="px-3.5 py-2.5 font-semibold text-right">
                    {idMessages.info.colChest}
                  </th>
                  <th className="px-3.5 py-2.5 font-semibold text-right">
                    {idMessages.info.colLength}
                  </th>
                  <th className="px-3.5 py-2.5 font-semibold text-right">
                    {idMessages.info.colShoulder}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line-soft bg-surface">
                {sizeGuideRows.map((row) => (
                  <tr key={row.size}>
                    <td className="px-3.5 py-2.5 font-bold">{row.size}</td>
                    <td className="px-3.5 py-2.5 text-right tabular-nums">
                      {row.chestCm}
                    </td>
                    <td className="px-3.5 py-2.5 text-right tabular-nums">
                      {row.lengthCm}
                    </td>
                    <td className="px-3.5 py-2.5 text-right tabular-nums">
                      {row.shoulderCm}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Drawer>
    </>
  );
}
