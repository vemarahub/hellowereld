---
title: 'Steps for OpenEdge Replication'
description: 'below steps for OS Copy Replication 1.Copy the source.repl.properties file from dlc/properties path and copy the the DB path ,giving it the db name eg:'
date: 2017-12-14
tags: ['target.repl.properties.', 'openedge', 'settting-replication', 'replication-commands', 'dsrutil', 'source.repl.propertes']
featured: false
---

  
  
below steps for OS Copy Replication  
  
1.Copy the source.repl.properties file from dlc/properties path and copy the the   DB path ,giving it the db name eg: testdb.repl.properties.  
  
Edit the file with all entries as below.By using the format as below for the properties file we can maintain the same file for both source and target database.  
  
\==========  
\[server\]  
    control-agents=agent\_testdb  
    database=testdb  
    transition=manual  
    transition-timeout=1200  
    defer-agent-startup=9000  
    agent-shutdown-action=recovery  
    repl-keep-alive=90  
  
\[control-agent.agent\_testdb\]  
   name=agent\_testdb  
   database=testdb  
   host= 10.XX.X.XX  #(target Server IP)  
   port=12165                    #(target DB port)  
   connect-timeout=120  
   replication-method=async  
   critical=0  
  
\[agent\]  
   name=agent\_testdb  
   database=testdb  
   listener-minport=4387  
   listener-maxport=4500  
  
\[transition\]  
   database-role=reverse  
   responsibility=primary  
   restart-after-transition=1  
   source-startup-arguments=-DBService replserv -pf testdb.pf  
   target-startup-arguments=-DBService replagent -pf testdb.pf  
   auto-begin-ai=1  
   transition-to-agents=agent\_mss  
   auto-add-ai-areas=0  
\============  
  
Note: testdb is the name of the database in this context, for which we are setting replication.  
  
  
2.Markbackup ai  
          rfutil testdb -C mark backedup  
   
  
3.Ebable ai on Source  
          proutil testdb -C aimage begin  
   
  
4.Enable replication on Source  
          proutil testdb -C enablesitereplication source  
  
  
5.start replication on Source  
          proserve testdb -pf amos.pf -S 12173 -DBService replserv  
  
  
6.Enable Proquiet on Source  
             proquiet testdb enable  
  
7\.       OS copy the database from source to target server.  
  
8.Disable Proquiet on Source  
          proquiet testdb disable  
  
  
9\.       remove recovey and .lk file from target  
  
10.Repair the db with st file in TARGET Side        
          prostrct repair testdb testdb.st  
          prostrct list testdb  
  
  
11.Modify testdb.repl.properties  
  
\[server\]  
    control-agents=agent\_testdb  
    database=testdb  
    transition=manual  
    transition-timeout=1200  
    defer-agent-startup=9000  
    agent-shutdown-action=recovery  
    repl-keep-alive=90  
  
\[control-agent.agent\_testdb\]  
   name=agent\_testdb  
   database=testdb  
   host=localhost  
   port=12163                    #( Source DB Startup Port)  
   connect-timeout=120  
   replication-method=async  
   critical=0  
  
\[agent\]  
   name=agent\_testdb  
   database=testdb  
   listener-minport=4387  
   listener-maxport=4500  
  
\[transition\]  
   database-role=reverse  
   responsibility=primary  
   restart-after-transition=1  
   source-startup-arguments=-DBService replserv -pf testdb.pf  
   target-startup-arguments=-DBService replagent -pf testdb.pf  
   auto-begin-ai=1  
   transition-to-agents=agent\_testdb  
   auto-add-ai-areas=0  
  
  
  
  
11.Enable target replication  
          proutil testdb -C enablesitereplication target  
       
12.Disable ai on target  
          rfutil testdb -C aimage end  
       
13.Start target  
          proserve testdb -pf testdb.pf -S 12170 -DBService replagent  
       
  
14.After that Restart Source and target..\[ In case replication not happening. Check with step 15 command for checking the replication status \]  
  
15.Check Status  
          dsrutil testdb -C monitor  
     
  
  IF it works then ignore the below..  
  
  
16.After that Restart Source and target Server..  
          dsrutil testdb RESTART Server  
         
16.Check Status  
          dsrutil testdb -C monitor  
  
  
  
  
  
To start Database in replication always use -DBService  
  
Source:  
proserve testdb -pf testdb.pf -S 12163 -DBService replserv  
  
Target:  
proserve testdb -pf testdb.pf -S 12165 -DBService replagent  
  
  
  
  
ALWAYS START THE SLAVE/TARGET FIRST. THEN START THE SOURCE/SERVER  
Always stop the slave/target server first. then stop the source. then start the target and start the source