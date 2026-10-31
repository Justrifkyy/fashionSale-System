import React from "react";
import Link from "next/link";
import { StatusPill } from "@/components/ui/StatusPill";
import { ButtonLink } from "@/components/ui/Button";
import {
  listLowStockVariants,
  listOrders,
} from "@/lib/services/catalogService";
import { formatRupiah } from "@/lib/utils/money";
import { idMessages } from "@/lib/i18n";

const WEEKLY_SALES = [
  { day: "Jum", revenue: 1240000 },
  { day: "Sab", revenue: 2150000 },
  { day: "Min", revenue: 1890000 },
  { day: "Sen", revenue: 980000 },
  { day: "Sel", revenue: 1420000 },
  { day: "Rab", revenue: 1640000 },
  { day: "Kam", revenue: 2450000 },
];

/**
 * Admin Dashboard (P-050, DESIGN.md Section 6, 9 & 10):
 * - Calm and dense: zero stickers, zero chamfers, zero woven motif
 * - Shared-border KPI row
 * - Single-color (`brick`) sales bar chart
 * - Dense 14px tables with `ink` header, 1px `line-soft` dividers, right-aligned tabular numbers, no zebra stripes
 */
export default function AdminDashboardPage() {
  const orders = listOrders();
  const lowStock = listLowStockVariants(5);
  const maxSales = Math.max(...WEEKLY_SALES.map((d) => d.revenue));
  const needsActionCount = orders.filter(
    (o) => o.status === "PROCESSING" || o.status === "PENDING_PAYMENT"
  ).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="type-h2 text-ink">
          {idMessages.admin.dashboardHeading}
        </h1>
        <ButtonLink href="/admin/products/new" variant="primary">
          {idMessages.admin.addProductCta}
        </ButtonLink>
      </div>

      {/* Shared-border KPI Lattice */}
      <section className="lattice-grid grid grid-cols-2 lg:grid-cols-4">
        <div className="lattice-cell p-4 flex flex-col gap-1">
          <span className="type-small text-muted">
            {idMessages.admin.kpiTodayRevenue}
          </span>
          <span className="text-[22px] font-bold tabular-nums text-ink">
            {formatRupiah(2450000)}
          </span>
        </div>
        <div className="lattice-cell p-4 flex flex-col gap-1">
          <span className="type-small text-muted">
            {idMessages.admin.kpiTodayOrders}
          </span>
          <span className="text-[22px] font-bold tabular-nums text-ink">8</span>
        </div>
        <div className="lattice-cell p-4 flex flex-col gap-1">
          <span className="type-small text-muted">
            {idMessages.admin.kpiNeedsAction}
          </span>
          <span className="text-[22px] font-bold tabular-nums text-brick-deep">
            {needsActionCount}
          </span>
        </div>
        <div className="lattice-cell p-4 flex flex-col gap-1">
          <span className="type-small text-muted">
            {idMessages.admin.kpiLowStock}
          </span>
          <span className="text-[22px] font-bold tabular-nums text-ink">
            {lowStock.length}
          </span>
        </div>
      </section>

      {/* Single-color `brick` 7-day sales chart */}
      <section className="border-base bg-surface p-5 flex flex-col gap-4">
        <h2 className="type-h4 text-ink">
          {idMessages.admin.salesChartHeading}
        </h2>
        <div className="grid grid-cols-7 items-end gap-2 sm:gap-4 h-40 pt-4 border-b border-line-soft pb-2">
          {WEEKLY_SALES.map((entry) => {
            const pct = Math.max(12, Math.round((entry.revenue / maxSales) * 100));
            return (
              <div
                key={entry.day}
                className="flex h-full flex-col items-center justify-end gap-2"
              >
                <div
                  style={{ height: `${pct}%` }}
                  title={`${entry.day}: ${formatRupiah(entry.revenue)}`}
                  className="w-full max-w-[48px] bg-brick border border-ink"
                />
                <span className="type-small font-semibold text-ink">
                  {entry.day}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Two Dense Admin Tables: Orders Needing Action & Low Stock Variants */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 items-start">
        <section className="border-base bg-surface flex flex-col">
          <div className="flex items-center justify-between border-b border-line-soft px-4 py-3">
            <h2 className="type-h4 text-ink">
              {idMessages.admin.ordersActionHeading}
            </h2>
            <Link
              href="/admin/orders"
              className="type-small font-semibold text-brick-deep underline decoration-2 underline-offset-4 hover:text-ink"
            >
              {idMessages.admin.navOrders}
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left type-small">
              <thead className="bg-ink text-surface">
                <tr>
                  <th className="px-3.5 py-2.5 font-semibold">
                    {idMessages.admin.colOrderNumber}
                  </th>
                  <th className="px-3.5 py-2.5 font-semibold">
                    {idMessages.admin.colCustomer}
                  </th>
                  <th className="px-3.5 py-2.5 font-semibold">
                    {idMessages.admin.colStatus}
                  </th>
                  <th className="px-3.5 py-2.5 font-semibold text-right">
                    {idMessages.admin.colTotal}
                  </th>
                  <th className="px-3.5 py-2.5 font-semibold text-right">
                    {idMessages.admin.colAction}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line-soft bg-surface">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-page">
                    <td className="px-3.5 py-2.5 font-bold tabular-nums text-ink whitespace-nowrap">
                      {order.orderNumber}
                    </td>
                    <td className="px-3.5 py-2.5 text-ink whitespace-nowrap">
                      {order.customerName}
                    </td>
                    <td className="px-3.5 py-2.5">
                      <StatusPill status={order.status} />
                    </td>
                    <td className="px-3.5 py-2.5 text-right font-semibold tabular-nums whitespace-nowrap">
                      {formatRupiah(order.grandTotal)}
                    </td>
                    <td className="px-3.5 py-2.5 text-right">
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
        </section>

        <section className="border-base bg-surface flex flex-col">
          <div className="flex items-center justify-between border-b border-line-soft px-4 py-3">
            <h2 className="type-h4 text-ink">
              {idMessages.admin.lowStockHeading}
            </h2>
            <Link
              href="/admin/products"
              className="type-small font-semibold text-brick-deep underline decoration-2 underline-offset-4 hover:text-ink"
            >
              {idMessages.admin.navProducts}
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left type-small">
              <thead className="bg-ink text-surface">
                <tr>
                  <th className="px-3.5 py-2.5 font-semibold">
                    {idMessages.admin.colProduct}
                  </th>
                  <th className="px-3.5 py-2.5 font-semibold">
                    {idMessages.admin.colSku}
                  </th>
                  <th className="px-3.5 py-2.5 font-semibold text-right">
                    {idMessages.admin.colStock}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line-soft bg-surface">
                {lowStock.map((v) => (
                  <tr key={v.variantId} className="hover:bg-page">
                    <td className="px-3.5 py-2.5 text-ink">
                      <span className="font-semibold">{v.productName}</span>
                      <span className="block text-muted">
                        {v.color}, {v.size}
                      </span>
                    </td>
                    <td className="px-3.5 py-2.5 tabular-nums text-muted whitespace-nowrap">
                      {v.sku}
                    </td>
                    <td className="px-3.5 py-2.5 text-right font-bold tabular-nums text-brick-deep">
                      {v.stock}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

