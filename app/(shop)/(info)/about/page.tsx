import React from "react";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2, Layers, ShieldCheck, Sparkles } from "lucide-react";
import { AboutInteractiveExperience } from "@/components/features/AboutInteractiveExperience";
import { StreetwearTicker } from "@/components/ui/StreetwearTicker";
import { ButtonLink } from "@/components/ui/Button";
import { DEMO_IMAGES } from "@/lib/services/demoImages";
import { idMessages } from "@/lib/i18n";

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      
      {/* 1. HERO EDITORIAL MANIFESTO HEADER */}
      <section className="border-b-strong border-ink bg-page">
        <div className="mx-auto max-w-[1360px] px-4 py-12 sm:px-6 lg:px-10 lg:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
            
            {/* Left Manifesto Column */}
            <div className="lg:col-span-7 flex flex-col items-start gap-5">
              <div className="inline-flex items-center gap-2 border-base bg-surface px-3 py-1">
                <span className="h-2 w-2 bg-brick border border-ink" />
                <span className="type-micro font-bold uppercase tracking-wider text-ink">
                  DOKUMENTASI RESMI // EST. 2026 // MAKASSAR, ID
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase font-display text-ink leading-[0.94] tracking-tight">
                PAKAIAN DARI KOTA ANGIN MAMIRI
              </h1>

              <p className="type-body text-ink max-w-[65ch] leading-relaxed font-medium">
                {idMessages.info.aboutIntro}
              </p>

              <p className="type-body text-muted max-w-[65ch] leading-relaxed">
                Kami memulai Care Care dari satu kegelisahan sederhana di pesisir Makassar:
                sulitnya menemukan pakaian harian dengan bahan yang benar-benar padat, tidak panas,
                jahitan yang tidak rapuh setelah dicuci berkali-kali, dan harga yang transparan
                tanpa tipu-daya.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-3">
                <ButtonLink href="/products" variant="primary">
                  <span>Jelajahi Katalog Pakaian</span>
                  <ArrowUpRight className="h-4 w-4 ml-1 inline-block" />
                </ButtonLink>
                <ButtonLink href="/contact" variant="secondary">
                  <span>Hubungi Studio Atelier</span>
                </ButtonLink>
              </div>
            </div>

            {/* Right Photo Frame with Chamfer + Shifted Border + Rotating Seal */}
            <div className="lg:col-span-5 relative">
              <div className="relative pr-4 pb-4">
                
                {/* Shifted Golden Accent Frame */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 translate-x-3 translate-y-3 border-2 border-ink bg-gold/25"
                />

                <div className="relative aspect-[4/5] overflow-hidden border-strong border-ink bg-photo shadow-hard">
                  <Image
                    src={DEMO_IMAGES.editorialRed}
                    alt={idMessages.home.storyPhotoAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="object-cover"
                  />

                  {/* Physical Pinned Stamped Tag */}
                  <div className="absolute top-3 left-3 border border-ink bg-surface px-2.5 py-1 text-ink shadow-hard-sm">
                    <span className="font-mono text-[10px] font-black uppercase tracking-wider">
                      ARCHIVE MANIFESTO // 01
                    </span>
                  </div>

                  {/* Bottom Studio Address Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 border border-ink bg-surface/95 backdrop-blur-xs p-3 text-ink flex items-center justify-between">
                    <div>
                      <p className="text-xs font-black uppercase font-display">
                        ATELIER CARE CARE
                      </p>
                      <p className="text-[10px] font-mono text-muted">
                        PELABUHAN PAOTERE, MAKASSAR
                      </p>
                    </div>
                    <span className="h-3 w-3 bg-brick border border-ink" />
                  </div>
                </div>
              </div>

              {/* Rotating Vintage Seal Stamp (360° Slow Spin) */}
              <div className="pointer-events-none absolute -top-6 -right-3 sm:-top-8 sm:-right-4 z-20">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full animate-spin-slow select-none"
                  >
                    <path
                      id="about-seal-path"
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
                      <textPath href="#about-seal-path" startOffset="0%">
                        ★ CARE CARE MAKASSAR ★ KOTAK & LIPATAN ★ 2026
                      </textPath>
                    </text>
                  </svg>
                  
                  {/* Center Emblem */}
                  <div className="absolute inset-0 m-auto h-10 w-10 bg-gold border-2 border-ink flex items-center justify-center shadow-hard-sm">
                    <span className="font-display font-black text-sm text-ink">CC</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. RUNNING STREETWEAR TICKER MARQUEE */}
      <section className="border-b-strong border-ink">
        <StreetwearTicker
          variant="ink"
          speed="normal"
          separatorIcon="star"
          items={[
            "CARE CARE MAKASSAR",
            "DOKUMENTASI RESMI BRAND",
            "100% KATUN TENUN ASLI",
            "ETIMOLOGI KATA CARE CARE",
            "FILOSOFI KOTAK DAN LIPATAN",
            "PELABUHAN PAOTERE // EST. 2026",
            "STANDAR GARMEN INTERNASIONAL",
          ]}
        />
      </section>

      {/* 3. INTERACTIVE ATELIER EXPERIENCE (Philosophy + Material Lab + Paotere Hub) */}
      <section className="border-b-base border-ink bg-page">
        <div className="mx-auto max-w-[1360px] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
          <AboutInteractiveExperience />
        </div>
      </section>

      {/* 4. SHARED-BORDER CORE VALUES LATTICE */}
      <section className="border-b-base border-ink bg-surface">
        <div className="mx-auto max-w-[1360px] px-4 py-16 sm:px-6 lg:px-10 lg:py-20 flex flex-col gap-8">
          
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-base pb-4">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 bg-brick border border-ink" />
              <div>
                <h2 className="type-h2 text-ink">
                  {idMessages.info.aboutValuesHeading}
                </h2>
                <p className="type-small text-muted mt-1">
                  Tiga komitmen etis yang kami jalankan tanpa kompromi sejak hari pertama toko dibuka.
                </p>
              </div>
            </div>
            <span className="font-mono text-xs font-bold text-ink border border-ink bg-page px-3 py-1">
              KOMITMEN UTAMA
            </span>
          </div>

          <div className="lattice-grid grid grid-cols-1 md:grid-cols-3">
            
            {/* Value 1 */}
            <div className="lattice-cell bg-surface p-6 sm:p-8 flex flex-col justify-between gap-4 hover:bg-page transition-colors">
              <div className="flex items-center justify-between border-b border-line-soft pb-3">
                <span className="font-mono text-xs font-black text-brick bg-page px-2 py-0.5 border border-line-soft">
                  PRINSIP 01
                </span>
                <ShieldCheck className="h-5 w-5 text-ink" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="type-h3 text-ink">
                  {idMessages.info.aboutValue1Title}
                </h3>
                <p className="type-body text-muted leading-relaxed">
                  {idMessages.info.aboutValue1Body}
                </p>
              </div>
              <div className="pt-3 border-t border-line-soft font-mono text-[11px] font-bold text-success flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                <span>AKURASI CM & GSM TERVERIFIKASI</span>
              </div>
            </div>

            {/* Value 2 */}
            <div className="lattice-cell bg-surface p-6 sm:p-8 flex flex-col justify-between gap-4 hover:bg-page transition-colors">
              <div className="flex items-center justify-between border-b border-line-soft pb-3">
                <span className="font-mono text-xs font-black text-brick bg-page px-2 py-0.5 border border-line-soft">
                  PRINSIP 02
                </span>
                <Layers className="h-5 w-5 text-ink" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="type-h3 text-ink">
                  {idMessages.info.aboutValue2Title}
                </h3>
                <p className="type-body text-muted leading-relaxed">
                  {idMessages.info.aboutValue2Body}
                </p>
              </div>
              <div className="pt-3 border-t border-line-soft font-mono text-[11px] font-bold text-success flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                <span>NOL BIAYA SILUMAN // TRANSPARAN</span>
              </div>
            </div>

            {/* Value 3 */}
            <div className="lattice-cell bg-surface p-6 sm:p-8 flex flex-col justify-between gap-4 hover:bg-page transition-colors">
              <div className="flex items-center justify-between border-b border-line-soft pb-3">
                <span className="font-mono text-xs font-black text-brick bg-page px-2 py-0.5 border border-line-soft">
                  PRINSIP 03
                </span>
                <Sparkles className="h-5 w-5 text-ink" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="type-h3 text-ink">
                  {idMessages.info.aboutValue3Title}
                </h3>
                <p className="type-body text-muted leading-relaxed">
                  {idMessages.info.aboutValue3Body}
                </p>
              </div>
              <div className="pt-3 border-t border-line-soft font-mono text-[11px] font-bold text-success flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                <span>ANTI-WARPING // LOCK 15 MENIT</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. BOTTOM STUDIO DISPATCH & CONTACT BANNER */}
      <section className="bg-page py-16 sm:py-20">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
          <div className="border-strong border-ink bg-surface p-8 sm:p-12 shadow-hard flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 border border-ink bg-page px-2.5 py-0.5 text-xs font-mono font-bold text-ink w-max">
                <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                <span>ATELIER DISPATCH ACTIVE</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black uppercase font-display text-ink">
                PUNYA PERTANYAAN ATAU INGIN BERKUNJUNG?
              </h3>
              <p className="type-body text-muted max-w-[55ch]">
                Tim kami siap membantu panduan ukuran, konsultasi bahan, atau pertanyaan seputar
                koleksi terbaru kami.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <ButtonLink href="/products" variant="primary">
                Buka Katalog Pakaian
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Hubungi Kami
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
