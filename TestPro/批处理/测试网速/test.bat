@echo off
:��ʼ
cls
Echo ������
Echo.
Echo[1] ���Դ��Ա��ٶ�
Echo[2] ���Դ򿪰ٶ��ٶ�
Echo[3] ���Դ򿪾����ٶ�
Echo[4] ���Դ�������ҳ�ٶ�
Echo[5] ���Դ�΢����ҳ�ٶ�
Echo[6] ���Դ��Զ�����ҳ�ٶ��ٶ�
Echo[0] �˳�
Echo.
Set /p clearslt= ����������ѡ��: 
If "%clearslt%"=="" Goto ��ʼ
If "%clearslt%"=="1" goto �Ա�
If "%clearslt%"=="2" goto �ٶ�
If "%clearslt%"=="3" goto ����
If "%clearslt%"=="4" goto 163
If "%clearslt%"=="5" Goto wechat
If "%clearslt%"=="6" Goto �Զ���
If "%clearslt%"=="7" Goto ��Ч
If "%clearslt%"=="8" Goto ��Ч
If "%clearslt%"=="9" Goto ��Ч
If "%clearslt%"=="0" Exit




:�Ա�
cls
ping http://www.taobao.com
pause
goto ��ʼ


:�ٶ�
cls
ping http://www.baidu.com
pause
goto ��ʼ


:����
cls
ping http://www.jd.com/
pause
goto ��ʼ


:163
cls
ping http://www.163.com/
pause
goto ��ʼ


:wechat
cls
ping http://weixin.qq.com/
pause
goto ��ʼ


:�Զ���
cls
echo.
set for=��
set of=��
set with=��
set in=(��
set data:=����
set milli-seconds:=����Ϊ��λ)
set Approximate=��Լ
set times=ʱ��:
set round=����
set trip=�г�
set Reply=Ӧ��
set from=����
set bytes=�ֽ�
set time=ʱ��:
set timed=ʱ��
set out=����
set statistics=ͳ��
set Packets:=��:
set Sent=�ѷ���=
set Received=���յ�=
set Lost=�Ѷ�ʧ=
set loss)=��ʧ)
set Minimum=��Сֵ=
set Maximum=���ֵ=
set Average=ƽ��ֵ=
set TTL=TTL=
setlocal enabledelayedexpansion
set a=
set/p a=������Ҫping����ַ��IP 
If "%a%"=="" goto �Զ���
cls
echo ���Խ��
for /f "delims=" %%i in ('ping %a%') do (
set ret=
for %%a in (%%i) do if defined %%a (set ret=!ret!!%%a!) else set ret=!ret! %%a 
if not "!ret!"=="" (set ret=!ret:time=ʱ��! && echo !ret!) else echo.
)
pause
goto ��ʼ


:��Ч
cls
echo ��Чѡ��
pause
goto ��ʼ