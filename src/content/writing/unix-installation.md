---
title: 'Unix Installation'
description: 'In unix system installation can be done in more than one ways.For installing mongo in unix/linux systems follow the below steps using apt-get command use the'
date: 2019-03-12
tags: ['mongo', 'mongo-unix-installation']
featured: false
topic: 'MongoDB'
order: 999
---

In unix system installation can be done in more than one ways.For installing mongo in unix/linux systems follow the below steps using apt-get command use the below steps after logging into the server:

  

1.    Import the public key used by the package management system. 

**sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5**

  

Create a list file for MongoDB

**echo "deb \[ arch=amd64 \] https://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list**

  

2.    Reload local package database 

          **sudo apt-get update**

  

3.       Install the MongoDB packages 

**sudo apt-get install -y mongodb-org**

  

or to Install a specific release of MongoDB

**sudo apt-get install -y mongodb-org=3.6.4 mongodb-org-server=3.6.4 mongodb-org-shell=3.6.4 mongodb-org-mongos=3.6.4 mongodb-org-tools=3.6.4**

  

Once installation of mongo server is completed , below are the commands for starting the mongo deamon service :

  

1.       Start MongoDB

**sudo service mongod start**

2.       Verify that MongoDB has started successfully  

             **sudo service mongod status**

**\[initandlisten\] waiting for connections on port 27017**

3.       Stop MongoDB.

      **sudo service mongod stop**

  

4.       Restart MongoDB

      **sudo service mongod restart**