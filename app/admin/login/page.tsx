"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CareCareLogo } from "@/components/layout/CareCareLogo";
import { InputField } from "@/components/ui/FormFields";
import { Button } from "@/components/ui/Button";
import { idMessages } from "@/lib/i18n";

/**
 * Separate Admin Login Page (P-025: no public link in storefront)
 */
export default function AdminLoginPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-page px-4 py-12">
      <div className="w-full max-w-md border-strong bg-surface p-6 sm:p-8 flex flex-col gap-6">
        <div className="flex flex-col gap-2 border-b border-line-soft pb-4">
          <CareCareLogo variant="color-on-light" withWordmark size="sm" />
          <h1 className="type-h2 text-ink pt-2">
            {idMessages.auth.adminLoginHeading}
          </h1>
          <p className="type-small text-muted">
            {idMessages.auth.adminLoginSub}
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push("/admin");
          }}
          className="flex flex-col gap-4"
        >
          <InputField
            label={idMessages.auth.emailLabel}
            type="email"
            autoComplete="email"
            required
          />
          <InputField
            label={idMessages.auth.passwordLabel}
            type="password"
            autoComplete="current-password"
            required
          />
          <Button type="submit" variant="primary" fullWidth>
            {idMessages.auth.loginCta}
          </Button>
        </form>
      </div>
    </div>
  );
}

