"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/components/providers/StoreProvider";
import { calculateOrderTotal, PaymentFeeRule } from "@/lib/pricing/calculateOrderTotal";
import { formatRupiah } from "@/lib/utils/money";
import { Button } from "@/components/ui/Button";
import { InputField } from "@/components/ui/FormFields";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatMessage, idMessages } from "@/lib/i18n";
import { cn } from "@/lib/utils/cn";

interface CourierOption {
  id: string;
  name: string;
  eta: string;
  costPerKg: number;
}

interface PaymentOption {
  id: string;
  name: string;
  feeRule: PaymentFeeRule;
}

const COURIER_OPTIONS: CourierOption[] = [
  { id: "jne-reg", name: "JNE Reguler", eta: "2 sampai 3 hari", costPerKg: 24000 },
  { id: "sicepat-reg", name: "SiCepat REG", eta: "2 sampai 4 hari", costPerKg: 22000 },
  { id: "jnt-ez", name: "J&T Express EZ", eta: "2 sampai 3 hari", costPerKg: 25000 },
];

const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    id: "va-bca",
    name: "Virtual Account BCA",
    feeRule: { type: "FLAT", value: 4000 },
  },
  {
    id: "va-mandiri",
    name: "Virtual Account Mandiri",
    feeRule: { type: "FLAT", value: 4000 },
  },
  {
    id: "qris",
    name: "QRIS (semua aplikasi bank dan e-wallet)",
    feeRule: { type: "PERCENT", basisPoints: 70 },
  },
  {
    id: "gopay",
    name: "GoPay",
    feeRule: { type: "PERCENT", basisPoints: 200 },
  },
];

/**
 * Checkout Page (P-030, DESIGN.md Section 6 & 10):
 * - Three sequential numbered steps (1 Alamat, 2 Pengiriman, 3 Pembayaran)
 * - Buyer-paid payment fee visible per option AND in the ledger before paying
 * - Grand total inside chamfered `ink` block (approved chamfer location #2)
 */
