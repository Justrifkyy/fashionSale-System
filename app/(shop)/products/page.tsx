import React, { Suspense } from "react";
import { Breadcrumb } from "@/components/ui/Disclosure";
import { ProductLatticeSkeleton } from "@/components/ui/Skeleton";
import { CatalogView } from "@/components/features/CatalogView";
import {
  CatalogFilterParams,
  listAvailableFilterOptions,
  listCategories,
  listProducts,
} from "@/lib/services/catalogService";
import { idMessages } from "@/lib/i18n";

type RawSearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

async function CatalogContent({
  searchParams,
}: {
  searchParams: RawSearchParams;
}) {
  const sp = await searchParams;
  const firstString = (val: string | string[] | undefined) =>
    Array.isArray(val) ? val[0] : val;

  const priceParam = firstString(sp.price);
  const sortParam = firstString(sp.sort);

  const filters: CatalogFilterParams = {
    category: firstString(sp.category),
    size: firstString(sp.size),
    color: firstString(sp.color),
    priceRange:
      priceParam === "under150" ||
      priceParam === "150to250" ||
      priceParam === "above250"
        ? priceParam
        : "all",
    onlyAvailable: firstString(sp.available) === "1",
    sort:
      sortParam === "price_asc" ||
      sortParam === "price_desc" ||
      sortParam === "bestseller"
        ? sortParam
        : "newest",
  };

  const allFilteredProducts = listProducts(filters);
  const totalProducts = allFilteredProducts.length;
  const pageSize = 6;
  const pageParam = parseInt(firstString(sp.page) || "1", 10);
  const currentPage = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
  const totalPages = Math.max(1, Math.ceil(totalProducts / pageSize));
  const validPage = Math.min(currentPage, totalPages);

  const paginatedProducts = allFilteredProducts.slice(
    (validPage - 1) * pageSize,
    validPage * pageSize
  );

  const categories = listCategories();
  const { sizes, colors } = listAvailableFilterOptions();

  return (
    <CatalogView
      products={paginatedProducts}
      totalProducts={totalProducts}
      currentPage={validPage}
      totalPages={totalPages}
      pageSize={pageSize}
      categories={categories}
      availableSizes={sizes}
      availableColors={colors}
      activeFilters={filters}
    />
  );
}

/**
 * Catalog Page (P-002) with Next.js 16 Cache Components static shell + Suspense Skeleton.
 */
export default function ProductsPage(props: { searchParams: RawSearchParams }) {
  return (
    <div className="mx-auto max-w-[1360px] px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
      <Breadcrumb
        items={[
          { label: idMessages.catalog.breadcrumbHome, href: "/" },
          { label: idMessages.catalog.breadcrumbCatalog },
        ]}
      />

      <div className="mt-2 mb-6">
        <h1 className="type-h1 text-ink">{idMessages.catalog.heading}</h1>
      </div>

      <Suspense fallback={<ProductLatticeSkeleton count={6} />}>
        <CatalogContent searchParams={props.searchParams} />
      </Suspense>
    </div>
  );
}

