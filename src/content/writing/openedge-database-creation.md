---
title: 'OpenEdge Database Creation'
description: 'Since we are done with installation of the Progress Openedge product , now we are free to play around with the features of Openedge and explore the opertaions'
date: 2017-12-14
tags: ['prorest', 'openedge', 'prodb', 'data-dictionary', 'database-creation', 'progress', 'prostrct', 'procopy']
featured: false
---

  
  
Since we are done with installation of the Progress Openedge product , now we are free to play around with the features of Openedge and explore the opertaions a DBA can perform on the database system.  
  
  
First and Foremost , we need a database to start with.Once installation is completed, we are free to create our own databases and perform various operations on the same.  
  
As discussed in previous blogs, the installation directory on progress product for a Unix//LinuxSolaris/AIX environment would be by defaut "/usr/dlc" ,which can be set as environment variable , preferably DLC and set in PATH to utilize various utilities (present in /usr/dlc/bin) which progress provides for us to operate upon.  
  
  
  
Following are the various utilities using which we can create a database :  
  

### **1\. Prostrct :** 

 Prostrct utility can be used to create a database with the help of a structure file (.st) (explained in further blogs).The following would be the command used:  
**Eg:**  
**prostrct create abc abc.st -blocksize 8192**  
  
By default blocksize would be 4K(4096).  
  
This would create a void db of the name "abc" in the OS path where the command is executed.  
  
We can make it a workable database by copying empty db(sample db ,comes along progress installation in installation path) to the newly created db.  
**procopy /usr/dlc/empty8 abc**  
  
Now a database abc is available in single user mode and can be accessed by below command  
  
**pro abc**  
  

### **2\. Prodb:** 

When using prodb to create a copy of a database, all the database copy will reside in the same directory , unless a structure file (.st)

  

**prodb abc sports2000**

sports2000 is sample db which comes with openedge instllation.

  

The new db abc will have all its documents in sports2000 path ,and would be a replica of the existing db.

  

  

  

### **3\. Procopy:** 

Using procopy utility we can copy an existing database into a newly created database (using prostrct).  
This will create a database with schema replica of the database copied.  
  
**procopy testdb abc**

  
  

### **4\. Prorest:**

We can restore a database backup ( taken using probkup utility ) and re create a database backup into a working system using prorest

  

**prorest abc abc.bkp**

### **5\. Using Data Administration Tool:**

We can access the data administartion tool of an existing database and choose Database --> Create 

Then enter the database name ,enter appropriate information and choose OK to create a new db.