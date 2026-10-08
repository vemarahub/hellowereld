---
title: 'CRUD in Mongo'
description: 'CRUD corresponds to Create,Read,Update and Delete.Like any other database technology, mongo also supports CRUD operations on it by the use of its various'
date: 2019-03-19
tags: ['crud', 'mongo', 'find', 'remove', 'insert', 'update']
featured: false
topic: 'MongoDB'
order: 4
---

CRUD corresponds to Create,Read,Update and Delete.Like any other database technology, mongo also supports CRUD operations on it by the use of its various functions for the same.

  

**Create**

For create operations in mongo we can use insert method to insert documents into our collections.

Eg: 

**\>db.sample.insert( { a:2,b:"a string",c:22.44 } );**

_WriteResult( { "nInserted" : 1 } )_

**Read**

Read operations corresponds to a select query in RDBMS systems.We can use find method to select all or specific documents from the database

**db.sample.find();**

### **Update**

Update operation can be used to modify any field in the existing document of a collection.

**db.<collection>.update(<where>,<doc\_or\_partial\_update\_expression>,<upsert>,<multi>)**

The update can be a full update or a partial update on the document.  
For partial update an example would be  
**t.update({\_id:101},{$set:{y:100}})**  

We can even add new few fields to a specific document using update method.  
 \_id field which is the default field for all documents cannot be modified using update method.  
  
**\> db.collection.update( query\_document, update\_document, options\_document )**  
where options\_document contains key:value pairs such as:  
multi : true/false,  
upsert : true/false,  
writeConcern: document  

  

  
**Upsert**  
Upsert corresponds to update or insert, This is set as third parameter in the update query.If the matching criteria is present in the collection, the particular document is updated.Else if the document is not present, it will be created as a new document in the collection  
**\> db.test.update({age:30},{age:40},true)**  
_WriteResult({_  
        _"nMatched" : 0,_  
        _"nUpserted" : 1,_  
        _"nModified" : 0,_  
        _"\_id" : ObjectId("4c90cd5237743aea27c04281")_  
_})_  

  

  
**Multi Update**  
The last or 4th parameter in the update method is for specifying if the update is a multi document update or not  
db.<coll>.update(<where>,<obj>,<upsert>,<multi>);  
  
It is by default false, if it is set to true, all the matching criterias of where condition will be updated with obj.Otherwise only first matching criteria is updated  
  
**\>db.orders.update({order\_id:123},{$inc:{priority:1}},false,true});**  
  
Inserting values into an array can be done by using push keyword,  
**t.update({\_id:101},{$push:{arr:"hii"}})**  

  
**Save**  
Save method can be used to update a document in the collection  
eg:  
\>myobj = db.products.find({"y":200});  
\>myobj.y = 400;  
\>myobj  
{"id": ObjectId("2386218328736ff"),"x":"hello",y":400}  
  
**\>db.products.save(myobj);**  
WriteResult({"nMatched":1,"nUpserted":0,"nModified":1})  
  

### Delete

Deletion in mongo is done by using remove method, we can specify the criteria of deletion as argument and all the documents matching the criteria would be deleted.

**db.test.remove({\_id:100});**

  

To remove all the documents of a collection , we can use

**db.test.remove({});**

  

We can also remove the documents matching a regular expression , for example:

**db.test2.remove({x: /ello/ });**

  
  
**Bulk Insert**  
Bulk insertion of data can  be done on a collection in mongo either as a ordered insertion or unordered insertion.  
  
Unordered Bulk Insert  
**\>var bulk = db.items.initializeUnorderedBulkOp();**  
 **>bulk.insert({item:"abc",defaultQty:100,status:"A",points:100});**  
 **>bulk.insert({item:"abcd",defaultQty:101,status:"B",points:101});**  

**\>bulk.insert({item:"abcde",defaultQty:102,status:"C",points:102});**

**\>bulk.execute();**

_BulkWriteResult({_

        _"writeErrors" : \[ \],_

        _"writeConcernErrors" : \[ \],_

        _"nInserted" : 3,_

        _"nUpserted" : 0,_

        _"nMatched" : 0,_

        _"nModified" : 0,_

        _"nRemoved" : 0,_

        _"upserted" : \[ \]_

_})_

  

Ordered Bulk Remove & Update  
 **>var b = db.items.initializeOrderedBulkOp()**  
**\>b.find({"item":"abc"}).remove()**  
**\>b.find({"item":"abcd"}).remove()**  
**\>b.find({"item":"abcde"}).update({$inc:{points:1}})**  
**\> b.execute()**  
_BulkWriteResult({_  
        _"writeErrors" : \[ \],_  
        _"writeConcernErrors" : \[ \],_  
        _"nInserted" : 0,_  
        _"nUpserted" : 0,_  
        _"nMatched" : 1,_  
        _"nModified" : 1,_  
        _"nRemoved" : 2,_  
        _"upserted" : \[ \]_  
  
_})_