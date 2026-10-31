"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface LabPillar {
  id: string;
  tabLabel: string;
  title: string;
  subtitle: string;
  metrics: { label: string; value: string; status: string }[];
  breakdown: string[];
  blueprintTitle: string;
  blueprintPoints: { x: number; y: number; label: string; note: string }[];
}

const PILLARS: LabPillar[] = [
  {
    id: "material",
    tabLabel: "01. MATERIAL KATUN",
    title: "KATUN COMBED 235 GSM PESISIR",
    subtitle:
      "Benang katun ring-spun 16s yang dipintal dengan kerapatan tinggi. Tetap memiliki struktur tegak (boxy) namun sejuk berpori untuk kelembapan iklim pesisir Makassar.",
    metrics: [
      { label: "GRAMASI KAIN", value: "235 GSM", status: "HEAVYWEIGHT" },
      { label: "KOMPOSISI", value: "100% KATUN", status: "RING-SPUN" },
      { label: "TINGKAT SUSUT", value: "< 1.2%", status: "PRE-SHRUNK" },
      { label: "DAYA SERAP", value: "0.8 DETIK", status: "OPTIMAL" },
    ],
    breakdown: [
      "Serat kapas pilihan tanpa campuran sintetis panas",
      "Proses pencucian pre-shrunk meminimalisir penyusutan setelah cuci",
      "Warna reaktif tahan pudar meski terkena terik matahari pesisir",
      "Tekstur padat tidak menerawang saat dipakai siang hari",
    ],
    blueprintTitle: "DISSEKSI STRUKTUR SERAT 235 GSM",
    blueprintPoints: [
      { x: 30, y: 35, label: "RING-SPUN YARN", note: "Pintalan serat panjang anti-berbulu" },
      { x: 65, y: 45, label: "WEAVE DENSITY", note: "Kerapatan 38 loops/inch" },
      { x: 50, y: 70, label: "HEAT DISSIPATION", note: "Pori alami pelepasan panas tropis" },
    ],
  },
  {
    id: "silhouette",
    tabLabel: "02. ANATOMI BOXY",
    title: "POLA BOXY SKENA MAKASSAR",
    subtitle:
      "Riset pola potong yang mengutamakan postur jalanan: bahu turun proporsional (drop shoulder), lebar dada leluasa, dengan panjang baju yang tidak menenggelamkan pinggang.",
    metrics: [
      { label: "DROP SHOULDER", value: "58-62 CM", status: "OVERSIZED" },
      { label: "CHEST WIDTH", value: "62-66 CM", status: "LELUASA" },
      { label: "BODY LENGTH", value: "70-74 CM", status: "PROPORSI FIT" },
      { label: "SLEEVE OPENING", value: "22 CM", status: "RELAXED" },
    ],
    breakdown: [
      "Potongan lurus tanpa lekukan pinggang untuk siluet streetwear tegas",
      "Bahu turun memberikan ruang gerak leluasa tanpa rasa sesak",
      "Panjang baju terkalibrasi pas di atas garis saku celana",
      "Cocok untuk dikenakan sendiri atau dipadukan layering rompi/jaket",
    ],
    blueprintTitle: "GEOMETRI ANATOMI BOXY CUT",
    blueprintPoints: [
      { x: 25, y: 25, label: "DROP SHOULDER", note: "Kemiringan 8° natural fall" },
      { x: 50, y: 40, label: "CHEST CLEARANCE", note: "+12cm di atas lingkar dada standar" },
      { x: 75, y: 75, label: "SQUARE HEM", note: "Kelim lurus 25mm jahitan jarum ganda" },
    ],
  },
  {
    id: "construction",
    tabLabel: "03. JAHITAN RANTAI",
    title: "KONSTRUKSI JAHITAN GARMEN BERAT",
    subtitle:
      "Dikerjakan dengan mesin jahit rantai 3 jarum (chainstitch) pada sambungan beban tinggi: pundak, leher, dan kelim samping untuk ketahanan pemakaian harian jangka panjang.",
    metrics: [
      { label: "RIB LEHER", value: "30 MM", status: "BENANG SPANDEX GANDA" },
      { label: "STITCH RATIO", value: "12 SPI", status: "STANDAR GARMEN" },
      { label: "REINFORCE", value: "BAR-TACK", status: "SAKU & BELAHAN" },
      { label: "UJI TARIK", value: "450 N", status: "ANTI-ROBEK" },
    ],
    breakdown: [
      "Rib leher 30mm dengan campuran spandex mikro tidak melar setelah dicuci",
      "Tape pundak terbungkus rapi (*back-neck tape*) mencegah gesekan gatal",
      "Jahitan rantai ganda mampu merenggang mengikuti gerakan tubuh tanpa putus",
      "Garansi jahitan 7 hari bebas klaim penggantian produk baru",
    ],
    blueprintTitle: "PETA TITIK KEKUATAN JAHITAN",
    blueprintPoints: [
      { x: 50, y: 15, label: "COLLAR RIB 30MM", note: "Rib leher elastis 2x2 ganda" },
      { x: 30, y: 20, label: "CHAINSTITCH TAPE", note: "Penguat pundak kiri-kanan" },
      { x: 50, y: 85, label: "TWIN NEEDLE HEM", note: "Kelim bawah kuat 12 stitches per inch" },
    ],
  },
  {
    id: "logistics",
    tabLabel: "04. HUB PAOTERE",
    title: "DISTRIBUSI KILAT DARI HUB PESISIR",
    subtitle:
      "Seluruh pesanan dikemas langsung dari gudang atelier Paotere, Makassar. Pengiriman terintegrasi langsung dengan ekspedisi kilat menuju seluruh kabupaten dan kota se-Indonesia.",
    metrics: [
      { label: "DISPATCH TIME", value: "< 24 JAM", status: "KIRIM HARI SAMA" },
      { label: "AREA SULSEL", value: "1-2 HARI", status: "BEBAS ONGKIR" },
      { label: "LUAR PULAU", value: "2-3 HARI", status: "EKSPRES AIR" },
      { label: "TRACKING", value: "LIVE RESI", status: "TERLACAK OTOMATIS" },
    ],
    breakdown: [
      "Pengemasan kardus bergelombang kokoh anti-penyot dan tahan air",
      "Disertakan kartu inspeksi garmen fisik (*Inspection Tag*) di setiap boks",
      "Pemberitahuan nomor resi instan lewat email dan dashboard akun",
      "Bebas tukar ukuran tanpa ribet dalam 7 hari sejak barang diterima",
    ],
    blueprintTitle: "JALUR LOGISTIK ATELIER MAKASSAR",
    blueprintPoints: [
      { x: 20, y: 30, label: "QUALITY CHECK", note: "Inspeksi 100% benang lepas & ukuran" },
      { x: 50, y: 50, label: "SEALED PACKAGING", note: "Kemasan anti air + segel brutalis" },
      { x: 80, y: 70, label: "PAOTERE DISPATCH", note: "Penyerahan harian ke kurir kilat" },
    ],
  },
];

