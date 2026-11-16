# PlayForge v31.60 — Motion Quest restored

This release merges the two separate v31.58 branches. It preserves the independent **PlayForge** branding and Color Clash Academy, and restores the **Motion Quest: Move with the Crew** card that was overwritten by the later branch.

## What is included

- **86 catalog entries**: every one of the previous 85 PlayForge v31.59 activities, plus Motion Quest.
- Motion Quest links to `https://jkramer-cloud.github.io/motion-quest/` and appears under PE & Wellness.
- The **corrected stretching-crew illustration** is included as `assets/card-art/motion-quest.webp`.
- Color Clash Academy remains playable, with its detailed original illustrated poster intact.
- `activities.json` and the embedded backup catalog in `index.html` contain the same 86 entries.
- The existing Hub game links, filters, seasonal visuals, user preferences, other posters, and independent branding are retained.

## Install on GitHub

1. Unzip this file.
2. In the **existing PlayForge / formerly Naches Learning Hub repository**, upload the included `index.html`, `activities.json`, `README.md`, and `assets` folder, replacing files of the same name. **Do not upload to the Motion Quest or Color Clash Academy repositories.**
3. Preserve the `assets/card-art/` folder structure.
4. Commit changes, allow GitHub Pages to deploy, then refresh. A hard reload may help with cached artwork.

There is **no need to create a new repository** or change any game repository files.

## Why this update exists

Two unrelated changes were each named v31.58. One added Motion Quest; the other added Color Clash Academy. The later PlayForge v31.59 was derived from the Color Clash branch and therefore did not include Motion Quest. This merged v31.60 contains both.
