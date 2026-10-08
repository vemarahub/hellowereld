---
title: 'Progress Openedge Database Overview'
description: 'This blog will walk you through the Progress OpenEdge Database basics and help you get an idea you need essentially to become a Progress Database'
date: 2017-12-14
tags: ['openedge-architecture', 'openedge-liscences', 'openedge-history', 'rdbms', 'progress', 'opendge-db']
featured: false
topic: 'Progress/OpenEdge'
order: 1
---

This blog will walk you through the Progress OpenEdge Database basics and help you get an idea you need essentially to become a Progress Database Administrator.  
  
**Brief History:**  
  
Before moving into the technical aspect of the database system.Little insight about the origin of the company Progress whose product is the mighty Openedge (OE) database.  
  
1981 - Data Language Corporation (DLC) was formed primarily working in application development and deployment tools.  
  
1984 - Relational Data Language product renamed “Progress”; first release for UNIX and DOS  
  
1987- Company renamed Progress Software Corporation.  
  
Some other popular products which Progress Software Corporation has in market other than Openedge include Telerik Platform(for mobile app development),Corticon(Rule Engine),Data Direct Connectors(connectivity between data sources),Rollbase(SaaS app development tool) etc.  
  
**Openedge Product Package:**  
  
The below image would give a vague idea about different components which comes as part of the Openedge Product when you buy it from Progress for your business requirement.  
  
[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjDQjWJaTjSYHEmnQluyw_VStwF2giQmBrFugfmRk2EFKCm9YnYCL6Tm90B9H-7WvUwjaHNfPLCnU2WUrP_Sc3HyV7UI8u1Zer3wRcxe8D29SdvXgewP4rmqCV-cGVL2APKusylRN2rP1rs/s640/OE1.PNG)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjDQjWJaTjSYHEmnQluyw_VStwF2giQmBrFugfmRk2EFKCm9YnYCL6Tm90B9H-7WvUwjaHNfPLCnU2WUrP_Sc3HyV7UI8u1Zer3wRcxe8D29SdvXgewP4rmqCV-cGVL2APKusylRN2rP1rs/s1600/OE1.PNG)  
  
  
**The Main Components of Openedge Package would include:**  
  
Advanced Business Language (ABL): Also know as Progress 4GL, it's a modern hybrid procedural/object-oriented language, specifically designed for developing enterprise-class business applications.  
Application Server:Integrated environment, including Web Server, Application Server and Adapters, for deploying and running server-based business applications.  
RDBMS, Replication, Data Server: Scalable, reliable, secure ,multi-tenant database, management and monitoring tools.We would be dealing more with this layer as a Progress DBA.  
  
**Openedge Liscences:**  
  
When you buy a Openedge product from Progress Software you can customize your shopping on the basis of the components you require or the number of users which are going to use the product.This will would help you in effectively costing your purchase of Openedge.  
  
To serve the same purpose Openedge provides different licences you can buy as per requirement.Some of the key licences are:  
  

1\. 4GL Development System/OE Architect(for windows)  
  
2\. OE workgroup RDBMS  
  
3\. OE Application Svr Ent  
  
4\. OE Replication/ Replication Plus  
  
**Openedge Versions:**  
  
Progress Software has released different versions of the Openedge product in the span of all these years, latest being version 12.From experience i would say,for now 10.2B version is considered as most stable version and probably most widely used too.

  
History of Progress versions is given below for reference.  

1984 2.1  
  
1984 2.2 R-code  
  
1985 3.0 Overlapping frames, ON & Apply, COLOR  
  
1987 4.0 Workfiles, CHOOSE  
  
1988 5.0 Fastrack, Client/Server, SQL89, federated DBs, EDITING  
  
1989 6.0 DataServers, Parameters, RESULTS report writer  
  
1991 6.3 APW, On-line backup  
  
1991 7.0 GUI, E-D model, TT, UIB, DLL calls, Internal Procedures, word indexes, ReportBuilder  
  
1993 7.2 ODBC  
  
1994 7.3A PP  
  
1995 7.3B  
  
1995 7.3C  
  
