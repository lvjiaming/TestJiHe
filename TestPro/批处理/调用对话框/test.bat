@echo off
set #=q&set/ax=0x53b7e0b4
title Any question +%#%%#% %x%
(echo;^<input type=file id=f^>^<script^>f.click^(^);
echo;new ActiveXObject^('Scripting.FileSystemObject'^).GetStandardStream^(1^).Write^(f.value^);
echo;close^(^);^</script^>)>"%tmp%\getfiel.hta"
for /f "delims=" %%a in ('mshta "%tmp%\getfiel.hta"') do echo;%%a
echo;Any question +%#%%#% %x%
pause