$ErrorActionPreference = "Stop"
$root = Join-Path $PSScriptRoot "app\vendor"
$faCss = Join-Path $root "fontawesome\css"
$faFonts = Join-Path $root "fontawesome\webfonts"

New-Item -ItemType Directory -Force -Path $root | Out-Null
New-Item -ItemType Directory -Force -Path $faCss | Out-Null
New-Item -ItemType Directory -Force -Path $faFonts | Out-Null

function Download-File([string]$Url, [string]$Destination) {
    Write-Host ("Downloading: " + $Url)
    Invoke-WebRequest -Uri $Url -OutFile $Destination -UseBasicParsing
}

Download-File "https://cdn.tailwindcss.com" (Join-Path $root "tailwindcss.js")
Download-File "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" (Join-Path $root "three.min.js")
Download-File "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js" (Join-Path $root "OrbitControls.js")
Download-File "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" (Join-Path $faCss "all.min.css")

$fontNames = @("fa-solid-900.woff2", "fa-regular-400.woff2", "fa-brands-400.woff2")
foreach ($fontName in $fontNames) {
    $url = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/" + $fontName
    Download-File $url (Join-Path $faFonts $fontName)
}

Write-Host "Vendor download completed."
