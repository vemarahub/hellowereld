---
title: 'Basic Prompt Commands'
description: 'To login to a particular database use the below command: mysql -u root -p <dbname To connect to mysql server installed on a remote machine mysql -u root -p'
date: 2019-03-07
tags: ['mysql', 'mysql-commands']
featured: false
---

  
  
  
To login to a particular database use the below command:  
  
**mysql -u root -p <dbname>**  
To connect to mysql server installed on a remote machine  
  
**mysql -u root -p <dbname> -h 192.168.1.200**  
**Create Database**  
To create a new database in the mysql server , login to mysql prompt and use:  
  
**mysql> create database publications;**  
**mysql>** **show databases;**  
**mysql> use publications;**  
**select database();**  
**select user();**  
  
**select version();**  
**Establish Remote Connection**  
**ON VM1**  
systemctl stop firewalld  
systemctl disable firewalld  
ifconfig  
  
mysql -u root -p  
grant all on publications.\* to 'ilg'@'192.168.197.130' identified by 'My20SQL@2019';  
  
**ON VM2**  
ifconfig  
su  
yum install mariadb.x86\_64  
  
mysql -h '192.168.197.131' -u ilg -p