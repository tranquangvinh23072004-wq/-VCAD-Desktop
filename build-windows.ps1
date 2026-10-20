$ErrorActionPreference = "Stop"
Set-Location -LiteralPath $PSScriptRoot

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: npm was not found. Install Node.js LTS, then close and reopen PowerShell." -ForegroundColor Red
    exit 1
}

if (-not (Test-Path -LiteralPath ".\app\vendor\three.min.js")) {
    Write-Host "Preparing local vendor libraries..."
    & powershell.exe -NoProfile -ExecutionPolicy Bypass -File ".\download-vendor.ps1"
    if ($LASTEXITCODE -ne 0) {
        throw "Vendor library download failed. Check Internet connection and rerun."
    }
}

Write-Host "Installing npm dependencies..."
npm install
if ($LASTEXITCODE -ne 0) { throw "npm install failed." }

Write-Host "Building Windows installer..."
npm run dist
if ($LASTEXITCODE -ne 0) { throw "Windows installer build failed." }

Write-Host "SUCCESS. Check the .\dist folder for the VCAD installer for the version in package.json."
