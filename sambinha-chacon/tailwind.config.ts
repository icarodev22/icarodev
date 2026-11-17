import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#13256B", deep: "#0B1747", ink: "#0A1238" },
        royal: { DEFAULT: "#1F4FD1", light: "#3B6CF0" },
        sol: { DEFAULT: "#FFB800", soft: "#FFD45C" },
        laranja: "#F2661B",
        vermelho: { DEFAULT: "#D7261E", deep: "#A9190F" },
        rosa: { DEFAULT: "#F49AC9", soft: "#FBD3E7" },
        verde: { DEFAULT: "#1F8A4C", soft: "#4DBE74" },
        creme: { DEFAULT: "#FFF4DC", deep: "#FBE7BE" },
        ceu: { DEFAULT: "#DCFCFC", deep: "#BDEFF2" },
      },
      fontFamily: {
        display: ['"Sansita Swashed"', "Georgia", "serif"],
        sans: ['"Archivo Variable"', "Archivo", "system-ui", "sans-serif"],
      },
      boxShadow: {
        bloco: "6px 6px 0 0 #13256B",
        "bloco-sm": "4px 4px 0 0 #13256B",
        "bloco-sol": "5px 5px 0 0 #FFB800",
      },
      keyframes: {
        girar: { to: { transform: "rotate(360deg)" } },
        balanco: { "0%,100%": { transform: "rotate(-4deg)" }, "50%": { transform: "rotate(4deg)" } },
        faixa: { to: { transform: "translateX(-50%)" } },
      },
      animation: {
        girar: "girar 40s linear infinite",
        balanco: "balanco 3.5s ease-in-out infinite",
        faixa: "faixa 38s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
