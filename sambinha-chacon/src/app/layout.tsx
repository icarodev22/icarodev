import type { Metadata, Viewport } from "next";
import "@fontsource/sansita-swashed/700.css";
import "@fontsource/sansita-swashed/800.css";
import "@fontsource-variable/archivo/wdth.css";
import "./globals.css";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.titulo,
  description: SITE.descricao,
  applicationName: SITE.nome,
  keywords: ["Sambinha Chacon", "samba Recife", "festa Recife", "Bloco Sambinha Chacon", "ingressos"],
  icons: { icon: "/favicon.png", apple: "/img/apple-touch-icon.png" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE.nome,
    title: SITE.titulo,
    description: SITE.descricao,
    images: [{ url: "/img/og-image.jpg", width: 1200, height: 630, alt: "Sambinha Chacon – arte com casarios, coqueiros e casal dançando samba" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.titulo,
    description: SITE.descricao,
    images: ["/img/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#13256B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="no-js">
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.remove('no-js')" }}
        />
        <link rel="preload" as="image" href="/img/hero-m-top.webp" media="(max-width: 1023.98px)" />
        <link rel="preload" as="image" href="/img/hero-desktop.webp" media="(min-width: 1024px)" />
      </head>
      <body>{children}</body>
    </html>
  );
}
