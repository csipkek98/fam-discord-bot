@echo off
cls
echo ===================================================
echo   FAM-BOT: BUILD AND PUSH TO DOCKER HUB
echo ===================================================
echo.

:: Step 1: Ensure you are logged into Docker Hub on the command line
echo [1/4] Checking Docker authentication...
docker login
if %errorlevel% neq 0 (
    echo.
    echo ❌ ERROR: Docker login failed. Please sign in and try again.
    goto end
)

echo.
:: Step 2: Stop any active local running containers to avoid file locking issues
echo [2/4] Stopping local container stack...
docker-compose down

echo.
:: Step 3: Compile the fresh image using your updated JS source code files
echo [3/4] Building fresh production image layers...
docker-compose build
if %errorlevel% neq 0 (
    echo.
    echo ❌ ERROR: Docker build failed. Check your Dockerfile or code errors.
    goto end
)

echo.
:: Step 4: Securely push the new image over the 'latest' cloud tag slot
echo [4/4] Uploading 'csipkek98/fam_discord_bot:latest' to the cloud...
docker push csipkek98/fam_discord_bot:latest
if %errorlevel% neq 0 (
    echo.
    echo ❌ ERROR: Failed to push image layers to Docker Hub.
    goto end
)

echo.
echo ===================================================
echo   SUCCESS: New image is live on Docker Hub!
echo   Run your 'pull.bat' on the server to apply changes.
echo ===================================================

:end
echo.
pause