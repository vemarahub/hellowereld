---
title: 'Mongo Operators'
description: 'Mongo database provides various operators to support the querying on the mongo shell. These are some of the operators used: Querying : 1. $gte,$gt,$lte,$lt'
date: 2019-03-18
tags: ['operators', 'updating', 'mongo', 'sorting', 'querying', 'aggregate']
featured: false
topic: 'MongoDB'
order: 6
---

Mongo database provides various operators to support the querying on the mongo shell.  
These are some of the operators used:  
  
  

### **Querying :**

1\. $gte,$gt,$lte,$lt  
These operators can be used to place a condition in our find query with a comparison like ( < ) $lt , ( <= ) $lte , ( >) $gt (>=) $gte for our query.An example for searching documents in the inventory collection to find where quantity is greater than equal to 20 is:  
**db.products.find({qty:{$gte:20}})**  
  
2.$in  
$in is used when we want to search the collection for all the documents whose value of that field equals any value in the specified array of the $in operator  
**db.products.find( { qty: { $in: \[ 5, 15 \] } } )**  
3.$nin  
It selects documents where the field value is not in the specified array or the field does not exist  
**db.inventory.find( { qty: { $nin: \[ 5, 15 \] } } )**  
4.$type  
It returns documents where the BSON type of the field matches the BSON type passed to $type  
**db.addressBook.find( { "zipCode" : { $type : "string" } } );**  
This will return the documents with zip code field having a string data type values.  
  
5.$exists  
This operator can be used to return all the documents in the collection where that particular field exists.  
**db.records.find( { a: { $exists: true } } )**  
6.$or  
Or operator can be used to perform a logical OR operation on an array of two or more expressions and select the documents which satisfy atleast one expression.  
**db.inventory.find( { $or: \[ { quantity: { $lt: 20 } }, { price: 10 } \] } )**  
7.$not  
It will perform a logical not on the expression and return the documents which do not match the expression.  
**db.inventory.find( { price: { $not: { $gt: 1.99 } } } )**  
  

### **Updating:**

  
1.$set  
This operator can be used to replace the value of the field with the specified value  
**db.products.update(**  
   **{ \_id: 100 },**  
   **{ $set: { "details.make": "zzz" } }**  
**)**  
2.$inc  
It can be used to increment the field value by the specified number .It accepts positive and negative values.  
**db.products.update(**  
   **{ sku: "abc123" },**  
   **{ $inc: { quantity: -2, "metrics.orders": 1 } }**  
**)**  
The above query would search for all the documents with "sku" field as "abc123" and would reduce the value in the field quantity by 2 and increase the value of metrics.order field by 1.  
  
3.$addToSet  
This operator would add a value to an array.If the value is already is present it would do nothing.  
**db.foo.update(**  
   **{ \_id: 1 },**  
   **{ $addToSet: { colors: \[ "c", "d" \] } }**  
**)**  
This would add the colors c and d to colors array field.  
  
4.$elemMatch  
{results:{$elemMatch:{'score': 7,'product': 'abc'}}}  

### **Dot Notation:**

Dot notation can be used in mongo db to access the elements of an array and to access  the fields of an embedded document.  
For Arrays  
**"<array>.<index>"**  
  
For example for a document:  
{  
   contribs: \[ "Turing machine", "Turing test", "Turingery" \]  
}  
  
The third element can be accessed as : cotribs.2  
  
For Embedded Documents  
**"<embedded document>.<field>"**  
{  
  name: { first: "Alan", last: "Turing" },  
  contact: { phone: { type: "cell", number: "111-222-3333" } },  
}  
To access the field named last in the name field , we can access it as name.last  
  

### **Aggregate**

Aggregation operations group values from multiple documents together, and can perform a variety of operations on the grouped data to return a single result. In SQL count(\*) and with group by is an equivalent of mongodb aggregation.  
For example for the below collection :  
  
  

{

   \_id: ObjectId(7df78ad8s902c)

   title: 'vayuputra', 

   description: 'Story of Shiva',

   by\_user: 'Amish',

   tags: \['mythology', 'gods', 'fiction'\],

   likes: 100

},

{

   \_id: ObjectId(7df78ad89a02d)

   title: 'nagas', 

   description: 'Story of shiva',

   by\_user: 'Amish',

     tags: \['mythology', 'shiva', 'fiction'\],

   likes: 10

},

{

   \_id: ObjectId(7df78aad8902e)

   title: 'Half Girlfriend', 

   description: 'Love Story',

   by\_user: 'Chetan',

   tags: \['novel', 'fiction', 'romance'\],

   likes: 750

  

},

 if you want to display a list stating how many books are written by each user, then you will use the following aggregate() method −

  

**\> db.mycol.aggregate(\[{$group : {\_id : "$by\_user", num\_books : {$sum : 1}}}\])**

{

   "result" : \[

      {

         "\_id" : "Amish",

         "num\_books" : 2

      },

      {

         "\_id" : "Chetan",

         "num\_books" : 1

      }

   \],

   "ok" : 1

}

  

### **Sorting**

Sorting can be used to sort the output of our find query in ascending or descending order as per requirement.

**db.colname.find().sort({fieldname:direction})**

direction can be 1 for sorting in ascending order or -1 for sorting the output in descending order.

  

**db.products.find({price:{$exists:true}},{name:1,price:1}).sort({price:1})**

  
The above example will sort the result set in ascending order of price.  
  
We can also have multiple sort keys for sorting which would be equivalant to order by clause in a RDBMS.  
  
**db.customers.find().sort({lastname:1,firstname:1})**  
This corresponds to order by lastname,firstname on the result set.