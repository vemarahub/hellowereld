---
title: 'OpenEdge Management(OEM) or Management Console/OpenEdge Explorer'
description: 'In windows version of progress openedge, the product package comes with an extra product which is not available in unix version of the openedge products -'
date: 2018-08-06
tags: ['openedge', 'management-console', 'monitoring']
featured: false
---

  
  
In windows version of progress openedge, the product package comes with an extra product which is not available in unix version of the openedge products - "OpenEdge Mgt. SE"  
  
This product is the Openedge Management Console, previously known as Openedge Explorer in previous OE versions.  
  
The OpenEdge management console or OEM is a browser based tool provided by progress to maintain and monitor the various openedge resources like database, admin server, appserver , nameserver etc through the  tool.The tool also provides additional monitoring of the disk / memory usage of the server in which the openedge packages are installed and running.  
  
As compared to unix, where a DBA has to depend on shell scripting or other 3rd party tools to monitor the database and its resources, in windows progress provides a brilliant feature which makes the tasks of a DBA much easier and provides to even a non DBA to be able to perform database activities.  
  
The OEM can be accessed by hitting the URL : http://localhost:9090 or http://<local\_ipaddresss>:9090 after starting the admin server.  
  
The OEM uses a default databases known as fathom database to capture all the statistics required for the OEM to function.  
  
The OEM can also be accessed through start menu by the name "Management Console".The login screen will look as below:  
  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgv8RkQhKFh9tzWynzoQxt5SyGfN_Du6kQzoa2THMQ3noTauUi4KaqrZebxzzpYsQBlT-ibI7OvNz-c_96zRJPGBlJL9Gqvd6uQPlpSbwsJfW85gf7fOx53sZCFs-gHaMk8JDWYkOsVk0R1/s640/33.JPG)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgv8RkQhKFh9tzWynzoQxt5SyGfN_Du6kQzoa2THMQ3noTauUi4KaqrZebxzzpYsQBlT-ibI7OvNz-c_96zRJPGBlJL9Gqvd6uQPlpSbwsJfW85gf7fOx53sZCFs-gHaMk8JDWYkOsVk0R1/s1600/33.JPG)

  
  
The default user credential for management console is :"admin/admin"  
  
At first login, we have to reset the password for the OEM and provide some basic configurations like SMTP host ,port etc for the OEM tool.