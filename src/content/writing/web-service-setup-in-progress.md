---
title: 'Web Service Setup in Progress'
description: 'Following are the steps to follow to setup web service in a progress environment: 1. First we would require a tomcat to deploy web service application, so copy'
date: 2019-03-22
tags: ['openedge', 'progress', 'web-service']
featured: false
---

Following are the steps to follow to setup web service in a progress environment:

  
1\. First we would require a tomcat to deploy web service application, so copy or install apache tomcat for path say, (/usr/local/apache-tomcat-7.0.50).  
  
2.   Copy /usr/dlc/servlets/wsa folder from progress installation path to  /usr/local/apache-tomcat-7.0.50/webapps  
  
3\. Edit the wsa entry in ubroker.properties by mentioning correct ip/port for wsaUrl entry.  
  
  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEifD330wjaJ78QudDo3CIAXJPCUAIXplfEHBhajP2V427VZb6QwA6XdI0TwsdrxisFKIcnKZcfFxO19dNrfXiFFHhpAqAXt9W4X5smkoIOmfztZZEnDbdY4JBORZ7XEonaMa03LH8gDfVA/s640/aq.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEifD330wjaJ78QudDo3CIAXJPCUAIXplfEHBhajP2V427VZb6QwA6XdI0TwsdrxisFKIcnKZcfFxO19dNrfXiFFHhpAqAXt9W4X5smkoIOmfztZZEnDbdY4JBORZ7XEonaMa03LH8gDfVA/s1600/aq.png)

  
  
3.1 Edit setclasspath.sh to point to correct java paths JRE\_HOME=/usr/jdk/jdk1.8.0\_60/jre  

  

1    3 .2   Edit /usr/local/apache-tomcat-7.0.50/webapps/wsa/WEB-INF/web.xml and comment

  

<security-constraint>  tag

  

4. Start the apache tomcat server by below command:

cd /usr/local/apache-tomcat-7.0.50

./bin/startup.sh

  

5.   Create a .wsm file for

  

 6\. particular webservice required to be deployed .

Eg: /emc/reale/apps/pseudo/input/WebServiceConfig/WSCRMultiComment.wsm (10.22.3.120)

  

 7. Edit wsm file to mention the following entry as per the specific environment:

<SoapEndpointURL>http://{serverip}: {tomcat port}/wsa/wsa1</SoapEndpointURL>

<Service>{appserver name}</Service>

<AppserverURL>AppServerDC://{serverip}: {appserver port}</AppserverURL>

  

 8.Deploy the required webservice by using below command:

  

wsaman -name wsa1 -wsm /emc/reale/apps/pseudo/input/WebServiceConfig/WSCRMultiComment.wsm –deploy

 9. Enable the webservice using the below command:

wsaman -name wsa1 -enable -appname WSCRMultiComment

10.We can list the deployed services to check if our service is deployed and enabled by using the below command:

wsaman -name wsa1 -wsm /emc/reale/apps/pseudo/input/WebServiceConfig/WSCRMultiComment.wsm –list

  

11.     Check if the service url is working by accessing the below ip in browser:

  

http://{serverip}: {tomcat port}/wsa/wsa1                         \[default tomcat port =8080\]

  

  12.For the given example webservice testing can be done by using below soap url:

http://:8080/wsa/wsa1/wsdl?targetURI=urn:WSCRMultiComment