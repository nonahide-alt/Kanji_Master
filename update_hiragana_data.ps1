param (
    [string]$CsvPath = "kanji_examples_export.csv",
    [string]$JsPath = "js\hiragana-data.js"
)
try {
    # Use UTF8 encoding
    $csvData = Import-Csv $CsvPath -Encoding UTF8
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
