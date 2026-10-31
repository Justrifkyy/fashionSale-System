import React from "react";
import Link from "next/link";
import { idMessages } from "@/lib/i18n";

const STATIC_PAGES = [
  { slug: "privacy", title: idMessages.footer.linkPrivacy, href: "/policies/privacy" },
  { slug: "terms", title: idMessages.footer.linkTerms, href: "/policies/terms" },
  { slug: "returns", title: idMessages.footer.linkReturns, href: "/policies/returns" },
  { slug: "shipping", title: idMessages.footer.linkShipping, href: "/policies/shipping" },
  { slug: "about", title: idMessages.info.aboutHeading, href: "/about" },
];

/**
 * Admin Static Pages Management (P-064)
 */
export default function AdminStaticPages() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="type-h2 text-ink">{idMessages.admin.navPages}</h1>

      <div className="overflow-x-auto border-base bg-surface">
        <table className="w-full text-left type-small">
          <thead className="bg-ink text-surface">
            <tr>
              <th className="px-4 py-3 font-semibold">
                {idMessages.admin.colPageTitle}
              </th>
              <th className="px-4 py-3 font-semibold">
                {idMessages.admin.colSlug}
              </th>
              <th className="px-4 py-3 font-semibold text-right">
                {idMessages.admin.colAction}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line-soft">
            {STATIC_PAGES.map((p) => (
              <tr key={p.slug} className="hover:bg-page">
                <td className="px-4 py-3 font-bold text-ink">{p.title}</td>
                <td className="px-4 py-3 tabular-nums text-muted">{p.slug}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={p.href}
                    className="font-semibold text-brick-deep underline decoration-2 underline-offset-4 hover:text-ink"
                  >
                    {idMessages.admin.actionProcess}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
