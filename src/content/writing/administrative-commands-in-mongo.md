---
title: 'Administrative Commands in Mongo'
description: 'The following are some of the commands that can be used for database administration for mongo. 1. getLastError db.getLastError() E11000 duplicate key error'
date: 2019-03-20
tags: ['mongo', 'mongo-commands']
featured: false
---

The following are some of the commands that can be used for database administration for mongo.  
  
**1\. getLastError**  
\> db.getLastError()  
_E11000 duplicate key error collection: sample1.test1 index: \_id\_ dup key: { : ObjectId('4c90bf054b7f54c607f6b23c') }_  

  

This command will help in getting details about the last failed command execution.For example in the above scenario an insert had failed to test1 collection since the primary key already existed for \_id field.

  

**2\. isMaster**

\> db.isMaster()  
_{_  
        _"ismaster" : true,_  
        _"maxBsonObjectSize" : 16777216,_  
        _"maxMessageSizeBytes" : 48000000,_  
        _"maxWriteBatchSize" : 100000,_  
        _"localTime" : ISODate("2019-03-20T14:44:51.434Z"),_  
        _"logicalSessionTimeoutMinutes" : 30,_  
        _"minWireVersion" : 0,_  
        _"maxWireVersion" : 7,_  
        _"readOnly" : false,_  
        _"ok" : 1_  
_}_  

  

It lets us know whether the current mongo instance we are accessing is the master instance in a replication setup of mongo.

  

**3\. Drop Collection**

\> db.items.drop()

_true_

  

It can be used to drop a specific collection from the database, as in this case collection items is dropped.

  

**4\. Server Status**

\> db.serverStatus()

_{_

        _"host" : "localhost.localdomain",_

        _"version" : "4.0.6",_

        _"process" : "mongod",_

        _"pid" : NumberLong(3817),_

        _"uptime" : 764,_

        _"uptimeMillis" : NumberLong(763716),_

        _"uptimeEstimate" : NumberLong(763),_

        _"localTime" : ISODate("2019-03-20T14:49:49.322Z"),_

        _"asserts" : {------------_

                           _------------_    

                _"storage" : {_

                        _"freelist" : {_

                                _"search" : {_

                                        _"bucketExhausted" : NumberLong(0),_

                                        _"requests" : NumberLong(0),_

                                        _"scanned" : NumberLong(0)_

                                _}_

                        _}_

                _},_

             _},_

        _"ok" : 1_

_}_

  

Server status gives a statistics on what is happening on the database.

  

**5.Run Command**

\>db.runCommand({<commandName>:value})  
\>> db.runCommand({isMaster:1})  
_{_  
        _"ismaster" : true,_  
        _"maxBsonObjectSize" : 16777216,_  
        _"maxMessageSizeBytes" : 48000000,_  
        _"maxWriteBatchSize" : 100000,_  
        _"localTime" : ISODate("2019-03-21T07:30:15.724Z"),_  
        _"logicalSessionTimeoutMinutes" : 30,_  
        _"minWireVersion" : 0,_  
        _"maxWireVersion" : 7,_  
        _"readOnly" : false,_  
        _"ok" : 1_  
_}_  

  

We can run any database administration command using the db.runCommand method.

  

**6.Current Ops**

\> db.currentOp()  
_{_  
        _"inprog" : \[_  
                _{_  
                        _"host" : "localhost.localdomain:27017",_  
                        _"desc" : "conn5",_  
                        _"connectionId" : 5,_  
                        _"client" : "127.0.0.1:33962",_  
                        _"appName" : "MongoDB Shell",_  
                        _"clientMetadata" : {_  
                                _"application" : {_  
                                        _"name" : "MongoDB Shell"_  
                                _},_  
                                _"driver" : {_  
                                        _"name" : "MongoDB Internal Client",_  
                                        _"version" : "4.0.6"_  
                                _},_  
                                _"os" : {_  
                                        _"type" : "Linux",_  
                                        _"name" : "Red Hat Enterprise Linux Server release 7.0 (Maipo)",_  
                                        _"architecture" : "x86\_64",_  
                                        _"version" : "Kernel 3.10.0-123.el7.x86\_64"_  
                                _}_  
                        _},_  
                        _"active" : true,_  
                        _"currentOpTime" : "2019-03-21T00:32:25.307-0700",_  
                        _"opid" : 16326,_  
                        _"lsid" : {_  
                                _"id" : UUID("7f3598ab-9cc1-47ec-9a2f-e81130cb7b58"),_  
                                _"uid" : BinData(0,"47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=")_  
                        _},_  
                        _"secs\_running" : NumberLong(0),_  
                        _"microsecs\_running" : NumberLong(80),_  
                        _"op" : "command",_  
                        _"ns" : "admin.$cmd.aggregate",_  
                        _"command" : {_  
                                _"currentOp" : 1,_  
                                _"lsid" : {_  
                                        _"id" : UUID("7f3598ab-9cc1-47ec-9a2f-e81130cb7b58")_  
                                _},_  
                                _"$db" : "admin"_  
                        _},_  
                        _"numYields" : 0,_  
                        _"locks" : {_  
                        _},_  
                        _"waitingForLock" : false,_  
                        _"lockStats" : {_  
                        _}_  
                _}_  
        _\],_  
        _"ok" : 1_  
_}_  

  

This method lets us know what is currently running on the server.

For performance, can check “secs\_running” parameters.

Incase of replication, secondary reading from oplog using getmore.

  

