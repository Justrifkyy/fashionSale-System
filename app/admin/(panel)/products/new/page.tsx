"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  InputField,
  SelectField,
  TextareaField,
} from "@/components/ui/FormFields";
import { Button, ButtonLink } from "@/components/ui/Button";
import { useStore } from "@/components/providers/StoreProvider";
import { idMessages } from "@/lib/i18n";

/**
 * Admin Create Product Form (P-052: basic info + variant SKU/price/stock/weight matrix)
 */
export default function AdminNewProductPage() {
  const router = useRouter();
  const { showToast } = useStore();

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="type-h2 text-ink">
          {idMessages.admin.newProductHeading}
        </h1>
        <ButtonLink href="/admin/products" variant="secondary">
          {idMessages.common.cancel}
        </ButtonLink>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          showToast(idMessages.admin.settingsSavedToast, "success");
          router.push("/admin/products");
        }}
        className="flex flex-col gap-6"
      >
        <section className="border-base bg-surface p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <InputField label={idMessages.admin.formProductName} required />
          </div>
          <SelectField
            label={idMessages.admin.formCategory}
            options={[
              { value: "kemeja", label: "Kemeja" },
              { value: "kaos", label: "Kaos" },
              { value: "celana", label: "Celana" },
              { value: "aksesori", label: "Aksesori" },
            ]}
          />
          <SelectField
            label={idMessages.admin.formSticker}
            options={[
              { value: "", label: idMessages.admin.formStickerNone },
              { value: "NEW", label: idMessages.badges.NEW },
              { value: "BESTSELLER", label: idMessages.badges.BESTSELLER },
              { value: "HOT_DROP", label: idMessages.badges.HOT_DROP },
              { value: "SALE", label: idMessages.badges.SALE },
            ]}
          />
          <div className="sm:col-span-2">
            <TextareaField
              label={idMessages.admin.formDescription}
              rows={4}
              required
            />
          </div>
        </section>

        {/* Per-variant stock, price (integer IDR), and weight_gram (required for Biteship) */}
        <section className="border-base bg-surface flex flex-col">
          <div className="border-b border-line-soft px-4 py-3">
            <h2 className="type-h4 text-ink">
              {idMessages.admin.variantsTableHeading}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left type-small">
              <thead className="bg-ink text-surface">
                <tr>
                  <th className="px-3.5 py-2.5 font-semibold">
                    {idMessages.info.colSize}
                  </th>
                  <th className="px-3.5 py-2.5 font-semibold">
                    {idMessages.admin.colSku}
                  </th>
                  <th className="px-3.5 py-2.5 font-semibold text-right">
                    {idMessages.admin.colPriceRp}
                  </th>
                  <th className="px-3.5 py-2.5 font-semibold text-right">
                    {idMessages.admin.colStock}
                  </th>
                  <th className="px-3.5 py-2.5 font-semibold text-right">
                    {idMessages.admin.colWeightGram}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line-soft">
                {["S", "M", "L", "XL"].map((size) => (
                  <tr key={size}>
                    <td className="px-3.5 py-2.5 font-bold">{size}</td>
                    <td className="px-3.5 py-2.5">
                      <input
                        type="text"
                        aria-label={`SKU ukuran ${size}`}
                        defaultValue={`CC-NEW-${size}`}
                        className="h-10 w-36 border-base bg-surface px-2.5 tabular-nums"
                      />
                    </td>
                    <td className="px-3.5 py-2.5 text-right">
                      <input
                        type="number"
                        aria-label={`Harga ukuran ${size}`}
                        defaultValue={225000}
                        min={0}
                        step={1000}
                        className="h-10 w-32 border-base bg-surface px-2.5 text-right tabular-nums"
                      />
                    </td>
                    <td className="px-3.5 py-2.5 text-right">
                      <input
                        type="number"
                        aria-label={`Stok ukuran ${size}`}
                        defaultValue={10}
                        min={0}
                        className="h-10 w-20 border-base bg-surface px-2.5 text-right tabular-nums"
                      />
                    </td>
                    <td className="px-3.5 py-2.5 text-right">
                      <input
                        type="number"
                        aria-label={`Berat gram ukuran ${size}`}
                        defaultValue={340}
                        min={1}
                        className="h-10 w-24 border-base bg-surface px-2.5 text-right tabular-nums"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div>
          <Button type="submit" variant="primary">
            {idMessages.admin.saveProductCta}
          </Button>
        </div>
      </form>
    </div>
  );
}
