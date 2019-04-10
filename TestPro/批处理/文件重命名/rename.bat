@echo off

set a=100

setlocal EnableDelayedExpansion

for %%n in (*.txt) do (

set /A a+=1

ren "%%n" "нд╪Ч!a!.txt"

)