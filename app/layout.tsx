import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import AuroraFieldLoader from "@/components/aurora/AuroraFieldLoader";
import GrainOverlay from "@/components/layout/GrainOverlay";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatWidgetLoader from "@/components/chatbot/ChatWidgetLoader";
import SchemaScript from "@/components/seo/SchemaScript";
import { NAP, SITE_URL } from "@/lib/constants";
import { getWebSiteSchema } from "@/lib/schema";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Automatex — Sites web et visibilité locale pour artisans dans l'Orne",
    template: "%s — Automatex",
  },
  description:
    "Sites web, fiche Google Business et automatisations pour artisans du bâtiment dans l'Orne. Une seule personne du début à la fin.",
  // Valeurs de repli : chaque page redéfinit son propre bloc Open Graph via
  // pageMetadata(). L'image (app/opengraph-image.tsx) est héritée par toutes
  // les routes sans avoir à être déclarée ici.
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: NAP.name,
    url: SITE_URL,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  // Autorise explicitement les aperçus longs : sans max-snippet:-1, Google
  // tronque l'extrait, et les surfaces génératives qui s'appuient sur son
  // index reprennent l'extrait tronqué plutôt que la réponse complète.
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${jetbrainsMono.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans antialiased">
        {/* Entité WebSite : rattache toutes les URLs à une même identité. */}
        <SchemaScript schema={getWebSiteSchema()} />
        <AuroraFieldLoader />
        <GrainOverlay />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatWidgetLoader />
      </body>
    </html>
  );
}
