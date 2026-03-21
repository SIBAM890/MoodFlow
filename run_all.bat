@echo off
echo ===================================================
echo 🌿 Starting Mood Flow Analytics & Services...
echo ===================================================

echo [1/4] Starting Backend Core (Identity Vault)...
start "Backend Core" cmd /c "cd backend-core && echo Starting Backend Core... && uvicorn app.main:app --port 8000 --reload"

echo [2/4] Starting Backend AI (NLP Brain)...
start "Backend AI" cmd /c "cd backend-ai && echo Starting Backend AI... && python run.py"

echo [3/4] Starting Voice Analysis Service...
start "Voice Analysis" cmd /c "cd voice-analysis && echo Starting Voice Analysis Service... && uvicorn main:app --port 8001 --reload"

echo [4/4] Starting Frontend Web App...
start "Frontend" cmd /c "cd frontend && echo Starting Frontend UI... && npm run dev"

echo.
echo ✅ All services have been started in separate windows!
echo It might take a few seconds for all severs to be ready.
echo Frontend should automatically open or be available at http://localhost:5173 
echo.
pause
