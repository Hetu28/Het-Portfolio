@echo off
title Het Patel Portfolio - Dev Server
color 0E
echo ========================================================
echo        HET PATEL FILMMAKER PORTFOLIO - DEV SERVER
echo ========================================================
echo.
echo Starting Next.js development server at http://localhost:3000...
echo.

set "PATH=D:\A.I\nodejs;D:\A.I\Git\Git\cmd;%PATH%"

start http://localhost:3000
npm run dev
pause
