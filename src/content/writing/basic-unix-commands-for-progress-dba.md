---
title: 'Basic Unix commands for Progress DBA'
description: 'Since the most used operating system for a progress database product is linux/unix/solaris as compared to windows OS, a Progress DBA is expected to have some'
date: 2017-12-14
tags: ['aix', 'file-commands', 'permsission', 'linux', 'process-management-commands', 'shortcuts', 'system-commands', 'compression', 'solaris', 'unix', 'commands']
featured: false
topic: 'Linux'
order: 999
---

Since the most used operating system for a progress database product is linux/unix/solaris as compared to windows OS, a Progress DBA is expected to have some basic knowledge of unix commands which would be helpful for the dba to troubleshoot daily basis issues.  
  
Here i am providing basic unix commands most of them would only count as pre school lessons for any unix/linux user , later will move on to some helpful commands/utlilities.  
  
**File commands:**  
  
These would be readily required by a dba, since apart from working on the progress database utility, to operate on the files in form of dumps , structure files, definition files etc a dba would be required to use these commands  
  
**1\. ls**  :Directory listing  
**2\. ls -al** :Formatted listing with hidden files  
**3\. ls -lt**: Sorting the Formatted listing by time modification  
**4\. cd dir** :Change directory to dir  
**5\. cd** :Change to home directory  
**6\. pwd** :Show current working directory  
**7\. mkdir**:dir Creating a directory dir  
**8\. cat >file**: Places the standard input into the file  
**9\. more file** :Output the contents of the file  
**10\. head file** :Output the first 10 lines of the file  
**11\. tail file**: Output the last 10 lines of the file  
**12\. tail -f file** :Output the contents of file as it grows,starting with  
the last 10 lines  
**13\. touch file**: Create or update file  
**14\. rm file**: Deleting the file  
**15\. rm -r dir** :Deleting the directory  
**16\. rm -f file** :Force to remove the file  
**17\. rm -rf dir**: Force to remove the directory dir  
**18\. cp file1 file2** :Copy the contents of file1 to file2  
**19\. cp -r dir1 dir2** :Copy dir1 to dir2;create dir2 if not present  
**20\. mv file1 file2**: Rename or move file1 to file2,if file2 is an existing  
directory  
**21\. ln -s file** :link Create symbolic link link to file  
  
  
  
**Process Management:**  
Each progress service including the instance of database runs as a process with a process id on the unix/linux OS systems.To have a track on the process and to perform various operation on the same a dba must be acquinted with process management commands.Having the right command at the right moment during a state of incidents could result in saving a lot of time and effort for the dba.  
There can be cases when a progress batch process due to programatical mistakes may go on to perform a infinite loop on the database eating up the memory and space assigned to database.  
The commands for processes can be a good tool for such instances.  
  
**1\. ps:** To display the currently working processes  
**2\. top** :Display all running process  
**3\. kill pid** :Kill the process with given pid  
**4\. killall proc:** Kill all the process named proc  
**5\. pkill pattern** :Will kill all processes matching the pattern  
**6\. bg** :List stopped or background jobs,resume a stopped  
job in the background  
**7\. fg** :Brings the most recent job to foreground  
**8\. fg n:** Brings job n to the foreground  
  
Kill command(3.kill pid)  is a very powerful unix command and could be both a savior and a trouble maker at different occasions.The use of kill command should be a judicious decision since the process we are killing might cause more damage after getting killed/evicted than it was causing running.  
  
The kill command syntax goes as  
  
kill \[ -s signal\] pid  
  
The signal provided would determine the intensity with which the kill command is executed  
  
kill -l would list all the signals which we can use with kill command.Below are various kill signals we can use as per the requirement.It is recommended not to use kill -9 for a db process though,since it is a force kill and may result in  damage to the database entities.  
  

Number

Signal Name

Description

0

SIGNULL

Used to check access to the process id

1

SIGHUP

Hup signal. Terminates the process.

2

SIGNINT

Interrupt signal. Terminating the process

3

SIGQUIT

Quit signal. Terminate process with core dump

9

SIGKILL

Forcibly killing a process

24

SIGSTOP

Pausing the process

26

SIGCONT

Runs a stopped process

  
  
