---
title: 'Windows Installation'
description: 'For installing Mongo DB in windows server follow the below steps : 1. download the latest version of mongo from the mongo db website'
date: 2019-03-12
tags: ['mongo', 'mongo-windows-installation']
featured: false
---

For installing Mongo DB in windows server follow the  below steps :  
  
1\. download the latest version of mongo from the mongo db website  
[https://www.mongodb.com/download-center#enterprise](https://www.mongodb.com/download-center)  
  
2.Create the required folders in the local drive after checking for adequate space for installation  
  

  For data files of mongo create -  (C:\\data) &  for  db   create  (C:\\data\\db).

3\. Run the setup file to complete the installation and click on finish to exit.

4.Open command prompt change to the default installation path C:\\Program Files\\MongoDB\\Server\\3.4\\bin> and type mongod and press enter

This will start the mongod deamon in the current prompt.

5.Open another command prompt , go to the same path and type mongo

This will open a mongo shell to type in the mongo queries or create new documents.