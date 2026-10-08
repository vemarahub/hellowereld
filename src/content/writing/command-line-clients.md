---
title: 'Command Line Clients'
description: 'Command Line tool benefits Quick Specific Low overhead Scriptable Schedulable Combinable General Syntax: command --opt1 --opt2=value[target] Names usually'
date: 2019-07-09
tags: []
featured: false
topic: 'MySQL'
order: 999
---

**Command Line tool benefits**

  
\*Quick  
\*Specific  
\*Low overhead  
\*Scriptable  
\*Schedulable  
\*Combinable  
  
**General Syntax:**  
command --opt1 --opt2=value\[target\]  
\*Names usually lowercase  
\*options can be boolean switches or require values  
\*usaully order of option is not significant  
\*String can be unquoted  
\*Target is a filename or path  
  
**Input and Output**  
  
\*File can be read as input to command  
command < path\_to\_input  
\*File can be created or appended to by output  
command > filepath (creates or overwrites )  
command >> filepath (appends )  
\*output of one can be used as input to another  
command 1|command2  
  
**MySQL Client Interactive Mode**  
  
general purpose db command line.Send any command the server can execute.Used for maintainence,debugging  
  
mysql -u user -p \[options\] \[db\]  
  
**MySQL Client Batch Mode**  
  
Directly execute one or more SQL command:  
mysql \--execute(-e) "cmd\[;cmd\]" \[database\]  
  
Directly output to a file:  
mysql \[database\] -Ne "cmd\[;cmd\]" >  
  
Execute an SQL script:  
mysql \-t \[datbase\] <  
  
cat | mysql \[database\]  
  
**MYSQL Admin Client**  
  
**Purpose:** perform simple administrative tasks and archive results from certain commands  
  
mysqladmin cmd\[cmd..\]  
  
#>mysqladmin -u root -proot ping  
mysqld is alive  
  
#>mysqladmin -u root -proot status  
Uptime: 35  Threads: 1  Questions: 5  Slow queries: 0  Opens: 105  Flush tables: 1  Open tables: 98  Queries per second avg: 0.142  
  
#>mysqladmin -u root -proot version  
  
Server version          5.7.18  
Protocol version        10  
Connection              localhost via TCP/IP  
TCP port                3306  
Uptime:                 1 hour 10 min 30 sec  
  
Threads: 1  Questions: 7  Slow queries: 0  Opens: 105  Flush tables: 1  Open tables: 98  Queries per second avg: 0.001  
  
  
#>mysqladmin -u root -proot processlist  
+----+------+-----------------+----+---------+------+----------+------------------+  
| Id | User | Host            | db | Command | Time | State    | Info             |  
+----+------+-----------------+----+---------+------+----------+------------------+  
| 7  | root | localhost:53727 |    | Query   | 0    | starting | show processlist |  
+----+------+-----------------+----+---------+------+----------+------------------+  
  
#>mysqladmin -u root -proot kill 5,6  
  
#>mysqladmin -u root -proot ve pro ext  
  
Server version          5.7.18  
Protocol version        10  
Connection              localhost via TCP/IP  
TCP port                3306  
Uptime:                 1 hour 14 min 37 sec  
  
Threads: 1  Questions: 13  Slow queries: 0  Opens: 105  Flush tables: 1  Open tables: 98  Queries per second avg: 0.002  
+----+------+-----------------+----+---------+------+----------+------------------+  
| Id | User | Host            | db | Command | Time | State    | Info             |  
+----+------+-----------------+----+---------+------+----------+------------------+  
| 9  | root | localhost:53836 |    | Query   | 0    | starting | show processlist |  
+----+------+-----------------+----+---------+------+----------+------------------+  
+-----------------------------------------------+--------------------------------------------------+  
| Variable\_name                                 | Value                                            |  
+-----------------------------------------------+--------------------------------------------------+  
| Aborted\_clients                               | 0                                                |  
| Aborted\_connects                              | 1                                                |  
| Binlog\_cache\_disk\_use                         | 0                                                |  
| Binlog\_cache\_use                              | 0                                                |  
| Binlog\_stmt\_cache\_disk\_use                    | 0                                                |  
| Binlog\_stmt\_cache\_use                         | 0                                                |  
| Bytes\_received                                | 1548                                             |  
| Bytes\_sent                                    | 1774                                             |  
| Com\_admin\_commands                            | 1                                                |  
| Com\_assign\_to\_keycache                        | 0                                                |  
| Com\_alter\_db                                  | 0                                                |  
| Com\_alter\_db\_upgrade                          | 0                                                |  
| Com\_alter\_event                               | 0                                                |  
 ---------------------------------------------------------------------------------------------------  
  
**MySQL Import Client**  
  
Purpose : Import data into one or more existing tables.  
  
mysqlimport database path  
  
Name of import file must match table name  
table must already exist  
  
mysqlimport -u root -p world /usr/data/newtab.txt  
  
**MySQL Dump Client**  
  
Purpose:Backup and export data and structure information exported as sql script or delimated data or text file.Table information dumped by default,but views,triggers,routines etc can be included.  
  
mysqldump database \[tablelist\]  
mysqldump \--databases dblist  
mysqldump \--all-databases  
  
mysqldump -u root -p world city country > /usr/data/dump.sql  
  
**MySQL Check Client**  
  
Purpose: Perform table maintainence operations - check(default),analyze,optimize and repair  
  
mysqlcheck database \[tablelist\]  
mysqlcheck \--databases dblist  
mysqlcheck \--all-databases  
  
various Options are: --check,--analyze,--optimize,--repair  
  
#>mysqlcheck -u root -p schoolmgr userdetails  
Enter password: \*\*\*\*\*\*\*\*\*  
schoolmgr.userdetails                              OK  
  
#>mysqlcheck -u root -p --analyze schoolmgr userdetails  
Enter password: \*\*\*\*\*\*\*\*\*  
schoolmgr.userdetails                              OK  
  
**MySQL Slap Client**  
  
Purpose: Load emulate operations to execute queries on multiple threads.Used for performance tuning.  
  
mysqlslap  
  
#> mysqlslap -u root -proot --delimiter=";" --create="CREATE TABLE test (id int, name char(10));INSERT INTO test VALUES (23, 'Al'), (18, 'Andy'), (20, 'Ann')" --query="SELECT \* FROM test" --concurrency=10 --iterations=20  
mysqlslap: \[Warning\] Using a password on the command line interface can be insecure.  
Benchmark  
        Average number of seconds to run all queries: 0.012 seconds  
        Minimum number of seconds to run all queries: 0.000 seconds  
        Maximum number of seconds to run all queries: 0.016 seconds  
        Number of clients running queries: 10  
        Average number of queries per client: 1  
  
Other Command Line Tools can be found in bin folder. like myisamchk, myisampchk etc  
  
**Client Configuration Settings**  
  
We can add a section for specific client program in configuration file:  
command line options will overrride config file  
  
\[mysqldump\]  
order-by-primary  
  
\[mysql\]  
prompt="\\\\r:\\\\m:\\\\s\[\\\\d\]>"  
connect\_timeout=1200  
  
\[mysqlslap\]  
concurrency=50  
iterations=500