---
title: 'Mongo Import & Cursors'
description: 'Mongo database supports data to be imported to the database in the form of csv,tsv and json file formats.Below command can be used to import the file'
date: 2019-03-12
tags: ['find()', 'mongo', 'mongoimport', 'mongo-cursor']
featured: false
topic: 'MongoDB'
order: 9
---

Mongo database supports data to be imported to the database in the form of csv,tsv and json file formats.Below command can be used to import the file containing the data to be loaded to your database at one go:  
  

**mongoimport --db pcat –-collection student < students.json**

  
  
The students.json file here would contain json data to be loaded to students collection.Each line in the json file is a document for the collection student.  
  
Entries of students.json file would be:  
{ "\_id" : 0, "name" : "aimee Zank", "scores" : \[ { "type" : "exam", "score" : 1.463179736705023 }, { "type" : "quiz", "score" : 11.78273309957772 }, { "type" : "homework", "score" : 6.676176060654615 }, { "type" : "homework", "score" : 35.8740349954354 } \] }  
{ "\_id" : 1, "name" : "Aurelia Menendez", "scores" : \[ { "type" : "exam", "score" : 60.06045071030959 }, { "type" : "quiz", "score" : 52.79790691903873 }, { "type" : "homework", "score" : 71.76133439165544 }, { "type" : "homework", "score" : 34.85718117893772 } \] }  
{ "\_id" : 2, "name" : "Corliss Zuk", "scores" : \[ { "type" : "exam", "score" : 67.03077096065002 }, { "type" : "quiz", "score" : 6.301851677835235 }, { "type" : "homework", "score" : 20.18160621941858 }, { "type" : "homework", "score" : 66.28344683278382 } \] }  
{ "\_id" : 3, "name" : "Bao Ziglar", "scores" : \[ { "type" : "exam", "score" : 71.64343899778332 }, { "type" : "quiz", "score" : 24.80221293650313 }, { "type" : "homework", "score" : 1.694720653897219 }, { "type" : "homework", "score" : 42.26147058804812 } \] }  
{ "\_id" : 4, "name" : "Zachary Langlais", "scores" : \[ { "type" : "exam", "score" : 78.68385091304332 }, { "type" : "quiz", "score" : 90.29631013680419 }, { "type" : "homework", "score" : 34.41620148042529 }, { "type" : "homework", "score" : 19.21886443577987 } \] }  
{ "\_id" : 5, "name" : "Wilburn Spiess", "scores" : \[ { "type" : "exam", "score" : 44.87186330181261 }, { "type" : "quiz", "score" : 25.72395114668016 }, { "type" : "homework", "score" : 10.53058536508186 }, { "type" : "homework", "score" : 63.42288310628662 } \] }  

  

  

These 5 entries would be loaded to the student collection of the database pcat.  
  
Once these entries are added to the collection, we would require a find() method to return all or specific documents from the collection as output in our mongo shell  
  
**db.student.find()**  
This would return first 20 documents in the collection.  
  
We can limit the output of the find query by using limit method  
**db.products.find() .limit(10)**  
To display the output in  a more presentable manner and improved readability,we can use toArray method or pretty method on the find.  
**db.products.find().limit(10).toArray()**  

**db.products.find().limit(10).pretty()**   
  
  
The find method can also passed with a set of two arguments.  
**db.products.find(query,projections)**   
  
The first argument would be  query which resonates to a where clause in a conventional RDBMS.We can specify the condition on which the documents has to be selected for display from the collection.  
The second argument would be projection, which resonates to a select field in the select query of conventional RDBMS.We can set the fields we want to display as output to 1, other fields wont be displayed in the output.By default the \_id field in mongo is set as 1 for projection, we can hide it in our find output by setting it to 0.  
  
**db.products.find({ type: "score"},{name:1,\_id:0})**  
  
Here the name of the documents from the collection products whose type is score would be displayed as the output of the find query.  
  
The method find actually  returns a cursor.To access the documents, you need to iterate the cursor.  
  
**var myCursor = db.products.find( { type: "score"} );**  
  
The cursor mycursor can be used to iterate through the selected documents with type "score" one by one by using the method next() as below:  
  
**while (myCursor.hasNext()) {**  
   **print(tojson(myCursor.next()));**  
**}**

  
We can also use forEach method in the cursor instead of a while loop to populate the documents  
  
**myCursor.forEach(printjson);**