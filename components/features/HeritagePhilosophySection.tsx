"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Compass, Sparkles } from "lucide-react";
import { DEMO_IMAGES } from "@/lib/services/demoImages";
import { cn } from "@/lib/utils/cn";

interface SwatchMeaning {
  name: string;
  hex: string;
  heritage: string;
  symbolism: string;
}

const PALETTE_ARCHIVE: SwatchMeaning[] = [
  {
    name: "Navy Tinta",
    hex: "#2D2D56",
    heritage: "Selat Makassar & Cap Pelabuhan",
    symbolism: "Kedalaman air laut perairan Paotere dan tinta stempel penerimaan kargo garmen pelabuhan.",
  },
  {
    name: "Merah Bata",
    hex: "#B8523C",
    heritage: "Benteng Rotterdam & Akar Mengkudu",
    symbolism: "Batu bata merah bersejarah Fort Rotterdam dan pigmen pewarna alami tenun sutra tradisional.",
  },
  {
    name: "Kuning Benang Emas",
    hex: "#F0B429",
    heritage: "Tenun Sutra Sengkang",
    symbolism: "Pintalan benang emas yang disisipkan pada tepi sarung tenun upacara kehormatan Sulawesi Selatan.",
  },
];

const PHILOSOPHY_TABS = [
  {
    key: "mandiriglobal",
    title: "1. NAMA 'MANDIRI GLOBAL'",
    subtitle: "Kemandirian Lokal Berstandar Global",
    body: "Nama Mandiri Global (MG) kami pilih sebagai manifestasi janji: kami merayakan pakaian harian berkarakter tangguh, mandiri, dan berdaya saing global yang berakar dari etos pesisir Makassar. Busana berkualitas tinggi yang menemani setiap langkah dan pencapaian hidup pemakainya.",
  },
  {
    key: "kotak",
    title: "2. FILOSOFI 'KOTAK'",
    subtitle: "Geometri Tenun Nusantara",
    body: "Logo kami tersusun dari balok-balok persegi yang saling mengunci, mengulang pola kotak-kotak tenun sarung sutra Bugis-Makassar. Tata letak toko kami adalah kisi (lattice): sel-sel produk saling berbagi garis navy yang kokoh tanpa jarak kosong palsu, seperti benang pakan dan lungsin yang menyatu.",
  },
  {
    key: "lipatan",
    title: "3. MOMEN 'LIPATAN'",
    subtitle: "Sudut Dog-Ear Katalog Fisik",
    body: "Sudut terlipat (dog-ear) pada logo kami hadir sebagai bentuk wishlist. Seperti kebiasaan melipat pojok halaman buku atau katalog cetak yang ingin kamu simpan dan miliki nanti. Satu-satunya bentuk ajaib di tengah kesunyian struktur geometris kotak yang disiplin.",
  },
];

