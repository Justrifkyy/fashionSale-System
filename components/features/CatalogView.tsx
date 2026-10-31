"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { Category, Product } from "@/lib/types/domain";
import { CatalogFilterParams } from "@/lib/services/catalogService";
import { ProductLattice } from "@/components/features/ProductLattice";
import { EmptyState } from "@/components/ui/EmptyState";
import { Drawer } from "@/components/ui/Overlay";
import { Button } from "@/components/ui/Button";
import { CheckboxField } from "@/components/ui/FormFields";
import { formatMessage, idMessages } from "@/lib/i18n";
import { cn } from "@/lib/utils/cn";

interface CatalogViewProps {
  products: Product[];
  categories: Category[];
  availableSizes: string[];
  availableColors: Array<{ name: string; hex: string }>;
  activeFilters: CatalogFilterParams;
  currentPage?: number;
  totalPages?: number;
  totalProducts?: number;
  pageSize?: number;
}

export function CatalogView({
  products,
  categories,
  availableSizes,
  availableColors,
  activeFilters,
  currentPage = 1,
  totalPages = 1,
  totalProducts = products.length,
}: CatalogViewProps) {
  const router = useRouter();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const updateFilter = (
    patch: Partial<CatalogFilterParams> & { page?: number }
  ) => {
    const merged: CatalogFilterParams = { ...activeFilters, ...patch };
    const sp = new URLSearchParams();

    if (merged.category && merged.category !== "all") {
      sp.set("category", merged.category);
    }
    if (merged.size) {
      sp.set("size", merged.size);
    }
    if (merged.color) {
      sp.set("color", merged.color);
    }
    if (merged.priceRange && merged.priceRange !== "all") {
      sp.set("price", merged.priceRange);
    }
    if (merged.onlyAvailable) {
      sp.set("available", "1");
    }
    if (merged.sort && merged.sort !== "newest") {
      sp.set("sort", merged.sort);
    }
    // Target page: if specified in patch, navigate to it; otherwise reset to page 1
    const targetPage = patch.page !== undefined ? patch.page : 1;
    if (targetPage > 1) {
      sp.set("page", String(targetPage));
    }

    const qs = sp.toString();
    router.push(qs ? `/products?${qs}` : "/products");
  };

  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }
    if (currentPage >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const resetAllFilters = () => {
    router.push("/products");
    setMobileFilterOpen(false);
  };

  const hasActiveFilter =
    Boolean(activeFilters.category && activeFilters.category !== "all") ||
    Boolean(activeFilters.size) ||
    Boolean(activeFilters.color) ||
    Boolean(activeFilters.priceRange && activeFilters.priceRange !== "all") ||
    Boolean(activeFilters.onlyAvailable);

  const filterPanelContent = (
    <div className="flex flex-col gap-6">
      {/* Category */}
      <div className="flex flex-col gap-2.5">
        <h3 className="text-[14px] font-bold text-ink">
          {idMessages.catalog.categoryLabel}
        </h3>
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={() => updateFilter({ category: "all" })}
            className={cn(
              "flex min-h-[44px] items-center justify-between px-3 text-left type-small font-medium border-base",
              !activeFilters.category || activeFilters.category === "all"
                ? "bg-ink text-surface"
                : "bg-surface text-ink hover:bg-page"
            )}
          >
            <span>{idMessages.catalog.allCategories}</span>
          </button>
          {categories.map((cat) => {
            const selected = activeFilters.category === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => updateFilter({ category: cat.slug })}
                className={cn(
                  "flex min-h-[44px] items-center justify-between px-3 text-left type-small font-medium border-base",
                  selected
                    ? "bg-ink text-surface"
                    : "bg-surface text-ink hover:bg-page"
                )}
              >
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Size chips */}
      <div className="flex flex-col gap-2.5">
        <h3 className="text-[14px] font-bold text-ink">
          {idMessages.catalog.sizeLabel}
        </h3>
        <div className="flex flex-wrap gap-2">
          {availableSizes.map((size) => {
            const selected = activeFilters.size === size;
            return (
              <button
                key={size}
                type="button"
                onClick={() =>
                  updateFilter({ size: selected ? undefined : size })
                }
                aria-pressed={selected}
                className={cn(
                  "flex h-[44px] min-w-[44px] items-center justify-center px-3 type-small font-semibold border-base",
                  selected
                    ? "bg-ink text-surface"
                    : "bg-surface text-ink hover:bg-page"
                )}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color swatches */}
      <div className="flex flex-col gap-2.5">
        <h3 className="text-[14px] font-bold text-ink">
          {idMessages.catalog.colorLabel}
        </h3>
        <div className="flex flex-col gap-1.5">
          {availableColors.map((col) => {
            const selected = activeFilters.color === col.name;
            return (
              <button
                key={col.name}
                type="button"
                onClick={() =>
                  updateFilter({ color: selected ? undefined : col.name })
                }
                aria-pressed={selected}
                className={cn(
                  "flex min-h-[44px] items-center gap-2.5 px-3 border-base type-small font-medium",
                  selected
                    ? "bg-ink text-surface"
                    : "bg-surface text-ink hover:bg-page"
                )}
              >
                <span
                  aria-hidden="true"
                  style={{ backgroundColor: col.hex }}
                  className="h-4 w-4 shrink-0 border border-ink"
                />
                <span>{col.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price range */}
      <div className="flex flex-col gap-2.5">
        <h3 className="text-[14px] font-bold text-ink">
          {idMessages.catalog.priceLabel}
        </h3>
        <div className="flex flex-col gap-1.5">
          {(
            [
              { value: "all", label: idMessages.catalog.priceAll },
              { value: "under150", label: idMessages.catalog.priceUnder150 },
              { value: "150to250", label: idMessages.catalog.price150To250 },
              { value: "above250", label: idMessages.catalog.priceAbove250 },
            ] as const
          ).map((option) => {
            const current = activeFilters.priceRange ?? "all";
            const selected = current === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => updateFilter({ priceRange: option.value })}
                className={cn(
                  "flex min-h-[44px] items-center px-3 text-left type-small font-medium border-base",
                  selected
                    ? "bg-ink text-surface"
                    : "bg-surface text-ink hover:bg-page"
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Availability */}
      <div className="border-t border-line-soft pt-3">
        <CheckboxField
          label={idMessages.catalog.onlyAvailable}
          checked={Boolean(activeFilters.onlyAvailable)}
          onChange={(e) => updateFilter({ onlyAvailable: e.target.checked })}
        />
      </div>

      {hasActiveFilter && (
        <Button variant="secondary" fullWidth onClick={resetAllFilters}>
          {idMessages.catalog.resetFilter}
        </Button>
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Top Toolbar: Mobile Filter trigger + Results count + Sort dropdown */}
      <div className="sticky top-[68px] z-20 flex flex-wrap items-center justify-between gap-3 border-base bg-surface p-3 sm:static sm:p-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="inline-flex min-h-[44px] items-center gap-2 border-base bg-surface px-3.5 text-[15px] font-semibold text-ink hover:bg-page lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            <span>{idMessages.catalog.openFilter}</span>
          </button>

          <p className="type-small font-semibold text-ink tabular-nums">
            {formatMessage(idMessages.catalog.resultsCount, {
              count: products.length,
            })}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <label
            htmlFor="catalog-sort"
            className="hidden sm:inline type-small font-semibold text-ink"
          >
            {idMessages.catalog.sortLabel}:
          </label>
          <select
            id="catalog-sort"
            aria-label={idMessages.catalog.sortLabel}
            value={activeFilters.sort ?? "newest"}
            onChange={(e) =>
              updateFilter({
                sort: e.target.value as CatalogFilterParams["sort"],
              })
            }
            className="h-[44px] border-base bg-surface px-3 text-[15px] font-medium text-ink"
          >
            <option value="newest">{idMessages.catalog.sortNewest}</option>
            <option value="price_asc">{idMessages.catalog.sortPriceAsc}</option>
            <option value="price_desc">
              {idMessages.catalog.sortPriceDesc}
            </option>
            <option value="bestseller">
              {idMessages.catalog.sortBestseller}
            </option>
          </select>
        </div>
      </div>

      {/* Main Two-Column Desktop Layout: Left Filter Sidebar + Right Lattice */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        <aside
          aria-label={idMessages.catalog.filterTitle}
          className="hidden lg:block lg:col-span-3 border-base bg-surface p-5"
        >
          <h2 className="type-h4 text-ink mb-4 pb-3 border-b border-line-soft">
            {idMessages.catalog.filterTitle}
          </h2>
          {filterPanelContent}
        </aside>

        <div className="lg:col-span-9 flex flex-col gap-6">
          {products.length === 0 ? (
            <EmptyState
              title={idMessages.catalog.emptyTitle}
              description={idMessages.catalog.emptyBody}
              actionLabel={idMessages.catalog.emptyAction}
              onAction={resetAllFilters}
            />
          ) : (
            <>
              <ProductLattice products={products} columns={3} />

              {/* Square Pagination bar (DESIGN.md Section 10) */}
              <nav
                aria-label="Navigasi halaman katalog"
                className="flex flex-wrap items-center justify-between gap-3 border-base bg-surface p-3.5 mt-2"
              >
                <div className="flex items-center gap-2">
                  <span className="type-small text-muted tabular-nums">
                    {formatMessage(idMessages.catalog.pageIndicator, {
                      page: currentPage,
                      total: totalPages,
                    })}
                  </span>
                  <span className="text-muted text-xs">•</span>
                  <span className="type-small text-muted font-mono text-xs">
                    {totalProducts} produk
                  </span>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  {/* Previous Button */}
                  <button
                    type="button"
                    disabled={currentPage <= 1}
                    onClick={() => updateFilter({ page: currentPage - 1 })}
                    aria-label={idMessages.catalog.prevPage}
                    className={cn(
                      "h-[44px] px-3.5 sm:px-4 border-base type-small font-semibold transition-colors",
                      currentPage <= 1
                        ? "bg-line-soft text-muted cursor-not-allowed border-line-soft"
                        : "bg-surface text-ink hover:bg-page border-ink pressable-hard"
                    )}
                  >
                    {idMessages.catalog.prevPage}
                  </button>

                  {/* Page Numbers */}
                  {getPageNumbers().map((item, idx) => {
                    if (item === "...") {
                      return (
                        <span
                          key={`dots-${idx}`}
                          className="flex h-[44px] w-[36px] items-center justify-center font-mono text-muted select-none"
                        >
                          ...
                        </span>
                      );
                    }

                    const pageNum = Number(item);
                    const isCurrent = pageNum === currentPage;
                    return (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => updateFilter({ page: pageNum })}
                        aria-current={isCurrent ? "page" : undefined}
                        aria-label={`Ke halaman ${pageNum}`}
                        className={cn(
                          "flex h-[44px] min-w-[44px] px-2 items-center justify-center border-base font-bold tabular-nums transition-colors",
                          isCurrent
                            ? "bg-ink text-surface border-ink"
                            : "bg-surface text-ink hover:bg-page border-ink pressable-hard"
                        )}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  {/* Next Button */}
                  <button
                    type="button"
                    disabled={currentPage >= totalPages}
                    onClick={() => updateFilter({ page: currentPage + 1 })}
                    aria-label={idMessages.catalog.nextPage}
                    className={cn(
                      "h-[44px] px-3.5 sm:px-4 border-base type-small font-semibold transition-colors",
                      currentPage >= totalPages
                        ? "bg-line-soft text-muted cursor-not-allowed border-line-soft"
                        : "bg-surface text-ink hover:bg-page border-ink pressable-hard"
                    )}
                  >
                    {idMessages.catalog.nextPage}
                  </button>
                </div>
              </nav>
            </>
          )}
        </div>
      </div>

      {/* Mobile Bottom Filter Drawer */}
      <Drawer
        isOpen={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        title={idMessages.catalog.filterTitle}
        side="bottom"
        footer={
          <Button
            variant="secondary"
            fullWidth
            onClick={() => setMobileFilterOpen(false)}
          >
            {idMessages.catalog.applyFilter}
          </Button>
        }
      >
        {filterPanelContent}
      </Drawer>
    </div>
  );
}

