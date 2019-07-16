@ECHO OFF
call git stash
call git pull --rebase
call git stash pop
pause