# PlayForge v31.67 — Bracket Forge

**Play online:** https://jkramer-cloud.github.io/

PlayForge is an independently created collection of educational games and classroom tools, not affiliated with a school or district.

## New in v31.67

- Bracket Forge v1.0 public beta: seven competition formats, roster studio, scoreboards, event director, reporting and backups. Listed under Classroom Tools and the PE & Sports filter.
- Launch: https://jkramer-cloud.github.io/bracket-forge/
- New illustrated card: `assets/card-art/bracket-forge.webp`. Fit preserves the entire artwork on grid and rail cards.
- Catalog: 93 entries (48 available, 45 planned). The release preserves the existing 92 entries, artwork mappings, and Living World references.
- Standalone browser-local data only; no live multi-device results or Google Drive sync. Use fictional or approved data for school testing.

## Install this update

1. Upload the Bracket Forge v1.0 app files to the separate `bracket-forge` repository and enable Pages on `main` / root. Test its URL first.
2. Extract this ZIP. In `jkramer-cloud/jkramer-cloud.github.io`, replace `index.html`, `activities.json`, and `README.md` in the repository root.
3. Add `assets/card-art/bracket-forge.webp` to the existing `assets/card-art/` folder. Keep all other artwork, game repositories and the existing `living-world/` folder intact.
4. Commit to `main`, retain existing Pages settings, and hard-refresh after deployment. Search Bracket Forge and check the Classroom Tools and PE & Sports filters.

Base verified byte-for-byte against the current GitHub repository before editing: homepage `a8bb405bf5846d2dacb9c6939af7fe4a99d17ca3`, external catalog `d78f279ea6951c2a6d2742a1002e0430ae3c623a`, README `5b646d0f4c4db111ac87f004842c930e9b8550d3`. If the site changes after this base revision, reconcile before replacing files. No direct commits were made.

---

## Previous v31.66 release (historical)

# PlayForge v31.66 — Market Masters

**Play online:** https://jkramer-cloud.github.io/

PlayForge is an independently created collection of educational games and classroom tools, not affiliated with a school or district.

## New in v31.66

- Market Masters: Financial Adventure joins Life Skills and Cooking & Money. Grades 5–12; 148 simulated investments, banking, five time modes, financial lessons and school-year competitions. All prices are fictional; no real money, external price service or external score reporting.
- Game: https://jkramer-cloud.github.io/market-masters/ (publish separate repository first).
- New illustrated card: `assets/card-art/market-masters.webp`.
- Catalog: 92 entries (47 available, 45 planned), retaining all 91 prior entries and all existing artwork mappings.
- Base: verified GitHub homepage blob `1bdb2ce067080a36523fe1d3cfbaaf50951cbae1` and catalog blob `0cf320b9a25a085c1d3efdbfb99cbdff0e15c725`. The existing Living World module references and configuration are preserved.

## Install this update

1. Publish the separate `market-masters` game first and test its GitHub Pages URL.
2. Extract this ZIP. In `jkramer-cloud/jkramer-cloud.github.io`, replace the root `index.html`, `activities.json`, and `README.md`. Add `assets/card-art/market-masters.webp` to the existing artwork folder. Do not delete or replace other artwork or the `living-world/` folder.
3. Commit to `main`, retain existing Pages settings, and hard-refresh after deployment. Check Market Masters in Life Skills and Cooking & Money, plus existing apps and the optional Living World feature.

The external catalog and embedded fallback are synchronized. All existing activity entries and poster mappings were preserved, and inline classic JavaScript syntax was checked. Hosted testing and classroom-device acceptance remain necessary. If the GitHub homepage or catalog changes after the base revision above, merge those changes before uploading this replacement. Nothing was committed by this build.

---

## Previous Living World release documentation (historical)

The notes below refer to the earlier Living World release and its own installation/review, not the Market Masters update.

# PlayForge Living World — v1.0 release candidate (v0.14 integration review)

**Status: integrated, unpublished; final device and artwork acceptance pending.**

## Files

- `index.html`: complete replacement homepage, built from the exact GitHub v31.65 source (blob `2c034bbebdc70d4a931355a2df92e476340f3544`).
- `living-world/`: optional controller, graphics engine and 17 WebP backgrounds/transition assets plus geography reference JSON files.
- This README is documentation; do not overwrite the existing repository README unless desired.

## Install only after review and acceptance

Keep a backup of the current homepage. Check that the repository has not changed since the source revision above; if it has, merge the newer homepage first rather than overwrite newer changes. Upload the provided `living-world` folder intact to the repository root and replace `index.html` last. Leave all other existing files, games, card artwork, `activities.json`, First Aid and TechGuide untouched. No developer preview or test files are included in the candidate. To roll back, restore the original index; the optional folder may be removed afterward.

Original mode is the default. The secret row is inside Customize Scene, during the first 15 seconds of the first page opening of a browser-local calendar day. Refresh does not restart that window. The question's answer is `Kramer` (case-insensitive). Unlock and graphics preference are stored locally; this is an Easter egg, not access control. Enhanced and Ultra use the existing seasonal/weather/motion preferences. A manually chosen season or holiday suppresses the new automatic alternate-world calendar. Return to Original at any time.

## Review results

- Verified current GitHub source byte-for-byte using Git blob SHA-1.
- Existing external catalog has 91 entries (46 available, 45 planned); embedded fallback also has 91. Neither catalog was edited.
- Ten automated test suites passed after integration review changes: secret door, world engine, landscape animation, weather, underground, foundry motion, alternate worlds, calendar, rare events, performance.
- Standalone browser fixture passed all eight alternate worlds, holiday override, overlay suppression, underground transition and Original restoration.
- Actual homepage offline Chromium harness compared original and merged source using identical seeded randomness and catalog fallback. Rendered activity IDs, link targets and existing select IDs matched. Unlock, Ultra activation, two landscape layers, cavern transition, Original cleanup and stored unlock/preference passed; no page errors in that run. The harness substituted in-memory assets, simulated browser storage and offline network responses; it does not verify GitHub Pages hosting or live weather/network services.
- Production module strips manual date/world/rare selectors and preview asset hooks. JS syntax checks passed. Legacy festival renderer pauses when suppressed; duplicate automatic holidays/lightning are avoided; Original retains legacy behavior.

## Remaining acceptance items

- Test on an actual school Chromebook, including normal browsing, school network filtering, battery/heat, motion disabled and low-memory behavior. No physical-device performance measurement has been made.
- Verify on a real hosted test copy with real asset requests, weather, all links and persisted unlock across reloads. Browser administration policy prevented direct navigation in the review environment; loaded card-art placeholders and offline fallback were used.
- Several seasonal backgrounds are derived color treatments, not all independent season-authentic landscapes. Mars and Corsair are provisional lower-detail illustrations. The cavern transition uses processed art. Legacy animal overlays are retained for the valley, but alternate realities intentionally use world-specific wildlife. These are visual polish items, not claimed fully resolved.
- If repository changes after v31.65, reconcile before upload. No changes were committed or published by this review.
