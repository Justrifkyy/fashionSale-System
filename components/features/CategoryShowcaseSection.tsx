"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Layers, Sparkles } from "lucide-react";
import { Category } from "@/lib/types/domain";
import { cn } from "@/lib/utils/cn";

interface CategoryShowcaseSectionProps {
  categories: Category[];
}

const CATEGORY_SPECS: Record<
  string,
  {
    code: string;
    fabric: string;
    density: string;
    dots: number;
    silhouette: string;
    badge: string;
  }
> = {
  kemeja: {
    code: "ART.01-KMJ",
    fabric: "100% Katun Poplin Tenun",
    density: "185 GSM",
    dots: 3,
    silhouette: "Boxy Relaxed Cut",
    badge: "KERAH TERBUKA",
  },
  kaos: {
    code: "ART.02-KOS",
    fabric: "100% Combed 16s Ring-Spun",
    density: "235 GSM",
    dots: 5,
    silhouette: "Drop Shoulder Heavy",
    badge: "RIB GANDA 30MM",
  },
  celana: {
    code: "ART.03-CLN",
    fabric: "Katun Twill Pesisir",
    density: "260 GSM",
    dots: 5,
    silhouette: "Loose Straight Cut",
    badge: "BAR-TACK REINFORCED",
  },
  aksesori: {
    code: "ART.04-AKS",
    fabric: "Heavy Cotton Canvas",
    density: "320 GSM",
    dots: 4,
    silhouette: "Industrial Tailoring",
    badge: "HARDWARE RESIN",
  },
};

export function CategoryShowcaseSection({ categories }: CategoryShowcaseSectionProps) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-8">
      {/* Header with live category counter */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b-base pb-6">
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 border-base bg-page px-3 py-1 w-max">
            <span className="h-2 w-2 bg-brick border border-ink" />
            <span className="type-micro font-bold uppercase tracking-wider text-ink">
              KABINET ARSIP // DROP 01
            </span>
          </div>
          <h2 className="type-h2 text-ink">KATEGORI PILIHAN</h2>
          <p className="type-small text-muted max-w-[60ch]">
            Empat kategori inti dirancang dari riset pakaian iklim pesisir tropis Makassar:
            gramasi tebal, serat dingin, dan siluet boxy bebas gerak.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 border border-ink bg-surface px-3 py-1.5 shadow-hard-sm">
            <Layers className="h-4 w-4 text-brick" />
            <span className="font-mono text-xs font-bold text-ink">
              4 ARTIKEL UTAMA TERSEDIA
            </span>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 font-bold text-sm text-brick hover:text-ink transition-colors underline decoration-2 underline-offset-4"
          >
            <span>Buka Semua Katalog</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* 4 Interactive Atelier Specimen Cards */}
      <div className="lattice-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat, idx) => {
          const spec = CATEGORY_SPECS[cat.slug] || {
            code: `ART.0${idx + 1}`,
            fabric: "100% Katun Pilihan",
            density: "200 GSM",
            dots: 4,
            silhouette: "Boxy Regular",
            badge: "ORIGINAL",
          };
          const isHovered = hoveredSlug === cat.slug;

          return (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              onMouseEnter={() => setHoveredSlug(cat.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
              className="lattice-cell group relative flex flex-col justify-between bg-surface p-4 sm:p-5 transition-all duration-300 hover:bg-page hover:shadow-hard select-none"
            >
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between border-b border-line-soft pb-2 mb-3">
                <span className="font-mono text-[10px] font-black text-brick bg-page px-1.5 py-0.5 border border-line-soft">
                  {spec.code}
                </span>
                <span className="font-mono text-[10px] font-bold text-ink">
                  0{idx + 1} {"/ 04"}
                </span>
              </div>

              {/* Photo Frame with Dual Angle Reveal */}
              <div className="relative aspect-[4/3] w-full overflow-hidden border-base bg-photo mb-3">
                {cat.imageUrl && (
                  <Image
                    src={cat.imageUrl}
                    alt={cat.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className={cn(
                      "object-cover transition-transform duration-700 ease-out",
                      isHovered ? "scale-110" : "scale-100"
                    )}
                  />
                )}

                {/* Floating Architectural Badge */}
                <div className="absolute top-2 left-2 z-10 border border-ink bg-surface px-2 py-0.5 shadow-hard-sm">
                  <span className="text-[10px] font-mono font-black uppercase text-ink">
                    {spec.badge}
                  </span>
                </div>

                {/* Hover CTA Indicator */}
                <div
                  className={cn(
                    "absolute bottom-2 right-2 z-10 border border-ink bg-ink text-surface p-1.5 transition-transform duration-200",
                    isHovered ? "translate-x-0 translate-y-0 opacity-100" : "translate-x-2 translate-y-2 opacity-0"
                  )}
                >
                  <ArrowUpRight className="h-4 w-4 text-gold" />
                </div>
              </div>

              {/* Category Info */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h3 className="type-h3 text-ink group-hover:text-brick-deep transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-xs font-mono font-bold text-muted">
                    {spec.density}
                  </span>
                </div>

                <p className="type-small text-muted line-clamp-2 leading-snug">
                  {cat.description}
                </p>

                {/* Material & Density Gauge */}
                <div className="pt-3 border-t border-line-soft flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-muted">MATERIAL:</span>
                    <span className="font-bold text-ink truncate max-w-[130px]">
                      {spec.fabric}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-muted">DENSITY:</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((dot) => (
                        <span
                          key={dot}
                          className={cn(
                            "h-1.5 w-1.5 border border-ink",
                            dot <= spec.dots ? "bg-gold" : "bg-line-soft"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Spring Hover Button */}
                <div className="mt-2 pt-2 border-t border-line-soft flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-brick group-hover:underline">
                    LIHAT ARTIKEL →
                  </span>
                  <Sparkles className="h-3 w-3 text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

