---
title: 'User Management in Openedge Database'
description: 'The user management of a progress Openedge database refers to the user creation on the database with adequate privileges intended for the particular user.In'
date: 2018-08-06
tags: ['sqlexplorer', 'create-user', 'openedge', 'user-management']
featured: false
topic: 'Progress/OpenEdge'
order: 15
---

  
  
The user management of a progress Openedge database refers to the user creation on the database with adequate privileges intended for the particular user.In general creation of a new user on the database is a DBA activity, as the DBA has to decide the authorization a user will get over the database.  
  
The privilege that a user would get can be of a dba, by which he can do all operational and management tasks of a dba over the database.  
The users can also be given privilege of  performing all CRUD operations(Create, Read, Update , Delete) or any of the CRUD operations in particular as per the requirement, for example, a user can be created with a read-only access to the database in which he would be able to only query the data on the database and not perform any other activity on the database.  
  
As in OpenEdge ,we have two database engines running, i.e 4GL and SQL engine, we can create a 4GL user through datadictionary or an SQL user through sqlexp tool of openedge.  
  
A 4GL user would be a DBA user with all the privileges of a DBA , it will be created in the schema table \_user when we create a entry in the user list of data dictionary tool.  
  

#### **Below are the steps to create a 4GL/DBA user in openedge:**

  
1\. Login to the data dictionary of the database in which you want to create the user and go to  
Admin -> security -> Edit User List  

  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj8O5e3ARQbxP1PCy7clB_S6tHtdlZvbWsmSy2zyZHc4OY4COQtkgwtOoBAmGx-Jom6MOwCuKE7ASIzxUZIPyHMuFcO4VmMXLULW4LVa_blxWOUqOXQUzCSPRKgw_WY5KrbqhY-eT778DIr/s640/11.JPG)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj8O5e3ARQbxP1PCy7clB_S6tHtdlZvbWsmSy2zyZHc4OY4COQtkgwtOoBAmGx-Jom6MOwCuKE7ASIzxUZIPyHMuFcO4VmMXLULW4LVa_blxWOUqOXQUzCSPRKgw_WY5KrbqhY-eT778DIr/s1600/11.JPG)

  
  
2\. Create a new user by selecting Add option from below list  
  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhdhyphenhyphenCguW17g9B3uXlJdnel7p0yiyOMI9z29RbK-SMMEQVb3SAjh2kRiFmuxbrKMsdctPxF_HLTniJtG_2vj_IrHeO0FgnGfkr4Bp-3iz2FND2GUO-tb6DVi_H2o66tbXuJO2gtqHHCO8hY/s640/22.JPG)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhdhyphenhyphenCguW17g9B3uXlJdnel7p0yiyOMI9z29RbK-SMMEQVb3SAjh2kRiFmuxbrKMsdctPxF_HLTniJtG_2vj_IrHeO0FgnGfkr4Bp-3iz2FND2GUO-tb6DVi_H2o66tbXuJO2gtqHHCO8hY/s1600/22.JPG)

  
3\. Provide the user - id , domain ( in case of version 11x and above, leave blank if not using multi tenancy) , user name and password and press enter or F1.  
  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj0zBTgepiPunyb4cilITtzObn7iqmbmNAlwLdg4hyQYJhRvbz6bfhXkB6dy8oEvvwX8rC7ZtlOnUSCq6tLqOAEwWW8m9kYnut5talQpiiDKra_PX8PIajBFDehgb8QEjlgFMC6mAyUzYmD/s640/33.JPG)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj0zBTgepiPunyb4cilITtzObn7iqmbmNAlwLdg4hyQYJhRvbz6bfhXkB6dy8oEvvwX8rC7ZtlOnUSCq6tLqOAEwWW8m9kYnut5talQpiiDKra_PX8PIajBFDehgb8QEjlgFMC6mAyUzYmD/s1600/33.JPG)

  
4\. You would be prompted to re verify the password .Re-enter and press enter.You can see the user created in the list of users  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiMHk6vqs80hjEWLcMobrJVc8wVcJwnKTbHY8ToQL1osZhn7KcX4UalhUIyn9BC3Tp4l0zoOni6m8sXFgHdzgNQElkclSSBUewmOaWCCQyEIWckP_a3PfSblIm4YL_odtXBEPt9Hdhp5twW/s640/33.JPG)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiMHk6vqs80hjEWLcMobrJVc8wVcJwnKTbHY8ToQL1osZhn7KcX4UalhUIyn9BC3Tp4l0zoOni6m8sXFgHdzgNQElkclSSBUewmOaWCCQyEIWckP_a3PfSblIm4YL_odtXBEPt9Hdhp5twW/s1600/33.JPG)

  
This user can be used now to login into the database and perform any DBA activity like ASCII dump/load, table creation deletion or query,update,delete etc of data from the tables of the database.  
  
