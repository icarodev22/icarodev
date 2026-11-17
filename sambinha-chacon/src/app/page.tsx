import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Faixa from "@/components/Faixa";
import Eventos from "@/components/Eventos";
import Atracoes from "@/components/Atracoes";
import Experiencia from "@/components/Experiencia";
import Galeria from "@/components/Galeria";
import Ingressos from "@/components/Ingressos";
import Faq from "@/components/Faq";
import Rodape from "@/components/Rodape";
import BarraCompra from "@/components/BarraCompra";
import WhatsFlutuante from "@/components/WhatsFlutuante";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <Faixa />
        <Eventos />
        <Atracoes />
        <Experiencia />
        <Faixa variante="navy" />
        <Galeria />
        <Ingressos />
        <Faq />
      </main>
      <Rodape />
      <BarraCompra />
      <WhatsFlutuante />
      <Reveal />
    </>
  );
}
