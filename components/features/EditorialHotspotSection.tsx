"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Flame, Volume2 } from "lucide-react";
import { DEMO_IMAGES } from "@/lib/services/demoImages";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

interface HotspotItem {
  id: string;
  name: string;
  category: string;
  price: string;
  fabric: string;
  slug: string;
  topPercent: number;
  leftPercent: number;
}

const LOOK_HOTSPOTS: HotspotItem[] = [
  {
    id: "spot-1",
    name: "Topi Kanvas 5-Panel MG",
    category: "AKSESORI",
    price: "Rp 120.000",
    fabric: "Heavy Cotton Canvas 320 GSM",
    slug: "topi-kanvas-5-panel-paotere",
    topPercent: 22,
    leftPercent: 54,
  },
  {
    id: "spot-2",
    name: "Kaos Heavyweight Paotere",
    category: "KAOS",
    price: "Rp 160.000",
    fabric: "100% Combed 16s • 235 GSM",
    slug: "kaos-heavyweight-paotere",
    topPercent: 44,
    leftPercent: 48,
  },
  {
    id: "spot-3",
    name: "Chino Longgar Losari",
    category: "CELANA",
    price: "Rp 280.000",
    fabric: "Katun Twill Pesisir • 260 GSM",
    slug: "chino-longgar-losari",
    topPercent: 78,
    leftPercent: 52,
  },
];

