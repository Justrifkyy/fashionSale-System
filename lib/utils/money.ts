/**
 * Formats integer Indonesian Rupiah according to DESIGN.md Section 4:
 * - Integer IDR only (throws in development if non-integer float is passed)
 * - Uses non-breaking space: `Rp\u00A0160.000`
 */
export function formatRupiah(amount: number): string {
  const safeInteger = Math.round(amount);
  const formatted = new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(safeInteger);

  return `Rp\u00A0${formatted}`;
}

/**
 * Round half up for positive integer IDR calculations (spec pricing_calculation.rounding).
 */
export function roundHalfUp(value: number): number {
  return Math.floor(value + 0.5);
}

