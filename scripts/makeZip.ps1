$source = "C:\Users\Shihabul Islam\.gemini\antigravity\scratch\ux-portfolio"
$tempDir = "C:\Users\Shihabul Islam\.gemini\antigravity\scratch\export_temp\ux-portfolio"
$desktopZip = "C:\Users\Shihabul Islam\OneDrive\Desktop\ux-portfolio.zip"
$downloadsZip = "C:\Users\Shihabul Islam\Downloads\ux-portfolio.zip"

Write-Host "Cleaning temp directory..."
if (Test-Path "C:\Users\Shihabul Islam\.gemini\antigravity\scratch\export_temp") {
    Remove-Item -Recurse -Force "C:\Users\Shihabul Islam\.gemini\antigravity\scratch\export_temp"
}

New-Item -ItemType Directory -Force -Path $tempDir | Out-Null

Write-Host "Copying project directories..."
Copy-Item -Recurse -Force (Join-Path $source "src") (Join-Path $tempDir "src")
Copy-Item -Recurse -Force (Join-Path $source "public") (Join-Path $tempDir "public")
Copy-Item -Recurse -Force (Join-Path $source "prisma") (Join-Path $tempDir "prisma")
Copy-Item -Recurse -Force (Join-Path $source "scripts") (Join-Path $tempDir "scripts")

Write-Host "Copying configuration and environment files..."
$configFiles = @(".env", "package.json", "package-lock.json", "tsconfig.json", "next.config.ts", "postcss.config.mjs", "eslint.config.mjs", "prisma.config.ts", "README.md", ".gitignore")
foreach ($f in $configFiles) {
    $srcPath = Join-Path $source $f
    if (Test-Path $srcPath) {
        Copy-Item -Force $srcPath (Join-Path $tempDir $f)
    }
}

Write-Host "Archiving project to Desktop and Downloads..."
if (Test-Path $desktopZip) { Remove-Item -Force $desktopZip }
if (Test-Path $downloadsZip) { Remove-Item -Force $downloadsZip }

Compress-Archive -Path $tempDir -DestinationPath $desktopZip -Force
Copy-Item -Force $desktopZip $downloadsZip

Remove-Item -Recurse -Force "C:\Users\Shihabul Islam\.gemini\antigravity\scratch\export_temp"

Write-Host "Archive created successfully!"
Get-Item $desktopZip | Select-Object FullName, Length
Get-Item $downloadsZip | Select-Object FullName, Length
