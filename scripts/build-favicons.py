"""Builds the bitmap icons from the same design as favicon.svg (run from the repo root):
   favicon.ico (16, 32, 48) and apple-touch-icon.png (180).
   Design: indigo-to-violet rounded square (the header logo colours) with a white </> mark.
   Needs Pillow:  python scripts/build-favicons.py
"""
from PIL import Image, ImageDraw

BIG = 1024                  # draw large, then shrink: smooth edges at every size
S = BIG / 64                # favicon.svg uses a 64 x 64 grid
TOP, BOTTOM = (0x4F, 0x46, 0xE5), (0x7C, 0x3A, 0xED)


def draw(rounded=True):
    # diagonal gradient, like the SVG's linearGradient x1=0 y1=0 → x2=1 y2=1
    grad = Image.new('RGB', (BIG, BIG))
    px = grad.load()
    for y in range(BIG):
        for x in range(BIG):
            t = (x + y) / (2 * (BIG - 1))
            px[x, y] = tuple(round(a + (b - a) * t) for a, b in zip(TOP, BOTTOM))
    mask = Image.new('L', (BIG, BIG), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, BIG - 1, BIG - 1], radius=round(14 * S) if rounded else 0, fill=255)
    img = Image.new('RGBA', (BIG, BIG), (0, 0, 0, 0))
    img.paste(grad, (0, 0), mask)

    d = ImageDraw.Draw(img)
    w = round(5.5 * S)
    pts = lambda *p: [(x * S, y * S) for x, y in p]
    for line in (pts((23, 20), (12, 32), (23, 44)), pts((41, 20), (52, 32), (41, 44)), pts((35.5, 17), (28.5, 47))):
        d.line(line, fill='white', width=w, joint='curve')
        for x, y in (line[0], line[-1]):           # round line caps
            d.ellipse([x - w / 2, y - w / 2, x + w / 2, y + w / 2], fill='white')
    return img


icon = draw()
icon.resize((256, 256), Image.LANCZOS).save('favicon.ico', sizes=[(16, 16), (32, 32), (48, 48)])
# iOS adds its own rounded corners and shows transparency as black: use a full square for the touch icon
draw(rounded=False).convert('RGB').resize((180, 180), Image.LANCZOS).save('apple-touch-icon.png', optimize=True)
print('favicon.ico and apple-touch-icon.png written')
