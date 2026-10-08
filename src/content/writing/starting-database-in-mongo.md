---
title: 'Starting Database in Mongo'
description: 'To start the mongo database server on the linux machine with specific parameters for the database to start with we can use a config file , generally named as'
date: 2019-03-12
tags: ['mongo-setup', 'mongo', 'mongo-startup']
featured: false
---

  
To start the mongo database server on the linux machine with specific parameters for the database to start with we can use a config file , generally named as mongod.conf

  
The file would contain the below entry, edit the required parameters as per requirement:  
  
  

_\# mongod.conf_

_\# where to write logging data._

_systemLog:_

  _destination: file_

  _logAppend: true_

  _path: /u01/mongo/log/temp\_mongod.log_

_\# Where and how to store data._

_storage:_

  _dbPath: /u01/mongo/tempData_

  _journal:_

    _enabled: true_

_#  engine:_

_#  mmapv1:_

_#  wiredTiger:_

_\# how the process runs_

_processManagement:_

  _fork: true  \# fork and run in background_

  _pidFilePath: /u01/mongo/tempData/mongod.pid  \# location of pidfile_

  _#timeZoneInfo: /usr/share/zoneinfo_

_\# network interfaces_

_net:_

  _port: 27017_

  _#bindIp: 127.0.0.1  \# Listen to local interface only, comment to listen on all interfaces._

  _bindIp: 172.30.5.71  \# Listen to local interface only, comment to listen on all interfaces._

_#security:_

_#operationProfiling:_

_replication:_

_replSetName: rs0_

_#sharding:_

_\## Enterprise-Only Options_

_#auditLog:_

_#snmp:_

  
  
This file can be used to start the mongo database deamon by using the below command:  
  
**mongod --config mongo.conf**  
  
 We can additionally use --fork to run the service in background  
  
**mongod --config mongo.conf --fork**  
The database files created when we execute the above command and start the mongo database are:  
  
  

Journal – redo logs for crash recovery

Mongod.lock – to keep the database running

Pcat.ns – namespace file – system catalogue

Pcat.0,pcat.1 – data files , 2gb limit,automatically created and preallocated