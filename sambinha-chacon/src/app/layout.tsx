import type { Metadata, Viewport } from "next";
import "@fontsource-variable/archivo/wdth.css";
import "./globals.css";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.titulo,
  description: SITE.descricao,
  applicationName: SITE.nome,
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
  themeColor: "#032E71",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preload" as="image" href="/img/hero-m-top.webp" media="not all and (min-aspect-ratio: 1/1) and (min-height: 540px)" />
        <link rel="preload" as="image" href="/img/hero-desktop.webp" media="(min-aspect-ratio: 1/1) and (min-height: 540px)" />
      </head>
      <body>{children}</body>
    </html>
  );
}
