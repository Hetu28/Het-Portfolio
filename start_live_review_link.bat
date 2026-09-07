@echo off
title Het Patel Portfolio - Live Review Link Generator
color 0B
echo ========================================================
echo        HET PATEL PORTFOLIO - LIVE REVIEW LINK
echo ========================================================
echo.
echo Connecting to secure HTTPS tunnel for http://localhost:3000 ...
echo Share the generated URL to test on phone, tablet, or send for review!
echo.
ssh -o StrictHostKeyChecking=no -o ServerAliveInterval=30 -R 80:localhost:3000 nokey@localhost.run
pause
