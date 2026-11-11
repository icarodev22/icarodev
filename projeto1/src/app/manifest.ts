import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "EPOCH.ia — Conhecimento além do tempo.",
    short_name: "EPOCH.ia",
    description: "Converse com representações digitais educacionais de grandes personalidades da história, da ciência, da filosofia e da arte.",
    start_url: "/",
    display: "standalone",
    background_color: "#0B0D12",
    theme_color: "#0B0D12",
    lang: "pt-BR",
    icons: [
      { src: "/brand/epoch-icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/epoch-icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/brand/epoch-app-icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
