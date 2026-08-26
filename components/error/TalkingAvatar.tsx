"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const TYPING_DELAY_MS = 700;

/**
 * Avatar 404 : légère respiration en boucle (scale 1 → 1.02) + bulle de
 * dialogue qui affiche 3 points "en train d'écrire" avant le texte final.
 * Purement CSS (@keyframes dans globals.css), pas de librairie d'animation —
 * respecte prefers-reduced-motion.
 */
export default function TalkingAvatar() {
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsTyping(false), TYPING_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="glass-card animate-bubble-in relative mb-2 max-w-xs rounded-2xl px-5 py-4 text-center">
        {isTyping ? (
          <div className="flex items-center justify-center gap-1.5 py-1" aria-label="L'assistant écrit">
            <span className="animate-typing-dot h-1.5 w-1.5 rounded-full bg-text-secondary [animation-delay:0ms]" />
            <span className="animate-typing-dot h-1.5 w-1.5 rounded-full bg-text-secondary [animation-delay:150ms]" />
            <span className="animate-typing-dot h-1.5 w-1.5 rounded-full bg-text-secondary [animation-delay:300ms]" />
          </div>
        ) : (
          <p className="animate-bubble-in text-sm text-text-primary">
            Oups, cette page n&apos;existe pas ! Mais je peux sûrement vous aider ailleurs
            &nbsp;👇
          </p>
        )}
        <span
          aria-hidden="true"
          className="glass-card absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-t-0 border-l-0"
        />
      </div>

      <Image
        src="/avatar-nolan-ai.png"
        alt="Avatar de Nolan"
        width={200}
        height={200}
        className="animate-avatar-breathe h-[180px] w-[180px] rounded-full object-cover shadow-[0_8px_30px_rgba(0,0,0,0.4)] sm:h-[220px] sm:w-[220px]"
        style={{ border: "1px solid rgba(255,255,255,0.15)" }}
        priority
      />
    </div>
  );
}
