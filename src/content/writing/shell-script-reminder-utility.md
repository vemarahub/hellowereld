---
title: 'Shell Script - Reminder Utility'
description: 'Script : Reminder Utility Script Name: remember.sh, remindme.sh Script Function: The first script, remember , lets you easily save your snippets of information'
date: 2020-03-24
tags: ['shell', 'shell-scripting', 'unix-reminder', 'unix']
featured: false
---

  
**Script :** Reminder Utility  
  
**Script Name:** remember.sh, remindme.sh  
  
**Script Function:** The first script, remember , lets you easily save  
your snippets of information into a single rememberfile in your home directory.  
If invoked without any arguments, it reads standard input until the  
end-of-file sequence (^D) is given by pressing CTRL-D. If invoked with arguments,  
it just saves those arguments directly to the data file.  
remindme, a companion shell script , either displays the contents of the whole rememberfile when no arguments are given or displays the results of searching through it using the arguments as a pattern.  
  
**Script Usage:** ./remember.sh < arg >  
                         ./remindme.sh < arg >  
  
**Code:**  
**remeber.sh**  
#!/bin/bash  
\# remember--An easy command line-based reminder pad  
rememberfile="$HOME/.remember"  
if \[ $# -eq 0 \] ; then  
\# Prompt the user for input and append whatever they write to  
\# the rememberfile.  
        echo "Enter note, end with ^D: "  
        cat - >> $rememberfile  
else  
\# Append any arguments passed to the script on to the .remember file.  
 echo "$@" >> $rememberfile  
fi  
  
exit 0  

  

**remindme.sh**

#!/bin/bash

\# remindme--Searches a data file for matching lines or, if no

\# argument is specified, shows the entire contents of the data file

rememberfile="$HOME/.remember"

if \[ ! -f $rememberfile \] ; then

        echo "$0: You don't seem to have a .remember file. " >&2

        echo "To remedy this, please use 'remember' to add reminders" >&2

        exit 1

fi

if \[ $# -eq 0 \] ; then

        # Display the whole rememberfile when not given any search criteria.

        more $rememberfile

else

        # Otherwise, search through the file for the given terms, and display

        # the results neatly.

        grep -i -- "$@" $rememberfile | ${PAGER:-more}

fi

exit 0