# PlayForge v31.64 — Emergency Ready review preview

PlayForge (formerly Naches Learning Hub) is an independently created collection of educational browser games, simulations, creative challenges and classroom tools. It is not affiliated with a school or school district.

**Play online:** https://jkramer-cloud.github.io/

## What's new in v31.64

- Added Emergency Ready as a staff-review resource with custom WebP artwork, a header link, and a floating First aid shortcut.
- The shortcut and card open `first-aid.html`, which prioritizes 911 and established first-aid guidance. RC1 remains an adult-review preview behind a disclosure, not an approved emergency app. The review link is not access-controlled.
- Catalog: 90 entries (45 accessible links, including one review resource; 45 planned); all prior 89 entries and 44 artwork mappings retained. 45 artwork mappings total.
- Expected separate review app: https://jkramer-cloud.github.io/emergency-ready/ (requires separate repository and Pages setup).

## Previous update: v31.63

- **Sudoku Quest** joins the Strategy & Logic category and Puzzles & Codes quick filter.
- Grades 5–12, daily puzzles, 25 achievements, read-only calendar, reasoning hints, and one shared completion limit across all grades.
- Artwork: `assets/card-art/sudoku-quest.webp`.
- Launch: https://jkramer-cloud.github.io/sudoku-quest/
- Catalog contains **89 entries: 44 available activities and 45 planned activities**. All 88 previous entries and 43 artwork mappings are preserved; 44 artwork mappings total.

## Recent release history

| Version | Changes |
| --- | --- |
| 31.64 | Emergency Ready review card and persistent first-aid resource shortcut. |
| 31.63 | Added Sudoku Quest and its custom illustrated card. |
| 31.62 | Added Throttle Quest and its custom illustrated card. |
| 31.61 | Added Fieldcraft: Survival & Self-Reliance Academy and its illustrated card. |
| 31.60 | Restored Motion Quest while retaining Color Clash Academy and PlayForge branding. |

Throttle Quest, Fieldcraft, Motion Quest, Color Clash Academy, Class Compass, ClassTempo, Mathbound and all prior catalog entries remain included. The existing interface, seasonal visuals, filters, favorites and hidden discoveries are retained.

## Update the existing GitHub Pages site

1. Extract the ZIP. In `jkramer-cloud/jkramer-cloud.github.io`, replace `index.html`, `activities.json`, and `README.md`.
2. Add `first-aid.html` to the root and `assets/card-art/emergency-ready.webp` to the existing artwork folder. Do not remove any existing files or artwork.
3. Commit all five files to `main`. Keep existing GitHub Pages settings. Hard-refresh after deployment.
4. Confirm the floating shortcut and header link open the first-aid resource page and the review link opens the separate RC1 app only after its repository is published for controlled review. If you keep RC1 private, the review link may be unavailable to other visitors; that is expected.

Do not promote RC1 to students for emergency reliance before qualified medical review and device acceptance. The hub shortcut is a resource link, not a medical service; separate game repositories do not inherit the floating control. No changes to other repositories are included.

## Browse and use

Use search, subject and quick-topic filters, grade filters, favorites and sorting to find games and tools. Available entries launch their corresponding apps; planned entries are not playable yet. Favorites and scene preferences are saved locally in the browser. Individual apps have their own save, backup and offline behavior; the Hub itself is not a guarantee of offline access to all games.

## Validation and remaining checks

The original v31.63 index and activity catalog were verified against their current GitHub blob hashes (`ee549fbdf7ca5811660f7af11fbc5ee71ce4d082`, `d71f4feeac62fb68401ace1c673fbcc63c7e12b1`). All 89 entries and 44 existing artwork paths are unchanged. The synchronized fallback catalog contains 90 entries; all scripts passed JavaScript syntax checks. Browser checks with injected HTML at 320, 390 and 1366 pixels verified the review card, artwork decoding, persistent shortcut, responsive resource page, 911 telephone link, and collapsed RC1 disclosure. Existing external artwork and weather requests were not loaded for local testing. Verify the deployed GitHub Pages site and the separate RC1 URL after uploading. No clinical approval or actual emergency-system testing is implied.
