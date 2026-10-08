---
title: 'MySQL Installation'
description: 'What is Installed bin directory ( and sbin in some ) = contains server prgms (mysqld and others) data directory( contains db directory ) innoDB tablespace file'
date: 2019-07-08
tags: []
featured: false
---

**What is Installed**  
 \*bin directory ( and sbin in some ) = contains server prgms (mysqld and others)  
\*data directory( contains db directory )  
 \*innoDB tablespace file and transaction logs  
\* my.cnf file  
  
  **What is tweaked:**  
\* mysql db(containing administrative info) created on some systems  
\*Time zone tables ( optional )  
\*PATH env variable ( location of bin directory )  
\*setup server for auto launch  
\*update my.cnf to reflect setup changes  
  
  **Windows Installation** program in Program File directory data in different location depending on version C:\\prgm files\\MySQL Server bin - pgm files including mysqld lib - libraries include - include header files share - support files - char set files,utility scripts data - "Template" data directory example my.ini files  
  
  **Data directory \[ windows XP & 2003 Server \]** C:\\Doc & setting\\all users\\...  
 data - real data directory,db directories,innoDB tablespace files,innodb trans log files,various log files my.ini - real config file  
  
  **Data directory \[ windows 7 & 2008 Server \]** C:\\ProgramData\\MySQL  
  
  **Linux Installation** in rpm installation client pgms in /usr/bin server pgms /usr/sbin logs & database /var/lib/mysql various supoprt files including charcter set,example config files,scripts etc in /usr/share/mysql other /usr directories /lib and /include /tmp  
**Initailizing data directory** tar installation would require us to do initialize of data directory,since mysql db is required for operations.We have script to initialize it executing script: \*use mysql\_install\_db from scripts directory \*server should not be running scripts/mysql\_install\_db --user=mysql --bootstrap{run in min mode} --skip-grant-tables  
  
  **Named Time Zone Tables** Optional, time zone setting affects TIMESTAMP values helps in daylight saving and local time zone variations Tables are already in mysql db Unix - copy OS time zone info to time zone table use mysql\_tzinto\_to\_sql pgm which generates SQL script mysql\_tzinfo\_to\_sql /usr/share/zoneinfo | mysql -u root mysql Windows - retrieve complete time zone tables as zip from dev.mysql.com/downloads/timezones.html and replace existing files with complete ones  
  
  **First Admin User account** most imp user - root remove all but root@localhost account should have all privs and grant option can rename the account from root login and create other users