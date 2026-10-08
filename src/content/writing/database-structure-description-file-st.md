---
title: 'Database Structure Description File (.st )'
description: 'The most basic procedure to create a database is using the prostrct utility. To create a database using prostrct, we would require a structure description file'
date: 2017-12-14
tags: ['area-number', 'openedge', 'progress', 'st-file', 'strcture-description-file', 'area-name', 'sample-structure-file', 'storage-area']
featured: false
topic: 'Progress/OpenEdge'
order: 9
---

  
The most basic procedure to create a database is using the prostrct utility.  
  
To create a database using prostrct, we would require a structure description file (.st ).  
  
  
We can use any text editor, such as vi, edit, or the Progress Procedure Editor, to create the structure  
description file. The name you give to the structure description file is usually the name of the  
database you define, with a .st extension.  
  
The structure description file is made up of one or more lines of text that provide information  
about each storage area of the database.  

###   
Main Components of st file:

  
• The storage area type  
  
• The area name  
  
• The area number  
  
• Optionally, the records per block  
  
• Optionally, the number of blocks per cluster (for Type II data storage areas)  
  
• The extent pathname  
  
• The extent type  
  
• The extent size  
  
  
  
The below are the different tokens used in a .st file  
  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj9IoCPVP2Qyu1ppw3NfBSSUc-E_EiimdeegGOe3jqpFlwCFAUnWVNqUM0ITa-bLiJqDMgluEK-LIUw2QmzAoD9euoFvvIGefI8OmOgLe452xXrP88F0t987VD-xJD6Fnv3K61SY8UsxsHR/s640/tt1.PNG)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj9IoCPVP2Qyu1ppw3NfBSSUc-E_EiimdeegGOe3jqpFlwCFAUnWVNqUM0ITa-bLiJqDMgluEK-LIUw2QmzAoD9euoFvvIGefI8OmOgLe452xXrP88F0t987VD-xJD6Fnv3K61SY8UsxsHR/s1600/tt1.PNG)

  
  

### Rules for creating storage areas and extents:

  

• The minimum information required in a .st file is one schema area extent definition statement

and one primary recovery (BI) area extent definition statement.

  

  

• The minimum information needed to specify any extent is the storage area type and extent

pathname. For example:

  

\# Primary Recovery Area

b .

\# Schema Area

d .

  

• You cannot use any of the reserved storage area names as application data storage area

names.

  

  

### Sample Structure Description File :

  

\# Sample Structure Description File: largedb.st

##

  

#A fixed length bi file of 1GB and a variable length bi file 

# 

#

b  tests/largedb.b1 f 1048576

b tests/largedb.b2 

  

##

#SCHEMA AREA with a fixed length file of 3GB and a variable length file

\# .

#

d  "Schema Area":6,64 tests/largedb.d1 f 3145728

d  "Schema Area":6,64 tests/largedb.d2

##

#TABLE AREA with a fixed length file of just over 2GB and a variable length file with a maximum size of 1TB.

# 

#

d "Table Area":7,64 tests/largedb\_7.d1 f 2097280

d "Table Area":7,64 tests/largedb\_7.d2

##

A fixed length ai file of 2GB and a variable length file with a maximum

size # of 1TB.

a tests/largedb.a1 f 2097152

a tests/largedb.a2

#