"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Drawer } from "@/components/ui/Overlay";
import { Button, ButtonLink } from "@/components/ui/Button";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { PriceTag } from "@/components/ui/PriceTag";
import { VariantSelector } from "@/components/features/VariantSelector";
import { useStore } from "@/components/providers/StoreProvider";
import { idMessages } from "@/lib/i18n";
import { formatRupiah } from "@/lib/utils/money";

export function CartDrawer() {
  const {
    cartItems,
    cartSubtotal,
    isCartDrawerOpen,
    closeCartDrawer,
    updateCartQuantity,
    removeFromCart,
    quickAddProduct,
    closeQuickAdd,
    addToCart,
  } = useStore();

  const [pickedVariantId, setPickedVariantId] = useState<string>("");

  const defaultQuickVariant =
    quickAddProduct?.variants.find((v) => v.isActive && v.stock > 0) ??
    quickAddProduct?.variants[0];

  const selectedQuickVariant =
    quickAddProduct?.variants.find((v) => v.id === pickedVariantId) ??
    defaultQuickVariant;

  return (
    <>
      {/* Main Cart Drawer */}
      <Drawer
        isOpen={isCartDrawerOpen}
        onClose={closeCartDrawer}
        title={idMessages.cart.drawerTitle}
        side="responsive"
        footer={
          cartItems.length > 0 ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-baseline justify-between">
                <span className="type-body font-semibold text-ink">
                  {idMessages.cart.subtotal}
                </span>
                <span className="text-[20px] font-bold tabular-nums text-ink">
                  {formatRupiah(cartSubtotal)}
                </span>
              </div>
              <p className="type-small text-muted">
                {idMessages.cart.shippingNote}
              </p>
              <div className="flex flex-col gap-2.5 pt-1">
                <span onClick={closeCartDrawer}>
                  <ButtonLink href="/checkout" variant="primary" fullWidth>
                    {idMessages.cart.checkoutCta}
                  </ButtonLink>
                </span>
                <span onClick={closeCartDrawer}>
                  <ButtonLink href="/cart" variant="secondary" fullWidth>
                    {idMessages.cart.openCartPage}
                  </ButtonLink>
                </span>
              </div>
            </div>
          ) : undefined
        }
      >
        {cartItems.length === 0 ? (
          <div className="woven-motif border-base p-5">
            <div className="border-base bg-surface p-5 text-center flex flex-col items-center gap-3">
              <p className="type-h4 text-ink">{idMessages.cart.emptyTitle}</p>
              <p className="type-small text-muted">
                {idMessages.cart.emptyBody}
              </p>
              <span onClick={closeCartDrawer} className="pt-1">
                <ButtonLink href="/products" variant="primary">
                  {idMessages.cart.emptyAction}
                </ButtonLink>
              </span>
            </div>
          </div>
        ) : (
          <ul className="divide-y divide-line-soft">
            {cartItems.map((item) => (
              <li
                key={item.variantId}
                className="flex gap-3.5 py-4 first:pt-0 last:pb-0"
              >
                <div
                  style={{ backgroundColor: item.swatchHex }}
                  className="relative h-20 w-16 shrink-0 overflow-hidden border-base bg-photo"
                >
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.productName}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col gap-2 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`/products/${item.productSlug}`}
                      onClick={closeCartDrawer}
                      className="font-semibold text-ink hover:text-brick-deep line-clamp-2"
                    >
                      {item.productName}
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.variantId)}
                      aria-label={idMessages.cart.remove}
                      className="flex h-9 w-9 shrink-0 items-center justify-center text-muted hover:text-danger"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                  <p className="type-small text-muted">
                    {item.color}, {idMessages.product.sizeLabel} {item.size}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <QuantityStepper
                      value={item.quantity}
                      max={item.maxStock}
                      onChange={(q) => updateCartQuantity(item.variantId, q)}
                    />
                    <span className="font-bold tabular-nums text-ink">
                      {formatRupiah(item.unitPrice * item.quantity)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Drawer>

      {/* Quick-Add Variant Selector Drawer (never adds random size per DESIGN.md Section 9) */}
      <Drawer
        isOpen={Boolean(quickAddProduct)}
        onClose={closeQuickAdd}
        title={idMessages.product.selectSizeTitle}
        side="responsive"
        footer={
          quickAddProduct && selectedQuickVariant ? (
            <Button
              variant="primary"
              fullWidth
              disabled={selectedQuickVariant.stock <= 0}
              onClick={() => {
                addToCart(quickAddProduct, selectedQuickVariant, 1);
                closeQuickAdd();
              }}
            >
              {idMessages.product.addToCart}
            </Button>
          ) : undefined
        }
      >
        {quickAddProduct && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1 border-b border-line-soft pb-4">
              <h3 className="type-h4 text-ink">{quickAddProduct.name}</h3>
              {selectedQuickVariant && (
                <PriceTag
                  price={selectedQuickVariant.price}
                  compareAtPrice={selectedQuickVariant.compareAtPrice}
                />
              )}
            </div>
            <VariantSelector
              variants={quickAddProduct.variants}
              selectedVariantId={selectedQuickVariant?.id ?? ""}
              onSelectVariant={(v) => setPickedVariantId(v.id)}
            />
          </div>
        )}
      </Drawer>
    </>
  );
}
