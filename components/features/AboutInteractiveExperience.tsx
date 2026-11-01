"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Compass, Layers, ShieldCheck } from "lucide-react";
import { DEMO_IMAGES } from "@/lib/services/demoImages";
import { cn } from "@/lib/utils/cn";

interface MaterialSpecimen {
  id: string;
  name: string;
  article: string;
  density: string;
  densityDots: number;
  composition: string;
  weaveType: string;
  description: string;
  features: string[];
}

const MATERIAL_SPECIMENS: MaterialSpecimen[] = [
  {
    id: "poplin",
    name: "Katun Poplin Pesisir",
    article: "KEMEJA BOXY",
    density: "185 GSM",
    densityDots: 3,
    composition: "100% Katun Alami",
    weaveType: "Plain Weave Kerapatan Tinggi",
    description:
      "Ditenun rapat dengan benang halus bertekstur sejuk. Memiliki kelenturan alami saat terkena angin laut, jatuh rapi di pundak tanpa rasa kaku.",
    features: [
      "Serat berpori untuk sirkulasi udara pesisir",
      "Kancing resin pekat tahan benturan mesin cuci",
      "Saku dada ganda dengan sudut lipat 45°",
    ],
  },
  {
    id: "heavy-tee",
    name: "Combed 16s Ring-Spun",
    article: "KAOS HEAVYWEIGHT",
    density: "235 GSM",
    densityDots: 5,
    composition: "100% Kapas Ring-Spun",
    weaveType: "Single Jersey Heavyweight",
    description:
      "Material andalan Mandiri Global: katun berbobot padat yang tidak menerawang. Tetap berdiri tegak membentuk siluet boxy maskulin tanpa membuat gerah.",
    features: [
      "Rib leher 30mm dengan spandex ganda anti-melar",
      "Proses pre-shrunk dengan tingkat susut di bawah 1.2%",
      "Jahitan rantai 3 jarum di pundak dan kelim bawah",
    ],
  },
  {
    id: "twill",
    name: "Katun Twill Pesisir",
    article: "CHINO LONGGAR",
    density: "260 GSM",
    densityDots: 5,
    composition: "100% Katun Twill",
    weaveType: "Diagonal Twill 2/1",
    description:
      "Kain bergaris diagonal kuat yang tahan gesekan permukaan kasar. Didesain untuk mobilitas tinggi di jalanan kota dan dermaga pelabuhan.",
    features: [
      "Penguat bar-tack di semua sudut kantong",
      "Resleting kuningan YKK anti-karat air laut",
      "Potongan lurus leluasa untuk gerak aktif",
    ],
  },
  {
    id: "canvas",
    name: "Heavy Cotton Canvas",
    article: "TOPI & TAS",
    density: "320 GSM",
    densityDots: 4,
    composition: "100% Canvas Katun Tebal",
    weaveType: "Duck Canvas Rapat",
    description:
      "Kain kanvas tebal yang biasa digunakan pada perlengkapan layar kapal Paotere. Memberikan proteksi maksimal dari sengatan terik matahari.",
    features: [
      "Tahan abrasi dan debu jalanan pesisir",
      "Struktur topi 5-panel kokoh tidak mudah peyot",
      "Tali web kanvas dengan gesper geser logam",
    ],
  },
];

const PHILOSOPHY_PILLARS = [
  {
    id: "mandiriglobal",
    num: "01",
    tag: "ETOS & IDENTITAS",
    title: "NAMA: 'MANDIRI GLOBAL' (MG)",
    subtitle: "Kemandirian Lokal Berdaya Saing Global",
    body: "Nama Mandiri Global (MG) lahir dari keyakinan bahwa karya anak bangsa mampu berdiri mandiri dan bersaing di kancah global. Berakar dari etos kerja keras pesisir Makassar, nama ini menjadi janji setia: menciptakan pakaian harian yang jujur, kokoh, dan berkarakter untuk menemani langkah hidup setiap pemakainya.",
    quote: "“Kemandirian lokal, standar kualitas garmen global.”",
  },
  {
    id: "kotak",
    num: "02",
    tag: "GEOMETRI BUDAYA",
    title: "BENTUK: 'KOTAK'",
    subtitle: "Pola Anyaman Tenun Sulawesi Selatan",
    body: "Logo kami dibangun dari balok-balok persegi yang saling mengunci, mengambil inspirasi langsung dari geometri kotak-kotak (balle-balle) pada sarung sutra Bugis-Makassar. Prinsip kotak ini kami turunkan ke seluruh antarmuka toko: kisi produk berbagi garis navy yang sama tanpa celah kosong palsu, seperti jalinan benang lungsin dan pakan pada alat tenun tradisional.",
    quote: "Keteraturan kisi geometris yang disiplin, kokoh, dan modular.",
  },
  {
    id: "lipatan",
    num: "03",
    tag: "MOMEN AJAIB",
    title: "GERAK: 'LIPATAN'",
    subtitle: "Sudut Dog-Ear Katalog Fisik",
    body: "Di antara garis-garis kotak yang tegas, hadir satu momen ajaib: sudut yang terlipat (dog-ear). Kami mengangkat kebiasaan lama melipat pojok halaman buku atau katalog cetak yang memuat pakaian impian kita. Pada website ini, lipatan sudut menjadi tanda wishlist—cara paling taktil dan puitis untuk menyimpan pakaian yang ingin kamu miliki.",
    quote: "Satu-satunya keajaiban di tengah ketenangan struktur geometris.",
  },
];

