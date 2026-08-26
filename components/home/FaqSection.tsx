"use client";

import { useState } from "react";
import { HOME_FAQ } from "@/lib/faq";

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
 * Accordéon FAQ : le contenu des réponses reste dans le DOM même fermé
 * (masqué en CSS max-height via [data-open], pas en rendu conditionnel)
 * pour rester lisible par Google et les IA génératives.
 */
export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto mt-24 max-w-3xl px-4 pb-24">
      <h2 className="aurora-h2 text-center">Questions fréquentes</h2>

      <div className="mt-10 space-y-3">
        {HOME_FAQ.map((item, index) => {
          const isOpen = openIndex === index;
          const answerId = `faq-answer-${index}`;
          return (
            <div
              key={item.question}
              data-open={isOpen}
              className="faq-item glass-card rounded-2xl px-5 py-4"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={answerId}
                className="flex w-full items-center justify-between gap-4 text-left"
              >
                <span className="text-sm font-medium text-text-primary">{item.question}</span>
                <ChevronIcon open={isOpen} />
              </button>
              <div id={answerId} className="faq-answer">
                <p className="pt-3 text-sm text-text-secondary">{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-8 text-center text-xs text-text-muted">
        TVA non applicable, art. 293 B du CGI.
      </p>
    </section>
  );
}
