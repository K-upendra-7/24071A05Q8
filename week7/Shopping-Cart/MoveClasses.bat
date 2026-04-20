@echo off
set SRC=C:\Upendra\Programs\eclipse-workspace1\Shopping-Cart\src\main\ImportedClasses
set DEST=C:\Upendra\Programs\eclipse-workspace1\Shopping-Cart\src\main\webapp\WEB-INF\classes

echo Creating destination directory (WEB-INF/classes) if it doesn't exist...
mkdir "%DEST%" 2>nul

echo Copying all pre-compiled classes to WEB-INF/classes...
xcopy "%SRC%\*" "%DEST%\" /E /I /Y

echo.
echo Success! The .class files have been placed where Tomcat expects them.
echo You can now close this window, restart Tomcat in Eclipse, and your 404 errors should be fixed.
pause
