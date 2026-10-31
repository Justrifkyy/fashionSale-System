"use client";

import React from "react";
import Link from "next/link";
import { CheckboxField, InputField } from "@/components/ui/FormFields";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/components/providers/StoreProvider";
import { idMessages } from "@/lib/i18n";
import { cn } from "@/lib/utils/cn";

const TABS = [
  { id: "store", label: idMessages.admin.tabStore },
  { id: "shipping", label: idMessages.admin.tabShipping },
  { id: "payment", label: idMessages.admin.tabPayment },
  { id: "tax", label: idMessages.admin.tabTax },
  { id: "returns", label: idMessages.admin.tabReturns },
];

export function AdminSettingsClient({ activeTab }: { activeTab: string }) {
  const { showToast } = useStore();

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <h1 className="type-h2 text-ink">{idMessages.admin.settingsHeading}</h1>

      <nav
        aria-label="Tab pengaturan"
        className="flex flex-wrap border-base bg-surface"
      >
        {TABS.map((t) => {
          const isCurrent = t.id === activeTab;
          return (
            <Link
              key={t.id}
              href={`/admin/settings/${t.id}`}
              className={cn(
                "flex min-h-[44px] items-center px-4 type-small font-semibold border-r border-line-soft last:border-r-0",
                isCurrent
                  ? "bg-ink text-surface"
                  : "bg-surface text-ink hover:bg-page"
              )}
            >
              {t.label}
            </Link>
          );
        })}
      </nav>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          showToast(idMessages.admin.settingsSavedToast, "success");
        }}
        className="border-base bg-surface p-5 sm:p-6 flex flex-col gap-4"
      >
        {activeTab === "shipping" ? (
          <>
            <InputField
              label={idMessages.admin.settingOriginPostal}
              defaultValue="90111"
              required
            />
            <InputField
              label={idMessages.admin.settingPackagingWeight}
              type="number"
              defaultValue={100}
              required
            />
            <InputField
              label={idMessages.admin.settingMinWeight}
              type="number"
              defaultValue={1000}
              required
            />
          </>
        ) : activeTab === "payment" ? (
          <>
            <InputField
              label={idMessages.admin.settingPaymentWindow}
              type="number"
              defaultValue={15}
              required
            />
            <InputField
              label={idMessages.admin.settingVaFee}
              type="number"
              defaultValue={4000}
              required
            />
            <InputField
              label={idMessages.admin.settingQrisFee}
              defaultValue="0.7"
              required
            />
          </>
        ) : activeTab === "tax" ? (
          <>
            <CheckboxField
              label={idMessages.admin.settingEnableTax}
              defaultChecked={false}
            />
            <InputField
              label={idMessages.admin.settingTaxRate}
              type="number"
              defaultValue={11}
            />
          </>
        ) : activeTab === "returns" ? (
          <>
            <InputField
              label={idMessages.admin.settingReturnWindow}
              type="number"
              defaultValue={7}
              required
            />
          </>
        ) : (
          <>
            <InputField
              label={idMessages.admin.settingStoreName}
              defaultValue={idMessages.common.brand}
              required
            />
            <InputField
              label={idMessages.admin.settingSupportEmail}
              type="email"
              defaultValue={idMessages.info.storeEmail}
              required
            />
            <InputField
              label={idMessages.admin.settingTimezone}
              defaultValue="Asia/Makassar"
              required
            />
            <InputField
              label={idMessages.admin.settingLowStockThreshold}
              type="number"
              defaultValue={5}
              required
            />
          </>
        )}

        <div className="pt-2">
          <Button type="submit" variant="primary">
            {idMessages.admin.saveSettingsCta}
          </Button>
        </div>
      </form>
    </div>
  );
}
