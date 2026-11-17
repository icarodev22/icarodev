# Como adicionar uma edição em "Próximas datas"

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
- Sem nenhuma edição futura publicada, a seção "Próximas datas" (e o link dela no topo) fica oculta.

# Como adicionar fotos e vídeos em "Momentos"

Edite **`src/data/momentos.json`** (somente registros reais do evento).

- Foto: `{ "tipo": "foto", "src": "/img/foto.webp", "miniatura": "/img/foto-sm.webp", "largura": 1800, "altura": 1200, "foco": "50% 40%", "alt": "..." }`
- Vídeo: `{ "tipo": "video", "src": "/video/clipe.mp4", "poster": "/img/clipe-capa.webp", "miniatura": "/img/clipe-capa.webp", "largura": 1080, "altura": 1920, "alt": "..." }`
  — abre com controles, sem reprodução automática e sem som automático.
- `foco` ajusta o enquadramento da miniatura (posição horizontal e vertical) para manter as pessoas no quadro.
