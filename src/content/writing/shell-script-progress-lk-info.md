---
title: 'Shell Script - Progress lk info'
description: 'Script : Progress database lk file information Script Name: lkinfo.sh Script Function: Information about the database status from lk file Script Usage:'
date: 2020-03-30
tags: ['lk-file', 'progress', 'shell-scripting']
featured: false
---

  
**Script :** Progress database lk file information  
  
**Script Name:** lkinfo.sh  
  
**Script Function:** Information about the database status from lk file  
**Script Usage:** ./lkinfo.sh < db path >  
  
**Code:**  
#Info - script to check the contents of .lk file  
  
lkFile=$1".lk"  
  
GetLong()  
{  
\# Returns 4-byte unsigned integer.  
  File=$1  
  Offset=$2  
  
\# od -D  Interpret long words in unsigned decimal:  
  od -D $File | \\  
  awk '{ printf"%d",$2; exit }'  
} # GetLong()  
  
if \[ -f $lkFile \]  
then  
  
\# Database mode:  
lkMode=\`GetLong $lkFile 0\`  
case $lkMode in  
  1) Desc="Single-user mode";;  
  2) Desc="Multi-user mode" ;;  
 64) Desc="Crash recovery"  ;;  
  \*) Desc="Unknown mode"    ;;  
esac  
  
\# ID of the process that opens database:  
lkPID=\`GetLong $lkFile 4\`  
  
\# Host where the process is running:  
lkHost=\`tail $lkFile\`  
  
echo "Database mode: $lkMode ($Desc)"  
echo "Opened by PID: $lkPID"  
echo "      On Host: $lkHost"  
echo "    This host: \`uname -n\`"  
ps -fp $lkPID || echo "Process PID=$lkPID not found."  
  
else  
  echo "lk file not found"  
  if \[ -f $1".db" \]  
  then  
   echo " Database $1 is down or in Single User mode"  
  else  
   echo "Database $1 does not exist"  
   fi  
  
 exit 0  
  
fi