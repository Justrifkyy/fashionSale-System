import React from "react";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { idMessages } from "@/lib/i18n";

const POLICIES: Record<
  string,
  { title: string; paragraphs: string[] }
> = {
  privacy: {
    title: idMessages.footer.linkPrivacy,
    paragraphs: idMessages.info.policies.privacy,
  },
  terms: {
    title: idMessages.footer.linkTerms,
    paragraphs: idMessages.info.policies.terms,
  },
  returns: {
    title: idMessages.footer.linkReturns,
    paragraphs: idMessages.info.policies.returns,
  },
  shipping: {
    title: idMessages.footer.linkShipping,
    paragraphs: idMessages.info.policies.shipping,
  },
};

export function generateStaticParams() {
  return Object.keys(POLICIES).map((slug) => ({ slug }));
}

/**
 * Policy Pages (P-014: privacy, terms, returns, shipping)
 */
export default async function PolicyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const policy = POLICIES[slug];

  if (!policy) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-16 flex flex-col gap-6">
      <div className="flex flex-col gap-2 border-b-base pb-4">
        <h1 className="type-h1 text-ink">{policy.title}</h1>
        <p className="type-small text-muted">
          {idMessages.info.policyUpdatedLabel}
        </p>
      </div>

      <div className="border-base bg-surface p-6 sm:p-8 flex flex-col gap-4">
        {policy.paragraphs.map((text, idx) => (
          <p key={idx} className="type-body text-ink max-w-[65ch]">
            {text}
          </p>
        ))}
      </div>

      <div>
        <ButtonLink href="/products" variant="primary">
          {idMessages.common.backToCatalog}
        </ButtonLink>
      </div>
    </div>
  );
}
