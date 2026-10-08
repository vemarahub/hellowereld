---
title: 'OpenEdge Installation Unix/Linux'
description: 'These are the steps for installing progress openedge RDBMS in a nix OS: Installation Steps for Progress OpenEdge Product: Pre-requisite: DBA to make sure Java'
date: 2017-12-14
tags: ['liscences', 'openedge', 'progress', 'openedge-installation']
featured: false
topic: 'Progress/OpenEdge'
order: 3
---

These are the steps for installing progress openedge RDBMS in a  \*nix OS:  
  

**Installation Steps for Progress OpenEdge Product:**  
  
Pre-requisite: DBA to make sure Java and apache already installed and we have progress Setup(installation pack), Root access  
Login to server and switch to root user, you always should be in /tmp directory to install the progress Open edge.  
  
~#cd /tmp  
  
/tmp#/installation/path/directory/proinst  
  
when you hit above command you will be directed to below screen where it check the JVM and lets you select the required version.  
  
It is must that JVM should be installed in your machine where you going to install progress Open-edge, usually progress consultants will always prefer java 1.5 for 10.2b and 1.6 above for 11.x.  
  
You can check which java version is installed in your server by hitting command java -version.  
  
1.Welcome screen of installation.  
  
[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjy5Rpb8nare3c1y5FNIpxMtFd0Oyby6uj4uVWCDUIlmtjdYyx_QtW2WsnWV2iI5zyBp9jsHlJpKZfU83vYhRWtQOO4GSDe1G5tTN3n077cIAzA1eDdl9Z5wr-do2iNHu3ik7_4-CypnebI/s640/11.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjy5Rpb8nare3c1y5FNIpxMtFd0Oyby6uj4uVWCDUIlmtjdYyx_QtW2WsnWV2iI5zyBp9jsHlJpKZfU83vYhRWtQOO4GSDe1G5tTN3n077cIAzA1eDdl9Z5wr-do2iNHu3ik7_4-CypnebI/s1600/11.png)  
  
hope you agree for the copyrights hit enter.  
  
2\. Information required are,  
a. company name (which is owning the license)  
b. serial number  
c. control number  
  
[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjIK-6x_sE9HolLMSifLpu-r6HHtlIAjdVzJVetlIgpnGX2p1G07XvzZN6dReN8v4T-UGpV2vUwZLqJKZ9-D_SzGniaBqhEyYcUzxyxv9tGqJ8-0OyaftJrCOvx6QZxZ6_X77RM-RnV890-/s640/22.jpg)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjIK-6x_sE9HolLMSifLpu-r6HHtlIAjdVzJVetlIgpnGX2p1G07XvzZN6dReN8v4T-UGpV2vUwZLqJKZ9-D_SzGniaBqhEyYcUzxyxv9tGqJ8-0OyaftJrCOvx6QZxZ6_X77RM-RnV890-/s1600/22.jpg)  
  
  
you can enter multiple licenses by hitting Enter company name will remain same serial and control number will varies. Once you done with entering all the licenses hit ctrl + E. it will prompt you to ask whether you have done entering all licenses hit y.  
  
  
3.Next screen which appears is below.  
  
Open Edge Explorer functionality is provided within the browser interface for the OpenEdge Management.  
  
When the Admin Server is running, a web browser such as Internet Explorer or FireFox may be directed to http://localhost:9090 (the default location of the OpenEdge Management / Explorer connection).  
  
[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjObZAr27tAqIDGYdo-gxHC33SZOgne0H7RvWgoIJVOItZX6SAaIfA5xLTZG5jqeZ1GGacizfaDEDfin7v22A9kals9FaPFA4Htc2mGrMHYmwU4WJ5DdJ7fa-1dXigqfTGOrhn4HzcKl3DN/s640/33.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjObZAr27tAqIDGYdo-gxHC33SZOgne0H7RvWgoIJVOItZX6SAaIfA5xLTZG5jqeZ1GGacizfaDEDfin7v22A9kals9FaPFA4Htc2mGrMHYmwU4WJ5DdJ7fa-1dXigqfTGOrhn4HzcKl3DN/s1600/33.png)  
  
  
hit “y” if you have installed openedge app svr enterprise license.  
  
4\. if you hit “Y” you will be directed to below screen  
  
[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiQUTexRvCFxY6uLFeT8-T6u5Gws6hdWJ1gPHEOLVPZagqPjGVPCBr-tV28NmUUr_GVGaUHz8Q2MY_7fhlo-nkErukVFZ9TxVCh-m7xcA4IQu2gE2kgTC8nnkMb6sBz5sVb1R0Y9JvZeXvn/s640/44.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiQUTexRvCFxY6uLFeT8-T6u5Gws6hdWJ1gPHEOLVPZagqPjGVPCBr-tV28NmUUr_GVGaUHz8Q2MY_7fhlo-nkErukVFZ9TxVCh-m7xcA4IQu2gE2kgTC8nnkMb6sBz5sVb1R0Y9JvZeXvn/s1600/44.png)  
  
Here you have to give JAVAHOME path which will be $JAVA\_HOME environment variable. hit enter to next screen.  
  
