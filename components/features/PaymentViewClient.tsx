"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Copy } from "lucide-react";
import { OrderRecord } from "@/lib/types/domain";
import { Button, ButtonLink } from "@/components/ui/Button";
import { StatusPill } from "@/components/ui/StatusPill";
import { useStore } from "@/components/providers/StoreProvider";
import { formatRupiah } from "@/lib/utils/money";
import { idMessages } from "@/lib/i18n";
import { cn } from "@/lib/utils/cn";

type PaymentPreviewState = "waiting" | "under2m" | "expired" | "failed";

/**
 * 15-Minute Payment Countdown & Instruction Client View (P-031 & P-074, DESIGN.md Section 9 & 12):
 * - Large h1 tabular countdown
 * - Under 2 minutes: `brick-deep` text + explicit sentence warning
 * - Screen reader announcement ONLY at 10m, 5m, 2m, and 0s milestones (Section 12)
 * - VA number with copy button + matching toast
 */
export function PaymentViewClient({ order }: { order: OrderRecord }) {
  const router = useRouter();
  const { showToast, clearCart } = useStore();

  const [previewState, setPreviewState] =
    useState<PaymentPreviewState>("waiting");
  const [secondsLeft, setSecondsLeft] = useState(14 * 60 + 52);
  const [srAnnouncement, setSrAnnouncement] = useState("");

  const isExpiredState = previewState === "expired" || secondsLeft <= 0;
  const isFailedState = previewState === "failed";

  useEffect(() => {
    if (isExpiredState || isFailedState) return;

    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => {
        const next = Math.max(0, prev - 1);
        if (next === 600) {
          setSrAnnouncement(idMessages.payment.sr10m);
        } else if (next === 300) {
          setSrAnnouncement(idMessages.payment.sr5m);
        } else if (next === 120) {
          setSrAnnouncement(idMessages.payment.underTwoMinutesWarning);
        } else if (next === 0) {
          setPreviewState("expired");
          setSrAnnouncement(idMessages.payment.expiredTitle);
        }
        return next;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isExpiredState, isFailedState]);

  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const secs = String(secondsLeft % 60).padStart(2, "0");
  const isUnderTwoMinutes = secondsLeft > 0 && secondsLeft < 120;

  const vaNumber = order.vaNumber ?? "8902208219988776";

  const handleCopyVa = async () => {
    try {
      await navigator.clipboard.writeText(vaNumber);
      showToast(idMessages.common.numberCopied, "success");
    } catch {
      showToast(idMessages.common.numberCopied, "success");
    }
  };

  return (
    <div className="mx-auto max-w-2xl flex flex-col gap-6">
      {/* Screen-reader milestone announcer (does NOT fire every second per Section 12) */}
      <div aria-live="assertive" className="sr-only">
        {srAnnouncement}
      </div>

      {/* Preview state switcher for inspecting P-031 & P-074 states */}
      <div className="flex flex-wrap items-center gap-2 border-base bg-surface p-3 type-small">
        <span className="font-semibold text-muted">
          {idMessages.payment.statePreviewLabel}
        </span>
        {(
          [
            { id: "waiting", label: idMessages.payment.stateWaiting },
            { id: "under2m", label: idMessages.payment.stateUnder2m },
            { id: "expired", label: idMessages.payment.stateExpired },
            { id: "failed", label: idMessages.payment.stateFailed },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              setPreviewState(tab.id);
              if (tab.id === "waiting") setSecondsLeft(14 * 60 + 45);
              if (tab.id === "under2m") setSecondsLeft(112);
              if (tab.id === "expired") setSecondsLeft(0);
            }}
            className={cn(
              "min-h-[36px] px-3 border-base font-semibold",
              previewState === tab.id
                ? "bg-ink text-surface"
                : "bg-surface text-ink hover:bg-page"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* EXPIRED STATE */}
      {isExpiredState && !isFailedState ? (
        <div className="border-strong bg-surface p-6 sm:p-8 flex flex-col gap-4">
          <StatusPill status="CANCELLED" className="w-fit" />
          <h1 className="type-h2 text-ink">{idMessages.payment.expiredTitle}</h1>
          <p className="type-body text-muted">{idMessages.payment.expiredBody}</p>
          <div className="pt-2">
            <ButtonLink href="/products" variant="primary">
              {idMessages.catalog.heading}
            </ButtonLink>
          </div>
        </div>
      ) : isFailedState ? (
        /* FAILED STATE */
        <div className="border-strong bg-surface p-6 sm:p-8 flex flex-col gap-4">
          <h1 className="type-h2 text-danger">
            {idMessages.payment.failedTitle}
          </h1>
          <p className="type-body text-muted">{idMessages.payment.failedBody}</p>
          <div className="pt-2">
            <ButtonLink href="/checkout" variant="primary">
              {idMessages.common.retry}
            </ButtonLink>
          </div>
        </div>
      ) : (
        /* WAITING / COUNTDOWN STATE */
        <div className="border-strong bg-surface p-6 sm:p-8 flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line-soft pb-4">
            <div>
              <span className="type-small text-muted">
                {idMessages.payment.orderNumberLabel}
              </span>
              <p className="font-bold tabular-nums text-ink">
                {order.orderNumber}
              </p>
            </div>
            <StatusPill status="PENDING_PAYMENT" />
          </div>

          {/* 15-Minute Countdown Block */}
          <div className="border-base bg-page p-5 flex flex-col gap-2">
            <span className="type-small font-semibold text-muted">
              {idMessages.payment.countdownLabel}
            </span>
            <p
              aria-hidden="true"
              className={cn(
                "type-h1 tabular-nums",
                isUnderTwoMinutes ? "text-brick-deep" : "text-ink"
              )}
            >
              {mins}:{secs}
            </p>
            {isUnderTwoMinutes && (
              <p className="flex items-center gap-2 type-small font-semibold text-brick-deep">
                <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{idMessages.payment.underTwoMinutesWarning}</span>
              </p>
            )}
          </div>

          {/* Virtual Account & Exact Amount */}
          <div className="flex flex-col gap-4">
            <div>
              <span className="type-small text-muted">
                {idMessages.payment.methodLabel}
              </span>
              <p className="font-bold text-ink">{order.paymentMethodLabel}</p>
            </div>

            <div className="border-base bg-surface p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="type-small text-muted">
                  {idMessages.payment.vaNumberLabel}
                </span>
                <p className="text-[22px] sm:text-[26px] font-bold tabular-nums tracking-wide text-ink">
                  {vaNumber}
                </p>
              </div>
              <Button variant="secondary" onClick={handleCopyVa}>
                <Copy className="h-4 w-4" aria-hidden="true" />
                <span>{idMessages.common.copyNumber}</span>
              </Button>
            </div>

            <div className="border-base bg-surface p-4 flex items-baseline justify-between">
              <span className="type-small text-muted">
                {idMessages.payment.amountToPayLabel}
              </span>
              <span className="text-[22px] font-bold tabular-nums text-ink">
                {formatRupiah(order.grandTotal)}
              </span>
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="border-t border-line-soft pt-4 flex flex-col gap-2">
            <h2 className="type-h4 text-ink">
              {idMessages.payment.instructionsHeading}
            </h2>
            <ol className="list-decimal pl-5 flex flex-col gap-1.5 type-small text-ink">
              <li>{idMessages.payment.instruction1}</li>
              <li>{idMessages.payment.instruction2}</li>
              <li>{idMessages.payment.instruction3}</li>
            </ol>
          </div>

          {/* Single Primary CTA on screen (simulate payment webhook confirmation in UI setup) */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              variant="primary"
              onClick={() => {
                clearCart();
                router.push(`/checkout/success/${order.orderNumber}`);
              }}
            >
              {idMessages.payment.simulatePaid}
            </Button>
            <ButtonLink
              href={`/account/orders/${order.orderNumber}`}
              variant="secondary"
            >
              {idMessages.payment.viewOrderDetail}
            </ButtonLink>
          </div>
        </div>
      )}
    </div>
  );
}
