import { roundHalfUp } from "@/lib/utils/money";

export type PaymentFeeRule =
  | { type: "FLAT"; value: number }
  | { type: "PERCENT"; basisPoints: number }; // e.g. 70 = 0.70%

export interface TaxConfig {
  enabled: boolean;
  mode: "INCLUSIVE" | "EXCLUSIVE";
  ratePercent: number;
  shippingTaxable: boolean;
}

export interface CalculateOrderTotalInput {
  items: Array<{ unitPrice: number; quantity: number }>;
  voucherDiscount?: number;
  shippingCost?: number;
  shippingDiscount?: number;
  paymentFeeRule?: PaymentFeeRule | null;
  taxConfig?: TaxConfig;
}

export interface OrderTotalBreakdown {
  subtotal: number;
  voucherDiscount: number;
  shippingCost: number;
  shippingDiscount: number;
  tax: number;
  paymentFee: number;
  grandTotal: number;
}

const DEFAULT_TAX_CONFIG: TaxConfig = {
  enabled: false,
  mode: "EXCLUSIVE",
  ratePercent: 11,
  shippingTaxable: false,
};

/**
 * Single source of truth for order totals (spec: pricing_calculation.single_source_of_truth).
 * All inputs and outputs are integer IDR.
 */
export function calculateOrderTotal(
  input: CalculateOrderTotalInput
): OrderTotalBreakdown {
  const subtotal = input.items.reduce(
    (sum, item) => sum + Math.round(item.unitPrice) * Math.round(item.quantity),
    0
  );

  const voucherDiscount = Math.min(
    Math.max(0, Math.round(input.voucherDiscount ?? 0)),
    subtotal
  );

  const shippingCost = Math.max(0, Math.round(input.shippingCost ?? 0));
  const shippingDiscount = Math.min(
    Math.max(0, Math.round(input.shippingDiscount ?? 0)),
    shippingCost
  );

  const taxConfig = input.taxConfig ?? DEFAULT_TAX_CONFIG;
  const netGoods = subtotal - voucherDiscount;
  const netShipping = shippingCost - shippingDiscount;
  const taxableBase = taxConfig.shippingTaxable
    ? netGoods + netShipping
    : netGoods;

  let tax = 0;
  if (taxConfig.enabled && taxConfig.ratePercent > 0) {
    if (taxConfig.mode === "EXCLUSIVE") {
      tax = roundHalfUp((taxableBase * taxConfig.ratePercent) / 100);
    } else {
      // Tax portion already embedded inside tax-inclusive price
      tax = roundHalfUp(
        (taxableBase * taxConfig.ratePercent) / (100 + taxConfig.ratePercent)
      );
    }
  }

  const baseBeforePaymentFee =
    netGoods +
    netShipping +
    (taxConfig.enabled && taxConfig.mode === "EXCLUSIVE" ? tax : 0);

  let paymentFee = 0;
  if (input.paymentFeeRule) {
    if (input.paymentFeeRule.type === "FLAT") {
      paymentFee = Math.max(0, Math.round(input.paymentFeeRule.value));
    } else {
      paymentFee = roundHalfUp(
        (baseBeforePaymentFee * input.paymentFeeRule.basisPoints) / 10000
      );
    }
  }

  const grandTotal = baseBeforePaymentFee + paymentFee;

  return {
    subtotal,
    voucherDiscount,
    shippingCost,
    shippingDiscount,
    tax,
    paymentFee,
    grandTotal,
  };
}