To Know total running operations:

\> db.currentOp().inprog.length

_1_

  

**7.Kill Ops**

\> db.killOp(16326)

_{ "info" : "attempting to kill op", "ok" : 1 }_

  

The method killOp() can be used kill the operation running on database using opId from currentOps.

  

**8\. Collection Stats**

\> db.items.stats()

_{_

        _"ns" : "sample1.items",_

        _"size" : 360,_

        _"count" : 10,_

        _"avgObjSize" : 36,_

        _"storageSize" : 16384,_

        _"capped" : false,_

        _"wiredTiger" : {_

                _"metadata" : {_

                        _"formatVersion" : 1_

                _},_

             _------_

                        _"nindexes" : 1,_

        _"totalIndexSize" : 16384,_

        _"indexSizes" : {_

                _"\_id\_" : 16384_

        _},_

        _"ok" : 1_

_}_

  

To know details of collections we can check that using db.coll.stats()  
  
**9.Mongo Stat**  
**#mongostat**  
_insert query update delete getmore command dirty used flushes vsize   res qrw arw net\_in net\_out conn                time_  
    _\*0    \*0     \*0     \*0       0     1|0  0.0% 0.1%       0 1.05G 90.0M 0|0 1|0   157b   62.6k    1 Mar 24 00:37:24.330_  
    _\*0    \*0     \*0     \*0       0     1|0  0.0% 0.1%       0 1.05G 90.0M 0|0 1|0   157b   62.9k    1 Mar 24 00:37:25.330_  
    _\*0    \*0     \*0     \*0       0     1|0  0.0% 0.1%       0 1.05G 90.0M 0|0 1|0   157b   62.7k    1 Mar 24 00:37:26.335_  
    _\*0    \*0     \*0     \*0       0     2|0  0.0% 0.1%       0 1.05G 90.0M 0|0 1|0   159b   63.4k    1 Mar 24 00:37:27.328_  
  
**10.Mongo Top**  
**\# mongotop**  
_2019-03-24T00:38:10.492-0700    connected to: 127.0.0.1_  
                    _ns    total    read    write    2019-03-24T00:38:11-07:00_  
  _admin.$cmd.aggregate      0ms     0ms      0ms_  
    _admin.system.roles      0ms     0ms      0ms_  
  _admin.system.version      0ms     0ms      0ms_  
 _config.system.profile      0ms     0ms      0ms_  
_config.system.sessions      0ms     0ms      0ms_  
     _local.startup\_log      0ms     0ms      0ms_  
  _local.system.replset      0ms     0ms      0ms_  
         _sample1.items      0ms     0ms      0ms_  
        _sample1.places      0ms     0ms      0ms_  
  
       _sample1.sample1      0ms     0ms      0ms_

  
  
**11. db.getLogComponents()**  
{  
        "verbosity" : 0,  
        "accessControl" : {  
                "verbosity" : -1  
        },  
        "command" : {  
                "verbosity" : -1  
        },  
        "control" : {  
                "verbosity" : -1  
        },  
        "executor" : {  
                "verbosity" : -1  
        },  
        "geo" : {  
                "verbosity" : -1  
        },  
        "index" : {  
                "verbosity" : -1  
        },  
        "network" : {  
                "verbosity" : -1,  
                "asio" : {  
                        "verbosity" : -1  
                },  
                "bridge" : {  
                        "verbosity" : -1  
                }  
        },  
        "query" : {  
                "verbosity" : -1  
        },  
        "replication" : {  
                "verbosity" : -1,  
                "heartbeats" : {  
                        "verbosity" : -1  
                },  
                "rollback" : {  
                        "verbosity" : -1  
                }  
        },  
        "sharding" : {  
                "verbosity" : -1,  
                "shardingCatalogRefresh" : {  
                        "verbosity" : -1  
                }  
        },  
        "storage" : {  
                "verbosity" : -1,  
                "recovery" : {  
                        "verbosity" : -1  
                },  
                "journal" : {  
                        "verbosity" : -1  
                }  
        },  
        "write" : {  
                "verbosity" : -1  
        },  
        "ftdc" : {  
                "verbosity" : -1  
        },  
        "tracking" : {  
                "verbosity" : -1  
        },  
        "transaction" : {  
                "verbosity" : -1  
        }  
  
}  
  
**12.db.adminCommand("getLog":"global")**

  

{

        "totalLinesWritten" : 42,

        "log" : \[

            0, $db: \\"test\\" } numYields:0 reslen:224 locks:{} protocol:op\_msg 0ms",

                "2010-09-15T04:41:57.871+0530 D INDEX    \[TTLMonitor\] deleted: 0",

                "2010-09-15T04:42:00.222+0530 I COMMAND  \[conn3\] successfully set parameter logComponentVerbosity to { index: { verbosity: 0.0 } } (was { verbosity: 1, accessControl: { verbosity: -1 }, command: { verbosity: -1 }, control: { verbosity: -1 }, executor: { verbosity: -1 }, geo: { verbosity: -1 }, index: { verbosity: 1 }, network: { verbosity: -1, asio: { verbosity: -1 }, bridge: { verbosity: -1 } }, query: { verbosity: -1 }, replication: { verbosity: -1, heartbeats: { verbosity: -1 }, 

  

**Log Message Severity Levels**

F- Fatal

E-Error

W-Warning

I-Informational(Verbosity Level 0)

D-Debug(Verbosity Level 1-5)