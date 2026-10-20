# VC@D Desktop — GitHub Releases Auto Update

This package configures `electron-updater` to use GitHub Releases. The updater will NOT work until the two placeholders in `package.json` are replaced with the actual GitHub username and repository name, and a release is published.

## 1. Set your GitHub repository
In `package.json`, replace:
- `tranquangvinh23072004-wq`
- `-VCAD-Desktop`

in both `repository.url` and `build.publish`.

Create a **public** GitHub repository for the app releases. Public repo is the simplest option for a personal app updater. Never put a GitHub token inside source code or the app.

## 2. Build the first update-enabled installer
Install Node.js LTS, extract this folder, then run `build-windows.ps1` in PowerShell. This produces a version 1.2.0 installer with the updater button.

## 3. Publish a release
For publishing, set a GitHub token in the current PowerShell session with permission to create releases in your repository. Do not send the token to anyone or paste it into chat:
`$env:GH_TOKEN = "PASTE_YOUR_TOKEN_HERE"`

Then run:
`npm run publish:win`

Electron Builder should build the installer and publish a GitHub Release with update metadata. Review the release and publish it. Official updater behavior requires the release metadata and installer assets to be available from GitHub Releases.

## 4. How users update
Install the update-enabled 1.2.0 build once. When a newer release is published, open VC@D and click **Cập nhật**. The app checks GitHub Releases, downloads the update, then offers to restart/install.

## 5. Publish later versions
Increase `version` in `package.json` (for example `1.2.1`), update code, and run `npm run publish:win` again with the same `GH_TOKEN`. Never publish a changed installer with the same version number.

## Data and safety
- Updating the installed app does not require manually uninstalling it.
- Keep drawings as separate `.json` files and back them up.
- Do not delete the user's Electron app-data folder during update/uninstall.
- Only publish installers you trust. Keep the GitHub token private.
- This project has not been tested against your actual GitHub repository; repository placeholders must be configured first.
