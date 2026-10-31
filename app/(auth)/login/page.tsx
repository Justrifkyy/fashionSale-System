"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { InputField } from "@/components/ui/FormFields";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/components/providers/StoreProvider";
import { idMessages } from "@/lib/i18n";

/**
 * Customer Login Page (P-020)
 */
export default function LoginPage() {
  const router = useRouter();
  const { setSignedInPreview, showToast } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignedInPreview(true);
    showToast(idMessages.auth.demoLoginToast, "info");
    router.push("/");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h1 className="type-h2 text-ink">{idMessages.auth.loginHeading}</h1>
        <p className="type-small text-muted">{idMessages.auth.loginSub}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="type-small font-semibold text-brick-deep underline decoration-2 underline-offset-4 hover:text-ink"
          >
            {idMessages.auth.forgotLink}
          </Link>
        </div>

        <Button type="submit" variant="primary" fullWidth>
          {idMessages.auth.loginCta}
        </Button>

        <Button
          type="button"
          variant="secondary"
          fullWidth
          onClick={() => {
            setSignedInPreview(true);
            showToast(idMessages.auth.demoLoginToast, "info");
            router.push("/");
          }}
        >
          {idMessages.auth.googleCta}
        </Button>
      </form>

      <p className="border-t border-line-soft pt-4 type-small text-muted">
        {idMessages.auth.noAccountYet}{" "}
        <Link
          href="/register"
          className="font-semibold text-brick-deep underline decoration-2 underline-offset-4 hover:text-ink"
        >
          {idMessages.auth.registerLink}
        </Link>
      </p>
    </div>
  );
}

