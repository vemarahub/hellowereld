---
title: 'Starting Multiple Instances in MySQL'
description: 'We can start multiple MySQL instance in the same server by running them in different ports. To configure multiple instances, 1. add the below entries in'
date: 2019-03-16
tags: ['multiple-instances', 'mysql']
featured: false
topic: 'MySQL'
order: 21
---

We can start multiple MySQL instance in the same server by running them in different ports.  
To configure multiple instances,  
  
1\. add the below entries in /etc/my.cnf  
**\[mysqld@replica01\]**  
**datadir=/var/lib/mysql-replica01**  
**socket=/var/lib/mysql-replica01/mysql.sock**  
**port=3307**  
**log-error=/var/log/mysqld-replica01.log**  
**\[mysqld@replica02\]**  
**datadir=/var/lib/mysql-replica02**  
**socket=/var/lib/mysql-replica02/mysql.sock**  
**port=3308**  
**log-error=/var/log/mysqld-replica02.log**  
  
2.Start both instances separately as below  
**systemctl start mysqld@replica01**  
**systemctl start mysqld@replica02**  
  
3.To start all the instances together we can use wildcard  
**systemctl start mysqld@replica\***  
  
4.To login to the mysql instances separately we can use the specific socket file for the instance  
**mysql -u root -p -S /var/lib/mysql-replica01/mysql.sock**  
**mysql -u root -p -S /var/lib/mysql-replica02/mysql.sock**