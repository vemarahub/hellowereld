---
title: 'GridFS in Mongo'
description: 'GridFS in mongo can be used to store and retrieve huge files of type image,videos,audios etc in the mongo database in the form of collection by considering the'
date: 2019-04-30
tags: ['mongo', 'gridfs']
featured: false
topic: 'MongoDB'
order: 15
---

GridFS in mongo can be used to store and retrieve huge files of type image,videos,audios etc in the mongo database in the form of collection by considering the mongo database as a filesystem.  
  
Where a document in a mongo collection can store a maximum of 16MB size , GridFS provides the specification in mongo to store the large media files in giga byte sizes in the form of files divided into chunks of data each in seperate document with maximum size of 255k.  
  
For using GridFS mongo provides a utility known as mongofiles which can be used to do the storing , retrieving , listing and deleting of the large files in the mongo database.  
  
 For example if we have a 5GB video file in our data disk , "birds.mp4 " and we would like to store in our mongo database.We can do it by using the binary utility mongofiles as below:  
  
**mongofiles -d media put "birds.mp4"**  
Here -d denotes the database to which we would want to store the video file, in this case we are storing the video file in the media database.  
  
To see all the large files stored in media database using mongofiles we can list them as below:  
  
**mongofiles -d media list**  
To retrieve any of the files stored in the media database we can use :  
  
**mongofiles -d media get "birds.mp4"**  
If we login to the mongo shell and check the database to which large files are loaded we can see two new collections in the database:  
**fs.files**  
**fs.chunks**  
  
The fs.files collection will have details regarding each files stored in the database.  
  
**\>db.fs.files.find()**  
_{ "\_id" : ObjectId("5cc6e72319d2661a20000001"), "chunkSize" : 261120, "uploadDate" : ISODate("2019-04-29T11:59:31.268Z"), "length" : 464935, "md5" : "2760b0f921c7c943f21b81e4635bb365", "filename" : "birds.mp4" }_  
The fs.chunks collections will have details regarding the chunks of data splitted of each of the files loaded  
  
**\> db.fs.chunks.find({},{data:0})**  
_{ "\_id" : ObjectId("5cc6e72319d2661a20000002"), "files\_id" : ObjectId("5cc6e72319d2661a20000001"), "n" : 0 }_  
_{ "\_id" : ObjectId("5cc6e72319d2661a20000003"), "files\_id" : ObjectId("5cc6e72319d2661a20000001"), "n" : 1 }_  
_{ "\_id" : ObjectId("5cc6e73b19d266356c000002"), "files\_id" : ObjectId("5cc6e73b19d266356c000001"), "n" : 0 }_  
_{ "\_id" : ObjectId("5cc6e73b19d266356c000003"), "files\_id" : ObjectId("5cc6e73b19d266356c000001"), "n" : 1 }_  
_{ "\_id" : ObjectId("5cc6e73b19d266356c000004"), "files\_id" : ObjectId("5cc6e73b19d266356c000001"), "n" : 2 }_  
_{ "\_id" : ObjectId("5cc6e73b19d266356c000005"), "files\_id" : ObjectId("5cc6e73b19d266356c000001"), "n" : 3 }_