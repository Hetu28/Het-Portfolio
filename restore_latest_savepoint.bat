@echo off
title Restore to Latest Save Point (2026-09-19 00:44:40)
color 0E
echo ========================================================
echo        HET PATEL PORTFOLIO - RESTORE POINT RECOVERY
echo ========================================================
echo.
echo Restoring project to Save Point: 2026-09-19 00:44:40 ...
echo.
xcopy /E /Y /I "D:\A.I\het-portfolio\.restore_points\latest\*" "D:\A.I\het-portfolio\"
echo.
echo [OK] Restore complete! Project is reverted to 2026-09-19 00:44:40.
pause
