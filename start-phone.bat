@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.

powershell -ExecutionPolicy Bypass -Command ^
  "$port=8765; $test=Test-NetConnection -ComputerName 127.0.0.1 -Port $port -WarningAction SilentlyContinue; if($test.TcpTestSucceeded){ $ip=(Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.IPAddress -like '192.168.*' -and $_.IPAddress -notlike '192.168.56.*'} | Select-Object -First 1 -ExpandProperty IPAddress); Write-Host '  服务已在运行，无需重复启动！' -ForegroundColor Green; Write-Host ''; if($ip){ Write-Host '  手机打开: http://' -NoNewline; Write-Host ($ip+':'+$port) -ForegroundColor Yellow } else { Write-Host '  手机打开: http://你的电脑IP:'$port }; Write-Host ''; Write-Host '  电脑打开: http://127.0.0.1:'$port; exit 0 } else { exit 1 }"

if %errorlevel%==0 (
  echo.
  pause
  exit /b 0
)

echo  正在启动服务...
echo.
powershell -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause