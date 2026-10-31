import React from "react";
import { StatusPill } from "@/components/ui/StatusPill";
import { CopyWaybillButton } from "@/components/features/CopyWaybillButton";
import { getOrderByNumber, listOrders } from "@/lib/services/catalogService";
import { idMessages } from "@/lib/i18n";
import { cn } from "@/lib/utils/cn";

export function generateStaticParams() {
  return listOrders().map((o) => ({ orderNumber: o.orderNumber }));
}

/**
 * Order Tracking Timeline Page (P-038, DESIGN.md Section 9):
 * - Vertical 2px `ink` line
 * - Each event is a 12px square on the line: newest at top filled `brick`, older filled `ink`
 * - Waybill number (`Nomor resi`) with copy button
 */
export default async function OrderTrackingPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;
  const order = getOrderByNumber(orderNumber);
  const waybill = order.waybillId ?? "JNE88291044712";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="type-h2 text-ink">
            {idMessages.account.trackingHeading}
          </h1>
          <p className="font-bold tabular-nums text-muted mt-1">
            {order.orderNumber}
          </p>
        </div>
        <StatusPill status={order.status} />
      </div>

      {/* Courier & Waybill (`Nomor resi`) */}
      <section className="border-base bg-surface p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="type-small text-muted">
            {idMessages.account.courierLabel}: {order.courierLabel}
          </span>
          <span className="type-small text-muted">
            {idMessages.account.waybillLabel}
          </span>
          <p className="text-[20px] font-bold tabular-nums text-ink">
            {waybill}
          </p>
        </div>
        <CopyWaybillButton waybill={waybill} />
      </section>

      {/* Vertical 2px ink timeline with 12px square markers */}
      <section className="border-base bg-surface p-6">
        <h2 className="type-h4 text-ink mb-6">
          {idMessages.account.timelineHeading}
        </h2>

        <ol className="relative ml-2 border-l-base pl-6 flex flex-col gap-6">
          {order.timeline.map((event, idx) => {
            const isLatest = idx === 0;
            return (
              <li key={event.id} className="relative flex flex-col gap-1">
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -left-[31px] top-1.5 h-[12px] w-[12px] border border-ink",
                    isLatest ? "bg-brick" : "bg-ink"
                  )}
                />
                <span className="type-small tabular-nums text-muted">
                  {event.occurredAt}
                </span>
                <p className="font-bold text-ink">{event.status}</p>
                <p className="type-small text-muted">{event.note}</p>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}

