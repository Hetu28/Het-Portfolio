@echo off
title Het Patel Portfolio - Backend Server
color 0B
echo ========================================================
echo        HET PATEL PORTFOLIO - EXPRESS BACKEND API
echo ========================================================
echo.
echo Starting Express Backend at http://localhost:5000...
echo.

set "PATH=D:\A.I\nodejs;D:\A.I\Git\cmd;D:\A.I\Git\Git\cmd;%PATH%"

cd /d "D:\A.I\het-portfolio\server"
npm run dev
pause
