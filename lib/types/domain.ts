export type ProductBadge =
  | "NEW"
  | "BESTSELLER"
  | "TRENDING"
  | "HOT_DROP"
  | "SALE"
  | "SOLD_OUT";

export type ProductStatus = "DRAFT" | "ACTIVE" | "ARCHIVED";

export type OrderStatusCode =
  | "PENDING_PAYMENT"
  | "PROCESSING"
  | "SHIPPED"
  | "COMPLETED"
  | "CANCELLED"
  | "RETURN";

export type PaymentStatusCode =
  | "UNPAID"
  | "PAID"
  | "EXPIRED"
  | "FAILED"
  | "PAID_AFTER_EXPIRY"
  | "REFUND_PENDING"
  | "REFUNDED"
  | "PARTIALLY_REFUNDED";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  sortOrder: number;
  isActive: boolean;
  accentBlock: "ink" | "brick" | "brick-deep" | "photo";
  imageUrl: string | null;
  imageAlt: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  size: string;
  color: string;
  colorHex: string;
  price: number; // Integer IDR
  compareAtPrice: number | null; // Integer IDR
  stock: number; // Integer >= 0
  weightGram: number; // Required for Biteship shipping rates
  isActive: boolean;
}

export interface ProductImage {
  id: string;
  url: string | null;
  alt: string;
  label: string;
  swatchHex: string;
  sortOrder: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  materialNote: string;
  categoryId: string;
  categorySlug: string;
  categoryName: string;
  status: ProductStatus;
  badge: Exclude<ProductBadge, "SOLD_OUT"> | null;
  isFeatured2x2?: boolean;
  isFinalSale: boolean;
  isReturnable: boolean;
  images: ProductImage[];
  variants: ProductVariant[];
}

export interface OrderItemSnapshot {
  id: string;
  variantId: string;
  productNameSnapshot: string;
  variantLabelSnapshot: string;
  skuSnapshot: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
  weightGram: number;
  swatchHex: string;
  imageSnapshot: string | null;
}

export interface ShipmentTimelineEvent {
  id: string;
  status: string;
  note: string;
  occurredAt: string;
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: OrderStatusCode;
  paymentStatus: PaymentStatusCode;
  paymentMethodLabel: string;
  vaNumber: string | null;
  courierLabel: string;
  waybillId: string | null;
  addressLine: string;
  districtCityProvince: string;
  postalCode: string;
  subtotal: number;
  voucherDiscount: number;
  shippingCost: number;
  shippingDiscount: number;
  taxAmount: number;
  paymentFee: number;
  grandTotal: number;
  createdAt: string;
  expiresAt: string;
  items: OrderItemSnapshot[];
  timeline: ShipmentTimelineEvent[];
}

export interface FaqEntry {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface SizeGuideRow {
  size: string;
  chestCm: number;
  lengthCm: number;
  shoulderCm: number;
}

/**
 * Derives total stock from active variants (spec: business_rules.products.stock_level).
 */
export function getProductTotalStock(product: Product): number {
  return product.variants
    .filter((v) => v.isActive)
    .reduce((sum, v) => sum + v.stock, 0);
}

/**
 * Resolves the single allowed product badge.
 * SOLD_OUT always overrides any admin-chosen badge (spec: brand.design_style.badge_rule).
 */
export function resolveProductBadge(product: Product): ProductBadge | null {
  const totalStock = getProductTotalStock(product);
  if (totalStock <= 0) {
    return "SOLD_OUT";
  }
  return product.badge;
}

/**
 * Returns the lowest active variant price and optional compare-at price for catalog display.
 */
export function getProductDisplayPrice(product: Product): {
  price: number;
  compareAtPrice: number | null;
} {
  const active = product.variants.filter((v) => v.isActive);
  const first = active[0] ?? product.variants[0];
  if (!first) {
    return { price: 0, compareAtPrice: null };
  }
  return active.reduce(
    (best, current) =>
      current.price < best.price
        ? { price: current.price, compareAtPrice: current.compareAtPrice }
        : best,
    { price: first.price, compareAtPrice: first.compareAtPrice }
  );
}

