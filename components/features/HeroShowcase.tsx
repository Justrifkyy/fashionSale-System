"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";

type OutfitKey = "dayli" | "casual" | "formal";

interface AccessoryItem {
  id: string;
  name: string;
  badge: string;
  positionClass: string;
  rotation: string;
  renderSvg: () => React.ReactNode;
}

/**
 * Avant-Garde Neo-Brutalist Hero Showcase:
 * - Half-Body Cutout Zoom: Zooms in on the model from head to waist for monumental impact.
 * - Dynamic Multi-Layer Neo-Brutalist Shadow: Layered Gold backlight rim + Ink Navy hard shadow + Terracotta brick accent shadow.
 * - Interactive Mouse-Shifted Shadow: Shadows react dynamically to pointer coordinates.
 * - Scroll-Driven Zoom Effect: As user scrolls down, the half-body model zooms in from 1.10x to 1.38x.
 * - Wall-to-Wall Gradient Typography: Massive "CARE CARE" red-to-blue gradient shining directly behind the model.
 * - Pinned Streetwear Artifacts: Industrial inspection ticket with barcode + floating corner badge.
 * - Studio Shutter Flash & Viewfinder Animation: Snappy camera shutter flash overlay, reticle brackets, and model pop on look change.
 * - Outfit-Specific Dynamic Fashion Accessories: 18 distinct Atelier Lookbook items reacting to active outfit.
 */
