---
title: 'MySQL Percona'
description: 'Percona is a third party tool used for taking physical backup of the entire MySQL Server to a backup path. Installation of Percona 1. Download the percona rpm'
date: 2019-03-07
tags: ['mysql', 'percona']
featured: false
topic: 'MySQL'
order: 13
---

  
  
Percona is a third party tool used for taking physical backup of the entire MySQL Server to a backup path.  
  

### **Installation of Percona**

1\. Download the percona rpm from the below path  
**https://repo.percona.com/yum/percona-release-latest.noarch.rpm**  
  
2\. Install the rpm to the server  
**rpm -ivh percona-release-latest.noarch.rpm**  
  
3\. Search the percona tool in server using yum  
**yum search percona**  
**yum list|grep percona**  
  
4\. Install the percona using yum  
  
**yum install percona-xtrabackup-24.x86\_64**  
  

### **User Addition for Percona Backup**

1\. Add new user ilg for taking percona backup  
**useradd ilg**  
2.Create a password for ilg user  
**passwd ilg**  
3.Add the ilg user to mysql group  
**gpasswd -a ilg mysql**  
  
4.Create a new folder for taking backup and give ownership to  ilg  
**mkdir -p /data/backups**  
**chown -R ilg: /data**  
  
5.Login to mysql and create a new user for taking backup and provide required privilges  
**mysql -u root -p**  
**create user 'bkpadmin'@'localhost' identified by '!@#Ilg007';**  
**grant reload,process,lock tables,replication client on \*.\* to 'bkpadmin'@'localhost';**  
  
**flush privileges;**  

### **Copy Files & Applying Logs**

1\. Use innobackupex utility to copy the mysql server completely to /data/backup/new\_data path  
**innobackupex --user=bkpadmin --password='!@#Ilg007' --notimestamp /data/backup/new\_data**  
2\. Apply latest logs to the backup path  
  
**innobackupex --apply-log /data/backup/new\_backup/2019-03-07\_03-36-23/**  
  

### **Restore**

1\. Stop the mysqld service before taking backup

**systemctl stop mysqld.service**

2\. Check for any active mysql service to verify server has been stopped

**ps -ef|grep mysql**

3.Move the existing mysql to a temp path to empty the existing mysql server path before restoration

**mkdir /tmp/mysql-l**

**mv /var/lib/mysql/\* /tmp/mysql-l**

  

4.use below command to restore the mysql server from the backup path

**innobackupex --copy-back /data/backup/new\_backup/2019-03-07\_03-36-23/**

  

5.Start the mysql service and verify the restoration

**systemctl start mysqld**