import React from "react";
import Link from "next/link";
import { CareCareLogo } from "@/components/layout/CareCareLogo";
import { idMessages } from "@/lib/i18n";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-page">
      <header className="border-b-strong bg-surface">
        <div className="mx-auto flex min-h-[68px] max-w-[1360px] items-center justify-between px-4 sm:px-6 lg:px-10">
          <Link href="/" aria-label={idMessages.common.brand}>
            <CareCareLogo variant="color-on-light" withWordmark size="md" />
          </Link>
          <Link
            href="/products"
            className="type-small font-semibold text-brick-deep underline decoration-2 underline-offset-4 hover:text-ink"
          >
            {idMessages.common.backToCatalog}
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-md border-strong bg-surface p-6 sm:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

