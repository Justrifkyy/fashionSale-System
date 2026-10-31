import React from "react";
import Link from "next/link";
import { StatusPill } from "@/components/ui/StatusPill";
import { ButtonLink } from "@/components/ui/Button";
import { listOrders } from "@/lib/services/catalogService";
import { formatRupiah } from "@/lib/utils/money";
import { idMessages } from "@/lib/i18n";

/**
 * Customer Order History (P-036)
 */
export default function AccountOrdersPage() {
  const orders = listOrders();

  return (
    <div className="flex flex-col gap-5">
      <h1 className="type-h2 text-ink">{idMessages.account.ordersHeading}</h1>

      <div className="flex flex-col gap-4">
        {orders.map((order, idx) => (
          <article
            key={order.id}
            className="border-base bg-surface p-5 flex flex-col gap-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line-soft pb-3">
              <div className="flex flex-col">
                <Link
                  href={`/account/orders/${order.orderNumber}`}
                  className="font-bold tabular-nums text-ink hover:text-brick-deep"
                >
                  {order.orderNumber}
                </Link>
                <span className="type-small text-muted">
                  {order.courierLabel}
                </span>
              </div>
              <StatusPill status={order.status} />
            </div>

            <ul className="flex flex-col gap-2">
              {order.items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-3 type-small"
                >
                  <span className="text-ink">
                    {item.productNameSnapshot} ({item.quantity}x{" "}
                    {item.variantLabelSnapshot})
                  </span>
                  <span className="font-semibold tabular-nums text-ink">
                    {formatRupiah(item.lineTotal)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line-soft pt-3">
              <div>
                <span className="type-small text-muted">
                  {idMessages.checkout.grandTotal}:{" "}
                </span>
                <span className="font-bold tabular-nums text-ink">
                  {formatRupiah(order.grandTotal)}
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {order.status === "PENDING_PAYMENT" && idx === 2 ? (
                  <ButtonLink
                    href={`/checkout/payment/${order.orderNumber}`}
                    variant="primary"
                  >
                    {idMessages.checkout.payNowCta}
                  </ButtonLink>
                ) : (
                  <ButtonLink
                    href={`/account/orders/${order.orderNumber}`}
                    variant="secondary"
                  >
                    {idMessages.payment.viewOrderDetail}
                  </ButtonLink>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

