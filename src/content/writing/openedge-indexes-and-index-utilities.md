---
title: 'OpenEdge Indexes and Index Utilities'
description: 'What is an index ? Database index works like a book index. To look up a topic, you scan the book index, locate the topic, and turn to the pages where the'
date: 2017-12-14
tags: ['idxdeactivate', 'index', 'idxbuild', 'utilities', 'idxactivate']
featured: false
topic: 'Progress/OpenEdge'
order: 10
---

  
  
  

### What is an index ?

  

 Database index works like a book index. To look up a topic, you scan the book index, locate the topic, and turn to the pages where the information resides. The index itself does not contain the information; it only contains page numbers that direct you to the pages where the information resides. Without an index, you would have to search the entire book, scanning each page sequentially.

  

Similarly, if you ask for specific data from a database, the database engine uses an index to find the data. An index contains two pieces of information—the index key and a row pointer that points to the corresponding row in the main table. 

  

  

Index table entries are always sorted in numerical, alphabetical, or chronological order. 

Using the pointers, the system can then access data rows directly, and in the sort order specified by the index.

Every table should have at least one index, the primary index.

  

 When you create the first index on any table, OpenEdge assumes it is the primary index and sets the Primary flag accordingly.

  

  

### Advantages of an index:

  

\*Direct access and rapid retrieval of rows.

  

  

\*Automatic ordering of rows.

  

  

\*Enforced uniqueness.

  

  

\*Rapid processing of inter-table relationships.

  

  

### Disadvantages of an index:

  

\*Indexes take up disk space.(See the Calculating index size).

  

  

\*Indexes can slow down other processes. When the user updates an indexed column, OpenEdge updates all related indexes as well, and when the user creates or deletes a row, OpenEdge changes all the indexes for that table.

  

  

  

  

### How index works:

  

An index is a list of index values and row IDs (ROWIDs). ROWIDs are physical pointers to the database tables that give you the fastest access to rows. ROWIDs do not change during the life of a row—they only change when you dump and reload a database.

  

 If you delete a row and create a new identical row, it might have a different ROWID. The database blocks of an index are **organized into a tree structure** for fast access. 

OpenEdge locates rows within an index by traversing the index tree. Once a row is located, the ROWID accesses the data. 

  

OpenEdge does not lock the whole index tree while it looks for the row, it only locks the block that contains the row. Therefore, other users can simultaneously access rows in the same database.

  

  
  

### Index Utilities:

  

To perform various operations on the indexes , openedge provides various utilities .Below are few:

  

  

**Index check (PROUTIL IDXCHECK)**

Index Check identifies possible errors, but does not ever alter index entries. IDXCHECK can be run online or offline. If an IDXCHECK operation is interrupted or crashes, it does not cause data corruption. IDXCHECK works by:  
  
1\. Checking that all index entries associated with each record can be found.  
  
2\. Verifying that each value in the index is in the associated record.  
  
3\. Undertaking a validation of all index blocks and reporting an associated error as appropriate.  
IDXCHECK is designed to detect index corruption as sensitively as possible. Because this requires many reads to take place during the process, it may take significant time to complete.

  
**proutil <dbname> -C idxcheck**

  
  
  
**Index fix (PROUTIL IDXFIX )**  
  
Checks database records and indexes to determine whether an index is corrupt or a record has a missing or incorrect index. IDXFIX will also repair corrupted indexes.  
  
proutil <dbname> -C idxfix  
  
  
  
  
Index Active (**PROUTIL IDXACTIVATE**)  
  
  
Activates an inactive index. IDXACTIVATE works for both online and offline databases.  
  
**proutil db-name -C idxactivate table-name.index-name**  
Index De-Active (**PROUTIL IDXDEACTIVATE**)  
  
Deactivates an active index or indexes for databases  
  
  
**proutil db-name -C idxdeactivate table-name.index-name**  
Index Build  (**PROUTIL IDXBUILD**)  

  

  
Rebuilds an index, packing or consolidating index records to use disk space as efficiently as possible.  
  
  
In addition to rebuilding an index, IDXBUILD also:  
  
\*Compresses index blocks to minimize space usage  
  
\*Activates deactivated indexes in the database.  
  
\*Repairs corrupted indexes in the database (index corruption is typically signaled by error messages)  
  
  
You can either perform idx build using menu option by simply using  
  
**proutil <db-name> -C idxbuild**  
Following menu option will come  
  
 Index Rebuild Utility  
      =====================  
  
      Select one of the following:  
      All (a/A) - Rebuild all the indexes  
      Some (s/S) - Rebuild only some of the indexes  
      By Area (r/R) - Rebuild indexes in selected areas  
      By Schema (c/C) - Rebuild indexes by schema owners  
      By Table (t/T) - Rebuild indexes in selected tables  
      By Partition (p/P) - Choose indexes in selected table partitions  
By Activation (v/V) - Rebuild selected active or inactive indexes  
      -------------------  
      Multi-Tenancy (m/M) - Choose tenants or groups  
      -------------------  
      Quit (q/Q) - Quit, do not rebuild  
  
      Enter your selection:  
  
  
  
You can select desired option and perform the idx build,  
  
  
We can also perform the idx build as a background process and with specific parameters to improve the performance of idxbuild and providing a faster result  
  
Eg:  
  
**(proutil <dbname> -C idxbuild -B 100000 -T <temp-path> -SG 48 -TB 64 -TM 64 -TMB 512 -TF 50 -thread 1 -threadnum 10 -datascanthreads 60 -mergethreads 10 < input.txt> ouput.txt &)**  
  
  
The input file(input.txt) in the example should be of below format  
  
S  
<table-name>  
<index-name>  
<table-name>  
<index-name>  
!  
y  
y