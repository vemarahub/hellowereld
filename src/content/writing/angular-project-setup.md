---
title: 'Angular Project Setup'
description: 'The below steps will help to setup a new project in angular js to develop an angular js based project. 1. Check if your system has already node js by using'
date: 2020-04-03
tags: ['angular', 'development', 'java', 'programming']
featured: false
---

  
The below steps will help to setup a new project in angular js to develop an angular js based project.  
  
**1.** Check if your system has already node js by using below command on command prompt:  
ng -version  
  
**2.** If its not installed , install node js from nodejs.org website using msi file and check step 1 to confirm the installation.  
  
**3.** Install a text editor like visual studio code from visual studio website  
  
**4\.** install angular cli globally using below command on command prompt:  
npm install -g @angular/cli  
  
**5.** Open visual studio and press ctrl + ~ to open built in terminal after opening the folder where you want to create new angular project.  
  
**6\.** Type the below command on the visual studio terminal:  
ng new TaskManager --skip-install --routing  
  
**7.** After this command executes we can see the folder in workspace with default folder structure.Open the project Task Manager folder in visual studio  
npm install  
  
**8\.** To run the application on default browser open visual studio terminal and execute:  
ng serve --open  
  
**9\.** You can see the application running on localhost:4200 .You can terminate ng serve by typing ctrl+C twice.