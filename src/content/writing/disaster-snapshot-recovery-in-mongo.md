---
title: 'Disaster Snapshot Recovery in Mongo'
description: 'Say for in a database maintenance activity we drop a collection by mistake, we can restore to the last state just before dropping the database using oplog file'
date: 2020-05-11
tags: []
featured: false
topic: 'MongoDB'
order: 999
---

  

  

Say for in a database maintenance activity we drop a collection by mistake, we can restore to the last state just before dropping the database using oplog file and the latest available backup.Follow the below steps to restore the database to last state:

  

1\. use local

db.oplog.rs.findOne({"o.drop":" "})

we will get epoch\_sec for that particular drop statement.

  

2\. Dump the oplog file

mongodump -d local -c oplog.rs -out /data/oplog\_dump -query {"ns":{"nin":\[config.system.sessions,config.cache.collections\]}}

  

3\. Restore the latest backup using mongorestore

  

4\. Restore the oplog upto the epoch time of collection drop

mongorestore --oplogReplay --oplogFile --oplogLimit epoch\_sec