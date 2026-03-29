param (
    [string]$CsvPath = "kanji_examples_export.csv",
    [string]$JsPath = "js\hiragana-data.js"
)
try {
    # Use Default encoding, check first bytes for BOM
    $bytes = [System.IO.File]::ReadAllBytes((Join-Path (Get-Location) $CsvPath))
    $enc = if ($bytes[0] -eq 239 -and $bytes[1] -eq 187 -and $bytes[2] -eq 191) { "UTF8" } else { "Default" }
    
    $csvData = Import-Csv $CsvPath -Encoding $enc
    $jsonObj = @{}
    
    foreach ($row in $csvData) {
        $props = $row.psobject.properties | Select-Object -ExpandProperty Name
        if ($props.Count -ge 6) {
            $key = $row.($props[4]) # 5th column: 問題文
            $hiragana = $row.($props[5]) # 6th column: 全文ひらがな
            
            if (![string]::IsNullOrWhiteSpace($hiragana)) {
                $jsonObj["$key"] = $hiragana
            }
        }
    }
    
    $jsonString = $jsonObj | ConvertTo-Json -Compress
    $jsContent = "const HIRAGANA_DATA = $jsonString;"
    
    # Save the JS file using UTF8
    [IO.File]::WriteAllText((Join-Path (Get-Location) $JsPath), $jsContent, [System.Text.Encoding]::UTF8)
    
    Write-Host "Done! Extracted $($jsonObj.Count) items."
} catch { Write-Error $_ }
