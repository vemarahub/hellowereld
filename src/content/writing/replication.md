---
title: 'Replication'
description: 'Follow the below steps to configure MySQL Replication in the Linux servers : 1. For VM systems firewall has to be disabled to enable replication connections'
date: 2019-03-08
tags: ['mysql-replication', 'mysql']
featured: false
topic: 'MySQL'
order: 999
---

  
  
Follow the below steps to configure MySQL Replication in the Linux servers :  
  
1\. For VM systems firewall has to be disabled  to enable replication connections between the servers  
**cat /etc/selinux/config**  
**set SELINUX = disabled**  
2\. Check selinux status by using:  
**sestatus**  
  
3\. Stop and disable firewalld  
**systemctl stop firewalld**  
**systemctl disable firewalld**  
4\. Set hostname for the two VMs to identify uniquely  
**hostnamectl set-hostname db01**  
**hostnamectl set-hostname db02**  
5\. Edit hosts file to add ip and hostname  
**/etc/hosts**  
**<ip> db01**  
**<ip> db02**  
6\. Follow the below steps on master and slave as below:  
  
**ON MASTER**  
**\--------------**  
7\. grant slave access to a new replication user  
**mysql -u root -p**  
**prompt master>**  
**grant replication slave on \*.\* to 'repadmin'@'%' identified by '!@#Ilg007';**   
**flush privileges;**  
  
8\. Ediy my.cnf file to add replication parameters on Master  
**vi /etc/my.cnf**  
**#Replication Parameters**  
**bind-address=0.0.0.0**  
**server-id=1**  
**log-bin=mysql-bin**  
**binlog-ignore-db="mysql"**  
  
9\. Restart mysqld server  
**systemctl stop mysqld**  
**systemctl start mysqld**  
**tail /var/log/mysqld.log**  
  
10\. Dump database from master to copy to slave to provode initial sync  
**mysqldump -u root -p --databases publications > publications.sql**  
**scp publications.sql db02:/root**  
  
**ON SLAVE**  
**\-----------**  
11\. ssh to second VM from first VM and set prompt as slave  
**ssh db02**  
**prompt slave>**  
  
12\. Edit my.cnf file to add replication parameters and restart mysqld server  
**vi /etc/my.cnf**  
  
**#Replication parameters**  
**bind-address=0.0.0.0**  
**server-id=2**  
**#master-host=db01**  
**#master-user=repadmin**  
**#master-password=!@#Ilg007**  
**#master-connect-retry=60**  
**systemctl stop mysqld**  
**systemctl start mysqld**  
  
13\. Restore th master database to slave after scp  
**slave>create database publications;**  
**mysql -u root -p -D publications < publications.sql**  
  
14\. Use the below query in mysql prompt setup replication parameters  
**change master to master\_host='db01',**  
**master\_port=3306,master\_user='repadmin',master\_password='!@#Ilg007';**  
  
15\. Start slave on MySQL prompt  
**start slave;**  
  
16\. Check slave status to see of syncing has started on slave  
**show slave status;**  
17\. Login to master and create a new table and add entries and check in slave if it is getting added through replication  
  
Some other commands used are:  
flush logs  
show binlog events  
show master status  
show master logs  
reset master  
reset slave  

#### 

The logs which are used for replication are called binary logs in master and relay logs on slave.

replication user account will pull up bin logs and write to slave relay logs for replication to take 

place.Multiple binary files created one after another when size reaches.

  

When a statement is about to finish executing , it writes an entry to the end of the binary log and sends the statement parser a notification that it has completed statement.

  

#### **Types of replication**

  
**Statement Based** - (SBR) - whichever sql statements executed in master is executed in slave as well using bin logs  
**Row Based**\- where each row updated in master is copied to slave row by row  
**Mix -** This is mixed type of replication which contains both statement based and row based replication.  
  
  

#### **Replication Topology**

\-Master to multiple replica  
\-Master to Master in active active mode  
\-Master to Master with slaves  
\-Does not support multisource replication  
\-Ring Replication  
\-Master distribution master with replicas  
  
Percona tool kit can be used for managing replication in MySQL servers.Some commands for percona tool are:  
percona tool kit - pt-table-checksum  
pt-table-checksum --replica-set  
pt-table-sync