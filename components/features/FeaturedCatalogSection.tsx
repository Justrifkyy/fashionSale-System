"use client";

import React, { useState } from "react";
import { ArrowUpRight, Flame, Grid3X3, LayoutGrid } from "lucide-react";
import { Product } from "@/lib/types/domain";
import { ProductLattice } from "@/components/features/ProductLattice";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

interface FeaturedCatalogSectionProps {
  products: Product[];
}

export function FeaturedCatalogSection({ products }: FeaturedCatalogSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [columns, setColumns] = useState<3 | 4>(4);

  const categories = [
    { slug: "all", name: "Semua Koleksi", count: products.length },
    {
      slug: "kemeja",
      name: "Kemeja Boxy",
      count: products.filter((p) => p.categorySlug === "kemeja").length,
    },
    {
      slug: "kaos",
      name: "Kaos 235 GSM",
      count: products.filter((p) => p.categorySlug === "kaos").length,
    },
    {
      slug: "celana",
      name: "Celana Twill",
      count: products.filter((p) => p.categorySlug === "celana").length,
    },
    {
      slug: "aksesori",
      name: "Aksesori",
      count: products.filter((p) => p.categorySlug === "aksesori").length,
    },
  ].filter((c) => c.slug === "all" || c.count > 0);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.categorySlug === selectedCategory);

  return (
    <div className="flex flex-col gap-8">
      {/* Header and Interactive Category Filter Switcher */}
      <div className="flex flex-col gap-6 border-b-base pb-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 border-base bg-page px-3 py-1 w-max">
              <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
              <span className="type-micro font-bold uppercase tracking-wider text-ink">
                LIVE PRODUCTION // DROP 01
              </span>
            </div>
            <h2 className="type-h2 text-ink">KOLEKSI TERBARU</h2>
            <p className="type-small text-muted max-w-[60ch]">
              Setiap artikel diproduksi dalam kuota terbatas 150 potong dengan jahitan rantai garmen
              dan katun tenun pilihan khas pesisir Makassar.
            </p>
          </div>

          {/* Quick Stats & Catalog Link */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 border border-ink bg-surface px-3 py-1.5 shadow-hard-sm">
              <Flame className="h-4 w-4 text-brick" />
              <span className="font-mono text-xs font-bold text-ink">
                BATCH 01 AKTIF • 150 PCS
              </span>
            </div>
            <ButtonLink href="/products" variant="text">
              <span>Buka Seluruh Katalog</span>
              <ArrowUpRight className="h-4 w-4 ml-1 inline-block" />
            </ButtonLink>
          </div>
        </div>

        {/* Filter Pills and Grid View Mode Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={cn(
                    "px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider border-base transition-all select-none flex items-center gap-2 pressable-hard",
                    isActive
                      ? "bg-ink text-surface shadow-hard scale-102 border-ink"
                      : "bg-surface text-ink hover:bg-page shadow-hard-sm"
                  )}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full transition-colors",
                      isActive ? "bg-gold" : "bg-line-soft"
                    )}
                  />
                  <span>{cat.name}</span>
                  <span className="font-mono text-[10px] opacity-70">
                    ({cat.count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* View Mode Switcher (Columns 3 vs 4 on Desktop) */}
          <div className="hidden lg:flex items-center border border-ink bg-surface shadow-hard-sm">
            <button
              type="button"
              onClick={() => setColumns(4)}
              title="Tampilan 4 Kolom"
              className={cn(
                "p-2 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors",
                columns === 4 ? "bg-ink text-surface" : "text-ink hover:bg-page"
              )}
            >
              <LayoutGrid className="h-4 w-4" />
              <span>4 KOLOM</span>
            </button>
            <button
              type="button"
              onClick={() => setColumns(3)}
              title="Tampilan 3 Kolom Besar"
              className={cn(
                "p-2 text-xs font-mono font-bold flex items-center gap-1.5 border-l border-ink transition-colors",
                columns === 3 ? "bg-ink text-surface" : "text-ink hover:bg-page"
              )}
            >
              <Grid3X3 className="h-4 w-4" />
              <span>3 KOLOM</span>
            </button>
          </div>
        </div>
      </div>

      {/* Product Lattice Grid with smooth transition */}
      <div className="min-h-[400px]">
        {filteredProducts.length > 0 ? (
          <ProductLattice
            products={filteredProducts}
            allowFeatured2x2={selectedCategory === "all" && columns === 4}
            columns={columns}
          />
        ) : (
          <div className="border-2 border-dashed border-ink/30 p-12 text-center bg-surface">
            <p className="type-body text-muted">
              Tidak ada produk pada kategori ini untuk saat ini.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Dispatch Status Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-base bg-surface p-4 sm:p-5 shadow-hard-sm">
        <div className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-success animate-pulse" />
          <span className="type-small font-bold text-ink">
            STOK BATCH 01 TERSEDIA UNTUK DIKIRIM HARI INI DARI HUB PAOTERE
          </span>
        </div>
        <ButtonLink href="/products" variant="secondary">
          Buka Katalog Lengkap (8 Artikel)
        </ButtonLink>
      </div>
    </div>
  );
}
