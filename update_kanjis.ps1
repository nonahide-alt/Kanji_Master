$mods = Import-Csv -Path 'modify.csv' -Encoding UTF8
$csvRows = Get-Content 'kanji_examples_export.csv' -Encoding UTF8

$csvData = @{}
foreach($row in $csvRows) {
    if(-not $row) { continue }
    $cols = $row -split ','
    if($cols[0] -eq '学年') { continue }
    $k = $cols[1]
    if(-not $csvData.ContainsKey($k)) {
        $csvData[$k] = @{ on = @(); kun = @(); ex = @() }
    }
    $type = $cols[2]
    $r = $cols[3]
    $ex = $cols[4]
    
    if($type -eq '音読み') {
        if($csvData[$k].on -notcontains $r) { $csvData[$k].on += $r }
    } else {
        if($csvData[$k].kun -notcontains $r) { $csvData[$k].kun += $r }
    }
    $csvData[$k].ex += @{ r = $r; ex = $ex }
}

$kanjisToUpdate = $mods | Select-Object -ExpandProperty 漢字 -Unique
$grades = 1..6

foreach($g in $grades) {
    $file = "js\data-grade$($g).js"
    if(-not (Test-Path $file)) { continue }
    
    $content = Get-Content $file -Raw -Encoding UTF8
    $modified = $false

    foreach($k in $kanjisToUpdate) {
        $modRecord = $mods | Where-Object { $_.漢字 -eq $k } | Select-Object -First 1
        $modG = $modRecord.学年
        if($modG -ne $g) { continue }
        
        $d = $csvData[$k]
        
        # Build the examples string
        $exStr = "examples: [`r`n"
        foreach($e in $d.ex) {
            $exStr += "        { reading: `"$($e.r)`", text: `"$($e.ex)`" }," + "`r`n"
        }
        $exStr = $exStr.TrimEnd(",`r`n") + "`r`n      ]"
        
        $onArr = $d.on | ForEach-Object { "`"$_`"" }
        $onStr = $onArr -join ", "
        $kunArr = $d.kun | ForEach-Object { "`"$_`"" }
        $kunStr = $kunArr -join ", "
        
        # Check if kanji exists in this file
        $pattern = "(?s)(\s*`"$k`":\s*\{)(.*?)(^\s*\},|^\s*\})"
        $match = [regex]::Match($content, $pattern, [Text.RegularExpressions.RegexOptions]::Multiline)
        
        if($match.Success) {
            # Update existing kanji
            $block = $match.Groups[2].Value
            $block = [regex]::Replace($block, "on:\s*\[.*?\],", "on: [$onStr],")
            $block = [regex]::Replace($block, "kun:\s*\[.*?\],", "kun: [$kunStr],")
            $block = [regex]::Replace($block, "(?s)examples:\s*\[.*?\]", $exStr)
            
            $newBlock = $match.Groups[1].Value + $block + $match.Groups[3].Value
            $content = $content.Replace($match.Value, $newBlock)
            Write-Host "Updated existing: $k in $file"
            $modified = $true
        } else {
            # Append new kanji just before the final "};"
            $newBlock = "  `"$k`": {`r`n    on: [$onStr],`r`n    kun: [$kunStr],`r`n    etymology: `"データなし`",`r`n    hint: `"（自動生成データのためヒントなし）`",`r`n    radicals: [],`r`n    $exStr`r`n  }`r`n"
            
            $idx = $content.LastIndexOf("};")
            if($idx -ge 0) {
                # Ensure comma before inserting new block
                $before = $content.Substring(0, $idx).TrimEnd()
                if($before -notmatch ",$") {
                    $before += ","
                }
                $content = $before + "`r`n" + $newBlock + "};" + $content.Substring($idx + 2)
                Write-Host "Appended new: $k in $file"
                $modified = $true
            }
        }
    }
    
    if($modified) {
        [IO.File]::WriteAllText((Join-Path $PWD $file), $content, [System.Text.Encoding]::UTF8)
    }
}
Write-Host "Done updating all js files!"
