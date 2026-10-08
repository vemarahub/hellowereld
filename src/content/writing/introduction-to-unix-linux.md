---
title: 'Introduction to Unix/Linux'
description: 'How does the Linux OS work? Linux has a KERNEL and one or more SHELLS The shell is the command line interface through which the user interacts with the OS'
date: 2019-04-30
tags: []
featured: false
topic: 'Linux'
order: 999
---

### **How does the Linux OS work?**

Linux has a KERNEL and one or more SHELLS  
The shell is the command line interface through which the user interacts with the OS (Kernel). Most commonly used shell is “bash”  
The Kernel sits on top of the hardware and is the core of the OS; it receives tasks from the Shell, do some actions and display the result back to user session.  

  

When we connect to Linux machine (using putty tool etc,), shell prompt displays, where commands are executed.

Eg.

_\[training@Standalone2 ~\]$_

_training is the username , Standalone2 is the hostname ( this shell prompt is customizable #echo $PS1)_

  

Each user has a home dir (Ex . /home/training). It has a profile file (Ex .bash\_profile for bash shell) (depends on your default shell used while creating the user).. Different shells are bash,ksh,csh etc. .bash\_profile (or other profile) file is executed when the user logs in . it contains settings specific to the user. You can add you environment variables or settings into this file. /etc/profile is the generic profile which is executed first for all users.

Root user is the superuser, which has special privileges . This is generally held by the system admins (for shutdown/reboot, install packages , user creation, Job scheduling etc.,)

###   
Linux File System 

  

•A directory in Linux is similar to a “Folder” in Windows OS 

•Files are organized into directories and sub-directories 

•In Linux, paths begin at the root directory which is the top-level of the file system and is represented as a forward slash ( / ) 

•Forward slash is used to separate directory and file names 

_\[training@Standalone2 /\]$ ls_

_bin   cgroup  etc   lib    lost+found  misc  net  proc  sbin     srv  tmp  var_

_boot   dev     home  lib64  media       mnt   opt  root  selinux  sys  usr_