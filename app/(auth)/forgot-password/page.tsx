"use client";

import React, { useState } from "react";
import Link from "next/link";
import { InputField } from "@/components/ui/FormFields";
import { Button } from "@/components/ui/Button";
import { idMessages } from "@/lib/i18n";

/**
 * Forgot Password Page (P-022: generic success response without email enumeration)
 */
export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h1 className="type-h2 text-ink">{idMessages.auth.forgotHeading}</h1>
        <p className="type-small text-muted">{idMessages.auth.forgotSub}</p>
      </div>

      {submitted ? (
        <div className="border-base bg-page p-4 type-small text-ink">
          {idMessages.auth.forgotSuccess}
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="flex flex-col gap-4"
        >
          <InputField
            label={idMessages.auth.emailLabel}
            type="email"
            autoComplete="email"
            required
          />
          <Button type="submit" variant="primary" fullWidth>
            {idMessages.auth.forgotCta}
          </Button>
        </form>
      )}

      <p className="border-t border-line-soft pt-4 type-small text-muted">
        <Link
          href="/login"
          className="font-semibold text-brick-deep underline decoration-2 underline-offset-4 hover:text-ink"
        >
          {idMessages.auth.loginLink}
        </Link>
      </p>
    </div>
  );
}