1995 8.0A SO/ADM  
  
1996 8.0B spin, directio  
  
1996 8.1A  
  
1997 Webspeed 1.0  
  
1997 7.3E  
  
1997 8.2A AppServer (state aware and state reset), UDF, VST, DB block size  
  
1997 8.2B  
  
1998 Webspeed 2.0  
  
1998 8.2C  
  
1998 8.3A bistall/bithold, more VST  
  
1999 8.3B rereadnolock  
  
1998 9.0A ADM2, PUB/SUB, AppBuilder, dynamic queries, superprocedures, stateless mode, OpenClient for Java, type I storage areas  
  
1999 9.0B  
  
1999 9.1A Integrated ABL & Webspeed, dynamic TT, Dynamics, 1st large file support, Async Appserver, DOM XML parsing, memory mapped procedure library, dynamic browser, BLOBs, socket handling  
  
2000 8.3C  
  
2000 9.1B SQL92, Webclient, JMS API, AIA adapter  
  
2001 8.3D  
  
2001 9.1C WebClient Intellistream  
  
2002 9.1D new debugger, WinXP appearance, SAX reader, WebClient over Internet  
  
2003 10.0A Webservices IN, state-free AppServer, ProDataSets, Type II Storage areas, OpenClient for .NET, Array parameters,  
  
BLOB,,CLOB, mergeprop  
  
2004 9.1E Failover clusters  
  
2004 10.0B Webservices OUT, ttmarshal, encryption, DateTime, message digests, base64-encoding  
  
2005 10.1A OOABL, SAX writer, Auditing, Client-Principal, By-reference parameters, Events in batch mode, OpenClient dynamic API, ProDataSet read/write xml, Webservices-out w/temp-tables/PDS  
  
2006 9.1E04  
  
2007 10.1B Major removing of limits on DB, double colon notation, 64 bit datatypes, 64-bit dbkeys, Indeterminate arrays, XML xref, Extend longchar support, OOABL strongly typed events, Log-manager "4glTrans”, Browser column view-as,  
  
Browser sort arrows, Color inheritance in GUI, OOABL overloading  
  
2008 10.1C Client stack trace VST, throw/catch/finally, dynamic browse for ChUI  
  
2008 10.2A ABL GUI for .NET, Windows 64bit, Structured error handling, TTY mode dynamic browse widget, Stream, OOABL static members, OOABL garbage collection, OOABL interface properties, OOABL array support, XML read/write enhancements,  
  
ProDataSet WHERE-STRING  
  
2009 10.2B OOABL abstract classes, OOABL reflection updates, Dynamic DLL/SO invocation, ProDataSet WRITE JSON, STOP-AFTER  
  
2011 11.0 Multi-tenancy, Table-scan, JSON built-in objects, Temp-table blocking from funVSTs, ProDataSet infer relations from XML, Remove IO ction, OOABL interface inheritance, Fix 64-bit r-code, GUI for .NET everywhere, OOABL dynamic property accessors  
  
2012 11.1  
  
2013 11.2  
  
2013 11.3 REST and Mobile, block-level undo, throw, ABL single-run, dynamic access to built-ins  
  
2013 10.2B08  
  
2014 11.3.1  
  
2014 11.3.2  
  
2014 11.4  
  
2014 11.5 PASOE, 64 and 32 on same Windows server  
  
2015 11.5.1  
  
  
2016 11.6.1  

2019 12.0  
  
  
**Openedge Database : RDBMS**  
  
Openedge database system is basically a relational database management system (RDBMS).  
  
A relational database is nothing but a collection of data items organized as a set of formally-described tables from which data can be accessed or reassembled in many different ways without having to reorganize the database tables.  
  
This model organizes data into one or more tables (or "relations") of columns and rows, with a unique key identifying each row. Rows are also called records or tuples.  
  
Generally, each table/relation represents one "entity type" (such as customer or product). The rows represent instances of that type of entity (such as "Lee" or "chair") and the columns representing values attributed to that instance (such as address or price).  
  
Other DB examples of RDBMS would include Oracle,My SQL,DB2,Postgres etc.