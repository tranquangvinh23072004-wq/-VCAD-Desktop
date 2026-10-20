@echo off
cd /d "%~dp0"
powershell -ExecutionPolicy Bypass -File "%~dp0build-windows.ps1"
pause
