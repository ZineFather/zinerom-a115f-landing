# ZineROM Project

A lightweight, static device catalog for the ZineROM community ROM project. The live site is served by GitHub Pages from the `main` branch root; the hash-based routes keep device pages and section navigation working without changing the existing public site URL.

## Update catalog and ROM information

Edit the `devices` array near the top of `app.js` to add or update a supported device. Each entry contains its page id, displayed name, network variant, model information, image path, device type, and a `builds` map keyed by One UI version (`6.1`, `7.0`, `8.0`, `8.5`, or `9.0`).

Only configure a public download after the build has been published and verified. A downloadable release uses `status: "test"`, a real `downloadUrl`, and—when available—a matching `sha256` and Android version. An in-progress version may use `status: "in-progress"` without a download URL. Versions absent from the map are shown as unconfigured; the site does not invent compatibility or download links.

The existing A11 entry is an experimental diagnostic test build, not a stable ROM. Confirm the exact device variant before flashing. The support categories and Telegram destination are configured in `app.js` and `index.html`.

## Run locally

This project has no build step or third-party runtime dependency. From the repository root, run:

```sh
python3 -m http.server 4173
```

Then open `http://localhost:4173/`. Device pages use URLs such as `/#/devices/a11-4g`; About and Support are `/#/about` and `/#/support`.

## Publish

The existing GitHub Pages source is `main` at `/`. Pushing a tested commit to `main` updates the same Pages deployment and preserves its current URL. Do not rename the repository unless its Pages URL and redirect behavior have first been checked.
