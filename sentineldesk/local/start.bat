@echo off
rem SentinelDesk: start everything on this computer (Windows). Double-click to run.
setlocal
cd /d "%~dp0"

set "PY=python"
where py >nul 2>nul && set "PY=py -3"
if not exist ".venv\Scripts\python.exe" (
  echo First start: getting things ready ^(about a minute^)...
  %PY% -m venv .venv || goto :nopython
)
".venv\Scripts\python.exe" -m pip install --quiet --disable-pip-version-check -r requirements.txt || goto :failed

set "PULL="
where ollama >nul 2>nul && set "PULL=--pull"
if not defined PULL (
  echo Ollama ^(the free local AI engine^) isn't installed, so SentinelDesk will use its built-in rules for now.
  echo Install it from https://ollama.com/download, then run start.bat again.
)

".venv\Scripts\python.exe" run.py --open %PULL% %*
goto :eof

:nopython
echo SentinelDesk needs Python 3.10 or newer: https://www.python.org/downloads/
pause
goto :eof

:failed
echo Something went wrong while installing. See the messages above.
pause
