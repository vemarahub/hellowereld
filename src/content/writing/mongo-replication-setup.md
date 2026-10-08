---
title: 'Mongo Replication Setup'
description: 'For a statement based replication oplog file is used to apply all the transaction on the primary node to the secondary node.The default value for oplog'
date: 2019-03-25
tags: ['mongo', 'replication-steps']
featured: false
---

For a statement based replication oplog file is used to apply all the transaction on the primary node to the secondary node.The default value for oplog size(MB) is 5% of free space on disk.  
  
Follow the below steps to setup a replication environment:  
  
**1\. Create instances for primary and secondary members for the replica set in different servers.**  
On Server 1  
mkdir /usr/apps/database/db1  
  
 mongod --port 27001 --replSet abc --dbpath /usr/apps/database/db1 --logpath /usr/apps/database/log.1 --logappend --oplogSize 50 --smallfiles --fork  
  
On Server 2  
mkdir /usr/apps/database/db2  
  
 mongod --port 27002 --replSet abc --dbpath /usr/apps/database/db2 --logpath /usr/apps/database/log.2 --logappend --oplogSize 50 --smallfiles --fork  
  
On Server 3  
mkdir /usr/apps/database/db3  
  
 mongod --port 27003 --replSet abc --dbpath /usr/apps/database/db3 --logpath /usr/apps/database/log.3 --logappend --oplogSize 50 --smallfiles --fork  
  
OR  
On primary server  

$ mongod --master --oplogSize 500

  

On Other servers

  

$ mongod --slave --source localhost:27017 --port 3000 --dbpath /data/slave

  

**2.Specify Config**  

cfg = { \_id : <setName>,

Members: \[

              { \_id: 0, host:<name: port>,<options> },

              { \_id: 1, host:<name: port>,<options> },

..

\]

  

}

\> cfg = {"\_id":"abc","members":\[{\_id:0,host:"localhost:27001"},{\_id:1,host:"localhost:27002"},{\_id:2,host:"localhost:27003"}\]}

  

**3.Initiate Repl Set**

\> rs.initiate(cfg)

_{_

        _"ok" : 1,_

        _"operationTime" : Timestamp(1553514943, 1),_

        _"$clusterTime" : {_

                _"clusterTime" : Timestamp(1553514943, 1),_

                _"signature" : {_

                        _"hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),_

                        _"keyId" : NumberLong(0)_

                _}_

        _}_

_}_

  

4\. Check Replication status 

abc:PRIMARY> rs.status()

