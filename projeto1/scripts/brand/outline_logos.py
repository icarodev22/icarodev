"""
Gera os logotipos EPOCH.ia com o texto CONVERTIDO EM CONTORNOS (paths), a partir
da fonte Space Grotesk (peso 600) instanciada da fonte variável do @fontsource.

Motivo: os SVGs do pacote de marca usam <text font-family="Space Grotesk">.
Quando usados como imagem (<img>, favicon, e-mail, redes sociais) a fonte não é
carregada e o navegador cai para Arial, alterando o desenho e desalinhando ".ia".

Uso: python3 scripts/brand/outline_logos.py
Requer: pip install fonttools brotli
"""
import io
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parents[2]
FONT = ROOT / "node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2"
OUT = ROOT / "public/brand"

SYMBOL = (
    '<path d="M18 23 L51 23 L42 32 L18 32 Z"/>'
    '<path d="M18 43 L61 43 L52 52 L18 52 Z"/>'
    '<path d="M18 63 L51 63 L42 72 L18 72 Z"/>'
)

VARIANTS = {
    # nome: (símbolo, "EPOCH", ".ia")
    "dark": ("#829BFF", "#F1F3F7", "#829BFF"),
    "light": ("#526FE5", "#0B0D12", "#526FE5"),
    "black": ("#000000", "#000000", "#000000"),
    "white": ("#FFFFFF", "#FFFFFF", "#FFFFFF"),
}


def load_font() -> TTFont:
    font = TTFont(io.BytesIO(FONT.read_bytes()))
    return instancer.instantiateVariableFont(font, {"wght": 600})


def text_path(font: TTFont, text: str, x: float, baseline: float, size: float, tracking: float) -> tuple[str, float]:
    """Retorna o path SVG do texto e a posição x final (com tracking em unidades de px)."""
    glyphset = font.getGlyphSet()
    cmap = font.getBestCmap()
    upm = font["head"].unitsPerEm
    scale = size / upm
    parts = []
    for ch in text:
        name = cmap[ord(ch)]
        pen = SVGPathPen(glyphset)
        # Y invertido (fonte cresce para cima; SVG para baixo).
        glyphset[name].draw(TransformPen(pen, (scale, 0, 0, -scale, x, baseline)))
        parts.append(pen.getCommands())
        x += glyphset[name].width * scale + tracking
    return " ".join(p for p in parts if p), x


def horizontal(font: TTFont, colors: tuple[str, str, str]) -> str:
    sym, word, suffix = colors
    d1, x_end = text_path(font, "EPOCH", 98, 75, 62, -2.4)
    d2, x_end = text_path(font, ".ia", x_end + 2, 75, 62, -2.4)
    width = round(x_end + 18)
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} 112" role="img" aria-label="EPOCH.ia">'
        f'<g fill="{sym}" transform="translate(0,8)">{SYMBOL}</g>'
        f'<path fill="{word}" d="{d1}"/><path fill="{suffix}" d="{d2}"/></svg>\n'
    )


def compact(font: TTFont) -> str:
    d1, x_end = text_path(font, "EPOCH", 0, 143, 48, -1.8)
    d2, x_total = text_path(font, ".ia", x_end + 1.5, 143, 48, -1.8)
    shift = (360 - x_total) / 2
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 180" role="img" aria-label="EPOCH.ia">'
        f'<g fill="#829BFF" transform="translate(140,0)">{SYMBOL}</g>'
        f'<g transform="translate({shift:.2f},0)"><path fill="#F1F3F7" d="{d1}"/><path fill="#829BFF" d="{d2}"/></g></svg>\n'
    )


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    font = load_font()
    for name, colors in VARIANTS.items():
        (OUT / f"epoch-logo-horizontal-{name}.svg").write_text(horizontal(font, colors))
    (OUT / "epoch-logo-compact.svg").write_text(compact(font))
    print("Logotipos com contornos gerados em", OUT)


if __name__ == "__main__":
    main()
