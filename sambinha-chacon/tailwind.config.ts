import type { Config } from "tailwindcss";

/**
 * Paleta extraída dos arquivos oficiais (logo + arte do evento).
 * Valores amostrados por quantização de cor; não há manual de marca fornecido.
 */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Azul-marinho do lettering da logo
        marinho: { DEFAULT: "#032E71", escuro: "#021F4F" },
        // Azul royal dos coqueiros, janelas e venezianas da arte
        royal: { DEFAULT: "#0648AE", claro: "#1F4BA9" },
        // Amarelo do fundo da logo / sol
        amarelo: { DEFAULT: "#FFB200", claro: "#FDC85A" },
        // Vermelho do sol da logo e da arte
        vermelho: { DEFAULT: "#C62B11", escuro: "#9F2319" },
        // Laranja do anel da logo
        laranja: "#F17C1B",
        // Verde das folhas de coqueiro
        verde: { DEFAULT: "#227947", escuro: "#1A5E37" },
        // Rosa dos casarões
        rosa: "#F49CD3",
        // Céu e creme da arte
        ceu: { DEFAULT: "#E0FCFC", medio: "#C0E0E3" },
        creme: { DEFAULT: "#FBF4E6", escuro: "#F8E7C7" },
      },
      fontFamily: {
        // Fonte de apoio COMPLEMENTAR (a fonte oficial da marca não foi fornecida)
        sans: ['"Archivo Variable"', "Archivo", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
