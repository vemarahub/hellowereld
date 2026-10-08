---
title: 'Operating System Resources'
description: 'Progress uses several operating system resources, such as shared memory, memory locks, and processes.You can plan Progress database operations more effectively'
date: 2017-12-14
tags: ['biw', 'processes', 'spin-lock', 'openedge-operating-resources', 'spin', 'apw', 'semaphores', 'shared-memory', 'wdog', 'aiw']
featured: false
---

Progress uses several operating system resources, such as shared memory, memory locks, and processes.You can plan Progress database operations more effectively if you understand these resources.  
  
**Shared Memory**  
  
Shared memory is an area in system memory that multiple users can access concurrently.  
Progress stores shared resources in the shared-memory area; more than one user and server can  
access each database.  
Progress uses semaphores and spin locks to synchronize the activities of server and self-service client processes that are connected to a database. Each process uses its semaphore or relies upon the spin lock when it must wait for a shared resource.  
  
**• Database buffers:** Progress reads database blocks into the database buffer pool. Larger buffers usually result in less disk I/O.  
**• Before-image (BI) buffers:** Progress stores BI notes in memory before writing them to disk.  
**• After-image (AI) buffers:** Progress stores AI notes in memory before writing them to disk.  

  
Progress also creates shared-memory tables to provide essential information on the status of each process, server, transaction, and lock.  
  

**Processes**  
  
Progress provides the following optional processes to improve performance:  
  
**• Asynchronous Page Writer (APW):** The APW improves database performance by performing overhead operations in the background. These operations provide available buffers, reduce the number of buffers that Progress reads before writing to disk, and reduce the overhead associated with before-image checkpointing (the process of synchronizing the buffer pool of modified blocks to the database).  
  
**• Before-image Writer (BIW):** The BIW improves performance by continually writing before-image buffers to disk. These writes occur in the background.  
  
**• After-image Writer (AIW):** The AIW improves performance by continually writing AI buffers to disk soon after Progress fills the buffers.  
  
**• Progress Watchdog (WDOG):** The watchdog process cleans up after improperly terminated processes by releasing locks, backing out any live transactions and releasing shared-memory locks, and disconnecting and cleaning up the server’s remote clients.