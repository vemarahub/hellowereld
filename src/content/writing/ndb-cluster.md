---
title: 'NDB Cluster'
description: 'NDB Cluster or Next DB Cluster in MySQL is cluster management in MySQL where multiple data nodes with multiple servers can be configured for setting up'
date: 2019-03-12
tags: ['mysql', 'mysql-ndb-cluster']
featured: false
topic: 'MySQL'
order: 17
---

  
NDB Cluster or Next DB Cluster in MySQL is cluster management in MySQL where multiple data nodes with multiple servers can be configured for setting up synchronous replica systems for critical databases.  
  
Follow below steps to setup and use NDB cluster in MySQL databases:  
  
1\. Download rpm for mysql-cluster-community.x86\_64 from web and install the rpm  
**rpm -ivh mysql-cluster-community.x86\_64**  
2.Edit the yum.repos.d to enable 7.6 version of mysql-cluster  
**vi /etc/yum.repos.d/mysql-community-server.repo**  
3.Install the dependencies of cluster package using yum install in all the servers intended for cluster management and also remove mysql-community installs if any since they will conflict with mysql-cluster installation  
**yum install epel-release**  
**yum install perl\***  
**yum remove mysql-community\***  
**yum install mysql-cluster\***  
Select one of the server as the management server for cluster and configure it as below:  
4.Create a mysql-cluster folder in /var/lib/mysql-cluster  
**mkdir /var/lib/mysql-cluster**  
5.Edit config.ini file and enter ndb entries  
  
**\[ndbd default\]**  
**#Options affecting ndbd processes on all data nodes:**  
**NoOfReplicas=2   #No. of replicas**  
**DataMemory=256M                 #Memory allocated for data storage#**  
**IndexMemory=128M               #Memory allocated for index storage**  
**datadir=/var/lib/mysql-cluster  #Directory for log files**  
**\[ndb\_mgmd\]**  
**#Management Options for the processes**  
**HostName=mgmt             #Hostname of the manager**  
**\[ndb\_mgmd default\]**  
**#Directory for MGM node log files**  
**datadir=/var/lib/mysql-cluster**  
**\[ndbd\]**  
**hostname=db01**  
**#Hostname of the 1st datanode**  
**\[ndbd\]**  
**hostname=db02**  
 **#Hostname of the 2nd datanode**  
**\[mysqld\]**  
**#SQL node options**  
**hostname=db01**  
**\[mysqld\]**  
**#SQL node options**  
**hostname=db02**  

  

  

6\. Start the management deamon using the below commands  
**ndb\_mgmd --config-file=/var/lib/mysql-cluster/config.ini**  
  
7.Open ndb console and check the current status for all nodes as below:  
**root@mgmt mysql-cluster\]# ndb\_mgm**  
**\-- NDB Cluster -- Management Client --**  
**ndb\_mgm> show**  
**Connected to Management Server at: localhost:1186**  
**Cluster Configuration**  
**\---------------------**  
**\[ndbd(NDB)\] 2 node(s)**  
**id=2 (not connected, accepting connect from db01)**  
**id=3 (not connected, accepting connect from db02)**  
**\[ndb\_mgmd(MGM)\] 1 node(s)**  
**id=1 @192.168.197.129  (mysql-5.7.25 ndb-7.6.9)**  
**\[mysqld(API)\] 2 node(s)**  
**id=4 (not connected, accepting connect from db01)**  
**id=5 (not connected, accepting connect from db02)**  

  

Follow the below steps in data nodes and server nodes other than management server in the ndb cluster to configure the nodes and establish connection

  

8\. Edit /etc/my.cnf  and add the below entry  
**ndbcluster**  
**ndb-connectstring=clusterm**  
**default\_storage\_engine=ndbcluster #Default storage engine**  
**\[mysql\_cluster\]**  
**ndb-connectstring=clusterm**  
9\. Create mysql-cluster directory in /var/lib  
**mkdir /var/lib/mysql-cluster**  
  
10.Start mysqld in all the nodes including the management server  
**systemctl start mysqld**  
11.Start the ndb deamon in all the nodes except management server  
**ndbd**  
  
12.Repeat step 7 in management server to check if all the nodes are in connected status now.  
  
13.Now we can test if the cluster is working properly by creating a database,table and inserting data in one of the nodes and check if its getting synchronously replicated to other nodes.