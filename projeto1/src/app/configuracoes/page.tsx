import type { Metadata } from "next";
import { SettingsPanel } from "@/components/settings/SettingsPanel";

export const metadata: Metadata = { title: "Configurações" };

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <p className="eyebrow">Preferências</p>
      <h1 className="mt-2 font-serif text-3xl text-ivory sm:text-4xl">Configurações</h1>
      <p className="mt-2 text-stone">
        As preferências ficam guardadas apenas neste navegador. Nenhum cadastro é necessário.
      </p>
      <SettingsPanel />
    </div>
  );
}
