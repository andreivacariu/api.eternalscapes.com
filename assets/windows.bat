@ECHO off
SETLOCAL
SET "HOSTS_FILE=%WinDir%\System32\drivers\etc\hosts"
SET "TEMP_HOSTS_FILE=%TEMP%\%RANDOM%__hosts"

GOTO intro
:intro

echo "  ______ _______ ______ _____  _   _          _       _____    _____          _____  ______  _____ "
echo " |  ____|__   __|  ____|  __ \| \ | |   /\   | |     / ____|  / ____|   /\   |  __ \|  ____|/ ____|"
echo " | |__     | |  | |__  | |__) |  \| |  /  \  | |    | (___   | |       /  \  | |__) | |__  | (___  "
echo " |  __|    | |  |  __| |  _  /| . ` | / /\ \ | |     \___ \  | |      / /\ \ |  ___/|  __|  \___ \ "
echo " | |____   | |  | |____| | \ \| |\  |/ ____ \| |____ ____) | | |____ / ____ \| |    | |____ ____) |"
echo " |______|  |_|  |______|_|  \_\_| \_/_/    \_\______|_____/   \_____/_/    \_\_|    |______|_____/ "
                                                                                                   
                                                                                                  
    GOTO permissions

:options

    ECHO Type one of the following (use the number)
    ECHO 1) Install (Install Eternals Capes on this computer)
    ECHO 2) UnInstall (Remove Eternals Capes from the computer)
    ECHO 3) Exit (Close this application)
    SET /p choice=Type the number representing an option:

    if '%choice%'=='' (
        ECHO "%choice%" is not valid please try again
        GOTO options
    )
    if '%choice%'=='1' GOTO install
    if '%choice%'=='2' GOTO uninstall
    if '%choice%'=='3' EXIT

:permissions

    REG ADD HKLM /F>nul 2>&1
    if %ERRORLEVEL% == 0 (
        GOTO options
    ) else (
        ECHO ---------------------------------------------------------
        ECHO NO ADMIN PERMISSIONS
        ECHO ---------------------------------------------------------
        ECHO You did not run this with Admin permissions please run 
        ECHO it again but with Admin permission. To do so right click
        ECHO this file and click "Run as administrator"
        PAUSE
        EXIT
    )

:install
    FINDSTR /V "174.138.102.12 s.optifine.net # INSERTED BY ETERNALS CAPES" "%HOSTS_FILE%" > "%TEMP_HOSTS_FILE%"
    ECHO 174.138.102.12 s.optifine.net # INSERTED BY MINECRAFT CAPES >> "%TEMP_HOSTS_FILE%"
    COPY /b/v/y "%TEMP_HOSTS_FILE%" "%HOSTS_FILE%"
    ECHO Install Complete
    PAUSE
    EXIT

:uninstall
    FINDSTR /V "174.138.102.12 s.optifine.net # INSERTED BY ETERNALS CAPES" "%HOSTS_FILE%" > "%TEMP_HOSTS_FILE%"
    COPY /b/v/y "%TEMP_HOSTS_FILE%" "%HOSTS_FILE%"
    ECHO UnInstall Complete
    PAUSE
    EXIT
