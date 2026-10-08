---
title: 'MySQL Configuration & Setup'
description: 'This blog will cover the various configuration and setups that can be performed over a mysql server for its operations. Server command line options We can'
date: 2019-07-08
tags: []
featured: false
topic: 'MySQL'
order: 999
---

This blog will cover the various configuration and setups that can be performed over a mysql server for its operations.

  
**Server command line options**  
  
\*We can control the way server launches  
\*specify how the server access resources  
\*We can set connection defaults  
\*some options are specified at launch and some can be specified later  
  
The various option specification techniques are:  
\*On command line for manual launch  
\*In shell script for auto launch, not used generally  
\*Compile version with custom default values, also not used  
\*Use of configuration file(s) is the preferred technique  
**Global Server Variable**  
\*Variables for server operation  
\*Apply only to server not to a connection - so only global scope  
  
**Config File Location**  
\*Platform specific locations according to OS we use  
\*We can use more than one config files  
\*Accessed in order they are encountered in the config file i.e top to bottom  
  
**Config File Structure**  
Sections  
\-section heading enclosed in square bracket \[mysqld\]  
\-heading names or program group  
\-all specification lines following heading  
Eg:  
\[mysqld\]  
option = value  
option2  
  
\[client\]  
otheroption  
  
\[mysql\]  
otheroption = some values  
  
**Config File Structure**  
\* One specification per line  
\* Full option name used  
\*No leading -- char  
\*value if needed,assigned using = with spaces  
\*char values enclosed in quotes  
  
Special char - leading and trailing spaces deleted, escape sequence for special char \\s,\\t,\\n,\\r,\\b  
comment begins with # or ;  
  
**Important server settings**  
  
\* Server identity and resource locations  
  server-id (numeric value)  
port or bind-address (numeric value)  
socket and pid-file (path value)  
basedir,datadir,tmpdir,slave-load-tmpdir (path value)  
log-bin,slow\_query\_log ,general\_log (path value)  
log-error (path value)  
ft\_stopword\_file ( path value)-full text indexing  
  
\*Operational Options  
lower\_case\_table\_names - push all table nd db names as lower case for operation  
sql-mode (value)  
concurrent\_insert \[MyISAM engine\]  
max\_connections (value)  
wait\_timeout or interactive timeout (value)  
connect\_timeout (value)  
event-scheduler  
  
**Server Startup Initialization**  
**_init-file option_**  
\*used to designate path to a script to be executed at launch of server  
\*performs operations that config varaibles cant do  
\-populate memory tables  
\-Maintain custom startup log  
\-Other setup as needed  
  
**Syntax of script file**  
\*Seperate line for each statement and no statement terminators  
\*Should not include comments  
\*Any error will abort launch  
Eg:  
use world  
insert into memcity select \* from city  
insert into memcodes select \* from codes  
  
**Connection Initialization**  
**_init\_connect Option_**  
\*used to contain a script to be executed at launch of any connection  
\*Statements in scripts are deliminated by semicolon  
\*no delimiter at end of script  
\*should not include comments  
\*script not executed for super user  
Eg:  
\[mysqld\]  
init\_connect="use world;set autocommit=1"  
  
**Replication Initialization**  
**_init\_slave option_**  
\*used to contain a script to be executed each time the SQL thread starts for slave  
\*same syntax rule as init\_connect  
\*No guaranteed to have executed when the START SLAVE command returns its response because SQL thread may not have begun