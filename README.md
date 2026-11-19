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
