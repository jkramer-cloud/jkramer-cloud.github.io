# Naches Learning Hub v31.28 — Seasonal Event Visibility Fix

**October 30, 2026**

This is a targeted fix to v31.27. It does not change activities, favorites, card readability, sky color calculations, or the holiday animations themselves.

## Fixed
- On October 15–November 5, the pumpkin trebuchet appears only when both **Season** and **Special-day decorations** are set to **Automatic**. It also appears if you explicitly choose **Halloween** in the Special-day menu, allowing a deliberate off-season preview.
- Choosing a different season (such as Winter), another special-day scene, or **None** immediately removes the trebuchet, even when the current date is in pumpkin season.
- The same calendar/preview separation applies to the July jet, Santa flyby, and July patriotic flags.
- Event animations reset and the decorative canvas clears when the current scene switches. The background remains behind the cards, and reduced-motion remains supported.

## Installation
Replace the root `index.html` in `jkramer-cloud/jkramer-cloud.github.io` with the updated one. `activities.json` is included unchanged for convenience. Commit, then hard-refresh (Ctrl+Shift+R) to clear the browser cache.

## Scene behavior
- **Automatic season + Automatic special-day:** current calendar date determines events.
- **Manually selected season + no special-day:** no calendar-only special events.
- **Manually selected holiday:** explicitly previews the matching holiday's animation, even outside its dates.
- **None** for special-day: hides date-triggered effects.
