# Naches Learning Hub — Class Compass Update (v31.50)

This ZIP updates **the main Naches Learning Hub**, not the separate Class Compass planner. The update adds one student-facing tool card, Class Compass: Student Planner, and preserves all 82 previous catalog entries, existing artwork, Hub controls, animated scenery, and the hidden Pocket Critters unlock.

## Upload order

**1. Publish the separate Class Compass app first.**
- Create repository `class-compass` in the `jkramer-cloud` GitHub account.
- Upload `index.html` and `README.md` from the separately provided **Class Compass v1.2** repository ZIP.
- GitHub Settings → Pages → Deploy from branch → main → / (root).
- Confirm the planner opens at https://jkramer-cloud.github.io/class-compass/ .

**2. Update the main Learning Hub repository.**
- Open the existing repository `jkramer-cloud.github.io`.
- Replace **only** the root `index.html` and `activities.json` with the two files in this update ZIP.
- Leave the rest of the Hub repository unchanged. This is not an update to individual game repositories.
- Commit and let GitHub Pages deploy. If necessary, hard-refresh with Ctrl+Shift+R.

## New activity card

- **Name:** Class Compass: Student Planner
- **Category:** Student Tools · Planner & Organization
- **Grades:** 5–12, customizable for middle-school quarters and high-school semesters
- **Features:** seven-period setup, class colors, assignments and multi-week projects, project checklists, district school calendars, weekly PDF reports, yearly archives, and local backups
- **URL:** https://jkramer-cloud.github.io/class-compass/
- **Icon and artwork:** custom planner illustration with class checklist, progress bar, and calendar
- **Visibility:** marked available (live link); publish the app first so students do not encounter a 404.

## Data/privacy

Class Compass does not need a Google sign-in or account. Student information stays in the browser's local storage on that device. It does **not** automatically synchronize between Chromebooks. Students must export backups and restore them when needed. Names, planner activity, and personal weekly report PDFs are generated on the device. Do not treat the activity report as independent verification of actual schoolwork.

## Validation

Updated external `activities.json` and the embedded fallback catalog to match. Only Class Compass was added; the original 82 catalog entries were not altered. Existing Pocket Critters secret entry code, Surprise Me behavior, favorites, and releases were not edited.
