---
title: 'GUI Clients'
description: 'There are very GUI clients are present in market to manage and administer the MySQL databases.These are DBA control consoles which provide easy access to'
date: 2019-03-07
tags: ['mysql', 'workbench']
featured: false
---

  

There are very GUI clients are present in market to manage and administer the MySQL databases.These are DBA control consoles which provide easy access to administrative data.  
  
Some of the GUI clients are:  
  
**MySQL WorkBench**  
  

Official MYSQL GUI tool from oracle.Provides:

\-SQL development

\-Data modeling

\-Server Administration

\-Documentation library

\-DB migration assistance

  

It can be downloaded from https://dev.mysql.com/downloads/workbench 

  

To install workbench in unix server , follow the below steps:  
  
1\. Download rpm from https://dev.mysql.com/downloads/workbench/  
  

2\. Download the dependencies for workbench by using below commands:  
  
yum install epel-release  
yum install proj  
yum install tinyxml

yum install libzip  
  
3.Install the workbench and debug-info by using below commands:  
  
yum install mysql-workbench.x86\_64  
yum install mysql-workbench-debug-info.x86\_64  
  
4\. Open mysql workbench using below command  
  
#mysql-workbench  
  
5\. Once the mysql-workbench application is open, connect to the mysql server, local or remote by providing the details to connect  
  
6.In sql script file type the mysql queries to operate on the mysql databases.

  

There are some other similar GUI clients available from other vendors which can be used to administer the MySQL databases, some of them are:

  

**Navicat**\-Provides user account,system varaible,data import/export,migration,synch

https://www.navicat.com

  

**phpMyAdmin** - php based web based GUI

https://www.phpmyadmin.net/

  

**Toad** \- windows only MySQL dev tool with some admin tools including table comparision tools

http://www.toadworld.com/downloads

  

**SQLYog** -commercial windows only admin tool

Data export,import,sync,backup with scheduling,index analyzer and schema optimizer.

https://www.webyog.com/product/downloads/