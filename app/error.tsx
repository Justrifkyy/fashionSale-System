"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { idMessages } from "@/lib/i18n";

/**
 * Branded 500 Error Boundary (P-071, DESIGN.md Section 10 & 11):
 * - Friendly message, no raw stack trace, single reload button
 */
export default function GlobalErrorBoundary({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="woven-motif w-full max-w-xl border-strong bg-surface p-6 sm:p-10">
        <div className="border-base bg-surface p-6 sm:p-8 text-center flex flex-col items-center gap-4">
          <h1 className="type-h2 text-ink">{idMessages.system.errorHeading}</h1>
          <p className="type-body text-muted max-w-[46ch]">
            {idMessages.system.errorBody}
          </p>
          <div className="pt-2">
            <Button variant="primary" onClick={() => reset()}>
              {idMessages.common.reload}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

