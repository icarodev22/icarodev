/**
 * ============================================================
 *  SAMBINHA CHACON — CAPA DE VENDAS
 *  Links e textos centralizados. Edite só este arquivo.
 * ============================================================
 */

/**
 * >>> WHATSAPP_URL — COLE AQUI O LINK OFICIAL DO WHATSAPP DE VENDAS <<<
 * Ex.: "https://wa.me/55819XXXXXXXX?text=Quero%20comprar%20ingresso"
 *
 * Enquanto estiver vazio, o botão "Comprar pelo WhatsApp" usa o destino oficial
 * já existente (Central de links). O telefone impresso nas artes está
 * marcado como "INFO" e por isso NÃO foi usado aqui.
 */
export const WHATSAPP_URL = "";

export const BILHETERIA_URL = "https://www.bilheteriadigital.com/sambinhachacon";
export const CENTRAL_LINKS_URL = "https://linklist.bio/gobu8_xxkv";

export const BOTOES = {
  semTaxa: {
    rotulo: "Comprar pelo WhatsApp",
    href: WHATSAPP_URL.trim() || CENTRAL_LINKS_URL,
    destino: WHATSAPP_URL.trim() ? "WhatsApp" : "canais oficiais",
  },
  digitais: {
    rotulo: "Comprar online",
    href: BILHETERIA_URL,
    destino: "Bilheteria Digital",
  },
};

export const SITE = {
  nome: "Sambinha Chacon",
  titulo: "Sambinha Chacon | Ingressos",
  descricao:
    "Ingressos do Sambinha Chacon: compre pelo WhatsApp ou online na Bilheteria Digital.",
  // Troque pelo domínio definitivo (usado na imagem de compartilhamento).
  url: "https://sambinhachacon.com.br",
};
