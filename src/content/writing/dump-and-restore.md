---
title: 'Dump and Restore'
description: 'The logical dump of all database can be done using mysqldump utility as below: mysqldump -u root -p --all-databases alldatabases.sql The logical dump of a'
date: 2019-03-07
tags: ['mysql', 'mysql-restore', 'mysql-dump']
featured: false
topic: 'MySQL'
order: 14
---

  
  
The logical dump of  all database can be done using mysqldump utility as below:  
**mysqldump -u root -p --all-databases > all\_databases.sql**  
The logical dump of a particular database can be done using mysqldump utility as below:  
**mysqldump -u root -p publications > publications.sql**  
The restore the dumped sql flat file can be done for all databases can be done as  
**mysql -u root -p < all\_databases.sql**  
The restore for a particular database can be done as below  
**mysql -u root -p -D publications < publications.sql**