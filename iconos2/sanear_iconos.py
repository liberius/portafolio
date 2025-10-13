import base64
import imghdr
import os
from pathlib import Path

from PIL import Image, ImageOps
import filetype

ICON_DIR = Path(r"D:\portafolio\iconos2")
FILES = [
    "acariciar.png",
    "api.png",
    "corazon.png",
    "espantado.png",
    "fondo.png",
    "ignorar.png",
]

def ensure_png(path: Path) -> None:
    # Carga robusta
    with Image.open(path) as im:
        im.load()

        # Normaliza orientación y modo de color
        im = ImageOps.exif_transpose(im)
        if im.mode not in ("RGB", "RGBA"):
            # Mantén alfa si existía; si no, RGB
            im = im.convert("RGBA" if "A" in im.getbands() else "RGB")

        # Guardado a PNG real, sin metadatos
        tmp = path.with_suffix(".tmp.png")
        im.save(
            tmp,
            format="PNG",
            optimize=True,
            compress_level=6,
        )

    # Sustituye el archivo original
    tmp.replace(path)

    # Validaciones rápidas
    with open(path, "rb") as f:
        data = f.read()

    # 1) Firma PNG: 89 50 4E 47 0D 0A 1A 0A
    assert data[:8] == b"\x89PNG\r\n\x1a\n", f"Firma PNG inválida: {path.name}"

    # 2) imghdr
    assert imghdr.what(None, data) == "png", f"imghdr no detecta PNG: {path.name}"

    # 3) filetype
    kind = filetype.guess(data)
    assert kind and kind.mime == "image/png", f"filetype no detecta image/png: {path.name}"

    # 4) Base64 de prueba (sin prefijo data:)
    b64 = base64.b64encode(data).decode("ascii")
    assert "," not in b64 and "\n" not in b64, f"Base64 inesperado: {path.name}"

    print(f"OK -> {path.name:12s} | {len(data)/1024:.1f} KB | PNG válido")

def main():
    print(f"Directorio: {ICON_DIR}")
    for fname in FILES:
        p = ICON_DIR / fname
        if not p.exists():
            print(f"NO ENCONTRADO: {fname}")
            continue
        try:
            ensure_png(p)
        except Exception as e:
            print(f"ERROR en {fname}: {e}")

if __name__ == "__main__":
    main()