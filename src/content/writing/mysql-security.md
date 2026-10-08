---
title: 'MySQL Security'
description: 'Security for a database could be at a physical level,network level,OS level,File System level or at User account level.The mysql.user table contains account'
date: 2019-07-12
tags: []
featured: false
topic: 'MySQL'
order: 999
---

Security for a database could be at a physical level,network level,OS level,File System level or at User account level.The mysql.user table contains  account identification tables,global privilege information,optional usage limitations etc.

  
basic account info consists of:  
host value(location from where user can login),user value(username for login) - two halves of primary key  
Optional password value  
  
Host Property is classified by location specification options :  
Named locations(localhost)  
Specific IP address  
Domain Name  
Range of Ip address - network prefix format eg: 192.168.0.0/24 or wildcard ip address  
  
There can also be wildcard host values such as:  
In IP address - '192.168.1.%' or '192.168.1.\_ \_'  
In domain name '%.xyz.%' or '\_ \_ \_.xyz.com'  
To specify any location - ('%')  
  
**Creating a new User**  
  
mysql> use mysql  
  
mysql> CREATE USER 'test'@'localhost' IDENTIFIED BY 'pwd';  
Query OK, 0 rows affected (0.01 sec)  
  
mysql> select user, host,authentication\_string from user where user='test';  
+-----------+-----------+-------------------------------------------+  
| user      | host      | authentication\_string                     |  
+-----------+-----------+-------------------------------------------+  
| test      | localhost | \*975B2CD4FF9AE554FE8AD33168FBFC326D2021DD |  
+-----------+-----------+-------------------------------------------+  
  
**User Privileges**  
It is used to grant or restrict access to resources managed by the database server and only applies to database server.  
  
The various scope hierarchy for user privileges are:  
  
**Global** \- available anywhere within preview of DB server.  
**Database** - only to a particular database  
**Table** - assigned table by table basis  
**Column** \- access column wise  
**Routine** - privilege for using/modifying/dropping stored procedures  
  
Privileges held in RAM when the user logs in to the particular scope.  
  
**Reviewing Privilege**  
  
mysql> show grants \\G  
\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\* 1. row \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*  
Grants for root@localhost: GRANT ALL PRIVILEGES ON \*.\* TO 'root'@'localhost' WITH GRANT OPTION  
\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\* 2. row \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*  
Grants for root@localhost: GRANT PROXY ON ''@'' TO 'root'@'localhost' WITH GRANT OPTION  
2 rows in set (0.00 sec)  
  
mysql> SHOW GRANTS FOR 'joe'@'%' \\G  
\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\* 1. row \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*  
Grants for joe@%: GRANT USAGE ON \*.\* TO 'joe'@'%'  
1 row in set (0.00 sec)  
USAGE - no privileges but only login and see information schema dbs  
  
  
The various Privilege Tables used are:  
user  
db  
tables\_priv  
columns\_priv  
procs\_priv  
  
  
  
**Global Privileges**  
Blanket Access to database system including mysql db.Privileges usually reserved for admin accounts.  
Eg:  
"Select","Insert","Update" and "Delete"  
"Create","Alter" and "Drop" - for both db and tables  
"File","Process","Shutdown" - Only global privelege  
"Create User" Privilege  
"Super" privelege - eg change password,  
  
  
mysql> GRANT SELECT ON \*.\*  TO 'test'@'localhost';  
Query OK, 0 rows affected (0.01 sec)  
  
mysql> select \* from user where user='test'\\G  
\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\* 1. row \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*  
                  Host: localhost  
                  User: test  
           Select\_priv: Y  
           Insert\_priv: N  
           Update\_priv: N  
           Delete\_priv: N  
           Create\_priv: N  
             Drop\_priv: N  
           Reload\_priv: N  
         Shutdown\_priv: N  
          Process\_priv: N  
             File\_priv: N  
            Grant\_priv: N  
       References\_priv: N  
            Index\_priv: N  
            Alter\_priv: N  
          Show\_db\_priv: N  
            Super\_priv: N  
 Create\_tmp\_table\_priv: N  
      Lock\_tables\_priv: N  
          Execute\_priv: N  
       Repl\_slave\_priv: N  
      Repl\_client\_priv: N  
      Create\_view\_priv: N  
        Show\_view\_priv: N  
   Create\_routine\_priv: N  
    Alter\_routine\_priv: N  
      Create\_user\_priv: N  
            Event\_priv: N  
          Trigger\_priv: N  
