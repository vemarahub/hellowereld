---
title: 'MySQL Resource Usage'
description: 'Global Memory Global buffers and caches are allocated on startup of mysqld and shared by all sessions.These can be general or storage engine specific.These are'
date: 2019-07-04
tags: []
featured: false
---

  

### Global Memory

Global buffers and caches are allocated on startup of mysqld and shared by all sessions.These can be general or storage engine specific.These are managed by global variables having fixed size resource allocation which are set in my.cnf file and can be changed dynamically.

  

**global buffer variables**

 Table cache (table\_open\_cache)

 Query cache (query\_cache\_size)

 Thread cache (thread\_cache)

 Privileged tables ( memory version of mysql db tables )

  

**storage engine variables**

MyISAM - keybuffer(key\_bufer\_size) recently used index pages of myisam tables

InnoDB - Buffer pool ( innodb\_buffer\_pool\_size, innodb\_additional\_mem\_pool\_size)

Log Buffer (innodb\_log\_buffer\_size)

  

### **Session Memory**

Allocated for each client connection , default thread size is 192k (256k on 64 bit) buffer and caches add to connection cost.dynamically allocated as needed mostly.Some allocated more than once (eg joins,sort).Released when query done or session closed.Special concern for persistent connections

  

**session buffer variables and controls**

max\_allowed\_packet and net\_buffer\_length

sort\_buffer\_size - space allocated for sort in session without indexes  & join\_buffer\_size - each pair of tables without index join crireria

read\_buffer\_size & read\_rnd\_buffer\_size

These are not storage engine specific buffers

**Estimating Memory Usage**

worst case calculation for memory footprint can be done as: 

sum(global\_buffers)+(max\_conn \* sum(session\_buffers))

  

All buffers for all clients maxed at one time is unlikely. Over committing memory is a normal practice and is usually safe.Monitoring memory use is essential.We need to be aware that host memory is limited.Make sure disk swap space is available and minimize large session buffers.

### Data Directory/Disk Storage

Disk storage should be kept of larger volumes to avoid any space bottlenecks.For example even for an alter table usually the operation takes twice the size of table on disk.Some solutions for maintaining disk storage are:  
\*symbolic links & partitioning with MyISAM files  
\*InnoDB tablespace can be put on a different volume from data directory and can have multiple \*segments on multiple volumes.  
**Data on Replication Slave**  
This would contain all the files on master and addition to that relay logs,master info file,relay log info,May require additional trigger files etc.  
Best way :InnoDB on Master , but MyISAM on slave  
  
**Temporary Disk Usage**  
There are also temporary storages used for mysql operations such as:  
\*explicit temp tables on disk(session based)  
\*implicit temp tables for various uses(sort/group op, intermediate results)  
\*alter/optimize table ops  
\*storage of LOAD DATA LOCAL INFILE files or replicated import files on slave device

  

The directory name of the temporary disk is stored in @@tmpdir variable.Replicated import files stored in directory named in @@slave\_load\_tmpdir variable.

Default is /tmp on \*nix and C:\\TEMP on windows.

  

Temp Directory issues:

unix - /tmp as /tmpfs

ram based so never written

sysadmin may remove /tmp in prod.

  

**Disk Speed Issues**

disk speed critical for efficient operations(unless all data fits into memory tables)

reads can be aided by caching(query caching)

writes are having bottleneck

\-cached writes can potentially lose data

\-battery backed writes cache are safer

  

**Disk Speed remedies**

Buy faster disk,small lookup tables(zip,state codes) can be mirrored to RAM.Tables and log files can be separated onto multiple drives for faster,simultaneous access.

  

**disk redundancy**

The files having maximum size for a MySQL server are the backup and binary log files.Redundancy techniques like using RAID or SAN can be used to provide redundant data copies for critical data.Replication can also be used as data redundant technique but since it is asynchronous, we have potential to loose some data which are not copied to slave.

Better approach is to have a RAID + Replication setup or use a Distributed Redundant Block Device(DRBD).

  

**Open Files**

MySql needs to have many files open for its operation references ( handles ) to which are maintained by OS.This requires computer resources.We can set limits for MySQL (open-files-limit).

  

The different open files used are:

\*client connection ( 1 socket per conn )

\*logs {error,binary,slow query} (in master) and repl files {master.info,relay,relaylog.info}( in slave )

\*storage engine files

\- .frm for each open table

\- MyISAM tables use .MYD & .MYI

\- InnoDB only needs tablespace and log files

 -innodb\_file\_per\_table is in use (.ibd) per table

  

\*implicit disk based temp tables(session by session basis )

\*export files ( select into OUTFILE )

\*import files ( load data INFILE ) for each thread

\*administrative tables ( if write to disk is reqd )