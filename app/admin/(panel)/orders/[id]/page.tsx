import React from "react";
import { StatusPill } from "@/components/ui/StatusPill";
import { Button, ButtonLink } from "@/components/ui/Button";
import { getOrderByNumber, listOrders } from "@/lib/services/catalogService";
import { formatRupiah } from "@/lib/utils/money";
import { idMessages } from "@/lib/i18n";

export function generateStaticParams() {
  return listOrders().map((o) => ({ id: o.orderNumber }));
}

/**
 * Admin Order Detail Page (P-055)
 */
export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = getOrderByNumber(id);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h1 className="type-h2 text-ink tabular-nums">{order.orderNumber}</h1>
          <StatusPill status={order.status} />
        </div>

        <div className="flex items-center gap-3">
          <ButtonLink href="/admin/orders" variant="secondary">
            {idMessages.admin.navOrders}
          </ButtonLink>
          {order.status === "PROCESSING" && (
            <Button variant="primary">{idMessages.admin.actionShip}</Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
        <section className="lg:col-span-8 border-base bg-surface flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left type-small">
              <thead className="bg-ink text-surface">
                <tr>
                  <th className="px-4 py-3 font-semibold">
                    {idMessages.admin.colOrderItem}
                  </th>
                  <th className="px-4 py-3 font-semibold">
                    {idMessages.admin.colSku}
                  </th>
                  <th className="px-4 py-3 font-semibold text-right">
                    {idMessages.admin.colQty}
                  </th>
                  <th className="px-4 py-3 font-semibold text-right">
                    {idMessages.admin.colSubtotal}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line-soft">
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3">
                      <span className="font-bold text-ink">
                        {item.productNameSnapshot}
                      </span>
                      <span className="block text-muted">
                        {item.variantLabelSnapshot}
                      </span>
                    </td>
                    <td className="px-4 py-3 tabular-nums text-muted">
                      {item.skuSnapshot}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {item.quantity}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold tabular-nums">
                      {formatRupiah(item.lineTotal)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <dl className="flex flex-col gap-2 border-t border-line-soft p-4 type-small">
            <div className="flex justify-between">
              <dt className="text-muted">{idMessages.checkout.subtotal}</dt>
              <dd className="tabular-nums font-semibold">
                {formatRupiah(order.subtotal)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">
                {idMessages.checkout.shippingCost} ({order.courierLabel})
              </dt>
              <dd className="tabular-nums font-semibold">
                {formatRupiah(order.shippingCost)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">
                {idMessages.checkout.paymentFee} ({order.paymentMethodLabel})
              </dt>
              <dd className="tabular-nums font-semibold">
                {formatRupiah(order.paymentFee)}
              </dd>
            </div>
            <div className="flex justify-between border-t border-line-soft pt-2 text-[16px]">
              <dt className="font-bold text-ink">
                {idMessages.checkout.grandTotal}
              </dt>
              <dd className="font-bold tabular-nums text-ink">
                {formatRupiah(order.grandTotal)}
              </dd>
            </div>
          </dl>
        </section>

        <aside className="lg:col-span-4 border-base bg-surface p-5 flex flex-col gap-3 type-small">
          <h2 className="type-h4 text-ink">
            {idMessages.admin.recipientHeading}
          </h2>
          <p className="font-bold text-ink">{order.customerName}</p>
          <p className="text-muted">{order.customerEmail}</p>
          <p className="tabular-nums text-muted">{order.customerPhone}</p>
          <p className="border-t border-line-soft pt-2">
            {order.addressLine}, {order.districtCityProvince} {order.postalCode}
          </p>
          {order.waybillId && (
            <p className="border-t border-line-soft pt-2 font-bold tabular-nums">
              {idMessages.account.waybillLabel}: {order.waybillId}
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
