Add-Type -AssemblyName System.IO.Compression.FileSystem

$dir = "c:\Users\victo\Downloads\Vic Falls\Shearwater Agents Info Pack\Fact Sheets"
Get-ChildItem -Path $dir -Filter *.docx | ForEach-Object {
    Write-Host "===================================="
    Write-Host "FILE: $($_.Name)"
    Write-Host "===================================="
    $zip = [System.IO.Compression.ZipFile]::OpenRead($_.FullName)
    $entry = $zip.GetEntry("word/document.xml")
    if ($entry) {
        $stream = $entry.Open()
        $reader = New-Object System.IO.StreamReader($stream)
        $xml = $reader.ReadToEnd()
        $reader.Close()
        $stream.Close()
        $text = $xml -replace '<[^>]+>', ' ' -replace '\s+', ' '
        Write-Host ($text.Substring(0, [System.Math]::Min(1500, $text.Length)))
    }
    $zip.Dispose()
}
