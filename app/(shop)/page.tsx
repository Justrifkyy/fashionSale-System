import React from "react";
import { HeroShowcase } from "@/components/features/HeroShowcase";
import { CategoryShowcaseSection } from "@/components/features/CategoryShowcaseSection";
import { GarmentLabSection } from "@/components/features/GarmentLabSection";
import { FeaturedCatalogSection } from "@/components/features/FeaturedCatalogSection";
import { EditorialHotspotSection } from "@/components/features/EditorialHotspotSection";
import { HeritagePhilosophySection } from "@/components/features/HeritagePhilosophySection";
import { CommunityVoiceSection } from "@/components/features/CommunityVoiceSection";
import { DropBoardingPassSection } from "@/components/features/DropBoardingPassSection";
import { StreetwearTicker } from "@/components/ui/StreetwearTicker";
import { listCategories, listProducts } from "@/lib/services/catalogService";

export default function HomePage() {
  const categories = listCategories();
  const products = listProducts();

  return (
    <div className="flex flex-col">
      {/* 1. HERO SHOWCASE WITH MULTIPLANE DEPTH, SHUTTER BLITZ & 18 DYNAMIC ACCESSORIES */}
      <section>
        <HeroShowcase />
      </section>

      {/* 2. DUAL STREETWEAR MARQUEE TICKER (High-Energy Pulse) */}
      <section className="border-b-strong border-ink">
        <StreetwearTicker
          variant="ink"
          speed="normal"
          separatorIcon="star"
          items={[
            "CARE CARE MAKASSAR",
            "DROP 01 // EDISI PESISIR",
            "235 GSM HEAVYWEIGHT TEE",
            "100% KATUN TENUN ASLI",
            "POLA BOXY SKENA",
            "KOTAK DAN LIPATAN",
            "BEBAS ONGKIR SE-SULAWESI",
            "GARANSI RETUR 7 HARI",
          ]}
        />
        <StreetwearTicker
          variant="gold"
          speed="slow"
          reverse
          separatorIcon="diamond"
          items={[
            "PENGIRIMAN DARI HUB PAOTERE",
            "EDISI TERBATAS 150 PCS",
            "JAHITAN RANTAI GARMEN",
            "DROP KHAS PESISIR LOSARI",
            "EST. 2026 // MAKASSAR ARCHIVE",
            "GARANSI TUKAR UKURAN 7 HARI",
          ]}
        />
      </section>

      {/* 3. KATEGORI PILIHAN (Interactive Atelier Specimen Cabinet) */}
      <section className="border-b-base border-ink bg-surface">
        <div className="mx-auto max-w-[1360px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
          <CategoryShowcaseSection categories={categories} />
        </div>
      </section>

      {/* 4. STANDAR KUALITAS GARMEN (Interactive Laboratory Blueprint Dissection) */}
      <section className="border-b-base border-ink bg-page">
        <div className="mx-auto max-w-[1360px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
          <GarmentLabSection />
        </div>
      </section>

      {/* 5. KOLEKSI TERBARU (Interactive Grid / Lookbook View & Filter) */}
      <section className="border-b-base border-ink bg-surface">
        <div className="mx-auto max-w-[1360px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
          <FeaturedCatalogSection products={products} />
        </div>
      </section>

      {/* 6. PAKAIAN HARIAN DARI SUDUT PESISIR MAKASSAR (Interactive Outfit Hotspot & Soundscape) */}
      <section className="border-b-strong border-ink bg-ink text-surface">
        <EditorialHotspotSection />
      </section>

      {/* 7. TENTANG NAMA CARE CARE (Etymology Dial & Cultural Swatch Archive) */}
      <section className="border-b-base border-ink bg-surface">
        <div className="mx-auto max-w-[1360px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
          <HeritagePhilosophySection />
        </div>
      </section>

      {/* 8. SUARA SKENA MAKASSAR (Analog Audio Cassette Field Reviews) */}
      <section className="border-b-base border-ink bg-page">
        <div className="mx-auto max-w-[1360px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
          <CommunityVoiceSection />
        </div>
      </section>

      {/* 9. NOTIFIKASI DROP RESMI (VIP Industrial Boarding Pass & Coupon Ticket) */}
      <section className="bg-surface py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
          <DropBoardingPassSection />
        </div>
      </section>
    </div>
  );
}
