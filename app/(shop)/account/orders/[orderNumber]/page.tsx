import React from "react";
import { StatusPill } from "@/components/ui/StatusPill";
import { ButtonLink } from "@/components/ui/Button";
import { getOrderByNumber, listOrders } from "@/lib/services/catalogService";
import { formatRupiah } from "@/lib/utils/money";
import { idMessages } from "@/lib/i18n";

export function generateStaticParams() {
  return listOrders().map((o) => ({ orderNumber: o.orderNumber }));
}

/**
 * Order Detail Page (P-037)
 */
export default async function AccountOrderDetailPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;
  const order = getOrderByNumber(orderNumber);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="type-h2 text-ink">
            {idMessages.account.orderDetailHeading}
          </h1>
          <p className="font-bold tabular-nums text-muted mt-1">
            {order.orderNumber}
          </p>
        </div>
        <StatusPill status={order.status} />
      </div>

      {/* Snapshot Items */}
      <section className="border-base bg-surface p-5 flex flex-col gap-4">
        <ul className="divide-y divide-line-soft">
          {order.items.map((item) => (
            <li
              key={item.id}
              className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0"
            >
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  style={{ backgroundColor: item.swatchHex }}
                  className="h-14 w-12 shrink-0 border-base"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-ink">
                    {item.productNameSnapshot}
                  </span>
                  <span className="type-small text-muted">
                    {item.variantLabelSnapshot} ({item.quantity}x)
                  </span>
                  <span className="type-small tabular-nums text-muted">
                    SKU: {item.skuSnapshot}
                  </span>
                </div>
              </div>
              <span className="font-bold tabular-nums text-ink">
                {formatRupiah(item.lineTotal)}
              </span>
            </li>
          ))}
        </ul>

        {/* Ledger Cost Breakdown */}
        <dl className="flex flex-col gap-2 border-t border-line-soft pt-4 type-small">
          <div className="flex justify-between">
            <dt className="text-muted">{idMessages.checkout.subtotal}</dt>
            <dd className="font-semibold tabular-nums">
              {formatRupiah(order.subtotal)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">{idMessages.checkout.shippingCost}</dt>
            <dd className="font-semibold tabular-nums">
              {formatRupiah(order.shippingCost)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">{idMessages.checkout.paymentFee}</dt>
            <dd className="font-semibold tabular-nums">
              {formatRupiah(order.paymentFee)}
            </dd>
          </div>
          <div className="flex justify-between border-t border-line-soft pt-2.5 text-[16px]">
            <dt className="font-bold text-ink">
              {idMessages.checkout.grandTotal}
            </dt>
            <dd className="font-bold tabular-nums text-ink">
              {formatRupiah(order.grandTotal)}
            </dd>
          </div>
        </dl>
      </section>

      {/* Shipping Address & Actions */}
      <section className="border-base bg-surface p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1 type-small">
          <span className="font-bold text-ink">{order.customerName}</span>
          <span className="tabular-nums text-muted">{order.customerPhone}</span>
          <span>{order.addressLine}</span>
          <span>
            {order.districtCityProvince} {order.postalCode}
          </span>
        </div>

        <div className="flex flex-wrap gap-3">
          {order.status === "PENDING_PAYMENT" ? (
            <ButtonLink
              href={`/checkout/payment/${order.orderNumber}`}
              variant="primary"
            >
              {idMessages.checkout.payNowCta}
            </ButtonLink>
          ) : (
            <ButtonLink
              href={`/account/orders/${order.orderNumber}/tracking`}
              variant="primary"
            >
              {idMessages.account.trackOrderCta}
            </ButtonLink>
          )}
        </div>
      </section>
    </div>
  );
}

