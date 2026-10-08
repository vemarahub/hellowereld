---
title: 'Openedge Database Architecture'
description: 'Now since we are done with the history and installation of the Openedge Database. Let''s move into the technical aspect of the OpenEdge Database,which i guess'
date: 2017-12-14
tags: ['openedge-architecture', 'extents', 'openedge', 'progress', 'storage-area']
featured: false
---

  

  

Now since we are done with the history and installation of the Openedge Database.  
Let's move into the technical aspect of the OpenEdge Database,which i guess would intrest more to a DBA aspirant than my previous boring post;)  

When administering a Progress database, it is important to understand its architecture and the  
configuration options it supports.The architecture would comprise of the various components which ensure the functioning of the database system.  
  
**Storage Design Overview**  
Let's first discuss about how the storage structure is designed in a progress database.  
  
The storage design of a Progress database is divided into :

1\. **Logical model:** here databases contain logical database objects that are updated through language statements, and queried by applications that need information.The logical storage model can be manipulated through the 4GL and SQL-92 interfaces  
  
[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgMbDUSEG_WzirFN40k8e3NG-EDoqJT18Wq2Y5lP8-rqIOrjcLCWC1NPDu8h1d41Qkm1iC-XBZmAYrULmWWW8rwrISqZ1HhWgdyiZJqNIySI-msdN9gyBlKlqfYWief96J5qXqUj8GSDakT/s640/Capture11.PNG)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgMbDUSEG_WzirFN40k8e3NG-EDoqJT18Wq2Y5lP8-rqIOrjcLCWC1NPDu8h1d41Qkm1iC-XBZmAYrULmWWW8rwrISqZ1HhWgdyiZJqNIySI-msdN9gyBlKlqfYWief96J5qXqUj8GSDakT/s1600/Capture11.PNG)  
  
2\. **Physical model:** The physical storage model is manipulated through 4GL, SQL-92, and database administration utility interfaces.  
  
[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhRHnP2KKShXVvfLWBIMEcBtq08h7c3Prbbzdm5mwnkbL2PIQ3sxSWx8GlBcKAatOIpY_UzXQakhbGtTAkuEvZ_S9nFViAROyZWMdkLyNOpEQBY2M5YKdpTDmIcbl6Ky_ipygo25fcAA7bE/s640/c3.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhRHnP2KKShXVvfLWBIMEcBtq08h7c3Prbbzdm5mwnkbL2PIQ3sxSWx8GlBcKAatOIpY_UzXQakhbGtTAkuEvZ_S9nFViAROyZWMdkLyNOpEQBY2M5YKdpTDmIcbl6Ky_ipygo25fcAA7bE/s1600/c3.png)  
  
Now Let us dig deep into the storage design overview  
**A. Storage Objects**  
Storage objects are collections of space associated with one or more specific database objects.Each storage object is an instance of a database object described in the schema. Types of storage objects include:  
\* Table Objects  
\* Index Objects

Each object contains information about its type and the allocated space it must manage  
  
**B. Extents**  
A Progress database can extend across more than a single file system or physical volume. This  
is possible because you can split a single database storage area into several pieces called extents.  
Extents store a group of physical blocks of database objects. You can place extents on separate  
volumes thereby extending storage areas across multiple volumes.Extents are of two types:  
  
1\. Fixed-length Extents : As name suggests, with fixed-length extents, you control when you  
change extents and how much disk space each extent uses.  
  
2\. Variable-length Extents: These do not have a predefined length, and continue to grow until they  
use an entire disk or reach a maximum size of two gigabytes (2GB) if you are using version 9 or below of OpenEdge.Else the extents will grow to the disk size for higher versions of OpenEdge.  
  
Imp Info: Certain storage areas have restrictions on the types of extents they support. An after-image (AI) storage area contains just one extent. The transaction log storage area uses only fixed-length  
extents but can use more than one. Other storage areas can use many extents but only one  
variable-length extent per area. The variable-length extent must be the last extent.  
  
**C. Storage Areas**  
Storage areas are the largest physical unit of a database. Storage areas consist of one or more  
extents.A storage area is a distinct address space and any physical address stored inside the area is  
generally stored relative to the beginning of the storage area. Consequently, ROWIDS are  
unique to a storage area but they are not unique to an entire database. For example, two records from two different tables that are located in different storage areas can have the same ROWID.  
  
This has no impact on your application, because Progress knows the table associated with a ROWID and can determine the storage area where a record resides.You can place each database object in its own storage area, or place many database objects in a single storage area. Storage areas can contain database objects of one type or of many types.  
  
Below figure would provide an idea of layout of extents,areas and table/index for the Openedge database  
[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEit7fKs8byBzpMq49w4y6bWZfKlelyWlQtyZdy2gtzOvPyYuW3nbQSn6TEXHNw5F3YfqgSEvxIvaP7CBLOPrAjlYFDHCoZF0S2Wc5W8Lj2UFacHiA3i00cPqxo5QiASeFh8hHgvkPxOlcho/s400/Capture45.PNG)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEit7fKs8byBzpMq49w4y6bWZfKlelyWlQtyZdy2gtzOvPyYuW3nbQSn6TEXHNw5F3YfqgSEvxIvaP7CBLOPrAjlYFDHCoZF0S2Wc5W8Lj2UFacHiA3i00cPqxo5QiASeFh8hHgvkPxOlcho/s1600/Capture45.PNG)