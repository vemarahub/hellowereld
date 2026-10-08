---
title: 'Openedge Storage Areas'
description: 'Storage areas are identified by their name. Each Progress database must contain three specific storage areas, and may contain several optional storage'
date: 2017-12-14
tags: ['type-ii', 'openedge', 'progress', 'type-i', 'storage-areas']
featured: false
---

Storage areas are identified by their name. Each Progress database must contain three specific  
storage areas, and may contain several optional storage areas.Following are the different storage areas in an OE DB architecture:  
  
**Control Area (.db )** : The control area act as a table of contents for the database engine,listing the name and location of every area and extent in the database.  
  
**Schema Area( .d1 ... .dn )** : The schema area contains the master and sequence blocks, as well as schema tables and indexes.  
  
**Primary Recovery Area(.b1... .bn)** : It stores notes about data changes.In the event of hardware failure , the database engines uses these notes to undo any incomplete transactions and maintain data integrity.  
  
**Application Data Area(.d1 ... .dn)** : It contains user data,indexes, clobs and blobs.Any table/index we would like to create for our business requirement should be created under this storage area.  
  
**Transaction Log Area ( .t1 ... .tn )** : This lists two- phase commit transactions and would only contain fixed length extents.  
  
**Type I and Type II Storage Area**  
  
The Type II Storage area architecture was introduced in OE 10 version.  
The difference between Type I(introduced in 9.x) and Type II storage area structure is the concept of "clusters" per storage Area which is basically grouping of database blocks.  
  

A cluster is a contiguous allocation of space for one type of database object. Data clusters reduce fragmentation and enable your database to yield better performance from the underlying file system.  
  
There are three choices for cluster size:  
\-small ( 8 database blocks )  
\-medium ( 64 database blocks )  
\-large ( 512 database blocks )  
  
Where as a Type I Storage Area contains individual database blocks.Also, the max size of a type II storage area is fixed at approximately one petabyte when large files are enabled.  
A max of 1024 extents per area and a max size of 1 TB / extent.  

Max Area Size = Max no of extent/area \* max extent size = 1 PB

  
thus , max records per area = max area size \* records per block / db\_blocksize  
  
for ex , a type II storage area with 64 records/block defined ina database with 4KB blocksize,would yield 2^46 or 70,368,768 addressable rows.For a similar scenario , a Type I storage area would yield a 128 GB ,max storage area size compared to 1 PB of Type II.