"use client";

import { useCallback, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: { sitekey: string; size: "invisible"; callback: (token: string) => void },
      ) => string;
      execute: (widgetId: string) => void;
      reset: (widgetId: string) => void;
    };
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";

/**
 * CAPTCHA invisible Cloudflare Turnstile — section 7 de la spec.
 * Si NEXT_PUBLIC_TURNSTILE_SITE_KEY n'est pas renseignée (compte Cloudflare
 * pas encore créé), le hook n'essaie pas de charger le script et renvoie une
 * fonction getToken() qui résout immédiatement à null — le serveur ignore
 * alors la vérification côté chatbot (voir lib/chatbot/turnstile.ts).
 */
export function useTurnstile() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    if (!siteKey || typeof window === "undefined") return;
    if (window.turnstile) {
      setScriptReady(true);
      return;
    }
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => setScriptReady(true);
    document.head.appendChild(script);
  }, [siteKey]);

  const getToken = useCallback((): Promise<string | null> => {
    if (!siteKey || !scriptReady || !window.turnstile || !containerRef.current) {
      return Promise.resolve(null);
    }

    return new Promise((resolve) => {
      if (!widgetIdRef.current) {
        widgetIdRef.current = window.turnstile!.render(containerRef.current!, {
          sitekey: siteKey,
          size: "invisible",
          callback: (token) => resolve(token),
        });
      } else {
        window.turnstile!.reset(widgetIdRef.current);
        window.turnstile!.execute(widgetIdRef.current);
      }
    });
  }, [siteKey, scriptReady]);

  return { containerRef, getToken };
}
