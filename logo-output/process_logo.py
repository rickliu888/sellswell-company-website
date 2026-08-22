from pathlib import Path
from PIL import Image

SOURCE = Path("/Users/rick/Desktop/公司资料/公司资料—事为公司管理/公司主体文件/公司LOGO/SellsWell(印刷用文件)/事为电商.png")
OUT = Path("/Users/rick/Desktop/事为公司官网/logo-output")


def white_to_alpha(image: Image.Image) -> Image.Image:
    src = image.convert("RGBA")
    result = Image.new("RGBA", src.size)
    out = []
    for r, g, b, source_alpha in src.getdata():
        # Exact inverse of compositing a colored foreground over white.
        alpha = max(255 - r, 255 - g, 255 - b)
        alpha = alpha * source_alpha // 255
        if alpha == 0:
            out.append((0, 0, 0, 0))
            continue
        rr = max(0, min(255, 255 - ((255 - r) * 255 + alpha // 2) // alpha))
        gg = max(0, min(255, 255 - ((255 - g) * 255 + alpha // 2) // alpha))
        bb = max(0, min(255, 255 - ((255 - b) * 255 + alpha // 2) // alpha))
        out.append((rr, gg, bb, alpha))
    result.putdata(out)
    return result


def solid_white(image: Image.Image) -> Image.Image:
    alpha = image.getchannel("A")
    white = Image.new("RGBA", image.size, (255, 255, 255, 0))
    white.putalpha(alpha)
    return white


base = white_to_alpha(Image.open(SOURCE))
base.save(OUT / "图片1-彩色全标-透明.png", format="PNG", compress_level=6)
solid_white(base).save(OUT / "图片2-白色全标-透明.png", format="PNG", compress_level=6)

# The mark occupies the left block of the source; isolate it before tight alpha crop.
mark_region = base.crop((0, 0, 650, base.height))
bbox = mark_region.getchannel("A").getbbox()
if bbox is None:
    raise RuntimeError("Logo mark not found")
mark = mark_region.crop(bbox)
mark.save(OUT / "图片3-彩色图形-透明.png", format="PNG", compress_level=6)
solid_white(mark).save(OUT / "图片4-白色图形-透明.png", format="PNG", compress_level=6)