export function HeroShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [activePhoto, setActivePhoto] = useState<OutfitKey>("dayli");
  const [flashKey, setFlashKey] = useState(0);

  // Dynamic Background Title with Auto-Fit Width logic
  const [bgTitle] = useState("CARE CARE");
  const [titleFontSize, setTitleFontSize] = useState<number>(170);

  // Transparent half-body cutout models (Standardized 1200x1600 Native HD resolution)
  const photos = {
    dayli: {
      url: "/images/models/hero-look-casual.png",
      name: "Setelan Boxy Dayli Skena",
      edition: "DROP 01 - DAYLI STREETWEAR",
      code: "CC-MKS-01-DLY",
      fabric: "235 GSM HEAVYWEIGHT TEE",
      badge: "100% COMBED HEAVY",
      label: "DAYLI",
    },
    casual: {
      url: "/images/models/hero-look-03-gold.png",
      name: "Setelan Gold Street Casual",
      edition: "DROP 01 - PESISIR CASUAL",
      code: "CC-MKS-02-CSL",
      fabric: "190 GSM COMBED TENUN",
      badge: "100% KATUN TENUN",
      label: "CASUAL",
    },
    formal: {
      url: "/images/models/hero-look-profesional.png",
      name: "Setelan Oxford Navy Formal",
      edition: "DROP 01 - FORMAL / KERJA",
      code: "CC-MKS-03-FRM",
      fabric: "210 GSM OXFORD POPLIN",
      badge: "100% OXFORD SUITING",
      label: "FORMAL",
    },
  };

  // Auto-fit font size calculation: guarantees text fills ~95% wall-to-wall between left and right boundaries
  useEffect(() => {
    const adjustTitleSize = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      // Target width is ~95% of container to span wall-to-wall from left to right edge
      const targetWidth = Math.min(containerWidth * 0.95, 1600);

      if (titleRef.current) {
        const currentWidth = titleRef.current.offsetWidth;
        const currentFontSize = parseFloat(window.getComputedStyle(titleRef.current).fontSize) || 100;
        if (currentWidth > 0) {
          const calculated = (targetWidth / currentWidth) * currentFontSize;
          setTitleFontSize(Math.min(Math.max(calculated, 40), 245));
          return;
        }
      }

      // Fallback measurement using canvas context
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.font = '900 100px var(--font-archivo), "Arial Black", sans-serif';
        const measured = ctx.measureText(bgTitle).width;
        if (measured > 0) {
          const calculated = (targetWidth / measured) * 100;
          setTitleFontSize(Math.min(Math.max(calculated, 40), 245));
        }
      }
    };

    adjustTitleSize();
    window.addEventListener("resize", adjustTitleSize);
    return () => window.removeEventListener("resize", adjustTitleSize);
  }, [bgTitle]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(Math.min(window.scrollY, 700));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const handleSelectOutfit = (key: OutfitKey) => {
    if (key === activePhoto) return;
    setActivePhoto(key);
    setFlashKey((prev) => prev + 1);
  };

  // Auto-switch outfit selection every 5 seconds (5000ms)
  useEffect(() => {
    const OUTFIT_KEYS: OutfitKey[] = ["dayli", "casual", "formal"];
    const timer = setInterval(() => {
      setActivePhoto((prev) => {
        const nextIndex = (OUTFIT_KEYS.indexOf(prev) + 1) % OUTFIT_KEYS.length;
        return OUTFIT_KEYS[nextIndex];
      });
      setFlashKey((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(timer);
  }, [activePhoto]);

  // Scroll-driven zoom calculations: half-body zoomed presentation (1.10x -> 1.38x)
  const scrollProgress = Math.min(scrollY / 450, 1);
  const zoomScale = 1.10 + scrollProgress * 0.28;

  // Parallax physics calculations
  const textTranslateX = -scrollY * 0.06 + mouseOffset.x * -14;
  const textTranslateY = scrollY * 0.18;
  const modelTranslateY = scrollY * 0.05 + mouseOffset.y * 14;
  const modelTranslateX = mouseOffset.x * 18;
  const tagTranslateX = mouseOffset.x * 12;
  const tagTranslateY = scrollY * 0.02 + mouseOffset.y * 8;

  // Dynamic layered shadow calculations reacting to mouse movement
  const shadowDarkX = Math.round(14 + mouseOffset.x * 16);
  const shadowDarkY = Math.round(16 + mouseOffset.y * 16);
  const shadowAccentX = Math.round(shadowDarkX * 1.5);
  const shadowAccentY = Math.round(shadowDarkY * 1.5);

  const multiLayerShadow = `
    drop-shadow(-4px -4px 0px rgba(240, 180, 41, 0.9))
    drop-shadow(${shadowDarkX}px ${shadowDarkY}px 0px #2D2D56)
    drop-shadow(${shadowAccentX}px ${shadowAccentY}px 0px rgba(184, 82, 60, 0.45))
  `;

  const currentLook = photos[activePhoto];

  // Independent 6 accessory slots around the model
  const accessorySlots = [
    {
      positionClass: "top-6 left-3 sm:top-10 sm:left-8 lg:left-14",
      offsetX: mouseOffset.x * -20,
      offsetY: mouseOffset.y * -14,
    },
    {
      positionClass: "top-8 right-3 sm:top-12 sm:right-8 lg:right-18",
      offsetX: mouseOffset.x * 22,
      offsetY: mouseOffset.y * -16,
    },
    {
      positionClass: "hidden sm:block top-[38%] left-2 sm:left-6 lg:left-10",
      offsetX: mouseOffset.x * -18,
      offsetY: mouseOffset.y * 10,
    },
    {
      positionClass: "hidden sm:block top-[40%] right-2 sm:right-6 lg:right-12",
      offsetX: mouseOffset.x * 24,
      offsetY: mouseOffset.y * 14,
    },
    {
      positionClass: "bottom-22 left-3 sm:bottom-24 sm:left-8 lg:left-16",
      offsetX: mouseOffset.x * -22,
      offsetY: mouseOffset.y * 18,
    },
    {
      positionClass: "bottom-20 right-3 sm:bottom-22 sm:right-8 lg:right-18",
      offsetX: mouseOffset.x * 18,
      offsetY: mouseOffset.y * 20,
    },
  ];

  const currentAccessories = ACCESSORIES_DATA[activePhoto];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden border-b-strong bg-page min-h-[740px] sm:min-h-[820px] lg:min-h-[900px] flex flex-col justify-between select-none pt-8 sm:pt-12"
    >
      {/* STUDIO SHUTTER FLASH OVERLAY (Camera Shutter Animation) */}
      {flashKey > 0 && (
        <div
          key={`flash-${flashKey}`}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-40 bg-gradient-to-b from-white/80 via-gold/25 to-transparent mix-blend-screen animate-shutter-flash"
        />
      )}

      {/* STUDIO VIEWFINDER HUD CORNER BRACKETS */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-4 sm:inset-6 z-25 flex flex-col justify-between select-none"
      >
        <div className="flex justify-between items-start text-ink/75 font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-widest">
          <div className="flex items-center gap-1.5">
            <span className="text-brick font-black text-sm">┌</span>
            <span className="bg-surface/90 px-1.5 py-0.5 border border-ink/20 shadow-hard-sm">
              REC // LOOK 0{activePhoto === "dayli" ? "1" : activePhoto === "casual" ? "2" : "3"}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="bg-surface/90 px-1.5 py-0.5 border border-ink/20 shadow-hard-sm">
              ISO 400 • 1/250s
            </span>
            <span className="text-brick font-black text-sm">┐</span>
          </div>
        </div>

        <div className="flex justify-between items-end text-ink/75 font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-widest">
          <div className="flex items-center gap-1.5">
            <span className="text-brick font-black text-sm">└</span>
            <span className="bg-surface/90 px-1.5 py-0.5 border border-ink/20 shadow-hard-sm hidden sm:inline-block">
              MAKASSAR LOOKBOOK
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="bg-surface/90 px-1.5 py-0.5 border border-ink/20 shadow-hard-sm">
              AF-C [LOCK]
            </span>
            <span className="text-brick font-black text-sm">┘</span>
          </div>
        </div>
      </div>

      {/* 1. LAYER 0: GIANT AUTO-FIT "CARE CARE" DISPLAY WATERMARK */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
      >
        <div
          style={{
            transform: `translate3d(${textTranslateX}px, ${textTranslateY}px, 0)`,
            transition: "transform 80ms ease-out",
          }}
          className="flex flex-col items-center justify-center whitespace-nowrap will-change-transform select-none w-full px-2 text-center"
        >
          {/* Wall-to-Wall Auto-Fit Big Letters with Palette Red-to-Blue Gradient */}
          <span
            ref={titleRef}
            style={{
              fontSize: `${titleFontSize}px`,
              transition: "font-size 150ms ease-out",
            }}
            className="font-black uppercase font-display leading-[0.80] tracking-tight text-gradient-care opacity-85 select-none drop-shadow-xs max-w-[98vw] text-center inline-block whitespace-nowrap"
          >
            {bgTitle}
          </span>
          <span className="text-[3vw] sm:text-[1.8vw] lg:text-[1.2vw] font-black uppercase font-display tracking-[0.25em] text-gradient-care opacity-60 mt-1">
            MAKASSAR // STREETWEAR // 2026
          </span>
        </div>
      </div>

      {/* 2. LAYER: DYNAMIC FLOATING FASHION ACCESSORY ARTIFACTS (Synced with Active Outfit) */}
      {currentAccessories.map((item, idx) => {
        const slot = accessorySlots[idx];
        return (
          <div
            key={`${activePhoto}-${item.id}`}
            style={{
              transform: `translate3d(${slot.offsetX}px, ${slot.offsetY}px, 0) rotate(${item.rotation})`,
              animationDelay: `${idx * 60}ms`,
            }}
            className={cn(
              "group pointer-events-auto absolute z-20 select-none transition-transform duration-300 ease-out hover:scale-115 animate-stamp-pop",
              slot.positionClass
            )}
          >
            <div className="border-2 border-ink bg-surface p-2 sm:p-2.5 shadow-hard-sm group-hover:shadow-hard group-hover:-rotate-2 transition-all">
              <div className="w-16 h-12 sm:w-20 sm:h-16 flex items-center justify-center bg-page border border-line-soft overflow-hidden p-1">
                {item.renderSvg()}
              </div>
              <div className="mt-1 flex items-center justify-between border-t border-line-soft pt-1">
                <span className="font-mono text-[8px] sm:text-[9px] font-bold text-ink uppercase tracking-wider">
                  {item.name}
                </span>
                <span className="font-mono text-[7px] sm:text-[8px] text-brick font-bold">
                  {item.badge}
                </span>
              </div>
            </div>
          </div>
        );
      })}

      {/* 3. LAYER 1: CENTER-STAGE HALF-BODY CUTOUT MODEL WITH DYNAMIC SHADOWS & SCROLL ZOOM */}
      <div className="relative z-10 mx-auto my-auto flex w-full max-w-[1360px] items-center justify-center px-4 py-4 sm:px-6 lg:px-10">
        <div className="relative flex items-center justify-center">
          
          {/* Ambient Focal Glow Aura behind Model Silhouette */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-16 z-0 bg-[radial-gradient(ellipse_at_center,rgba(240,180,41,0.22)_0%,rgba(184,82,60,0.12)_45%,transparent_70%)] blur-lg"
          />

          {/* Half-Body Transparent Cutout Model Container */}
          <div
            style={{
              transform: `translate3d(${modelTranslateX}px, ${modelTranslateY}px, 0) scale(${zoomScale})`,
              transformOrigin: "center 16%",
              transition: "transform 110ms cubic-bezier(0.16, 1, 0.3, 1), filter 150ms ease-out",
              filter: multiLayerShadow,
            }}
            className="relative h-[530px] sm:h-[630px] lg:h-[740px] xl:h-[800px] w-[398px] sm:w-[472px] lg:w-[555px] xl:w-[600px] will-change-transform flex items-center justify-center"
          >
            {/* Inner re-mounting container to trigger animate-model-pop on change */}
            <div
              key={activePhoto}
              className="relative w-full h-full flex items-center justify-center animate-model-pop"
            >
              <Image
                src={currentLook.url}
                alt={currentLook.name}
                fill
                priority
                sizes="(max-width: 640px) 400px, (max-width: 1024px) 560px, 600px"
                className="object-contain object-top pointer-events-none"
              />
            </div>
          </div>

          {/* 4. PINNED INDUSTRIAL GARMENT INSPECTION TAG (Streetwear Artifact) */}
          <div
            style={{
              transform: `translate3d(${tagTranslateX}px, ${tagTranslateY}px, 0) rotate(-6deg)`,
              transition: "transform 110ms ease-out",
            }}
            className="absolute top-12 -left-4 sm:top-20 sm:-left-16 z-30 w-[160px] sm:w-[200px] border-strong bg-surface p-3 sm:p-4 shadow-hard pointer-events-none transition-colors"
          >
            {/* Tag Header */}
            <div className="flex items-center justify-between border-b border-line-soft pb-1.5">
              <span className="text-[10px] font-black text-ink uppercase font-display tracking-widest">
                INSPECTION TAG
              </span>
              <span className="h-2 w-2 bg-brick border border-ink" />
            </div>

            {/* Spec Details */}
            <div
              key={`tag-spec-${activePhoto}`}
              className="py-2 flex flex-col gap-1 text-[10px] font-mono text-ink animate-model-pop"
            >
              <div className="flex justify-between">
                <span className="text-muted">ART.NO</span>
                <span className="font-bold">{currentLook.code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">FABRIC</span>
                <span className="font-bold truncate max-w-[100px]">
                  {currentLook.fabric}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">ORIGIN</span>
                <span className="font-bold">MAKASSAR ID</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">STATUS</span>
                <span className="font-bold text-success">PASSED [OK]</span>
              </div>
            </div>

            {/* SVG Industrial Barcode */}
            <div className="pt-1 border-t border-line-soft">
              <svg
                className="w-full h-6 text-ink"
                viewBox="0 0 120 28"
                fill="currentColor"
                aria-hidden="true"
              >
                <rect x="0" y="0" width="3" height="28" />
                <rect x="5" y="0" width="1" height="28" />
                <rect x="8" y="0" width="4" height="28" />
                <rect x="15" y="0" width="2" height="28" />
                <rect x="19" y="0" width="1" height="28" />
                <rect x="22" y="0" width="5" height="28" />
                <rect x="30" y="0" width="2" height="28" />
                <rect x="34" y="0" width="3" height="28" />
                <rect x="40" y="0" width="1" height="28" />
                <rect x="44" y="0" width="4" height="28" />
                <rect x="51" y="0" width="2" height="28" />
                <rect x="56" y="0" width="1" height="28" />
                <rect x="60" y="0" width="5" height="28" />
                <rect x="68" y="0" width="2" height="28" />
                <rect x="73" y="0" width="3" height="28" />
                <rect x="78" y="0" width="1" height="28" />
                <rect x="82" y="0" width="4" height="28" />
                <rect x="89" y="0" width="2" height="28" />
                <rect x="94" y="0" width="1" height="28" />
                <rect x="98" y="0" width="5" height="28" />
                <rect x="106" y="0" width="2" height="28" />
                <rect x="111" y="0" width="3" height="28" />
                <rect x="116" y="0" width="2" height="28" />
              </svg>
            </div>
          </div>

          {/* 5. CORNER FLOATING BADGE (Synced with Outfit) */}
          <div
            key={`badge-${activePhoto}`}
            className="pointer-events-none absolute top-2 -right-4 sm:top-6 sm:-right-10 z-30 rotate-[12deg] animate-stamp-pop"
          >
            <span className="inline-block border-strong bg-brick px-3 py-1.5 text-[11px] sm:text-[12px] font-black text-surface tracking-wider uppercase font-display shadow-hard-sm">
              {currentLook.badge}
            </span>
          </div>
        </div>
      </div>

      {/* 6. AESTHETIC OUTFIT SWITCHER (Raised slightly upward per user request) */}
      <div className="relative z-30 flex items-center justify-center gap-2 sm:gap-3 pb-12 sm:pb-16 -translate-y-4 sm:-translate-y-6">
        {(["dayli", "casual", "formal"] as const).map((key, idx) => {
          const isActive = activePhoto === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => handleSelectOutfit(key)}
              aria-label={`Pilih gaya ${photos[key].name}`}
              className={cn(
                "px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-black uppercase font-display border-base pressable-hard transition-all tracking-wider flex items-center gap-2",
                isActive
                  ? "bg-ink text-surface shadow-hard scale-105 border-ink ring-2 ring-gold"
                  : "bg-surface text-ink hover:bg-gold shadow-hard-sm"
              )}
            >
              <span
                className={cn(
                  "h-2 w-2 rounded-full transition-colors",
                  isActive ? "bg-gold animate-pulse" : "bg-line-soft"
                )}
              />
              <span>{photos[key].label}</span>
              <span className="font-mono text-[9px] opacity-60">0{idx + 1}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * 18 Bespoke Neo-Brutalist Fashion Accessories
 * Tailored specifically for DAYLI, CASUAL, and FORMAL lookbooks.
 */
const ACCESSORIES_DATA: Record<OutfitKey, AccessoryItem[]> = {
  dayli: [
    {
      id: "dayli-cap",
      name: "TOPI 5-PANEL",
      badge: "CC-01",
      positionClass: "",
      rotation: "-8deg",
      renderSvg: () => (
        <svg viewBox="0 0 100 80" className="w-full h-full" fill="none">
          <path
            d="M18 52 C 20 25, 45 15, 75 22 C 85 25, 88 40, 88 52 Z"
            fill="#F0B429"
            stroke="#2D2D56"
            strokeWidth="3.5"
          />
          <path d="M42 18 L 46 52" stroke="#2D2D56" strokeWidth="2" strokeDasharray="3 2" />
          <path d="M65 20 L 68 52" stroke="#2D2D56" strokeWidth="2" strokeDasharray="3 2" />
          <path
            d="M10 54 C 15 50, 75 48, 95 53 C 96 59, 85 65, 60 64 C 30 63, 12 59, 10 54 Z"
            fill="#B8523C"
            stroke="#2D2D56"
            strokeWidth="3.5"
          />
          <rect x="47" y="30" width="18" height="12" fill="#FFFFFF" stroke="#2D2D56" strokeWidth="2" />
          <text x="56" y="39" textAnchor="middle" fontSize="8" fontWeight="900" fill="#2D2D56" fontFamily="sans-serif">CC</text>
          <circle cx="35" cy="28" r="2" fill="#2D2D56" />
        </svg>
      ),
    },
    {
      id: "dayli-comb",
      name: "SISIR SAKU",
      badge: "04",
      positionClass: "",
      rotation: "14deg",
      renderSvg: () => (
        <svg viewBox="0 0 100 70" className="w-full h-full" fill="none">
          <path
            d="M10 20 C 10 15, 90 15, 90 20 L 90 32 L 10 32 Z"
            fill="#2D2D56"
            stroke="#2D2D56"
            strokeWidth="2.5"
          />
          <text x="50" y="27" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#F0B429" fontFamily="monospace">
            CARE CARE
          </text>
          {[14, 19, 24, 29, 34, 39, 44, 49, 54, 59, 64, 69, 74, 79, 84, 88].map((x, i) => (
            <line
              key={x}
              x1={x}
              y1="32"
              x2={x}
              y2={i % 2 === 0 ? "54" : "50"}
              stroke="#B8523C"
              strokeWidth={i > 8 ? "2.5" : "1.8"}
              strokeLinecap="round"
            />
          ))}
        </svg>
      ),
    },
    {
      id: "dayli-pin",
      name: "PENITI BAJA",
      badge: "65MM",
      positionClass: "",
      rotation: "-6deg",
      renderSvg: () => (
        <svg viewBox="0 0 80 50" className="w-full h-full" fill="none">
          <path
            d="M15 35 C 10 35, 10 15, 20 15 L 65 15 C 72 15, 72 25, 65 25 L 24 25"
            stroke="#2D2D56"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="15" cy="35" r="5" fill="#F0B429" stroke="#2D2D56" strokeWidth="2" />
          <rect x="60" y="12" width="12" height="16" rx="2" fill="#B8523C" stroke="#2D2D56" strokeWidth="2" />
          <text x="66" y="23" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#FFFFFF">CC</text>
        </svg>
      ),
    },
    {
      id: "dayli-shades",
      name: "KACAMATA 90S",
      badge: "UV-400",
      positionClass: "",
      rotation: "-10deg",
      renderSvg: () => (
        <svg viewBox="0 0 100 50" className="w-full h-full" fill="none">
          <rect x="8" y="12" width="36" height="26" rx="5" fill="#2D2D56" stroke="#2D2D56" strokeWidth="2" />
          <rect x="12" y="15" width="28" height="19" rx="3" fill="#B8523C" fillOpacity="0.85" />
          <path d="M44 18 Q 50 14 56 18" stroke="#2D2D56" strokeWidth="4" strokeLinecap="round" />
          <rect x="56" y="12" width="36" height="26" rx="5" fill="#2D2D56" stroke="#2D2D56" strokeWidth="2" />
          <rect x="60" y="15" width="28" height="19" rx="3" fill="#B8523C" fillOpacity="0.85" />
          <line x1="14" y1="18" x2="28" y2="30" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.5" strokeLinecap="round" />
          <line x1="62" y1="18" x2="76" y2="30" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.5" strokeLinecap="round" />
          <circle cx="10" cy="15" r="1.5" fill="#F0B429" />
          <circle cx="90" cy="15" r="1.5" fill="#F0B429" />
        </svg>
      ),
    },
    {
      id: "dayli-keychain",
      name: "KEYCHAIN",
      badge: "PAOTERE",
      positionClass: "",
      rotation: "12deg",
      renderSvg: () => (
        <svg viewBox="0 0 100 80" className="w-full h-full" fill="none">
          <path
            d="M30 15 C 30 10, 68 10, 68 15 L 68 38 C 68 44, 48 48, 40 44 L 30 38 Z"
            stroke="#2D2D56"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />
          <rect x="28" y="18" width="5" height="16" fill="#F0B429" stroke="#2D2D56" strokeWidth="2" />
          <polygon points="45,42 78,45 72,72 39,69" fill="#B8523C" stroke="#2D2D56" strokeWidth="2" />
          <text x="56" y="58" fontSize="7" fontWeight="bold" fill="#FFFFFF" fontFamily="sans-serif" transform="rotate(4 56 58)">
            ROOM 26
          </text>
          <text x="55" y="66" fontSize="5" fontWeight="bold" fill="#F0B429" fontFamily="monospace" transform="rotate(4 55 66)">
            MAKASSAR
          </text>
        </svg>
      ),
    },
    {
      id: "dayli-tape",
      name: "PITA UKUR",
      badge: "150CM",
      positionClass: "",
      rotation: "-12deg",
      renderSvg: () => (
        <svg viewBox="0 0 100 50" className="w-full h-full" fill="none">
          <path d="M8 32 Q 30 10 50 28 T 92 20" stroke="#F0B429" strokeWidth="14" strokeLinecap="square" />
          {[14, 20, 26, 32, 38, 44, 50, 56, 62, 68, 74, 80, 86].map((x, i) => (
            <line
              key={x}
              x1={x}
              y1={i % 2 === 0 ? "19" : "22"}
              x2={x}
              y2="28"
              stroke="#2D2D56"
              strokeWidth={i % 4 === 0 ? "1.8" : "1"}
            />
          ))}
          <rect x="6" y="24" width="5" height="14" fill="#2D2D56" />
        </svg>
      ),
    },
  ],

  casual: [
    {
      id: "casual-beanie",
      name: "BEANIE RAJUT",
      badge: "GOLD",
      positionClass: "",
      rotation: "-10deg",
      renderSvg: () => (
        <svg viewBox="0 0 100 80" className="w-full h-full" fill="none">
          <path
            d="M25 55 C 20 30, 40 14, 50 14 C 60 14, 80 30, 75 55 Z"
            fill="#F0B429"
            stroke="#2D2D56"
            strokeWidth="3.5"
          />
          {/* Ribbed lines */}
          <line x1="38" y1="18" x2="36" y2="55" stroke="#2D2D56" strokeWidth="1.8" strokeDasharray="3 2" />
          <line x1="50" y1="14" x2="50" y2="55" stroke="#2D2D56" strokeWidth="1.8" strokeDasharray="3 2" />
          <line x1="62" y1="18" x2="64" y2="55" stroke="#2D2D56" strokeWidth="1.8" strokeDasharray="3 2" />
          {/* Folded cuff */}
          <rect x="18" y="52" width="64" height="18" rx="2" fill="#B8523C" stroke="#2D2D56" strokeWidth="3" />
          <rect x="42" y="56" width="16" height="10" fill="#FFFFFF" stroke="#2D2D56" strokeWidth="1.5" />
          <text x="50" y="64" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#2D2D56">CC</text>
        </svg>
      ),
    },
    {
      id: "casual-cateye",
      name: "CAT-EYE SHADES",
      badge: "POLAR",
      positionClass: "",
      rotation: "12deg",
      renderSvg: () => (
        <svg viewBox="0 0 100 50" className="w-full h-full" fill="none">
          {/* Left Wing Cat Eye */}
          <polygon points="10,18 42,22 36,36 14,32" fill="#2D2D56" stroke="#2D2D56" strokeWidth="2.5" />
          <polygon points="14,21 38,24 33,33 17,30" fill="#F0B429" />
          {/* Bridge */}
          <path d="M42 22 Q 50 18 58 22" stroke="#2D2D56" strokeWidth="3.5" strokeLinecap="round" />
          {/* Right Wing Cat Eye */}
          <polygon points="58,22 90,18 86,32 64,36" fill="#2D2D56" stroke="#2D2D56" strokeWidth="2.5" />
          <polygon points="62,24 86,21 83,30 67,33" fill="#F0B429" />
          {/* Glare highlight */}
          <line x1="18" y1="23" x2="28" y2="32" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.8" />
          <line x1="68" y1="24" x2="78" y2="33" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.8" />
        </svg>
      ),
    },
    {
      id: "casual-mirror",
      name: "COMPACT MIRROR",
      badge: "BRASS",
      positionClass: "",
      rotation: "-8deg",
      renderSvg: () => (
        <svg viewBox="0 0 90 70" className="w-full h-full" fill="none">
          {/* Top open lid */}
          <ellipse cx="45" cy="24" rx="28" ry="12" fill="#F0B429" stroke="#2D2D56" strokeWidth="3" />
          <ellipse cx="45" cy="24" rx="22" ry="8" fill="#E4E4EE" stroke="#2D2D56" strokeWidth="1.5" />
          <line x1="32" y1="22" x2="42" y2="26" stroke="#FFFFFF" strokeWidth="2" />
          {/* Base */}
          <ellipse cx="45" cy="46" rx="28" ry="14" fill="#B8523C" stroke="#2D2D56" strokeWidth="3" />
          <ellipse cx="45" cy="46" rx="20" ry="8" fill="#F0B429" stroke="#2D2D56" strokeWidth="1.5" />
          <text x="45" y="49" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#2D2D56">CARE</text>
        </svg>
      ),
    },
    {
      id: "casual-pouch",
      name: "SLING POUCH",
      badge: "CC-BOX",
      positionClass: "",
      rotation: "-12deg",
      renderSvg: () => (
        <svg viewBox="0 0 100 80" className="w-full h-full" fill="none">
          {/* Strap */}
          <path d="M25 15 Q 50 2 75 15" stroke="#2D2D56" strokeWidth="4" fill="none" strokeDasharray="5 3" />
          {/* Boxy pouch body */}
          <rect x="22" y="24" width="56" height="46" rx="3" fill="#B8523C" stroke="#2D2D56" strokeWidth="3.5" />
          {/* Front flap */}
          <path d="M22 24 L 78 24 L 68 46 L 32 46 Z" fill="#9A3F2B" stroke="#2D2D56" strokeWidth="2.5" />
          {/* Brass buckle */}
          <rect x="44" y="42" width="12" height="10" fill="#F0B429" stroke="#2D2D56" strokeWidth="2" />
          <circle cx="50" cy="47" r="2" fill="#2D2D56" />
        </svg>
      ),
    },
    {
      id: "casual-charm",
      name: "BEAR CHARM",
      badge: "SKENA",
      positionClass: "",
      rotation: "15deg",
      renderSvg: () => (
        <svg viewBox="0 0 90 80" className="w-full h-full" fill="none">
          {/* Chain loop */}
          <circle cx="45" cy="14" r="7" stroke="#2D2D56" strokeWidth="3" />
          {/* Bear head */}
          <circle cx="32" cy="28" r="8" fill="#F0B429" stroke="#2D2D56" strokeWidth="2.5" />
          <circle cx="58" cy="28" r="8" fill="#F0B429" stroke="#2D2D56" strokeWidth="2.5" />
          <ellipse cx="45" cy="42" rx="20" ry="17" fill="#F0B429" stroke="#2D2D56" strokeWidth="3" />
          <ellipse cx="45" cy="47" rx="8" ry="6" fill="#FFFFFF" stroke="#2D2D56" strokeWidth="1.5" />
          <circle cx="45" cy="45" r="2.5" fill="#2D2D56" />
          <circle cx="38" cy="38" r="2" fill="#2D2D56" />
          <circle cx="52" cy="38" r="2" fill="#2D2D56" />
          {/* Bowtie */}
          <polygon points="37,58 45,61 37,64" fill="#B8523C" stroke="#2D2D56" strokeWidth="1.5" />
          <polygon points="53,58 45,61 53,64" fill="#B8523C" stroke="#2D2D56" strokeWidth="1.5" />
          <circle cx="45" cy="61" r="2" fill="#2D2D56" />
        </svg>
      ),
    },
    {
      id: "casual-chain",
      name: "CUBAN CHAIN",
      badge: "18K",
      positionClass: "",
      rotation: "-14deg",
      renderSvg: () => (
        <svg viewBox="0 0 100 50" className="w-full h-full" fill="none">
          {/* Interlocking Cuban links */}
          {[16, 28, 40, 52, 64, 76].map((x, idx) => (
            <ellipse
              key={x}
              cx={x}
              cy="25"
              rx="10"
              ry="14"
              fill="none"
              stroke={idx % 2 === 0 ? "#F0B429" : "#B8523C"}
              strokeWidth="4"
              transform={`rotate(${idx % 2 === 0 ? 25 : -25} ${x} 25)`}
            />
          ))}
          <rect x="80" y="20" width="8" height="10" fill="#2D2D56" stroke="#2D2D56" strokeWidth="1.5" />
        </svg>
      ),
    },
  ],

  formal: [
    {
      id: "formal-watch",
      name: "CHRONO 40",
      badge: "NAVY",
      positionClass: "",
      rotation: "-6deg",
      renderSvg: () => (
        <svg viewBox="0 0 100 80" className="w-full h-full" fill="none">
          {/* Leather strap */}
          <rect x="42" y="4" width="16" height="72" fill="#2D2D56" stroke="#2D2D56" strokeWidth="2.5" />
          <line x1="44" y1="8" x2="44" y2="72" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 2" />
          <line x1="56" y1="8" x2="56" y2="72" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 2" />
          {/* Watch case */}
          <circle cx="50" cy="40" r="22" fill="#FFFFFF" stroke="#F0B429" strokeWidth="4.5" />
          <circle cx="50" cy="40" r="18" fill="#2D2D56" stroke="#2D2D56" strokeWidth="1.5" />
          {/* Subdials */}
          <circle cx="45" cy="36" r="4" stroke="#F0B429" strokeWidth="1" />
          <circle cx="55" cy="36" r="4" stroke="#F0B429" strokeWidth="1" />
          {/* Hands */}
          <line x1="50" y1="40" x2="50" y2="28" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <line x1="50" y1="40" x2="59" y2="40" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="50" cy="40" r="1.5" fill="#B8523C" />
        </svg>
      ),
    },
    {
      id: "formal-specs",
      name: "WIREFRAME",
      badge: "TITANIUM",
      positionClass: "",
      rotation: "10deg",
      renderSvg: () => (
        <svg viewBox="0 0 100 50" className="w-full h-full" fill="none">
          {/* Geometric octagonal titanium wireframe */}
          <polygon
            points="14,14 36,14 42,24 36,36 14,36 8,24"
            fill="none"
            stroke="#F0B429"
            strokeWidth="2.5"
          />
          <path d="M42 22 Q 50 18 58 22" stroke="#F0B429" strokeWidth="2.5" fill="none" />
          <polygon
            points="64,14 86,14 92,24 86,36 64,36 58,24"
            fill="none"
            stroke="#F0B429"
            strokeWidth="2.5"
          />
          {/* Subtle reflection glare */}
          <line x1="16" y1="18" x2="26" y2="32" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.7" />
          <line x1="66" y1="18" x2="76" y2="32" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.7" />
        </svg>
      ),
    },
    {
      id: "formal-pocket",
      name: "POCKET SQUARE",
      badge: "SUTRA",
      positionClass: "",
      rotation: "-10deg",
      renderSvg: () => (
        <svg viewBox="0 0 90 70" className="w-full h-full" fill="none">
          {/* Suit pocket welt */}
          <rect x="15" y="44" width="60" height="18" fill="#2D2D56" stroke="#2D2D56" strokeWidth="3" />
          {/* Silk folded peaks */}
          <polygon points="30,44 40,14 50,44" fill="#B8523C" stroke="#2D2D56" strokeWidth="2.5" />
          <polygon points="46,44 56,20 64,44" fill="#9A3F2B" stroke="#2D2D56" strokeWidth="2.5" />
          {/* Gold piping edge */}
          <line x1="30" y1="44" x2="40" y2="14" stroke="#F0B429" strokeWidth="2" />
          <line x1="46" y1="44" x2="56" y2="20" stroke="#F0B429" strokeWidth="2" />
        </svg>
      ),
    },
    {
      id: "formal-wallet",
      name: "CARDHOLDER",
      badge: "BESPOKE",
      positionClass: "",
      rotation: "8deg",
      renderSvg: () => (
        <svg viewBox="0 0 100 70" className="w-full h-full" fill="none">
          {/* Leather body */}
          <rect x="18" y="16" width="64" height="42" rx="3" fill="#2D2D56" stroke="#2D2D56" strokeWidth="3" />
          {/* Card slots */}
          <path d="M18 28 C 35 28, 65 28, 82 28" stroke="#B8523C" strokeWidth="3" />
          <path d="M18 38 C 35 38, 65 38, 82 38" stroke="#F0B429" strokeWidth="2.5" />
          {/* Gold CC logo stamp */}
          <text x="50" y="52" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#F0B429" fontFamily="sans-serif">
            CC MAKASSAR
          </text>
        </svg>
      ),
    },
    {
      id: "formal-cufflinks",
      name: "MANSET CC",
      badge: "CUFFLINKS",
      positionClass: "",
      rotation: "-8deg",
      renderSvg: () => (
        <svg viewBox="0 0 90 70" className="w-full h-full" fill="none">
          {/* Hexagonal Gold Cufflink */}
          <polygon
            points="45,10 65,22 65,48 45,60 25,48 25,22"
            fill="#F0B429"
            stroke="#2D2D56"
            strokeWidth="3.5"
          />
          <polygon
            points="45,16 59,25 59,45 45,54 31,45 31,25"
            fill="#2D2D56"
          />
          <text x="45" y="38" textAnchor="middle" fontSize="11" fontWeight="900" fill="#FFFFFF" fontFamily="sans-serif">
            CC
          </text>
        </svg>
      ),
    },
    {
      id: "formal-pen",
      name: "FOUNTAIN PEN",
      badge: "0.5MM",
      positionClass: "",
      rotation: "16deg",
      renderSvg: () => (
        <svg viewBox="0 0 100 60" className="w-full h-full" fill="none">
          {/* Executive fountain pen */}
          <polygon points="12,28 32,22 88,22 88,34 32,34" fill="#2D2D56" stroke="#2D2D56" strokeWidth="2.5" />
          {/* Gold nib */}
          <polygon points="12,28 26,22 26,34" fill="#F0B429" stroke="#2D2D56" strokeWidth="1.5" />
          <line x1="12" y1="28" x2="22" y2="28" stroke="#2D2D56" strokeWidth="1.5" />
          <circle cx="22" cy="28" r="1" fill="#2D2D56" />
          {/* Gold clip */}
          <rect x="68" y="16" width="14" height="4" fill="#F0B429" stroke="#2D2D56" strokeWidth="1.5" />
          {/* Accent ring */}
          <line x1="56" y1="22" x2="56" y2="34" stroke="#F0B429" strokeWidth="3" />
        </svg>
      ),
    },
  ],
};
