---
title: 'Database Blocks'
description: 'We have now covered the Database architecture for an Openedge database and its various components such extents , storage areas etc.Now lets discuss the'
date: 2017-12-14
tags: ['openedge', 'high-water-mark', 'blocks', 'free-blocks', 'empty-blocks', 'progress']
featured: false
topic: 'Progress/OpenEdge'
order: 8
---

We have now covered the Database architecture for an Openedge database and its various components such extents , storage areas etc.Now lets discuss the component where the actual data (records) are stored in the database.  
  
**Blocks:**  
A block is the smallest unit of physical storage in a database. Many types of database blocks are stored inside the database, and most of the work to store these database blocks happens behind the scenes. However, it is helpful to know how blocks are stored so that you can create the best database layout.  
The most common database blocks are divided into three groups:  
  
**1\. Data Blocks**  
Data blocks are the most common blocks in the database. There are two types of data blocks: RM blocks and RM chain blocks. The only difference between the two is that RM blocks are considered full and RM chain blocks are not full.  
The internal structure of the blocks is the same. Both types of RM blocks are social. Social blocks can contain records from different tables. In other words, RM blocks allow table information (records) from multiple tables to be stored in a single block. In contrast, index blocks only contain index data from one index in a single table.Each RM block contains , Block header, Records,Fields, Free Spaces.  
  
**2\. Index Blocks**  
Index blocks have the same header information as data blocks.Index blocks can store the amount of information that can fit within the block, and that information is compressed for efficiency.Index blocks can only contain information referring to a single index.  
  
Indexes are used to find records in the database quickly. Each index in an OpenEdge RDBMS is a structured B-tree and is always in a compressed format. This improves performance by reducing key comparisons.  
  
A database can have up to 32,767 indexes. Each B-tree starts at the root. The root is stored in an \_storageobject record. For the sake of efficiency, indexes are multi-threaded, allowing concurrent access. Rather than locking the whole B-tree, only those nodes that are required by a process are locked.  
  
**3\. Other Block Types**  
**\* Master Blocks** :  
This block stores status information about the entire database. It is always the first block in the database and it is found in Area 6 (a Type I storage area). This block contains the database version number, the total allocated blocks, time stamps, and status flags. You can retrieve additional information from this block using the Virtual System Table (VST) \_mstrblk.  
  
**\* Storage Object Blocks :**  
Storage object blocks contain the addresses of the first and last records in every table by each index.  
If a user runs a program that requests the first or last record in a table, it is not necessary to traverse the index. The database engine obtains the information from the storage object block and goes directly to the record.Because storage object blocks are frequently used, they are pinned in memory. This availability further increases the efficiency of the request.  
  

**\* Free Blocks :**  
Free blocks have a header, but no data is stored in the blocks. These blocks can become any other valid block type. These blocks are below the high-water mark. The high-water mark is a pointer to the last formatted block within the database storage area.Free blocks can be created by extending the high-water mark of the database, extending the database, or reformatting blocks during an index rebuild. If the user deletes many records, the RM blocks are put on the RM Chain.  
However, index blocks can only be reclaimed through an index rebuild or an index compress.  
  
**\* Empty Blocks :**  
Empty blocks do not contain header information. These blocks must be formatted prior to use. These blocks are above the high-water mark but below the total number of blocks in the area. The total blocks are the total number of allocated blocks for the storage area.  
  
To sum up everything and to inter - relate the concept of records,blocks,areas and extents we can state that :  
  
Records are stored in Blocks , a group of blocks would form a Cluster (Type II), a collection of blocks /clusters of similar table/index objects would be stored in Storage Areas.The areas would be physically stored on the file system in one or more Extents (fixed or variable ).  
  
**Records --> Blocks --> Clusters --> Area --> Extents**