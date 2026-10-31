import React from "react";
import { ButtonLink } from "@/components/ui/Button";
import { listSizeGuideRows } from "@/lib/services/catalogService";
import { idMessages } from "@/lib/i18n";

/**
 * Size Guide Page (P-015)
 */
export default function SizeGuidePage() {
  const rows = listSizeGuideRows();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-16 flex flex-col gap-6">
      <h1 className="type-h1 text-ink">{idMessages.info.sizeGuideHeading}</h1>
      <p className="type-body text-muted max-w-[65ch]">
        {idMessages.info.sizeGuideIntro}
      </p>

      <div className="overflow-x-auto border-base bg-surface">
        <table className="w-full text-left type-small">
          <thead className="bg-ink text-surface">
            <tr>
              <th className="px-4 py-3 font-semibold">
                {idMessages.info.colSize}
              </th>
              <th className="px-4 py-3 font-semibold text-right">
                {idMessages.info.colChest}
              </th>
              <th className="px-4 py-3 font-semibold text-right">
                {idMessages.info.colLength}
              </th>
              <th className="px-4 py-3 font-semibold text-right">
                {idMessages.info.colShoulder}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line-soft">
            {rows.map((row) => (
              <tr key={row.size}>
                <td className="px-4 py-3 font-bold text-ink">{row.size}</td>
                <td className="px-4 py-3 text-right tabular-nums">
                  {row.chestCm}
                </td>
                <td className="px-4 py-3 text-right tabular-nums">
                  {row.lengthCm}
                </td>
                <td className="px-4 py-3 text-right tabular-nums">
                  {row.shoulderCm}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pt-2">
        <ButtonLink href="/products" variant="primary">
          {idMessages.cart.emptyAction}
        </ButtonLink>
      </div>
    </div>
  );
}
