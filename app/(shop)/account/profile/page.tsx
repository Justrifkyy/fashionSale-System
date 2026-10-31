"use client";

import React, { useState } from "react";
import { InputField } from "@/components/ui/FormFields";
import { Button } from "@/components/ui/Button";
import { useStore } from "@/components/providers/StoreProvider";
import { idMessages } from "@/lib/i18n";

export default function AccountProfilePage() {
  const { showToast } = useStore();
  const [name, setName] = useState("Andi Tenri");
  const [email, setEmail] = useState("tenri@contoh.id");
  const [phone, setPhone] = useState("081241239876");

  return (
    <div className="flex flex-col gap-6">
      <h1 className="type-h2 text-ink">{idMessages.account.profileHeading}</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          showToast(idMessages.account.profileSavedToast, "success");
        }}
        className="border-base bg-surface p-5 sm:p-6 flex flex-col gap-4 max-w-xl"
      >
        <InputField
          label={idMessages.auth.nameLabel}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <InputField
          label={idMessages.auth.emailLabel}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputField
          label={idMessages.auth.phoneLabel}
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <div className="pt-2">
          <Button type="submit" variant="primary">
            {idMessages.account.saveProfile}
          </Button>
        </div>
      </form>

      <section className="border-base bg-surface p-5 sm:p-6 flex flex-col gap-2 max-w-xl">
        <h2 className="type-h4 text-ink">
          {idMessages.account.privacySectionHeading}
        </h2>
        <p className="type-small text-muted">
          {idMessages.account.privacySectionBody}
        </p>
      </section>
    </div>
  );
}