_{_

        _"set" : "abc",_

        _"date" : ISODate("2019-03-25T11:59:04.908Z"),_

        _"myState" : 1,_

        _"term" : NumberLong(1),_

        _"syncingTo" : "",_

        _"syncSourceHost" : "",_

        _"syncSourceId" : -1,_

        _"heartbeatIntervalMillis" : NumberLong(2000),_

        _"optimes" : {_

                _"lastCommittedOpTime" : {_

                        _"ts" : Timestamp(1553515136, 1),_

                        _"t" : NumberLong(1)_

                _},_

                _"readConcernMajorityOpTime" : {_

                        _"ts" : Timestamp(1553515136, 1),_

                        _"t" : NumberLong(1)_

                _},_

                _"appliedOpTime" : {_

                        _"ts" : Timestamp(1553515136, 1),_

                        _"t" : NumberLong(1)_

                _},_

                _"durableOpTime" : {_

                        _"ts" : Timestamp(1553515136, 1),_

                        _"t" : NumberLong(1)_

                _}_

        _},_

        _"lastStableCheckpointTimestamp" : Timestamp(1553515136, 1),_

        _"members" : \[_

                _{_

                        _"\_id" : 0,_

                        _"name" : "localhost:27001",_

                        _"health" : 1,_

                        _"state" : 1,_

                        _"stateStr" : "PRIMARY",_

                        _"uptime" : 4151,_

                        _"optime" : {_

                                _"ts" : Timestamp(1553515136, 1),_

                                _"t" : NumberLong(1)_

                        _},_

                        _"optimeDate" : ISODate("2019-03-25T11:58:56Z"),_

                        _"syncingTo" : "",_

                        _"syncSourceHost" : "",_

                        _"syncSourceId" : -1,_

                        _"infoMessage" : "",_

                        _"electionTime" : Timestamp(1553514955, 1),_

                        _"electionDate" : ISODate("2019-03-25T11:55:55Z"),_

                        _"configVersion" : 1,_

                        _"self" : true,_

                        _"lastHeartbeatMessage" : ""_

                _},_

                _{_

                        _"\_id" : 1,_

                        _"name" : "localhost:27002",_

                        _"health" : 1,_

                        _"state" : 2,_

                        _"stateStr" : "SECONDARY",_

                        _"uptime" : 201,_

                        _"optime" : {_

                                _"ts" : Timestamp(1553515136, 1),_

                                _"t" : NumberLong(1)_

                        _},_

                        _"optimeDurable" : {_

                                _"ts" : Timestamp(1553515136, 1),_

                                _"t" : NumberLong(1)_

                        _},_

                        _"optimeDate" : ISODate("2019-03-25T11:58:56Z"),_

                        _"optimeDurableDate" : ISODate("2019-03-25T11:58:56Z"),_

                        _"lastHeartbeat" : ISODate("2019-03-25T11:59:03.464Z"),_

                        _"lastHeartbeatRecv" : ISODate("2019-03-25T11:59:04.405Z"),_

                        _"pingMs" : NumberLong(0),_

                        _"lastHeartbeatMessage" : "",_

                        _"syncingTo" : "localhost:27001",_

                        _"syncSourceHost" : "localhost:27001",_

                        _"syncSourceId" : 0,_

                        _"infoMessage" : "",_

                        _"configVersion" : 1_

                _},_

                _{_

                        _"\_id" : 2,_

                        _"name" : "localhost:27003",_

                        _"health" : 1,_

                        _"state" : 2,_

                        _"stateStr" : "SECONDARY",_

                        _"uptime" : 201,_

                        _"optime" : {_

                                _"ts" : Timestamp(1553515136, 1),_

                                _"t" : NumberLong(1)_

                        _},_

                        _"optimeDurable" : {_

                                _"ts" : Timestamp(1553515136, 1),_

                                _"t" : NumberLong(1)_

                        _},_

                        _"optimeDate" : ISODate("2019-03-25T11:58:56Z"),_

                        _"optimeDurableDate" : ISODate("2019-03-25T11:58:56Z"),_

                        _"lastHeartbeat" : ISODate("2019-03-25T11:59:03.464Z"),_

                        _"lastHeartbeatRecv" : ISODate("2019-03-25T11:59:04.482Z"),_

                        _"pingMs" : NumberLong(0),_

                        _"lastHeartbeatMessage" : "",_

                        _"syncingTo" : "localhost:27001",_

                        _"syncSourceHost" : "localhost:27001",_

                        _"syncSourceId" : 0,_

                        _"infoMessage" : "",_

                        _"configVersion" : 1_

                _}_

        _\],_

        _"ok" : 1,_

        _"operationTime" : Timestamp(1553515136, 1),_

        _"$clusterTime" : {_

                _"clusterTime" : Timestamp(1553515136, 1),_

                _"signature" : {_

                        _"hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),_

                        _"keyId" : NumberLong(0)_

                _}_

        _}_

_}_

  

Some important properties to check from rs.status are:

OptimeDate – Time of last operation.

Heartbt- pinging & response from member.

Self : true – member talking to right now

State : 1 – up , 8 down

  

We can see all the replica set commands by using

**rs.help()**

For example:

\> db.printReplicationInfo()  # tells you how long your oplog will last

\> db.printSlaveReplicationInfo()  # tells you how far behind the slave is

  

**5\. To find current primary in the replica set**

abc:PRIMARY> rs.status().members.find(r=>r.state===1).name

_localhost:27001_  
or  
abc:PRIMARY>m = db.isMaster().ismaster

  

**6.To allow read from slave member of the replica set**

abc:SECONDARY> rs.slaveOk()

  

If primary fails ,secondary becomes primary by automatic failover and after primary comes up later, it again becomes primary.  
  
**7\. No of Roll Backs**  

db.serverStatus()\['repl'\] – rbid – no of rollbacks  
  
**8\. Add a Member**  
rs.add("abc:27014")  
  
**9\. Add an Arbiter**  
rs.addArb("abc:28000")  
  
**10\. Remove a Member**  
rs.remove("abc:28000")