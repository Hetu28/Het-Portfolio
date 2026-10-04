@echo off
title Het Patel Portfolio - Save Checkpoint
echo ===================================================
echo   SAVING PORTFOLIO CHECKPOINT & RESTORE POINT
echo ===================================================
echo.
echo Current Timestamp: %date% %time%
echo Saving state to _checkpoints\checkpoint_parity_complete ...
echo.

set PATH=D:\A.I\nodejs;D:\A.I\Git\Git\cmd;%PATH%
node "D:\A.I\het-portfolio\scripts\save_checkpoint_now.js"

echo.
echo ===================================================
echo   CHECKPOINT SAVED & RESTORE POINT UPDATED!
echo ===================================================
pause