export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, showToast } = useStore();

  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [recipientName, setRecipientName] = useState("Andi Tenri");
  const [phone, setPhone] = useState("081241239876");
  const [provinceCity, setProvinceCity] = useState("Makassar, Sulawesi Selatan");
  const [district, setDistrict] = useState("Panakkukang");
  const [postalCode, setPostalCode] = useState("90231");
  const [addressLine, setAddressLine] = useState("Jl. Pettarani No. 48, Blok B2");
  const [addressNotes, setAddressNotes] = useState("");

  const [selectedCourierId, setSelectedCourierId] = useState(
    COURIER_OPTIONS[0].id
  );
  const [selectedPaymentId, setSelectedPaymentId] = useState(
    PAYMENT_OPTIONS[0].id
  );

  // Compute chargeable shipping weight (min 1000g per spec business_rules.shipping.weight_rules)
  const totalWeightGram = useMemo(() => {
    const itemsWeight = cartItems.reduce(
      (sum, item) => sum + item.weightGram * item.quantity,
      0
    );
    const packagingGram = 100;
    return Math.max(1000, itemsWeight + packagingGram);
  }, [cartItems]);

  const chargeableKg = Math.max(1, Math.ceil(totalWeightGram / 1000));

  const selectedCourier =
    COURIER_OPTIONS.find((c) => c.id === selectedCourierId) ??
    COURIER_OPTIONS[0];
  const selectedPayment =
    PAYMENT_OPTIONS.find((p) => p.id === selectedPaymentId) ??
    PAYMENT_OPTIONS[0];

  const shippingCost = selectedCourier.costPerKg * chargeableKg;

  const totals = useMemo(
    () =>
      calculateOrderTotal({
        items: cartItems.map((i) => ({
          unitPrice: i.unitPrice,
          quantity: i.quantity,
        })),
        shippingCost,
        paymentFeeRule: selectedPayment.feeRule,
      }),
    [cartItems, selectedPayment.feeRule, shippingCost]
  );

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-[1360px] px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
        <h1 className="type-h1 text-ink mb-6">{idMessages.checkout.heading}</h1>
        <EmptyState
          title={idMessages.checkout.emptyCheckoutTitle}
          description={idMessages.checkout.emptyCheckoutBody}
          actionLabel={idMessages.checkout.emptyCheckoutAction}
          actionHref="/products"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1360px] px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <h1 className="type-h1 text-ink mb-8">{idMessages.checkout.heading}</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        {/* Left: 3 Sequential Numbered Steps */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* STEP 1: ADDRESS */}
          <section className="border-base bg-surface p-5 sm:p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3 border-b border-line-soft pb-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center bg-ink text-surface font-bold tabular-nums">
                  1
                </span>
                <h2 className="type-h3 text-ink">
                  {idMessages.checkout.step1Title}
                </h2>
              </div>
              {!isEditingAddress && (
                <Button
                  variant="text"
                  onClick={() => setIsEditingAddress(true)}
                  className="type-small"
                >
                  {idMessages.checkout.changeAddress}
                </Button>
              )}
            </div>

            {!isEditingAddress ? (
              <div className="flex flex-col gap-1 type-small text-ink">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[16px]">{recipientName}</span>
                  <span className="border-base bg-page px-2 py-0.5 font-semibold">
                    {idMessages.checkout.savedAddressBadge}
                  </span>
                </div>
                <span className="tabular-nums text-muted">{phone}</span>
                <span>{addressLine}</span>
                <span>
                  {district}, {provinceCity} {postalCode}
                </span>
                {addressNotes && (
                  <span className="text-muted">{addressNotes}</span>
                )}
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsEditingAddress(false);
                  showToast(idMessages.checkout.addressSavedToast, "success");
                }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <InputField
                  label={idMessages.checkout.recipientNameLabel}
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  required
                />
                <InputField
                  label={idMessages.checkout.phoneLabel}
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <InputField
                  label={idMessages.checkout.provinceCityLabel}
                  value={provinceCity}
                  onChange={(e) => setProvinceCity(e.target.value)}
                  required
                />
                <InputField
                  label={idMessages.checkout.districtLabel}
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  required
                />
                <InputField
                  label={idMessages.checkout.postalCodeLabel}
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                />
                <InputField
                  label={idMessages.checkout.addressNotesLabel}
                  value={addressNotes}
                  onChange={(e) => setAddressNotes(e.target.value)}
                />
                <div className="sm:col-span-2">
                  <InputField
                    label={idMessages.checkout.addressLineLabel}
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                    required
                  />
                </div>
                <div className="sm:col-span-2 flex gap-3 pt-1">
                  <Button type="submit" variant="secondary">
                    {idMessages.checkout.saveAddress}
                  </Button>
                </div>
              </form>
            )}
          </section>

          {/* STEP 2: SHIPPING */}
          <section className="border-base bg-surface p-5 sm:p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3 border-b border-line-soft pb-3">
              <span className="flex h-8 w-8 items-center justify-center bg-ink text-surface font-bold tabular-nums">
                2
              </span>
              <h2 className="type-h3 text-ink">
                {idMessages.checkout.step2Title}
              </h2>
            </div>

            <div
              role="radiogroup"
              aria-label={idMessages.checkout.step2Title}
              className="flex flex-col gap-2.5"
            >
              {COURIER_OPTIONS.map((courier) => {
                const selected = courier.id === selectedCourierId;
                const cost = courier.costPerKg * chargeableKg;
                return (
                  <button
                    key={courier.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setSelectedCourierId(courier.id)}
                    className={cn(
                      "flex min-h-[60px] w-full items-center justify-between gap-4 p-4 text-left",
                      selected
                        ? "border-strong bg-page"
                        : "border-base bg-surface hover:bg-page"
                    )}
                  >
                    <div className="flex flex-col">
                      <span className="font-bold text-ink">{courier.name}</span>
                      <span className="type-small text-muted">
                        {formatMessage(idMessages.checkout.courierEta, {
                          eta: courier.eta,
                        })}
                      </span>
                    </div>
                    <span className="font-bold tabular-nums text-ink">
                      {formatRupiah(cost)}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* STEP 3: PAYMENT METHOD WITH EXPLICIT BUYER FEE */}
          <section className="border-base bg-surface p-5 sm:p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3 border-b border-line-soft pb-3">
              <span className="flex h-8 w-8 items-center justify-center bg-ink text-surface font-bold tabular-nums">
                3
              </span>
              <h2 className="type-h3 text-ink">
                {idMessages.checkout.step3Title}
              </h2>
            </div>

            <div
              role="radiogroup"
              aria-label={idMessages.checkout.step3Title}
              className="flex flex-col gap-2.5"
            >
              {PAYMENT_OPTIONS.map((method) => {
                const selected = method.id === selectedPaymentId;
                const previewBreakdown = calculateOrderTotal({
                  items: cartItems.map((i) => ({
                    unitPrice: i.unitPrice,
                    quantity: i.quantity,
                  })),
                  shippingCost,
                  paymentFeeRule: method.feeRule,
                });

                return (
                  <button
                    key={method.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setSelectedPaymentId(method.id)}
                    className={cn(
                      "flex min-h-[60px] w-full items-center justify-between gap-4 p-4 text-left",
                      selected
                        ? "border-strong bg-page"
                        : "border-base bg-surface hover:bg-page"
                    )}
                  >
                    <span className="font-bold text-ink">{method.name}</span>
                    <span className="type-small font-semibold tabular-nums text-muted">
                      {previewBreakdown.paymentFee > 0
                        ? formatMessage(idMessages.checkout.paymentFeeLabel, {
                            fee: formatRupiah(previewBreakdown.paymentFee),
                          })
                        : idMessages.checkout.paymentNoFee}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right: Ledger Order Summary + Chamfered Ink Total Block */}
        <aside className="lg:col-span-5 lg:sticky lg:top-[88px] border-strong bg-surface p-5 sm:p-6 flex flex-col gap-5">
          <h2 className="type-h3 text-ink border-b border-line-soft pb-3">
            {idMessages.checkout.summaryHeading}
          </h2>

          <ul className="divide-y divide-line-soft">
            {cartItems.map((item) => (
              <li
                key={item.variantId}
                className="flex items-start justify-between gap-3 py-2.5 type-small"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-ink">
                    {item.productName} ({item.quantity}x)
                  </span>
                  <span className="text-muted">
                    {item.color}, {item.size}
                  </span>
                </div>
                <span className="font-semibold tabular-nums text-ink">
                  {formatRupiah(item.unitPrice * item.quantity)}
                </span>
              </li>
            ))}
          </ul>

          {/* Ledger Cost Breakdown */}
          <dl className="flex flex-col gap-2.5 border-t border-line-soft pt-4 type-small">
            <div className="flex justify-between">
              <dt className="text-muted">{idMessages.checkout.subtotal}</dt>
              <dd className="font-semibold tabular-nums text-ink">
                {formatRupiah(totals.subtotal)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">{idMessages.checkout.discount}</dt>
              <dd className="font-semibold tabular-nums text-ink">
                {formatRupiah(totals.voucherDiscount)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">{idMessages.checkout.shippingCost}</dt>
              <dd className="font-semibold tabular-nums text-ink">
                {formatRupiah(totals.shippingCost)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">{idMessages.checkout.paymentFee}</dt>
              <dd className="font-semibold tabular-nums text-ink">
                {formatRupiah(totals.paymentFee)}
              </dd>
            </div>
          </dl>

          {/* Approved chamfer location #2: Checkout Total Payment Block (`ink` block) */}
          <div className="cut-frame">
            <div className="cut-inner-ink p-4 sm:p-5 flex items-baseline justify-between gap-4">
              <span className="font-semibold text-surface">
                {idMessages.checkout.grandTotal}
              </span>
              <span className="text-[22px] sm:text-[26px] font-bold tabular-nums text-gold">
                {formatRupiah(totals.grandTotal)}
              </span>
            </div>
          </div>

          <p className="type-small text-muted">
            {idMessages.checkout.paymentWindowNote}
          </p>

          <Button
            variant="primary"
            fullWidth
            onClick={() => router.push("/checkout/payment/MG-261030-W9T1")}
          >
            {idMessages.checkout.payNowCta}
          </Button>
        </aside>
      </div>
    </div>
  );
}

