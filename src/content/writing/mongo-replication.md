---
title: 'Mongo Replication'
description: 'Replication in any database is critical for setting up a secondary instance for the database instance.In mongo replication serves the purpose of : HA - High'
date: 2019-03-25
tags: ['replication', 'mongo']
featured: false
---

Replication in any database is critical for setting up a secondary instance for the database instance.In mongo replication serves the purpose of :  
\* HA - High Availablity on a failover  
\*Durability - Data safety of our primary database instance  
\* Maintaining extra copies of the critical database  
\*DR - Having a setup of disaster recovery to help in case of loss of servers/drives in case of some unseen disasters like natural calamities.  
  
The database replication setup in Mongo is asynchronous i.e. there is  latency for writing from master to slave databases.Also for mongo we can have single primary with multiple slave setups.  
  
Replication Cluster : Primary and set of secondaries are together called as cluster and the instances part of this clusters are called  as members of set  
  
Replication Factor: This refers to the number of members in sets including primary and secondaries.  
  
  
Replication can be:  
  
\* Statement Based :  Each CRUD operation would be replicated to the slave databases in the replication setup statement by statement.  
  
\* Binary Based: The binary corresponding to each transaction would be replicated to target databases in this case.  
  
**Automatic Failover**  
Mongo has automatic failover and automatic node recovery when a member of replica set fails.Mongo uses consensus / majority notion to determine when primary is down.  
The mongo driver is replica set aware , so when one of the members of the replica set goes down one of the active member is elected as primary and application starts using that node.  
  

### Recommendation For Replica Sets

1 data Center:

\- 3 members

\- 2 + 1 arbiter

\- 2 with manual failover

  

\-3 members with 1 small server as secondary, we can keep priority 0 for that .

Multiple data center:

\- 3 members

\- 2 in one DC1, one secondary in DC2

\- Make priority 0 for DC2

  

\- 3 members

\- Each in DC1, DC2 and DC3

  

Limit per set : <= 12 members and <= 7 voters

  
Replication sends operations from primary , not bytes – thus storage engine doesn’t affect.Thus different members in the replica set can have different storage engines.