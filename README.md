# Naches Learning Hub v31.29 — Local Weather, Sunrise/Sunset & NWS Alerts

**October 30, 2026** | Incremental upgrade from v31.28

This is a drop-in update for the existing Naches Learning Hub, not a new or separate game. It preserves the catalog, favorites, activity links, seasonal events, festive illustrations, and previous layouts.

## What's fixed

- **Clear evenings are no longer labeled “Sunny.”** Clear weather at night is displayed as **Clear night**; partly cloudy evenings and overcast evenings have corresponding descriptions. The displayed scene follows sunrise/sunset at the selected weather location.
- **Weather location is selectable.** Naches, WA is the default and requires no location permission. In **Customize Scene → Weather location**, you can select **This computer’s location** or click **Use computer location**. The browser requests permission before retrieving approximate coordinates. If unavailable or denied, Naches is used.
- **Sunrise and sunset are in the Time of day selector.** Options now include Automatic, Sunrise preview, Daylight preview, Sunset preview, and Night sky preview. Selecting Sunrise/Sunset produces a golden twilight scene, and the Studio shows that day's local sunrise/sunset times when weather data is available.
- **More weather condition scenes.** Manual scenes now include drizzle, rain, snow, sleet/icy mix, freezing rain, hail, mist/fog, windy, frosty, and thunderstorms, in addition to clear and cloudy skies. The page also maps supported WMO current-condition codes to drizzle, freezing rain, and hail when forecast data indicates them.
- **Temperature and wind effects.** At/below 32°F, a subtle icy shimmer appears in automatic mode. Strong wind adjusts cloud animation and can bring blowing foliage. Reduced-motion and animation-off settings still disable motion.
- **Official warnings are separate from modeled conditions.** The Scene Studio checks for **active National Weather Service watches, warnings and advisories** by weather location using the public NWS alerts endpoint. If an active alert is returned, the header and Scene Studio identify it with a link to the official source. If the alert service is unavailable, the page reports that it could not check; it does **not** claim there are no warnings.

## Location and privacy

- Without your permission, the default weather location remains **Naches, WA**, and no device location is requested.
- If you elect to use your computer's location, the browser prompts for location access. Approximate coordinates are shared with Open-Meteo for weather and with the US National Weather Service for alerts to those coordinates.
- The selected mode (Naches vs device) is saved locally in browser storage. **Device coordinates are not stored** in the Hub's browser settings or weather cache. The page requests location again on subsequent visits if the mode is saved; the browser decides whether to prompt again.
- School-managed Chromebooks can block geolocation; the Hub falls back to Naches.
- Geolocation follows the browser/device location and might be less precise on desktop computers. NWS alerts are US-specific.

## Source data and limitations

- Weather, sunrise/sunset and WMO codes: [Open-Meteo](https://open-meteo.com/en/docs). Current weather is model-based and can differ from conditions observed locally.
- Official US weather alerts: [National Weather Service](https://www.weather.gov/documentation/services-web-alerts), using the active-alerts point endpoint. Alerts only appear if the service responds successfully, and availability is not guaranteed.
- **This is educational scenery, not a safety alert system.** For urgent weather decisions, consult the official NWS site or local emergency guidance. A temperature below freezing is a **condition**, not proof that an official Freeze Warning has been issued. A simulated hail or freezing-rain scene is never an official warning.
- Manual scenes are visual previews; they do not modify or claim to be the live forecast.

## Install on GitHub Pages

1. Download and extract the ZIP.
2. Open the repository `jkramer-cloud/jkramer-cloud.github.io`.
3. Replace its root `index.html` with this version. `activities.json` is included unchanged so the package can also be uploaded as a complete set.
4. Optionally replace `README.md`, `CHANGELOG.md`, and `UPLOAD_INSTRUCTIONS.md`.
5. Commit and reload the site with Ctrl+Shift+R.

No build system, API key, package installation, or server-side code is required. Live data will be loaded by the browser from HTTPS endpoints. The Hub retains the previous seasonal/offline fallback if requests fail.


## v31.30 — New science activity: Valley Star Scout

- Adds **Valley Star Scout** to the Science category, with a custom astronomy illustration and a link to its separate GitHub Pages site.
- Adds it to both `activities.json` and the embedded fallback list so the tile survives intermittent catalog-loading problems.
- Preserves v31.29 weather/time-of-day repairs and all previous activities.
- **Publish the Valley Star Scout repository first** so the new tile URL is live.


## v31.31 — Valley Star Scout v2.0

- Science listing points to the revised `valley-star-scout` site, which has phone-only AR camera overlays, red mode, offline star maps, science quizzes, an observational forecast and an aurora outlook.
- Keeps all existing Hub weather, holiday scenes, favorites, catalog items and animated card artwork.
- Publish Star Scout v2 first. This update changes the **Hub listing only**; the standalone astronomy app lives in its own GitHub Pages repo.
