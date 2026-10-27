import sys, os
from PIL import Image, ImageOps
S, OUT = sys.argv[1], sys.argv[2]
Z = os.path.join(S, 'zip/vilx')
os.makedirs(OUT, exist_ok=True)

def save(im, name, sizes):
    im = ImageOps.exif_transpose(im).convert('RGB')
    for w in sizes:
        r = im.copy()
        if r.width > w:
            r = r.resize((w, round(r.height * w / r.width)), Image.LANCZOS)
        r.save(os.path.join(OUT, f'{name}-{w}.webp'), 'WEBP', quality=80, method=6)
        print(name, w, r.size)

# section -> source file
hist = {
  'historia-oculos': 'PART4 VILACAPrancheta 1.jpg',
  'historia-olhar': 'PART1 VILACAPrancheta 2.jpg',
  'historia-vermelho': 'PART2 VILACAPrancheta 1.jpg',
  'historia-lua': 'PART5 VILACAPrancheta 1.jpg',
}
shows = {
  'show-esbornia-recife': 'Esb#U00f3rnia Recife.jpg',
  'show-pre-reveillon-bp-fortaleza': 'Pr#U00e9 R#U00e9veillon BP _ Fortaleza.jpg',
  'show-aniversario-kaio-jorge': 'Anivers#U00e1rio Kaio Jorge.jpg',
  'show-evento-privado': 'Evento Privado.jpg',
  'show-liveset': 'Vilx Liveset.jpg',
  'show-ao-vivo-01': 'SaveClip.App_680763459_18569607754025506_1203103841225504670_n.jpg',
  'show-ao-vivo-02': 'SaveClip.App_723331329_18583822774025506_3507121043668839164_n.jpg',
  'show-ao-vivo-03': 'SaveClip.App_847630209_18107120033522829_7466428019234493679_n.jpg',
}
for k, f in hist.items(): save(Image.open(os.path.join(Z, f)), k, [800, 1400])
for k, f in shows.items(): save(Image.open(os.path.join(Z, f)), k, [1024])

# covers cropped from the release (Spotify share cards, page 4)
p = Image.open(os.path.join(S, 'pdfimg/c-001.jpg')); save(p.crop((26, 29, 386, 389)), 'capa-o-predio-vai-tremer', [360])
t = Image.open(os.path.join(S, 'pdfimg/c-003.jpg')); save(t.crop((25, 25, 365, 365)), 'capa-toda-nua', [340])
