---
title: 'Storage Engines in MySQL'
description: 'MySQL supports various storage engines to service the database server and perform the database activities. Each storage engine is unique and provides a'
date: 2019-03-12
tags: ['mysql', 'mysql-storage-engine']
featured: false
topic: 'MySQL'
order: 8
---

  
  
MySQL supports various storage engines to service the database server and perform the database activities.  
Each storage engine is unique and provides a specific feature to the MySQL server and its operation.  
  
Below figure will give an idea of the architecture of the storage engines in MySQL:  

  

  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgxNT8xaVTuVxClIhnYYykWaNrgnJl1_4V3Xq2o_dHFi6vX9b4W88o8t3Mqz4ogf7w85oE-Y362GH1VOxPeUzfKyu-7mvrW_Yc0ZexuKrlq8YchHmtZho49F4OwBUnu3U_C_PpY0omxBtk/s640/Capture12.JPG)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgxNT8xaVTuVxClIhnYYykWaNrgnJl1_4V3Xq2o_dHFi6vX9b4W88o8t3Mqz4ogf7w85oE-Y362GH1VOxPeUzfKyu-7mvrW_Yc0ZexuKrlq8YchHmtZho49F4OwBUnu3U_C_PpY0omxBtk/s1600/Capture12.JPG)

  

  

The various storage engines in MySQL are as follows:  
  
**MyISAM** : Default engine and most used in web, data warehousing, application environments.Its supported on all mysql configurations.MyISAM manages non-transactional tables.It provides high speed storage and retrieval, as well as fulltext searching capabilities.  
  
**InnoDB :** A transaction-safe(ACID compliant) engine that has commit, rollback, crash-recovery capabilities to protect user data.It’s row level locking and oracle style consistent nonlocking read increase multi-concurrency and performance.Supports foreign keys referential-integrity constraints.  
The InnoDB and BDB storage engines provide transaction-safe tables.InnoDB is also included by default in all MySQL 5.0 binary distributions. In source distributions, you can enable or disable either engine by configuring MySQL as you like.  
  
**Falcon :** Designed with the modern database requirement in mind and particularly for use within high-volume web serving or other environment that requires high performance, while still supporting transactional and logging functionality required.Multi version concurrency control(MVCC) enable records and tables to be updated without overhead associated with row level locking mechanisms. Falcon is transaction-safe, ACID compliant.  
  
**Maria:** Crash safe version of MyiSAM, but has recovery support.  
  
**Memory:**Stores all data in RAM for extremely fast access in environments that require quick lookups of reference, formerly known as heap engine.It provides in memory tables.Formerly known as Merge engine  
  
**Merge:**Allows a mysql DBA or developer to logically group a series of identical My ISAM tables and reference them as one object, good for data warehousing.The MERGE storage engine allows a collection of identical MyISAM tables to be handled as a single table. Like MyISAM, the MEMORY and MERGE storage engines handle non-transactional tables, and both are also included in MySQL by default.  
  
**Archive:** Perfect for storing and retrieving large amount of seldom referenced historical, Archived, or security audit informations etc.  
  
**Federated :** Offer ability to link separate Mysql server to create one logical database from many physical servers.  
  
**CSV:** stores data in text using comma-separated value.This is usually for import and export in csv format  
  
**Blackhole:** accepts but does not store data and retrievals always return an empty set.