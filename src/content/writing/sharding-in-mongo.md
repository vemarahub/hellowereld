---
title: 'Sharding in Mongo'
description: 'Sharding is the method of data distribution in a mongo database environment where the data can be partitioned into different servers on the basis of "shard'
date: 2019-03-29
tags: ['sharding', 'mongo']
featured: false
topic: 'MongoDB'
order: 21
---

Sharding is the method of data distribution in a mongo database environment where the data can be partitioned into different servers on the basis of "shard keys".  
Documents having same shard keys will be in same shards, also with within range will also be in same shards – “range-based partitioning”.  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgPU7-KmtKEymzXse0jMdOZZWYGfTYLDoUoDiQW6j9E86aKLtzMTJDhIoBpS4OVVD4YZUCex-q6tCTVy_Isnvj_8N4QdDMMaJGLHwT2BUVC2cBLhFJ-5YgnGMjwcuQFr6zbY7pDA8am79k/s640/abc.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgPU7-KmtKEymzXse0jMdOZZWYGfTYLDoUoDiQW6j9E86aKLtzMTJDhIoBpS4OVVD4YZUCex-q6tCTVy_Isnvj_8N4QdDMMaJGLHwT2BUVC2cBLhFJ-5YgnGMjwcuQFr6zbY7pDA8am79k/s1600/abc.png)

  

### Replication with Sharding

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEho6UU_EdYKcg4u_kjzsDL6bs2sYkeRPccjn-U49_iQaelpbZ9DDwIyPbB6uqEyt71RYm2PbCjQDOzF0ZsqE_4THOfraBvgCvf70uBYxq5X_Hx6iTxpGI4eC0gbUGRlBE7eoYJ4yHEjHGw/s640/aas.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEho6UU_EdYKcg4u_kjzsDL6bs2sYkeRPccjn-U49_iQaelpbZ9DDwIyPbB6uqEyt71RYm2PbCjQDOzF0ZsqE_4THOfraBvgCvf70uBYxq5X_Hx6iTxpGI4eC0gbUGRlBE7eoYJ4yHEjHGw/s1600/aas.png)

  

  

### Chunks and Operation

The data that key range refers to in a shard is known as “Chunk” ~ 100 MB each.

Two operations with data automatically done on sharding:

1. Split – split key range into two key ranges when size of chunk is too big.select mid point to data range.Inexpensive.

  

2. Migrate – To maintain balance.migrate chunk from S0 to S1 .Copy and remove from S0 then update metadata to point the chunk to S1.Not inexpensive.Thus, between a pair of nodes not more than 1 migration will be undertaken."liveliness" – no lock occurring of chunk.

  

“balancer” – decides when to do migration and where.

  

### Sharding Process

**config servers** – Small mongods .metadata of clusters are stored in this.

Usually we can have 3 config servers in prod. If config server is down, the cluster will also be down.

**mongos** – client connects to mongos to view whole cluster as single entity.No persistent state.

**mongod** – Process for data store .

  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh3imDege5h9z6gUo55h7koFYzTQqFzW54A7oeZcuHNb1rU7VqFFBZNKKou1aCh5axmfUarNHWywDfNLGEeje7GfrVKpSarARzxS6fScDMV2RBPqWDNuFaUEW_zLngk2L-kTU5CxFaHmVw/s640/aq.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh3imDege5h9z6gUo55h7koFYzTQqFzW54A7oeZcuHNb1rU7VqFFBZNKKou1aCh5axmfUarNHWywDfNLGEeje7GfrVKpSarARzxS6fScDMV2RBPqWDNuFaUEW_zLngk2L-kTU5CxFaHmVw/s1600/aq.png)

  

### Cluster Topology

Cluster Setup defines how many shards initially we should have and the replication factor.For an ideal production environment:

Initial Shards – 4

Repl factor – 3

Mongos processes – 4

Config servers – 3

  

Thus we will have :3 \* 4 = 12 mongod shard servers  
  
  

## Cardinality & Monotonic Shard Keys

  

\-          The shard key is common in queries for the collection

\-          Good ‘cardinality’/granuality

\-          Consider compound shardKeys

\-          Is the key monotonically increasing? – eg timestamp – BSON object ID do this.

  

**Shard Key Selection Example**

Either \_id

Or compound {company:1,date:1}

  

### Process and Machine Layout

  

Shard servers ( mongod –shardsvr) – replicas(RF = 3)

Config servers ( mongod –configsvr) - 3

Mongos processes ( mongos) – ideally 4

  
  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEink0tFbTACNMGzOHM34XFGp-XvMu7xxUZbPNQ9i1J5k-ISxh2ZuwVELlwJcYoeJABmwgoLblBcjy5VSwKtBzSLRafWBQnQX70jFM2B5Z9PboQuLQsZqgQlHz2IUA0WYWGnOeQQN0cupH8/s640/aqw.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEink0tFbTACNMGzOHM34XFGp-XvMu7xxUZbPNQ9i1J5k-ISxh2ZuwVELlwJcYoeJABmwgoLblBcjy5VSwKtBzSLRafWBQnQX70jFM2B5Z9PboQuLQsZqgQlHz2IUA0WYWGnOeQQN0cupH8/s1600/aqw.png)

### Bulk Insert & Pre-Splitting

