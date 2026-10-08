---
title: 'Arbiters,Oplog,Write Concern in Mongo Replication'
description: 'Read Preference a.k.a “slaveOk”. In shell - rs.slaveOk() In driver – read preference Secondary can have potentially stale data due to lag in write from primary'
date: 2019-03-26
tags: ['replication', 'write-concern', 'oplog', 'mongo']
featured: false
topic: 'MongoDB'
order: 19
---

### 

### **Read Preference**

a.k.a “slaveOk”.  
In shell - rs.slaveOk()  
In driver – read preference  
Secondary can have potentially stale data due to lag in write from primary to secondary.  
Read Preference Options:  
• Primary(default)  
• Primary Preferred – if cant find primary, take from secondary  
• Secondary – read from secondary  
• Secondary Preferred - if cant find secondary, take from primary  
  
• Nearest – go to nearest n/w latency member in the set  

  

### **Re configuring a Replica Set**

Reconfiguration of the replica set can be done to change any of the properties in any or all the members of the replica set.Follow the below steps to change the priority of the third member in the replica set from master.  
  
**1\. Set the rs.config() value to variable cfg**  
\>cfg = rs.config()  
  
**2.Change the value of the priority parameter in the cfg variable**  
\>cfg.members\[2\].priority=2

  

**3.Change the configuration to newly set priority value by reconfiguring.**

\> rs.reconfig(cfg)

  

**4\. Confirm that the value has changed by checking the rs.config()**

\>rs.config()

  

For Priority option the default for all the members would be 1.If we don't want a particular member to ever become a primary, we can set its priority to 0.

###   
Arbiters

Arbiters are the members in the replica set which wont have any data stored in them but would only be used to participate in election in case of any automatic failover situation in the replica set and a new primary has to be elected.The arbiter would be used to take majority in the voting to select one of the secondary to be elected as the new primary.

  

We can make any of the members in the replica set as an arbiter by setting the arbiterOnly as true in <options> of members of the replication configuration.

  

i.e to make the first member as arbiter we can reconfigure the replica set as:

 cfg = rs.config()

cfg.members\[0\].arbiterOnly=true

rs.reconfig(cfg)

  

  

###  Hidden Option , Slave Delay and Voting Option

Hidden : If it is set true clients can't see that particular server/member.

  

Slave Delay<seconds> : If we mention a value for slave delay, the secondaries can never be fresher than delayed time in slave delay parameter.eg to delay a secondary by 8 hours we can use slave delay.(copy of primary which is 8hrs old).

To Set slave delay:

var cfg = rs.conf()

cfg.members\[2\].priority = 0 // without making priority 0, we cant make slave delay

cfg.members\[2\].hidden = true;

cfg.members\[2\].slaveDelay = 100;

rs.reconfig(cfg)

  

Voting: It should not be used generally.The parameter is votes:<n>.For example if we have only two members in the replica set, we can set votes 0 and 1 for each of the member to make one of it primary.

  

To Check the ip and port of the current member connected in the replica set , we can use:

\> db.isMaster().me

_localhost:27001_

  

### Connect to Other Members from Current

Normally one specifies the server on the mongo shell command line.  

Additional connections may be opened

    var x = new Mongo('host\[:port\]');

    var mydb = x.getDB('mydb');

  or    var mydb = connect('host\[:port\]/mydb');

  

rs0:PRIMARY> var slave1 = new Mongo('127.0.0.1:27028')

rs0:PRIMARY> slave1

connection to 127.0.0.1:27028

rs0:PRIMARY> var slave1\_test = slave1.getDB('test')

rs0:PRIMARY> slave1\_test

_test_

rs0:PRIMARY> slave1\_test.getMongo()

_connection to 127.0.0.1:27028_

rs0:PRIMARY> slave1\_test.getMongo().setSlaveOk()

rs0:PRIMARY> db.isMaster().me

_127.0.0.1:27027_

rs0:PRIMARY> slave1\_test.isMaster().me

_127.0.0.1:27028_

  

rs0:PRIMARY>db.foo.count()

