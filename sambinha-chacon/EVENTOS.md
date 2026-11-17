# Como adicionar uma edição na "Agenda"

Todo o cadastro fica em **`src/data/eventos.json`**. O layout não precisa ser alterado.

1. Coloque a arte oficial em `public/img/` (de preferência `.webp`, ~640 px de largura).
2. Adicione um bloco no `eventos.json`:

```json
{
  "id": "nome-curto-unico",
  "status": "publicado",
  "titulo": "Sambinha Chacon · Nome da edição",
  "data": "2027-01-30",
  "horario": "16:00",
  "local": "Arena Chacon · Recife – PE",
  "imagem": "/img/arte-da-edicao.webp",
  "imagemLargura": 640,
  "imagemAltura": 800,
  "imagemAlt": "Descrição da arte para leitores de tela.",
  "linkCompra": "https://www.bilheteriadigital.com/sambinhachacon"
}
```

3. `npm run build` e publique a pasta `out/`.

## Regras
| Campo | Regra |
|---|---|
| `status` | `"rascunho"` fica oculto; só `"publicado"` aparece. |
| `data` | Obrigatória, **com ano**, formato `AAAA-MM-DD`. Sem data válida, não aparece. |
| `horario` | Opcional (`HH:MM`). Com horário, a edição sai da lista no início do evento; sem horário, no fim do dia. |
| `local` | Opcional; só preencha se confirmado. |

- A verificação usa a data/hora atual de **São Paulo**, calculada no navegador: a edição some sozinha quando passa, sem apagar o cadastro e sem precisar publicar de novo.
- Ordem automática: da data mais próxima para a mais distante.
- Sem nenhuma edição futura publicada, a Agenda mostra apenas "Novas datas em breve."

# Fotos em "Momentos do Sambinha" (somente no celular)

Edite **`src/data/momentos.json`** (somente registros reais do evento). A primeira foto é a grande do mosaico;
com mais de 5 itens aparece "Ver mais momentos".

- Foto: `{ "tipo": "foto", "src": "/img/foto.webp", "miniatura": "/img/foto-sm.webp", "largura": 1800, "altura": 1200, "foco": "50% 40%", "alt": "..." }`
- Vídeo: `{ "tipo": "video", "src": "/video/clipe.mp4", "poster": "/img/capa.webp", "miniatura": "/img/capa.webp", "largura": 1080, "altura": 1920, "alt": "..." }` — abre com controles, sem reprodução automática.
