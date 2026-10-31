import type { Metadata } from "next";
import { Archivo, Instrument_Sans } from "next/font/google";
import { StoreProvider } from "@/components/providers/StoreProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { idMessages } from "@/lib/i18n";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: idMessages.meta.title,
  description: idMessages.meta.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${archivo.variable} ${instrument.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-page text-ink">
        <CustomCursor />
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