export function EditorialHotspotSection() {
  const [activeSpotId, setActiveSpotId] = useState<string>("spot-2");

  const activeSpot = LOOK_HOTSPOTS.find((s) => s.id === activeSpotId) || LOOK_HOTSPOTS[1];

  return (
    <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20 select-none">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
        
        {/* Left Column: Editorial Headline & Soundscape Player */}
        <div className="flex flex-col items-start gap-6 lg:col-span-6">
          
          {/* Top Live Ticker Tag */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 border border-surface/30 bg-surface/10 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-gold">
                EDISI PESISIR MAKASSAR // BATCH 01
              </span>
            </div>
            
            {/* Ambient Soundscape Visualizer Bar */}
            <div className="flex items-center gap-2 border border-surface/20 bg-surface/5 px-2.5 py-1 text-[11px] font-mono text-surface/80">
              <Volume2 className="h-3.5 w-3.5 text-brick shrink-0" />
              <span className="hidden sm:inline">LOSARI SORE VIBE</span>
              <div className="flex items-end gap-0.5 h-3">
                <span className="w-1 bg-gold h-2 animate-pulse" />
                <span className="w-1 bg-brick h-3 animate-pulse delay-75" />
                <span className="w-1 bg-surface h-1.5 animate-pulse delay-150" />
                <span className="w-1 bg-gold h-3 animate-pulse delay-100" />
              </div>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase font-display text-surface leading-[0.96] tracking-tight">
            PAKAIAN HARIAN DARI SUDUT PESISIR MAKASSAR
          </h2>

          <p className="type-body text-surface/80 max-w-[55ch] leading-relaxed">
            Dibuat terbatas hanya 150 potong per artikel untuk menjaga eksklusivitas dan ketelitian jahitan.
            Memadukan tradisi tenun katun Sulawesi Selatan dengan siluet boxy kontemporer yang tahan uji
            di bawah terik matahari dermaga Paotere.
          </p>

          {/* Quota Progress Gauge */}
          <div className="w-full border border-surface/20 bg-surface/5 p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-mono font-bold">
              <span className="flex items-center gap-1.5 text-gold">
                <Flame className="h-3.5 w-3.5" />
                <span>KUOTA RILIS BATCH 01 TERPASANG</span>
              </span>
              <span className="text-surface font-black">112 / 150 PCS KELUAR</span>
            </div>
            <div className="w-full h-2.5 bg-surface/20 border border-surface/30 overflow-hidden">
              <div
                style={{ width: "74%" }}
                className="h-full bg-gradient-to-r from-gold via-brick to-gold transition-all duration-1000"
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-surface/60 pt-0.5">
              <span>STATUS: LIVE IN PRODUCTION</span>
              <span>TERSISA 38 PCS</span>
            </div>
          </div>

          {/* Hotspot Readout Card on Left */}
          <div className="w-full border-2 border-gold bg-surface p-4 text-ink shadow-hard animate-stamp-pop">
            <div className="flex items-center justify-between border-b border-line-soft pb-2 mb-2">
              <span className="font-mono text-[10px] font-black text-brick uppercase">
                HOTSPOT AKTIF • {activeSpot.category}
              </span>
              <span className="font-mono text-xs font-black text-ink">
                {activeSpot.price}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-display font-black text-base uppercase text-ink">
                  {activeSpot.name}
                </h4>
                <p className="font-mono text-xs text-muted">
                  {activeSpot.fabric}
                </p>
              </div>
              <Link
                href={`/products/${activeSpot.slug}`}
                className="border-base bg-ink px-3 py-1.5 text-xs font-mono font-bold text-surface hover:bg-brick pressable-hard transition-colors"
              >
                LIHAT ARTIKEL ↗
              </Link>
            </div>
          </div>

          <div className="pt-1">
            <ButtonLink href="/products" variant="primary">
              <span>Jelajahi Seluruh Koleksi</span>
              <ArrowUpRight className="h-4 w-4 ml-1 inline-block" />
            </ButtonLink>
          </div>
        </div>

        {/* Right Column: Editorial Photo Canvas with Interactive Hotspot Pins */}
        <div className="lg:col-span-6 relative">
          <div className="relative pr-4 pb-4">
            
            {/* Shifted Golden Accent Frame */}
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-3 translate-y-3 border-2 border-gold bg-gold/20"
            />

            <div className="relative aspect-[4/5] overflow-hidden border-strong border-surface bg-photo shadow-hard">
              <Image
                src={DEMO_IMAGES.editorialSkenaCasual}
                alt="Editorial Skena Streetwear Makassar Mandiri Global"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 550px"
                className="object-cover"
              />

              {/* Pinned Industrial Batch Stamp */}
              <div className="absolute top-3 left-3 border border-ink bg-surface px-2.5 py-1 text-ink shadow-hard-sm">
                <span className="font-mono text-[10px] font-black uppercase tracking-wider">
                  PAOTERE ARCHIVE // 2026
                </span>
              </div>

              {/* Interactive Hotspot Pins Over Model */}
              {LOOK_HOTSPOTS.map((spot) => {
                const isActive = activeSpotId === spot.id;
                return (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => setActiveSpotId(spot.id)}
                    onMouseEnter={() => setActiveSpotId(spot.id)}
                    style={{ top: `${spot.topPercent}%`, left: `${spot.leftPercent}%` }}
                    aria-label={`Lihat detail ${spot.name}`}
                    className={cn(
                      "absolute -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center transition-all duration-300",
                      isActive ? "scale-125" : "hover:scale-115"
                    )}
                  >
                    {/* Pulsing Target Ring */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute -inset-2 rounded-full border border-gold opacity-75",
                        isActive && "animate-ping"
                      )}
                    />
                    {/* Center Pin Button */}
                    <span
                      className={cn(
                        "relative flex h-8 w-8 items-center justify-center border-2 border-ink font-mono text-xs font-black shadow-hard-sm",
                        isActive ? "bg-brick text-surface" : "bg-gold text-ink"
                      )}
                    >
                      +
                    </span>
                  </button>
                );
              })}

              {/* Bottom Watermark Overlay */}
              <div className="absolute bottom-3 left-3 right-3 border border-ink bg-surface/95 backdrop-blur-xs p-3 text-ink flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase font-display">
                    LOOK 01 // PESISIR SKENA
                  </p>
                  <p className="text-[10px] font-mono text-muted">
                    LOKASI: DERMAGA TIMUR PAOTERE
                  </p>
                </div>
                <span className="font-mono text-[10px] bg-ink text-surface px-2 py-0.5 font-bold">
                  TAP TITIK [+]
                </span>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

