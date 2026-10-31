import React from "react";
import { ButtonLink } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/StatusPill";
import { getOrderByNumber, listOrders } from "@/lib/services/catalogService";
import { formatRupiah } from "@/lib/utils/money";
import { idMessages } from "@/lib/i18n";

export function generateStaticParams() {
  return listOrders().map((o) => ({ orderNumber: o.orderNumber }));
}

/**
 * Payment Success Page (P-032, DESIGN.md Section 8):
 * - Approved location #4 for the South Sulawesi woven check band right below the heading!
 */
export default async function CheckoutSuccessPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;
  const order = getOrderByNumber(orderNumber);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:py-16">
      <div className="border-strong bg-surface p-6 sm:p-10 flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <StatusPill status="PROCESSING" className="w-fit" />
          <h1 className="type-h1 text-ink">
            {idMessages.checkoutSuccess.heading}
          </h1>
          {/* Approved location #4: 24px woven check band below payment success title */}
          <div aria-hidden="true" className="woven-band-footer w-full border-base" />
        </div>

        <p className="type-body text-ink max-w-[60ch]">
          {idMessages.checkoutSuccess.body}
        </p>

        <dl className="border-base bg-page p-4 flex flex-col gap-2 type-small">
          <div className="flex justify-between">
            <dt className="text-muted">{idMessages.payment.orderNumberLabel}</dt>
            <dd className="font-bold tabular-nums text-ink">
              {order.orderNumber}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">{idMessages.payment.methodLabel}</dt>
            <dd className="font-semibold text-ink">
              {order.paymentMethodLabel}
            </dd>
          </div>
          <div className="flex justify-between border-t border-line-soft pt-2">
            <dt className="font-semibold text-ink">
              {idMessages.checkout.grandTotal}
            </dt>
            <dd className="font-bold tabular-nums text-ink">
              {formatRupiah(order.grandTotal)}
            </dd>
          </div>
        </dl>

        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <ButtonLink
            href={`/account/orders/${order.orderNumber}`}
            variant="primary"
          >
            {idMessages.checkoutSuccess.trackAction}
          </ButtonLink>
          <ButtonLink href="/" variant="secondary">
            {idMessages.checkoutSuccess.continueShopping}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