5\. Below screen will ask 3 important things,  
a. Type of installation  
· complete install  
· Custom install select complete install which will install the entire package which comes under it.

b. Destination path name  
· Here you have to put destination of the open edge which will be $DLC and work directory destination.  
  
3\. Management Path name  
· Here you have to put the management path and work directory management.  
  
[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhSWqIZpvT1jLbUKYGJ02Bal9bvX3J1SgehzuhTQo0O4UCm3desp-FYEQygRNJQSCWOerG7hyphenhyphenQ-psWUmw8zGpSXMYhV77gRQbd1eicdK8MIf9UXBDEEry2nNSkDjTMZYLlT99B7YlY5bCrP/s640/55.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhSWqIZpvT1jLbUKYGJ02Bal9bvX3J1SgehzuhTQo0O4UCm3desp-FYEQygRNJQSCWOerG7hyphenhyphenQ-psWUmw8zGpSXMYhV77gRQbd1eicdK8MIf9UXBDEEry2nNSkDjTMZYLlT99B7YlY5bCrP/s1600/55.png)  
  
Once you complete entering all the directory hit enter when marker is on continue with installation.  
  
6\. Next screen will be Sonic ESB installation.  
  
[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh2aHb9lHKvdm-OH19gaswO9D2KIa1oLwpKbtnwa2h3FRoKurp3LUh1ePNwrzONM1TnknEa5ygybWrhp_QZYoTOBnOeZckdXZdgXDu2axoZO0rLk-Ib2UkFPG51tslOHA0dynitiWjwLRe9/s640/66.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh2aHb9lHKvdm-OH19gaswO9D2KIa1oLwpKbtnwa2h3FRoKurp3LUh1ePNwrzONM1TnknEa5ygybWrhp_QZYoTOBnOeZckdXZdgXDu2axoZO0rLk-Ib2UkFPG51tslOHA0dynitiWjwLRe9/s1600/66.png)  
  
Sonic ESB is an enterprise service bus (ESB) which simplifies the integration and flexible reuse of business components using a standards-based, service-oriented architecture (SOA). Sonic ESB connects, mediates, and controls services, wherever they are deployed and eliminates hard-wired service dependencies. Sonic ESB provides fast, dependable and secure communications and transactional failover of service interactions. Sonic ESB operates across domains, physical networks, and corporate boundaries.

We don’t need it in standard installation hit “N”.  
  
7\. Next screen which appears is  
  
[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiRQcSoGIay9ejxz97Jwc68cjJ_EPw2QhYsoOm3cW9ecaOGbw5SMcR0NO1U_d04JoBSKYMKFMBNPLqHBy6Hxpam2EmUg3JQJsIiwv_HNi06THgtv8MuQS1FU_l9hCYXVOoszzaavCgxAeEx/s640/77.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiRQcSoGIay9ejxz97Jwc68cjJ_EPw2QhYsoOm3cW9ecaOGbw5SMcR0NO1U_d04JoBSKYMKFMBNPLqHBy6Hxpam2EmUg3JQJsIiwv_HNi06THgtv8MuQS1FU_l9hCYXVOoszzaavCgxAeEx/s1600/77.png)  
  
It allows you to build applications that use HTML, XML, WML, DHTML, and most other mark-up languages (MLs) as the user interface.  
  
8\. hit y enter to next screen where you need to provide some configuration for webspeed.  
  
[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEghwyEc0s8Fkm-EDw3ek1CvoLN8RWBEqNSii1ToLhCp2NeZVKjOr4_zuHBhC_v1upLtMTyt5iPVfzLL-dWfVSEDj2AIAKMsLUFWHn9oTl_SpfyScPckgDQyQ06z5wIhum-V1-V3V5b0gvxj/s640/88.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEghwyEc0s8Fkm-EDw3ek1CvoLN8RWBEqNSii1ToLhCp2NeZVKjOr4_zuHBhC_v1upLtMTyt5iPVfzLL-dWfVSEDj2AIAKMsLUFWHn9oTl_SpfyScPckgDQyQ06z5wIhum-V1-V3V5b0gvxj/s1600/88.png)  
  
9\. This screen will asks for 3 steps  
  
  
a. Type of web speed  
  
  
· sun webserver  
  
  
· CGI -compatible (always prefer this apache needs CGI compatible works on all machine)  
  
  
b. Select web-server script directory  
  
  
· enter the cgi-bin directory path of apache directory  
  
  
· /path/to/apache2/cgi-bin  
  
  
c. copy static HTML  
  
  
· Enter the same path which you have mentioned above.  
  
  
Continue with installation hit enter.  
  
Next section will be language selection section. Hit enter to select and enter to proceed next screen, you can select as many language you want.  
  
After that next screen which appears is settings for languages.  
  
a. character setting, collation, case setting  
  
  
· select American, united states,IS08859-1,basic,basic (if you selected English -American in prev screen)  
  
  
b. Select date format (according to your company standard).  
  
  
c. Select number format (according to your company standard).  
  
  
Continue with installation.  
  
10\. Web speed adapter URL you can change if you want.  
  
