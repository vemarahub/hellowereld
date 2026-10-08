---
title: 'Resetting root password for MySQL'
description: 'In MySQL administration ,root access is critical to perform various administration tasks on the database. By any chance if the root password is lost or'
date: 2019-03-13
tags: ['mysql', 'reset-root-mysql']
featured: false
topic: 'MySQL'
order: 20
---

  
In MySQL administration ,root access is critical to perform various administration tasks on the database.  
By any chance if the root password is lost or forgotten , we can reset the root password by temporarily enabling no password access to MySQL.  
  
Follow the below steps to reset the root password:  
  
1\. We need downtime for resetting the root password ,so first stop the MySQL server  
**systemctl stop mysqld**  
2\. Provide skip-grants-table as option for enabling password less login to MySQL  
For older OS versions  
**mysqld\_safe  --skip-grant-tables &**   
or for new versions  
**systemctl set-environment MYSQLD\_OPTS="--skip-grant-tab"**  
3\. login to mysql without password  
**mysql**  
  
4\. Set a new password for root in MySQL prompt  
**update mysql.user set authentication\_string=PASSWORD('!@#Ilg007') where User='root' and Host='localhost';**  
5.Use flush privileges command to register the new password for root  
**flush privileges;**  
6\. Login with new password in new mysql session to validate if new password is working  
**mysql -u root -p**  
  
7\. Unset the skip grant table for disabling password less login to the database  
**systemctl unset-environment MYSQLD\_OPTS**  
  
8\. Check if password less login is working by using mysql  
**mysql**