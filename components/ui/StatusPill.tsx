import React from "react";
import {
  Check,
  Clock,
  Package,
  RotateCcw,
  Truck,
  X,
} from "lucide-react";
import { OrderStatusCode } from "@/lib/types/domain";
import { idMessages } from "@/lib/i18n";
import { cn } from "@/lib/utils/cn";

interface StatusPillProps {
  status: OrderStatusCode;
  className?: string;
}

const statusConfig: Record<
  OrderStatusCode,
  {
    classes: string;
    Icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  }
> = {
  PENDING_PAYMENT: {
    classes: "bg-gold text-ink border-base",
    Icon: Clock,
  },
  PROCESSING: {
    classes: "bg-ink text-surface border-base",
    Icon: Package,
  },
  SHIPPED: {
    classes: "bg-surface text-ink border-base",
    Icon: Truck,
  },
  COMPLETED: {
    classes: "bg-surface text-success border-[2px] border-solid border-success",
    Icon: Check,
  },
  CANCELLED: {
    classes: "bg-surface text-muted border-[2px] border-solid border-muted",
    Icon: X,
  },
  RETURN: {
    classes:
      "bg-surface text-brick-deep border-[2px] border-solid border-brick-deep",
    Icon: RotateCcw,
  },
};

/**
 * Order status pill with mandatory icon + text (DESIGN.md Section 9).
 */
export function StatusPill({ status, className }: StatusPillProps) {
  const { classes, Icon } = statusConfig[status];
  const label = idMessages.orderStatus[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 type-micro whitespace-nowrap",
        classes,
        className
      )}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden={true} />
      <span>{label}</span>
    </span>
  );
}

