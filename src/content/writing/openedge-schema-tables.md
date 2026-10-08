---
title: 'Openedge Schema Tables'
description: 'What are schema tables?  Schema tables are metadata: i.e data about data  These are real tables, stored in the database.  It describe what is stored in the'
date: 2017-12-14
tags: ['schema-tables', 'vst', '4gl-queries']
featured: false
topic: 'Progress/OpenEdge'
order: 999
---

  

### What are schema tables?

  

  

 Schema tables are metadata:  i.e data about data  
  
 These are real tables, stored in the database.  
  
 It describe what is stored in the database.It includes tables, indexes, sequences, views, etc.,  
  
 Describe database physical storage like Areas, extents, transaction logs etc.  
  
 Describe users and access rights  
  
 4GL and SQL share most schema tables  
  
 SQL has additional “catalog tables” and views.  
  
  

### What are Virtual System Tables (aka VST’s)?

  

 Are NOT schema tables

  

 NOT real tables

  

 VST data are NOT stored anywhere

  

 VST records are created “on the fly” when retrieved

  

 VST tables describe database status and activity

  

 The schema does contain descriptions of VST’s

  

  

Following will describe some important schema tables which comes with a OE database

  

**Physical Storage Schema Tables**

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiTh6qL2lpD565XDl1axONh9DsvBWDebgyY_-OIOQyLrEfar5hv4q2bfUCuEPXVNEl_fIuhDRKGTFf7oyLq6PiwZOsyjKzez5iedeDx99fMQTf5G80Fh5djdxshUVTK30ilD0DiMVosYMzu/s640/Capture.PNG)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiTh6qL2lpD565XDl1axONh9DsvBWDebgyY_-OIOQyLrEfar5hv4q2bfUCuEPXVNEl_fIuhDRKGTFf7oyLq6PiwZOsyjKzez5iedeDx99fMQTf5G80Fh5djdxshUVTK30ilD0DiMVosYMzu/s1600/Capture.PNG)

**Basic 4GL Schema Tables**

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhXUs9UJ5wNDaYU-zFyzMr0xnc2mGMO1PCWgkBtX5ChO05eLQO-YRapWel-bykgkm3nc2ecrKxogi8aNSes6AhJFA4pFdd6hUmI5kqY1YIUhsb5hA4SJezZ6iksiOvMln1oUoowbHEtu3xx/s640/CaptureA.PNG)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhXUs9UJ5wNDaYU-zFyzMr0xnc2mGMO1PCWgkBtX5ChO05eLQO-YRapWel-bykgkm3nc2ecrKxogi8aNSes6AhJFA4pFdd6hUmI5kqY1YIUhsb5hA4SJezZ6iksiOvMln1oUoowbHEtu3xx/s1600/CaptureA.PNG)

  

  

  

## How 4GL finds records

  

When we write a query to fetch a record , schema tables play in the sequence of operations which takes in background to fetch back the queried record.

  

Following are the sequence of operations which happen when we fetch a record

  

  

 Compiler determines which index (perhaps cust-num)

• R-code has index information

• Query used to form equality or range bracket

  

 At runtime, load schema cache into memory

  

 Look up index number (\_index.idx-num, # 113)

  

 Find \_storage-object record for index 113

  

 Load into “om cache” so we can use it again

  

 Get location of index root block from \_storage-object

  

 Traverse index b-tree to leaf, perhaps cust-num = 20

  

 Get record’s rowid from index leaf block

  

 Read data block containing record

  

 Copy record to 4GL buffer or network buffer

  

  

  

  

  

  

  

We can utilize these schema tables to take report on various database components.

  

Below are **few helpful 4GL queries** using the schema table

  

  

### List All Tables

  

for each \_file

where (0 < \_file-num) and

(\_file-num < 32000):

  

display \_file-num \_file-name

.

end.

  

  

### List Basic Schema Tables

  

for each \_file

where (\_file-num < 0) and

(\_file-num > -80)

by \_file-num descending:

  

display \_file-num \_file-name

.

end.

### List VST Tables

  

for each \_file

where (\_file-num < -16384)

by \_file-num descending:

  

display \_file-num \_file-name

.

end.

  

  

### List SQL Catalogue Tables

  

for each \_file

where (\_file-name begins “\_SYS”):

display \_file-num \_file-name

.

end.

  

  

  

### **List Tables and Thier Fields**

  

output to tables.txt.

for each \_file

where (0 < \_file-num):

  

put \_file-name skip.

  

for each \_field of \_file:

  

put “ “ \_field-name skip.

  

end.

put “” skip.

  

end.

output close.

  

  

  

### **List Indexes by Table**

output to index.txt.

for each \_file where \_file-num > 0:

put \_file-name skip.

for each \_index of \_file:

put " " \_index-name skip.

for each \_index-field of \_index:

find \_field where recid(\_field) = \_field-recid.

put " " \_field-name skip.

end.

end.

put "" skip.

end.

output close.

  

  

**Space Used by Each Area**

  

  

for each \_AreaStatus where(not \_AreaStatus-Areaname matches "\*AfterImageArea\*") no-lock:

display

\_AreaStatus-Areanum format ">>>" column-label "Num"

\_AreaStatus-Areaname format "x(20)" column-label "AreaName"

\_AreaStatus-Totblocks column-label "Tot Block"

\_AreaStatus-Hiwater column-label "High Water"

\_AreaStatus-Hiwater / \_AreaStatus-Totblocks \* 100 column-label "%use"

\_AreaStatus-Extents format ">>>" column-label "NumExtents"

\_AreaStatus-Freenum column-label "Freenum"

\_AreaStatus-Rmnum column-label "RMnum".

end.

**Find Table Currently in Use**

  

find first \_MyConnection no-lock.

for each \_UserTableStat where \_UserTableStat-Conn = \_MyConnection.\_MyConn-UserId no-lock:

find \_file where \_file-num = \_UserTableStat-Num no-lock no-error.

if available \_file

then

display

\_UserTableStat-Num

\_file-name format "x(20)"

\_UserTableStat-read

format ">>>>>>>>>>"

\_UserTableStat-create

format ">>>>>>>>>>"

\_UserTableStat-update

format ">>>>>>>>>>"

\_UserTableStat-delete

format ">>>>>>>>>>".

end.

  

  

  

**Table - Area List**

for each \_Area, each \_Storageobject where (\_Storageobject.\_Area-number = \_Area.\_Area-number),each \_File where (\_File.\_File-Number = \_Storageobject.\_Object-number) and (\_File.\_File-Number > 0) break

by \_File.\_File-name:

display \_Area.\_Area-name \_File.\_File-name.

end.

  

  

**No Of BI Clusters**

  

  

find \_AreaStatus where \_AreaStatus-Areanum = 3.

find \_dbStatus.

display \_AreaStatus-Hiwater \*

\_dbStatus.\_DbStatus-BiBlkSize /

\_dbStatus-BiClSize /

1024.