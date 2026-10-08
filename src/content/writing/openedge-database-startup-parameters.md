---
title: 'OpenEdge Database Startup Parameters'
description: 'Once you have created a database , the database would be available in a single user mode, i.e. only one user would be able to access the database at a time.'
date: 2017-12-14
tags: ['database-buffer', 'mn', '-n', '-ma', 'single-user-mde', '-mi', 'pro', 'lock-table', 'startup-parameters', 'mpro', '-b', 'pf-file', 'multi-user-mode']
featured: false
topic: 'Progress/OpenEdge'
order: 999
---

  
  
Once you have created a database , the database would be available in a single user mode, i.e.  
only one user would be able to access the database at a time.  
  
Once created we can access the **single-user mode** database using pro command as below:  
  
pro <dbname>  
  
  
For the database to be available to multiple users at the same time, we need to start the database in **multi - user mode**.  
  
To start the db in multi user mode we can use the utility proserve as below  
  
**proserve <dbname>**  
We can use multiple startup parameters to start our database which can result in  various benefits like enhancing the performance of the database,deciding the traffic on the db,setting up connection settings for the users to connect etc.  
  

### Below are some commonly used start up parameters :

  
**\-B  Database Buffer :**   
It denotes the shared memory allocation for the database.This would serve as the memory for the database operations to be run on the CPU before writing it to disk.  
  
For instance if you query a set of records in a database , it would be pulled into this alloted memory for better performance avoiding the I/O hit each time you query the data.  
  
Buffer Hit(can be read using promon utility) would serve as a critical data in this context.  
It denotes the % hit  made on the database buffer with respect to I/O for any db operation.  
  
To calculate an optimal value of -B to be given to start our database we should consider RAM available and the size of the database we are dealing with.  
  
say for a db residing in a server of 50 GB RAM , you may allocate say 30GB dedicated shared memory to your database keeping remaining 20GB for other OS activities.  
  
To allocate 30 GB shared memory -B can be calculated as  
  
30 \* (1024\*1024\*1024)/8192  =  3932160  
  
  
**\-B2  Alternate Database Buffer :**   
  
Alternate database buffer is same as a -B parameter.If you would require a dedicated db buffer for a set of or a single table dependning on its size/fequency of use etc,  
  
We can allocate that table with a -B2 value , so that the allocated ram for that will be delicately associated with the tables we define for it.  
  
**\-L Lock Table:**  
  
  
It denotes the total number of locks in the database across all users.This value is decided on the application need for it,We should increase the value of -L as the high water mark approaches the -L value.  
  
  
**\-spin  and  -LRUSKIPS :**  
  
  
**\-spin** or the  "spin lock tries" parameter is used to control the access to the memory.  
  
When a process needs a memory resource, it attempts to acquire the resource's latch. If it cannot acquire the resource's latch, it repeats the attempt.  
  
This iterative process is called spinning. If a process fails to acquire a latch after a specified number of spins, the process pauses, or takes a nap, before trying again.  
  
 If a process repeatedly fails to acquire a latch, the length of its nap is gradually increased.  
  
You can set the Spin Lock Retries (-spin) parameter to specify how many times to test a lock before napping.  
  
  
**\-lruskips**   The LRU skip parameters allow you to specify the number of times a buffer in the buffer pool is accessed before it is placed on the Most Recently Used (MRU) end of the LRU chain.   
  
 Accessing a buffer a specified number of times eliminates the need to acquire the LRU latch each time a buffer is accessed.    
  
When the LRU skip value is tuned to your environment, contention on the LRU latch decreases, improving concurrency and performance, and there is no increase in the number of page misses in the buffer pool.   
  
 If increasing the LRU skip value causes increased buffer pool misses, then the  value should be tuned down or turned off altogether.  Setting the LRUskip value to zero disables the feature, and is the default.  
  
