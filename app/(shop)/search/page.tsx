import React, { Suspense } from "react";
import { ProductLattice } from "@/components/features/ProductLattice";
import { ProductLatticeSkeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { listProducts } from "@/lib/services/catalogService";
import { formatMessage, idMessages } from "@/lib/i18n";

type RawSearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

async function SearchResults({
  searchParams,
}: {
  searchParams: RawSearchParams;
}) {
  const sp = await searchParams;
  const rawQ = sp.q;
  const query = (Array.isArray(rawQ) ? rawQ[0] : rawQ)?.trim() ?? "";

  if (!query) {
    const recent = listProducts().slice(0, 4);
    return (
      <div className="flex flex-col gap-6">
        <div className="border-base bg-surface p-5">
          <h2 className="type-h4 text-ink">
            {idMessages.search.emptyPromptTitle}
          </h2>
          <p className="type-small text-muted mt-1">
            {idMessages.search.emptyPromptBody}
          </p>
        </div>
        <ProductLattice products={recent} columns={4} />
      </div>
    );
  }

  const matches = listProducts({ query });

  if (matches.length === 0) {
    return (
      <EmptyState
        title={formatMessage(idMessages.search.noResultsTitle, { query })}
        description={idMessages.search.noResultsBody}
        actionLabel={idMessages.search.noResultsAction}
        actionHref="/products"
      />
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <p className="type-body font-semibold text-ink">
        {formatMessage(idMessages.search.queryLabel, {
          query,
          count: matches.length,
        })}
      </p>
      <ProductLattice products={matches} columns={4} />
    </div>
  );
}

/**
 * Search Page (P-003)
 */
export default function SearchPage(props: { searchParams: RawSearchParams }) {
  return (
    <div className="mx-auto max-w-[1360px] px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <h1 className="type-h1 text-ink mb-6">{idMessages.search.heading}</h1>

      <form
        action="/search"
        method="get"
        className="mb-8 flex flex-col sm:flex-row gap-3 max-w-2xl"
      >
        <label htmlFor="store-search-input" className="sr-only">
          {idMessages.common.searchPlaceholder}
        </label>
        <input
          id="store-search-input"
          name="q"
          type="search"
          placeholder={idMessages.common.searchPlaceholder}
          className="h-[48px] flex-1 border-base bg-surface px-4 text-[16px] text-ink"
        />
        <button
          type="submit"
          className="min-h-[48px] px-6 bg-surface text-ink font-semibold border-base pressable-hard"
        >
          {idMessages.common.searchButton}
        </button>
      </form>

      <Suspense fallback={<ProductLatticeSkeleton count={4} />}>
        <SearchResults searchParams={props.searchParams} />
      </Suspense>
    </div>
  );
}

