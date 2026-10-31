"use client";

import React, { useState } from "react";
import { CheckCircle2, Mic, Star } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface ReviewLog {
  id: string;
  handle: string;
  name: string;
  tag: string;
  category: "all" | "fabric" | "silhouette" | "logistics";
  audioLength: string;
  location: string;
  itemPurchased: string;
  quote: string;
  rating: number;
  date: string;
}

const REVIEWS: ReviewLog[] = [
  {
    id: "rev-1",
    handle: "@adityamks",
    name: "Aditya Rahman",
    tag: "SKENA PAOTERE",
    category: "fabric",
    audioLength: "01:14",
    location: "Dermaga Paotere",
    itemPurchased: "Kaos Heavyweight 235 GSM (L)",
    quote:
      "Bahan kaosnya juara, tebal 235 gsm tapi tetap adem dipake keliling Losari sore-sore. Rib lehernya tebal dan gak melar sama sekali walau udah 8x dicuci mesin. Terbaik!",
    rating: 5,
    date: "28 OKT 2026",
  },
  {
    id: "rev-2",
    handle: "@fajar_skena",
    name: "Fajar Pratama",
    tag: "STREETWEAR MKS",
    category: "silhouette",
    audioLength: "00:52",
    location: "Panakkukang",
    itemPurchased: "Kemeja Boxy Katun Pesisir (XL)",
    quote:
      "Cutting boxy-nya pas banget di badan, bahu turunnya proporsional gak kebesaran aneh. Detail jahitannya rapi standar garmen internasional. Bangga produk lokal Makassar!",
    rating: 5,
    date: "26 OKT 2026",
  },
  {
    id: "rev-3",
    handle: "@rizky_f",
    name: "Rizky Fadillah",
    tag: "COMMUNITY HUB",
    category: "logistics",
    audioLength: "01:38",
    location: "Somba Opu",
    itemPurchased: "Chino Longgar Losari (32)",
    quote:
      "Chino twill-nya kokoh dan fleksibel buat harian. Pengiriman dari hub Paotere beneran cuma satu hari langsung sampai ke Somba Opu. Packaging kardusnya juga tebal dan ada barcode tag.",
    rating: 5,
    date: "24 OKT 2026",
  },
  {
    id: "rev-4",
    handle: "@andi_losari",
    name: "Andi Tenri",
    tag: "CREATIVE ATELIER",
    category: "silhouette",
    audioLength: "00:46",
    location: "Ujung Pandang",
    itemPurchased: "Setelan Gold Street Casual",
    quote:
      "Warna gold street dan katun tenunnya unik banget! Belum pernah nemu brand lokal yang berani bawa identitas tenun Sulawesi Selatan ke ranah brutalist streetwear se-catchy ini.",
    rating: 5,
    date: "22 OKT 2026",
  },
];

export function CommunityVoiceSection() {
  const [filter, setFilter] = useState<"all" | "fabric" | "silhouette" | "logistics">("all");
  const [playingId, setPlayingId] = useState<string | null>("rev-1");

  const filteredReviews = filter === "all" ? REVIEWS : REVIEWS.filter((r) => r.category === filter);

  return (
    <div className="flex flex-col gap-8">
      {/* Section Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b-base pb-6">
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 border-base bg-page px-3 py-1 w-max">
            <Mic className="h-4 w-4 text-brick" />
            <span className="type-micro font-bold uppercase tracking-wider text-ink">
              SUARA DARI JALANAN MAKASSAR
            </span>
          </div>
          <h2 className="type-h2 text-ink">SUARA SKENA MAKASSAR</h2>
          <p className="type-small text-muted max-w-[65ch]">
            Dokumentasi suara dan ulasan langsung dari pembeli terverifikasi yang mengenakan
            koleksi Care Care di sekeliling sudut kota Makassar.
          </p>
        </div>

        {/* Rating Meter */}
        <div className="border-2 border-ink bg-surface p-3 flex items-center gap-3 shadow-hard-sm">
          <div className="flex gap-0.5 text-gold">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-gold text-gold" />
            ))}
          </div>
          <div className="border-l border-line-soft pl-3 text-right">
            <p className="font-mono text-sm font-black text-ink">4.92 / 5.0</p>
            <p className="font-mono text-[10px] text-muted">DARI 120+ ULASAN</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { key: "all", label: "SEMUA ULASAN (120+)" },
          { key: "fabric", label: "KATUN 235 GSM (54)" },
          { key: "silhouette", label: "POLA BOXY (42)" },
          { key: "logistics", label: "LOGISTIK PAOTERE (24)" },
        ].map((tab) => {
          const isActive = filter === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilter(tab.key as ReviewLog["category"])}
              className={cn(
                "px-3.5 py-1.5 text-xs font-mono font-bold uppercase border-base transition-all select-none pressable-hard",
                isActive
                  ? "bg-ink text-surface shadow-hard border-ink"
                  : "bg-surface text-ink hover:bg-page shadow-hard-sm"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Reviews Lattice Grid */}
      <div className="lattice-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {filteredReviews.map((rev) => {
          const isPlaying = playingId === rev.id;

          return (
            <div
              key={rev.id}
              onClick={() => setPlayingId(isPlaying ? null : rev.id)}
              className={cn(
                "lattice-cell group flex flex-col justify-between bg-surface p-5 transition-all cursor-pointer select-none",
                isPlaying ? "bg-page/90 shadow-hard" : "hover:bg-page/50"
              )}
            >
              {/* Card Audio Cassette Header */}
              <div className="flex items-center justify-between border-b border-line-soft pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "flex h-6 w-6 items-center justify-center border border-ink text-xs font-mono font-black",
                      isPlaying ? "bg-brick text-surface animate-pulse" : "bg-gold text-ink"
                    )}
                  >
                    ▶
                  </span>
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] font-black text-ink uppercase">
                      VOICE MEMO #{rev.id.toUpperCase()}
                    </span>
                    <span className="font-mono text-[8px] text-muted">
                      {rev.location}
                    </span>
                  </div>
                </div>

                {/* Animated Waveform Bars */}
                <div className="flex items-end gap-0.5 h-3">
                  <span className={cn("w-0.5 bg-brick", isPlaying ? "h-3 animate-pulse" : "h-1")} />
                  <span className={cn("w-0.5 bg-ink", isPlaying ? "h-2 animate-pulse delay-75" : "h-1.5")} />
                  <span className={cn("w-0.5 bg-gold", isPlaying ? "h-3 animate-pulse delay-150" : "h-2")} />
                  <span className={cn("w-0.5 bg-brick", isPlaying ? "h-1.5 animate-pulse delay-100" : "h-1")} />
                </div>
              </div>

              {/* Quote Body */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1 text-gold">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                  ))}
                </div>

                <p className="type-small text-ink italic leading-relaxed">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              {/* Item Tag & Reviewer Metadata */}
              <div className="pt-4 border-t border-line-soft flex flex-col gap-2 mt-4">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-muted">ARTIKEL:</span>
                  <span className="font-bold text-ink truncate max-w-[130px]">
                    {rev.itemPurchased}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <p className="text-xs font-bold text-ink leading-none">
                      {rev.name}
                    </p>
                    <p className="text-[10px] font-mono text-muted">
                      {rev.handle}
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold text-success bg-page px-1.5 py-0.5 border border-line-soft">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>VERIFIED</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

