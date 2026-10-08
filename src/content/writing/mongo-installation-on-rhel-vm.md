---
title: 'Mongo Installation on RHEL VM'
description: 'To install mongo on a red hat VM , download the rpm files from mongo website according to the RHEL version you are using and the mongo version you want:'
date: 2019-03-20
tags: ['installation', 'mongo', 'vm', 'rhel']
featured: false
---

To install mongo on a red hat VM , download the rpm files from mongo website according to the RHEL version you are using and the mongo version you want:

https://repo.mongodb.org/yum/redhat/  
  
For my case, i am using a RHEL 7 VM here and installing mongo 4.0.6 version,  
  
1\. Download the  below rpm files from website and copy to VM  
**mongodb-org-4.0.6-1.el7.x86\_64.rpm**  
**mongodb-org-mongos-4.0.6-1.el7.x86\_64.rpm**  
**mongodb-org-server-4.0.6-1.el7.x86\_64.rpm**  
**mongodb-org-shell-4.0.6-1.el7.x86\_64.rpm**  
**mongodb-org-tools-4.0.6-1.el7.x86\_64.rpm**  

  

2.Install the rpms on the VM in the below order:  
  **a. rpm -ivh mongodb-org-shell-4.0.6-1.el7.x86\_64.rpm**  
  **b.  rpm -ivh mongodb-org-tools-4.0.6-1.el7.x86\_64.rpm**  
  **c.  rpm -ivh mongodb-org-server-4.0.6-1.el7.x86\_64.rpm**  
  **d. rpm -ivh mongodb-org-mongos-4.0.6-1.el7.x86\_64.rpm**  
  **e. rpm -ivh mongodb-org-4.0.6-1.el7.x86\_64.rpm**  

  

3.Start the mongod process to start working with mongo

**systemctl start mongod**

  

4.Check if the mongod process has started by :

**systemctl status mongod**

   _Loaded: loaded (/usr/lib/systemd/system/mongod.service; enabled)_

   _Active: active (running) since Wed 2010-09-15 04:30:14 PDT; 3min 22s ago_

  

**ps -ef |grep mongod**

_mongod     4696      1  0 04:30 ?        00:00:01 /usr/bin/mongod -f /etc/mongod.conf_  
5\. If you want to edit any default startup parameters like port, db path etc, you can do it by editing /etc/mongod.conf file and restarting mongod process by using systemctl restart mongod

  

6.Start a mongo shell to start working on mongo database

**\[root@localhost ~\]# mongo**

_MongoDB shell version v4.0.6_

_connecting to: mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb_

_Implicit session: session { "id" : UUID("036d0f9a-7fe7-4b11-9555-750f50d75dea") }_

_MongoDB server version: 4.0.6_

_\>_