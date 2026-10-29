# Naches Learning Hub v31.21 — Math Rush (GitHub upload instructions)

**Two separate repositories need updating, in this order.** Publishing only the Hub will display a game card that leads to a page that does not exist yet.

## Step 1: Publish the Math Rush game

1. Create the **public** repository `math-rush-endless-run` under `jkramer-cloud`.
2. Upload `index.html` from the separate `Math_Rush_Endless_Run_v1_0_GitHub_Ready.zip` to its root. Upload the optional README and previews as desired.
3. Activate GitHub Pages in **Settings → Pages → Deploy from a branch → main → /(root)**.
4. Verify this game loads: https://jkramer-cloud.github.io/math-rush-endless-run/

## Step 2: Update the main Naches Learning Hub

1. Open your original repository **`jkramer-cloud.github.io`** (not the Math Rush repository).
2. Replace root **`index.html`** and **`activities.json`** with the same-named files from this **v31.21 Hub ZIP**. This is based on v31.20, preserving the latest daylight/weather fixes.
3. Optionally replace root `README.md`, `CHANGELOG.md` and `UPLOAD_INSTRUCTIONS.md`.
4. Commit, allow Pages to deploy, and hard-refresh the Hub with **Ctrl + Shift + R**.

## Verification checklist

- Search Math Rush or browse the Math category. The card should be Featured and have a custom perspective runner illustration.
- Check **New to the Hub**: Math Rush should appear first marked New game; Chess Academy remains second marked Updated.
- Click Play Math Rush; confirm it opens the new game site.
- The Hub count should now show **27 ready · 10 planned**. Previously saved favorites and recent activity history should work.
- Weather/daylight, Sun/Moon layers and seasonal decorations should look the same as v31.20.
- The game stores coins and character purchases in each browser locally, not across Chromebooks.

**Never upload the Hub's `index.html` into the `math-rush-endless-run` repository; it would overwrite the game.**
