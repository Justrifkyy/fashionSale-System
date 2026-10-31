"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { idMessages } from "@/lib/i18n";
import { cn } from "@/lib/utils/cn";

interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

/**
 * Neo-brutalist Modal (DESIGN.md Section 9):
 * - surface background, 3px ink border, 0 radius
 * - ink 60% backdrop without blur
 * - Escape key closes and restores focus to trigger
 */
export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
}: OverlayProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previousActive = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      previousActive?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 bg-ink/60"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative z-10 w-full max-w-lg border-strong bg-surface flex flex-col max-h-[90vh]"
      >
        <div className="flex items-center justify-between border-b-base px-5 py-4">
          <h2 className="type-h4 text-ink">{title}</h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={idMessages.common.close}
            className="flex h-[44px] w-[44px] items-center justify-center border-base bg-surface text-ink hover:bg-page"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="overflow-y-auto p-5">{children}</div>
        {footer && <div className="border-t-base bg-page p-4">{footer}</div>}
      </div>
    </div>
  );
}

interface DrawerProps extends OverlayProps {
  side?: "right" | "bottom" | "responsive";
}

/**
 * Slide-in Drawer (DESIGN.md Section 7 & 9):
 * - 220ms ease-out slide
 * - Desktop right / Mobile bottom when `side="responsive"` (used for CartDrawer & QuickAdd)
 */
export function Drawer({
  isOpen,
  onClose,
  title,
  side = "responsive",
  children,
  footer,
}: DrawerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previousActive = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      previousActive?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 bg-ink/60"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "fixed z-10 bg-surface border-strong flex flex-col transition-transform duration-[220ms] ease-out",
          side === "right" &&
            "inset-y-0 right-0 w-full max-w-md border-r-0 border-t-0 border-b-0",
          side === "bottom" &&
            "inset-x-0 bottom-0 max-h-[88vh] border-l-0 border-r-0 border-b-0",
          side === "responsive" &&
            "inset-x-0 bottom-0 max-h-[88vh] sm:inset-y-0 sm:right-0 sm:left-auto sm:max-h-none sm:w-full sm:max-w-md"
        )}
      >
        <div className="flex items-center justify-between border-b-base px-5 py-4 shrink-0">
          <h2 className="type-h4 text-ink">{title}</h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={idMessages.common.close}
            className="flex h-[44px] w-[44px] items-center justify-center border-base bg-surface text-ink hover:bg-page"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
        {footer && (
          <div className="border-t-base bg-page p-5 shrink-0">{footer}</div>
        )}
      </div>
    </div>
  );
}

