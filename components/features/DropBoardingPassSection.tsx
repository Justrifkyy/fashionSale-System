"use client";

import React, { useState } from "react";
import { Check, Mail, Sparkles, Tag } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function DropBoardingPassSection() {
  const [email, setEmail] = useState("");
  const [isClaimed, setIsClaimed] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsClaimed(true);
    }, 500);
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText("DROP10");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative border-strong border-ink bg-surface shadow-hard overflow-hidden">
      
      {/* Background Subtle Barcode Watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-4 bottom-2 opacity-5 select-none hidden lg:block"
      >
        <svg className="w-80 h-24 text-ink" viewBox="0 0 100 24" fill="currentColor">
          <rect x="0" y="0" width="2" height="24" />
          <rect x="4" y="0" width="1" height="24" />
          <rect x="7" y="0" width="3" height="24" />
          <rect x="12" y="0" width="4" height="24" />
          <rect x="18" y="0" width="1" height="24" />
          <rect x="22" y="0" width="5" height="24" />
          <rect x="30" y="0" width="2" height="24" />
          <rect x="35" y="0" width="3" height="24" />
          <rect x="42" y="0" width="1" height="24" />
          <rect x="46" y="0" width="4" height="24" />
          <rect x="52" y="0" width="2" height="24" />
          <rect x="58" y="0" width="5" height="24" />
          <rect x="66" y="0" width="1" height="24" />
          <rect x="70" y="0" width="3" height="24" />
          <rect x="76" y="0" width="4" height="24" />
          <rect x="83" y="0" width="2" height="24" />
          <rect x="88" y="0" width="5" height="24" />
          <rect x="96" y="0" width="3" height="24" />
        </svg>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Side: Main Boarding Pass Body (col-span-8) */}
        <div className="p-6 sm:p-8 lg:p-10 lg:col-span-8 flex flex-col justify-between gap-6 border-b-2 lg:border-b-0 lg:border-r-2 border-dashed border-ink relative">
          
          {/* Top Boarding Pass Header Strip */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line-soft pb-4 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 bg-brick border border-ink" />
              <span className="font-black text-ink">MANDIRI GLOBAL BOARDING PASS // DROP 02</span>
            </div>
            <span className="text-muted">PAOTERE ATELIER HUB • GATE 01</span>
          </div>

          {/* Headline & Body */}
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 border border-ink bg-page px-2.5 py-0.5 text-xs font-mono font-bold text-ink w-max">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              <span>VIP PRIORITY ACCESS</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase font-display text-ink leading-tight">
              DAPATKAN AKSES 1 JAM LEBIH AWAL UNTUK DROP BERIKUTNYA
            </h3>
            <p className="type-body text-muted max-w-[55ch]">
              Karena kuota produksi kami dibatasi 150 potong per artikel, pelanggan VIP akan
              menerima email link rahasia 60 menit sebelum katalog dibuka untuk publik.
            </p>
          </div>

          {/* Form / Success State */}
          {isClaimed ? (
            <div className="border-2 border-success bg-page p-5 flex items-center justify-between gap-4 animate-stamp-pop">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-success text-surface flex items-center justify-center font-bold shrink-0">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-mono text-xs font-black text-success uppercase">
                    TIKET VIP AKTIF // EMAIL TERDAFTAR
                  </p>
                  <p className="type-small text-ink">
                    Kode kupon <span className="font-mono font-bold text-brick">DROP10</span> otomatis diaktifkan untuk akun kamu!
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="masukkan@emailmu.com"
                  aria-label="Email untuk prioritas drop"
                  className="w-full min-h-[48px] border-base bg-page pl-10 pr-3 text-sm text-ink font-mono placeholder:text-muted focus:bg-surface focus:outline-none focus:ring-2 focus:ring-ink"
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                className="font-mono text-xs uppercase font-black tracking-wider sm:w-auto"
              >
                KLAIM TIKET VIP
              </Button>
            </form>
          )}

          {/* Footer Security Stamp */}
          <div className="flex flex-wrap items-center justify-between text-[10px] font-mono text-muted pt-2 border-t border-line-soft">
            <span>*100% BEBAS SPAM • DAPAT DIBATALKAN KAPAN SAJA</span>
            <span>ENCRYPTED // MKS-ATELIER</span>
          </div>

        </div>

        {/* Right Side: Perforated Tear-off Coupon Stub (col-span-4) */}
        <div className="p-6 sm:p-8 lg:col-span-4 bg-page flex flex-col justify-between gap-6 relative select-none">
          
          {/* Perforation Circular Notches on Desktop */}
          <div className="hidden lg:block absolute -top-4 -left-4 w-8 h-8 rounded-full bg-page border-r-2 border-b-2 border-ink" />
          <div className="hidden lg:block absolute -bottom-4 -left-4 w-8 h-8 rounded-full bg-page border-r-2 border-t-2 border-ink" />

          {/* Coupon Header */}
          <div className="flex items-center justify-between border-b border-line-soft pb-3 font-mono text-[10px]">
            <span className="font-black text-brick uppercase">TEAR-OFF COUPON</span>
            <span className="text-ink font-bold">10% OFF</span>
          </div>

          {/* Big Golden Coupon Box */}
          <div className="border-2 border-ink bg-gold p-4 flex flex-col gap-2 shadow-hard-sm rotate-1 hover:rotate-0 transition-transform">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-black uppercase text-ink">
                VOUCHER PESANAN PERTAMA
              </span>
              <Tag className="h-4 w-4 text-ink" />
            </div>

            <div className="border border-ink bg-surface p-2 text-center">
              <span className="font-mono text-xl sm:text-2xl font-black text-brick tracking-widest">
                DROP10
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopyCode}
              className="mt-1 w-full border border-ink bg-ink py-1.5 text-center font-mono text-xs font-bold text-surface hover:bg-brick pressable-hard transition-colors"
            >
              {isCopied ? "KODE TERSALIN! ✓" : "SALIN KODE KUPON"}
            </button>
          </div>

          {/* Barcode Graphic */}
          <div className="pt-2 flex flex-col items-center gap-1">
            <svg className="w-full h-8 text-ink" viewBox="0 0 100 24" fill="currentColor">
              <rect x="0" y="0" width="2" height="24" />
              <rect x="4" y="0" width="1" height="24" />
              <rect x="7" y="0" width="3" height="24" />
              <rect x="12" y="0" width="4" height="24" />
              <rect x="18" y="0" width="1" height="24" />
              <rect x="22" y="0" width="5" height="24" />
              <rect x="30" y="0" width="2" height="24" />
              <rect x="35" y="0" width="3" height="24" />
              <rect x="42" y="0" width="1" height="24" />
              <rect x="46" y="0" width="4" height="24" />
              <rect x="52" y="0" width="2" height="24" />
              <rect x="58" y="0" width="5" height="24" />
              <rect x="66" y="0" width="1" height="24" />
              <rect x="70" y="0" width="3" height="24" />
              <rect x="76" y="0" width="4" height="24" />
              <rect x="83" y="0" width="2" height="24" />
              <rect x="88" y="0" width="5" height="24" />
              <rect x="96" y="0" width="3" height="24" />
            </svg>
            <span className="font-mono text-[9px] text-muted tracking-widest">
              MG-MKS-VIP-PASS-2026
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}

