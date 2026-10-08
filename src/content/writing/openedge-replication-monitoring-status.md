---
title: 'Openedge Replication Monitoring Status'
description: 'When "dsrutil dbname -C status" is used, the "Status" codes are returned When "dsrutil dbname -C status -detail " is used, the "Detail Status" codes are'
date: 2018-12-11
tags: ['replication', 'replication-monitoring', 'openedge']
featured: false
topic: 'Progress/OpenEdge'
order: 17
---

When "dsrutil dbname -C status" is used, the "Status" codes are returned   
  
When "dsrutil dbname -C status -detail " is used, the "Detail Status" codes are returned   
These return codes need to be taken in the context of the database the command was issued against (ie the source replication enabled database, or the target replication enabled database)  
  
It's important to understand the difference between these two sets (a set and a sub-set) as together they provide a fuller picture of the replication status quo.  
  
Here are the details re-grouped by focus (ie source or target or source to agent) :  

**Server to Agent initial connect status codes**1001 Initial Connection  
1002 Initialising  
1003 Target in Quiet Point  
1032 Initial Connection Failed  
1033 Recovery Failed  
1034 Invalid Target Database Configuration  
1035 Agent Failed  
1036 Agent is Ignored  
1037 Agent is Stopped  
1038 Agent is Terminated  
1063 Agent is Ended

**Server**  
1100 connecting status  
1101 processing status  
1102 stalled status  
1103 pre\_transition status  
1104 listening status  
1105 transition status  
1199 inactive   
1255 unknown   
6001 Server Initialisation  
6002 Connecting to Agent(s)  
6003 Configuring Agent(s)  
6004 Recovery Processing  
6005 Startup Synchronization  
6021 Normal Processing  
6022 Performing Transition  
6023 Replication is Suspended  
6060 Server is ended

**Control Agent**   
2080 Pre Transition  
2081 Applying After-image Extent  
2082 Transitioning  
2083 Listening  
2100 connecting status  
2101 processing status  
2102 stalled status  
2103 pre\_transition status  
2104 listening status  
2105 transition status  
2199 inactive   
2255 unknown

**Agent**  
3048 Startup Synchronisation  
3049 Normal Processing  
3050 Recovery Synchronisation  
3051 Being Transitioned  
3052 Target Database in Quiet Point  
3053 Target Database is in a BI stall  
3054 Target Database is in an AI stall  
3100 connecting status  
3101 processing status  
3102 stalled status  
3103 pre\_transition status  
3104 listening status  
3105 transition status  
3199 inactive   
3255 unknown   
  
For example:  
  
\[source\]"STATUS:" 1100 "RP STATE CONNECTING"  
"DETAIL:" 6002 "Connecting to Agents"  
"AGENT:" 1001 "Initial connection"  
  
\[target\]"STATUS:" 3104 "RP STATE LISTENING"  
"DETAIL:" 2083 "Listening"  
"AGENT:" 2083 "Listening"Then when connected:  
\[source\]  
"STATUS:" 1101 "RP STATE PROCESSING"  
"DETAIL:" 6021 "Normal Processing"  
"AGENT:" 3049 "Normal Processing"

\[target\]  
"STATUS:" 3101 "RP STATE PROCESSING"  
"DETAIL:" 3049 "Normal Processing"  
"AGENT:" 3049 "Normal Processing"