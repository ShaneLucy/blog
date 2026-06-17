#Requires -Version 5.1
<#
.SYNOPSIS
    Recursively converts all HEIC images under src/content/trips to WebP using ffmpeg.

.DESCRIPTION
    For each .heic / .HEIC file found, an equivalent .webp file is written next to it
    at maximum quality (100), avoiding the quality loss of an intermediate JPEG step.
    The original HEIC is left untouched unless -DeleteOriginals is passed.

.PARAMETER DeleteOriginals
    If set, removes the source .heic file after a successful conversion.

.PARAMETER DryRun
    Print what would be converted without doing anything.
#>
param(
    [switch]$DeleteOriginals,

    [switch]$DryRun
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

# Resolve paths relative to this script's location (scripts/ dir -> repo root)
$repoRoot  = Split-Path -Parent $PSScriptRoot
$tripsDir  = Join-Path $repoRoot 'src\content\trips'

if (-not (Test-Path $tripsDir)) {
    Write-Error "Trips directory not found: $tripsDir"
    exit 1
}

# Verify ffmpeg is on PATH
if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
    Write-Error "ffmpeg not found on PATH. Install it and try again."
    exit 1
}

$heicFiles = @(Get-ChildItem -Path $tripsDir -Recurse -File -Filter '*.heic')

if ($heicFiles.Count -eq 0) {
    Write-Host "No HEIC files found under $tripsDir"
    exit 0
}

Write-Host "Found $($heicFiles.Count) HEIC file(s) under src/content/trips`n"

$converted = 0
$skipped   = 0
$failed    = 0

foreach ($file in $heicFiles) {
    $dest = [System.IO.Path]::ChangeExtension($file.FullName, '.webp')
    $rel  = $file.FullName.Substring($repoRoot.Length + 1)

    if (Test-Path $dest) {
        Write-Host "SKIP  $rel  (WebP already exists)"
        $skipped++
        continue
    }

    if ($DryRun) {
        Write-Host "DRY   $rel  ->  $([System.IO.Path]::GetFileName($dest))"
        $converted++
        continue
    }

    Write-Host "CONV  $rel"

    $ffmpegArgs = @(
        '-y',
        '-i', $file.FullName,
        '-quality', 100,
        '-loglevel', 'error',
        $dest
    )

    try {
        & ffmpeg @ffmpegArgs
        if ($LASTEXITCODE -ne 0) { throw "ffmpeg exited with code $LASTEXITCODE" }

        if ($DeleteOriginals) {
            Remove-Item $file.FullName -Force
            Write-Host "      deleted original"
        }

        $converted++
    } catch {
        Write-Warning "FAIL  $rel - $_"
        # Remove any partial output
        if (Test-Path $dest) { Remove-Item $dest -Force }
        $failed++
    }
}

Write-Host ""
if ($DryRun) {
    Write-Host "Dry run: $converted file(s) would be converted, $skipped already have WebP."
} else {
    Write-Host "Done: $converted converted, $skipped skipped, $failed failed."
}

if ($failed -gt 0) { exit 1 }
