---
title: 'Restricting blank user id login to progress database'
description: 'Security is a major aspect for any database,it is required to have a user/pass credential validation for every connection made to the database to provide a'
date: 2017-12-14
tags: []
featured: false
topic: 'Progress/OpenEdge'
order: 999
---

Security is a major aspect for any database,it is required to have a user/pass credential validation for every connection made to the database to provide a basic security to the data in the database.

  
By default in progress a connection can be made with a blank username and password and the schema/data from the database can be accessed.  
  
To restrict the same , we need to disallow blank user login to the database.This can be done by following the below steps:  
  
1.First before disallowing a blank user login, we need to create atleast 1 user in the database, the same can be then used to access the database once blank access is disabled.  
  
To create a new database user any of the following steps can be used:  
a> Go to data dictionary select admin --> security --> edit user list  
b> add a new user with desired username and password  
  
Once this user is created , everytime we try to access data dictionary of the database, it will prompt for input of user/password to enter the data dictionary.  
  
If blank user id is allowed, we can skip the login credential part and still use all the utilities in the menu of data dictionary, once the blank user id is disabled we would not be able to perform any actions in data dictionay.  
  
To disallow blank user id:  
  
Go to data dictionary select admin --> security --> Disallow Blank Userid Access  
  
Now we can access data dictionary and use its functionalities by using the user/pass we created or which we create in future, but not by a blank user/pass login. Similarly for remote/batch access to database we would require a valid user/pass which can be passed in case of a batch login through  -U ,-P parameters.  
  
To revert the restriction to disallow blank user/pass login we can run the following query in the procedure editor  
  
FOR EACH \_file WHERE:  
ASSIGN \_file.\_CAN-READ = "\*"  
\_file.\_CAN-WRITE = "\*"  
\_file.\_CAN-CREATE = "\*"  
\_file.\_CAN-DELETE = "\*".  
END.  
  
This will again allow a blank user access to the database.