Create\_tablespace\_priv: N  
              ssl\_type:  
            ssl\_cipher:  
           x509\_issuer:  
          x509\_subject:  
         max\_questions: 0  
           max\_updates: 0  
       max\_connections: 0  
  max\_user\_connections: 0  
                plugin: mysql\_native\_password  
 authentication\_string: \*975B2CD4FF9AE554FE8AD33168FBFC326D2021DD  
      password\_expired: N  
 password\_last\_changed: 2019-07-11 10:01:55  
     password\_lifetime: NULL  
        account\_locked: N  
1 row in set (0.00 sec)  
  
mysql> GRANT ALL ON \*.\*  TO 'test'@'localhost';  
Query OK, 0 rows affected (0.00 sec)  
  
mysql> select \* from user where user='test'\\G  
\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\* 1. row \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*  
                  Host: localhost  
                  User: test  
           Select\_priv: Y  
           Insert\_priv: Y  
           Update\_priv: Y  
           Delete\_priv: Y  
           Create\_priv: Y  
             Drop\_priv: Y  
           Reload\_priv: Y  
         Shutdown\_priv: Y  
          Process\_priv: Y  
             File\_priv: Y  
            Grant\_priv: N  
       References\_priv: Y  
            Index\_priv: Y  
            Alter\_priv: Y  
          Show\_db\_priv: Y  
            Super\_priv: Y  
 Create\_tmp\_table\_priv: Y  
      Lock\_tables\_priv: Y  
          Execute\_priv: Y  
       Repl\_slave\_priv: Y  
      Repl\_client\_priv: Y  
      Create\_view\_priv: Y  
        Show\_view\_priv: Y  
   Create\_routine\_priv: Y  
    Alter\_routine\_priv: Y  
      Create\_user\_priv: Y  
            Event\_priv: Y  
          Trigger\_priv: Y  
Create\_tablespace\_priv: Y  
              ssl\_type:  
            ssl\_cipher:  
           x509\_issuer:  
          x509\_subject:  
         max\_questions: 0  
           max\_updates: 0  
       max\_connections: 0  
  max\_user\_connections: 0  
                plugin: mysql\_native\_password  
 authentication\_string: \*975B2CD4FF9AE554FE8AD33168FBFC326D2021DD  
      password\_expired: N  
 password\_last\_changed: 2019-07-11 10:01:55  
     password\_lifetime: NULL  
        account\_locked: N  
1 row in set (0.00 sec)  
  
  
**Database Privileges**  
Database privileges apply to all resources within a specific database.  
"Create","Alter","Drop" for tables within the database.  
"select","insert","update","delete"  
"execute"  
  
mysql> GRANT SELECT,INSERT ON maintpro.\* TO 'joe'@'%';  
Query OK, 0 rows affected (0.01 sec)  
  
mysql> select \* from db\\G  
\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\* 1. row \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*  
                 Host: localhost  
                   Db: sys  
                 User: mysql.sys  
          Select\_priv: N  
          Insert\_priv: N  
          Update\_priv: N  
          Delete\_priv: N  
          Create\_priv: N  
            Drop\_priv: N  
           Grant\_priv: N  
      References\_priv: N  
           Index\_priv: N  
           Alter\_priv: N  
Create\_tmp\_table\_priv: N  
     Lock\_tables\_priv: N  
     Create\_view\_priv: N  
       Show\_view\_priv: N  
  Create\_routine\_priv: N  
   Alter\_routine\_priv: N  
         Execute\_priv: N  
           Event\_priv: N  
         Trigger\_priv: Y  
