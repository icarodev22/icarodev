"""
Gera as imagens otimizadas do site a partir dos arquivos originais do BAYMA.

Uso:
    python3 scripts/prep_media.py <pasta-com-os-originais>

A pasta deve conter os arquivos como foram entregues (LOGO (5).png,
@gabriellrec-*.jpg, SaveClip.App_*.jpg). O recorte do Hero
(reference/hero-recorte-27.webp) foi feito com segmentação de pessoa
(rembg, modelo isnet-general-use) sobre @gabriellrec-27.jpg, sem nenhum
retoque ou pixel gerado: só a máscara de recorte.

Saída: public/media/*.webp em várias larguras + logos em PNG/WebP.
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public' / 'media'

# nome no site -> (arquivo original, larguras)
PHOTOS = {
    'identidade-roxo': ('@gabriellrec-44.jpg', [720, 1100, 1500]),
    'estudio-perfil': ('@gabriellrec-38.jpg', [720, 1100, 1500]),
    'estudio-cinza': ('@gabriellrec-22.jpg', [720, 1100]),
    'palco-telao': ('SaveClip.App_590403485_18546684796025135_1516883791690411708_n.jpg', [900, 1440]),
    'ao-vivo-azul': ('SaveClip.App_814229713_18628596556025135_7866035519238933553_n.jpg', [900, 1500, 2200]),
    'ao-vivo-bone': ('SaveClip.App_523905652_18517570459025135_3427014171278845961_n.jpg', [720, 1200]),
    'ao-vivo-vermelho': ('SaveClip.App_671186325_18581112523025135_3431649863310107845_n.jpg', [720, 1200]),
    'ao-vivo-brasil': ('SaveClip.App_723562034_18597388516025135_8381335863490312335_n.jpg', [900, 1500]),
}


def save_widths(im: Image.Image, name: str, widths, quality=80):
    for w in widths:
        w = min(w, im.width)
        h = round(im.height * w / im.width)
        im.resize((w, h), Image.LANCZOS).save(OUT / f'{name}-{w}.webp', 'WEBP', quality=quality, method=6)
        print(f'{name}-{w}.webp', (w, h))


def main(src: Path):
    OUT.mkdir(parents=True, exist_ok=True)

    for name, (file, widths) in PHOTOS.items():
        im = ImageOps.exif_transpose(Image.open(src / file)).convert('RGB')
        save_widths(im, name, widths)

    # Recorte do Hero: corta a área transparente e mantém o canal alfa.
    cut = Image.open(ROOT / 'reference' / 'hero-recorte-27.webp').convert('RGBA')
    a = np.array(cut)[..., 3]
    ys, xs = np.where(a > 8)
    box = (max(xs.min() - 4, 0), max(ys.min() - 4, 0), min(xs.max() + 5, cut.width), cut.height)
    cut = cut.crop(box)
    print('recorte', box, cut.size)
    save_widths(cut, 'hero-bayma', [560, 900, 1300], quality=84)

    # Logo: a original (roxa) e uma versão branca com exatamente o mesmo
    # desenho (só a cor muda; o alfa do arquivo original é preservado).
    logo = Image.open(src / 'LOGO (5).png').convert('RGBA')
    logo = logo.crop(logo.getbbox())
    logo.save(OUT / 'logo-roxo.png', optimize=True)
    alpha = logo.getchannel('A')
    white = Image.new('RGBA', logo.size, (255, 255, 255, 255))
    white.putalpha(alpha)
    white.save(OUT / 'logo-branco.png', optimize=True)
    for n, im in (('logo-roxo', logo), ('logo-branco', white)):
        im.save(OUT / f'{n}.webp', 'WEBP', lossless=True, method=6)
    print('logo', logo.size)

    # Favicon: a logo original centralizada sobre o preto da marca.
    for size, name in ((64, 'favicon.png'), (180, 'apple-touch-icon.png')):
        tile = Image.new('RGBA', (size, size), (8, 8, 16, 255))
        lw = round(size * 0.86)
        lg = logo.resize((lw, round(logo.height * lw / logo.width)), Image.LANCZOS)
        tile.alpha_composite(lg, ((size - lg.width) // 2, (size - lg.height) // 2))
        tile.convert('RGB').save(ROOT / 'public' / name, optimize=True)


if __name__ == '__main__':
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(Path(sys.argv[1]))
