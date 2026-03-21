[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$base = "c:\works\Antigravity\Kanji_Master\js\"
$grades = 1..1

foreach ($g in $grades) {
    $path = $base + "data-grade$g.js"
    if (-not (Test-Path $path)) { continue }
    $content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
    
    # 漢字ブロックを抽出: "漢字": { ... }
    $matches = [regex]::Matches($content, '"([^"]+)":\s*\{([\s\S]*?)\n\s*\},')
    
    Write-Host "--- Grade $g ---"
    
    foreach ($m in $matches) {
        $char = $m.Groups[1].Value
        $block = $m.Groups[2].Value
        
        # 読みの抽出 (onとkun)
        $onReadings = @()
        if ($block -match 'on:\s*\[([^\]]*)\]') {
            $onReadings = $matches[0].Groups[1].Value -split ',' | ForEach-Object { $_.Trim(" `"'") } | Where-Object { $_ }
        }
        # Wait, matches[0] is global. I mean $Matches variable from -match
        $onReadings = if ($block -match 'on:\s*\[([^\]]*)\]') { $Matches[1] -split ',' | ForEach-Object { $_.Trim(" `"'") } | Where-Object { $_ } } else { @() }
        $kunReadings = if ($block -match 'kun:\s*\[([^\]]*)\]') { $Matches[1] -split ',' | ForEach-Object { $_.Trim(" `"'") } | Where-Object { $_ } } else { @() }
        $allReadings = $onReadings + $kunReadings
        
        # 例文の読みを抽出
        $exMatches = [regex]::Matches($block, 'reading:\s*"([^"]+)"')
        $exReadings = $exMatches | ForEach-Object { $_.Groups[1].Value.Trim() }
        
        $missing = @()
        foreach ($er in $exReadings) {
            $found = $false
            foreach ($ar in $allReadings) {
                if ($ar -eq $er) { $found = $true; break }
            }
            if (-not $found) { $missing += $er }
        }
        
        if ($missing.Count -gt 0) {
            $missingUnique = $missing | Select-Object -Unique
            Write-Host "Kanji: $char | Base: ($($allReadings -join ',')) | Missing: $($missingUnique -join ',')"
        }
    }
}
