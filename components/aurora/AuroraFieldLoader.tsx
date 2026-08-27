"use client";

import dynamic from "next/dynamic";

/**
 * Charge la couche Aurora en lazy et sans rendu serveur, sur le modèle de
 * ChatWidgetLoader : le fond n'est que décoratif, il ne doit jamais peser sur
 * le LCP ni retarder l'hydratation du contenu.
 */
const AuroraField = dynamic(() => import("./AuroraField"), { ssr: false });

export default function AuroraFieldLoader() {
  return <AuroraField />;
}
