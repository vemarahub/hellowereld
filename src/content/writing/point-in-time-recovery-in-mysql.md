---
title: 'Point in Time Recovery in MySQL'
description: 'Point in Time recovery is the recovery mechanism where we can recover a lost transaction back to our MySQL server.The transaction here might be a database or a'
date: 2019-03-13
tags: ['mysql', 'mysql-point-in-time-recovery', 'recovery', 'bin-log']
featured: false
topic: 'MySQL'
order: 10
---

Point in Time recovery is the recovery mechanism where we can recover a lost transaction back to our MySQL server.The transaction here might be a database or a table or some data which might have got lost during any power outage or by human error.  
For example if a database is dropped by an administrator or developer by mistake and we have to recover that lost database , point in time recovery can be used to perform the same.  
  
Follow the below steps to perform point in time recovery:  
  
**Pre Requisite:**  
  
In /etc/my.cnf file add the below entry to enable journaling  
**log-bin=mysql.bin**  
**server-id=1**  
Check if the logs are getting generated in /var/lib/mysql path , or check in mysql console using:  
**show binary logs;**  
**show master status;**  
Use flush logs to start log entries in a new log file  
**flush logs;**  
Once the pre requisite is met, any lost transactions can be recovered using point in time recovery by following the below steps for a case where a database "test1" has been dropped by mistake and has to be recovered:  
1\. Search the mysql.\* logs to find the transaction for creating the database "test1"  
**mysqlbinlog mysql.000001**  
**mysqlbinlog mysql.000002**  
**mysqlbinlog mysql.000003**  
  
2.Say if the transaction has been found in  mysql.000002 file, we need to find the epoch time for the particular transaction in the  mysql.000002 file and convert it to system date format.  
epoch time is the value corresponding to number of seconds from Jan 1st 1970  
lets say the epoch time converts system date : 2019-03-11 14:31  
  
3.Use mysqlbinlog utility to redirect the transactions starting from the computed time to a sql file.  
**mysqlbinlog --start-datetime="2019-03-11 14:31" mysql.000002 > /tmp/mysql-restore.sql**  
4\. Validate the  /tmp/mysql-restore.sql file to check for any transaction which is not required to be recovered and remove those transaction keeping only the transaction which has to be part of the point in time recovery  
  
5.Load the sql file to the mysql server using below command  
**mysql -u root -p < /tmp/mysql-restore.sql**  
or login to mysql prompt and use  
**source /tmp/mysql-restore.sql**  
6\. Now if you login to you mysql prompt, you can see the dropped database test1 in the MySQL server.