"use client";

import React, { forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export type ButtonVariant = "primary" | "secondary" | "text" | "danger";

interface BaseProps {
  variant?: ButtonVariant;
  isLoading?: boolean;
  fullWidth?: boolean;
  squareIcon?: boolean;
  className?: string;
  children: React.ReactNode;
}

type NativeButtonProps = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps>;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brick text-surface font-semibold text-[16px] border-strong pressable-hard hover:bg-brick-deep",
  secondary:
    "bg-surface text-ink font-semibold text-[16px] border-base pressable-hard hover:bg-page",
  text: "bg-transparent text-brick-deep font-semibold text-[16px] underline decoration-2 underline-offset-4 hover:text-ink",
  danger:
    "bg-danger text-surface font-semibold text-[16px] border-strong pressable-hard",
};

export const Button = forwardRef<HTMLButtonElement, NativeButtonProps>(
  function Button(
    {
      variant = "primary",
      isLoading = false,
      fullWidth = false,
      squareIcon = false,
      className,
      disabled,
      type = "button",
      children,
      ...rest
    },
    ref
  ) {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={cn(
          "inline-flex items-center justify-center gap-2.5 select-none whitespace-nowrap",
          variant !== "text" &&
            (squareIcon
              ? "h-[44px] w-[44px] p-0"
              : "min-h-[48px] sm:min-h-[44px] px-6 py-2.5"),
          variant === "text" && "min-h-[44px] px-1 py-1",
          variantClasses[variant],
          fullWidth && "w-full",
          "disabled:bg-line-soft disabled:text-muted disabled:border-ink disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0 disabled:cursor-not-allowed disabled:no-underline",
          className
        )}
        {...rest}
      >
        {isLoading && (
          <span
            aria-hidden="true"
            className="inline-block h-3.5 w-3.5 border-2 border-current animate-spin shrink-0"
          />
        )}
        {children}
      </button>
    );
  }
);

interface ButtonLinkProps {
  href: string;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function ButtonLink({
  href,
  variant = "primary",
  fullWidth = false,
  className,
  children,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2.5 select-none whitespace-nowrap",
        variant !== "text"
          ? "min-h-[48px] sm:min-h-[44px] px-6 py-2.5"
          : "min-h-[44px] px-1 py-1",
        variantClasses[variant],
        fullWidth && "w-full",
        className
      )}
    >
      {children}
    </Link>
  );
}

