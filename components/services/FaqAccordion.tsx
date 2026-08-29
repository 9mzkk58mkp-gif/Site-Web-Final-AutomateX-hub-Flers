"use client";

import { useState } from "react";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import type { FaqItem } from "@/lib/faq";

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`shrink-0 text-text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 9l6 6 6-6"
      />
    </svg>
  );
}

/**
 * Accordéon FAQ générique. Les réponses restent dans le DOM même fermées
 * (masquées en CSS via [data-open]) pour rester lisibles par Google et les
 * IA génératives. Le schema FAQPage est injecté séparément côté page.
 */
export default function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <StaggerGrid className="mt-10 space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const answerId = `faq-answer-${index}`;
        return (
          <StaggerItem
            key={item.question}
            className="faq-item glass-card rounded-2xl px-5 py-4"
            data-open={isOpen}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              aria-controls={answerId}
              className="flex min-h-12 w-full items-center justify-between gap-4 text-left"
            >
              <span className="text-sm font-medium text-text-primary">{item.question}</span>
              <ChevronIcon open={isOpen} />
            </button>
            <div id={answerId} className="faq-answer">
              <p className="pt-3 text-sm text-text-secondary">{item.answer}</p>
            </div>
          </StaggerItem>
        );
      })}
    </StaggerGrid>
  );
}
