---
title: 'Shell Scripting for Progress DBA'
description: 'Now that we are familiar with the basic unix commands which would be required by a Progress DBA at various troubleshooting and day to day activity scenarios'
date: 2017-12-14
tags: ['shell-scripting', 'script', 'commands']
featured: false
---

Now that we are familiar with the basic unix commands which would be required by a Progress DBA at various troubleshooting and day to day activity scenarios while working on a non-windows operating server like unix,solaris,linux,AIX etc, the next step for a progress DBA is to acquire ability to write shell scripts for the various activities he need to perform.  
  
Shell scripting is similiar to a windows batch file which would contain commands or instruction to be run sequentially on the OS to perform the intended operation.  
  
For a progress DBA , a shell scripting skillset would  provide an option to run various commands sequentially in a batch or even schedule it to run those commands at a particular time or day.  
  
The DBA can write shell scripts to perform either an OS level activity like system health check or file creation/updation etc or he can write commands to be performed on the database for reporting/updating/processing data from database.  
  
The commands which we learnt in the previous section can be put into a single file with a .sh extention thus creating a shell script and run as a batch.  
  
Simplest example can be of a script to create a folder and copy a file into it.  
  
To perform the task manually , we would be writing each command on by one on the shell.  
  
\>cd /home/test  
\>mkdir new  
\> cp  /home/test/abc.txt /home/test/new  
  
The same can be written as a script say copy.sh and ran on shell to perform  the above 3 operations at one go.  
  
The copy.sh can be written using a vi editor, it will look like:  
  
\>vi copy.sh  
  
  
#!/bin/bash  
#############################################################################################  
\# Script                : copy.sh  
\# Description           : Script to create a new folder "new" and copy abc.txt into it  
#  
\# Input parameters      : N/A  
#  
\# Modification history  
\# Date                     Modified by     Version       Details  
\# -----------                -----------     -------       --------------------------  
#06-October-2016   Rajesh S Nair     1.0           Initial  
############  
#################################################################################  
  
HOME=/home/test  
FILE=abc.txt  
NEWFOLDER=new  
  
cd $HOME  
mkdir newfolder  
cp $HOME/$FILE $HOME/$NEWFOLDER  
  
exit 0  
  
  
The above is a standard way to write a shell script.We would start the script by mentioning which shell to use.(#!/bin/bash)  
Then we will mention the info about the script in comments section.Any line starting with # is interpreted as comment by the shell while running shell script.  
  
Then we can define variables for the values which we would be seldom using in the script and assign it to a variable name (eg:HOME=/home/test).The values stored in these variables can be retrieved by using $ sign in front of the variable name,(eg $HOME)  
  
Then we can write the commands which we had earlier written manually in shell in the correct order.  
exit 0 will terminate the shell script at end of line of shell script.  
  
The above example might have given you a vague idea about how to proceed with shell scripting.  
With better knowledge on unix commands and by using them logically in your shell scripts you can write scripts to perform much more complex and huge set of opertaions and can use them further to avoid repetition of work and reduce work load for yourself.  
  
For a progress dba writing a shell script is a very useful tool to reduce the redundancy in his work.