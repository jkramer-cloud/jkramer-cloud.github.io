# Naches Learning Hub

**Games, interactive lessons, and creative learning tools for students.**

The Naches Learning Hub brings educational games, skill-building activities, and classroom tools into one easy-to-browse website. Students can explore math, English language arts, reading, science, social studies, technology, and other topics from a single place.

**Current Hub release: v31.18 — Natural Sky Layering & Game Day Celebrations**  
**Updated:** October 29, 2026  
**Website:** [jkramer-cloud.github.io](https://jkramer-cloud.github.io/)

> The Learning Hub is a *launcher and discovery site*. Most activities are hosted in their own GitHub Pages repositories and open through links in the Hub. Updating the Hub does not automatically update those games.

## What's new in v31.18 — Sun and Moon behind mountains and clouds (October 29, 2026)

- The **Sun and Moon now sit visually behind both Naches mountain ridges and the drifting cloud layer**, rather than drawing on top of the scenery. Their full disks and soft outer glows are clipped naturally wherever a mountain crosses the sky.
- Clouds partly obscure the Sun and Moon, instead of allowing celestial objects to appear in front of them. The occlusion masks follow the existing cloud animations, and still work when scenery animation is switched off.
- Preserves the **location-based Sun path, Moon phases, day/night visibility, moon glow, horizon-orange color, and calendar blue-moon identification** from v31.16.
- Preserves the v31.17 full-background gaming celebrations, corrected MAR10 animation, compact controls, and all 36 activity entries.
- The Hub remains a simple static GitHub Pages site with no new permissions, assets, dependencies, or astronomical network requests.

**Technical detail:** The sky uses two independent SVG layers (full-page background and welcome banner) with local masks matching the existing mountain paths and cloud shapes. The brighter celestial layer remains separate from nighttime dimming, so moonlight is still visible while landscape features stay in front.

## Previous release: v31.17 — Full-Background Game Days

The original v31.16 gaming scenes are now visible in the valley backdrop as well as the compact welcome banner. The scenes have subtle animated details along the left and right edges, without drawing over game cards. The MAR10 scene error is fixed, so foes, adventurers, portals, and coins can continue animating.

## Previously added in v31.16 — Living Sky & Game Day Celebrations (October 29, 2026)

This is a **drop-in update to the Hub only**, based on v31.15. All 36 activity entries (26 available and 10 planned), favorite settings, compact layout, search, weather service, and existing public and school holiday scenes remain intact.

### A dynamic, location-aware Sun and Moon

- The background now projects the **Sun and Moon for the approximate Naches Valley location** (46.73°N, 120.70°W), using the viewer's device clock and the Naches time zone. No individual location permission, API key, astronomical service, or new library is required.
- The **Sun rises, climbs, and sets**, appearing substantially higher in summer than winter. The day/night background uses calculated solar altitude when live weather sunrise/sunset data is unavailable.
- The **Moon appears during day or night only when it is approximately above the local horizon**. Its visible shape changes from new through waxing crescent, quarter, gibbous, full, waning gibbous, quarter, and crescent. A new Moon is essentially invisible.
- A **soft lunar halo** becomes more prominent at night. A **warm orange Moon** is drawn when low on the horizon (an artistic approximation of atmospheric color). A **calendar blue moon** — the second astronomical full Moon in a local calendar month — receives a cooler blue halo and a text label, **not** an incorrectly blue Moon surface.
- **Customize Scene** includes a compact moon-phase/visibility note. Sky positions refresh automatically approximately every 5 minutes while the Hub is open, even if the weather service is offline. Positions and rise/set visibility are approximations; exact local terrain, smoke and clouds can obscure real objects.
- Manually choosing Day/Night previews **changes lighting**, not the calculated sky date. Thus a moon below the horizon will remain hidden in a nighttime preview.

### Six new game and pop-culture celebration days

Each day starts **automatically on its exact Naches-local calendar date**. Try it any time in **Customize Scene → Special-day decoration**; manual selection does not change the actual clock or astronomical sky.

| Date | Theme | Animated background details |
| --- | --- | --- |
| **February 27** | Pokémon Day | Original fantasy creatures bouncing around with collectible orbs |
| **March 10** | MAR10 Day | Glowing green portals, running/jumping platform adventurers, wandering mushroom-like foes and disappearing coins |
| **May 4** | Star Wars Day | Fast-moving starfighters, trails and stars; tiny dueling figures with glowing energy blades alongside a droid |
| **May 22** | PAC-MAN Birthday | A chomping arcade circle, dotted maze path and playful ghosts |
| **June 6** | World Tetris Day | Falling colorful four-square puzzle pieces |
| **June 23** | Sonic's Birthday | A blue speedster silhouette, golden rings and racing motion trails |

The artwork is drawn locally with original Canvas2D shapes; **no licensed game art, character sprites, recordings or fonts are bundled**. Themes are unofficial fan homages, not affiliations or endorsements. All six scenes support static rendering through **Animate scenery off** or **Reduced Motion**, and automatically disappear when the corresponding date ends. These dates join, rather than replace, the existing holiday calendar.

### Deployment and testing

1. Download and extract `Naches_Learning_Hub_v31_18_Natural_Sky_Layering_GitHub.zip`.
2. Upload **`index.html` and `activities.json`** to the root of the main `jkramer-cloud.github.io` GitHub Pages repository, replacing the existing copies. (`activities.json` has not changed, but is included for convenience.)
3. Optionally upload `README.md`, `CHANGELOG.md` and `UPLOAD_INSTRUCTIONS.md`; commit. No individual game repositories need updating.
4. In the browser, hard-refresh with **Ctrl + Shift + R**, select **Customize Scene**, and preview MAR10 Day, Star Wars Day, and any other theme. The Sun/Moon naturally move behind the cloud and mountain silhouettes whenever they cross those shapes. Try **Night sky (moon if visible)** and read the Moon-phase note.

**Known limitations:** The astronomy approximates orbital positions and uses a flat horizon; it does not predict a lunar eclipse or guarantee visible colors, cloud-free skies or exact rise/set moments. A “blue moon” is a calendar name, not a promise of a naturally blue Moon. Weather may be blocked by a school firewall without affecting the astronomy or holiday artwork. The live website is not changed until you publish the new files.

### Calendar and franchise references

- [Pokémon Day](https://press.pokemon.com/en/POKEMON-DAY-CELEBRATES-20-YEARS-OF-ICONIC-BRAND-13675) · [MAR10 Day](https://www.nintendo.com/us/whatsnew/nintendo-powers-up-mar10-day/) · [Star Wars Day](https://www.starwars.com/star-wars-day)
- [PAC-MAN history](https://www.pacman.com/en/history/) · [World Tetris Day](https://play.tetris.com/news/the-tetris-company-celebrates-world-tetris-day) · [Sonic birthday](https://asia.sega.com/sonic-birthday2024/en/)

---

## Previous release: What's new in v31.15 — Compact Dashboard Edition (October 28, 2026)

The main Hub is now easier to browse on school Chromebooks, without removing the weather effects, holiday decorations, or game artwork.

- **Smaller welcome strip:** Replaces the oversized “Pick your next adventure” banner with a short, seasonal welcome ribbon. The *Surprise me* button remains.
- **Games first:** Search and subject choices appear immediately below the ribbon; the separate closed Scene Studio status strip is removed to save space. **Customize Scene** in the header still opens every weather, seasonal, and holiday control.
- **Compact/Gallery switch:** Compact is the default and shows up to four cards per row on wide screens. Gallery restores larger game-card artwork. The preference is saved in the browser.
- **Quick favorites:** A Favorites-only button appears next to search; individual game stars and the existing favorite sorting option still work.
- **Expandable filters:** Grade, activity type, and sort settings now live in **More filters**, with a Clear filters button.
- **Scrollable subjects:** The subject row stays on one line, with left/right scroll buttons, rather than pushing activities down by multiple rows.
- **Discover rail:** *New to the Hub* and *Recently opened* share one compact rail controlled by tabs. Recently opened is disabled until an activity has been launched from that browser.
- **Catalog preserved:** 36 entries (26 available, 10 planned), all published activity links, the embedded fallback catalog, local saved favorites, the weather system, and animated holiday scenes are retained.

### Change the size of game cards

Above the main game grid, choose **Compact** to see more options or **Gallery** to show larger illustrations. On a phone, compact cards arrange the artwork beside the title for easier scrolling.

### Customize the environment

Click **Customize Scene** in the header. The Scene Studio now stays hidden when closed to reclaim vertical space, but all original weather, seasons, special-day animations, and settings remain. Preferences are saved on the device.

### Install

Replace `index.html` and `activities.json` in your main `jkramer-cloud.github.io` repository with the files from the v31.15 ZIP. Optionally replace `README.md`, `CHANGELOG.md`, and the installation instructions. You **do not** need to re-upload any games.

## Previous release: v31.14 — October 28, 2026

- **Stackline: Dimensional Tic Tac Toe** added to **Strategy** with a new illustrated activity card, grade filters, and a GitHub Pages launch link.
- Students can play Classic, four-layer Stacked, or 25-board Hyper modes, against friends or a locally running computer opponent.
- The game also contains a separate **Spatial Reasoning Lab** with geometric puzzles, hints, and saved practice totals.
- **Catalog:** 36 activities total — 26 available and 10 planned. All existing 35 entries and weather/holiday customizations are preserved.
- **Install the game separately:** This Hub package adds the card, but does not contain the Stackline game itself. Publish Stackline v2.0 first.

## Previous release: v31.13 — Full-Page Scene Fix

- **Full-page decorations:** Special-day scenes now render in the full-window background **and** inside the banner preview. Previously the more elaborate animations appeared only in the banner.
- **No leftover Halloween art:** Changing weather, season, or time of day now automatically sets the special-day decoration to **None**, clearing pumpkins, ghosts, and other holiday props. You can explicitly choose a holiday again afterward if you want to combine it with a chosen weather scene.
- **Instant holiday switching:** Switching from Halloween to New Year, winter, or any other holiday clears the previous artwork immediately and displays the newly selected scene across the background.
- **Background theme:** Several major holidays now also adjust the color treatment of the valley scenery, not just the banner.
- **Performance and accessibility:** Full-page effects sit behind the actual activity controls. The full-page and banner artwork run at approximately 30 render frames per second; turning animation off or using reduced-motion settings stops moving effects.
- **Existing content preserved:** All prior 35 activity entries, custom cards, live weather fallback, saved preferences, and games remain as before.

**To try the fix:** Open **Customize Scene → Special-day decoration**, select Halloween or New Year, then click **Done** to see the full-page effects. Switch **Weather scene** to Rainy Day or Snowy Day to clear the holiday decorations automatically. To keep a selected holiday while changing other details, choose the weather first and the holiday last.

**Important:** During late October the *Automatic* holiday setting can legitimately select Halloween again because it follows the calendar. Set **Special-day decoration → None** if you want Halloween decorations turned off regardless of the date.

## Previous release: v31.12

### Festive Valley and Social Studies changes

### Expanded holiday scenes

The **Customize Scene → Special-day decorations** selector now drives animated scenes in the Hub banner:

- **New Year:** multicolored rockets, sparkling fireworks, festival pennants (Dec 31–Jan 1 automatically).
- **Independence Day:** red, white and blue fireworks, flags/bunting, stars (July 3–4).
- **Halloween:** friendly flying ghosts, bats, marching skeletons, glowing pumpkins and moonlight (Oct 25–31).
- **Winter celebrations:** twinkling string lights, snowflakes and a snowman.
- **Valentine's Day:** drifting hearts in the orchard.
- **Earth Day and spring:** butterflies and leaves; Earth Day globe.
- **Back to school:** pencils, pennants and stars.
- **Thanksgiving:** warm-colored leaves, pumpkins and turkeys.
- **Memorial Day and Veterans Day:** understated, respectful remembrance motifs.
- **St. Patrick's Day and Juneteenth:** themed colors and decorations.

The effects are **purely decorative**, appear behind readable Hub content, and do not need any image assets or subscriptions. Set *Motion Off* or use your operating system's *Reduce Motion* setting to stop animation. The thunderstorm mode now draws **occasional localized lightning bolts** rather than full-screen flashes.

### Knowledge Showdown subject refresh

The Knowledge Showdown card now describes the game's expanded **670-question bank**, including dedicated Social Studies choices for grades 5–8. Install **Knowledge Showdown v1.3 separately** in its own GitHub repository; changing the Hub card does not update that game.

## Previous release: v31.11

### Live Naches weather and animated scenery

The Hub can now adjust its illustrated Naches Valley background to reflect **current conditions in Naches, Washington**:

- Sunshine, clouds, rain, snow, fog, and thunderstorms
- Local day/night lighting, with sunrise and sunset information when available
- Seasonal valley scenery, orchard colors, and decorative wildlife
- Adjustable animation effects, including atmospheric particles and clouds
- A weather status display in the header

Weather information is retrieved from [Open-Meteo](https://open-meteo.com/) using a fixed location near Naches; **students are not asked to share their location**. The Hub checks for updated weather approximately every 45 minutes while open. If weather information is unavailable, it falls back to date-based seasonal scenery. The scenery is decorative and **not intended as a weather safety or alert service**.

### Customize Scene

Click **Customize Scene** in the Hub header to open the Scene Studio. Available options include:

| Setting | Options |
| --- | --- |
| Weather | Live Naches weather, sunny, partly cloudy, overcast, rain, snow, fog, or thunderstorms |
| Season | Automatic, winter, early spring, spring blossoms, summer, harvest, autumn, or late autumn |
| Time | Automatic Naches time, daylight, or moonlit night |
| Effects | Subtle, normal, or lively intensity; animation on/off |
| Wildlife | Automatic/occasional visitor, none, or a chosen animal |
| Decorations | Automatic calendar selection, none, or seasonal/holiday decorations |

You can also choose **Surprise Me** to randomize the appearance, **Back to Live Weather** to restore automatic conditions, or **Refresh Weather** to request an update. Scene preferences are saved locally in that browser on that device.

### Redesigned activity cards

- More polished cards that preserve each game's existing custom illustration
- Stronger subject-specific color accents, clearer descriptions, and improved launch buttons
- New **Favorite** stars for playable activities
- **My favorites first** sorting, alongside newest, recently opened, name, and oldest sorting
- Improved layouts for desktop and smaller Chromebook/phone screens
- Updated listings for recent **Crossy Words** and **Bridge Builder Challenge** releases

Favorites and recently opened history are stored in the browser; they are not synchronized across devices.

## Browse the Hub

Use the **search box**, subject filters, grade filters, and sorting controls to find activities. The Hub currently includes **35 catalog entries: 25 playable activities and 10 planned activities**.

Some examples of the available learning experiences:

| Area | Featured activities |
| --- | --- |
| English language arts | ELA Writing Workshop, Crossy Words, Mystery Detectives |
| Reading | A.S.C.E.N.D.A.N.T. Reader |
| Math | Multiplication Battleship, Math Maze Adventures, Mathjong: Tile Quest |
| Science | Science Investigation Lab, Periodic Table Battleship, CSI: Naches |
| Geography and life skills | Valley Geography Quest, Budget Bites, Valley Life Journey |
| Design and technology | KeyQuest: Typing Evolution, Space Type Defender |
| Strategy and engineering | Immortal Snail Chess 3D, Bridge Builder Challenge, Playbook Tactics |

Some activities are in development and are labeled accordingly. **The full, current catalog is maintained in `activities.json`.**

## Repository files

```text
jkramer-cloud.github.io/
├── index.html                # Learning Hub interface, styling, scripts, and fallback catalog
├── activities.json           # Main list of activities and their links
└── README.md                 # This documentation
```

The v31.11 update ZIP may also include `CHANGELOG.md` and `UPLOAD_INSTRUCTIONS.md`. The website itself does not require a build system, package manager, API key, or an AI subscription.

## Publish or update on GitHub Pages

1. Open the existing GitHub repository that publishes **https://jkramer-cloud.github.io/**.
2. Download and extract the latest Learning Hub update ZIP.
3. Replace the repository-root `index.html` and `activities.json` with the files in the update.
4. Replace the repository-root `README.md` with this README.
5. Commit the files to the publishing branch (typically `main`).
6. Check **Settings → Pages** if the website does not publish. For branch deployment, use the branch and `/ (root)` folder that contain `index.html`.
7. After deployment, hard-refresh the Hub (`Ctrl + Shift + R` on Windows/Chromebooks) if an older version still appears.

**Important:** Do not replace files inside individual game repositories with the Hub's `index.html`; those games are separate projects.

## Maintaining the activity catalog

Activity names, grade labels, categories, descriptions, external game URLs, and availability are stored in `activities.json` under the `activities` array. A typical record looks like this:

```json
{
  "id": "example-activity",
  "title": "Example Activity",
  "category": "ela",
  "categoryLabel": "ELA · Writing",
  "description": "A short description of what students do.",
  "skills": ["Writing", "Reasoning"],
  "gradeLabel": "Grades 5–8",
  "gradeGroups": ["3-5", "6-8"],
  "mode": "Solo",
  "linkText": "Open activity",
  "url": "https://example.github.io/example-activity/",
  "icon": "book",
  "featured": false,
  "status": "available",
  "type": "game",
  "releaseOrder": 36
}
```

This is an **illustrative example**, not an existing activity. Use supported category, grade-group, and icon values from the current catalog/code. Use `"status": "planned"` for an activity that is not ready to launch.

The Hub also contains an **embedded backup copy of the activity catalog** inside `index.html`. Keep this copy synchronized with `activities.json` when adding, removing, or editing activities; otherwise a failed JSON request could show out-of-date listings. Check new URLs before publishing.

## Weather and privacy notes

- **Weather source:** [Open-Meteo Forecast API](https://open-meteo.com/). Service use is subject to its [terms](https://open-meteo.com/en/terms), attribution, and rate limits. The free noncommercial offering is not a guaranteed service-level agreement.
- **Location:** Fixed approximate Naches coordinates are used for public weather; the Hub does not request browser geolocation or individual student addresses.
- **Browser storage:** Scene settings, favorite activity IDs, recent launches, and a temporary weather cache are saved locally. They may disappear if students clear browsing data or use another browser/device.
- **External links:** Individual games are separate sites and may have their own saving behavior. Review each linked activity before classroom use.
- **Accessibility:** Animated effects can be disabled, and the Hub respects reduced-motion settings where supported.
- **School networks:** If the weather request is blocked by a firewall or content filter, the Hub still loads its activities and uses seasonal scenery.

## Troubleshooting

| Issue | What to try |
| --- | --- |
| The Hub still shows the old design | Refresh with `Ctrl + Shift + R`; verify the new `index.html` is in the published root. |
| A new activity is missing | Make sure `activities.json` uploaded beside `index.html`; verify JSON syntax, activity status, filters, and the embedded fallback catalog. |
| Weather says unavailable | Check network access to `api.open-meteo.com`; use manual Scene Studio options or the seasonal fallback. |
| Settings or favorites don't follow a student to another device | They are stored only in the current browser, not in a school account. |
| A game card opens the wrong page | Inspect the activity `url` in `activities.json` and confirm its separate GitHub Pages site is published. |
| Animation feels distracting or slow | In Scene Studio, turn off animation or choose Subtle. |

## Recent release history

| Hub version | Highlight |
| --- | --- |
| **v31.12** | Holiday scene animations, lightning bolts, and expanded Knowledge Showdown listing |
| **v31.12** | Holiday scene animations, lightning bolts, and expanded Knowledge Showdown listing |
| **v31.11** | Live Naches weather, Scene Studio, polished activity cards, favorites and sorting |
| **v31.10** | Crossy Words activity-card refresh |
| **v31.9** | Added Crossy Words to the Hub |
| **v31.8** | Added ELA Writing Workshop |
| **v31.7** | Added Immortal Snail Chess 3D |

See `CHANGELOG.md` in the latest update packet for the release-specific summary.

---

**Naches Learning Hub** — an evolving collection of classroom learning games and resources.

*Weather data: [Open-Meteo](https://open-meteo.com/). The weather display is informational and decorative; consult official forecasts and alerts for safety decisions.*

### v31.17 holiday scenery repair

Gaming holiday scenes now draw along both exposed sides of the full-page valley as well as across the sky and in the small hero preview. These background illustrations stay below interactive game cards and controls. MAR10 background characters and enemies are fixed.
