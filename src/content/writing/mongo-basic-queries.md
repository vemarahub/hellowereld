---
title: 'Mongo Basic Queries'
description: 'Mongo database supports a data driven style of deceleration in the form of JSON and BSON.To run the various queries in mongo , first start the mongo database'
date: 2019-03-18
tags: ['mongo', 'basic-queries']
featured: false
---

Mongo database supports a data driven style of deceleration in the form of JSON and BSON.To run the various queries in mongo , first start the mongo database instance with either the config file or by using dbpath paramter for mongod.  
  
Once the mongo database is started, run the mongo command to open mongo shell.Once the mongo shell has started you would get a prompt  
**\>mongo**  
_MongoDB shell version: 3.0.12_  
_connecting to: test_  
**\>**  
  
1\. To see all the databases in the mongo instance use:  
\>**show dbs**  
_local 0.078GB_  
_test 0.028GB_  
When there is no other database created, we would have only local database and test database.  
  
2.To create a database in mongo, we just need to use the command for switching database  
**use myDB**  
This wont create the database, we need to create a collection in this database by inserting at least one document in the collection  
\>**db.Employee.insert**  
**(**  
**{**  
**"Employeeid" : 1,**  
**"EmployeeName" : "Martin"**  
**}**  
**)**  
_WriteResult({ "nInserted" : 1 })_  
  
Now if we try show dbs, we can see the database myDB also listed.  
  
If we try the below command we can see all the collections in the database myDB, currently it will show Employee collection and system.indexes collection which is the default collection.  
**\>show collections**  
_Employee_  
_system.indexes_   
3.To return the first match in the collection use,  
**db.products.findOne()**   
  
If no data is present in the products collection it will return null.  
  
4.To skip any document in the result set we can use skip method  
**db.products.find().limit(4).skip(2)**  
5.If we want to test our collection with some data, we can write a for loop to insert multiple documents at one go  
**for( var i =0;i < 20000; i++ ) {**  
**db.test.insert({x:i,y:"hi"});**  
**}**  
  
6.If we want to check if any errors were reported in the last executed command we can use  
**db.getLastError()**