---
title: 'MySQL Architecture'
description: 'MySQL follows a client server architecture where the mysqld programs which are the core programs of the database system act as the server and various agent'
date: 2019-07-02
tags: []
featured: false
topic: 'MySQL'
order: 999
---

MySQL follows a client server architecture where the mysqld programs which are the core programs of the database system act as the server and various agent programs like mysql act as client which communicates with the server using a communication protocol for example a socket connection for mysql , tcp/ip connection for a php client, namedpipe communication protocol for a mysqldump etc.

  
A mysqld program is a single process multi threaded program in which each connection to the database is a thread.It has a modular design structure with various subsystems or modules :  
       
Below is the flow of data/query in a mysql architecture  
  
**Connection API** **\=>** **SQL Parser** **\=>** **Query Cache** (if has exact query returns result set) else **\=>**  
**SQL Parser** (converts query to Binary code) **\=>** **Query Optimizer** (contains Index&Table Statistics,performs calculation and generates execution plan)**\=>** **Execution engine** **\=>** **Storage Engine**  
  
Each of the subsystems of MySQL architecture are:  
  

### \* Client Libraries

**mysql connectors** - Application Programming Interface

used to create client programs

establish a connection to server

  

**connectors from oracle**

Native C client library(libmysqlclient)

\- Included with MySQL distrubition

  Connector/ODBC(based on C)

  connector/J(in Java)

connector/NET(in C#)

PHP(mysql & mysqli extention)

download from dev.mysql.com

  

**embedded connector from Oracle**

embedded C client library(libmysqld)

connector/mxj(in java)

  

**third party connectors**

most are wrappers for basic C connector(written in perl,python,ruby,lua,schema..)

  

### \* Core Subsystem

These are shared subsystem as modules inside mysql server.These includes:

log management

built in function library

network communications

thread process & resource management

access & privilege management

cache & buffer  management

  

### \* Performance Cache

**Query cache** is used to speed up data access in ready only parts of database.Not much use for tables where data changes.All cached queries for table are removed on insert ,update,delete on the table.

  

**Thread cache** is used for high volume,low persistent access to database server. It is used to re-use thread for new connection in constant log on/log off situation thus less time will be required to retrieve data as new thread is not created. Not useful for high persistence systems.

  

**MyISAM Index Page Cache** cached index pages can be read much faster.Maintained in most recently used order.Large tables where only recent rows are commonly retrieved.

  

  

### \* Query Parsing

converts SQL text to binary

two modules - lexical scanner,grammer rules module

parses sql into tokens - keyword,field,etc.

Applies grammer rule to check validity

construct parse tree to pass to optimizer

### \* Query Cache

used to avoid full SQL execution

caches 3 things for query:

\-hash of query statement

\-result set

\-list of tables used

Only works for EXACT queries in cache

best for high read,low write tables

  

How Query cache works

incoming query is hashed -> sought in cache -> returned result set to client -> if not found,execute and cache it.If table is updated all the queries are removed.

### \* Query Optimizer

analyze parse tree and determine best execution plan.

uses specialized resources  - index & table statistics.,cost based algo and rules

execution plan developed to minimize reads, passed to execution engine

Determine possible indexes to use

balance cost of index use vs table scan

determine table join order

eliminates uneeded table and where info

find indexes to handle GROUP & ORDER

educated guess of best path is needed.

  

### \* MYSQL Plugin Interface

plugin types - storage engines,full text parser engines,information schema plugins,deamon plugins,replace UDF with pluggable functions.

plug-in paths are stored in mysql database table.

  

### \* Storage Engines

From version 5.5 are storage engines now plug-ins

features dependent on Storage Engine

\*Transaction support

\*Locking level(row,page or table)

\*Storage medium (disk,memory or cluster)

\* Data type and index type support

\* Caching of data and indexes

  

MyISAM - myql db, implicit temp tables

InnoDB - transaction support,row locking

Memory - Fast,RAM based access,schema on disk

  

Engines assigned on table by table basis.

  

### \* Information Schema

primary metadata repo - read only - mainly in RAM,some on disk.Dynamically updated with current server state

draws from mysql tables and server info

generated on server startup - system views

more flexible than SHOW commands, but requires more effort - includes aggregation,joins.

  

### \* H/W and OS issues

32 bit or 64 bit ( 32 limits addresses to 4GB)

64 bit hardware with 32 bit OS aware

Physical or virtual server

multiple cores , but each thread can use only one core

  

Ask questions like: -

expected data set size?

how fast will storage needs to grow

how much concurent traffic is expected

SAN or RAID is usually good