**File Permission:**  
  
  
**1\. chmod octal file :** During working out with database on a unix platform we would face permission issue while trying to execute a file ,update a file or even read a file for any operation.  
Since the root login for unix system would not be provided to a dba in a genuine scenario we need to have adequate permissions of the file we require.  
chmod will change the permission of the file which would restrict the acess level for user,group,world as per the octal provided during the use of chmod command.  
eg:  
chmod 755 <filename>  will give the current user full permission to read,write and execute the file ,whereas will give the group of the user and any other user full permission to read and execute the file.  
  
The permission 755 can be understood if we look at the below break down of the octal code  
  
user    group  world  
r w x   r w x  r w x  
 7           5       5  
111       101   101  
  
In binary code representation of 7 5 5,  1 would represent true and 0 false , so we can make out for user a 755 would provide read,write and execute permission whereas for group and world it would provide read and execute permission.  
  
  
**2.chown <group:user>  <file>:**chown is used to change the ownership of the file to a particular user(either a user ID or a login name from /etc/passwd) of a particular group.This is helpful in cases when we would like to define the permission levels for a file or only want it to be used by a particluar user or group.  
  
  
  
**Searching:**  
The analyzing of log files and error files is a hectic but critical task in case of an outage or issue on the database.To speed up the analyzing part and finding the related data from chunks of log files can be achieved if the dba has a good hold on searching utilities of unix.Below are some important searching commands  
  
  
**1\. grep pattern file** :Search for pattern in file  
**2\. grep -r pattern dir** :Search recursively for pattern in dir  
**3\. command | grep pattern** :Search pattern in the output of a command  
**4\. locate file :**Find all instances of file  
**5\. find . -name filename** :Searches in the current directory (represented by a period) and below it, for files and directories with names starting with filename  
**6\. pgrep pattern :**Searches for all the named processes , that matches  
  
  
**System Info**  
  
The system commands would be used on a more frequent basis since the OS helath on which our database instance is running is equally important as the database health.The below commands can be used to extract OS level informations  
  
**1\. date** :Show the current date and time  
**2\. cal :**Show this month's calender  
**3\. uptime** :Show current uptime  
**4\. w**  :Display who is on line  
**5\. whoami** :Who you are logged in as  
**6\. finger user** :Display information about user  
**7\. uname -a:** Show kernel information  
**8\. cat /proc/cpuinfo** :Cpu information  
**9\. cat proc/meminfo** :Memory information  
**10\. man command :**Show the manual for command  
**11\. df :**Show the disk usage  
**12\. du** :Show directory space usage  
**13\. free :**Show memory and swap usage  
**14\. whereis app :**Show possible locations of app  
**15\. which app:** Show which applications will be run by default  
  
  
**Compression**  
To avoid space congestion on the system which may inturn result in choking the required space for the database to expand or function, we need to archive our old files.Compression of files present on the filesystem is the best way of archiving presently unwanted files.Following are compression commands  
  
**1\. tar cf file.tar** file Create tar named file.tar containing file  
**2\. tar xf file.tar** Extract the files from file.tar  
**3\. tar czf file.tar.gz** files Create a tar with Gzip compression  
**4\. tar xzf file.tar.gz** Extract a tar using Gzip  
**5\. tar cjf file.tar.bz2** Create tar with Bzip2 compression  
**6\. tar xjf file.tar.bz2** Extract a tar using Bzip2  
**7\. gzip file** Compresses file and renames it to file.gz  
**8\. gzip -d file.gz** Decompresses file.gz back to file  
  
  
**Shortcuts**  
  
There is no shortcut to success, but to attain efficiency in our task on a unix/linux OS shortcuts can come handy.Below are some useful shortcut commands :  
  
**1\. ctrl+c** Halts the current command  
**2\. ctrl+z** Stops the current command, resume with fg in the foreground or bg in the background  
**3\. ctrl+d** Logout the current session, similar to exit  
**4\. ctrl+w** Erases one word in the current line  
**5\. ctrl+u** Erases the whole line  
**6\. ctrl+r** Type to bring up a recent command  
**7\. !!** Repeats the last command  
**8\. exit** Logout the current session Unix/Linux