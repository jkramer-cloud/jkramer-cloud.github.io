# Naches Learning Hub — Fully Illustrated Cards v31.53

A complete GitHub-ready presentation update for the **main Naches Learning Hub** at `jkramer-cloud.github.io`.

## What's new

- **All 38 available activity cards** have colorful, individually themed WebP poster art.
- The first **13 approved images remain unchanged** and were verified byte-for-byte against v31.51.
- The nine new detailed scenes from v31.52 are retained, and the final 16 simpler SVG-based posters have been replaced with new high-detail illustrations.
- Art is shared automatically by the full activity gallery and the New / Recently opened shelves.
- **No games, catalog entries, URLs, hidden release rules, search, favorites, weather, or other Hub behavior was intentionally changed.**
- No extra sign-ins, external image services, tracking or dependencies were added.

## Install to GitHub

1. Unzip `Hub_v31_53.zip` on your computer.
2. Open the **main** `jkramer-cloud.github.io` repository (not an individual game repository).
3. Upload and replace `index.html`, `activities.json`, and `README.md` from the unzipped package.
4. Upload the complete `assets/card-art/` directory, preserving paths. It contains 38 compressed `.webp` images.
5. Commit the files, and refresh the website when GitHub Pages deploys. If necessary, hard-refresh with Ctrl+Shift+R.

**Do not delete any other files or folders already in your repository.** The individual game repositories do not need changes.

## Technical notes

- `activities.json` is copied byte-for-byte from your uploaded latest catalogue.
- The update changes only the poster asset files and the poster edition note in the HTML compared with v31.52.
- Each WebP is local, and images are lazy loaded for Chromebook performance.
