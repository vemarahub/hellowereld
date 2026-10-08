---
title: 'Openedge Appserver, Webspeeds, NameServer and Admin Servers'
description: 'Appserver Environment provides a foundation for a flexible and extensible application infrastructure. OpenEdge Application Server supports an open,'
date: 2017-12-14
tags: ['ubroker.properties', 'agent', 'adminserver', 'webspeed', 'appserver', 'nameserver', 'broker']
featured: false
---

**Appserver Environment**  provides a foundation for a flexible and extensible application infrastructure. OpenEdge Application Server supports an open, component-based model for partitioning applications, allowing them to be transformed into modular elements within an integrated environment.  
  
This enables business logic to be easily distributed and reused, saving time and resources. By partitioning applications and separating the business-processing logic from the user-interface logic, applications can be made available to users through virtually any interface. Centralized business logic offers a single point to manage access to data and processes for improved productivity.  

  

  

**Appserver Architecture** would look like below

  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhPPiki1xOS-RjSDM2JhpfaPS_KfrBJwJbr1r0nslZgLJ85bcNqt-WyaQWuJ1nTgKen526VGFVmPqQGQ0rBlkJWvR_hzYhlmRqgaXI0DUeYM6OtQn3sFqjfUn7JF1lNUzheN2bynRawGdEw/s640/Capture1.PNG)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhPPiki1xOS-RjSDM2JhpfaPS_KfrBJwJbr1r0nslZgLJ85bcNqt-WyaQWuJ1nTgKen526VGFVmPqQGQ0rBlkJWvR_hzYhlmRqgaXI0DUeYM6OtQn3sFqjfUn7JF1lNUzheN2bynRawGdEw/s1600/Capture1.PNG)

  
  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi7sySdTjZm0xZVOaKhs_52bqDKhULnu6InvMni7M9YFLRCDijDJaRirDumhaDwJdJrLL_fd286cQ-8ACnUqBCLlba7G8lOfezDV7FUVQvksbwZIL_7IgvRjryjH_D3l_rANb6rmnxVrJbQ/s640/Capture.PNG)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi7sySdTjZm0xZVOaKhs_52bqDKhULnu6InvMni7M9YFLRCDijDJaRirDumhaDwJdJrLL_fd286cQ-8ACnUqBCLlba7G8lOfezDV7FUVQvksbwZIL_7IgvRjryjH_D3l_rANb6rmnxVrJbQ/s1600/Capture.PNG)

  

  

  

  

  
  
  
  
  
  
  
  
**AppServer Agents**   A process that executes remote procedure requests in the context of an OpenEdge session. Much like a batch ABL client, almost any ABL statement that you can execute in an interactive ABL client you can execute within an Application Server process.  
  

 An AppServer instance typically contains multiple Application Server processes that start up when you start the AppServer.

  

  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj_QPx4RxkE7GbSP-puaBIfOLGV51vnOTZ5i6x7DhIEXIYOiylSWQfpJd7YsDo-G4fOaLIL_d0R6kdd17F-74BxlC3PtBbUfJOebqa6UFMAg9TB3gr1kBxj3z0iptP0AOEt1fCmBwQKnXAP/s640/Capture22.PNG)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj_QPx4RxkE7GbSP-puaBIfOLGV51vnOTZ5i6x7DhIEXIYOiylSWQfpJd7YsDo-G4fOaLIL_d0R6kdd17F-74BxlC3PtBbUfJOebqa6UFMAg9TB3gr1kBxj3z0iptP0AOEt1fCmBwQKnXAP/s1600/Capture22.PNG)

  

  

  

  

**WebSpeed Environment** is used for developing Web browser-based business applications that support real-time database access and management.

  

WebSpeed allows you to build applications that use HTML, XML, WML, DHTML, and most other mark-up languages (MLs) as the user interface.

  

With WebSpeed, you can develop and deploy:

  

\*Intranet applications that allow internal users to access and modify data.

  

\*Internet applications that allow external, consumer access (for example, a shopping cart application).

  

