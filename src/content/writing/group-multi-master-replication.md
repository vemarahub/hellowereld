---
title: 'Group Multi Master Replication'
description: 'Group multi master replication is a master-master replication setup in MySQL. Follow the below steps to configure group multi replication: 1.Considering 3'
date: 2019-03-14
tags: ['mysql', 'group-master-replication']
featured: false
---

Group multi master replication is a master-master replication setup in MySQL.  
Follow the below steps to configure group multi replication:  
  
1.Considering 3 servers in the group multi master replication, install mysql-community-server on all the 3 servers.  
  
2.Consider one of the server to be the bootstrap server .  
  
3.Run uuidgen command on the bootstrap server to generate a hexadecimal unique key:  
**uuidgen**  
**5c200097-3e7e-4616-a045-25e871df7cb6**  
4.Add the below entry in /etc/my.cnf file of all the 3 servers to be configured:  
**\# General replication settings**  
**gtid\_mode = ON**  
**enforce\_gtid\_consistency = ON**  
**master\_info\_repository = TABLE**  
**relay\_log\_info\_repository = TABLE**  
**binlog\_checksum = NONE**  
**log\_slave\_updates = ON**  
**log\_bin = binlog**  
**binlog\_format = ROW**  
**transaction\_write\_set\_extraction = XXHASH64**  
**loose-group\_replication\_bootstrap\_group = OFF**  
**loose-group\_replication\_start\_on\_boot = OFF**  
**loose-group\_replication\_ssl\_mode = REQUIRED**  
**loose-group\_replication\_recovery\_use\_ssl = 1**  
**\# Single or Multi-primary mode? Uncomment these two lines**  
**\# for multi-primary mode, where any host can accept writes**  
**#loose-group\_replication\_single\_primary\_mode = OFF**  
**#loose-group\_replication\_enforce\_update\_everywhere\_checks = ON**  
5\. Add below entry in /etc/my.cnf file with replication\_group\_name as the uuid generated in  
step 3.Also add ip addresses of all the three servers involved ip ip\_whitelist and group\_seeds entry  
**\# Shared replication group configuration**  
**loose-group\_replication\_group\_name = "5c200097-3e7e-4616-a045-25e871df7cb6"**  
**loose-group\_replication\_ip\_whitelist = "192.168.197.131,192.168.197.130,192.168.197.129"**  
**loose-group\_replication\_group\_seeds = "192.168.197.131:33061,192.168.197.130:33061,192.168.197.129:33061"**  
  
6.Add ip address of each server specifically for the below entries and provide a seperate server\_id for each  
**\# Host specific replication configuration**  
**server\_id=1**  
**bind-address = "192.168.197.131"**  
**report\_host = "192.168.197.131"**  
**loose-group\_replication\_local\_address = "192.168.197.131:33061"**  
7\. After adding all the entries, do a restart of mysqld  
**systemctl restart mysqld**  
8.On the all three nodes run the below queries on MySQL prompt:  
**SET SQL\_LOG\_BIN=0;**  
**CREATE USER 'repl'@'%' IDENTIFIED BY '!@#Ilg007' REQUIRE SSL;**  
**GRANT REPLICATION SLAVE ON \*.\* TO 'repl'@'%';**  
**FLUSH PRIVILEGES;**  
**SET SQL\_LOG\_BIN=1;**  
9.Also, run the below statement on all three nodes to enable the created user for replication for channel group replication recovery  
**change master to master\_user='repl',master\_password='!@#Ilg007' for channel 'group\_replication\_recovery';**  
10.Install group\_replication plugin on all three nodes  
**Install plugin group\_replication soname 'group\_replication.so';**  
11.Check if the plugin is active  
**show plugins**  
  
12.We would require SSL support for group replication, so first check on the bootstrap node if ssl is available  
**show variables like "%ssl%"; or \\s**  
  
13.If ssl is disabled , we can install the ssl using mysql\_ssl\_rsa\_setup utility on the bootstrap node  
**mysql\_ssl\_rsa\_setup --uid=mysql**  
  
14.Confirm if ssl has been installed correctly by checking for .pem extention files in /var/lib/mysql and restart mysqld to make the ssl change in effect.  
  
15.Now that the configuration setup is completed for all the nodes, start the group replication on the bootstrap node first as below  
**set global group\_replication\_bootstrap\_group=ON;**  
**start group\_replication;**  
**set global group\_replication\_bootstrap\_group=OFF;**  
16\. Now if we check the below query, we would be able to see our bootstrap node as online in the query result  
**select \* from performance\_schema.replication\_group\_members;**  
17.In the other two nodes, simply start the group replication  
**start group\_replication;**  
18\. Now if we check the query on step 16 on any of the nodes, we would be able to see all the three nodes as online in the query result.  
**select \* from performance\_schema.replication\_group\_members;**  
19.Now the multi replication setup is completed, we can try adding data in bootstrap node and check if it is getting replicated in other two nodes.  
  
20.By any chance , if any of the nodes is not listed in the step 18 query or is in recovery mode, check logs /var/log/mysqld.log for any possible errors.  
  
21.One of the common error is of data in any of the nodes being greater than that of bootstrap node, follow the below steps to rectify such errors:  
 a. On all three nodes run the below command  
**SELECT @@global.gtid\_executed;**  
  
b.Check for any missing GTID in bootstrap which are present in other two nodes  
  
c.load those GTIDs in bootstrap node on by one  
**SET GTID\_NEXT='a1c5e25e-2715-11e7-bbe4-0800273fb9a2:1';**  
**begin;**  
**commit;**  
**SET GTID\_NEXT='a1c5e25e-2715-11e7-bbe4-0800273fb9a2:2';**  
**begin;**  
**commit;**  
**SET GTID\_NEXT='AUTOMATIC';**  
  
d. Now run start group replication on the failed nodes  
**start group\_replication;**  
e.Check again if all nodes are online  
**select \* from performance\_schema.replication\_group\_members;**  
22\. For enabling multi write in the multi group replication, uncomment the following lines in /etc/my.cnf file and restart the group replication  
**loose-group\_replication\_single\_primary\_mode = OFF**  
**loose-group\_replication\_enforce\_update\_everywhere\_checks = ON**