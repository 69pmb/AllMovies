Write-Host "Deploying App" -ForegroundColor Cyan

Set-Variable -Name "web" -Value "\\myNas\web\AllMovies"
Set-Variable -Name "workspace" -Value "C:\Users\Pierre-Marie\Documents\Dev\workspace\AllMovies"

cd $web
rm -r -fo dist 

cd $workspace
Copy-Item -Force -Path dist -Destination $web -Recurse
$content = Get-Content($web + "\dist\index.html")
$content = $content.replace('file:///android_asset/www/','/')
$content | out-file ($web + "\dist\index.html")
Write-Host "APP SUCCESSFULLY DEPLOYED" -ForegroundColor Green
