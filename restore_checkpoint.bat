@echo off
title Het Patel Portfolio - Restore Checkpoint
echo ===================================================
echo   RESTORE POINT - HET PATEL PORTFOLIO
echo   Last Updated: 2026-09-07 15:36:16
echo ===================================================
echo.
echo WARNING: This will overwrite current working files with
echo the verified checkpoint state.
echo.
set /p confirm="Do you want to proceed? (Y/N): "
if /i not "%confirm%"=="Y" (
    echo Restore cancelled.
    pause
    exit /b
)

echo.
echo Restoring files from _checkpoints\checkpoint_parity_complete ...

xcopy /E /I /Y "_checkpoints\checkpoint_parity_complete\app" "app"
xcopy /E /I /Y "_checkpoints\checkpoint_parity_complete\components" "components"
xcopy /E /I /Y "_checkpoints\checkpoint_parity_complete\data" "data"
xcopy /E /I /Y "_checkpoints\checkpoint_parity_complete\public" "public"
xcopy /E /I /Y "_checkpoints\checkpoint_parity_complete\styles" "styles"
xcopy /E /I /Y "_checkpoints\checkpoint_parity_complete\scripts" "scripts"
xcopy /E /I /Y "_checkpoints\checkpoint_parity_complete\CV" "CV"
xcopy /E /I /Y "_checkpoints\checkpoint_parity_complete\Logos" "Logos"

copy /Y "_checkpoints\checkpoint_parity_complete\package.json" "package.json"
copy /Y "_checkpoints\checkpoint_parity_complete\package-lock.json" "package-lock.json"
copy /Y "_checkpoints\checkpoint_parity_complete\tailwind.config.ts" "tailwind.config.ts"
copy /Y "_checkpoints\checkpoint_parity_complete\next.config.mjs" "next.config.mjs"
copy /Y "_checkpoints\checkpoint_parity_complete\postcss.config.js" "postcss.config.js"
copy /Y "_checkpoints\checkpoint_parity_complete\tsconfig.json" "tsconfig.json"

echo.
echo ===================================================
echo   SUCCESS: PORTFOLIO RESTORED TO 2026-09-07 15:36:16!
echo ===================================================
pause
