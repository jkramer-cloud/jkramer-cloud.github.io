# Naches Learning Hub

**Games, interactive lessons, and creative learning tools for students.**

The Naches Learning Hub brings educational games, skill-building activities, and classroom tools into one easy-to-browse website. Students can explore math, English language arts, reading, science, social studies, technology, and other topics from a single place.

**Current Hub release: v31.12 — Festive Valley & Social Studies Catalog Refresh**  
**Updated:** October 28, 2026  
**Website:** [jkramer-cloud.github.io](https://jkramer-cloud.github.io/)

> The Learning Hub is a *launcher and discovery site*. Most activities are hosted in their own GitHub Pages repositories and open through links in the Hub. Updating the Hub does not automatically update those games.

## What's new in v31.12

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
