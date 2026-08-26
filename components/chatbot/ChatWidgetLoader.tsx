"use client";

import dynamic from "next/dynamic";

/**
 * Charge ChatWidget en lazy, sans rendu serveur, pour ne jamais impacter le
 * LCP du reste du site (voir spec section "Contraintes de code").
 */
const ChatWidget = dynamic(() => import("./ChatWidget"), { ssr: false });

export default function ChatWidgetLoader() {
  return <ChatWidget />;
}