export function GarmentLabSection() {
  const [activeTab, setActiveTab] = useState<string>("material");
  const [activePin, setActivePin] = useState<number | null>(null);

  const current = PILLARS.find((p) => p.id === activeTab) || PILLARS[0];

  return (
    <div className="flex flex-col gap-8">
      {/* Section Header */}
      <div className="flex flex-col gap-2 border-b-base pb-6">
        <div className="inline-flex items-center gap-2 border-base bg-surface px-3 py-1 w-max">
          <span className="h-2 w-2 rounded-full bg-brick animate-ping" />
          <span className="type-micro font-bold uppercase tracking-wider text-ink">
            LAB DISSECTION // UJI STANDAR GARMEN
          </span>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="type-h2 text-ink">STANDAR KUALITAS GARMEN</h2>
            <p className="type-small text-muted mt-1 max-w-[65ch]">
              Klik setiap parameter untuk memeriksa pengujian lab, geometri potongan,
              dan spesifikasi material yang kami terapkan pada setiap lembar pakaian.
            </p>
          </div>
          <div className="border border-ink bg-surface px-3 py-1 text-xs font-mono font-bold text-success flex items-center gap-2">
            <Check className="h-4 w-4" />
            <span>LAB STATUS: ALL PASSED [100%]</span>
          </div>
        </div>
      </div>

      {/* 4 Interactive Dissection Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {PILLARS.map((pillar) => {
          const isActive = activeTab === pillar.id;
          return (
            <button
              key={pillar.id}
              type="button"
              onClick={() => {
                setActiveTab(pillar.id);
                setActivePin(null);
              }}
              className={cn(
                "p-3 sm:p-4 text-left border-base transition-all font-mono select-none pressable-hard",
                isActive
                  ? "bg-ink text-surface shadow-hard border-ink scale-102"
                  : "bg-surface text-ink hover:bg-page shadow-hard-sm"
              )}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={cn(
                    "text-[10px] font-black uppercase",
                    isActive ? "text-gold" : "text-brick"
                  )}
                >
                  {pillar.tabLabel}
                </span>
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    isActive ? "bg-gold" : "bg-line-soft"
                  )}
                />
              </div>
              <p className="text-xs sm:text-sm font-bold truncate">
                {pillar.title.split(" ")[0]} {pillar.title.split(" ")[1]}
              </p>
            </button>
          );
        })}
      </div>

      {/* Main Laboratory Dissection Workbench */}
      <div className="border-strong bg-surface p-6 sm:p-8 lg:p-10 shadow-hard relative overflow-hidden">
        
        {/* Background Engineering Grid Watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.03] select-none bg-[radial-gradient(#2D2D56_1px,transparent_1px)] [background-size:16px_16px]"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Column: Technical Spec & Breakdown */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs font-black text-brick bg-page px-2 py-0.5 border border-line-soft">
                  SPESIFIKASI TEKNIS #{activeTab.toUpperCase()}
                </span>
                <span className="text-xs font-mono text-muted">QC-REV-2026</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black uppercase font-display text-ink leading-tight">
                {current.title}
              </h3>
              <p className="type-body text-muted mt-2 leading-relaxed">
                {current.subtitle}
              </p>
            </div>

            {/* 4-Cell Metric Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {current.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="border border-ink bg-page p-2.5 sm:p-3 flex flex-col justify-between"
                >
                  <span className="text-[9px] font-mono text-muted uppercase">
                    {m.label}
                  </span>
                  <span className="font-mono text-base sm:text-lg font-black text-ink my-0.5">
                    {m.value}
                  </span>
                  <span className="text-[9px] font-mono font-bold text-success bg-surface px-1 py-0.5 border border-line-soft text-center">
                    {m.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Feature Checklist */}
            <div className="border-t border-line-soft pt-4 flex flex-col gap-2">
              <span className="font-mono text-xs font-bold text-ink uppercase tracking-wider">
                HASIL UJI GARMEN:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {current.breakdown.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="h-4 w-4 bg-gold border border-ink text-ink flex items-center justify-center shrink-0 text-[10px] font-black mt-0.5">
                      ✓
                    </span>
                    <span className="text-ink font-medium leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Vector Blueprint Graphic */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="border-2 border-ink bg-page p-4 sm:p-6 relative select-none">
              
              {/* Header Blueprint Tag */}
              <div className="flex items-center justify-between border-b border-line-soft pb-2 mb-4 font-mono text-[10px]">
                <span className="font-bold text-ink">{current.blueprintTitle}</span>
                <span className="text-brick font-black">SCALE 1:1</span>
              </div>

              {/* Vector Blueprint SVG Canvas with Hotspot Pins */}
              <div className="relative aspect-square w-full bg-surface border border-ink p-4 flex items-center justify-center overflow-hidden">
                
                {/* Architectural Blueprint Garment Silhouette */}
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-full text-ink opacity-85"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  {/* Grid Lines */}
                  <line x1="100" y1="0" x2="100" y2="200" strokeDasharray="3 3" opacity="0.3" />
                  <line x1="0" y1="100" x2="200" y2="100" strokeDasharray="3 3" opacity="0.3" />

                  {/* Garment Outer Body (Boxy Tee Blueprint) */}
                  <path
                    d="M 65 30 L 40 45 L 20 70 L 45 85 L 55 68 L 55 175 L 145 175 L 145 68 L 155 85 L 180 70 L 160 45 L 135 30 C 120 40, 80 40, 65 30 Z"
                    fill="#F3F3F8"
                    stroke="#2D2D56"
                    strokeWidth="2.5"
                  />
                  {/* Neck Rib */}
                  <path
                    d="M 65 30 C 80 44, 120 44, 135 30"
                    stroke="#B8523C"
                    strokeWidth="3.5"
                  />
                  {/* Shoulder seams */}
                  <line x1="65" y1="30" x2="40" y2="45" stroke="#F0B429" strokeWidth="2.5" />
                  <line x1="135" y1="30" x2="160" y2="45" stroke="#F0B429" strokeWidth="2.5" />
                  {/* Hem Twin Needle */}
                  <line x1="55" y1="170" x2="145" y2="170" stroke="#2D2D56" strokeDasharray="4 2" />
                </svg>

                {/* Interactive Clickable Pins on Blueprint */}
                {current.blueprintPoints.map((pin, idx) => {
                  const isSelected = activePin === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActivePin(isSelected ? null : idx)}
                      style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                      className={cn(
                        "absolute -translate-x-1/2 -translate-y-1/2 h-6 w-6 border-2 border-ink flex items-center justify-center font-mono text-[10px] font-black transition-transform duration-200 hover:scale-125 z-20",
                        isSelected
                          ? "bg-brick text-surface scale-125 shadow-hard-sm"
                          : "bg-gold text-ink"
                      )}
                    >
                      {idx + 1}
                    </button>
                  );
                })}

                {/* Tactile QC Stamp */}
                <div className="pointer-events-none absolute bottom-3 right-3 rotate-[-8deg] border-2 border-danger bg-surface/90 px-2 py-1 text-danger font-mono font-black text-[10px] shadow-hard-sm animate-stamp-pop">
                  PASSED QC [OK]
                </div>
              </div>

              {/* Pin Inspection Readout */}
              <div className="mt-3 min-h-[52px] border border-ink bg-surface p-2.5">
                {activePin !== null && current.blueprintPoints[activePin] ? (
                  <div className="animate-model-pop">
                    <p className="font-mono text-xs font-black text-brick uppercase">
                      POINT 0{activePin + 1}: {current.blueprintPoints[activePin].label}
                    </p>
                    <p className="text-xs text-ink font-medium mt-0.5">
                      {current.blueprintPoints[activePin].note}
                    </p>
                  </div>
                ) : (
                  <p className="font-mono text-[11px] text-muted text-center pt-2">
                    [ KLIK TITIK 1, 2, 3 PADA BLUEPRINT UNTUK INSPEKSI ]
                  </p>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

