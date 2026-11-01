"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBag, User } from "lucide-react";
import { CareCareLogo } from "@/components/layout/CareCareLogo";
import { Drawer } from "@/components/ui/Overlay";
import { useStore } from "@/components/providers/StoreProvider";
import { idMessages } from "@/lib/i18n";
import { cn } from "@/lib/utils/cn";

const NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/about", label: "Tentang" },
  { href: "/products", label: "Katalog" },
];

export function Header() {
  const pathname = usePathname();
  const { cartCount, cartPulse, openCartDrawer } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-ink focus:text-surface focus:px-4 focus:py-2.5 focus:font-semibold"
      >
        {idMessages.nav.skipToContent}
      </a>

      {/* MAIN CLEAN HEADER BAR */}
      <header className="sticky top-0 z-40 w-full border-b-strong border-ink bg-surface shadow-xs">
        <div className="mx-auto flex min-h-[70px] max-w-[1360px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
          
          {/* Left: Mobile Menu Trigger + Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label={idMessages.nav.openMenu}
              className="flex h-[44px] w-[44px] items-center justify-center border-base border-ink bg-surface text-ink hover:bg-page pressable-hard transition-colors lg:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>

            <Link
              href="/"
              aria-label={idMessages.common.brand}
              className="inline-flex min-h-[44px] items-center py-1"
            >
              <CareCareLogo variant="color-on-light" withWordmark size="md" />
            </Link>
          </div>

          {/* Center: 3 Clean Navigation Links (Beranda, Tentang, Katalog) */}
          <nav
            aria-label="Navigasi utama"
            className="hidden lg:flex items-center gap-1"
          >
            {NAV_LINKS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex min-h-[44px] items-center px-5 text-[15px] font-bold text-ink transition-all",
                    isActive
                      ? "border-b-2 border-brick text-brick"
                      : "hover:bg-page hover:text-brick-deep"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Clean Search, Account, & Cart */}
          <div className="flex items-center gap-2">
            
            {/* Search Button */}
            <Link
              href="/search"
              aria-label={idMessages.nav.search}
              className={cn(
                "inline-flex min-h-[44px] items-center justify-center gap-2 border-base border-ink bg-surface px-3.5 text-ink hover:bg-page transition-colors",
                pathname === "/search" && "bg-page"
              )}
            >
              <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="hidden sm:inline text-sm font-semibold">
                {idMessages.nav.search}
              </span>
            </Link>

            {/* Account Button */}
            <Link
              href="/account/orders"
              aria-label={idMessages.nav.account}
              className="hidden sm:inline-flex min-h-[44px] items-center justify-center gap-2 border-base border-ink bg-surface px-3.5 text-ink hover:bg-page transition-colors"
            >
              <User className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="hidden md:inline text-sm font-semibold">
                {idMessages.nav.account}
              </span>
            </Link>

            {/* Shopping Cart Button */}
            <button
              type="button"
              onClick={openCartDrawer}
              aria-label="Buka Keranjang Belanja"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 border-base border-ink bg-ink px-4 text-surface hover:bg-brick-deep pressable-hard shadow-hard-sm transition-all"
            >
              <ShoppingBag className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="hidden sm:inline text-sm font-semibold">
                {idMessages.nav.cart}
              </span>
              <span
                className={cn(
                  "inline-flex min-w-[22px] items-center justify-center bg-gold px-1.5 py-0.5 text-xs font-bold tabular-nums text-ink border border-ink transition-transform duration-200",
                  cartPulse && "scale-125"
                )}
              >
                {cartCount}
              </span>
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE NAVIGATION DRAWER */}
      <Drawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        title="Menu Mandiri Global"
        side="bottom"
      >
        <div className="flex flex-col gap-3 py-2">
          <nav aria-label="Navigasi mobile" className="flex flex-col divide-y divide-line-soft border border-line-soft bg-surface">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex min-h-[48px] items-center px-4 text-sm font-bold text-ink hover:bg-page transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/account/orders"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex min-h-[48px] items-center px-4 text-sm font-bold text-ink hover:bg-page transition-colors"
            >
              {idMessages.account.navOrders}
            </Link>
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex min-h-[48px] items-center px-4 text-sm font-bold text-brick-deep transition-colors"
            >
              {idMessages.nav.login}
            </Link>
          </nav>
        </div>
      </Drawer>
    </>
  );
}
