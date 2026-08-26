"use client";

import { useState, type FormEvent } from "react";
import { METIERS } from "@/lib/constants";

type Status = "idle" | "submitting" | "success" | "error";

const FIELD_CLASS =
  "glass-input w-full rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted transition-colors duration-200 focus:border-white/30";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

    if (!webhookUrl) {
      setStatus("error");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const payload = { source: "contact", ...Object.fromEntries(formData) };
    setStatus("submitting");

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Webhook error");
      setStatus("success");
      event.currentTarget.reset();
    } catch {
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
        <input id="nom" name="nom" type="text" required className={FIELD_CLASS} />
      </div>

      <div>
        <label htmlFor="telephone" className="mb-1.5 block text-sm text-text-secondary">
          Téléphone
        </label>
        <input id="telephone" name="telephone" type="tel" required className={FIELD_CLASS} />
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

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-emerald px-6 py-3 text-sm font-medium text-emerald-dark transition-[filter] duration-200 ease-out hover:brightness-110 disabled:opacity-60"
      >
        {status === "submitting" ? "Envoi en cours…" : "Envoyer"}
      </button>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-400">
          L&apos;envoi a échoué. Appelez-moi directement ou réessayez dans un instant.
        </p>
      )}

      <p className="text-sm text-text-muted">
        Je réponds sous 24h ouvrées. Pour une urgence, appelez directement.
      </p>
    </form>
  );
}
