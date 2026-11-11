import type { Metadata } from "next";
import { Prose } from "@/components/ui/Prose";

export const metadata: Metadata = { title: "Privacidade" };

export default function PrivacyPage() {
  return (
    <Prose eyebrow="Privacidade" title="Política de privacidade (versão preliminar)">
      <p>
        <strong>Aviso:</strong> este texto descreve o funcionamento técnico atual da plataforma e é uma versão preliminar.
        Ele deve ser revisado por profissional jurídico e completado com a identificação do controlador antes da operação
        pública. Não declaramos conformidade integral com a LGPD sem essa avaliação.
      </p>
      <h2>Quais dados tratamos</h2>
      <ul>
        <li><strong>Sem cadastro:</strong> não pedimos nome, e-mail, escola nem idade.</li>
        <li><strong>Cookie técnico:</strong> um identificador aleatório (cookie HttpOnly) permite que você continue a própria conversa e impede que outras pessoas a acessem. No servidor guardamos apenas um resumo criptográfico (hash) desse identificador.</li>
        <li><strong>Conversas:</strong> o texto das perguntas e respostas é guardado temporariamente para manter o contexto da conversa e é apagado automaticamente após o prazo de retenção configurado (padrão: 24 horas) ou quando você inicia uma nova conversa.</li>
        <li><strong>Limites de uso:</strong> para evitar abuso, contadores usam uma versão pseudonimizada (HMAC) do endereço IP, que não é armazenado em texto puro.</li>
        <li><strong>Métricas:</strong> registramos apenas totais de consumo (quantidade de tokens, personalidade, modelo), sem o conteúdo das mensagens.</li>
      </ul>
      <h2>Compartilhamento</h2>
      <p>
        Para gerar respostas, a pergunta e trechos da base de referência são enviados ao provedor de IA (Anthropic). Não
        utilizamos as conversas para treinar modelos. Consulte também a política do provedor sobre retenção de dados.
      </p>
      <h2>Crianças e adolescentes</h2>
      <p>
        A plataforma pode ser usada por estudantes menores de idade. Por isso minimizamos a coleta e pedimos que você
        <strong> não informe dados pessoais</strong> nas conversas. Instituições de ensino que adotarem a plataforma devem
        avaliar a base legal e o consentimento aplicáveis.
      </p>
      <h2>Seus direitos</h2>
      <p>
        Você pode apagar a conversa a qualquer momento com o botão “Nova conversa”. Canal de contato do controlador:
        <strong> [a definir pelo responsável pela operação]</strong>.
      </p>
    </Prose>
  );
}
