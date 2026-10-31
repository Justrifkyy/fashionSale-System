import React from "react";
import { AdminSettingsClient } from "@/components/features/AdminSettingsClient";

export function generateStaticParams() {
  return [
    { tab: "store" },
    { tab: "shipping" },
    { tab: "payment" },
    { tab: "tax" },
    { tab: "returns" },
  ];
}

/**
 * Admin Settings Page (P-066)
 */
export default async function AdminSettingsPage({
  params,
}: {
  params: Promise<{ tab: string }>;
}) {
  const { tab } = await params;
  return <AdminSettingsClient activeTab={tab} />;
}

