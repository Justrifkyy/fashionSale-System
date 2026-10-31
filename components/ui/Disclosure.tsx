"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="py-3">
      <ol className="flex flex-wrap items-center gap-1.5 type-small text-muted">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={`${item.label}-${idx}`} className="inline-flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-brick-deep font-medium underline decoration-2 underline-offset-4 hover:text-ink"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={cn(isLast && "text-ink font-semibold")}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <ChevronRight className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export interface AccordionSection {
  id: string;
  title: string;
  content: React.ReactNode;
  defaultOpen?: boolean;
}

export function Accordion({ sections }: { sections: AccordionSection[] }) {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const s of sections) {
      if (s.defaultOpen) initial[s.id] = true;
    }
    return initial;
  });

  const toggle = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="border-t-base">
      {sections.map((section) => {
        const isOpen = Boolean(openIds[section.id]);
        return (
          <div key={section.id} className="border-b-base">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => toggle(section.id)}
              className="flex min-h-[52px] w-full items-center justify-between gap-4 py-3 text-left font-semibold text-ink hover:text-brick-deep"
            >
              <span>{section.title}</span>
              <ChevronDown
                aria-hidden="true"
                className={cn(
                  "h-5 w-5 shrink-0 transition-transform duration-[160ms] ease-out",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            {isOpen && (
              <div className="pb-4 type-small text-ink max-w-[65ch]">
                {section.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

