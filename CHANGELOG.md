## v31.27 — October 30, 2026
- Added sunrise/golden-hour/sunset color blending based on Naches solar position; updates every minute, with daylight and seasonal behavior preserved.
- Added background trebuchet with rotating pumpkin varieties (Oct 15–Nov 5).
- Added jet flybys trailing patriotic smoke (Jul 1–6), Santa sleigh flybys (Dec 10–26), and waving American flags on patriotic dates.
- Added St. Patrick’s Day rainbow with pot of gold; non-holiday rain-to-sun rainbows have **no** gold pot and expire after 5–10 minutes. Rain-to-cloudy does not trigger.
- Retained 38 activities and v31.26 readability improvements.

## v31.26 — October 30, 2026
- Moved favorite star, featured/status badge, and item number out of game-card artwork into a dedicated control header.
- Improved compact thumbnail height, headings, labels and descriptions.
- Ensured mobile compact card layout retains controls in its own header.
- Increased astronomy refresh cadence from 5 minutes to 1 minute (moon and sun positions).
- Kept the existing approximate Naches astronomical model and all 38 game links.

## v31.25 — October 30, 2026
- Added Valley Word Quest: Daily Dash for grades 3–12 under ELA.
- Added custom illustrated daily word puzzle with calendar and streak motifs for its Hub card.
- Synchronized external activities catalog and embedded fallback (38 activities).
- Preserved previous 37 entries, URLs, and Hub features.

## Hub v31.24 — 2026-10-29: Valley Geography Quest v4

- Updated Valley Geography Quest activity catalog and embedded fallback description.
- Added regional quizzes, East Coast zoom, stopwatch races, and personal run history to the Hub card details.
- Promoted geography to New to the Hub (existing 37 activities all retained).
- Updated from v31.23, including all Math Rush v1.1, Budget Bites v3.0, holiday and weather changes.
- Publish the geography game repository update first; the live URL stays the same.

## Hub v31.23 — 2026-10-29: Math Rush v1.1 Gameplay & Style Studio

- Updated Math Rush card, skills and mode to describe fixed collisions, five themed zones and cosmetic Style Studio.
- Uses the same live Math Rush repository URL, so **publish the game repository first**.
- Preserves v31.22 Budget Bites v3 Interactive Kitchen, Math Rush placement, all 37 activities, weather/daylight, seasonal scenes and previous content.

# Naches Learning Hub — Changelog

## v31.22 — Budget Bites v3 (October 29, 2026)

- Refreshed the Budget Bites card to highlight the new Recipe Box, 12-step interactive cooking simulation, and reset controls.
- Promoted Budget Bites to newest updated activity while retaining all existing catalog entries.
- Preserved Math Rush, 31.20 weather/daylight changes, other games, and current theme settings.


## v31.21 — Math Rush: Endless Run (October 29, 2026)

- Added an original student-inspired endless runner to the Math category, with three lanes, increasing speed, train/crate/barrier obstacles, math checkpoints, coins and cosmetic characters.
- New game card and original SVG artwork, listed first in New to the Hub as **New game**; Chess Academy remains second and **Updated**.
- Synced the external and embedded fallback catalogs: **37 activities total, 27 available and 10 planned**. Newest launch order is 27.
- Preserved the existing 36 activities, saved favorites, recent activity history, live weather/daylight scene fixes, astronomical sky, holiday decorations, and other Hub features.
- The new game lives in its own repository and must be published before this Hub update.


## v31.20 — Daylight & Weather Scene Synchronization (October 29, 2026)

- **Fixed the October 25–31 Halloween dimming issue:** the Halloween dark-landscape filter now activates at night, not in sunny daytime. Decorations remain visible during the day. The New Year and winter nighttime dark filters follow the same rule.
- Greatly reduced the permanent dark-blue overlay that previously made daytime landscapes appear overcast, including when the live chip reported Sunny. Cloudy, rainy, foggy and stormy conditions still receive progressively darker atmospheres.
- Brightened sunny and partly cloudy daytime palettes while retaining card/text contrast and night/Sun/Moon layering.
- Connected the drifting cloud and celestial cloud-mask opacity to the live cloud-cover percentage in automatic weather mode; manual weather previews use representative amounts.
- Reconciled Open-Meteo cloud-cover observations with WMO clear/partly/overcast codes, so a contradictory low-cloud weather code does not always force a Sunny scene. Rain and other significant-weather codes continue to take priority.
- The live weather chip now marks **Scene preview** when a manual sky or time override is active; Scene Studio describes how to restore synchronization.
- Kept all 36 activities, Chess Academy card, holiday animations and weather/astronomy features unchanged otherwise.
- Static verification: JavaScript and CSS parse correctly; nine weather classification cases and catalog consistency tests passed. Full browser screenshot testing was blocked by the execution environment.


## v31.19 — Chess Academy Activity Card Refresh (October 29, 2026)

