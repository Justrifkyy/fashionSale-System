"use client";

import React, { forwardRef, useId } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface FieldWrapperProps {
  id: string;
  label: string;
  helperText?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

function FieldWrapper({
  id,
  label,
  helperText,
  error,
  children,
  className,
}: FieldWrapperProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-[14px] font-semibold text-ink">
        {label}
      </label>
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="flex items-center gap-1.5 type-small text-danger font-medium"
        >
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p id={`${id}-helper`} className="type-small text-muted">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
  error?: string;
  wrapperClassName?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField(
    {
      label,
      helperText,
      error,
      id: providedId,
      className,
      wrapperClassName,
      ...rest
    },
    ref
  ) {
    const generatedId = useId();
    const id = providedId ?? generatedId;
    const describedBy = error
      ? `${id}-error`
      : helperText
        ? `${id}-helper`
        : undefined;

    return (
      <FieldWrapper
        id={id}
        label={label}
        helperText={helperText}
        error={error}
        className={wrapperClassName}
      >
        <input
          ref={ref}
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={cn(
            "h-[48px] w-full bg-surface px-3.5 text-[16px] text-ink placeholder:text-muted/70",
            error ? "border-strong !border-danger" : "border-base",
            "disabled:bg-line-soft disabled:text-muted disabled:cursor-not-allowed",
            className
          )}
          {...rest}
        />
      </FieldWrapper>
    );
  }
);

export interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  helperText?: string;
  error?: string;
  wrapperClassName?: string;
  options: Array<{ value: string; label: string }>;
}

export function SelectField({
  label,
  helperText,
  error,
  options,
  id: providedId,
  className,
  wrapperClassName,
  ...rest
}: SelectFieldProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const describedBy = error
    ? `${id}-error`
    : helperText
      ? `${id}-helper`
      : undefined;

  return (
    <FieldWrapper
      id={id}
      label={label}
      helperText={helperText}
      error={error}
      className={wrapperClassName}
    >
      <select
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={cn(
          "h-[48px] w-full bg-surface px-3.5 text-[16px] text-ink",
          error ? "border-strong !border-danger" : "border-base",
          "disabled:bg-line-soft disabled:text-muted disabled:cursor-not-allowed",
          className
        )}
        {...rest}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
}

export interface TextareaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  helperText?: string;
  error?: string;
  wrapperClassName?: string;
}

export function TextareaField({
  label,
  helperText,
  error,
  id: providedId,
  className,
  wrapperClassName,
  rows = 4,
  ...rest
}: TextareaFieldProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const describedBy = error
    ? `${id}-error`
    : helperText
      ? `${id}-helper`
      : undefined;

  return (
    <FieldWrapper
      id={id}
      label={label}
      helperText={helperText}
      error={error}
      className={wrapperClassName}
    >
      <textarea
        id={id}
        rows={rows}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={cn(
          "w-full bg-surface p-3.5 text-[16px] text-ink placeholder:text-muted/70",
          error ? "border-strong !border-danger" : "border-base",
          className
        )}
        {...rest}
      />
    </FieldWrapper>
  );
}

export interface CheckboxFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
}

export function CheckboxField({
  label,
  id: providedId,
  className,
  ...rest
}: CheckboxFieldProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;

  return (
    <label
      htmlFor={id}
      className={cn(
        "inline-flex min-h-[44px] items-center gap-3 cursor-pointer select-none py-1",
        className
      )}
    >
      <input
        id={id}
        type="checkbox"
        className="h-5 w-5 shrink-0 accent-ink border-base bg-surface cursor-pointer"
        {...rest}
      />
      <span className="type-small text-ink">{label}</span>
    </label>
  );
}