If blank user login is disabled then we have to provide -U , -P parameters with the user created though this process for any batch execution on the database.  
  
Note: For a environment with no development licence installed and only having RDBMS licence we would not be able to access the security tab from data dictionary as it is only available when a developer or 4GL license in installed on the environment.  
As a work around we can use the -rx parameter to gain access to the disabled tabs like security.  
  
In Windows:  
prowin32 -p \_admin.p -rx  
A data dictionary GUI will open, use connect option from menu to connect to the desired database and get full access to all tabs  
  
In Unix:  
mpro -db <dbname> -p \_admin.p -rx  
  
  

#### **Below are the steps to create a SQL user in openedge:**

 For creating an SQL user we would need to connect to the sqlexp tool of the openedge , preferably through a secondary broker after starting the secondary broker using -m3 and a secondary broker port for SQL access.

  

By default sysprogress is the super user or admin user for all sql privileges in Openedge, so as a pre requisite of creating a SQL user , we need to create a "sysporgress" user through data dictionary by following the steps showed in " create a 4GL user " above.

  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEixRFnec1x8hV42YI1av9fxdxHSTCCFApABVeWsHysHDrk84PdFJp6h0dgPF6FjtoriiLz_1HjR2kbzI_0oy37c_px-sqFL1EpbYXqH1BmbpA1zVBuoeLqqFBjxxZZ3igAsR8tGw6uBoxEo/s640/33.JPG)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEixRFnec1x8hV42YI1av9fxdxHSTCCFApABVeWsHysHDrk84PdFJp6h0dgPF6FjtoriiLz_1HjR2kbzI_0oy37c_px-sqFL1EpbYXqH1BmbpA1zVBuoeLqqFBjxxZZ3igAsR8tGw6uBoxEo/s1600/33.JPG)

  

  
Once the secondary broker is started and a sysprogress user is created through data dictionary, follow the below steps to create a new user through SQL engine:  
  
1\. connect to SQLExplorer as below:  
  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgrforywSRht9unReGN17RF9qhiCbIha8N5Ymjr4EosHrqC2mkiaOF-kqdIHwrmQCz_5GIzlPjAsHZVi41PfcbBJSo3Z-EifTZ4Ji4dezxpvSxgSwviUZePUd6Q64IbExHIlJB1DjHp5-tj/s640/33.JPG)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgrforywSRht9unReGN17RF9qhiCbIha8N5Ymjr4EosHrqC2mkiaOF-kqdIHwrmQCz_5GIzlPjAsHZVi41PfcbBJSo3Z-EifTZ4Ji4dezxpvSxgSwviUZePUd6Q64IbExHIlJB1DjHp5-tj/s1600/33.JPG)

  
2\. In SQLExplorer prompt we can create a new user by writing a SQL create query.  
  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjvkpbaH9Cg5rGbbt-g48TBDZNFu_90ibN-pnIUGwC1liH1imQ_Lna3xb5KUq8jUGhegR1yA3xsv43YrsUYkZDqeZfl6Kvi5PY8dZpvAbnHdjJFH5__1YmxsLdJUTf2xh6qpf4kq47qr4MN/s640/33.JPG)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjvkpbaH9Cg5rGbbt-g48TBDZNFu_90ibN-pnIUGwC1liH1imQ_Lna3xb5KUq8jUGhegR1yA3xsv43YrsUYkZDqeZfl6Kvi5PY8dZpvAbnHdjJFH5__1YmxsLdJUTf2xh6qpf4kq47qr4MN/s1600/33.JPG)

  
3\. We can give dba privilege  to the created user  just like a user created through data dictionary by using the grant command as below:  
  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgpF_JA8J0X0Vg8-_aLhG4wodwgUgY-gpkJ80zGqNWeWYO2rMnoWCiCtzZJz9lTFnKOOL6HxrWJ3qTqk1SPQzgWnvdqqOqny8rwRf3deSEZmaM2lvmSPeI4I1XsHHfyqrueu4DbPulazWhS/s640/33.JPG)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgpF_JA8J0X0Vg8-_aLhG4wodwgUgY-gpkJ80zGqNWeWYO2rMnoWCiCtzZJz9lTFnKOOL6HxrWJ3qTqk1SPQzgWnvdqqOqny8rwRf3deSEZmaM2lvmSPeI4I1XsHHfyqrueu4DbPulazWhS/s1600/33.JPG)

  
