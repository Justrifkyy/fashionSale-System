import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/features/CartDrawer";
import { ButtonLink } from "@/components/ui/Button";
import { idMessages } from "@/lib/i18n";

/**
 * Branded 404 Page (P-070, DESIGN.md Section 8, 10 & 11):
 * - Approved location #3 for the South Sulawesi woven check motif
 * - Centered heading + explanation + search form + back to home action
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main
        id="main-content"
        className="flex flex-1 items-center justify-center px-4 py-16 sm:px-6"
      >
        <div className="woven-motif w-full max-w-2xl border-strong bg-surface p-6 sm:p-12">
          <div className="border-base bg-surface p-6 sm:p-10 text-center flex flex-col items-center gap-4">
            <h1 className="type-h1 text-ink">
              {idMessages.system.notFoundHeading}
            </h1>
            <p className="type-body text-muted max-w-[48ch]">
              {idMessages.system.notFoundBody}
            </p>

            <form
              action="/search"
              method="get"
              className="mt-2 flex w-full max-w-md flex-col sm:flex-row gap-2.5"
            >
              <label htmlFor="not-found-search" className="sr-only">
                {idMessages.common.searchPlaceholder}
              </label>
              <input
                id="not-found-search"
                name="q"
                type="search"
                placeholder={idMessages.common.searchPlaceholder}
                className="h-[48px] flex-1 border-base bg-surface px-3.5 text-[16px] text-ink"
              />
              <button
                type="submit"
                className="min-h-[48px] px-5 bg-surface text-ink font-semibold border-base pressable-hard"
              >
                {idMessages.common.searchButton}
              </button>
            </form>

            <div className="pt-2">
              <ButtonLink href="/" variant="primary">
                {idMessages.common.backToHome}
              </ButtonLink>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}

