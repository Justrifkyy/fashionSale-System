import React from "react";
import Link from "next/link";
import { StatusPill } from "@/components/ui/StatusPill";
import { listOrders } from "@/lib/services/catalogService";
import { formatRupiah } from "@/lib/utils/money";
import { idMessages } from "@/lib/i18n";

/**
 * Admin Order Management List (P-054)
 */
export default function AdminOrdersPage() {
  const orders = listOrders();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="type-h2 text-ink">{idMessages.admin.ordersHeading}</h1>

      <div className="overflow-x-auto border-base bg-surface">
        <table className="w-full text-left type-small">
          <thead className="bg-ink text-surface">
            <tr>
              <th className="px-4 py-3 font-semibold">
                {idMessages.admin.colOrderNumber}
              </th>
              <th className="px-4 py-3 font-semibold">
                {idMessages.admin.colCustomer}
              </th>
              <th className="px-4 py-3 font-semibold">
                {idMessages.admin.colPayment}
              </th>
              <th className="px-4 py-3 font-semibold">
                {idMessages.admin.colCourier}
              </th>
              <th className="px-4 py-3 font-semibold">
                {idMessages.admin.colStatus}
              </th>
              <th className="px-4 py-3 font-semibold text-right">
                {idMessages.admin.colTotal}
              </th>
              <th className="px-4 py-3 font-semibold text-right">
                {idMessages.admin.colAction}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line-soft">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-page">
                <td className="px-4 py-3 font-bold tabular-nums text-ink whitespace-nowrap">
                  {order.orderNumber}
                </td>
                <td className="px-4 py-3 text-ink whitespace-nowrap">
                  {order.customerName}
                </td>
                <td className="px-4 py-3 text-muted whitespace-nowrap">
                  {order.paymentMethodLabel}
                </td>
                <td className="px-4 py-3 text-muted whitespace-nowrap">
                  {order.courierLabel}
                </td>
                <td className="px-4 py-3">
                  <StatusPill status={order.status} />
                </td>
                <td className="px-4 py-3 text-right font-bold tabular-nums text-ink whitespace-nowrap">
                  {formatRupiah(order.grandTotal)}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/orders/${order.orderNumber}`}
                    className="font-semibold text-brick-deep underline decoration-2 underline-offset-4 hover:text-ink"
                  >
                    {idMessages.admin.actionProcess}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
