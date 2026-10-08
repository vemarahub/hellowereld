---
title: 'NameServer,AppServer,AdminServer,Webspeed Configuration and Commands'
description: 'Since we are done with the theoritical part of the various entities , lets see how we use them in a real work scenario for a progress DB environment. Admin'
date: 2017-12-14
tags: ['ubroker', 'nsman', 'asbman', 'start/stop/query-brokers', 'wtbman', 'proadsv']
featured: false
---

  
  
Since we are done with the theoritical part of the various entities , lets see how we use them in a real work scenario for a progress DB environment.  
**Admin Server**  
Admin server properties is configured in the AdminServerplugins.properties file present in the <openedge-install-dir>/properties path.  
  
The default port of admin server is 20931.  
  
To start admin server , use  
  
**proadsv -start**  
  
To start in a different port, use  
  
**proadsv -port <portnumber> -start**  
To stop admin server use,  
  
**proadsv -stop**  
To query the admin server status, use  
**proadsv -query**  
**NameServer**  
  
We can configure nameserver instance using the ubroker,properties file.The different commands to start,stop,query nameserver are:  
  
To Stop:  
  
**nsman -name <nameserver-name> -stop**  
  
To Start:  
  
**nsman -name <nameserver-name> -start**  
To query  
  
**nsman -name <nameserver-name> -query**  
  
**Configuring Appserver and Webspeed**  
  
  
The appserver and webspeed configuration is done in the ubroker.properties file,By default wsbroker1 and asbroker1 entries can be found as sample configuration for webspeed and appserver respectively.  
  
  
The following would be how a configuration for a new webspeed will look like:  
  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEixY3-7ujWmLlSj8dd90m0_6HMyOOlcKOBOPxqbzccANTa_T0dmPJDns49w5oIAo2aeJuyS4yAM1r5PPggU2ELWz6YsSLzb09epxMhZWR2vX6YvKTChOlSPP1loqCy5mAaIShiANzuwK7od/s640/qq.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEixY3-7ujWmLlSj8dd90m0_6HMyOOlcKOBOPxqbzccANTa_T0dmPJDns49w5oIAo2aeJuyS4yAM1r5PPggU2ELWz6YsSLzb09epxMhZWR2vX6YvKTChOlSPP1loqCy5mAaIShiANzuwK7od/s1600/qq.png)

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
**Test Configuration**  
  
\[UBroker.WS.wsbroker\_test1\]  
    appserviceNameList=wsbroker\_test1  
    brokerLogFile=$WRKDIR/wsbroker\_test1.broker.log  
    controllingNameServer=NS1  
    description=A sample WebSpeed Transaction Server  
    environment=wsbroker\_test1  
    #initialSrvrInstance=2  
    #maxSrvrInstance=5  
    #minSrvrInstance=2  
    groupName=sys  
    portNumber=3045  
    srvrMinPort=7702  
    srvrMaxPort=8802  
    srvrLogFile=$WRKDIR/wsbroker\_test1.server.log  
    srvrStartupParam=-db "/usr/wrk/testdb/test1" -H "testServ" -S 1234 -U "wtbman" -P "wtbman" -T /tmp -p "web/objects/web-disp.p" -weblogerror -rx  
    uuid=62627235afbd9a53:2c59ad6a:12b127d0123:-8000  
    workDir=/home/rajesh  

  

  
The following would be how a configuration of a new appserver will be:  
  
  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEizJgpGVd_WToiM4DfNJGbtxghayc76GsgNyIw_HumnJbZs9DBLQf3eZ_bjhAGjlbY7Dh2VgB3QNASAe1obbGNoM0kqlRexDHBlmCn0Jdu2ZOZpKonTlNkBqi79YlNQORfXtWhP93CpMxBr/s640/qw.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEizJgpGVd_WToiM4DfNJGbtxghayc76GsgNyIw_HumnJbZs9DBLQf3eZ_bjhAGjlbY7Dh2VgB3QNASAe1obbGNoM0kqlRexDHBlmCn0Jdu2ZOZpKonTlNkBqi79YlNQORfXtWhP93CpMxBr/s1600/qw.png)

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
**Test Configuration**  
\[UBroker.AS.asbroker\_test1\]  
    appserviceNameList=asbroker\_test1  
    brkrDebuggerKeyAlias=default\_server  
    brokerLogFile=$WRKDIR/asbroker\_test1.broker.log  
    controllingNameServer=NS1  
    environment=asbroker\_test1  
    keyAlias=default\_server  
    mqBrokerLogFile=$WRKDIR/asbroker\_test1.mqbroker.log  
    mqServerLogFile=$WRKDIR/asbroker\_test1.mqserver.log  
    portNumber=3195  
    srvrLogFile=$WRKDIR/asbroker\_test1.server.log  
    srvrStartupParam=-db "/usr/wrk/testdb/test1" -H "testServ" -S 1234 -U "asbman" -P "asbman" -T /tmp  
    uuid=6271124634d7b4eb:-267c7794:12b127aa471:-7cb3  

  

Once configuration done, you need to start admin Server, web speed and app Server.  
  
Admin Server Start/Stop/Query  
  
**/usr/dlc/bin/proadsv –start/stop/q**  
  
App Server Start/Stop/Query  
  
**asbman –i <appServer-broker-name> -start/stop/q**  
  
Web speed Start/Stop/Query  
  
**wtbman –i <webspeed-broker-name> -start/stop/q**  
  
Checking status of naming Server  
  
**nsman –i  NS1  -q**  
Check working directory of particular broker  
  
**asconfig -name \-v \[ -f \]**  
**wsconfig -i wsbroker\_test1 -v**  
**ubconfig -f ubroker.properties**