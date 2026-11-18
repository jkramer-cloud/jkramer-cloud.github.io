# PlayForge v31.63 — Sudoku Quest

PlayForge (formerly Naches Learning Hub) is an independently created collection of educational browser games, simulations, creative challenges and classroom tools. It is not affiliated with a school or school district.

**Play online:** https://jkramer-cloud.github.io/

## What's new in v31.63

- **Sudoku Quest** joins the Strategy & Logic category and Puzzles & Codes quick filter.
- Grades 5–12, daily puzzles, 25 achievements, read-only calendar, reasoning hints, and one shared completion limit across all grades.
- Artwork: `assets/card-art/sudoku-quest.webp`.
- Launch: https://jkramer-cloud.github.io/sudoku-quest/
- Catalog contains **89 entries: 44 available activities and 45 planned activities**. All 88 previous entries and 43 artwork mappings are preserved; 44 artwork mappings total.

## Recent release history

| Version | Changes |
| --- | --- |
| 31.63 | Added Sudoku Quest and its custom illustrated card. |
| 31.62 | Added Throttle Quest and its custom illustrated card. |
| 31.61 | Added Fieldcraft: Survival & Self-Reliance Academy and its illustrated card. |
| 31.60 | Restored Motion Quest while retaining Color Clash Academy and PlayForge branding. |

Throttle Quest, Fieldcraft, Motion Quest, Color Clash Academy, Class Compass, ClassTempo, Mathbound and all prior catalog entries remain included. The existing interface, seasonal visuals, filters, favorites and hidden discoveries are retained.

## Update the existing GitHub Pages site

1. Extract the v31.63 update ZIP.
2. Open the existing `jkramer-cloud/jkramer-cloud.github.io` repository.
3. Replace the root `index.html`, `activities.json`, and `README.md` with the supplied files.
4. Add `assets/card-art/sudoku-quest.webp` to the existing `assets/card-art/` folder. Preserve all other artwork, including `throttle-quest.webp` and `fieldcraft.webp`; do not delete or replace the entire folder.
5. Commit the changes to the publishing branch (`main`). Keep the existing GitHub Pages configuration; for branch-based deployment, use `main` and `/ (root)`.
6. Once deployment finishes, open the Hub and hard-refresh (Ctrl+Shift+R on Windows/Chromebooks). Verify that Sudoku Quest opens and existing cards still appear.

No new Hub repository is necessary. Sudoku Quest lives in a separate repository; this update does not change the game itself. `UPLOAD_INSTRUCTIONS.md` is an optional local reference, not a required website file.

## Repository structure

```text
jkramer-cloud.github.io/
├── index.html           # Hub interface, scripts and embedded fallback catalog
├── activities.json      # Main activity catalog
├── README.md            # Project documentation
└── assets/
    └── card-art/
        ├── sudoku-quest.webp
        └── ...          # Keep all previously uploaded artwork
```

The Hub uses static files and requires no build step. Keep `activities.json` and the embedded fallback catalog in `index.html` synchronized for future updates. Each separate activity repository maintains its own game files.

## Browse and use

Use search, subject and quick-topic filters, grade filters, favorites and sorting to find games and tools. Available entries launch their corresponding apps; planned entries are not playable yet. Favorites and scene preferences are saved locally in the browser. Individual apps have their own save, backup and offline behavior; the Hub itself is not a guarantee of offline access to all games.

## Validation and remaining checks

The v31.63 update uses the v31.62 index and activity catalog whose Git blob hashes match the existing GitHub files. The external and embedded fallback catalogs agree, and all previous entries and artwork paths are retained. Sudoku Quest artwork is an original promotional illustration of a valid Sudoku grid, not a gameplay screenshot. Create and publish the separate game repository before adding this Hub update. Verify the hosted deployment and actual Chromebook behavior before broad student use. Valley Word Quest is unchanged.
