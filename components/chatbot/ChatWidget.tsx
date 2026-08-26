"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CloseIcon } from "./ChatIcons";
import ChatPanel from "./ChatPanel";
import { useChatSession } from "./useChatSession";

const SEEN_KEY = "ax_chat_seen";

/**
 * Widget de chat flottant — bulle bas-droite, panneau glassmorphism cohérent
 * avec le design system Aurora. Composant client isolé, chargé en lazy par
 * ChatWidgetLoader (next/dynamic, ssr:false) pour ne pas impacter le LCP.
 * z-index 998 : sous le GrainOverlay (999) pour que le grain reste visible
 * par-dessus la fenêtre de chat, tout en restant au-dessus du reste du site.
 */
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const { messages, isLoading, error, limitReached, sendMessage } = useChatSession();

  useEffect(() => {
    try {
      setShowBadge(window.localStorage.getItem(SEEN_KEY) !== "1");
    } catch {
      setShowBadge(false);
    }
  }, []);

  function handleToggle() {
    setIsOpen((open) => !open);
    if (showBadge) {
      setShowBadge(false);
      try {
        window.localStorage.setItem(SEEN_KEY, "1");
      } catch {
        // localStorage indisponible (navigation privée...) — pas bloquant, juste pas de mémoire du badge.
      }
    }
  }

  return (
    <div className="fixed right-4 bottom-4 z-[998] flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {isOpen && (
        <ChatPanel
          messages={messages}
          isLoading={isLoading}
          error={error}
          limitReached={limitReached}
          onSend={sendMessage}
        />
      )}

      <button
        type="button"
        onClick={handleToggle}
        aria-label={isOpen ? "Fermer le chat" : "Ouvrir le chat avec l'assistant Automatex"}
        aria-expanded={isOpen}
        className="glass-button-secondary relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full text-text-primary transition-transform duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0"
      >
        {isOpen ? (
          <CloseIcon />
        ) : (
          <Image
            src="/chat-avatar.png"
            alt=""
            width={56}
            height={56}
            className="h-full w-full object-cover"
            priority
          />
        )}
        {showBadge && !isOpen && (
          <span
            aria-hidden="true"
            className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-emerald ring-2 ring-black/40"
          />
        )}
      </button>
    </div>
  );
}
