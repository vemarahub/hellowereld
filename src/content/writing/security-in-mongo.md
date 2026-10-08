---
title: 'Security in Mongo'
description: 'Below table would give in various security features provided by Mongo:'
date: 2019-04-09
tags: ['security', 'mongo']
featured: false
topic: 'MongoDB'
order: 25
---

Below table would give in various security features provided by Mongo:  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg9VQYXE4LVcb2kWxQojdsJjv6EwtrQT_wIskDVTZnRHr3ooNQ5rpCKTNi_33T4I334ymrV0eJ7HQTzPDi5jWzFCqC3zVyIhWzcOz9giHdTzqH86q_Ntrv62-b-xEX6LW2mxSW5xvlOYoU/s640/we.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg9VQYXE4LVcb2kWxQojdsJjv6EwtrQT_wIskDVTZnRHr3ooNQ5rpCKTNi_33T4I334ymrV0eJ7HQTzPDi5jWzFCqC3zVyIhWzcOz9giHdTzqH86q_Ntrv62-b-xEX6LW2mxSW5xvlOYoU/s1600/we.png)

  

### **Authentication**

Authentication default mechanism used is SCRAM( Salted Challenge Response Mechanism), 

basically password security.

Community version has x.509 , which uses certification for authentication

  

Enterprise includes two additional authentication mechanism LDAP & KERBEROS.

  

Mongodb also supports cluster authentication mechanism for communcation between clusters.

  

### Authorization

Mongo db uses role based access control for a high level of responsibility isolation for operational tasks.

  
We can enable authorization for a mongo instance if we use **\-auth** parameter in the startup of mongod deamon.  
  
$ **mongod --dbpath ~/db\_loc --logpath ~/sec.log --fork --auth --port 27227**  
Or we can also set authorization: "enabled" in the config file.  
  
Once started with -auth parameter we will not be able to do read/write over the databases/collection unless we have the required privileges:  
  
\> **db.foo.insert({x:1})**  
_WriteResult({_  
        _"writeError" : {_  
                _"code" : 13,_  
                _"errmsg" : "not authorized on test to execute command { insert: \\"foo\\", ordered: true, $db: \\"test\\" }"_  
        _}_  
_})_  
So before starting the database in -auth mode, we need to create a super user who would be the db admin for the mongo instance and would do the role management, administrative actions ,etc.  
  
So to enable security features in mongo follow the below steps:  
  
1\. Start the mongo database without any auth parameter.  
  
2\. Login to mongo shell and create a super user account  
_$mongo_  
_\>use admin_  
_\>db.createUser({_  
_user:"sr",_  
_pwd:"sr123",_  
_roles:\[{_  
_role:"root",db:"admin"_  
_}\]})_  
_\>exit_  
  
3.Restart the mongo server with -auth parameter  
_\>db.shutdownServer()_  
_$mongod --auth_  
4.Login using the new super user created  
_mongo -u sr -p sr123 --authenticationDatabase admin_  
  
By using this login session we can run admin commands such as:  
_listDatabases_  
_dbStats_  
_listIndexes_  
_listCollections_  
_viewUsers_  
  
We can create a normal user with read write privilege to a particular database by :  
  
1\. $_mongo -u sr -p sr123 --authenticationDatabase admin_  
  
2\. use accounts  
  
3._db.createUser({_  
_user: "gal"_  
_pwd:"galer",_  
_roles:\["readWrite"\]_  
_})_  
4\. Now we can login to a new mongo shell with the new user pass and do read write operations on the accounts database  
_$mongo -u gal -p galer --authenticationDatabase accounts_  
  
\* We can switch to another user while being in the mongo shell by using  
_\> db.auth('sr','sr123')_  
  
\* To logout from the session we can use:  
_\>db.logout()_  
  
\* To change the password for a user we can use:  
_\>db.changeUserPassword("user","pass")_  
  
  
  
  
We can create  
var me = { user: "raj" , pwd : "raj123" , roles :\[ "userAdminAnyDatabase"\]}  
var me = { user: "raj" , pwd : "raj123" , roles :\[ "dbAdminAnyDatabase"\]}  
var w = { user: "nair" , pwd : "raj123" , roles :\[ "readWriteAnyDatabase"\]}  
\> use test  
var a = { user: "maya" , pwd : "raj123" , roles :\[ "readWrite"\]}  - for access only to test database(create using user var- me)  
  
db.createUser(  
  {  
    user: "reportsUser",  
    pwd: "12345678",  
    roles: \[  
       { role: "read", db: "reporting" },  
       { role: "read", db: "products" },  
       { role: "read", db: "sales" },  
       { role: "readWrite", db: "accounts" }  
    \]  
  }  
)  
  
  
\> db.createUser(me)  
Successfully added user: { "user" : "raj", "roles" : \[ "userAdminAnyDatabase" \] }  
  
$ mongo localhost:27227/admin  -u raj –p  
  
**Roles:**  
  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhRiF2nKxmcMvAQnxVc2b1fH97gAiGJVTXO2gwm6obmyykz1gDTwpBmd81DQ78x26BT0gqCOBD3q3kQz9JJB5oONTttiBUe0ZHKCdPkUO6F5F16oDb7NadpSbOCCMHjHRPJVC7QCW7aoM0/s640/Capture.JPG)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhRiF2nKxmcMvAQnxVc2b1fH97gAiGJVTXO2gwm6obmyykz1gDTwpBmd81DQ78x26BT0gqCOBD3q3kQz9JJB5oONTttiBUe0ZHKCdPkUO6F5F16oDb7NadpSbOCCMHjHRPJVC7QCW7aoM0/s1600/Capture.JPG)

  
  
**\--keyFile <fname>** - to tell mongodb clusters to communicate among themselves using shared secret key.  
  
To provide authorization  
\> db.auth("raj","raj123")  
Users –  
• Admin User –can do administration, created in admin database,can access all databases  
• Regular User – access specific database,read/write or read only  
  
  
**SSL and KeyFiles**  
  
Key File – ensures members of clusters are legitimate.  
Auth – authentication and authorization for client.  
Scons –ssl – for encrypted data between client and shard servers and between shard servers.  
  
**Intra-Cluster Security**  
  
$mongod --dbpath /home/azureuser/data2 --port 27002 --auth --replSet z --keyFile /home/azureuser/data/keyfile --logpath /home/azureuser/data2/data.log –fork