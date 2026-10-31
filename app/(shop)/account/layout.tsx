"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { idMessages } from "@/lib/i18n";
import { cn } from "@/lib/utils/cn";

const ACCOUNT_TABS = [
  { href: "/account/orders", label: idMessages.account.navOrders },
  { href: "/account/addresses", label: idMessages.account.navAddresses },
  { href: "/account/profile", label: idMessages.account.navProfile },
];

/**
 * Customer Account Layout (DESIGN.md Section 10):
 * - Side navigation on desktop, horizontal tabs on mobile.
 */
export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="mx-auto max-w-[1360px] px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        <nav
          aria-label="Menu akun pelanggan"
          className="lg:col-span-3 flex lg:flex-col overflow-x-auto border-base bg-surface"
        >
          {ACCOUNT_TABS.map((tab) => {
            const active = pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "flex min-h-[48px] items-center px-4 text-[15px] font-semibold whitespace-nowrap border-r lg:border-r-0 lg:border-b border-line-soft last:border-0",
                  active
                    ? "bg-ink text-surface"
                    : "bg-surface text-ink hover:bg-page"
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>

        <div className="lg:col-span-9">{children}</div>
      </div>
    </div>
  );
}

