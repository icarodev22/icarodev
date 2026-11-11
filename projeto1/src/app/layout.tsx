import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { BottomNav } from "@/components/layout/BottomNav";

export const metadata: Metadata = {
  title: { default: "EPOCH.ia — Conhecimento além do tempo.", template: "%s · EPOCH.ia" },
  description:
    "Grandes mentes. Novas perspectivas. Converse com representações digitais educacionais de personalidades da ciência, da filosofia, da música e da história — com transparência sobre o uso de inteligência artificial.",
  applicationName: "EPOCH.ia",
  robots: { index: true, follow: true },
  openGraph: {
    title: "EPOCH.ia — Conhecimento além do tempo.",
    description: "Grandes mentes. Novas perspectivas.",
    siteName: "EPOCH.ia",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/brand/epoch-app-icon-1024.png", width: 1024, height: 1024, alt: "Símbolo EPOCH.ia" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0D12",
  width: "device-width",
  initialScale: 1,
  // Necessário para env(safe-area-inset-*) no iPhone.
  viewportFit: "cover",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Leitura de cabeçalhos torna a renderização dinâmica, necessária para o nonce da CSP
  // ser aplicado aos scripts do Next.js em todas as páginas.
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <html lang="pt-BR" data-theme="dark" suppressHydrationWarning>
      <head>
        {/* Script síncrono, com nonce da CSP, que aplica o tema salvo antes da pintura. */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script nonce={nonce} src="/theme-init.js" />
      </head>
      <body className="min-h-dvh flex flex-col">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-fg focus:px-3 focus:py-2 focus:text-canvas"
        >
          Pular para o conteúdo
        </a>
        <MotionProvider>
          <SiteHeader />
          <main id="conteudo" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <BottomNav />
        </MotionProvider>
      </body>
    </html>
  );
}