[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhukvMusH74PbBVcMkwJnaokjDoBPQtzXIuIeMhM4S3cLFHx4lGjw2k11bGr8HYMUMdwR_eBZJTiwgWtM7AVIn9xfpy0sJDYgSEl_4w3sQd1-2oniwu9hbiNsiWonR_2iNzdModjZQs0KZ3/s640/99.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhukvMusH74PbBVcMkwJnaokjDoBPQtzXIuIeMhM4S3cLFHx4lGjw2k11bGr8HYMUMdwR_eBZJTiwgWtM7AVIn9xfpy0sJDYgSEl_4w3sQd1-2oniwu9hbiNsiWonR_2iNzdModjZQs0KZ3/s1600/99.png)  
  
  
11\. Hit enter to next screen.  
  
  
[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh3l2X_EMf8HJ_GQzfS7NaoWvNSJdLTQFWjxN0i0PCxDAZfR-rUXX3jKitj0RpUtwuI7icKsfdtm6tJzxyskjDNna5EgKWoW4E6GN_WfVpWtMpgt0oRBaqHVIv5t62tbiAK8D1urVtfiGD-/s640/1010.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh3l2X_EMf8HJ_GQzfS7NaoWvNSJdLTQFWjxN0i0PCxDAZfR-rUXX3jKitj0RpUtwuI7icKsfdtm6tJzxyskjDNna5EgKWoW4E6GN_WfVpWtMpgt0oRBaqHVIv5t62tbiAK8D1urVtfiGD-/s1600/1010.png)  
  
You can hit y only if you need it if not press N,  
  
  
You can also enable it once complete the installation also.  
  
12\. Here comes the screen before installation which will brief your product details which you going to install  
  
[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi7DTwmxQBvrRQWt-5JHcaQKn02L8-SrIB1UwmzQl7up5MNxpotFUsXAJftTyqkhzthNkgSzxaGTcVeTKet9BzOb0DtcOlmErqwS2H027FvWM13VjuXSo_pmcn9yoruRKPdJamxr686HdDg/s640/1111.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi7DTwmxQBvrRQWt-5JHcaQKn02L8-SrIB1UwmzQl7up5MNxpotFUsXAJftTyqkhzthNkgSzxaGTcVeTKet9BzOb0DtcOlmErqwS2H027FvWM13VjuXSo_pmcn9yoruRKPdJamxr686HdDg/s1600/1111.png)  
  
13\. Hit y to proceed.  
  
[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhBPX14QgxFM6RqrQUh1naR7AckWVeLX9m28uSHH8GUtaOwqADr8IkRk56KUkJt4yrSyyeKxh-r3l0n9-jTX_GtE6rFq32fZ0F_LHj-ZfJpZKpCKx-aCVFuNDy35NnfK01HbBomIj2r1wTh/s640/1212.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhBPX14QgxFM6RqrQUh1naR7AckWVeLX9m28uSHH8GUtaOwqADr8IkRk56KUkJt4yrSyyeKxh-r3l0n9-jTX_GtE6rFq32fZ0F_LHj-ZfJpZKpCKx-aCVFuNDy35NnfK01HbBomIj2r1wTh/s1600/1212.png)  
  
14\. Once installation completes below screen will appear.  
  
[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhfjjQb9PXQW8MSW2IDwRyeZAJl8pMunEE2ezCa0Cp_PrQ6v7Dz0njLRCyFlgEHtLuU1_ZmN_a1XrEmIFq4btxghJ8n2kiIuVquYR0Af8_6nprC6cj0-Ck-JbCZNDfAKkPUvzx3Q-4Y5ysy/s640/1313.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhfjjQb9PXQW8MSW2IDwRyeZAJl8pMunEE2ezCa0Cp_PrQ6v7Dz0njLRCyFlgEHtLuU1_ZmN_a1XrEmIFq4btxghJ8n2kiIuVquYR0Af8_6nprC6cj0-Ck-JbCZNDfAKkPUvzx3Q-4Y5ysy/s1600/1313.png)  
  
15\. Hit enter  
  
[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiKmsLfdkIIkAcDZObdKQGgnSHDi84y8v3qyQj_c2ymB73GfF3NQGa-UYaEof950M0KMfZfrilwg8QUGeC9-Vw-brT-frIwplPSFsYFFlOZjd8cVZxmjbrsPGcIFRd76v5XK3n_nkOR_967/s640/1414.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiKmsLfdkIIkAcDZObdKQGgnSHDi84y8v3qyQj_c2ymB73GfF3NQGa-UYaEof950M0KMfZfrilwg8QUGeC9-Vw-brT-frIwplPSFsYFFlOZjd8cVZxmjbrsPGcIFRd76v5XK3n_nkOR_967/s1600/1414.png)  
  
  
This will be last screen of installation. Enjoy the facilities of progress open edge.  
  
Silent installation  
The installation has stored a file named /usr/dlc/install/response.ini (or your installation directory). This file can be used to repeat the exact same installation again in a "silent" install that can be scriptet and run without any interaction.  
  
To run a silent install simply do:  
/path-to-proinst/proinst -b /path-to-response-file/response.ini -l /path-to-store-log/silent.log