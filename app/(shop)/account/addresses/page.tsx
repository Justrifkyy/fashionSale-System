"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Overlay";
import { InputField } from "@/components/ui/FormFields";
import { useStore } from "@/components/providers/StoreProvider";
import { idMessages } from "@/lib/i18n";

export default function AccountAddressesPage() {
  const { showToast } = useStore();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="type-h2 text-ink">
          {idMessages.account.addressesHeading}
        </h1>
        <Button variant="primary" onClick={() => setModalOpen(true)}>
          {idMessages.account.addNewAddress}
        </Button>
      </div>

      <article className="border-base bg-surface p-5 flex flex-col gap-1.5 type-small">
        <div className="flex items-center gap-2">
          <span className="text-[16px] font-bold text-ink">Andi Tenri</span>
          <span className="border-base bg-page px-2 py-0.5 font-semibold">
            {idMessages.checkout.savedAddressBadge}
          </span>
        </div>
        <span className="tabular-nums text-muted">081241239876</span>
        <span>Jl. Pettarani No. 48, Blok B2</span>
        <span>Panakkukang, Makassar, Sulawesi Selatan 90231</span>
      </article>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={idMessages.account.addNewAddress}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setModalOpen(false);
            showToast(idMessages.checkout.addressSavedToast, "success");
          }}
          className="flex flex-col gap-4"
        >
          <InputField label={idMessages.checkout.recipientNameLabel} required />
          <InputField label={idMessages.checkout.phoneLabel} type="tel" required />
          <InputField label={idMessages.checkout.provinceCityLabel} required />
          <InputField label={idMessages.checkout.districtLabel} required />
          <InputField label={idMessages.checkout.postalCodeLabel} required />
          <InputField label={idMessages.checkout.addressLineLabel} required />
          <Button type="submit" variant="secondary">
            {idMessages.checkout.saveAddress}
          </Button>
        </form>
      </Modal>
    </div>
  );
}

