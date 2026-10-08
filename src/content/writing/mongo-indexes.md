---
title: 'Mongo Indexes'
description: 'Index in a database is what bookmark is to a book, it helps the fast traversal and retrieval of documents through indexing of each document of a collection.'
date: 2019-03-21
tags: ['mongo', 'index']
featured: false
topic: 'MongoDB'
order: 7
---

Index in a database is what bookmark is to a book, it helps the fast traversal and retrieval of documents through indexing of each document of a collection.  
Features of a mongo index are:  
\*Keys can be of any type  
\* \_id is the default index and is unique  
\* other than \_id we can explicitly declare an index  
\*array contents can be indexed  
\*subdocuments and subfields can be indexed  

\* Generally more indexes means faster reads and slower writes

\*Less indexes means slower read and faster writes  
\*Also it is faster to build an index post import than pre import

  
Finding a document using index will minimize the scanning on the collection as the indexed field would be traversed directly instead of scanning the entire collection.  
  
**Create Index**  
Indexes can be created in mongo using the createIndex method  
**\> db.test1.createIndex({age:1})**  
_{_  
        _"createdCollectionAutomatically" : false,_  
        _"numIndexesBefore" : 1,_  
        _"numIndexesAfter" : 2,_  
        _"ok" : 1_  
_}_  

  

We can also create a composite index on two or more fields like:

**\> db.sample.createIndex({a:1,b:1})**

  

**List Indexes**

We can list all the created indexes on a collection by using:

**\> db.test1.getIndexes()**

_\[_

        _{_

                _"v" : 2,_

                _"key" : {_

                        _"\_id" : 1_

                _},_

                _"name" : "\_id\_",_

                _"ns" : "sample1.test1"_

        _},_

        _{_

                _"v" : 2,_

                _"key" : {_

                        _"age" : 1_

                _},_

                _"name" : "age\_1",_

                _"ns" : "sample1.test1"_

        _}_

_\]_

  

Here we can see the index \_id which is the default index and age\_1 index which is the index we created above on the field age.

  

**Drop Index**

To delete an index from a collection , we can use the drop index method by providing the index name, for example:

**\> db.test1.dropIndex("age\_1");**

_{ "nIndexesWas" : 2, "ok" : 1 }_

  

We cannot delete the \_id default index.

  

### **Types Of Indexes in Mongo**

**1\. Unique Indexes**

If we create an index as unique ,we cannot insert duplicate values into the collection index field.

**\> db.test1.ensureIndex({"emp\_id":1},{unique:true})**  
_{_  
        _"createdCollectionAutomatically" : false,_  
        _"numIndexesBefore" : 1,_  
        _"numIndexesAfter" : 2,_  
        _"ok" : 1_  
_}_  
  
If we now try to add a duplicate entry for the field added as unique index, it will throw error as below:  
**\> db.test1.insert({"emp\_id":1012})**  
_WriteResult({_  
        _"nInserted" : 0,_  
        _"writeError" : {_  
                _"code" : 11000,_  
                _"errmsg" : "E11000 duplicate key error collection: sample1.test1 index: emp\_id\_1 dup key: { : 1012.0 }"_  
        _}_  
_})_  
**2\. Sparse Indexes**

For documents with a field which sparsely ( rarely ) exists in a collections documents.  
  

**3\. TTL Indexes**

Time to Live indexes, deleted after a certain number of secs.

**\> db.test1.createIndex({"age":1},{expireAfterSeconds:3600})**

_{_

        _"createdCollectionAutomatically" : false,_

        _"numIndexesBefore" : 2,_

        _"numIndexesAfter" : 3,_

        _"ok" : 1_

_}_

**4\. Geospatial Indexes**

These are the indexes for the fields storing Cartesian co-ordinates \[x,y\].  
For example for a collection with below documents with loc as the location co-ordinate field  
\> db.places.find()  
_{ "\_id" : ObjectId("5c94ae27e83be8854bda59a8"), "loc" : \[ 2, 2 \] }_  
_{ "\_id" : ObjectId("5c94ae2ae83be8854bda59a9"), "loc" : \[ 2, 4 \] }_  
_{ "\_id" : ObjectId("5c94ae2fe83be8854bda59aa"), "loc" : \[ 4, 4 \] }_  
We can create a geospatial index for the field location as below:  
**\> db.places.ensureIndex({loc:"2dsphere"})**

  

When we list the index using getIndex method we can see the loc index as:

   _"v" : 2,_

                _"key" : {_

                        _"loc" : "2dsphere"_

                _},_

                _"name" : "loc\_2dsphere",_

                _"ns" : "sample1.places",_

                _"2dsphereIndexVersion" : 3_

  

  

**5\. Text Indexes**

Text index can be used where we want to keep text fields as index,.

We can create a text index as:

**\>db.items.ensureIndex({name:"text"},{default\_language:"english"})**

  

If we list the index using getIndex we can see it as:

   _"v" : 2,_

                _"key" : {_

                        _"\_fts" : "text",_

                        _"\_ftsx" : 1_

                _},_

                _"name" : "name\_text",_

                _"ns" : "sample1.items",_

                _"default\_language" : "english",_

                _"weights" : {_

                        _"name" : 1_

                _},_

                _"language\_override" : "language",_

                _"textIndexVersion" : 3_

  

  

**Background Index**

We can set an index to operate on background.Normally we would keep the primary index in background and rest secondary indexes in foreground.Background indexes would be slower than the foreground .We can set an index as background while creating them as:

**\> db.test1.ensureIndex({"name":1},{background:true})**