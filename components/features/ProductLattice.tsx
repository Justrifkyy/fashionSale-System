import React from "react";
import { Product } from "@/lib/types/domain";
import { ProductCell } from "@/components/features/ProductCell";
import { cn } from "@/lib/utils/cn";

interface ProductLatticeProps {
  products: Product[];
  allowFeatured2x2?: boolean;
  columns?: 3 | 4;
  className?: string;
}

/**
 * Shared-border catalog lattice (DESIGN.md Section 6):
 * - 2 columns mobile, 3 tablet, 4 desktop (or 3 when beside desktop filter sidebar)
 * - At most ONE 2x2 featured cell per screen when `allowFeatured2x2` is enabled
 */
export function ProductLattice({
  products,
  allowFeatured2x2 = false,
  columns = 4,
  className,
}: ProductLatticeProps) {
  const featuredProductId = allowFeatured2x2
    ? (products.find((p) => p.isFeatured2x2)?.id ?? null)
    : null;

  return (
    <div
      className={cn(
        "lattice-grid grid grid-cols-2 sm:grid-cols-3",
        columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
        className
      )}
    >
      {products.map((product, index) => (
        <ProductCell
          key={product.id}
          product={product}
          featured2x2={product.id === featuredProductId}
          index={index}
        />
      ))}
    </div>
  );
}
