# GitHub Pages update — v31.29

Replace `index.html` at the **root** of the existing `jkramer-cloud.github.io` GitHub repository. The ZIP also contains `activities.json` unchanged and optional documentation files. Do not put the files into an extra folder unless the repository is already configured that way.

Commit the changes, then hard-refresh the public website using **Ctrl+Shift+R** (or use a private window to rule out cached files).

Test **Customize Scene → Weather location**. Default is Naches; **Use computer location** requests browser permission. Test **Time of day → Sunrise** and **Sunset**; verify **Live weather** and an NWS alert-status message appear separately. A blocked NWS connection should display an alert-service error, not a false all-clear.
