import React from "react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import {
  getProductDisplayPrice,
  getProductTotalStock,
} from "@/lib/types/domain";
import { listProducts } from "@/lib/services/catalogService";
import { formatRupiah } from "@/lib/utils/money";
import { idMessages } from "@/lib/i18n";

/**
 * Admin Product Management List (P-051)
 */
export default function AdminProductsPage() {
  const products = listProducts();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="type-h2 text-ink">{idMessages.admin.productsHeading}</h1>
        <ButtonLink href="/admin/products/new" variant="primary">
          {idMessages.admin.addProductCta}
        </ButtonLink>
      </div>

      <div className="overflow-x-auto border-base bg-surface">
        <table className="w-full text-left type-small">
          <thead className="bg-ink text-surface">
            <tr>
              <th className="px-4 py-3 font-semibold">
                {idMessages.admin.colProduct}
              </th>
              <th className="px-4 py-3 font-semibold">
                {idMessages.admin.colCategory}
              </th>
              <th className="px-4 py-3 font-semibold text-right">
                {idMessages.admin.colPrice}
              </th>
              <th className="px-4 py-3 font-semibold text-right">
                {idMessages.admin.colStock}
              </th>
              <th className="px-4 py-3 font-semibold text-right">
                {idMessages.admin.colAction}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line-soft bg-surface">
            {products.map((product) => {
              const totalStock = getProductTotalStock(product);
              const { price } = getProductDisplayPrice(product);
              return (
                <tr key={product.id} className="hover:bg-page">
                  <td className="px-4 py-3">
                    <span className="font-bold text-ink">{product.name}</span>
                    <span className="block text-muted">
                      {product.variants.length}{" "}
                      {idMessages.admin.activeVariantsSuffix}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-ink">{product.categoryName}</td>
                  <td className="px-4 py-3 text-right font-semibold tabular-nums text-ink">
                    {formatRupiah(price)}
                  </td>
                  <td className="px-4 py-3 text-right font-bold tabular-nums text-ink">
                    {totalStock}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/products/${product.slug}`}
                      className="font-semibold text-brick-deep underline decoration-2 underline-offset-4 hover:text-ink"
                    >
                      {idMessages.admin.actionProcess}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
