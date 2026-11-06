# ZineROM Project

A lightweight, static device catalog for the ZineROM community ROM project. The live site is served by GitHub Pages from the `main` branch root; the hash-based routes keep device pages and section navigation working without changing the existing public site URL.

## Update catalog and ROM information

Edit the `devices` array near the top of `app.js` to add or update a supported device. Each entry contains its page id, displayed name, network variant, model information, image path, device type, and a `builds` map keyed by One UI version (`6.1`, `6.1.1`, `7.0`, `8.0`, `8.5`, or `9.0`). A version value may be one build object or an array of distinct ROM variants.

Only configure a public download after the build has been published and verified. A downloadable release uses `status: "test"` and a real `downloadUrl`; add a matching `sha256` and Android version when available. An in-progress version may use `status: "in-progress"` without a download URL. Missing downloads are shown as unavailable and never produce a download button. Versions absent from the map remain unconfigured; the site does not invent compatibility or download links.

Store `sourceDevice`, `architecture`, `stabilityKey`, `features`, and `knownBugs` on the specific release record so details remain isolated by device, version, and ROM variant. Empty feature/bug lists display an explicit “not documented” state rather than inferred claims. `rom-copy.js` contains the added ROM-detail labels and download text for the 12 supported UI languages.

The Galaxy A52s One UI 6.1 page has separate records for the experimental S23 FE/Exynos variant and the more-stable S23/Snapdragon variant. Only the S23-based variant uses `https://gofile.io/d/FZRgeM8N`. The earlier `https://gofile.io/d/TYKq0wOl` listing is retained under `legacyUnassignedBuilds`; do not surface it as a download until its source variant is confirmed. The S23 FE download link is still unprovided, so its card must not show a download button. The A16 One UI 9 and A25/A53 One UI 8.5 entries are placeholders until model compatibility, source details, and download links are confirmed.

The existing A11 entry remains an experimental diagnostic test build, not a stable ROM. Confirm the exact device variant before flashing. Device pages use the existing project installation tutorial at `https://t.me/ZineROMProject/139` and the direct bug-report destination at `https://t.me/ZineROMProject/9`; a device can override these through optional `installationUrl` and `bugReportUrl` fields. The general support flow and its Telegram destination remain configured separately in `app.js` and `index.html`.

## Device image assets

All 11 catalog device illustrations are served from `device-images/` as transparent 1000×1200 RGBA PNGs. Phone pairs share a 940 px visual height and are centered on the canvas; the landscape Tab A9+ has a 900 px visual width. The site continues to use its existing centered `object-fit: contain` image containers. Original source renders remain untouched in the repository root.

To regenerate the cutouts from the originals, install Pillow and `rembg[cpu]` with `python3 -m pip install Pillow 'rembg[cpu]'`, then run `python3 scripts/standardize_device_images.py`. The first run downloads the U²-Net model weights. To regenerate only one asset, pass its device id, for example `python3 scripts/standardize_device_images.py --device a53-5g`. Source-bounded rounded silhouettes protect the A16 4G pale rear body and Galaxy A53 front/rear housings when segmentation mistakes product pixels for background. Run `python3 scripts/verify_device_images.py` to check dimensions, PNG/RGBA format, transparent canvas margins, silhouette placement/scale, and all `app.js` image mappings before publishing.

## Screenshot gallery

The Screenshots page discovers image files directly from the public `screenshots/` folder on GitHub when the page opens. Keep uploaded originals in that folder; the site links to the original files and does not crop, resize, recompress, or annotate them. `screenshots/metadata.json` supplies descriptive titles, category assignments, and the category-grouped display order for known images. Gallery thumbnails keep each source image's natural proportions. Newly added images appear automatically; until a metadata entry is added, they use their filename as the title and appear under “Other Features.” The gallery only displays category filters that have at least one image. If GitHub's directory API is temporarily unavailable, the metadata file provides the saved-list fallback.

## Run locally

This project has no build step or third-party runtime dependency. From the repository root, run:

```sh
python3 -m http.server 4173
```

Then open `http://localhost:4173/`. Device pages use URLs such as `/#/devices/a11-4g`; Screenshots, Community, and Support are `/#/screenshots`, `/#/community`, and `/#/support`. Feedback & Contributions opens directly at `/#/community?section=feedback`.

## Publish

The existing GitHub Pages source is `main` at `/`. Pushing a tested commit to `main` updates the same Pages deployment and preserves its current URL. Do not rename the repository unless its Pages URL and redirect behavior have first been checked.

Live site: <https://zinefather.github.io/zinerom-a115f-landing/>
