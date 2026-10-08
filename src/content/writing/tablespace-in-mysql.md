---
title: 'Tablespace in MySQL'
description: 'In MySQL table space can be created to store tables of the MySQL server. If we don''t create a tablespace of our own the default tablespace for any new table'
date: 2019-03-13
tags: ['tablespace', 'mysql']
featured: false
---

In MySQL table space can be created to store tables of the MySQL server.  
If we don't create a tablespace of our own the default tablespace for any new table created would be "innodb\_system".  
  
To create a new tablespace in the MySQL server use the below command:  
  
**create tablespace ts3 add datafile 'ts3.ibd' engine=innodb;**  
The data file is the physical file location of the tablespace , we can create in a custom location we want or by default it will be created in /var/lib/mysql path  
  
To create the tablespace in a custom path, create the new folder and change the ownership of the folder to mysql.  
**mkdir /var/lib/tabsc/**  
**chown -R mysql: /var/lib/tabsc/**  
  
Then the new tablespace can be created on the new path as below:  
**create tablespace ts4 add datafile '/var/lib/tabsc/ts4.ibd' file\_block\_size=8192 engine=innodb;**  
The file\_block\_size refers to the block size for the tablespace created.By default it is 16kb.  
Even if the tablespace is created in a seperate path, a .isl (innodb symbolic link) will be created in the default /var/lib/mysql path.The file .isl will have the custom path of the tablespace.  
  
We can see all the tables under a particular tablespaces in MySQL using the below query :  
**SELECT FILE\_ID, FILE\_NAME, FILE\_TYPE, TABLESPACE\_NAME, FREE\_EXTENTS, TOTAL\_EXTENTS,**    
**EXTENT\_SIZE, INITIAL\_SIZE, MAXIMUM\_SIZE, AUTOEXTEND\_SIZE,DATA\_FREE, STATUS ENGINE**   
**FROM INFORMATION\_SCHEMA.FILES WHERE TABLESPACE\_NAME LIKE 'innodb\_system' \\G**  
While creating a new table , we can specify the tablespace it should fall as below:  
  
**create table t1 (c1 int primary key) tablespace ts4 row\_format=compressed key\_block\_size=8;**  

  

We can change the tablespace of a particular table to another tablespace using the alter query:

**alter table t1 tablespace t5;**