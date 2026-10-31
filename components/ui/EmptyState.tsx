import React from "react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  withWovenMotif?: boolean;
  className?: string;
}

/**
 * Branded empty state (DESIGN.md Section 9 & 11):
 * - 1-sentence title, 1-line explanation, 1 action button
 * - Approved location for the woven check motif
 */
export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  withWovenMotif = true,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "border-base bg-surface p-6 sm:p-10",
        withWovenMotif && "woven-motif",
        className
      )}
    >
      <div className="mx-auto max-w-[46ch] border-base bg-surface p-6 sm:p-8 text-center flex flex-col items-center gap-3">
        <h2 className="type-h3 text-ink">{title}</h2>
        <p className="type-body text-muted">{description}</p>
        {actionLabel && actionHref && (
          <div className="pt-2">
            <ButtonLink href={actionHref} variant="primary">
              {actionLabel}
            </ButtonLink>
          </div>
        )}
        {actionLabel && !actionHref && onAction && (
          <div className="pt-2">
            <Button variant="primary" onClick={onAction}>
              {actionLabel}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

