NACHES LEARNING HUB — SEASONAL VALLEY V31
======================================
MAIN CHANGE: Replace ONLY index.html in your existing main Learning Hub GitHub repository.
The catalog is embedded and does NOT fetch activities.json. DO NOT upload an older activities.json.

16 playable games and 14 Coming Soon entries retained, all 30 links/records unchanged.
Featured labels automatically select the three most recently launched playable games:
- Math Maze Adventures
- Valley Geography Quest
- Naches Knowledge Showdown
Each available game has releaseOrder. For a future game, assign the next integer (17, 18, etc.)
when adding its activity entry. An entry lacking releaseOrder is treated as newest.

LANDSCAPE
7 date-based phases: winter (Dec-Feb), thaw (Mar), blossoms (Apr-May 12), green valley
(May 13-Jul 14), harvest (Jul 15-Sep), early fall (Oct), late fall (Nov).
Five artistic daily sky types (NOT actual weather): sunny, partly cloudy, cloudy,
light rain, snow. Only skies suitable for the season are chosen automatically.
Decorative orchard fruit and blossoms, snow caps, seasonal foliage, birds, and occasional
squirrel/deer/elk/coyote silhouettes. Rare wildlife varies deterministically by local date.

HOLIDAYS/SPECIAL WINDOWS
Jan 1 - New Year; Feb 14 - Valentine's Day; Apr 22 - Earth Day;
Memorial Day (last Monday in May); July 4 - Independence Day;
Aug 25-Sep 10 - Welcome Back to School (illustrative, not the district calendar);
Oct 31 - Halloween; Nov 11 - Veterans Day; Thanksgiving - fourth Thu in Nov;
Dec 18-31 - Winter Celebrations.
Holiday details are subtle and noninteractive. Memorial/Veterans Day use subdued stars.

CONTROLS
The scene strip above the hero allows manual season, artistic sky, and wildlife previews;
turning animations off does not change any lesson. Motion preference is saved in that browser.
The page respects system prefers-reduced-motion automatically, and can be disabled manually.
The landscape uses inline SVG and CSS only, with no external images, fonts, APIs, or libraries.

INSTALL
1) Extract this ZIP.
2) Open your current Learning Hub GitHub repository.
3) Replace the root index.html with the included file.
4) Commit changes.
5) Open the public website and refresh using Ctrl+Shift+R.
6) Confirm the footer says Hub v31 and the count is 16 playable / 14 planned.
7) Test the season-preview controls and verify the new three featured games.

NOTE: Time/date comes from the device's local clock, not a weather service.
GitHub Pages has no scheduled task; changes occur when visitors load/refresh the page.

SPECIAL DAY PREVIEW: Use the last scene dropdown to preview holiday decorations on demand; choose Automatic to restore date-based effects.
