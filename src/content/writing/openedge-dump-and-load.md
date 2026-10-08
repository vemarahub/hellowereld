---
title: 'Openedge Dump and Load'
description: 'The Openendge RDBMS database, as we know ,would comprise mainly of tables and the data contained it. These table structures and the data containing in it could'
date: 2017-12-14
tags: ['.bd', '.df', 'data-dump', 'data-dictionary', '.d', 'data-load', 'df-file', 'idxbuild']
featured: false
---

  
  
The Openendge RDBMS database, as we know ,would comprise mainly of tables and the data contained it.  
  
These table structures and the data containing in it could be exported to files using the data dictionary and can be used to load back the structure/ data to another database.  
  

**How to go to Data Dictionary mode**

1.  mpro <db-name>

*   hit F3 goto tools>Data dictionary.

3.  mpro <db-name> -p dict.p

  
Thus to recreate a database instance , we can simply dump the structure and data of the database and load it to a new instance.  
  
  
These are the various files exported / loaded for the **dump and load** purpose:  
  
**1\.  .df file :** This file can be created by selecting the tables(single or multiple) whose structure we want to export using  
  
**data dictionary ---> admin ---> dump data and definition ---> Data Definition (.df)**  
  
A sample df file would look like:  
  
ADD TABLE "testTable"  
  AREA "DATA\_AREA"  
  DESCRIPTION "Field change history"  
  
  DUMP-NAME "testTable-------1-------1"  

  

  

ADD FIELD "LOANNUMBER" OF "testTable" AS character 

  DESCRIPTION "Unique alpha-numeric code used to identify loans.

"

  FORMAT "x(13)"

  INITIAL ""

  LABEL "Loan Number"

  POSITION 2

  MAX-WIDTH 31995

  COLUMN-LABEL "Loan Number"

  ORDER 50

  MANDATORY

  

ADD FIELD "FILENAME" OF "testTable" AS date 

  DESCRIPTION "Effective date for parameters for conversion margin values."

  FORMAT "99/99/9999"

  INITIAL "TODAY"

  LABEL "Effective"

  POSITION 3

  MAX-WIDTH 31995

  COLUMN-LABEL "Effective"

  ORDER 60

  MANDATORY

  

ADD FIELD "TRANDATE" OF "testTable" AS date 

  DESCRIPTION "Date of the chargeback transaction."

  FORMAT "99/99/9999"

  INITIAL "TODAY"

  LABEL "Transaction"

  POSITION 4

  MAX-WIDTH 31995

  COLUMN-LABEL "Transaction"

  ORDER 70

  MANDATORY

  

  

ADD INDEX "CHANGEDATE" ON "testTable" 

  AREA "INDEX\_AREA"

  INDEX-FIELD "LOANNUMBER" ASCENDING 

  INDEX-FIELD "FILENAME" ASCENDING 

  

.

PSC

cpstream=ISO8859-1

.

0000005781

  

  

We can load this df file to another database instance, provided the mentioned areas for the database objects are present in the new instance.

  

Loading can be done by following below steps:

In data dictionary:

**admin > load data and definition > Data Definition (.df)**

*   enter the full path of the .df file unless if it present in same directory where DB exist.
*   check mark the stop on error field Press F1
*   wait till it shows load is completed.

  

The data stored in the database can be exported for individual tables in two forms of dump i.e ASCII and Binary dump.

  

**2\. .d file :** The .d files are the ascii dump files which can be taken using data dictionary.These dumps are preferred for smaller table and cannot be run in background.

  

The .d dump can be taken by using below option from data dictionary:

  

**admin ---> dump data and definition ---> Data file(.d)**

  

  

To load the .d files into another instance , provided the same structure of the table is present in the new instance, we can use the below option in data dictionary.

**admin > load data and definition > Data File (.d)**

  

*   enter the full path of the .d file unless if it present in same directory where DB exist.
*   check mark the stop on error field Press F1
*   When load completes, it would show the no of records loaded.

  

  

**3\. .bd file :**  The .bd files are the binary dump file and can be dumped using  proutil utility 

  

**proutil <dbname> -C dump <table-name> <dump-path>**  
  
This would create a .bd file of the tabe name provided for dump.  
We can use many arguments while dumping to enhance the dump performance  
  
eg: proutil <DB-name> -C dump <table-name> <dev-path> -thread 1 -threadnum 10 -dumplist <path>/cra.dumplist -index 294  
  
We can dump the data of a table for a specific condition applied on a field using dumpspecified argument, thus restricting the dump data to only the required condition  
eg: proutil <dbname> -C dumpspecified <tablename>.<fieldname> gt 03-13-2015  
  
Note: To enable dump of large tables , we need to enable large files first for the database  
proutil <dbname> -C EnableLargeFiles  
  
To load back the .bd file to a database instance , we need to use proutil load utility.  
  
**proutil <db-name> -C load <table-name>**   
  
  
After loading a binary data in the database , index rebuild has to be performed as a post activity  because while performing a binary load progress makes all the indexes of the table inactive.  
  
**proutil <db-name> -C idxbuild**  
  
This would provide an interactive menu, we need to select T  option to perform idxbuild for a specific table and then provide the table number for which we have performed the binary load and perform index rebuild for the same.  
  
Index rebuild shall be explained in detail in a separate post.