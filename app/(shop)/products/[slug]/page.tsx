import React from "react";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/Disclosure";
import { ProductDetailClient } from "@/components/features/ProductDetailClient";
import { ProductLattice } from "@/components/features/ProductLattice";
import {
  getProductBySlug,
  listProducts,
  listRelatedProducts,
  listSizeGuideRows,
} from "@/lib/services/catalogService";
import { idMessages } from "@/lib/i18n";

export function generateStaticParams() {
  return listProducts().map((p) => ({ slug: p.slug }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = listRelatedProducts(product.id, product.categoryId);
  const sizeGuideRows = listSizeGuideRows();

  return (
    <div className="mx-auto max-w-[1360px] px-4 pt-6 pb-24 sm:px-6 sm:pb-14 lg:px-10 lg:py-10">
      <Breadcrumb
        items={[
          { label: idMessages.catalog.breadcrumbHome, href: "/" },
          { label: idMessages.catalog.breadcrumbCatalog, href: "/products" },
          { label: product.name },
        ]}
      />

      <div className="mt-3">
        <ProductDetailClient product={product} sizeGuideRows={sizeGuideRows} />
      </div>

      {/* Related Products Lattice */}
      {related.length > 0 && (
        <section className="mt-16 border-t-base pt-12">
          <h2 className="type-h2 text-ink mb-6">
            {idMessages.product.relatedHeading}
          </h2>
          <ProductLattice products={related} columns={4} />
        </section>
      )}
    </div>
  );
}

