import React from "react";
import { Accordion } from "@/components/ui/Disclosure";
import { ButtonLink } from "@/components/ui/Button";
import { listFaqEntries } from "@/lib/services/catalogService";
import { idMessages } from "@/lib/i18n";

/**
 * FAQ Page (P-012)
 */
export default function FaqPage() {
  const entries = listFaqEntries();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-16 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="type-h1 text-ink">{idMessages.info.faqHeading}</h1>
        <p className="type-body text-muted">{idMessages.info.contactBody}</p>
      </div>

      <div className="border-base bg-surface px-5 py-2">
        <Accordion
          sections={entries.map((item, idx) => ({
            id: item.id,
            title: item.question,
            defaultOpen: idx === 0,
            content: <p>{item.answer}</p>,
          }))}
        />
      </div>

      <div>
        <ButtonLink href="/contact" variant="primary">
          {idMessages.info.contactHeading}
        </ButtonLink>
      </div>
    </div>
  );
}

