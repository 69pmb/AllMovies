# Set Java to 1.8
Set-Variable -Name JAVA_HOME -Value "C:\Program Files\Java\jdk1.8.0_231\bin;"
Set-Item -path env:path -force -value ($JAVA_HOME + $env:path)
java -version

if((Get-Command java | Select-Object -ExpandProperty Version).Major -ne 8) {
	Write-Host "NEED JAVA 8" -ForegroundColor Red
	exit
}

# paths variables
$dir = Get-Location
Set-Variable -Name "workspace" -Value "C:\workspace\HEAD\AllMovies"
Set-Variable -Name "outputDir" -Value "C:\workspace\HEAD\Dropbox"
Set-Variable -Name "web" -Value "\\myNas\web\AllMovies"
$isWork = Test-Path -Path $workspace
if(-not $isWork){
	Set-Variable -Name "workspace" -Value "C:\Users\Pierre-Marie\Documents\Dev\workspace\AllMovies"
    Set-Variable -Name "outputDir" -Value "C:\Users\Pierre-Marie\Dropbox\Documents\Dev"
}
$apkDir = $workspace + "\cordova\AllMovies\platforms\android\app\build\outputs\apk\debug"
cd $workspace

# build the app then build the apk
Write-Host "Build angular app" -ForegroundColor Cyan
yarn cordova
# Insert timestamp
$content = Get-Content(".\dist\index.html") -Encoding 'UTF8'
$content = $content.replace('{{timestamp}}', (Get-Date -UFormat '%d/%m/%Y %Hh%M'))
$content | out-file -Encoding 'UTF8' (".\dist\index.html")
Write-Host "Finish building" -ForegroundColor Green
rm -r -fo cordova\AllMovies\www
mkdir cordova\AllMovies\www
xcopy /q /s dist cordova\AllMovies\www
Write-Host "Finish copying" -ForegroundColor Green
cd cordova\AllMovies
Write-Host "Build apk" -ForegroundColor Cyan
cordova build android
Write-Host "Finish generating apk" -ForegroundColor Green

# Rename, move and upload the apk to dropbox
$newName = "AllMovies_" + (Get-Date -UFormat '%Y.%m.%dT%H.%M.%S') + ".apk"
Rename-Item -Path ($apkDir + "\app-debug.apk") -NewName $newName
Move-Item ($apkDir + "\" + $newName) -Destination $outputDir -force

# Logging result
if((Get-Item ($outputDir + "\" + $newName)).length -lt 2400KB) {
	Write-Host "AN ERROR OCCURRED" -ForegroundColor Red
} else {
	Write-Host "APK SUCCESSFULLY GENERATED" -ForegroundColor Green
	."nas.ps1"
	# NAS deployement
}

cd $dir
pause
