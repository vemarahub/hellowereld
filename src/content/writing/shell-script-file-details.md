---
title: 'Shell Script - File Details'
description: 'Script : Displaying a File with Additional Information Script Name: showfile.sh Script Function:Script as an alternative to cat displaying a files additional'
date: 2020-03-24
tags: ['shells', 'file-commands', 'shell-scripting', 'unix']
featured: false
---

  
**Script :** Displaying a File with Additional Information  
  
**Script Name:** showfile.sh  
  
**Script Function:**Script as an alternative to cat displaying a files additional information.  
Eg: ./showfile.sh test.txt  
\-----------------------------------------------------------------  
File test.txt (3 lines, 48 characters, owned by root):  
\-----------------------------------------------------------------  
 khdkhwqkd  
 wqldkjwqldb  
 wndlwqndlbnwd';kbn';md;nl  
\-----------------------------------------------------------------  

  

**Script Usage:** ./showfile.sh < filename >  
  
**Code:**  
#!/bin/bash  
\# showfile--Shows the contents of a file, including additional useful info  
width=72  
  
fmt(){  
while getopts "hw:" opt; do  
        case $opt in  
                h ) hyph=1 ;;  
                w ) width="$OPTARG" ;;  
        esac  
done  
shift $(($OPTIND - 1))  
nroff << EOF  
.ll ${width:-72}  
.na  
.hy ${hyph:-0}  
.pl 1  
$(cat "$@")  
EOF  
exit  
}  
  
input=$1  
  
        lines="$(wc -l < $input | sed 's/ //g')"  
        chars="$(wc -c < $input | sed 's/ //g')"  
        owner="$(ls -ld $input | awk '{print $3}')"  
        echo "-----------------------------------------------------------------"  
        echo "File $input ($lines lines, $chars characters, owned by $owner):"  
        echo "-----------------------------------------------------------------"  
        while read line  
        do  
                if \[ ${#line} -gt $width \] ; then  
                        echo "$line" | fmt | sed -e '1s/^/ /' -e '2,$s/^/+ /'  
                else  
                        echo " $line"  
                fi  
        done < $input  
        echo "-----------------------------------------------------------------"  
  
exit 0