**  
User Connections :**  
There are many user connection parameters that can be set to define the parameters specific to the connections made to the database.  
  
**\-n** : Total number of connections that can be made.APW, BIW, AIW, promon sessions, online backup sessions, watchdog sessions all must be counted within the -n value.  
  
**\-Mi/Ma/Mn/Mpb:** Network broker connection parameters.  
  
\-Mn:total number of servers that are desired for remote connections  
  
\-Ma :number of clients that will be allowed to connect to one remote client server.  
  
\-Mi :Sets the minimum number of remote connections that should to be connected to a server process before broker spawns a new server if -Mn has not yet being reached  
  
\-Mpb :  Sets the maximum number of servers that a particular broker can spawn.   
  
To set -Ma, -Mn and -n startup parameters appropriately define:  
  
1.The maximum number of concurrent remote users.  
  
2\. The maximum number of concurrent local users (self service clients).  
  
3\. Set -Ma as high as possible but lower than 11 (increasing above 10 clients per server may degrade performance, decreasing it under 5 will require more server processes creating unnecessary overhead).  
The default value for -Ma is 5 and its maximum value is 2048, this value represents the maximum number of queued client processes. If the application requires long and heavy queries and there is performance degradation, -Ma may need to be decreased.  
  
4\. Calculate -Mn (the number of required servers) by dividing the maximum remote users by the value of -Ma, plus 1 for each extra secondary broker if any.  
  
