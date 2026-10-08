---
title: 'Sharding Setup in Mongo'
description: 'To setup mongo sharding environment we should be ideally having the below setups A Config Databases Replica Set of 3 or more members Multiple Shard Database'
date: 2019-03-29
tags: ['mongos', 'sharding', 'mongo', 'config']
featured: false
---

To setup mongo sharding environment we should be ideally having the below setups

  
\* A **Config** Databases Replica Set of 3 or more members  
\* Multiple **Shard** Database Replica Sets  
\* Multiple **Mongos** Database instances.  
  
To set up all the config , shard and mongos instances on a single linux server ( for a real production scenario all should be on different machines) follow the below steps:  
  
1\. Create the folders cfg0 cfg1 cfg2 for storing config database replica sets  
**mkdir cfg0 cfg1 cfg2**  
2\. Create the folders a0,a1,a2,b0,b1,b2,c0,c1,c2,d0,d1,d2 for storing shards a,b,c,d replica sets  
**mkdir a0 a1 a2 b0 b1 b2 c0 c1 c2 d0 d1 d2**  
3.Start the config server instances  
**mongod --configsvr --dbpath cfg0 --port 26050 --fork --logpath log.cfg0 --logappend --replSet cfg**  
**mongod --configsvr --dbpath cfg1 --port 26051 --fork --logpath log.cfg1 --logappend --replSet cfg**  
**mongod --configsvr --dbpath cfg2 --port 26052 --fork --logpath log.cfg2 --logappend --replSet cfg**  

  

4\. Initiate Replication in config servers

**mongo -port 26050**

**\>rs.initiate()**

**\>rs.add("localhost:26051");**

**\>rs.add("localhost:26052");**

**\>rs.status()**

5\. Start the shard servers and mongos instances

\# shard servers (mongod data servers)

\# note : not to use smallfiles on production nor such small oplogsize

**mongod --shardsvr --replSet a --dbpath a0 --logpath log.a0 --port 27000 --fork --logappend --smallfiles --oplogSize 50**

**mongod --shardsvr --replSet a --dbpath a1 --logpath log.a1 --port 27001 --fork --logappend --smallfiles --oplogSize 50**

**mongod --shardsvr --replSet a --dbpath a2 --logpath log.a2 --port 27002 --fork --logappend --smallfiles --oplogSize 50**

**mongod --shardsvr --replSet b --dbpath b0 --logpath log.b0 --port 27100 --fork --logappend --smallfiles --oplogSize 50**

**mongod --shardsvr --replSet b --dbpath b1 --logpath log.b1 --port 27101 --fork --logappend --smallfiles --oplogSize 50**

**mongod --shardsvr --replSet b --dbpath b2 --logpath log.b2 --port 27102 --fork --logappend --smallfiles --oplogSize 50**

**mongod --shardsvr --replSet c --dbpath c0 --logpath log.c0 --port 27200 --fork --logappend --smallfiles --oplogSize 50**

**mongod --shardsvr --replSet c --dbpath c1 --logpath log.c1 --port 27201 --fork --logappend --smallfiles --oplogSize 50**

**mongod --shardsvr --replSet c --dbpath c2 --logpath log.c2 --port 27202 --fork --logappend --smallfiles --oplogSize 50**

**mongod --shardsvr --replSet d --dbpath d0 --logpath log.d0 --port 27300 --fork --logappend --smallfiles --oplogSize 50**

**mongod --shardsvr --replSet d --dbpath d1 --logpath log.d1 --port 27301 --fork --logappend --smallfiles --oplogSize 50**

**mongod --shardsvr --replSet d --dbpath d2 --logpath log.d2 --port 27302 --fork --logappend --smallfiles --oplogSize 50**

  

  

\# mongos processes

**mongos --configdb "cfg/localhost:26050,localhost:26051,localhost:26052" --fork --logpath log.mongos0**

**mongos --configdb "cfg/localhost:26050,localhost:26051,localhost:26052" --fork --logpath log.mongos1 --port 26061**

**mongos --configdb "cfg/localhost:26050,localhost:26051,localhost:26052" --fork --logpath log.mongos2 --port 26062**

**mongos --configdb "cfg/localhost:26050,localhost:26051,localhost:26052" --fork --logpath log.mongos3 --port 26063**

  

6\. Start each shard replica sets

**mongo -port 27000**

**\>rs.initiate()**

**\>rs.add("localhost:27001");**

**\>rs.add("localhost:27002");**

**\>rs.status()**

  

7.After starting all the shard replica sets, add the shards using mongos

**mongos**

**\>sh.addShard("a/localhost:27000");**

**\>sh.addShard("b/localhost:27100");**

**\>sh.addShard("c/localhost:27200");**

