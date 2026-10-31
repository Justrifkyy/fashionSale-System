import React from "react";
import { Button } from "@/components/ui/Button";
import { listCategories } from "@/lib/services/catalogService";
import { idMessages } from "@/lib/i18n";

/**
 * Admin Category Management (P-053)
 */
export default function AdminCategoriesPage() {
  const categories = listCategories();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="type-h2 text-ink">
          {idMessages.admin.categoriesHeading}
        </h1>
        <Button variant="primary">{idMessages.admin.addCategoryCta}</Button>
      </div>

      <div className="overflow-x-auto border-base bg-surface">
        <table className="w-full text-left type-small">
          <thead className="bg-ink text-surface">
            <tr>
              <th className="px-4 py-3 font-semibold">
                {idMessages.admin.colCategoryName}
              </th>
              <th className="px-4 py-3 font-semibold">
                {idMessages.admin.colCategorySlug}
              </th>
              <th className="px-4 py-3 font-semibold">
                {idMessages.admin.colCategoryDesc}
              </th>
              <th className="px-4 py-3 font-semibold text-right">
                {idMessages.admin.colSortOrder}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line-soft">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-page">
                <td className="px-4 py-3 font-bold text-ink">{cat.name}</td>
                <td className="px-4 py-3 tabular-nums text-muted">
                  /{cat.slug}
                </td>
                <td className="px-4 py-3 text-muted">{cat.description}</td>
                <td className="px-4 py-3 text-right tabular-nums font-semibold">
                  {cat.sortOrder}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
