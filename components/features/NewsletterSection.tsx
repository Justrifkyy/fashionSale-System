"use client";

import React, { useState } from "react";
import { Check, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div className="relative border-strong bg-surface p-6 sm:p-10 shadow-hard">
      {/* Corner Promo Sticker */}
      <div className="pointer-events-none absolute -top-3.5 right-4 sm:right-8 z-10 rotate-[2deg]">
        <span className="inline-block border-base bg-gold px-3 py-1 text-xs font-black uppercase text-ink shadow-hard-sm">
          KODE: DROP10 (DISKON 10%)
        </span>
      </div>

      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
        <div className="flex flex-col gap-3 lg:col-span-7">
          <div className="inline-flex items-center gap-2 border-base bg-page px-3 py-1 w-max">
            <span className="h-2 w-2 bg-brick border border-ink" />
            <span className="type-micro font-bold uppercase text-ink">
              NOTIFIKASI DROP RESMI
            </span>
          </div>
          <h3 className="type-h2 text-ink">
            JANGAN SAMPAI KETINGGALAN DROP BERIKUTNYA
          </h3>
          <p className="type-body text-muted max-w-[55ch]">
            Dapatkan pemberitahuan 1 jam lebih awal sebelum kuota rilis dibuka ke publik,
            ditambah kode diskon 10% untuk pesanan pertamamu.
          </p>
        </div>

        <div className="lg:col-span-5">
          {isSubmitted ? (
            <div className="border-base bg-page p-6 flex flex-col gap-2 border-l-4 border-l-success animate-stamp-pop">
              <div className="flex items-center gap-2 text-success font-bold text-sm">
                <Check className="h-4 w-4" />
                <span>BERHASIL TERDAFTAR!</span>
              </div>
              <p className="type-small text-ink">
                Kode voucher <span className="font-mono font-bold text-brick">DROP10</span> siap kamu gunakan saat checkout.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@emailmu.com"
                    aria-label="Alamat email untuk notifikasi drop"
                    className="w-full min-h-[48px] sm:min-h-[44px] border-base bg-page pl-9 pr-3 text-sm text-ink placeholder:text-muted focus:bg-surface focus:outline-none focus:ring-2 focus:ring-ink"
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isLoading}
                  className="sm:w-auto"
                >
                  Daftar Drop
                </Button>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-muted pt-1">
                <span>*TANPA SPAM • UNUBSCRIBE KAPAN SAJA</span>
                <span>CC-MKS-SUB</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

