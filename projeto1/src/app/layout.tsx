import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "@fontsource-variable/inter";
import "@fontsource-variable/newsreader";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MotionProvider } from "@/components/layout/MotionProvider";

export const metadata: Metadata = {
  title: { default: "Projeto 1 — Converse com a história", template: "%s · Projeto 1" },
  description:
    "Plataforma educacional para conversar com representações digitais fictícias de personalidades históricas e científicas, com respostas geradas por IA e fontes de referência.",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#101112",
  width: "device-width",
  initialScale: 1,
  // Necessário para env(safe-area-inset-*) no iPhone.
  viewportFit: "cover",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Leitura de cabeçalhos torna a renderização dinâmica, necessária para o nonce da CSP
  // ser aplicado aos scripts do Next.js em todas as páginas.
  await headers();
  return (
    <html lang="pt-BR">
      <body className="min-h-dvh flex flex-col">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-ivory focus:px-3 focus:py-2 focus:text-ink"
        >
          Pular para o conteúdo
        </a>
        <MotionProvider>
          <SiteHeader />
          <main id="conteudo" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