4\. We can see all the users with dba access by querying the "sysprogress.sysdbauth" table in sqlexp.  
By default a sysprogress user and the user who started the database would be present as a entry in the sysdbauth table:  
  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhvDuQKzk__MEtBLcNDADFpSK1Ov0uLV8KwGbR3Ebb-DXUN2jGcJ0_150EoSlw81FbYS6bfwna_YJyHUMRNPogtU6sgYiI4CJJbqxA3j-qoJHnxftsKk774Sk9uVbIs24MKOIYEHcCZkXTX/s640/33.JPG)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhvDuQKzk__MEtBLcNDADFpSK1Ov0uLV8KwGbR3Ebb-DXUN2jGcJ0_150EoSlw81FbYS6bfwna_YJyHUMRNPogtU6sgYiI4CJJbqxA3j-qoJHnxftsKk774Sk9uVbIs24MKOIYEHcCZkXTX/s1600/33.JPG)

  
  
5\. An access provided to a user can be revoked from the user by using revoke command:  
  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhVjmDT5QctIwrvEjvRQY9OSUhFhyphenhyphent7GLpi3EXt-f9ZL6M_l1mssllQDu_k5rd8bLXzdrcKSnYvl6ZQG2aFa60xVINFs3mhzb_2TlX7MnHNLkgk3flrj9ReMRNuAsTX3jLU8yXypvZT7aQu/s640/33.JPG)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhVjmDT5QctIwrvEjvRQY9OSUhFhyphenhyphent7GLpi3EXt-f9ZL6M_l1mssllQDu_k5rd8bLXzdrcKSnYvl6ZQG2aFa60xVINFs3mhzb_2TlX7MnHNLkgk3flrj9ReMRNuAsTX3jLU8yXypvZT7aQu/s1600/33.JPG)

  
6\. A user can be provided table specific access also, like providing read only access to a particular table or a set of tables by providing "grant select" on that particular table for the particular user using a dba user or sysprogress login:  
  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiqV0tl9gmmu7WZFswb3VZHxlZXvSpScze1dI2P-lufaGtghNwnpDlZZ5kwgBUQ0b7p3A7Ks2RfcRxxAU23ZzSdOqSdbghOOznKtyYYKE361beS9MxZHJ-i4aMua2I65qFe3ryI4_0r1kr3/s640/33.JPG)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiqV0tl9gmmu7WZFswb3VZHxlZXvSpScze1dI2P-lufaGtghNwnpDlZZ5kwgBUQ0b7p3A7Ks2RfcRxxAU23ZzSdOqSdbghOOznKtyYYKE361beS9MxZHJ-i4aMua2I65qFe3ryI4_0r1kr3/s1600/33.JPG)

  
This will allow the user to login to the database and only be able to read the data from customer table and will get an authentication error on any other table .  
  
7\. To provide read only access to a set of tables , we can create a infile of all the grant select commands written for the tables intended for read only access in a text file and  pass as parameter to the sqlexp command:  
  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgeZq0lYqDOdQ1lhAv_9F4jykuJYqCosRiYQiqK24-w3d7QlWTd7ozXj0S8k1rSkQbR7t0HHgk2XiqxDvIsTklJsvgATNnNTnVykNr81zcAQUqbHeH8Vnx0eoJncCeHn-qirsLQSyQOi_tb/s640/33.JPG)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgeZq0lYqDOdQ1lhAv_9F4jykuJYqCosRiYQiqK24-w3d7QlWTd7ozXj0S8k1rSkQbR7t0HHgk2XiqxDvIsTklJsvgATNnNTnVykNr81zcAQUqbHeH8Vnx0eoJncCeHn-qirsLQSyQOi_tb/s1600/33.JPG)

  
8\. If you want to create a read only access for the user to the entire database, i.e to all the tables of the database the user will have query access.For such cases we can create the input file using a 4gl snippet which would write grant select query for all tables in the database:  
  
OUTPUT TO ReadWrite.SQL.  
FOR EACH \_file WHERE \_file.\_file-num GT 0 AND \_file.\_file-num LT 32000 NO-LOCK:  
     PUT UNFORMATTED 'grant select on PUB."' + \_file.\_file-name + '" to sqluser;'  
     SKIP.  
     PUT UNFORMATTED 'COMMIT;'  
     SKIP.  
END.