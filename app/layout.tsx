import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import GrainOverlay from "@/components/layout/GrainOverlay";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatWidgetLoader from "@/components/chatbot/ChatWidgetLoader";
import { SITE_URL } from "@/lib/constants";
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${jetbrainsMono.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans antialiased">
        <GrainOverlay />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatWidgetLoader />
      </body>
    </html>
  );
}
