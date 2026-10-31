"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useStore } from "@/components/providers/StoreProvider";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Breadcrumb } from "@/components/ui/Disclosure";
import { formatRupiah } from "@/lib/utils/money";
import { idMessages } from "@/lib/i18n";

/**
 * Full Cart Page (P-009, DESIGN.md Section 10):
 * - Table-like rows: swatch/photo, name, variant, stepper, price
 * - Summary ledger on the right with single primary CTA to Checkout
 */
export default function CartPage() {
  const { cartItems, cartSubtotal, updateCartQuantity, removeFromCart } =
    useStore();

  return (
    <div className="mx-auto max-w-[1360px] px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
      <Breadcrumb
        items={[
          { label: idMessages.catalog.breadcrumbHome, href: "/" },
          { label: idMessages.cart.heading },
        ]}
      />

      <h1 className="type-h1 text-ink mt-2 mb-6">{idMessages.cart.heading}</h1>

      {cartItems.length === 0 ? (
        <EmptyState
          title={idMessages.cart.emptyTitle}
          description={idMessages.cart.emptyBody}
          actionLabel={idMessages.cart.emptyAction}
          actionHref="/products"
        />
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Ledger-style item rows */}
          <div className="lg:col-span-8 border-base bg-surface">
            <ul className="divide-y divide-line-soft">
              {cartItems.map((item) => (
                <li
                  key={item.variantId}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5"
                >
                  <div className="flex items-start gap-4">
                    <div
                      style={{ backgroundColor: item.swatchHex }}
                      className="relative h-24 w-20 shrink-0 overflow-hidden border-base bg-photo"
                    >
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.productName}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="flex flex-col gap-1">
                      <Link
                        href={`/products/${item.productSlug}`}
                        className="type-h4 text-ink hover:text-brick-deep"
                      >
                        {item.productName}
                      </Link>
                      <p className="type-small text-muted">
                        {item.color}, {idMessages.product.sizeLabel} {item.size}
                      </p>
                      <p className="type-small font-semibold tabular-nums text-ink">
                        {formatRupiah(item.unitPrice)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-5">
                    <QuantityStepper
                      value={item.quantity}
                      max={item.maxStock}
                      onChange={(q) => updateCartQuantity(item.variantId, q)}
                    />

                    <div className="flex items-center gap-3">
                      <span className="min-w-[110px] text-right font-bold tabular-nums text-ink">
                        {formatRupiah(item.unitPrice * item.quantity)}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.variantId)}
                        aria-label={idMessages.cart.remove}
                        className="flex h-[44px] w-[44px] items-center justify-center border-base bg-surface text-ink hover:bg-page hover:text-danger"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Summary panel */}
          <aside className="lg:col-span-4 border-strong bg-surface p-6 flex flex-col gap-4">
            <h2 className="type-h3 text-ink">{idMessages.cart.summaryHeading}</h2>

            <div className="flex items-baseline justify-between border-t border-b border-line-soft py-4">
              <span className="type-body text-ink">
                {idMessages.cart.subtotal}
              </span>
              <span className="text-[22px] font-bold tabular-nums text-ink">
                {formatRupiah(cartSubtotal)}
              </span>
            </div>

            <p className="type-small text-muted">
              {idMessages.cart.shippingNote}
            </p>

            <div className="pt-2">
              <ButtonLink href="/checkout" variant="primary" fullWidth>
                {idMessages.cart.checkoutCta}
              </ButtonLink>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

