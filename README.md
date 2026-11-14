# Naches Learning Hub — Illustrated Cards Update (v31.51)

This is a complete GitHub Pages replacement update for the **main Learning Hub** (`jkramer-cloud.github.io`).

## What changed

- All available activity cards get a brighter, matching illustrated-card frame with refined gold edges, stronger imagery, improved contrast, and hover states.
- 13 prominently displayed tools and games have new colorful illustrated art, including **Class Compass**, ClassTempo, Pizza Lab, Grammar Kingdom, Marble Summit, Cipher Quest, Checkers Academy and more.
- The artwork also appears in the "New to the Hub" and "Recently opened" shelves because they share the card rendering helper.
- All remaining existing activity artwork stays present, including its original individual illustration where available.
- The catalog, existing links, game access, favorite buttons, Pocket Critters hidden discoverability, weather, carousel, search, filters, local preferences and other Learning Hub features are preserved.

## Upload to GitHub

Upload the **contents** of this package to the **root** of `jkramer-cloud/jkramer-cloud.github.io`:

- `index.html` — replaces current Hub HTML
- `activities.json` — current catalog, preserved exactly from the files provided
- `README.md` — this documentation
- `assets/card-art/` — **13 WebP images** used by the new cards

Keep folder paths as they are. **Do not upload the ZIP itself** to GitHub. GitHub Pages will serve the new images from `assets/card-art/`.

**Do not remove existing files or folders** in the repository; this package updates only the files listed above.

## Notes

- Art is static and self-hosted; no added external services or accounts.
- The site still uses its current catalog list (38 available activities and more in planning).
- If old artwork appears immediately after publishing, hard-refresh (`Ctrl+Shift+R`).
- `index.html` alone will not show the 13 new images until the `assets/card-art` folder is uploaded too.