export function HeritagePhilosophySection() {
  const [activeTabKey, setActiveTabKey] = useState<string>("mandiriglobal");
  const [selectedColor, setSelectedColor] = useState<number>(0);

  const activeTab = PHILOSOPHY_TABS.find((t) => t.key === activeTabKey) || PHILOSOPHY_TABS[0];
  const activeColor = PALETTE_ARCHIVE[selectedColor] || PALETTE_ARCHIVE[0];

  return (
    <div className="flex flex-col gap-10">
      
      {/* Section Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-base pb-6">
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 border-base bg-page px-3 py-1 w-max">
            <Compass className="h-4 w-4 text-brick" />
            <span className="type-micro font-bold uppercase tracking-wider text-ink">
              WARISAN & FILOSOFI IDENTITAS
            </span>
          </div>
          <h2 className="type-h2 text-ink">TENTANG IDENTITAS MANDIRI GLOBAL</h2>
          <p className="type-small text-muted max-w-[65ch]">
            Memahami visi kemandirian lokal berdaya saing global, konstruksi logo geometris balok,
            dan tiga pigmen warna utama yang membentuk pakaian Mandiri Global.
          </p>
        </div>

        <div className="border border-ink bg-page px-3 py-1.5 font-mono text-xs font-bold text-ink">
          MAKASSAR, SULAWESI SELATAN // EST. 2026
        </div>
      </div>

      {/* Main Philosophy Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: Interactive Tab Dial & Content */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* 3 Tabs */}
          <div className="grid grid-cols-3 gap-2">
            {PHILOSOPHY_TABS.map((tab) => {
              const isActive = activeTabKey === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTabKey(tab.key)}
                  className={cn(
                    "p-3 text-left border-base font-mono transition-all select-none pressable-hard",
                    isActive
                      ? "bg-ink text-surface shadow-hard border-ink"
                      : "bg-surface text-ink hover:bg-page shadow-hard-sm"
                  )}
                >
                  <span
                    className={cn(
                      "block text-[10px] font-black uppercase mb-1",
                      isActive ? "text-gold" : "text-brick"
                    )}
                  >
                    {tab.title.split(" ")[0]} {tab.title.split(" ")[1]}
                  </span>
                  <span className="block text-xs font-bold truncate">
                    {tab.title.split(" ")[2] || tab.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Content Card */}
          <div className="border-2 border-ink bg-surface p-6 sm:p-8 shadow-hard relative">
            <div className="flex items-center justify-between border-b border-line-soft pb-3 mb-4">
              <span className="font-mono text-xs font-black text-brick bg-page px-2 py-0.5 border border-line-soft">
                {activeTab.subtitle}
              </span>
              <span className="font-mono text-xs text-muted">ARSIP LINGUISTIK MKS</span>
            </div>

            <p className="type-body text-ink leading-relaxed">
              {activeTab.body}
            </p>

            <div className="mt-6 pt-4 border-t border-line-soft flex items-center justify-between">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-brick hover:text-ink transition-colors underline decoration-2 underline-offset-4"
              >
                <span>Baca Dokumentasi Lengkap Brand</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Sparkles className="h-4 w-4 text-gold" />
            </div>
          </div>

          {/* Interactive Color Swatch Explorer */}
          <div className="border border-ink bg-page p-4 flex flex-col gap-3">
            <span className="font-mono text-xs font-bold text-ink uppercase tracking-wider">
              INSPEKSI 3 PIGMEN WARNA BUDAYA (KLIK UNTUK MELIHAT MAKNA):
            </span>
            <div className="grid grid-cols-3 gap-2">
              {PALETTE_ARCHIVE.map((swatch, idx) => {
                const isSelected = selectedColor === idx;
                return (
                  <button
                    key={swatch.name}
                    type="button"
                    onClick={() => setSelectedColor(idx)}
                    className={cn(
                      "flex items-center gap-2 p-2 border transition-all text-left",
                      isSelected
                        ? "border-2 border-ink bg-surface shadow-hard-sm scale-102"
                        : "border-line-soft bg-page/70 hover:bg-surface"
                    )}
                  >
                    <span
                      style={{ backgroundColor: swatch.hex }}
                      className="h-5 w-5 border border-ink shrink-0"
                    />
                    <div className="truncate">
                      <p className="text-[11px] font-bold text-ink truncate leading-tight">
                        {swatch.name}
                      </p>
                      <p className="font-mono text-[9px] text-muted truncate">
                        {swatch.hex}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
            
            <div className="border border-line-soft bg-surface p-2.5 text-xs font-mono">
              <span className="font-bold text-brick">{activeColor.heritage}: </span>
              <span className="text-ink">{activeColor.symbolism}</span>
            </div>
          </div>

        </div>

        {/* Right Column: Layered Flatlay Photo Frame with Rotating Heritage Seal */}
        <div className="lg:col-span-5 relative">
          <div className="relative pr-4 pb-4">
            
            {/* Shifted Accent Frame */}
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-3 translate-y-3 border-2 border-ink bg-gold/25"
            />

            <div className="relative aspect-[4/3] overflow-hidden border-strong border-ink bg-photo shadow-hard">
              <Image
                src={DEMO_IMAGES.flatlayDenim}
                alt="Flatlay Pakaian dan Kain Tenun Makassar Mandiri Global"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />

              {/* Bottom Swatch Visualizer Overlay */}
              <div className="absolute bottom-3 left-3 right-3 border border-ink bg-surface/95 backdrop-blur-xs p-3 text-ink flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="h-4 w-4 border border-ink bg-ink" />
                  <span className="h-4 w-4 border border-ink bg-brick" />
                  <span className="h-4 w-4 border border-ink bg-gold" />
                </div>
                <p className="type-small font-bold text-ink">
                  KOTAK & LIPATAN // MAKASSAR
                </p>
              </div>
            </div>
          </div>

          {/* Rotating Vintage Seal Stamp (360° Slow Spin) */}
          <div className="pointer-events-none absolute -top-6 -right-2 sm:-top-8 sm:-right-4 z-20">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full animate-spin-slow select-none"
              >
                <path
                  id="heritage-seal-path"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="none"
                />
                <text
                  fontSize="8.5"
                  fontWeight="900"
                  fill="#2D2D56"
                  letterSpacing="0.16em"
                  fontFamily="monospace"
                >
                  <textPath href="#heritage-seal-path" startOffset="0%">
                    ★ MANDIRI GLOBAL MAKASSAR ★ KOTAK & LIPATAN ★ 2026
                  </textPath>
                </text>
              </svg>
              
              {/* Center Stamp Emblem */}
              <div className="absolute inset-0 m-auto h-10 w-10 bg-gold border-2 border-ink flex items-center justify-center shadow-hard-sm">
                <span className="font-display font-black text-sm text-ink">MG</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

