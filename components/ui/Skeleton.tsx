import React from "react";
import { cn } from "@/lib/utils/cn";
import { idMessages } from "@/lib/i18n";

interface SkeletonProps {
  className?: string;
}

/**
 * Flat `line-soft` pulsing block without shimmer gradients (DESIGN.md Section 9).
 */
export function Skeleton({ className }: SkeletonProps) {
  return <div aria-hidden="true" className={cn("skeleton-flat", className)} />;
}

export function ProductLatticeSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div
      role="status"
      aria-label={idMessages.common.loading}
      className="lattice-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
    >
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="lattice-cell flex flex-col">
          <div className="aspect-[4/5] w-full p-3 border-b-base bg-photo">
            <Skeleton className="h-full w-full" />
          </div>
          <div className="flex flex-col gap-2.5 p-4">
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-5 w-2/5" />
            <Skeleton className="h-[44px] w-full mt-1" />
          </div>
        </div>
      ))}
    </div>
  );
}

