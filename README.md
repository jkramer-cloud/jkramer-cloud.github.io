PlayForge v31.62 — Throttle Quest
PlayForge (formerly Naches Learning Hub) is an independently created collection of educational browser games, simulations, creative challenges and classroom tools. It is not affiliated with a school or school district.

Play online: https://jkramer-cloud.github.io/
What's new in v31.62
- Throttle Quest joins the catalog under Math and the Engineering quick filter.
- The student-facing v1.0 Launch Edition features 20 off-road courses, career progression, motorcycle collection, a garage, terrain-dependent performance, paid in-game upgrades, championships, and adjustable multiplication and ELA challenges.
- New promotional artwork: assets/card-art/throttle-quest.webp.
- Launch: https://jkramer-cloud.github.io/throttle-quest/
- Catalog now contains 88 entries: 43 available activities and 45 planned activities. All 87 entries and 42 artwork mappings from v31.61 are preserved; the new total is 43 artwork mappings.
Recent release history
Version	Changes
31.62	Added Throttle Quest and its custom illustrated card.
31.61	Added Fieldcraft: Survival & Self-Reliance Academy and its illustrated card.
31.60	Restored Motion Quest while retaining Color Clash Academy and PlayForge branding.


Fieldcraft, Motion Quest, Color Clash Academy, Class Compass, ClassTempo, Mathbound and all prior catalog entries remain included. The existing interface, seasonal visuals, filters, favorites and hidden discoveries are retained.
Update the existing GitHub Pages site
1. Extract the v31.62 update ZIP.
2. Open the existing jkramer-cloud/jkramer-cloud.github.io repository.
3. Replace the root index.html, activities.json, and README.md with the supplied files.
4. Add assets/card-art/throttle-quest.webp to the existing assets/card-art/ folder. Preserve all other artwork, including fieldcraft.webp; do not delete or replace the entire folder.
5. Commit the changes to the publishing branch (main). Keep the existing GitHub Pages configuration; for branch-based deployment, use main and / (root).
6. Once deployment finishes, open the Hub and hard-refresh (Ctrl+Shift+R on Windows/Chromebooks). Verify that Throttle Quest opens and existing cards still appear.
No new Hub repository is necessary. Throttle Quest lives in a separate repository; this update does not change the game itself. UPLOAD_INSTRUCTIONS.md is an optional local reference, not a required website file.
Repository structure
jkramer-cloud.github.io/
├── index.html           # Hub interface, scripts and embedded fallback catalog
├── activities.json      # Main activity catalog
├── README.md            # Project documentation
└── assets/
    └── card-art/
        ├── throttle-quest.webp
        └── ...          # Keep all previously uploaded artwork
The Hub uses static files and requires no build step. Keep activities.json and the embedded fallback catalog in index.html synchronized for future updates. Each separate activity repository maintains its own game files.
Browse and use
Use search, subject and quick-topic filters, grade filters, favorites and sorting to find games and tools. Available entries launch their corresponding apps; planned entries are not playable yet. Favorites and scene preferences are saved locally in the browser. Individual apps have their own save, backup and offline behavior; the Hub itself is not a guarantee of offline access to all games.
Validation and remaining checks
The v31.62 update was based on the verified live v31.61 source. The external and fallback catalogs agree, all previous entries and artwork mappings are retained, and JavaScript syntax and package integrity checks passed. The Throttle Quest artwork is a promotional illustration, not an in-game screenshot. Verify the hosted deployment and classroom Chromebook performance before broad student use.