5\. The product value(-Ma) \* value(-Mn) must be equal to the maximum number of remote users.  
The formula for -n is: value(-n) = (maximum # of remote users) + (maximum # of local users) + 2.  
Where the value "2" in the formula above will be used by proMon and proShut utilities connect to the DB.  
  
 Keep the following relation:  
**value(-Ma) \* value (-Mn) < value(-n)**  
  
Example :  
  
Remote users: 32  
Local users: 15  
  
Value(-Ma)=8   
Value(-Mn)=(Remote users)/Value(-Ma)= 32/8 = 4 (plus 1 for each extra secondary broker if any)  
  
  
Set -Mn 4, -Ma 8, -n 49  
  
  
  
**\-m3:** Used for secondary broker setup i.e a SQL engine connection setup.  
  
  
**\-****ServerType** : To define Broker server group i.e 4Gl.SQL or Both.  
  
  
**\-S Port Number:**  
We can start the database brokers(primary or secondary) on a particular port number , so that any remote connections would require to specify the -S parameter with the port number in which the broker was started.  
We can even specify the port number in the services of the hosted server and use the alias name as -S input.  
  
  
**\-N Network Type:**  
  
Use Network Type (-N) to specify the network communications protocol supported by the OpenEdge RDBMS. TCP is the only supported option.  
  
  
**\-pica Replication Buffer:**  
\-pica is used to set the size of the database service communications area in Kb.   
  
The database service communications area is used to store after-image block write notifications intended for OpenEdge Replication.  
  
  
  
**\-aiarcdir      After-image File Management Archive Directory List****:**  
  
A comma separated list of directories where archived after-image files are written by the AI File Management Utility.   
The directory names can not have any embedded spaces.**\-aibufs and -bibufs :**  
  
Use After-image buffer /Before-image buffer (-aibufs/-bibufs) to specify the number of after-image/before-image buffers.   
  
This parameter is useful only when running the after-image/before-image writer (AIW/BIW) because the AIW/BIW writes the filled after-image/before-image buffers to disk, making the buffers available to other client and server processes.  
  
  
**\-Mm Message Buffer Size:**  
\-Mm .is used to specify the standard message buffer size, in bytes.   
  
This parameter is relevant only for network client/server connections. Message Buffer Size (-Mm) can be specified by both the client and the server,   
  
however the size of the message buffer specified by the server takes precedence; a value specified by the client is used as a suggestion for initial buffer allocation,   
but the client then adopts the server value when the connection is initiated   
  
  
**\-semsets** **Semaphore Sets:**  
  
An integer specifying the number of semaphore sets available to the broker.  
  
  
When more than 1,000 users connect to a single database, there might be high contention for the semaphore set. If there is a lot of semaphore contention on a system, using multiple semaphore sets helps improve performance on high user counts.  

  

  

**\-minport (Minimum Dynamic Server)  and -maxport**   **(Maximum Dynamic Server)****:**

Used to specify the lowest port number in a specified range of port numbers accessible to a client. You specify the higher port number with the -maxport parameter. 

  

  

  

**\-basetable and -baseindex:**

Use Base Table (-basetable) with Table Range Size (-tablerangesize) to specify the range of tables for which you want to collect statistics.

  

Use Base Index (-baseindex) with Index Range Size (-indexrangesize) to specify the range of indexes for which you want to collect statistics. 

  

  

  

**\-PendConnTime** **Pending Connection Time :**  
Use Pending Connection Time (-PendConnTime) to prevent connection errors caused by network problems.  
  
When -PendConnTime is used, the servers examine the timestamp on the latest reservation and, if the Pending Connection Time period has elapsed, the broker assumes that the client has failed to connect. The broker then clears the reservation, making the server available for new clients.  
  
  
**\-aistall and -bistall :**  
Use After-image Stall (-aistall) to suspend database activity if all AI files are filled. -aistall ceases all database activity until the AI extent is emptied and sends this message to the log file.  
  
Use Threshold Stall (-bistall) with Recovery Log Threshold (-bithold) to quiet the database when the recovery log threshold is reached, without performing an emergency shutdown.   
When you use -bistall, a message is added to the database log (.lg) file stating that the threshold stall is enabled.  
  
  
**\-pinshm:**  
  
Using -pinshm will prevent the OS from swapping shared memory contents to disk, which can help improve performance.  
  
  
**\-omsize:**  
  
Use Storage Object Cache Size (-omsize) to specify the size of the object cache for all database objects.  
  
  
**\-maxAreas:**  
  
Use Maximum area number (-maxAreas) to specify the highest area number available for use during the time the database is online. Increase the highest area number by shutting down and restarting the database with a higher value, or remove the -maxAreas parameter to have the maximum number available.  
  
  
**\-napmax:**  
Use Nap Maximum (-napmax) to specify the maximum time (in milliseconds) to sleep (nap) after the -spin value is exhausted due to failure to acquire a latch.  
  
  
Increasing the value of -napmax can decrease CPU utilization, and can decrease individual user performance while improving performance of the overall system.  
  
  
  

## Parameter File Example:

  
While starting the database , we can either give each parameter along with the proserve utility with corresponding values or else we can use a paremter file and provide it as input of -pf parameter for proserve.  
  
proserve <dbname> -pf <parameter file name>  
Now since we have been through most of the regularly used and critical startup parameters ,below parameter file will give an idea of optimal values we should provide for each parameters  
  
  
  
\# Common RealServicing Parameter File  
#  
#Database Param  
\-S 12324  
\-B 15073280 ##115GB \*8192/1024\*1024\*1024  
\-B2 2490368  ##19GB   
\-spin 100000  
\-L 200000  
\-aiarcdir /emc/reale/archive/mssarc/  
  
  
\-N tcp  
\-n 8932  
\-Ma 6  
\-Mn 1487  
\-Mi 3  
\-Mpb 1085  
\-semsets 90  
\-aibufs 150  
\-bibufs 150  
\-basetable 1  
\-tablerangesize 450   
\-baseindex 1  
\-indexrangesize 1800  
\-Mm 8192  
\-pica 150000  
\-minport 22501            
\-maxport 24500           
\-PendConnTime 10  
\-aistall  
\-bistall  
\-pinshm  
\-omsize 2048  
\-maxAreas 200  
\-napmax 300  
\-lruskips 100  
  
\-lru2skips 100