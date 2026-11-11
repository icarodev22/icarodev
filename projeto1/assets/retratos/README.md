# Retratos originais

Coloque aqui as imagens originais das personalidades (JPG, PNG, WebP ou AVIF), com o
**slug** como nome do arquivo — por exemplo `albert-einstein.jpg` — e registre os dados de
autoria em `creditos.json`:

```json
{
  "albert-einstein": {
    "file": "albert-einstein.jpg",
    "kind": "fotografia",
    "credit": "Orren Jack Turner, 1947",
    "license": "Domínio público",
    "sourceUrl": "https://…",
    "focus": "50% 30%"
  }
}
```

Depois execute `npm run portraits:build`. O script:

- recusa imagens sem `credit` e `license`, com slug inexistente ou menores que 600 px;
- não aplica filtros nem recortes: apenas redimensiona (sem ampliar) e converte para AVIF e WebP
  (320, 720 e 1200 px de largura, limitados à largura original), removendo metadados EXIF/GPS;
- grava os arquivos em `public/retratos/` e atualiza `src/content/portraits.generated.json`.

Personalidades sem imagem continuam usando a ilustração original, identificada como tal.
