@echo off
cd C:\Users\workspace\git\AllMovies
:debut
set /p answer="1. CMD    2.Code    3. Update    4. Build    5.Deploy    6.Start  "
set "result=nothing"
IF /i "%answer%"=="1" (
	cmd.exe /K "cd ."
) else IF /i "%answer%"=="2" (
	START /MIN code .
	goto debut
) else IF /i "%answer%"=="3" (
	call git pull --rebase --autostash
	goto debut
) else IF /i "%answer%"=="4" (
	call yarn
	call yarn build
	goto debut
) else IF /i "%answer%"=="5" (
	call cordova.ps1
) else IF /i "%answer%"=="6" (
	call live-server dist
) else (
 goto debut
)