On normal cases of a bulk load for a sharded cluster with shard s1, s2,s3,s4,s5 if loading is faster in s1 than other shards, it may result in data getting loaded more to s1.

  

**Pre-Splitting before Bulk Load:**

**mongos> sh.shardCollection("myDB.pre\_demo",{x:1})**

**mongos> for(var i = 0; i < 100 ; i++){**

**... sh.splitAt("myDB.pre\_demo",{x:1000000 \* i/100});**

**... }**

**mongos> db.chunks.find( { ns: /demo/ },{\_id:0,lastmodEpoch:0,lastmod:0})**

_{ "ns" : "myDB.pre\_demo", "min" : { "x" : 970000 }, "max" : { "x" : 980000 }, "shard" : "c" }_

_{ "ns" : "myDB.pre\_demo", "min" : { "x" : 980000 }, "max" : { "x" : 990000 }, "shard" : "c" }_

_{ "ns" : "myDB.pre\_demo", "min" : { "x" : 990000 }, "max" : { "x" : { "$maxKey" : 1 } }, "shard" : "c" }_

_{ "ns" : "myDB.pre\_demo", "min" : { "x" : 10000 }, "max" : { "x" : 20000 }, "shard" : "b" }_

_{ "ns" : "myDB.pre\_demo", "min" : { "x" : 20000 }, "max" : { "x" : 30000 }, "shard" : "d" }_

_{ "ns" : "myDB.pre\_demo", "min" : { "x" : 30000 }, "max" : { "x" : 40000 }, "shard" : "d" }_

_{ "ns" : "myDB.pre\_demo", "min" : { "x" : 40000 }, "max" : { "x" : 50000 }, "shard" : "b" }_

_{ "ns" : "myDB.pre\_demo", "min" : { "x" : 50000 }, "max" : { "x" : 60000 }, "shard" : "b" }_

_{ "ns" : "myDB.pre\_demo", "min" : { "x" : 60000 }, "max" : { "x" : 70000 }, "shard" : "d" }_

_{ "ns" : "myDB.pre\_demo", "min" : { "x" : 70000 }, "max" : { "x" : 80000 }, "shard" : "a" }_

_{ "ns" : "myDB.pre\_demo", "min" : { "x" : 80000 }, "max" : { "x" : 90000 }, "shard" : "b" }_

_{ "ns" : "myDB.pre\_demo", "min" : { "x" : 90000 }, "max" : { "x" : 100000 }, "shard" : "a" }_  
**Shard key selection:**  
High Cardinality(no of values), low frequency(repetitive occurrence in insert),type of change non monotonically(timestamp changes monitonically)  
  
  
**Shard is a permanent operation**  
  

·       You cannot unshard a collection once sharded

·       You cannot update the shard key of a sharded collection

  

·       You cannot update the values of the shard key for any document in the sharded collection

e

  

  

  

  

### _Tips & Best Practices_

  
• Only shard big collections  
• Pick shard keys carefully  
• Consider pre splitting on bulk load  
• Be aware of monotonically increasing shard key values on inserts  
• Adding new shard is online but isn’t instantaneous.  
• Always connect to mongos ,except for some dba work – put mongos on default port  
• Use logical config server names.  

  

**Hashed Shard Key:** index for the shard key is hashed  
db.collection.createIndex({field:”hashed”})  
chunk size – 64mb  
1 MB db.chunks.findOne()  
  
use config  
db.settings.save({\_id: "chunksize", value: 2}) in MB  
  
**Jumbo chunks** – when similar docs move into particular shard  
Cannot move jumbo chunks, Once marked as jumbo the balancer skips these and avoids trying to move them  
  
Balancer is located in primary of config server.  
  
**Start the balancer:**  
sh.startBalancer(timeout, interval)  
**Stop the balancer:**  
sh.stopBalancer(timeout, interval)  
**Enable/disable the balancer:**  
sh.setBalancerState(boolean)  
  
mongos does the query merging  
limit() and sort()are pushed to each shard by mongos then mergesorted  
skip() is applied against the merged set of results  
  
  
config database keeps a table of shard chunk relationship  
mongos keeps a cache of this relationship.scatter gather is used for query not having shard key.Thus shard key should be used in majority of queries.  
db.products.find({"sku" : 1000000749 }).explain() – stage : single shard  
  
db.products.find( {  
  "name" : "Gods And Heroes: Rome Rising - Windows \[Digital Download\]" }  
  
).explain() – stage : shard merge  

  

### All chunk migrations use the following procedure:

  
\* The balancer process sends the moveChunk command to the source shard.  
  
\* The source starts the move with an internal moveChunk command. During the migration process, operations to the chunk route to the source shard. The source shard is responsible for incoming write operations for the chunk.  
  
\* The destination shard builds any indexes required by the source that do not exist on the destination.  
  
\* The destination shard begins requesting documents in the chunk and starts receiving copies of the data. See also Chunk Migration and Replication.  
  
\* After receiving the final document in the chunk, the destination shard starts a synchronization process to ensure that it has the changes to the migrated documents that occurred during the migration.  
  
\* When fully synchronized, the source shard connects to the config database and updates the cluster metadata with the new location for the chunk.  
  
\* After the source shard completes the update of the metadata, and once there are no open cursors on the chunk, the source shard deletes its copy of the documents.