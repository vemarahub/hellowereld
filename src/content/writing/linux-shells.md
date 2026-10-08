---
title: 'Linux Shells'
description: 'Using the Bourne Again Shell The Bourne Again Shell is usually just referred to as a Bash shell. It basically allows to enter Linux commands. In the Gnome'
date: 2020-02-19
tags: ['shells', 'linux', 'bash']
featured: false
topic: 'Shell Scripting'
order: 999
---

**Using the Bourne Again Shell**   
 The Bourne Again Shell is usually just referred to as a Bash shell. It basically allows to enter Linux commands. In the Gnome desktop environment, to get to the Bash shell, begin by clicking the Applications menu in the upper left, then choose Favorites and under that,click Terminal. Once in the Terminal window, type echo $ SHELL to display the contents of the shell variable. It returns /bin/bash. So this is telling us that our current shell is in fact a Bash shell.  
  
**Manipulating Files and** **Directories**  
One of the most often issued commands in Linux is Is, or list. When you type Is, it shows the files and directories in that location. You could type Is -R to recursively list everything in every subdirectory starting from the current position. Is can also be used with the name of a subdirectory. In this case, for example,if you type Is /usr/local the contents of that specified directory is displayed. special shortcut symbols such as Is ~.The tilde(~) is a symbol that stands for current user's home directory. you can  use Is -lt. The "t" allows to view files by modification time whereby the most  recent ones are at the top of the list.  
If you try it out by typing Is -l / etc. What happens is it shows the contents within the etc directory instead of showing the etc directory itself in long listing format. So to remedy this, we'll have to type Is -ld. The d will treat this as a directory entry and show me the details the long listing for the entry instead of the contents of the directory.  
We can also make directories at the command line using the mkdir command. We can also use mkdir with the -p switch to create an entire directory path into single command. For example mkdir -p /budgets/2016. Not only will it have created the budgets directory, but in it, it will have also created 2016.