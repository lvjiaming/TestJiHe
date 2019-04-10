@echo off
:开始
cls
Echo 测网速
Echo.
Echo[1] 测试打开淘宝速度
Echo[2] 测试打开百度速度
Echo[3] 测试打开京东速度
Echo[4] 测试打开网易首页速度
Echo[5] 测试打开微信首页速度
Echo[6] 测试打开自定义网页速度速度
Echo[0] 退出
Echo.
Set /p clearslt= 请输入您的选择: 
If "%clearslt%"=="" Goto 开始
If "%clearslt%"=="1" goto 淘宝
If "%clearslt%"=="2" goto 百度
If "%clearslt%"=="3" goto 京东
If "%clearslt%"=="4" goto 163
If "%clearslt%"=="5" Goto wechat
If "%clearslt%"=="6" Goto 自定义
If "%clearslt%"=="7" Goto 无效
If "%clearslt%"=="8" Goto 无效
If "%clearslt%"=="9" Goto 无效
If "%clearslt%"=="0" Exit




:淘宝
cls
ping http://www.taobao.com
pause
goto 开始


:百度
cls
ping http://www.baidu.com
pause
goto 开始


:京东
cls
ping http://www.jd.com/
pause
goto 开始


:163
cls
ping http://www.163.com/
pause
goto 开始


:wechat
cls
ping http://weixin.qq.com/
pause
goto 开始


:自定义
cls
echo.
set for=于
set of=的
set with=用
set in=(以
set data:=数据
set milli-seconds:=毫秒为单位)
set Approximate=大约
set times=时间:
set round=来回
set trip=行程
set Reply=应答
set from=来自
set bytes=字节
set time=时间:
set timed=时间
set out=超过
set statistics=统计
set Packets:=包:
set Sent=已发送=
set Received=已收到=
set Lost=已丢失=
set loss)=丢失)
set Minimum=最小值=
set Maximum=最大值=
set Average=平均值=
set TTL=TTL=
setlocal enabledelayedexpansion
set a=
set/p a=请输入要ping的网址或IP 
If "%a%"=="" goto 自定义
cls
echo 测试结果
for /f "delims=" %%i in ('ping %a%') do (
set ret=
for %%a in (%%i) do if defined %%a (set ret=!ret!!%%a!) else set ret=!ret! %%a 
if not "!ret!"=="" (set ret=!ret:time=时间! && echo !ret!) else echo.
)
pause
goto 开始


:无效
cls
echo 无效选择
pause
goto 开始