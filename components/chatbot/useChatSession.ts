"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const INACTIVITY_TIMEOUT_MS = 10 * 60 * 1000;
const WELCOME_MESSAGE: ChatMessage = {
  role: "assistant",
  content:
    "Je suis l'assistant d'Automatex, je peux répondre à vos questions et transmettre votre demande à Nolan.",
};

/**
 * État et logique d'envoi de la conversation, uniquement en mémoire côté
 * client (aucune persistance — voir section RGPD de la spec). Timeout de 10
 * min d'inactivité : la conversation visible est réinitialisée au message
 * suivant.
 */
export function useChatSession() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [limitReached, setLimitReached] = useState(false);
  const lastActivityRef = useRef(Date.now());

  useEffect(() => {
    if (messages.length > 1) lastActivityRef.current = Date.now();
  }, [messages]);

  const sendMessage = useCallback(
    async (text: string) => {
      const now = Date.now();
      const isStale = now - lastActivityRef.current > INACTIVITY_TIMEOUT_MS;
      const history = isStale ? [WELCOME_MESSAGE] : messages;

      const userMessage: ChatMessage = { role: "user", content: text };
      const nextMessages = [...history, userMessage];
      setMessages(nextMessages);
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
          body: JSON.stringify({ messages: nextMessages }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error ?? "Une erreur est survenue.");
          if (response.status === 429) setLimitReached(true);
          return;
        }

        setMessages([...nextMessages, { role: "assistant", content: data.reply }]);
        if (data.sessionLimitReached) setLimitReached(true);
        lastActivityRef.current = Date.now();
      } catch {
        setError("Connexion impossible pour le moment. Réessayez ou appelez directement.");
      } finally {
        setIsLoading(false);
      }
    },
    [messages],
  );

  return { messages, isLoading, error, limitReached, sendMessage };
}
