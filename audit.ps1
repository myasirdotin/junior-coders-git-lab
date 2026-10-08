[CmdletBinding()]
param(
    [string]$OutFile = "book-audit-report.md",
    [string]$RootDir = ""
)

$ErrorActionPreference = "Stop"

if (-not $RootDir) {
    if ($PSScriptRoot) {
        $RootDir = $PSScriptRoot
    } else {
        $RootDir = (Get-Location).Path
    }
}

$outPath = if ([System.IO.Path]::IsPathRooted($OutFile)) { $OutFile } else { Join-Path $RootDir $OutFile }

$books = @(
    "book-cmd",
    "book-css",
    "book-cybersecurity",
    "book-git",
    "book-html",
    "book-js",
    "book-laravel",
    "book-mysql",
    "book-networks",
    "book-php",
    "book-python"
)

Write-Host "====================================================" -ForegroundColor Cyan
Write-Host "  Junior Coders Git Lab - Book Integrity Audit" -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan
Write-Host "Auditing root: $RootDir" -ForegroundColor Gray
Write-Host ""

$report = @()
$report += "# Junior Coders Git Lab - Book Audit & Verification Report"
$report += ""
$report += "Audit generated on: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
$report += ""

$totalBooks = $books.Count
$totalChaptersFound = 0
$totalMissingFiles = 0
$totalBundleGaps = 0
$totalOfflineReady = 0

$bookSummaryRows = @()
$bookDetailReports = @()

foreach ($book in $books) {
    $bookDir = Join-Path $RootDir $book
    if (-not (Test-Path $bookDir)) {
        $bookSummaryRows += "| $book | ❌ Missing | - | - | - | - |"
        $bookDetailReports += "## $book"
        $bookDetailReports += "❌ Directory not found at `$bookDir`."
        $bookDetailReports += ""
        continue
    }

    $indexPath = Join-Path $bookDir "index.html"
    $bundlePath = Join-Path $bookDir "chapters-bundle.js"

    $hasIndex = Test-Path $indexPath
    $hasBundle = Test-Path $bundlePath
    $bundleContent = if ($hasBundle) { Get-Content $bundlePath -Raw -Encoding UTF8 } else { "" }

    # Offline Parser check
    $parserStatus = "missing"
    if ($hasIndex) {
        $indexContent = Get-Content $indexPath -Raw -Encoding UTF8
        if ($indexContent -match "Offline fallback: robust markdown parser") {
            $parserStatus = "robust"
            $totalOfflineReady++
        } elseif ($indexContent -match "white-space:\s*pre-wrap") {
            $parserStatus = "basic-pre"
        } elseif ($indexContent -match "CHAPTERS\s*=\s*\{") {
            $parserStatus = "inline-html"
            $totalOfflineReady++
        }
    }

    # Extract chapters from index
    $indexChapters = @()
    if ($hasIndex) {
        $matches = [regex]::Matches($indexContent, "loadChapter\(['""]([^'""]+)['""]")
        foreach ($m in $matches) {
            $val = $m.Groups[1].Value
            if ($indexChapters -notcontains $val) {
                $indexChapters += $val
            }
        }
    }

    # Find disk md files
    $mdFiles = Get-ChildItem -Path $bookDir -Filter "*.md" -Recurse | Where-Object { $_.Name -notlike "README*" }
    $diskChapters = @()
    foreach ($f in $mdFiles) {
        $rel = $f.FullName.Substring($bookDir.Length + 1).Replace('\', '/')
        $diskChapters += $rel
    }

    $missingFromDisk = @()
    if ($parserStatus -ne "inline-html") {
        foreach ($ic in $indexChapters) {
            $fullPath = Join-Path $bookDir $ic
            if (-not (Test-Path $fullPath)) {
                $missingFromDisk += $ic
                $totalMissingFiles++
            }
        }
    }

    $bundleGaps = @()
    if ($hasBundle -and $diskChapters.Count -gt 0) {
        foreach ($dc in $diskChapters) {
            if ($bundleContent -notmatch [regex]::Escape($dc)) {
                $bundleGaps += $dc
                $totalBundleGaps++
            }
        }
    }

    $totalChaptersFound += $diskChapters.Count

    # Console output for book
    $statusSymbol = if ($missingFromDisk.Count -eq 0 -and $bundleGaps.Count -eq 0) { "[PASS]" } else { "[WARN]" }
    $fg = if ($statusSymbol -eq "[PASS]") { "Green" } else { "Yellow" }
    Write-Host "$statusSymbol $book - Chapters: $($diskChapters.Count), Missing: $($missingFromDisk.Count), Bundle Gaps: $($bundleGaps.Count), Parser: $parserStatus" -ForegroundColor $fg

    $bookSummaryRows += "| $book | $(if ($hasIndex) { 'Yes' } else { 'No' }) | $($diskChapters.Count) | $($missingFromDisk.Count) | $($bundleGaps.Count) | $parserStatus |"

    $bookDetailReports += "## $book"
    $bookDetailReports += "- **Indexed Chapters:** $($indexChapters.Count)"
    $bookDetailReports += "- **Disk Chapters:** $($diskChapters.Count)"
    $bookDetailReports += "- **Bundle Status:** $(if ($hasBundle) { 'Present' } else { 'None (Inline/N/A)' })"
    $bookDetailReports += "- **Offline Parser:** $parserStatus"

    if ($missingFromDisk.Count -gt 0) {
        $bookDetailReports += "### ❌ Missing From Disk"
        foreach ($m in $missingFromDisk) { $bookDetailReports += "- $m" }
    }
    if ($bundleGaps.Count -gt 0) {
        $bookDetailReports += "### ⚠️ Bundle Coverage Gaps"
        foreach ($bg in $bundleGaps) { $bookDetailReports += "- $bg" }
    }
    $bookDetailReports += ""
}

$report += "## Executive Summary"
$report += ""
$report += "| Metric | Value |"
$report += "| :--- | :--- |"
$report += "| Total Books Audited | $totalBooks |"
$report += "| Total Markdown Chapters On Disk | $totalChaptersFound |"
$report += "| Total Missing Files Referenced | $totalMissingFiles |"
$report += "| Total Bundle Gaps | $totalBundleGaps |"
$report += "| Fully Offline-Capable Readers | $totalOfflineReady / $totalBooks |"
$report += ""
$report += "## Book Summary Matrix"
$report += ""
$report += "| Book | Index HTML | Disk Chapters | Missing Files | Bundle Gaps | Offline Parser |"
$report += "| :--- | :---: | :---: | :---: | :---: | :---: |"
$report += $bookSummaryRows
$report += ""
$report += "## Detailed Book Breakdown"
$report += ""
$report += $bookDetailReports

$report | Out-File -FilePath $outPath -Encoding utf8

Write-Host ""
Write-Host "Audit completed successfully!" -ForegroundColor Green
Write-Host "Report saved to: $outPath" -ForegroundColor Cyan
