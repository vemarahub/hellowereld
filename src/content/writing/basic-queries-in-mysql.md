---
title: 'Basic Queries in MySQL'
description: 'After installing MySQL-Workbench , in the workbench or by opening mysql prompt in terminal use the below queries for different operations on the database 1. To'
date: 2019-03-07
tags: ['mysql-queries', 'mysql']
featured: false
---

  
  
After installing  MySQL-Workbench , in the workbench or by opening mysql prompt in terminal use the below queries for different operations on the database  
  
1\. To Create a database  
**CREATE DATABASE <dbname>;**  
  
2.To use a particular database  
**USE <dbname>;**  
  
3\. To Create a new table in the selected database  
**CREATE TABLE classics (**  
**author VARCHAR(128),**  
**title VARCHAR(128),**  
**type VARCHAR(16),**  
**year CHAR(4)) ENGINE MyISAM;**  
  
4.To change the name of the table  
**ALTER TABLE classics RENAME newName;**  
5.To change the field name in the database  
**ALTER TABLE classics CHANGE type category varchar(16);**  
  
6.To create a new index in table  
**ALTER TABLE classics ADD INDEX(author(20));**  
**CREATE INDEX author ON classics (author(20));** --- cannot be used to create primary index  
  
7.To see all the indexes in a table  
**SHOW INDEX FROM classics;**  
  
8.To create a primary key for a table  
**ALTER TABLE classics ADD PRIMARY KEY(isbn);**  
9.To see details of a table creation  
**SHOW CREATE TABLE classics;**  
10.To see all the available database engines for mysql  
**SHOW ENGINES;**  
11\. Limit output for select query  
**SELECT author,title FROM classics LIMIT 3;**  
**SELECT author,title FROM classics LIMIT 1,2;**  
**SELECT author,title FROM classics LIMIT 3,1;**  

  
12\. Order By used to order the output based on the fields provided  
**SELECT author,title,year FROM classics ORDER BY author,year DESC;**  
13\. Group By used to group the output based on a field  
**SELECT category,COUNT(author) FROM classics GROUP BY category;**  
14\. Table joins to table two or more tables  
**SELECT name,author,title from customers,classics WHERE customers.isbn=classics.isbn;**  
**SELECT name,author,title FROM customers NATURAL JOIN classics;**  
**SELECT name,author,title FROM customers JOIN classics ON customers.isbn=classics.isbn;**  
  
15.Transaction in InnoDB  
**BEGIN;**  
**UPDATE accounts SET balance=balance-250 WHERE number=12345;**   
**UPDATE accounts SET balance=balance+250 WHERE number=67890;**  
**COMMIT; / ROLLBACK;**  
  
16\. To get latest timestamp of the table  
**SELECT create\_time FROM INFORMATION\_SCHEMA.TABLES**  
  **WHERE table\_name = 'your\_table';**  
**show table status where name='tablename';**