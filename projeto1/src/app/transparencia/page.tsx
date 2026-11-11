import type { Metadata } from "next";
import { SIMULATION_DISCLAIMER } from "@/content";
import { Prose } from "@/components/ui/Prose";

export const metadata: Metadata = { title: "Como funciona" };

export default function TransparencyPage() {
  return (
    <Prose eyebrow="Transparência" title="Como funciona a EPOCH.ia">
      <p className="rounded-lg border border-accent bg-accent/20 p-4 text-fg/90">{SIMULATION_DISCLAIMER}</p>
      <p>
        A EPOCH.ia transforma conhecimento em diálogo: cada conversa acontece com uma representação digital educacional de
        uma personalidade, dentro do seu campo de conhecimento e da sua época. Perguntas fora desse universo são
        redirecionadas com gentileza para o tema da conversa.
      </p>
      <h2>De onde vêm as respostas</h2>
      <p>
        As respostas são geradas por um modelo de linguagem (inteligência artificial) do provedor Anthropic. Antes de cada
        resposta, a plataforma recupera trechos de uma base de referência curada — exclusiva de cada personalidade — e os
        envia ao modelo junto com a sua pergunta. Não há consulta à internet em tempo real.
      </p>
      <p>
        A base de referência é composta por sínteses editoriais escritas a partir das fontes listadas em cada perfil
        (enciclopédias, instituições, museus e obras originais). Esses textos <strong>aguardam revisão de especialistas</strong>.
      </p>
      <h2>Limites e cuidados</h2>
      <ul>
        <li>A IA pode errar. Confira informações importantes nas fontes indicadas.</li>
        <li>As personalidades não “sabem” de acontecimentos posteriores à própria morte; quando isso surgir, a resposta deve indicá-lo.</li>
        <li>Opiniões hipotéticas são marcadas como simulação. Frases entre aspas não devem ser tomadas como citações reais.</li>
        <li>Cada retrato é identificado: <strong>ilustração original</strong>, <strong>reconstrução digital</strong> ou fotografia com crédito. Reconstruções e ilustrações não são fotografias autênticas.</li>
        <li>Não há sincronização labial nem voz nesta versão.</li>
      </ul>
      <h2>Níveis de explicação</h2>
      <p>
        Você pode escolher o nível (ensino fundamental, médio, superior ou conhecimento geral). Ele ajusta a linguagem e a
        profundidade, não os fatos.
      </p>
    </Prose>
  );
}
