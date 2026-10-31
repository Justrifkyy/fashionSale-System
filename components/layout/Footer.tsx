import React from "react";
import Link from "next/link";
import { CareCareLogo } from "@/components/layout/CareCareLogo";
import { ButtonLink } from "@/components/ui/Button";
import { idMessages } from "@/lib/i18n";

/**
 * Storefront Footer (DESIGN.md Section 5, 6, 8 & 10):
 * - Approved location #2 for the 24px woven check band (`.woven-band-footer`)
 * - Solid `ink` background (`on-ink` focus rings)
 * - Contains one chamfered CTA block (using `secondary` button so it never adds a 2nd primary button on any screen)
 * - Legal store identity in footer per `legal_and_compliance.must_have_pages_before_launch`
 */
export function Footer() {
  return (
    <footer className="mt-auto border-t-strong bg-ink text-surface on-ink">
      {/* Single 24px South Sulawesi woven check band */}
      <div aria-hidden="true" className="woven-band-footer w-full border-b-base" />

      <div className="mx-auto max-w-[1360px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Brand identity & Makassar store contact */}
          <div className="flex flex-col gap-4 lg:col-span-4">
            <CareCareLogo variant="color-on-dark" withWordmark size="md" />
            <p className="type-small text-line-soft max-w-[42ch]">
              {idMessages.footer.description}
            </p>
            <address className="not-italic flex flex-col gap-1 type-small text-line-soft pt-1">
              <span>{idMessages.info.storeAddress}</span>
              <span>{idMessages.info.storeHours}</span>
              <span>
                {idMessages.info.storeEmail} / {idMessages.info.storeWhatsapp}
              </span>
            </address>
          </div>

          {/* Navigation columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            <div className="flex flex-col gap-2.5">
              <h2 className="type-h4 text-surface">
                {idMessages.footer.shopHeading}
              </h2>
              <ul className="flex flex-col gap-2 type-small text-line-soft">
                <li>
                  <Link href="/products" className="hover:text-gold underline-offset-4 hover:underline">
                    {idMessages.catalog.heading}
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=kemeja" className="hover:text-gold underline-offset-4 hover:underline">
                    {idMessages.nav.men}
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=kaos" className="hover:text-gold underline-offset-4 hover:underline">
                    {idMessages.nav.women}
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=aksesori" className="hover:text-gold underline-offset-4 hover:underline">
                    {idMessages.nav.accessories}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-gold underline-offset-4 hover:underline">
                    {idMessages.nav.about}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-2.5">
              <h2 className="type-h4 text-surface">
                {idMessages.footer.helpHeading}
              </h2>
              <ul className="flex flex-col gap-2 type-small text-line-soft">
                <li>
                  <Link href="/size-guide" className="hover:text-gold underline-offset-4 hover:underline">
                    {idMessages.footer.linkSizeGuide}
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-gold underline-offset-4 hover:underline">
                    {idMessages.footer.linkFaq}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-gold underline-offset-4 hover:underline">
                    {idMessages.footer.linkContact}
                  </Link>
                </li>
                <li>
                  <Link href="/account/orders" className="hover:text-gold underline-offset-4 hover:underline">
                    {idMessages.account.navOrders}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-2.5 col-span-2 sm:col-span-1">
              <h2 className="type-h4 text-surface">
                {idMessages.footer.legalHeading}
              </h2>
              <ul className="flex flex-col gap-2 type-small text-line-soft">
                <li>
                  <Link href="/policies/privacy" className="hover:text-gold underline-offset-4 hover:underline">
                    {idMessages.footer.linkPrivacy}
                  </Link>
                </li>
                <li>
                  <Link href="/policies/terms" className="hover:text-gold underline-offset-4 hover:underline">
                    {idMessages.footer.linkTerms}
                  </Link>
                </li>
                <li>
                  <Link href="/policies/returns" className="hover:text-gold underline-offset-4 hover:underline">
                    {idMessages.footer.linkReturns}
                  </Link>
                </li>
                <li>
                  <Link href="/policies/shipping" className="hover:text-gold underline-offset-4 hover:underline">
                    {idMessages.footer.linkShipping}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Chamfered Footer CTA block (approved chamfer location #3, secondary button) */}
          <div className="lg:col-span-3">
            <div className="cut-frame bg-surface">
              <div className="cut-inner p-5 text-ink flex flex-col gap-3">
                <h2 className="type-h4 text-ink">
                  {idMessages.footer.ctaHeading}
                </h2>
                <p className="type-small text-muted">
                  {idMessages.footer.ctaBody}
                </p>
                <div className="pt-1">
                  <ButtonLink href="/size-guide" variant="secondary" fullWidth>
                    {idMessages.footer.ctaButton}
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-surface/20 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="type-micro text-line-soft">
            {idMessages.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}

