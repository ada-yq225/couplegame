$port = 8765
$root = $PSScriptRoot

function Get-LanIP {
  $ip = Get-NetIPAddress -AddressFamily IPv4 -ErrorAction SilentlyContinue | Where-Object {
    $_.IPAddress -like "192.168.*" -and
    $_.IPAddress -notlike "192.168.56.*" -and
    $_.IPAddress -notlike "169.254.*"
  } | Select-Object -First 1 -ExpandProperty IPAddress
  return $ip
}

function Get-Mime($ext) {
  switch ($ext) {
    ".html" { "text/html; charset=utf-8" }
    ".css"  { "text/css; charset=utf-8" }
    ".js"   { "application/javascript; charset=utf-8" }
    ".json" { "application/json; charset=utf-8" }
    ".svg"  { "image/svg+xml" }
    default { "application/octet-stream" }
  }
}

function Send-Response($stream, $code, $ctype, $body) {
  $status = if ($code -eq 200) { "200 OK" } else { "404 Not Found" }
  $header = "HTTP/1.1 $status`r`nContent-Type: $ctype`r`nContent-Length: $($body.Length)`r`nConnection: close`r`n`r`n"
  $bytes = [Text.Encoding]::UTF8.GetBytes($header) + $body
  $stream.Write($bytes, 0, $bytes.Length)
  $stream.Flush()
}

$lanIp = Get-LanIP
$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Any, $port)
$listener.Start()

Write-Host ""
Write-Host "========================================"
Write-Host "  MIYU"
Write-Host "========================================"
Write-Host ""
Write-Host "  Step 1: Phone + PC same WiFi"
Write-Host "  Step 2: Open on phone:"
Write-Host ""
if ($lanIp) {
  Write-Host "    http://${lanIp}:${port}" -ForegroundColor Green
} else {
  Write-Host "    (no WiFi IP found)"
}
Write-Host ""
Write-Host "  PC: http://127.0.0.1:${port}"
Write-Host "  Keep window open. Ctrl+C to stop."
Write-Host "========================================"
Write-Host ""

while ($true) {
  $client = $listener.AcceptTcpClient()
  $stream = $client.GetStream()
  $reader = New-Object System.IO.StreamReader($stream)
  $line = $reader.ReadLine()
  if ($line -match "GET\s+(/[^\s]*)") {
    $path = $Matches[1]
    if ($path -eq "/") { $path = "/index.html" }
    $file = Join-Path $root ($path.TrimStart("/") -replace "/", "\")
    if (Test-Path $file -PathType Leaf) {
      $body = [System.IO.File]::ReadAllBytes($file)
      $ext = [System.IO.Path]::GetExtension($file).ToLower()
      Send-Response $stream 200 (Get-Mime $ext) $body
    } else {
      Send-Response $stream 404 "text/plain" ([Text.Encoding]::UTF8.GetBytes("404"))
    }
  }
  $client.Close()
}