- Renamed the Immortal Snail Chess 3D card to **Chess Academy** while retaining its activity ID, original launch order and GitHub Pages URL.
- Updated card description, skills and grade display to introduce Classic Chess, Immortal Snail, Hungry Snails, and Tri-Level Chess with optional guided lessons.
- Replaced the snail-only artwork with original embedded SVG art depicting chess, snails and floating boards; no new assets or network dependencies.
- Highlighted Chess Academy in the discovery rail as **Updated** and marked it **Featured** without changing other release order numbers.
- Synchronized the main `activities.json` and fallback catalog within `index.html`. Retained 36 activities (26 available, 10 planned), the v31.18 astronomy, holiday scenery and existing settings.
- Render-tested the updated card in compact desktop/mobile layouts and checked activity link, filters and fallback rendering without script errors.

## v31.18 — Natural Sun/Moon Landscape Layering (October 29, 2026)

- Fixed celestial depth: Sun, Moon, glow, and sunrays are now correctly hidden behind mountain silhouettes and partially occluded by drifting clouds, rather than painted over the landscape.
- Added matching SVG masks to the full-page Naches backdrop and welcome banner; retained bright night Moon glow through the existing separate celestial rendering layer.
- Kept all 36 activity cards, holiday effects, Scene Studio controls, astronomy calculations, weather integration, animation preferences, and embedded fallback catalog unchanged.
- Tested mask occlusion by comparing pixels in open sky vs. mountains and clouds; tested desktop/mobile rendering, activity count, and holiday switching without JavaScript errors.

## v31.17 — Full-background holiday visibility and MAR10 fix

- Repaired the MAR10 animation error that could interrupt the scene.
- Added edge-of-valley decorative activities for all six gaming celebrations, making the scenes visible beyond the compact hero banner.
- Full-page effects remain behind all interactive content and respect reduced-motion settings.

## v31.16 — Living Sky & Game Day Celebrations (October 29, 2026)

- Added location-aware animated Sun and Moon with approximate sky positions for Naches, Washington; all moon phases, daylight lunar appearances, night glow and warm-horizon tint.
- Detects second-full-Moon-in-a-month calendar blue moons without falsely depicting the actual surface blue. Shows a compact astronomy note in Scene Studio; computes offline and updates every 5 minutes.
- Added six new manually previewable and automatically dated game celebrations: Pokémon Day (Feb 27), MAR10 (Mar 10), Star Wars Day (May 4), PAC-MAN Birthday (May 22), World Tetris Day (June 6), Sonic Birthday (June 23).
- Added original self-rendered Canvas2D art for portals, coins, jumpers, foes, spacecraft, energy-blade duelists, droid, creatures, maze pellets, tetrominoes and speed/ring effects.
- Preserved compact dashboard, all 36 activities and links, local settings, live weather/offline fallback, public-holiday scenes, animation controls and reduced-motion settings.
- Browser smoke-tested desktop and mobile viewport scene switching with no page JavaScript errors; verified solar seasonal altitude and a known blue moon.



## v31.15 — Compact Dashboard Edition (October 28, 2026)

- Shortened the hero to a compact illustrated welcome ribbon and kept Surprise Me.
- Removed the redundant closed Scene Studio summary row; header Customize Scene still opens the full panel.
- Moved search and subject filters closer to the top; subjects now scroll horizontally.
- Added Compact/Gallery card layouts with browser-saved selection; compact supports four columns on wide screens.
- Added Favorites-only shortcut, collapsible More filters with Clear filters, and shared New/Recently Opened discovery rail.
- Maintained the 36-entry catalog, all game links, the local preferences, live weather fallback, and holiday effects.


## v31.14 — Stackline Activity Added (October 28, 2026)

- Added Stackline: Dimensional Tic Tac Toe as a featured **Strategy** activity.
- Added custom Stackline artwork and icon for game-card presentation.
- Added new item to both `activities.json` and the embedded fallback catalog in `index.html`.
- Preserved 35 prior activities and weather and holiday scene controls.
- Updated catalog totals to 36 (26 available and 10 planned).

# Naches Learning Hub changelog

## v31.13 — October 28, 2026

- Corrected holiday animation sizing: full-window background canvas plus the original hero preview.
- Corrected scene switching so changing weather, season, or time clears selected holiday decorations and old artwork does not persist.
- Updated holiday palette treatments for the full valley scene.
- Preserved all activity cards, activity links, and saved settings; kept reduced-motion handling.


## v31.12 — October 28, 2026

- Added animated holiday artwork to Scene Studio: New Year, Independence Day, Halloween, winter celebrations, Valentine's Day, Thanksgiving, Earth Day, spring, St. Patrick's Day, back to school, Memorial Day, Veterans Day, and Juneteenth.
- Added storm lightning bolts with motion and intensity safeguards.
- Extended automatic decorations for New Year's Eve and the days leading up to Halloween/Independence Day.
- Refreshed Knowledge Showdown's card to mention 670 questions and grade 5–8 Social Studies.
- Preserved all 35 activity catalog entries, game links, card images, local scene preferences, favorites, and existing controls.

## v31.11

- Added fixed-location Naches live weather, Scene Studio, polished activity cards, and favorites.
