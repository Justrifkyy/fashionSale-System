"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  FolderTree,
  LayoutDashboard,
  Menu,
  Package,
  Settings,
  ShoppingCart,
  Store,
} from "lucide-react";
import { CareCareLogo } from "@/components/layout/CareCareLogo";
import { Drawer } from "@/components/ui/Overlay";
import { idMessages } from "@/lib/i18n";
import { cn } from "@/lib/utils/cn";

const ADMIN_NAV = [
  { href: "/admin", label: idMessages.admin.navDashboard, Icon: LayoutDashboard },
  { href: "/admin/orders", label: idMessages.admin.navOrders, Icon: ShoppingCart },
  { href: "/admin/products", label: idMessages.admin.navProducts, Icon: Package },
  { href: "/admin/categories", label: idMessages.admin.navCategories, Icon: FolderTree },
  { href: "/admin/content/pages", label: idMessages.admin.navPages, Icon: FileText },
  { href: "/admin/settings/store", label: idMessages.admin.navSettings, Icon: Settings },
];

/**
 * Calm, dense `ink` sidebar for Admin Panel (DESIGN.md Section 6 & 10):
 * - Same tokens, zero stickers, zero chamfers, zero woven motif.
 */
export function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderLinks = (onNavigate?: () => void) => (
    <nav aria-label="Menu admin" className="flex flex-col gap-1">
      {ADMIN_NAV.map(({ href, label, Icon }) => {
        const isActive =
          href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(href.replace("/store", ""));
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              "flex min-h-[44px] items-center gap-3 px-3.5 type-small font-semibold",
              isActive
                ? "bg-brick text-surface"
                : "text-line-soft hover:bg-surface/10 hover:text-surface"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile / Tablet Admin Top Bar */}
      <div className="flex items-center justify-between border-b-base bg-ink px-4 py-3 text-surface on-ink lg:hidden">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label={idMessages.nav.openMenu}
            className="flex h-[44px] w-[44px] items-center justify-center border border-surface/40 text-surface"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
          <span className="font-bold text-surface">
            {idMessages.admin.panelTitle}
          </span>
        </div>
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center gap-1.5 px-3 type-small font-semibold text-gold hover:underline"
        >
          <Store className="h-4 w-4" aria-hidden="true" />
          <span>{idMessages.admin.backToStorefront}</span>
        </Link>
      </div>

      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:flex lg:w-[248px] lg:shrink-0 lg:flex-col lg:justify-between border-r-base bg-ink p-5 text-surface on-ink min-h-screen">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-1 border-b border-surface/20 pb-4">
            <CareCareLogo variant="color-on-dark" withWordmark size="sm" />
            <span className="type-small text-line-soft pt-1">
              {idMessages.admin.panelTitle}
            </span>
          </div>
          {renderLinks()}
        </div>

        <div className="border-t border-surface/20 pt-4">
          <Link
            href="/"
            className="flex min-h-[44px] items-center gap-2.5 px-3 type-small font-semibold text-line-soft hover:text-gold"
          >
            <Store className="h-4 w-4" aria-hidden="true" />
            <span>{idMessages.admin.backToStorefront}</span>
          </Link>
        </div>
      </aside>

      {/* Mobile Drawer */}
      <Drawer
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        title={idMessages.admin.panelTitle}
        side="bottom"
      >
        <div className="bg-ink p-3 on-ink">
          {renderLinks(() => setMobileOpen(false))}
        </div>
      </Drawer>
    </>
  );
}