export function AboutInteractiveExperience() {
  const [activeMaterialId, setActiveMaterialId] = useState<string>("heavy-tee");
  const [activePillarId, setActivePillarId] = useState<string>("mandiriglobal");

  const currentMaterial =
    MATERIAL_SPECIMENS.find((m) => m.id === activeMaterialId) ||
    MATERIAL_SPECIMENS[1];

  const currentPillar =
    PHILOSOPHY_PILLARS.find((p) => p.id === activePillarId) ||
    PHILOSOPHY_PILLARS[0];

  return (
    <div className="flex flex-col gap-16 sm:gap-20">
      
      {/* 1. TRILOGI FILOSOFI IDENTITAS (3 Pillars Interactive Dial) */}
      <section className="flex flex-col gap-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b-base pb-4">
          <div className="flex flex-col gap-1.5">
            <div className="inline-flex items-center gap-2 border-base bg-page px-3 py-1 w-max">
              <Compass className="h-4 w-4 text-brick" />
              <span className="type-micro font-bold uppercase tracking-wider text-ink">
                PONDASI KREATIF // TIGA PILAR
              </span>
            </div>
            <h2 className="type-h2 text-ink">TRILOGI FILOSOFI MANDIRI GLOBAL</h2>
            <p className="type-small text-muted max-w-[65ch]">
              Tiga gagasan yang membentuk seluruh DNA brand kami: dari nama, bentuk visual,
              hingga cara kamu berinteraksi dengan produk kami.
            </p>
          </div>
          <span className="font-mono text-xs font-bold text-muted border border-ink bg-page px-3 py-1.5">
            IDENTITAS RESMI EST. 2026
          </span>
        </div>

        {/* 3 Pillar Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {PHILOSOPHY_PILLARS.map((pillar) => {
            const isActive = activePillarId === pillar.id;
            return (
              <button
                key={pillar.id}
                type="button"
                onClick={() => setActivePillarId(pillar.id)}
                className={cn(
                  "p-5 text-left border-base transition-all select-none pressable-hard flex flex-col justify-between gap-4",
                  isActive
                    ? "bg-ink text-surface shadow-hard border-ink scale-102"
                    : "bg-surface text-ink hover:bg-page shadow-hard-sm"
                )}
              >
                <div className="flex items-center justify-between border-b border-line-soft pb-2">
                  <span
                    className={cn(
                      "font-mono text-xs font-black",
                      isActive ? "text-gold" : "text-brick"
                    )}
                  >
                    PILAR {pillar.num}
                  </span>
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full",
                      isActive ? "bg-gold animate-pulse" : "bg-line-soft"
                    )}
                  />
                </div>
                <div>
                  <span className="font-mono text-[10px] tracking-widest uppercase opacity-75 block mb-1">
                    {pillar.tag}
                  </span>
                  <h3 className="font-display font-black text-lg sm:text-xl uppercase leading-tight">
                    {pillar.title}
                  </h3>
                  <p
                    className={cn(
                      "text-xs mt-1",
                      isActive ? "text-surface/80" : "text-muted"
                    )}
                  >
                    {pillar.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Detailed Manifestation Board */}
        <div className="border-strong bg-surface p-6 sm:p-10 shadow-hard relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black text-brick bg-page px-2 py-0.5 border border-line-soft">
                  {currentPillar.tag}
                </span>
                <span className="font-mono text-xs text-muted">
                  DOKUMEN FILOSOFI #{currentPillar.num}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black uppercase font-display text-ink">
                {currentPillar.subtitle}
              </h3>

              <p className="type-body text-ink leading-relaxed">
                {currentPillar.body}
              </p>

              <div className="border-l-4 border-brick bg-page p-3.5 mt-2">
                <p className="font-mono text-xs font-bold text-ink italic">
                  {currentPillar.quote}
                </p>
              </div>
            </div>

            {/* Right Graphic Emblem */}
            <div className="lg:col-span-4 flex items-center justify-center p-4">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 border-2 border-ink bg-page p-4 flex flex-col items-center justify-center text-center shadow-hard-sm">
                <span className="font-mono text-xs font-black text-brick mb-2">
                  ARTIFACT 0{currentPillar.num}
                </span>
                <div className="h-16 w-16 bg-ink text-gold border-2 border-ink flex items-center justify-center font-display font-black text-2xl mb-2 shadow-hard-sm">
                  MG
                </div>
                <span className="font-mono text-[10px] font-bold text-ink uppercase tracking-wider">
                  {currentPillar.title}
                </span>
                <span className="font-mono text-[9px] text-muted mt-1">
                  MAKASSAR ARCHIVE 2026
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STANDAR MATERIAL GARMEN (Interactive Material Specimen Bench) */}
      <section className="flex flex-col gap-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b-base pb-4">
          <div className="flex flex-col gap-1.5">
            <div className="inline-flex items-center gap-2 border-base bg-surface px-3 py-1 w-max">
              <Layers className="h-4 w-4 text-brick" />
              <span className="type-micro font-bold uppercase tracking-wider text-ink">
                LAB MATERIAL // SERAT ALAMI
              </span>
            </div>
            <h2 className="type-h2 text-ink">SPESIMEN KAIN & KETEBALAN GRAMASI</h2>
            <p className="type-small text-muted max-w-[65ch]">
              Kami memilih kain katun 100% alami tanpa campuran poliester murah.
              Klik spesimen di bawah untuk memeriksa kerapatan tenun, gramasi, dan peruntukannya.
            </p>
          </div>
          <div className="flex items-center gap-2 border border-ink bg-surface px-3 py-1 text-xs font-mono font-bold text-success">
            <ShieldCheck className="h-4 w-4" />
            <span>100% BEBAS POLIESTER PANAS</span>
          </div>
        </div>

        {/* 4 Material Selector Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {MATERIAL_SPECIMENS.map((mat) => {
            const isSelected = activeMaterialId === mat.id;
            return (
              <button
                key={mat.id}
                type="button"
                onClick={() => setActiveMaterialId(mat.id)}
                className={cn(
                  "p-4 text-left border-base transition-all select-none pressable-hard flex flex-col justify-between gap-3",
                  isSelected
                    ? "bg-ink text-surface shadow-hard border-ink scale-102"
                    : "bg-surface text-ink hover:bg-page shadow-hard-sm"
                )}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "font-mono text-[10px] font-black uppercase",
                      isSelected ? "text-gold" : "text-brick"
                    )}
                  >
                    {mat.article}
                  </span>
                  <span className="font-mono text-xs font-bold">
                    {mat.density}
                  </span>
                </div>
                <div>
                  <h4 className="font-display font-black text-sm sm:text-base leading-tight uppercase">
                    {mat.name}
                  </h4>
                  <p
                    className={cn(
                      "text-[11px] font-mono mt-1 truncate",
                      isSelected ? "text-surface/70" : "text-muted"
                    )}
                  >
                    {mat.composition}
                  </p>
                </div>
                {/* Density Bar */}
                <div className="flex items-center gap-1 pt-1 border-t border-line-soft">
                  {[1, 2, 3, 4, 5].map((dot) => (
                    <span
                      key={dot}
                      className={cn(
                        "h-1.5 w-full border border-current",
                        dot <= mat.densityDots
                          ? isSelected
                            ? "bg-gold"
                            : "bg-brick"
                          : "bg-transparent opacity-30"
                      )}
                    />
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Specimen Inspection Box */}
        <div className="border-2 border-ink bg-surface p-6 sm:p-8 shadow-hard">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Specs */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black text-brick bg-page px-2 py-0.5 border border-line-soft">
                  SPESIFIKASI SPESIMEN #{currentMaterial.id.toUpperCase()}
                </span>
                <span className="font-mono text-xs text-muted">
                  DIPAKAI PADA: {currentMaterial.article}
                </span>
              </div>

              <h3 className="text-2xl font-black uppercase font-display text-ink">
                {currentMaterial.name} ({currentMaterial.density})
              </h3>

              <p className="type-body text-ink leading-relaxed">
                {currentMaterial.description}
              </p>

              {/* Technical Features Checklist */}
              <div className="flex flex-col gap-2 pt-2 border-t border-line-soft">
                <span className="font-mono text-xs font-bold text-ink uppercase tracking-wider">
                  KEUNGGULAN KONSTRUKSI GARMEN:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {currentMaterial.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="h-4 w-4 bg-gold border border-ink text-ink flex items-center justify-center shrink-0 text-[10px] font-black mt-0.5">
                        ✓
                      </span>
                      <span className="text-ink font-medium leading-snug">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Photo Frame of the Garment Fabric */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] w-full overflow-hidden border-2 border-ink bg-photo shadow-hard-sm">
                <Image
                  src={DEMO_IMAGES.shirtsFolded}
                  alt={currentMaterial.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover"
                />
                <div className="absolute bottom-2 left-2 right-2 border border-ink bg-surface/95 backdrop-blur-xs p-2 text-ink flex items-center justify-between text-xs font-mono">
                  <span className="font-bold">{currentMaterial.weaveType}</span>
                  <span className="text-brick font-black">{currentMaterial.density}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. TITIK NOL ATELIER: PAOTERE MAKASSAR */}
      <section className="border-strong bg-ink text-surface p-6 sm:p-10 lg:p-12 shadow-hard select-none">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 border border-surface/30 bg-surface/10 px-3 py-1 w-max">
              <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-gold">
                TITIK NOL KELAHIRAN // PELABUHAN PAOTERE
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase font-display text-surface leading-tight">
              DARI DERMAGA PESISIR SELAT MAKASSAR UNTUK NUSANTARA
            </h3>

            <p className="type-body text-surface/80 leading-relaxed">
              Di Pelabuhan Paotere, perahu-perahu pinisi bersandar membawa kayu, rempah, dan cerita
              pelaut tangguh. Di tepi dermaga itulah kami mendirikan meja kerja Mandiri Global. Udara pesisir
              yang lembap dan terik khatulistiwa menjadi laboratorium alami kami: jika pakaian kami
              nyaman dipakai berjalan di bawah terik matahari Paotere dan Losari, maka ia akan nyaman
              dikenakan di sudut mana pun di nusantara.
            </p>

            {/* Coordinates Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 font-mono text-xs">
              <div className="border border-surface/20 bg-surface/5 p-2.5">
                <span className="block text-[9px] text-surface/60">KOORDINAT</span>
                <span className="font-bold text-gold">5°07&apos;12.4&quot;S 119°25&apos;08.2&quot;E</span>
              </div>
              <div className="border border-surface/20 bg-surface/5 p-2.5">
                <span className="block text-[9px] text-surface/60">ELEVASI</span>
                <span className="font-bold text-surface">2 MDPL (PESISIR)</span>
              </div>
              <div className="border border-surface/20 bg-surface/5 p-2.5 col-span-2 sm:col-span-1">
                <span className="block text-[9px] text-surface/60">STATUS HUB</span>
                <span className="font-bold text-success">PENGIRIMAN AKTIF</span>
              </div>
            </div>
          </div>

          {/* Right Map & Atelier Photo Card */}
          <div className="lg:col-span-5">
            <div className="relative pr-3 pb-3">
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-3 translate-y-3 border-2 border-gold bg-gold/20"
              />
              <div className="relative aspect-[4/3] overflow-hidden border-2 border-surface bg-photo shadow-hard">
                <Image
                  src={DEMO_IMAGES.rackNeutral}
                  alt="Ruang Kerja Atelier Mandiri Global Paotere Makassar"
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover"
                />
                <div className="absolute top-2 left-2 border border-ink bg-surface px-2 py-0.5 text-ink font-mono text-[10px] font-bold">
                  STUDIO WORKBENCH #01
                </div>
                <div className="absolute bottom-2 left-2 right-2 border border-ink bg-surface p-2 text-ink text-xs font-mono">
                  <p className="font-bold">JL. SABUTUNG / SOMBA OPU, MAKASSAR</p>
                  <p className="text-[10px] text-muted">HUB DISPATCH SULAWESI SELATAN</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

