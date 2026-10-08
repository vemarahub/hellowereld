---
title: 'Galera Replication'
description: 'Galera replication is a third party open source replication utility for MySQL.Follow the below steps for setting up galera replication on all the three nodes'
date: 2019-03-15
tags: ['mysql-galera', 'mysql', 'group-master-replication']
featured: false
---

Galera replication is a third party open source replication utility for MySQL.Follow the below steps for setting up galera replication on all the three nodes intended for galera replication.:  
1.On each node create a galera repo file as /etc/yum.repos.d/galera and put the below entries  
**\[galera\]**  
**name = Galera**  
**baseurl = http://releases.galeracluster.com/galera-3/centos/7/x86\_64/**  
**gpgkey = http://releases.galeracluster.com/GPG-KEY-galeracluster.com**  
**gpgcheck = 1**  
**\[mysql-wsrep\]**  
**name = MySQL-wsrep**  
**baseurl = http://releases.galeracluster.com/mysql-wsrep-5.7.21-25.14/centos/7/x86\_64/**  
**gpgkey = http://releases.galeracluster.com/GPG-KEY-galeracluster.com**  
**gpgcheck = 1**  
2.Install galera and mysql-wsrep using the below yum install commands  
**yum install galera-3**   
**yum install mysql-wsrep-5.7**  
  
3.Edit the /etc/my.cnf file and put the below entries in the file  
**datadir=/var/lib/mysql**  
**socket=/var/lib/mysql/mysql.sock**  
**user=mysql**  
**binlog\_format=ROW**  
**bind-address=0.0.0.0**  
**default\_storage\_engine=innodb**  
**innodb\_autoinc\_lock\_mode=2**  
**innodb\_flush\_log\_at\_trx\_commit=0**  
**innodb\_buffer\_pool\_size=122M**  
**wsrep\_provider=/usr/lib64/galera-3/libgalera\_smm.so**  
**wsrep\_provider\_options="gcache.size=300M; gcache.page\_size=300M"**  
**wsrep\_cluster\_name="gmmcluster"**  
**#wsrep\_cluster\_address="gcomm://192.168.1.33:3306,192.168.1.34:3306,192.168.1.19:3306"**  
**wsrep\_cluster\_address="gcomm://192.168.1.33,192.168.1.34,192.168.1.19"**  
**wsrep\_sst\_method=rsync**  
**server\_id=1**  
**srep\_node\_address="192.168.1.33"**  
**wsrep\_node\_name="gmm-1"**  
**\[mysql\_safe\]**  
**log-error=/var/log/mysqld.log**  
**pid-file=/var/run/mysqld/mysqld.pid**  
4.In the first node run the below command to start mysql deamon in bootstrap mode  
**/usr/bin/mysqld\_bootstrap**  
5.Login to mysql prompt and run the below queries to validate if galera replication is enabled  
**show status like 'wsrep\_cluster\_size';**  
**show status like '%version%';**  
**show variables like 'innodb\_file\_format';**  
6.On second and third run , start the mysql deamon using systemctl  
**systemctl start mysqld**  
7.Now if we check we can see 3 as cluster size for wsrep\_cluster\_size query  
**show status like 'wsrep\_cluster\_size';**  
8.Create data in any of the nodes and validate if it is getting replicated in other nodes.This confirms the galera multi master replication being setup in your system.  
  
If by any chance , any one of the nodes goes down in galera replication.check the below file  
**cat /var/lib/mysql/grastate.dat**  
Whichever node doesn't come up will have safe\_to\_bootstrap as 1 in the grastate.dat file.  
On that node start bootstrap replication  
**/usr/bin/mysqld\_bootstrap**