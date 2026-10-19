# Naches Learning Hub — Games, lessons, simulations, and tools

A student-friendly directory for existing and future educational activities. The homepage **links** to each project; it does not move or modify the individual games or their save data.

## Publish the website (first-time setup)

1. Sign in to GitHub as `jkramer-cloud` and open https://github.com/new.
2. Create a **Public** repository named exactly `jkramer-cloud.github.io`. Enable **Add README** if desired.
3. On the new repository, choose **Add file → Upload files** and upload **`index.html`** and **`activities.json`** from this ZIP. `README.md` and `.nojekyll` are optional. Upload files **to the repository root**, not a folder within it. Do not upload only the ZIP.
4. Commit the uploaded files to the `main` branch.
5. Select **Settings → Pages → Build and deployment → Deploy from a branch**, branch `main`, folder `/(root)`, then **Save**.
6. When publishing finishes, open **https://jkramer-cloud.github.io/**. If the site is old or missing, wait a few minutes and hard refresh (Ctrl+Shift+R).

Your existing projects remain where they are:

- https://jkramer-cloud.github.io/mystery-detectives/
- https://jkramer-cloud.github.io/multiplication-battleship/
- https://jkramer-cloud.github.io/addition-subtraction-battleship/
- https://jkramer-cloud.github.io/ASCENDANT-Cognitive-Reading-System/

## Maintain the hub

Only update `activities.json` when adding/editing an activity. The student homepage automatically reads it. Each activity is an object within the `activities` array. Supported fields include:

```json
{
  "id": "photoshop-selection-tutorial",
  "title": "Photoshop Selection Tutorial",
  "category": "design",
  "categoryLabel": "Design & Technology · Photoshop",
  "type": "tutorial",
  "description": "Practice selection tools with step-by-step instructions.",
  "skills": ["Selections", "Layers"],
  "gradeLabel": "Grades 6–8",
  "gradeGroups": ["6-8"],
  "mode": "Self-paced",
  "icon": "photoshop",
  "status": "planned"
}
```

- `category`: `math`, `ela`, `reading`, `science`, or `design`.
- `type`: `game`, `tutorial`, `simulation`, or `tool`.
- `status`: `planned` for nonclickable Coming Soon cards, or `available` for working live links.
- `url`: **required when `status` is `available`**, e.g. `"url":"https://jkramer-cloud.github.io/photoshop-selection-tutorial/"`.
- `gradeGroups`: any combination of `1-2`, `3-5`, `6-8`.
- `icon`: `detective`, `addsub`, `multiply`, `reader`, `science`, `ecosystem`, `photoshop`, or `illustrator`.

**Publish a planned activity:** Upload and publish the activity in its *own* GitHub repository first. Then edit its existing entry in the hub's `activities.json`, switch `status` from `planned` to `available`, and add its verified public `url`. Commit the change. No new hub code is needed.

**Remove an idea:** Delete its entry from `activities.json` while maintaining valid JSON syntax. `status:"planned"` is intended only as a concept preview; do not add a fake or broken URL.

## Classroom and district notes

The hub requires no student accounts. It does not collect or transmit names or assignment data. Some destination games may store progress in that game's own browser storage. This directory does not move or synchronize that data. The district may need to allow-list the hub and linked domains/URLs separately. Future account-wide progress tracking would require a separate backend or compatible learning platform. The site is not an official district website unless adopted/approved by the district.

## Technical

Static HTML/CSS/JS and a single JSON catalog, with no package manager or hosting fees required for a public GitHub Pages site. If you open `index.html` directly on your computer, its built-in starter catalog will display; on GitHub Pages, `activities.json` controls the cards.
