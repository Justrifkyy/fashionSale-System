"use client";

import React from "react";
import { InputField, TextareaField } from "@/components/ui/FormFields";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/components/providers/StoreProvider";
import { idMessages } from "@/lib/i18n";

/**
 * Contact Page (P-013)
 */
export default function ContactPage() {
  const { showToast } = useStore();

  return (
    <div className="mx-auto max-w-[1360px] px-4 py-10 sm:px-6 lg:px-10 lg:py-16">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="type-h1 text-ink">
              {idMessages.info.contactHeading}
            </h1>
            <p className="type-body text-muted max-w-[60ch]">
              {idMessages.info.contactBody}
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              showToast(idMessages.info.contactSentToast, "success");
              e.currentTarget.reset();
            }}
            className="border-base bg-surface p-6 flex flex-col gap-4"
          >
            <InputField label={idMessages.auth.nameLabel} required />
            <InputField
              label={idMessages.auth.emailLabel}
              type="email"
              required
            />
            <TextareaField
              label={idMessages.info.contactMessageLabel}
              rows={5}
              required
            />
            <div className="pt-2">
              <Button type="submit" variant="primary">
                {idMessages.info.contactSendCta}
              </Button>
            </div>
          </form>
        </div>

        <aside className="lg:col-span-5 border-base bg-surface p-6 flex flex-col gap-4">
          <h2 className="type-h3 text-ink">
            {idMessages.info.storeHoursTitle}
          </h2>
          <dl className="flex flex-col gap-3 type-small">
            <div>
              <dt className="font-semibold text-ink">
                {idMessages.info.labelAddress}
              </dt>
              <dd className="text-muted">{idMessages.info.storeAddress}</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">
                {idMessages.info.labelHours}
              </dt>
              <dd className="text-muted">{idMessages.info.storeHours}</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">
                {idMessages.info.labelEmail}
              </dt>
              <dd className="text-muted">{idMessages.info.storeEmail}</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">
                {idMessages.info.labelWhatsapp}
              </dt>
              <dd className="tabular-nums text-muted">
                {idMessages.info.storeWhatsapp}
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
