import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";

interface GarmentPhotoProps {
  url: string | null;
  alt: string;
  secondaryUrl?: string | null;
  secondaryAlt?: string;
  swatchHex: string;
  categoryName: string;
  frameLabel?: string;
  isSoldOut?: boolean;
  isFoldedWishlist?: boolean;
  priority?: boolean;
  className?: string;
}

/**
 * Product & editorial 4:5 image surface (DESIGN.md Section 8):
 * - Consistent 4:5 aspect ratio on solid `#E9E9F1` (`bg-photo`) so white garments stand out
 * - Renders `next/image` when an uploaded CDN URL is present
 * - In development before studio photos are uploaded, renders an architectural swatch & tag block
 *   using strictly logo color blocks and shifted frames (zero vector illustrations or generic stock)
 * - Sold-out state applies 55% opacity + approved 24px woven check overlay
 */
export function GarmentPhoto({
  url,
  alt,
  secondaryUrl,
  secondaryAlt,
  swatchHex,
  categoryName,
  frameLabel,
  isSoldOut = false,
  isFoldedWishlist = false,
  priority = false,
  className,
}: GarmentPhotoProps) {
  const isLightSwatch =
    swatchHex.toUpperCase() === "#FFFFFF" ||
    swatchHex.toUpperCase() === "#F3F3F8";

  return (
    <div
      className={cn(
        "relative aspect-[4/5] w-full overflow-hidden bg-photo select-none group/photo",
        isFoldedWishlist && "dog-ear-cut",
        className
      )}
    >
      <div
        className={cn(
          "relative h-full w-full",
          isSoldOut && "opacity-55"
        )}
      >
        {url ? (
          <>
            <Image
              src={url}
              alt={alt}
              fill
              priority={priority}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={cn(
                "object-cover transition-all duration-300 ease-out group-hover:scale-105",
                secondaryUrl && "group-hover:opacity-0"
              )}
            />
            {secondaryUrl && (
              <Image
                src={secondaryUrl}
                alt={secondaryAlt || alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover opacity-0 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-105"
              />
            )}
          </>
        ) : (
          <div
            role="img"
            aria-label={alt}
            className="relative flex h-full w-full flex-col justify-between p-5 sm:p-6"
          >
            {/* Architectural shifted back-frame referencing logo geometry */}
            <div className="relative mx-auto my-auto h-[68%] w-[72%]">
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-2.5 translate-y-2.5 border-base bg-transparent"
              />
              <div
                style={{ backgroundColor: swatchHex }}
                className={cn(
                  "relative flex h-full w-full flex-col justify-between p-4 border-base",
                  isLightSwatch ? "text-ink" : "text-surface"
                )}
              >
                <span className="type-small font-semibold">{categoryName}</span>
                {frameLabel && (
                  <span className="type-small opacity-90">{frameLabel}</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Approved location #1 for South Sulawesi woven check motif: sold-out overlay */}
      {isSoldOut && (
        <div
          aria-hidden="true"
          className="woven-motif pointer-events-none absolute inset-0"
        />
      )}
    </div>
  );
}

