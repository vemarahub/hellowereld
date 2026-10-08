---
title: 'Basic Commands'
description: 'Below are the most commonly used linux commands and its purpose: && — and — or apropos — returns all documentation containing the defined command bzip/bunzip —'
date: 2020-02-21
tags: ['linux-commands']
featured: false
topic: 'Linux'
order: 7
---

  

Below are the most commonly used linux commands and its purpose:  
  
**&&** — and  
**||** — or  
**apropos** — returns all documentation containing the defined command  
**bzip/bunzip** — bzip; compresses files  
**cat** — outputs the contents of a file  
**cd** — change directory  
**chmod** — change file mode  
**chown** — change ownership  
**clear** — clears the screen  
**cp** — copy  
**\-f** Force; will overwrite any existing files with the same name  
**\-i** Interactive; will ask to overwrite  
**\-p** Preserves file ownership  
**\-r** Recursive; will copy files under directories  
**\-a** Archive; preserve symlinks  
**\-u** Copy only if original file is newer  
**cut** — manipulate data by columns  
**\-c** Range to cut \[-c2-4\]  
**\-d** Define a deliminator to use with fields  
**\-f** Return the numbered field  
**dig** – look up IP addresses and DNS names  
**env** - show environmental variables for current user  
**exit** — terminates all current processes, including shell  
**find** — locate file in system  
**.** Search in current directory  
**finger** – used to find out information regarding a user  
**free** — reports on system memory  
**grep** — search for string  
**\-i** Case insensitive  
**\-n** Include line number in output  
**groupadd** — add group  
**\-g** Group ID  
**\-p** Password  
**\-r** Create system group  
**groupmod** — modify group  
**\-g** GID  
**\-p** Password  
**gzip/gunzip** — gzip; compresses files  
**head** — output the first ten lines of a file  
**halt** — shuts down operating system  
**id** – outputs user and group IDs for a user  
**\-u** Show only UID  
**\-g** Show only GID  
**\-G** Show all groups to which a user belongs  
**\-Gn** Group name  
**if** — conditional statements in bash scripting  
**\-d** See if directory exists  
**\-e** See if file exists  
**\-f** See if file exists and it is a regular file  
**\-G** See if file exists and it is owned by a defined group  
**\-h** See if file exists and it is symlinked  
**\-L** See if file exists and it is symlinked (same as -h)  
**\-O** See if file exists and it is owned by defined UID  
**\-r** See if file exists and has read permissions  
**\-w** See if file exists and had write permissions  
**\-x** See if file can be executed  
**ifconfig** — shows NIC for network card; configures network settings  
**info** — improved manual pages  
**init 0** — shuts down operating system  
**init 6** — reboots the operating system  
**ip addr** — replaces ifconfig on newer systems  
**last** – shows last command used by defined user  
**less** — opens file in a vim-like environment for viewing  
**ln** — link files  
**\-s** Create symbolic link  
**ls** — list contents of directory  
**\-a** List all files, including hidden files  
**\-l** List files, including details such as owner and permissions  
**\-p** Adds a / to the end of directories  
**\-R** Enable recursion, including all sub-directories  
**man** — manual pages  
**1** Executable programs and shell commands  
**2** System calls for the kernel  
**3** Library calls  
**4** Device files  
**5** File formats  
**6** Games  
**7** Misc.  
**8** Programs only run by the root user  
**9** Kernel routines  
**\-k** Returns all documentation containing search keyword (apropos)  
**mv** — move; used to move or rename files  
**\-m** Set permissions mode  
**\-p** Force recursion  
netstat — shows network status  
\-a All listening and non-listening sockets  
\-i Network interface statistics  
\-l Listening sockets  
\-s Summary of each protocol  
passwd — change/set password  
\-S View password settings  
\-l Locks account  
\-u Unlocks account  
\-d Remove password  
\-n Set days before password change  
\-x Set maximum days before password change  
\-w Days to warn prior to password reset  
\-i Days to wait after expired password to disable account  
ping — test connectivity of remote network device  
ps — process status  
\-u Define user  
pwck – verifies the integrity of the password files  
pwconv – syncs /etc/passwd and /etc/shadow  
pwd — print working directory  
reboot — shuts down, then restarts the system  
route — view routing tables  
set — similar to env; works with environment variables  
sort — sorts text in file  
\-r Sort in reverse order  
\-n Sort numerically  
su – substitute user  
sudo – run command as root  
tail — outputs the last ten lines of a file  
rm — remove  
\-r Enable recursion  
rmdir — remove directory  
shutdown — shuts down the system  
\-H Halts the machine  
\-P Power off  
\-r Reboot  
\-h Equivalent to powering off, overridden by --halt  
\-k Send warning, but perform no actions  
\-c Cancel a shutdown  
su — substitute user  
tar — archives files  
\-cf Create file  
\-xf Extract file  
\-v Verbose  
\-zcf Archive with gzip  
\-jcf Archive with bzip2  
top — shows list of current applications/processes, and system usage  
h Help  
k Input process ID to kill  
r Change process priorety  
p Sort by CPU usage  
m Sort by memory usage  
touch — created empty file  
\-c Will not create file if one exists; will update timestamp  
\-d Manually set timestamp; can be used with directories  
traceroute – traces the route a packet takes  
uname — returns information related to the system  
\-s Displays kernel name  
\-n Displays hostname  
\-r Kernel release number  
\-v Kernel version number  
\-m Hardware architecture  
\-p Processor architecture  
\-i Hardware platform  
\-o Operating system  
\-a All information  
useradd — adds new user  
\-D Outputs defaults  
\-c Comment  
\-e When to expire account  
\-f Number of days after password expiration to disable account  
\-g Default group  
\-G Additional groups  
\-M Do not create home directory  
\-m Set home directory  
\-p Define password  
\-r Create system user  
\-s Set default shell  
\-u Define UID  
userdel – delete user  
**\-r** Delete home folder  
**usermod** – modify user account  
**\-c** Comment  
**\-e** Expire date  
**\-f** Days after password expiration to disable account  
**\-G** Add groups  
**\-l** Change username  
**\-L** Lock account  
**\-m** Move home directory  
**\-p** Change password  
**\-u** Set user ID  
**\-U** Unlock account  
**w** – displays user system information  
**wc** — word count  
**\-w** Count words  
**\-c** Count characters  
**whatis** — returns available man pages for command  
**which** — shows location of application  
**who** – displays who is logged in  
**\-b** Last boot time of machine  
**\-m** Hostname and associated user  
**\-r** Run level for current user  
**\-q** Number of logged-in users  
**\-a** All  
**whoami** — outputs username of current user  
**zip/unzip** — zip; compresses files