\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\* 2. row \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*  
                 Host: %  
                   Db: maintpro  
                 User: joe  
          Select\_priv: Y  
          Insert\_priv: Y  
          Update\_priv: N  
          Delete\_priv: N  
          Create\_priv: N  
            Drop\_priv: N  
           Grant\_priv: N  
      References\_priv: N  
           Index\_priv: N  
           Alter\_priv: N  
Create\_tmp\_table\_priv: N  
     Lock\_tables\_priv: N  
     Create\_view\_priv: N  
       Show\_view\_priv: N  
  Create\_routine\_priv: N  
   Alter\_routine\_priv: N  
         Execute\_priv: N  
           Event\_priv: N  
         Trigger\_priv: N  
2 rows in set (0.00 sec)  
  
  
  
**Table Privileges**  
Used when account must not have access to all tables.  
"Create","Alter","Drop" for a table  
"select","insert","update","delete"  
"create view" , "Trigger"  
  
mysql> GRANT UPDATE,DELETE ON maintpro.userdetails to 'joe'@'%';  
Query OK, 0 rows affected (0.01 sec)  
  
mysql> select \* from tables\_priv\\G  
\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\* 1. row \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*  
       Host: localhost  
         Db: sys  
       User: mysql.sys  
 Table\_name: sys\_config  
    Grantor: root@localhost  
  Timestamp: 2017-07-14 12:22:18  
 Table\_priv: Select  
Column\_priv:  
\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\* 2. row \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*  
       Host: %  
         Db: maintpro  
       User: joe  
 Table\_name: userdetails  
    Grantor: root@localhost  
  Timestamp: 0000-00-00 00:00:00  
 Table\_priv: Update,Delete  
Column\_priv:  
2 rows in set (0.00 sec)  
  
Set values in bit wise representation so faster for mysql to read access  
  
**Column Privileges**  
"select","insert","update"  
"references"-use to perform some action  
interaction with table privileges  
  
mysql> GRANT SELECT (dbid,desc\_id,info),INSERT(mail\_flg,enddate),UPDATE(mail\_flg,info) ON maintpro.alerts to 'joe'@'%';  
Query OK, 0 rows affected (0.01 sec)  
  
mysql> select \* from columns\_priv \\G  
\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\* 1. row \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*  
       Host: %  
         Db: maintpro  
       User: joe  
 Table\_name: alerts  
Column\_name: dbid  
  Timestamp: 0000-00-00 00:00:00  
Column\_priv: Select  
\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\* 2. row \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*  
       Host: %  
         Db: maintpro  
       User: joe  
 Table\_name: alerts  
Column\_name: desc\_id  
  Timestamp: 0000-00-00 00:00:00  
Column\_priv: Select  
\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\* 3. row \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*  
       Host: %  
         Db: maintpro  
       User: joe  
 Table\_name: alerts  
Column\_name: info  
  Timestamp: 0000-00-00 00:00:00  
Column\_priv: Select,Update  
\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\* 4. row \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*  
       Host: %  
         Db: maintpro  
       User: joe  
 Table\_name: alerts  
Column\_name: mail\_flg  
  Timestamp: 0000-00-00 00:00:00  
Column\_priv: Insert,Update  
\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\* 5. row \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*  
       Host: %  
         Db: maintpro  
       User: joe  
 Table\_name: alerts  
Column\_name: enddate  
  Timestamp: 0000-00-00 00:00:00  
Column\_priv: Insert  
5 rows in set (0.00 sec)  
  
This adds a column in the tables\_priv:  
\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\* 3. row \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*  
       Host: %  
         Db: maintpro  
       User: joe  
 Table\_name: alerts  
    Grantor: root@localhost  
  Timestamp: 0000-00-00 00:00:00  
 Table\_priv:  
Column\_priv: Select,Insert,Update  
3 rows in set (0.00 sec)  
  
**Routine Privileges**  
"execute","alter routine","grant","create routine"  
  
mysql> GRANT EXECUTE ON FUNCTION world.demo1 TO 'joe'@'%';  
  
