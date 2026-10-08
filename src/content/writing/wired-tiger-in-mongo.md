---
title: 'Wired Tiger in Mongo'
description: 'Wired tiger is a pluggable storage engine with following features: Document level locking Compression Fulfills some pitfalls of MMAPv1 Performance gain We can'
date: 2019-03-21
tags: ['mongo', 'wired-tiger']
featured: false
topic: 'MongoDB'
order: 13
---

Wired tiger is a pluggable storage engine with following features:  
\* Document level locking  
\* Compression  
\* Fulfills some pitfalls of MMAPv1  
\* Performance gain  
  
We can specify the specific storage engine on which we want to run the mongo instance as below  
  

**mongod  \--storageEngine wiredTiger**

  
  
  

**Data files of a wired tiger Storage Engine:**

  
  
\-rw-------. 1 mongod mongod   21 Sep 15  2010 WiredTiger.lock  
\-rw-------. 1 mongod mongod   45 Sep 15  2010 WiredTiger  
\-rw-------. 1 mongod mongod  114 Sep 15  2010 storage.bson  
\-rw-------. 1 mongod mongod 4.0K Mar 20 07:37 WiredTigerLAS.wt  
\-rw-------. 1 mongod mongod    5 Mar 20 07:37 mongod.lock  
\-rw-------. 1 mongod mongod  32K Mar 20 07:38 index-3--5338574939802031263.wt  
\-rw-------. 1 mongod mongod  32K Mar 20 07:38 collection-2--5338574939802031263.wt  
drwx------. 2 mongod mongod 4.0K Mar 20 07:38 journal  
\-rw-------. 1 mongod mongod  32K Mar 20 07:42 index-8--5338574939802031263.wt  
\-rw-------. 1 mongod mongod  36K Mar 20 07:43 collection-7--5338574939802031263.wt  
\-rw-------. 1 mongod mongod  16K Mar 20 08:05 index-1--1414695316089644899.wt  
\-rw-------. 1 mongod mongod  16K Mar 20 08:05 collection-0--1414695316089644899.wt  
\-rw-------. 1 mongod mongod  36K Mar 20 08:05 \_mdb\_catalog.wt  
\-rw-------. 1 mongod mongod  32K Mar 20 23:27 index-1--5338574939802031263.wt  
\-rw-------. 1 mongod mongod  32K Mar 20 23:27 collection-0--5338574939802031263.wt  
\-rw-------. 1 mongod mongod  24K Mar 21 01:21 index-5--5338574939802031263.wt  
\-rw-------. 1 mongod mongod  24K Mar 21 01:21 collection-4--5338574939802031263.wt  
\-rw-------. 1 mongod mongod  36K Mar 21 01:22 sizeStorer.wt  
\-rw-------. 1 mongod mongod  12K Mar 21 01:22 index-6--5338574939802031263.wt  
\-rw-------. 1 mongod mongod  68K Mar 21 01:22 WiredTiger.wt  
\-rw-------. 1 mongod mongod 1.1K Mar 21 01:22 WiredTiger.turtle  
drwx------. 2 mongod mongod 4.0K Mar 21 04:21 diagnostic.data  
  
**Wired Tiger Internals**  

\* Stores data in btree

\* Writes are initially seperate,incorporated later

\* two caches are used - WT cache which is by default set as half of RAM and FS cache.

Two caches are used before writing to disk to improve performance with a 60s checkpoint.

At cache level, wired tiger compressed the data.

The compressions used by WT are :

\* Snappy - (default) - This is a fast compression mode

\* zlib - this has the capability of compressing more

\*none