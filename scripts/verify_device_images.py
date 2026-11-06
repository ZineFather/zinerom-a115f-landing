#!/usr/bin/env python3
"""Strict structural and alpha validation for the standardized device catalog."""
from pathlib import Path
import re

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
EXPECTED = {
    "a15-4g": ("device-images/a15-4g.png", "phone"),
    "a15-5g": ("device-images/a15-5g.png", "phone"),
    "a16-4g": ("device-images/a16-4g.png", "phone"),
    "a16-5g": ("device-images/a16-5g.png", "phone"),
    "a25-5g": ("device-images/a25-5g.png", "phone"),
    "a34-5g": ("device-images/a34-5g.png", "phone"),
    "a53-5g": ("device-images/a53-5g.png", "phone"),
    "a52s-5g": ("device-images/a52s-5g.png", "phone"),
    "a11-4g": ("device-images/a11-4g.png", "phone"),
    "a24-4g": ("device-images/a24-4g.png", "phone"),
    "tab-a9-plus-5g-x216b": ("device-images/tab-a9-plus-5g-x216b.png", "tablet"),
}

app = (ROOT / "app.js").read_text()
errors = []
phone_heights = []
for device_id, (relative, form) in EXPECTED.items():
    if not re.search(rf'id:\s*"{re.escape(device_id)}"[\s\S]*?image:\s*"{re.escape(relative)}"', app):
        errors.append(f"{device_id}: app.js does not reference {relative}")
    path = ROOT / relative
    if not path.is_file():
        errors.append(f"{device_id}: missing {relative}")
        continue
    with Image.open(path) as opened:
        if opened.format != "PNG":
            errors.append(f"{device_id}: format is {opened.format}, not PNG")
        if opened.size != (1000, 1200):
            errors.append(f"{device_id}: dimensions are {opened.size}, not 1000x1200")
        if opened.mode != "RGBA":
            errors.append(f"{device_id}: mode is {opened.mode}, not RGBA")
        image = opened.convert("RGBA")
    alpha = np.asarray(image.getchannel("A"), dtype=np.uint8)
    visible = alpha > 24
    if not np.any(alpha == 0):
        errors.append(f"{device_id}: no fully transparent pixels")
    # All four canvas edges and corners must be clear; this directly catches an
    # opaque white/black/gray/colored rectangular canvas behind the device.
    if (alpha[0].max() != 0 or alpha[-1].max() != 0 or
        alpha[:, 0].max() != 0 or alpha[:, -1].max() != 0):
        errors.append(f"{device_id}: at least one canvas edge is not fully transparent")
    bbox = Image.fromarray(visible.astype(np.uint8) * 255, "L").getbbox()
    if bbox is None:
        errors.append(f"{device_id}: no visible device pixels")
        continue
    x0, y0, x1, y1 = bbox
    width, height = x1 - x0, y1 - y0
    center_x, center_y = (x0 + x1) / 2, (y0 + y1) / 2
    if abs(center_x - 500) > 1 or abs(center_y - 600) > 1:
        errors.append(f"{device_id}: foreground is off center at ({center_x:.1f},{center_y:.1f})")
    if form == "phone":
        phone_heights.append(height)
        if height != 940:
            errors.append(f"{device_id}: phone foreground height is {height}, expected 940px")
    elif width != 900:
        errors.append(f"{device_id}: tablet foreground width is {width}, expected 900px")
    transparent_ratio = float(np.mean(alpha == 0))
    # Product render must occupy substantial canvas and leave balanced transparent margins.
    if transparent_ratio < 0.20 or transparent_ratio > 0.85:
        errors.append(f"{device_id}: suspicious transparent ratio {transparent_ratio:.3f}")
    # A white studio backdrop surviving around the cutout would add a huge opaque
    # uniform field. Outside the detected device silhouette must remain alpha zero.
    exterior = np.ones((1200, 1000), dtype=bool)
    exterior[y0:y1, x0:x1] = False
    if np.any(alpha[exterior] != 0):
        errors.append(f"{device_id}: nontransparent pixels remain outside the silhouette bounds")
    print(f"PASS {device_id}: PNG RGBA 1000x1200; foreground {width}x{height} at ({center_x:.1f},{center_y:.1f}); transparent={transparent_ratio:.1%}")

if phone_heights and (min(phone_heights) != max(phone_heights)):
    errors.append(f"phone visual heights differ: {sorted(set(phone_heights))}")
if len(EXPECTED) != 11:
    errors.append(f"expected 11 supported devices in validator, found {len(EXPECTED)}")

if errors:
    print("\nVALIDATION FAILED:")
    for error in errors:
        print(" -", error)
    raise SystemExit(1)
print(f"\nPASS: all {len(EXPECTED)} catalog images and app.js mappings meet the specification.")
