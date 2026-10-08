---
title: 'Openedge Replication Monitoring and commands'
description: 'The replication process is a real time syncing of the master and slave database. Any discrepancies or issues can lead to huge lag betweeen data updated in'
date: 2017-12-14
tags: ['openedge-replication-monitoring', 'replication-commands', 'dsrutil']
featured: false
topic: 'Progress/OpenEdge'
order: 20
---

  
  
The replication process is a real time syncing of the master and slave database.  
Any discrepancies or issues can lead to huge lag betweeen data updated in slave or even stalling of the updates into slave database.  
  
So it is critical to monitor the replication process and check the health status of the same.  
  
  
To monitor , use the dsrutil utility with the monitor option  
  
**dsrutil <dbname> -C monitor**  
  
This can be done on the source or target side  

  

  

This is how the server screen (S) of monitoring will look like

  

Site Replication Monitor Version 2     Page 1

     Database: /data/source\_db

     Database is enabled as Fathom Replication:    Source

    Server is:                                    Normal processing

    Number of configured agents:                 1

    Defer Agent Startup :

        Continue connection attempts until:       Mon Nov 7 11:59:55 2005

        Deferred Agent Startup will expire in :   1 Hr 14 Min 44 Sec

        Next connection attempt in :              30 Seconds

        Connections attempts performed            1

        Agent(s) currently connected              0

    Delay Interval (current / min / max):         25 / 5 / 500

    Recovery information

        State:                             No recovery being performed

        Agents needing recovery:           0

        Agents connected:                  0

        Agents in synchronization:         0

    Transition information:

        Type:                              Manual

        Transition timeout limit:          600 seconds  

  

  

  

This is how agent screen (A) will look like

  

Site Replication Monitor Version 2     Page 1

     Database: /data/source\_db

     Agent:

        Name:                                     agent1

        ID:                                       1

        Host name:                                localhost

        Target database:                          target\_db

        State:                                    Normal processing

        Critical:                                 No

        Method:                                   Asynchronous

        Remote agent is:                          Connected via broker

                                    Source and target are synchronized

                                                            In normal processing

    Remote agent is waiting for:               Nothing

    Recovery state:                            No recovery being performed

    Maximum bytes in TCP/IP message:         30720

    Server/Agent connection time:              Mon Oct 31 14:50:58 2005

    Server/Agent connection timeout:           120.000 seconds

    Transition information:

        Type:                                  Manual

        Timeout limit:                         0 seconds

    The last block was sent at:                Mon Oct 31 14:57:42 2005

    Activity information:

        Blocks sent:                           720

        Blocks acknowledged:                   28

        Synchronization points                 12

     AI Block Information:

        Current RDBMS Block (Seq / Block):     5 / 1923

        Last Sent Block (Seq / Block):         5 / 1923

    Server to agent load check interval:       10 blocks

    Time between server and agent load checks:    5.597 seconds

    Time taken to respond to load check:          0.178 seconds

  

  

  

  

  

### **Some other dsrutil options are:**

  

 **applyextent**

Manual application of source AI extents to the target database.

**canceldefer**

Do not attempt reconnect to deferred replication agent.

**connectagent or startagent**

Start agent(s).

**disablesitereplication**

Online disable of replication on the source database.

**recovery**

Displays the replication recovery information.

**relwaits**

Release any waits so that database activity can continue.

**restart**

Restart replication server.

**terminate**

Terminates replication server or agent.

**transition**

Transition agent to a replication-enabled database.

**triggertransition**

Places the target database into a pre-transition state.

  

  

  

### **Some other commands used in replication context are:**

  

  

proutil dbname -C describe

  

dsrutil dbname -C status

  

dsrutil dbname -C restart server

  

dsrutil dbname -C terminate server

  

dsrutil dbname -C enablesitereplication source

  

dsrutil dbname -C enablesitereplication target

  

proutil sourcedb -C disablesitereplication source

  

proserve dbname -n 20 -B 1000 -S 1166 -aiarcdir <dir> -aiarchiver 600 -DBService replserv 

  

proserve dbname -n 20 -B 1000 -S 1177 -DBService replagent

  

rfutil dbname -C aimage begin

  

rfutil dbname -C aimage end

  

rfutil dbname -C marked backup

  

proquiet dbname enable

  

proquiet dbname disable

  

  

  

  

  

  

  

  

  

S