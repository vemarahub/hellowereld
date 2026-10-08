---
title: 'Openedge Database Replication'
description: 'Openedge Replication is a feature/product from Progress that provides real-time synchronization between two or more databases. There is a replication server'
date: 2017-12-14
tags: ['source-db', 'replication', 'after-image', 'master', 'empty', 'target-db', 'replication-server', 'slave', 'repl.properties', 'replication-agent', 'busy', 'locked', 'full']
featured: false
---

  
Openedge Replication is a feature/product from Progress that provides real-time synchronization between two or more databases.  There is a replication server (source) and one or two replication agents (targets).  
  
  
Progress OpenEdge Replication and Replication Plus provide tools and procedures to protect installations from potential outages by replicating a primary database to one or more remote, hot-standby  destinations. Full integrity between the source and remote databases is maintained. OpenEdge Replication is completely transparent to the applications running on the platform.  
  

###   
How Replication works:

  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhRwAqX20IMKNSk7UQvpLDoNA1hqCzpBSMEYsuZ2CeVEpA9zE_3alAbGhOxopCquOeAPPzHkinjgztny-wxWkxRSk_qHlrWcarK5gpns_U0mws5SSajVTDtodZEt7KFqawMIsOHprx1Uc-r/s640/replict.PNG)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhRwAqX20IMKNSk7UQvpLDoNA1hqCzpBSMEYsuZ2CeVEpA9zE_3alAbGhOxopCquOeAPPzHkinjgztny-wxWkxRSk_qHlrWcarK5gpns_U0mws5SSajVTDtodZEt7KFqawMIsOHprx1Uc-r/s1600/replict.PNG)

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
**Source DB/Primary database** \- The database your application interacts with.  Used as a source in normal operations mode  
  
**Target DB/Secondary database** \- The database that acts as a target in normal operations mode.  
  
  
**AI files** enabled at source database are used to transmit data from source to replication using the OE replication server and agent.  
  
The AI files have following status when used for replication:  
  
\>> **Empty**  
           Ready for use  
  
\>>**Busy**  
          Currently being used.  
  
\>>**Full**  
          Closed and applied to target  
  
\>>**Locked**  
           Closed and not yet applied to target  

  

  
  
To setup replication we need to copy source and target configuration files from the DLC path (<installation path>/properties) to the corresponding database directories of  source and target.  
  
  
Following is how a source property file **source.repl.properties** look like:  
  
\[server\]  
    control-agents=agent1  
    database=source  
    transition=manual  
    transition-timeout=600  
  
\[control-agent.agent1\]  
   name=agent1  
   database=source  
   host=moth  
   port=4501  
   connect-timeout=120  
   replication-method=async  
   critical=0  

  

  

Following is how a target property file **target.repl.properties** look like

  

\[agent\]  
   name=agent1  
   database=source  
   listener-minport=4387  
   listener-maxport=4500