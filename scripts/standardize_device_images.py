#!/usr/bin/env python3
"""Create transparent, consistently scaled product PNGs from the source assets.

Install with: python3 -m pip install 'rembg[cpu]' Pillow
The first run downloads the U2-Net segmentation weights. Source images are never
modified; this script writes standardized images under device-images/.
"""
from __future__ import annotations

from io import BytesIO
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw
from rembg import new_session, remove

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "device-images"
CANVAS = (1000, 1200)
PHONE_HEIGHT = 940
TABLET_WIDTH = 900

# Source image and the display interior, in source-image pixel coordinates.
# These inset rounded rectangles restore bright/white screen pixels that generic
# saliency models can mistake for the white studio background. The mask is drawn
# only inside the observed display bezel; source RGB pixels themselves are kept.
DEVICES = {
    "a15-4g": ("1793813811813.jpg", (337, 53, 621, 667), 30, "phone"),
    "a15-5g": ("1793813814861.jpg", (457, 39, 887, 976), 40, "phone"),
    "a16-4g": ("device-a16-4g.webp", (550, 70, 857, 735), 23, "phone"),
    "a16-5g": ("device-a16-5g.webp", (550, 70, 857, 735), 23, "phone"),
    "a25-5g": ("1793813822634.jpg", (464, 104, 832, 902), 34, "phone"),
    "a34-5g": ("1793813824175.jpg", (444, 58, 857, 958), 38, "phone"),
    "a53-5g": ("a53.webp", (468, 87, 845, 925), 27, "phone"),
    "a52s-5g": ("58e741a0-d82b-11f1-be9c-4d568969b7f5.jpg", (231, 38, 420, 461), 19, "phone"),
    "a11-4g": ("Samsung-Galaxy-A11.jpg", (226, 37, 417, 452), 18, "phone"),
    "a24-4g": ("device-a24.webp", (551, 71, 856, 735), 23, "phone"),
    "tab-a9-plus-5g-x216b": ("device-tab-a9plus-5g.webp", (132, 198, 985, 730), 16, "tablet"),
}


def foreground_rgba(source_path: Path, screen_rect: tuple[int, int, int, int], radius: int, session) -> Image.Image:
    source = Image.open(source_path).convert("RGB")
    model_result = Image.open(BytesIO(remove(source_path.read_bytes(), session=session))).convert("RGBA")
    if source.size != model_result.size:
        raise ValueError(f"Segmentation dimensions differ for {source_path.name}")

    alpha = np.asarray(model_result.getchannel("A"), dtype=np.uint8).copy()
    # Clear low-confidence exterior speckles. Preserve anti-aliased silhouette edges.
    alpha[alpha < 8] = 0

    screen = Image.new("L", source.size, 0)
    draw = ImageDraw.Draw(screen)
    x0, y0, x1, y1 = screen_rect
    if not (0 <= x0 < x1 <= source.width and 0 <= y0 < y1 <= source.height):
        raise ValueError(f"Screen mask outside source bounds: {source_path.name}")
    draw.rounded_rectangle((x0, y0, x1 - 1, y1 - 1), radius=radius, fill=255)
    alpha = np.maximum(alpha, np.asarray(screen, dtype=np.uint8))

    # Remove white-background matte from partially covered exterior edge pixels.
    # The source product renders use white studio backgrounds; unassociated RGB is
    # recovered only where segmentation alpha is partial. Fully opaque product
    # pixels, including the camera details and screen pixels, remain unchanged.
    rgb = np.asarray(source, dtype=np.float32)
    a = alpha.astype(np.float32) / 255.0
    partial = (a > 0.03) & (a < 0.98)
    if partial.any():
        denom = a[partial, None]
        recovered = (rgb[partial] - 255.0 * (1.0 - denom)) / denom
        rgb[partial] = np.clip(recovered, 0, 255)
    rgb[alpha == 0] = 0

    rgba = np.dstack((np.rint(rgb).astype(np.uint8), alpha))
    return Image.fromarray(rgba, "RGBA")


def standardize(slug: str, source_path: Path, screen_rect, radius: int, form: str, session) -> tuple[Image.Image, dict]:
    cutout = foreground_rgba(source_path, screen_rect, radius, session)
    alpha = cutout.getchannel("A")
    bounds = alpha.point(lambda value: 255 if value > 24 else 0).getbbox()
    if not bounds:
        raise ValueError(f"No foreground detected for {slug}")
    crop = cutout.crop(bounds)
    bw, bh = crop.size
    if form == "phone":
        scale = min(PHONE_HEIGHT / bh, 920 / bw)
    else:
        # Keep the landscape tablet/device pair at a natural aspect ratio.
        scale = min(TABLET_WIDTH / bw, 940 / bh)
    out_w, out_h = round(bw * scale), round(bh * scale)

    # Premultiplied-alpha resampling prevents white or dark fringes at edges.
    premultiplied = crop.convert("RGBa").resize((out_w, out_h), Image.Resampling.LANCZOS)
    resized = premultiplied.convert("RGBA")
    canvas = Image.new("RGBA", CANVAS, (0, 0, 0, 0))
    x, y = (CANVAS[0] - out_w) // 2, (CANVAS[1] - out_h) // 2
    canvas.alpha_composite(resized, (x, y))
    metrics = {
        "source": source_path.name,
        "source_size": cutout.size,
        "source_bbox": bounds,
        "content_size": (out_w, out_h),
        "content_origin": (x, y),
        "scale": scale,
    }
    return canvas, metrics


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    session = new_session("u2net")
    for slug, (filename, screen_rect, radius, form) in DEVICES.items():
        image, metrics = standardize(slug, ROOT / filename, screen_rect, radius, form, session)
        target = OUTPUT / f"{slug}.png"
        image.save(target, format="PNG", optimize=True, compress_level=9)
        alpha = image.getchannel("A")
        bbox = alpha.point(lambda value: 255 if value > 24 else 0).getbbox()
        print(f"{target.relative_to(ROOT)}: {image.size} RGBA, bbox={bbox}, content={metrics['content_size']}, center={(bbox[0]+bbox[2])/2:.1f},{(bbox[1]+bbox[3])/2:.1f}")


if __name__ == "__main__":
    main()