_10_

rs0:PRIMARY> slave1\_test.foo.count()

_10_

rs0:PRIMARY> ( new Mongo ( ‘ localhost:27029’)).getDB(‘test’).foo.count()

_10_

  

### **oplog.rs**

capped collection

  

Replication window (hrs) is proportional to the system load.

  

**Querying the oplog after connected to a replica set:**

use local

db.oplog.rs.find()

  

**Storing oplog stats as a variable called stats:**

var stats = db.oplog.rs.stats()

  

**Verifying that this collection is capped (it will grow to a pre-configured size before it starts to overwrite the oldest entries with newer ones):**

stats.capped

  

**Getting current size of the oplog:**

stats.size

  

**Getting size limit of the oplog(MB):**

stats.maxSize

  

**Getting current oplog data (including first and last event times, and configured oplog size):**

rs.printReplicationInfo()

  

**Query the oplog, filtering out the heartbeats ("periodic noop") and only returning the latest entry:**

use local

db.oplog.rs.find( { "o.msg": { $ne: "periodic noop" } } ).sort( { $natural: -1 } ).limit(1).pretty()

  

  

### To Check OpLog File

rs0:PRIMARY> use local

switched to db local

rs0:PRIMARY> db.oplog.rs.count()

_2675_

rs0:PRIMARY> db.oplog.rs.find().sort({$natural:-1}).limit(5)

_{ "ts" : Timestamp(1524229404, 1), "t" : NumberLong(1), "h" : NumberLong("6049716497373799162"), "v" : 2, "op" : "n", "ns" : "", "wall" : ISODate("2018-04-20T13:03:24.340Z"), "o" : { "msg" : "periodic noop" } }_

_{ "ts" : Timestamp(1524229394, 1), "t" : NumberLong(1), "h" : NumberLong("8344516662818844751"), "v" : 2, "op" : "n", "ns" : "", "wall" : ISODate("2018-04-20T13:03:14.340Z"), "o" : { "msg" : "periodic noop" } }_

_{ "ts" : Timestamp(1524229384, 1), "t" : NumberLong(1), "h" : NumberLong("5995052780562034224"), "v" : 2, "op" : "n", "ns" : "", "wall" : ISODate("2018-04-20T13:03:04.339Z"), "o" : { "msg" : "periodic noop" } }_

_{ "ts" : Timestamp(1524229374, 1), "t" : NumberLong(1), "h" : NumberLong("-3377659627261735526"), "v" : 2, "op" : "n", "ns" : "", "wall" : ISODate("2018-04-20T13:02:54.339Z"), "o" : { "msg" : "periodic noop" } }_

  

### Write Concern Principles

**Write Concern** – tracking durability of inserted data

0 – don’t wait for acknowledgement

1(default) – wait for acknowledgement from primary only

\>=2 wait for acknowledgemnt from primary and one or more secondaries

“majority” – wait for acknowledgement from a majority of replica set members

  

**Write concern options:**

wtimeout - \- the time to wait for the requested write concern before marking the operation as failed.

j < true|false> - requires the node to commit the write operation to the on disk journal before returning an acknowledgement.

  

  

1. Write is truly committed upon application @ a majority of the set.

2. We can get acknowledgement of this.

Write with return acknowledgement:

db.foo.insert({x:10})

db.getLastError({w:’majority’,wtimeout:8000})  (w:1,w:all,w:majority)

  

  

•   No call to getLastError  - eg: page view counter,logging

• w:1 –eg: dupkey violation info after insert,cache data

• w: ‘majority’

• w:3 (all) – eg bulk import(flow control)

• w:tag – when data inserted to two data centers

  

• variation : “ call every N”

  

for ( i = 0; I < N ; i++){

db.foo.insert(arr\[i\]);

if(I % 500 == 0 || I == N -1)

getLastError({w:3 })

else

getLastError({w:1 })

}

  

  

wtimeout:

In case of lagging. – we don’t know if data is written.Also it will slow down as per time provided for timeout.No of client connections pile up.