**\>sh.addShard("d/localhost:27300");**

  
**\>sh.status();**  
_\--- Sharding Status ---_  
  _sharding version: {_  
        _"\_id" : 1,_  
        _"minCompatibleVersion" : 5,_  
        _"currentVersion" : 6,_  
        _"clusterId" : ObjectId("4c90aebc081921bcddd87de8")_  
  _}_  
  _shards:_  
        _{  "\_id" : "a",  "host" : "a/localhost:27000,localhost:27001,localhost:27002",  "state" : 1 }_  
        _{  "\_id" : "b",  "host" : "b/localhost:27100,localhost:27101,localhost:27102",  "state" : 1 }_  
        _{  "\_id" : "c",  "host" : "c/localhost:27200,localhost:27201,localhost:27202",  "state" : 1 }_  
  _active mongoses:_  
        _"4.0.6" : 4_  
  _autosplit:_  
        _Currently enabled: yes_  
  _balancer:_  
        _Currently enabled:  yes_  
        _Currently running:  no_  
        _Failed balancer rounds in last 5 attempts:  0_  
        _Migration Results for the last 24 hours:_  
                _No recent migrations_  
  _databases:_  
  
        _{  "\_id" : "config",  "primary" : "config",  "partitioned" : true }_

  
To add a database as a sharded database :  
**mongos> sh.enableSharding("mydb")**  
_{_  
        _"ok" : 1,_  
        _"operationTime" : Timestamp(1284550849, 4),_  
        _"$clusterTime" : {_  
                _"clusterTime" : Timestamp(1284550849, 4),_  
                _"signature" : {_  
                        _"hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),_  
                        _"keyId" : NumberLong(0)_  
                _}_  
        _}_  
_}_

  

Now if we check sh.status, we can see the database as being sharded and can check to which server it is sharded to :

  

  _{  "\_id" : "mydb",  "primary" : "b",  "partitioned" : true,  "version" : {  "uuid" : UUID("f35e426a-e540-439b-b9ad-7d3d042e17d2"),  "lastMod" : 1 } }_

We can even shard a particular collection of a database:

  

**mongos> sh.shardCollection("mydb.tester",{\_id:1},true)**

_{_

        _"collectionsharded" : "mydb.tester",_

        _"collectionUUID" : UUID("b0027a1d-1e0c-4769-9b65-88eecb9808fc"),_

        _"ok" : 1,_

        _"operationTime" : Timestamp(1284551103, 10),_

        _"$clusterTime" : {_

                _"clusterTime" : Timestamp(1284551103, 10),_

                _"signature" : {_

                        _"hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),_

                        _"keyId" : NumberLong(0)_

                _}_

        _}_

_}_

  

Now if we check sh.status() , we can see which sharded server is the collection chunk placed

  

 _mydb.tester_

                        _shard key: { "\_id" : 1 }_

                        _unique: true_

                        _balancing: true_

                        _chunks:_

                                _b       1_

                        _{ "\_id" : { "$minKey" : 1 } } -->> { "\_id" : { "$maxKey" : 1 } } on : b Timestamp(1, 0)_

  
  
You can also check the shards in the sharded cluster using:  
  
**mongos> db.shards.find()**  
_{ "\_id" : "a", "host" : "a/localhost:27000,localhost:27001,localhost:27002", "state" : 1 }_  
_{ "\_id" : "b", "host" : "b/localhost:27100,localhost:27101,localhost:27102", "state" : 1 }_  
_{ "\_id" : "c", "host" : "c/localhost:27200,localhost:27201,localhost:27202", "state" : 1 }_  
_{ "\_id" : "d", "host" : "d/localhost:27300,localhost:27301,localhost:27302", "state" : 1 }_  
After we insert data into a collection, we can check to which shard the data has fallen by using getLastErrorObj  
  

**mongos> db.myCol.insert({a:-1})**

_WriteResult({ "nInserted" : 1 })_

**mongos> db.getLastErrorObj()**

_{_

        _"n" : 0,_

        **_"singleShard" : "localhost:27200",_**

        _"err" : null,_

        _"ok" : 1,_

        _"$clusterTime" : {_

                _"clusterTime" : Timestamp(1524570077, 611),_

                _"signature" : {_

                        _"hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),_

                        _"keyId" : NumberLong(0)_

                _}_

        _},_

        _"operationTime" : Timestamp(1524570077, 611)_

  

_}_

  

### **Scatter/Gather**

\>db.myCol.createIndex({x:1})

\>db.myCol.find({x:1}).explain()

  

The queries that use either shard keys , or a shard key prefix, are not scatter gather.They will be targeted only at those shards that contain the documents that will be returned by the query.

Example:

For collection people , shard key : { friends:1,name:-1}.Index are : {name:1,phoneNumber:1}.

  

db.people.find({friends:”Bob”,name:”Emily”}) is not scatter / gather query

db.people.find({name:”Alice”}) is scatter gather