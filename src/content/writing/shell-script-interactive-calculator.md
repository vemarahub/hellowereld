---
title: 'Shell Script - Interactive Calculator'
description: 'Script : Interactive Calculator Script Name: calculator.sh Script Function:Script to run a fully interactive command line–based calculator. Script Usage:'
date: 2020-03-24
tags: ['linux-calculator', 'shell-scripting', 'unix']
featured: false
topic: 'Shell Scripting'
order: 16
---

  
**Script :** Interactive Calculator  
  
**Script Name:** calculator.sh  
  
**Script Function:**Script to run a fully interactive command line–based calculator.  
  
**Script Usage: ./**calculator.sh  
  
**Code:**  
  
#!/bin/bash  
\# calc--A command line calculator that acts as a frontend to bc  
scale=2  
  
scriptbc(){  
if \[ "$1" = "-p" \] ; then  
        precision=$2  
        shift 2  
else  
        precision=2 # Default  
fi  
bc -q -l << EOF  
scale=$precision  
$\*  
quit  
EOF  
}  
  
show\_help()  
{  
cat << EOF  
In addition to standard math functions, calc also supports:  
a % b remainder of a/b  
a ^ b exponential: a raised to the b power  
s(x) sine of x, x in radians  
c(x) cosine of x, x in radians  
a(x) arctangent of x, in radians  
l(x) natural log of x  
e(x) exponential log of raising e to the x  
j(n,x) Bessel function of integer order n of x  
scale N show N fractional digits (default = 2)  
EOF  
}  
echo "Calc--a simple calculator. Enter 'help' for help, 'quit' to quit."  
/bin/echo -n "calc> "  
while read command args  
do  
        case $command  
        in  
                quit|exit) exit 0 ;;  
                help|\\?) show\_help ;;  
                scale) scale=$args ;;  
                \*) scriptbc -p $scale "$command" "$args" ;;  
        esac  
        /bin/echo -n "calc> "  
done  
echo ""  
  
exit 0