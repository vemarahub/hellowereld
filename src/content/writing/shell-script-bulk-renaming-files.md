---
title: 'Shell Script - Bulk Renaming Files'
description: 'Script : Bulk-Renaming Files Script Name: bulkrename.sh Script Function: It takes two arguments for the text to match and replace, and a list of arguments'
date: 2020-03-24
tags: ['file-commands', 'linux', 'shell-scripting']
featured: false
topic: 'Shell Scripting'
order: 13
---

  
**Script :** Bulk-Renaming Files  
  
**Script Name:** bulkrename.sh  
  
**Script Function:** It takes two arguments for the text to match and replace, and a list of arguments specifying the files you want to rename.  
  
**Script Usage: ./**bulkrename.sh -f find -r replace FILES\_TO\_RENAME\*  
  
**Code:**  
  
#!/bin/bash  
\# bulkrename--Renames specified files by replacing text in the filename  
  
printHelp()  
{  
echo "Usage: $0 -f find -r replace FILES\_TO\_RENAME\*"  
echo -e "\\t-f The text to find in the filename"  
echo -e "\\t-r The replacement text for the new filename"  
exit 1  
}  
  
while getopts "f:r:" opt  
do  
case "$opt" in  
r ) replace="$OPTARG" ;;  
f ) match="$OPTARG" ;;  
? ) printHelp ;;  
esac  
  
done  
  
shift $(( $OPTIND - 1 ))  
  
if \[ -z $replace \] || \[ -z $match \]  
then  
echo "You need to supply a string to find and a string to replace";  
printHelp  
fi  
  
for i in $@  
do  
newname=$(echo $i | sed "s/$match/$replace/")  
mv $i $newname  
&& echo "Renamed file $i to $newname"  
done