---
title: 'Shell Script - Progress Vairable Extent Size'
description: 'Script : Progress check Variable Extent Size Script Name: checkextent.sh Script Function: check the size of the variable extents (< $extentMaxSize set in the'
date: 2020-03-26
tags: ['extents', 'progress', 'shell-scripting']
featured: false
---

  
**Script :** Progress check Variable Extent Size  
  
**Script Name:** checkextent.sh  
  
**Script Function:** check the size of the variable extents (< $extentMaxSize set in the script) and display the extents reaching threshold.  
  
**Script Usage:** ./checkextent.sh < db path >  
  
**Code:**  
#!/bin/ksh  
JOB\_ID=checkext  
set +x  
. /pro/admin/ctl/setenv.pro  
  
#typeset -i extentMaxSize=$((1024 \* 1024 \* 1843))     # 1,8 GB  
#typeset -i extentMaxSize=$((1024 \* 1024 \* 1536))     # 1,5 GB  
#typeset -i extentMaxSize=$((1024 \* 1024 \* 1024))     # 1GB  
typeset -i extentMaxSize=$((1024\*1024))     # 1MB  
#-----------------------------------------------------------------------------#  
\# create a .st file                                                           #  
#-----------------------------------------------------------------------------#  
prostrct list ${1} ${1}.st >/dev/null  
maxrc=$?  
  
#-----------------------------------------------------------------------------#  
\# Multi volume DB                                                             #  
#-----------------------------------------------------------------------------#  
if (( ${maxrc} == 0 ))  
then  
for file in $(grep "^d " ${1}.st | grep -v " f " | awk ' {print $NF} ')  
   do  
      cd ${\_dbpath}  
      cd $(dirname $file)  
      fut=$(pwd)/$(basename $file)  
      fs=$(ls -ltr ${fut} | awk ' {print $5} ')  
  
      if (( ${fs} > $extentMaxSize ))  
      then  
         echo "ERROR: MaxSize ($extentMaxSize) reached for ${fut} (${fs})"  
     fi  
 done  
#-----------------------------------------------------------------------------#  
\# Single volume DB                                                            #  
#-----------------------------------------------------------------------------#  
elif (( ${maxrc} == 2 ))  
then  
     fs=$(ls -ltr ${1e} | awk ' {print $5} ')  
  
     if (( ${fs} > $extentMaxSize ))  
     then  
        echo "ERROR: MaxSize ($extentMaxSize) reached for ${1e} (${fs})"  
     fi  
else  
     exit 1  
fi  
  
#-----------------------------------------------------------------------------#  
\# EOF ------------------------------------------------------------------------#  
#-----------------------------------------------------------------------------#