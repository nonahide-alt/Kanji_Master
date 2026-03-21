$grades = @("data-grade1.js","data-grade2.js","data-grade3.js","data-grade4.js","data-grade5.js","data-grade6.js")
$base = "c:\works\Antigravity\Kanji_Master\js\"

foreach ($file in $grades) {
    $path = $base + $file
    if (-not (Test-Path $path)) { continue }
    $content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

    $onPattern   = [regex]'on\s*:\s*\[([^\]]*)\]'
    $kunPattern  = [regex]'kun\s*:\s*\[([^\]]*)\]'
    $exPattern   = [regex]'examples\s*:\s*\[([^\]]*)\]'
    $charPattern = [regex]'"([\u4e00-\u9fff])"\s*:\s*\{'

    $charMatches = $charPattern.Matches($content)

    foreach ($cm in $charMatches) {
        $pos = $cm.Index
        $end = [Math]::Min($pos + 1500, $content.Length)
        $block = $content.Substring($pos, $end - $pos)

        $onM  = $onPattern.Match($block)
        $kunM = $kunPattern.Match($block)
        $exM  = $exPattern.Match($block)

        if (-not $onM.Success -or -not $exM.Success) { continue }

        $onVals  = $onM.Groups[1].Value.Split(',') | Where-Object { $_.Trim() -ne '' }
        if ($kunM.Success) {
            $kunVals = $kunM.Groups[1].Value.Split(',') | Where-Object { $_.Trim() -ne '' }
        } else {
            $kunVals = @()
        }

        $total = $onVals.Count + $kunVals.Count
        $exText = $exM.Groups[1].Value
        $exCount = ([regex]::Matches($exText, 'reading\s*:')).Count

        if ($total -ne $exCount) {
            Write-Output "$file : $($cm.Groups[1].Value) [読み=$total 例文=$exCount]"
        }
    }
}
