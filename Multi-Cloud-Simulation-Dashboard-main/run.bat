@echo off
echo Starting Multi-Cloud Simulation Dashboard...

echo.
echo [1/2] Starting Backend...
cd backend
start "Simulation Backend" /B python -m uvicorn main:app --host 0.0.0.0 --port 8001 --reload --app-dir .
if %errorlevel% neq 0 (
    echo [ERROR] Failed to start backend.
)

echo.
echo [2/2] Starting Frontend...
cd ../frontend
echo [NOTE] Ensure 'npm install' has been run.
start "Simulation Frontend" /B npm run dev
if %errorlevel% neq 0 (
    echo [ERROR] Failed to start frontend.
)

echo.
echo Done! 
echo Backend: http://localhost:8001
echo Frontend: http://localhost:5173
echo.
echo Press any key to stop both services (if they are in this terminal's process group) or just close this window.
pause
