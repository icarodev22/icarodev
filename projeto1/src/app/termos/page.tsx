import type { Metadata } from "next";
import { Prose } from "@/components/ui/Prose";

export const metadata: Metadata = { title: "Termos de uso" };

export default function TermsPage() {
  return (
    <Prose eyebrow="Termos" title="Termos de uso (versão preliminar)">
      <p>
        <strong>Aviso:</strong> versão preliminar, sujeita a revisão jurídica antes da operação pública.
      </p>
      <h2>Natureza do serviço</h2>
      <p>
        O Projeto 1 é uma ferramenta educacional. As personalidades são representações digitais fictícias e as respostas são
        geradas por inteligência artificial; elas não correspondem a declarações reais dessas pessoas e podem conter erros.
      </p>
      <h2>Uso adequado</h2>
      <ul>
        <li>Não envie dados pessoais seus ou de terceiros.</li>
        <li>Não tente burlar as regras da simulação, obter informações internas do sistema ou sobrecarregar o serviço.</li>
        <li>Não use as respostas como citações reais das personalidades.</li>
      </ul>
      <h2>Limites de uso</h2>
      <p>Há limites de mensagens por minuto, por dia e por conversa para garantir a disponibilidade a todos.</p>
      <h2>Responsável</h2>
      <p>Identificação e contato do responsável: <strong>[a definir]</strong>.</p>
    </Prose>
  );
}
