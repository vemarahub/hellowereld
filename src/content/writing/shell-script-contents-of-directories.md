---
title: 'Shell Script - Contents of Directories'
description: 'Script : Displaying the Contents of Directories Script Name: formatdir.sh Script Function: It generates a multi column listing of files and directories,'
date: 2020-03-24
tags: ['file-commands', 'shell-scripting', 'script', 'unix']
featured: false
topic: 'Shell Scripting'
order: 12
---

  
**Script :** Displaying the Contents of Directories  
  
**Script Name:** formatdir.sh  
  
**Script Function:** It generates a multi column listing of files and directories, showing files with their sizes and directories with the number of files they contain.  
Eg:  
\# ./formatdir.sh  
calculator.sh (4KB)|  
formatdir.sh (4KB)|  
mongo (5 entries)|  
scripts (74 entries)|  
server\_t (11 entries)|  
  
**Script Usage:** ./formatdir.sh < directory path >  
  
**Code:**  

  

#!/bin/bash

\# formatdir--Outputs a directory listing in a friendly and useful format

\# Note that you need to ensure "scriptbc" (Script #9) is in your current path

\# because it's invoked within the script more than once.

#scriptbc=$(which scriptbc)

\# Function to format sizes in KB to KB, MB, or GB for more readable output

  

scriptbc(){

if \["$1" = "-p" \] ; then

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

readablesize()

{

if \[ $1 -ge 1048576 \] ; then

echo "$($scriptbc -p 2 $1 / 1048576)GB"

elif \[ $1 -ge 1024 \] ; then

echo "$($scriptbc -p 2 $1 / 1024)MB"

else

echo "${1}KB"

fi

}

#################

\## MAIN CODE

  

if \[ $# -gt 1 \] ; then

echo "Usage: $0 \[dirname\]" >&2

exit 1

elif \[ $# -eq 1 \] ; then # Specified a directory other than the current one?

        cd "$@" # Then let's change to that one.

        if \[ $? -ne 0 \] ; then # Or quit if the directory doesn't exist.

                exit 1

        fi

fi

  

for file in \*

do

        if \[ -d "$file" \] ; then

                size=$(ls "$file" | wc -l | sed 's/\[^\[:digit:\]\]//g')

                if \[ $size -eq 1 \] ; then

                        echo "$file ($size entry)|"

                else

                        echo "$file ($size entries)|"

                fi

        else

                size="$(ls -sk "$file" | awk '{print $1}')"

                echo "$file ($(readablesize $size))|"

        fi

done

sed 's/ /^^^/g' |xargs -n 2 |sed 's/\\^\\^\\^/ /g' |awk -F\\| '{ printf "%-39s %-39s\\n", $1, $2 }'

exit 0