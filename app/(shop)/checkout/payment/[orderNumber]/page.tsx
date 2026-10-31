import React from "react";
import { PaymentViewClient } from "@/components/features/PaymentViewClient";
import { getOrderByNumber, listOrders } from "@/lib/services/catalogService";

export function generateStaticParams() {
  return listOrders().map((o) => ({ orderNumber: o.orderNumber }));
}

export default async function PaymentPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;
  const order = getOrderByNumber(orderNumber);

  return (
    <div className="mx-auto max-w-[1360px] px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
      <PaymentViewClient order={order} />
    </div>
  );
}

