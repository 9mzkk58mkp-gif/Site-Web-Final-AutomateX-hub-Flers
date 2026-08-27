import { ImageResponse } from "next/og";
import { NAP } from "@/lib/constants";

/**
 * Image Open Graph par défaut du site, générée au build et héritée par toutes
 * les routes (Next.js applique le fichier du segment racine à ses enfants).
 *
 * Générée plutôt que stockée en PNG : la palette Aurora et le NAP restent
 * pilotés par le code, il n'y a pas d'asset à régénérer quand le numéro ou le
 * positionnement change.
 */
export const alt = `${NAP.name} — sites web et visibilité locale pour artisans dans l'Orne`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          // Reprise du dégradé Aurora d'app/globals.css.
          backgroundImage:
            "linear-gradient(120deg, #050604 0%, #0d2b22 24%, #16283a 52%, #14172e 74%, #050604 100%)",
          color: "#f4f7f5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.16)",
              fontSize: 30,
              fontWeight: 600,
            }}
          >
            A
          </div>
          <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: -0.5 }}>{NAP.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Satori (next/og) exige un display explicite dès qu'un nœud a
              plusieurs enfants : chaque ligne est donc son propre flex. */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 62,
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: -1.5,
            }}
          >
            <div style={{ display: "flex" }}>Sites web et visibilité locale</div>
            <div style={{ display: "flex" }}>pour artisans dans l&apos;Orne</div>
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#a9b3ac" }}>
            {`Une seule personne du début à la fin — ${NAP.phoneDisplay}`}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24 }}>
          <div style={{ width: 40, height: 3, background: "#1fd9a0" }} />
          <div style={{ display: "flex", color: "#1fd9a0" }}>automatex-hub.com</div>
        </div>
      </div>
    ),
    size,
  );
}
