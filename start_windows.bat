@echo off
setlocal
cd /d "%~dp0"
echo PROKATCHI OKA - Flask server
if not exist .venv\Scripts\python.exe (
    py -m venv .venv
    if errorlevel 1 goto :error
)
.venv\Scripts\python.exe -m pip install -r requirements.txt
if errorlevel 1 goto :error
echo.
echo Brauzerda oching: http://127.0.0.1:5000
.venv\Scripts\python.exe app.py
goto :end
:error
echo Xatolik yuz berdi. Python o'rnatilganini va internet borligini tekshiring.
pause
:end
