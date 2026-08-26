"use client";

import { useState, type FormEvent, type RefObject } from "react";
import Image from "next/image";
import { TEL_HREF, NAP } from "@/lib/constants";
import { SendIcon } from "./ChatIcons";
import type { ChatMessage } from "./useChatSession";

const MAX_LENGTH = 500;

interface ChatPanelProps {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  limitReached: boolean;
  onSend: (text: string) => void;
  turnstileContainerRef: RefObject<HTMLDivElement | null>;
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <p
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "bg-emerald text-emerald-dark"
            : "glass-card text-text-primary"
        }`}
      >
        {message.content}
      </p>
    </div>
  );
}

export default function ChatPanel({
  messages,
  isLoading,
  error,
  limitReached,
  onSend,
  turnstileContainerRef,
}: ChatPanelProps) {
  const [draft, setDraft] = useState("");
  const disabled = isLoading || limitReached;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = draft.trim();
    if (!text || disabled) return;
    onSend(text);
    setDraft("");
  }

  return (
    <div className="glass-card flex h-[480px] w-[340px] flex-col overflow-hidden rounded-2xl sm:w-[380px]">
      <header className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <Image
          src="/chat-avatar-128.png"
          alt=""
          width={36}
          height={36}
          className="h-9 w-9 shrink-0 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-semibold text-text-primary">Assistant Automatex</p>
          <p className="mt-0.5 text-xs text-text-muted">
            Vos échanges peuvent être utilisés pour traiter votre demande.{" "}
            <a href="/mentions-legales" className="underline hover:text-text-secondary">
              En savoir plus
            </a>
          </p>
        </div>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}
        {isLoading && <p className="text-xs text-text-muted">L&apos;assistant écrit…</p>}
        {error && <p className="text-xs text-red-400">{error}</p>}
        {limitReached && (
          <p className="text-xs text-text-secondary">
            Pour aller plus loin, appelez directement Nolan au{" "}
            <a href={TEL_HREF} className="text-emerald underline">
              {NAP.phoneDisplay}
            </a>
            .
          </p>
        )}
      </div>

      <div ref={turnstileContainerRef} className="hidden" />

      <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-white/10 p-3">
        <input
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value.slice(0, MAX_LENGTH))}
          maxLength={MAX_LENGTH}
          disabled={disabled}
          placeholder={limitReached ? "Limite atteinte" : "Votre message…"}
          className="glass-input flex-1 rounded-full px-4 py-2 text-sm text-text-primary placeholder:text-text-muted disabled:opacity-60"
          aria-label="Votre message"
        />
        <button
          type="submit"
          disabled={disabled || draft.trim().length === 0}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald text-emerald-dark transition-[filter] duration-200 ease-out hover:brightness-110 disabled:opacity-50"
          aria-label="Envoyer"
        >
          <SendIcon />
        </button>
      </form>
    </div>
  );
}
