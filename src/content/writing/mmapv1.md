---
title: 'MMAPv1'
description: 'Storage Engine determines data file format & format of indexes and are key to performance for the mongo database.It is the middletier between the database and'
date: 2019-03-21
tags: ['mmapv1', 'mongo', 'storage-engine']
featured: false
topic: 'MongoDB'
order: 14
---

  

Storage Engine determines data file format & format of indexes and are key to performance for the mongo database.It is the middletier between the database and the underlying hardware.

   
A storage engine effects:  
\* How data is written to disk  
\*How data is deleted/removed from disk  
\*How data is read from disk  
\* The data structure used to store data  
  
From mongo 3.0 we can choose from two storage engines:  

MMAPv1 and WiredTiger(opensource & is used in other DBs)

###  **MMAPv1**

• Grew from original Storage Engine & Uses unix MMAP system call  
• Maps data files directly into virtual memory  
• mongod –storageEngine mmapv1 (we can check the storage engine using db.serverStatus())  
• Collection level locking with Mongo 3.0  

• Multiple reader and single writer lock on shared resources like data,metadata,index , journals etc in mongo db

• Journal – write ahead log (for  consistency of data)

  

**MMAPv1:Documents & Data Files**

Within data files, different extents would be present to hold the documents.

 [![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhesZm2h14OhOnYSq23HcakGdi2hYw_lC8W62zGJEzWX7je5KSjbi4hYwMbQMkGlHi83EetC5efR1U-YHPojuaXvLavSgLvOwPG8v5pUF5TTsGOr3glEqv_zHK_wE2pUWL4WSeuLPRHJMc/s1600/11.jpg)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhesZm2h14OhOnYSq23HcakGdi2hYw_lC8W62zGJEzWX7je5KSjbi4hYwMbQMkGlHi83EetC5efR1U-YHPojuaXvLavSgLvOwPG8v5pUF5TTsGOr3glEqv_zHK_wE2pUWL4WSeuLPRHJMc/s1600/11.jpg)

If D2 grows, it has to move after D4 leaving space in D2, we also have to update indexes( to update address of D2)

Power of 2 sized allocation(padding factor is true by default):document is first given 32bytes, then 64,128..2 MB to grow

Advantage of MMAPv1 padding and power of 2 sized allocation is:

• Documents will not have to move as soon as they grow in size

• Record spaces are likely to get re-used

• Documents that grow at a constant rate will move less often as time goes on. 

  

Wired tiger storage engine will be discussed in next blog