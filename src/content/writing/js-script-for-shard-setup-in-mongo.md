---
title: 'JS Script for Shard Setup in Mongo'
description: 'Instead of setting up each shard replica set and adding them to shard in the mongos shell we can use the below js script and load it to mongos to add mongo'
date: 2019-03-29
tags: ['mongo', 'js', 'shard']
featured: false
---

Instead of setting up each shard replica set and adding them to shard in the mongos shell we can use the below js script and load it to mongos to add mongo shards without much hassle:  
  
db = db.getSisterDB("config");  
  
var mongosConn = db; // assume we connected to a mongos to get going  
  
var res = null;  
  
function check() {  
        printjson(res);  
        if( !res || !res.ok ) {  
                throw "check(): not ok, stopping";  
        }  
}  
  
function waitForSetHealthy() {  
        print("waiting for repl set initiate to complete...");  
        while( 1 ) {  
                sleep(250);  
                var res = rs.status();  
                if( !res.ok )  
                        continue;  
                var bad = false;  
                for (var i = 0; i < res.members.length; i++ ) {  
                        var state = res.members\[i\].state;  
                        if( state != 1 && state != 2 ) // primary or secondary?  
                                bad = true;  
                }  
                if( !bad )  
                        break;  
        }  
}  
  
function ourAddShard(setname,port) {  
        db = connect("localhost:"+port+"/test");  
        print(db.isMaster().me);  
        res = rs.initiate(  
                {  
                        "\_id" : setname,  
                        "members" : \[  
                                { \_id: 0, host: "localhost:" + port },  
                                { \_id: 1, host: "localhost:" + (port+1) },  
                                { \_id: 2, host: "localhost:" + (port+2) }  
                        \]  
                }  
        );  
        check();  
        waitForSetHealthy();  
  
        print("adding shard...");  
        db = mongosConn;  
        res = sh.addShard(setname+"/localhost:"+port);  
        check();  
        print("done; run sh.status()");  
}  
  
print("setup.js loaded.");  
print("list of existing shards before doing anything:");  
printjson( db.shards.find().toArray() );  
print()  
print("You can invoke:");  
print("ourAddShard(setname,port)");  
print()  

  

Just save the js to a initiateShard.js file and load to the mongos

 **mongo -shell initiateShard.js**

Now we can simple add any new shard replica set to existing shards by invoking:

  

ourAddShard(setname,port)

  

e g:

\>**ourAddShard("d",27300)**

_connecting to: mongodb://localhost:27300/test_

_Implicit session: session { "id" : UUID("666f3569-f12b-4d6b-87bf-58325ec616bb") }_

_MongoDB server version: 4.0.6_

_\[unknown type\]_

_{_

        _"ok" : 1,_

        _"operationTime" : Timestamp(1284551107, 1),_

        _"$clusterTime" : {_

                _"clusterTime" : Timestamp(1284551107, 1),_

                _"signature" : {_

                        _"hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),_

                        _"keyId" : NumberLong(0)_

                _}_

        _}_

_}_

_waiting for repl set initiate to complete..._

_adding shard..._

_{_

        _"shardAdded" : "d",_

        _"ok" : 1,_

        _"operationTime" : Timestamp(1284551121, 3),_

        _"$clusterTime" : {_

                _"clusterTime" : Timestamp(1284551121, 3),_

                _"signature" : {_

                        _"hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),_

                        _"keyId" : NumberLong(0)_

                _}_

        _}_

_}_

_done; run sh.status()_  
If you run sh.status() after adding the shards you will get the below response:  
**mongos>sh.status()**  
_\--- Sharding Status ---_  
  _sharding version: {_  
        _"\_id" : 1,_  
        _"minCompatibleVersion" : 5,_  
        _"currentVersion" : 6,_  
        _"clusterId" : ObjectId("4c90af09e7e0f635a571e413")_  
  _}_  
  _shards:_  
        _{  "\_id" : "a",  "host" : "a/localhost:27000,localhost:27001,localhost:27002",  "state" : 1 }_  
        _{  "\_id" : "b",  "host" : "b/localhost:27100,localhost:27101,localhost:27102",  "state" : 1 }_  
        _{  "\_id" : "c",  "host" : "c/localhost:27200,localhost:27201,localhost:27202",  "state" : 1 }_  
        _{  "\_id" : "d",  "host" : "d/localhost:27300,localhost:27301,localhost:27302",  "state" : 1 }_  
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