\*Extranet, business-to-business applications.

  

  

**The Webspeed architecture** would look like below,  A transaction server, which consists of brokers and agents, execute requests from a client. The unique piece of the WebSpeed environment, the WebSpeed Messenger, is a process that runs on your Web server capturing and redirecting client requests.

  

  

  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjZx81Yzw-iGjzaG9zr-Paob5yJjpdHkhXQP3CTukgELWqrBmiKKhPWLfASp6gOiK04YCvBDkCM0LXpbHu8x8VDjLaGHIBqZsklMJ7j8RPuRMY0lC-KNQPVXDkmNIF_5GQD3sqaMlh2ZOpL/s640/rfi1371042704711.jpg)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjZx81Yzw-iGjzaG9zr-Paob5yJjpdHkhXQP3CTukgELWqrBmiKKhPWLfASp6gOiK04YCvBDkCM0LXpbHu8x8VDjLaGHIBqZsklMJ7j8RPuRMY0lC-KNQPVXDkmNIF_5GQD3sqaMlh2ZOpL/s1600/rfi1371042704711.jpg)

  

  
  
The WebSpeed Transaction Server consists of the processes that handle the server-side activity of your WebSpeed applications:  
  
\***WebSpeed agent** — An application process that can execute Web objects, perform database transactions, and dynamically merge data into HTML format. The agent is the standard character ABL client running in batch mode. An AppServer agent is a single AVM instance running on the AppServer.  
  
Note: The agent process is inherently stateless. This means that the agent is only busy when a request is being processed. It will be idle at all other times.  
  
\***WebSpeed broker** — An application that can do the following:  
\>Register with a NameServer the application services that it provides to fulfill requests from HTML clients.  
For information on running WebSpeed from a client other than the HTML client  
\>Manage connections between clients and a pool of WebSpeed Agents.  
\>Maintain the status of each agent in its pool and dynamically scale the number of agents according to changing demand.  
  
**NameServer** The NameServer is a basic part of the OpenEdge architecture. It maintains a list of available AppServers and WebSpeed Transaction Servers. Those servers register the application services that they provide with the NameServer. The NameServer can then direct client connection requests to a broker that supports a requested application service. This provides scalability and location transparency to your applications.  
  
The NameServer can also provide load balancing and fault tolerance for OpenEdge server applications. Load balancing allows you to balance client workload among multiple brokers that support the same application service (that is, the same set of procedures and resources). This ability makes the NameServer very useful in deployed applications that handle large volumes of requests.  
  
  
  

**Admin Server**  The AdminServer is the central control of OpenEdge Management or OpenEdge Explorer. It facilitates the tasks associated with managing and configuring your installation by ensuring that start and stop requests initiated by OpenEdge products are recognized. In addition to the footnotes identified in the table, note the following about the AdminServer:  
  
\*To start and stop the AdminServer, you can either enter the PROADSV command on the Proenv command line or access the Services tab by choosing Control Panel > Administrative Tools > Services.  
\*To manage and configure plug-ins (such as WebSpeed or AppServer) you can use OpenEdge Management or OpenEdge Explorer.  
\*To minimize the potential for security risks through the AdminServer functionality by ensuring that you do not start the AdminServer as root. Keep in mind that if you do start the AdminServer in this state, all broker processes start as root by default, leaving your entire system vulnerable to security issues.  
\*The AdminServer has an extensible framework to host the OpenEdge products as plug-ins.  
  
  
  
**ubroker.properties file** The ubroker.properties file is the property file for the WebSpeed Transaction Server, WebSpeed Messengers, and the NameServer. All values that define instances of the WebSpeed Transaction Server and the NameServer are stored within this file.  
  
 The command-line utilities and OpenEdge Management/OpenEdge Explorer access this information through the AdminServer when working with instances of all processes.  
The ubroker.properties file resides in the OpenEdge-install-dir/properties directory. It is a fully commented file containing information relevant to setting properties for your WebSpeed configuration.