**Revoking Privileges**  
mysql> show grants for 'joe'@'%' \\G  
\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\* 1. row \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*  
Grants for joe@%: GRANT USAGE ON \*.\* TO 'joe'@'%'  
\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\* 2. row \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*  
Grants for joe@%: GRANT SELECT, INSERT ON \`maintpro\`.\* TO 'joe'@'%'  
\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\* 3. row \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*  
Grants for joe@%: GRANT SELECT (desc\_id, info, dbid), INSERT (enddate, mail\_flg), UPDATE (mail\_flg, info) ON \`maintpro\`.\`alerts\` TO 'joe'@'%'  
\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\* 4. row \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*  
Grants for joe@%: GRANT UPDATE, DELETE ON \`maintpro\`.\`userdetails\` TO 'joe'@'%'  
4 rows in set (0.00 sec)  
  
mysql> REVOKE DELETE ON maintpro.userdetails FROM 'joe'@'%';  
Query OK, 0 rows affected (0.00 sec)  
  
**Assigning & Changing Passwords**  
Users can change thier own password using:  
SET PASSWORD = PASSWORD('')  
  
Administrators can change password for other accounts using:  
SET PASSWORD  FOR \= PASSWORD('')  
  
UPDATE user SET password = PASSWORD('') WHERE user = and host=;  
FLUSH PRIVILEGES;  
  
**Limiting Activity By Account**  
max\_user\_connections limits no of simultaneous connection by an account.  
  
Account Limitations Possible:  
No of select queries per hour  
No of updates per hour  
No of connections per hour  
No of simultaneous connections  
  
GRANT USAGE ON \*.\* TO 'user'@'host' WITH MAX\_QUERIES\_PER\_HOUR x MAX\_UPDATES\_PER\_HOUR x MAX\_CONNECTION\_PER\_HOUR x MAX\_USER\_CONNECTIONS x;  
  
**The Login Process**  
**First Test** - Client Host validation :Connection attempt packet includes IP address of machine from which the request was sent.Server tests whether there are any accounts whose host range includes this address.If not it returns the message:  
Host is not allowed to connect to this MySQL server  
  
**Second Test** \- Full account validation :Server now attempts to locate an account that uses the name supplied whose host range includes the client host IP address.If account does not exist, it returns:  
Access denied for user (using password:NO)  
  
**Third Test** - Password Validation:Server hashes the supplied password.If password is incorrect:  
Access denied for user (using password:YES)  
  
**Additional Security Features**  
REQUIRE clause after IDENTIFIED BY  
Options: SSL,X509,ISSUER,SUBJECT and CIPHER(NONE is default)  
  
Proxy Privileges : User has privileges of another user.  
GRANT PROXY ON TO  
REQUIRE not allowed and WITH can only include GRANT OPTION  
Requires an authentication plugin  
**Privilege Persistence**  
mysql> CREATE DATABASE test1;  
Query OK, 1 row affected (0.01 sec)  
  
mysql> GRANT SELECT ON test1.\* TO 'joe'@'%';  
Query OK, 0 rows affected (0.00 sec)  
  
mysql> CREATE DATABASE test1;  
Query OK, 1 row affected (0.01 sec)  
  
mysql> GRANT SELECT ON test1.\* TO 'joe'@'%';  
Query OK, 0 rows affected (0.00 sec)  
  
mysql> SHOW GRANTS FOR 'joe'@'%' \\G                                                                                                                          \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\* 1. row \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*                                                                                                              Grants for joe@%: GRANT SELECT ON \`test1\`.\* TO 'joe'@'%'                                                                                      \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*     
  
mysql> DROP DATABASE test1;  
Query OK, 0 rows affected (0.00 sec)  
  
mysql> SHOW GRANTS FOR 'joe'@'%' \\G                                                                                                                          \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\* 1. row \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*                                                                                                              Grants for joe@%: GRANT SELECT ON \`test1\`.\* TO 'joe'@'%'                                                                                      \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*  
  
**Alternate Authentication**  
version 5.5 IDENTIFIED WITH \[AS ''\]  
  
**Dropping a User Account**  
mysql> DROP USER ''@'localhost';  
Query OK, 0 rows affected (0.02 sec)