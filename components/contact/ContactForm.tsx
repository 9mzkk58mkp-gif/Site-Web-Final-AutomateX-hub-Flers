"use client";

import { useState, type FormEvent } from "react";
import { METIERS } from "@/lib/constants";

type Status = "idle" | "submitting" | "success" | "error";

const FIELD_CLASS =
  "glass-input min-h-12 w-full rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted-alt transition-colors duration-200 focus:border-white/30";

const GENERIC_ERROR = "L'envoi a échoué. Appelez-moi directement ou réessayez dans un instant.";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState(GENERIC_ERROR);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Capturé AVANT tout await : React remet event.currentTarget à null dès que
    // le gestionnaire rend la main, et form.reset() lèverait alors une erreur
    // qui ferait afficher un échec sur un envoi pourtant réussi.
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data: unknown = await response.json().catch(() => null);
        const message =
          data && typeof data === "object" && "error" in data && typeof data.error === "string"
            ? data.error
            : GENERIC_ERROR;
        setErrorMessage(message);
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setErrorMessage(GENERIC_ERROR);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className="glass-card rounded-2xl p-6 text-center">
        <p className="text-base font-medium text-text-primary">Message envoyé.</p>
        <p className="mt-2 text-sm text-text-secondary">
          Merci, je reviens vers vous sous 24h ouvrées.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="nom" className="mb-1.5 block text-sm text-text-secondary">
          Nom
        </label>
        <input id="nom" name="nom" type="text" autoComplete="name" required className={FIELD_CLASS} />
      </div>

      <div>
        <label htmlFor="telephone" className="mb-1.5 block text-sm text-text-secondary">
          Téléphone
        </label>
        <input
          id="telephone"
          name="telephone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="06 12 34 56 78"
          required
          className={FIELD_CLASS}
        />
      </div>

      <div>
        <label htmlFor="metier" className="mb-1.5 block text-sm text-text-secondary">
          Métier
        </label>
        <select id="metier" name="metier" required className={FIELD_CLASS}>
          <option value="">Sélectionnez votre métier</option>
          {METIERS.map((metier) => (
            <option key={metier.slug} value={metier.slug}>
              {metier.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm text-text-secondary">
          Message
        </label>
        <textarea id="message" name="message" rows={5} required className={FIELD_CLASS} />
      </div>

      {/*
        Champ piège anti-robots : masqué à l'écran et retiré de l'ordre de
        tabulation comme de l'arbre d'accessibilité. Un humain ne le voit ni ne
        l'atteint ; s'il est rempli, la soumission est ignorée côté serveur.
      */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor="societe">Société (ne pas remplir)</label>
        <input id="societe" name="societe" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="cta-primary min-h-12 w-full rounded-full bg-emerald px-6 py-3 text-sm font-medium text-emerald-dark disabled:opacity-60"
      >
        {status === "submitting" ? "Envoi en cours…" : "Envoyer"}
      </button>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-400">
          {errorMessage}
        </p>
      )}

      <p className="text-sm text-text-secondary">
        Je réponds sous 24h ouvrées. Pour une urgence, appelez directement.
      </p>
    </form>
  );
}
