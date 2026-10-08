---
title: 'Setting up a Database to Monitor in OEM'
description: 'After doing initial configuration and setup , a OEM dashboard on login will look like as below showing the admin server and the various resources under the'
date: 2018-08-06
tags: ['openedge', 'management-console', 'configuration-oem']
featured: false
topic: 'Progress/OpenEdge'
order: 25
---

  
After doing initial configuration and setup , a OEM dashboard on login will look like as below showing the admin server and the various resources under the server:  
  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj3E1ckCC9EO9pTtWaHilDvdsWf-eXcERzwE6DxMX2jLDkkTBbDAb-n4Sm3L0bzZrXsuY54dy9I4RxG31is2sYCyZnaw4Bl5wslWqF45r3qqtp6lIRgG0wsuVOmozzDwU0IyGiRI-K5xpKK/s640/33.JPG)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj3E1ckCC9EO9pTtWaHilDvdsWf-eXcERzwE6DxMX2jLDkkTBbDAb-n4Sm3L0bzZrXsuY54dy9I4RxG31is2sYCyZnaw4Bl5wslWqF45r3qqtp6lIRgG0wsuVOmozzDwU0IyGiRI-K5xpKK/s1600/33.JPG)

  
  
To add a database to monitor in the OEM, follow the below steps:  
  
1\. Go to Resources -> Database. A  form for all the database details will appear.Fill the form with the database details and click on submit  
  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgSz-_qwLN6wn7x-MQKvBp-v1cwXOptnaso5xx6773IIXjDHsQidE_jtyI_IHNoqYdGtQU7JDggXLDZYhiLNGiYZOpG1lKnsyKPrupxZnl6lSaJ-xc6VjzamRgcT5iY5GT6o005mvPP8v3b/s640/33.JPG)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgSz-_qwLN6wn7x-MQKvBp-v1cwXOptnaso5xx6773IIXjDHsQidE_jtyI_IHNoqYdGtQU7JDggXLDZYhiLNGiYZOpG1lKnsyKPrupxZnl6lSaJ-xc6VjzamRgcT5iY5GT6o005mvPP8v3b/s1600/33.JPG)

  
2\. Once added , it will redirect to database listing page , with all the options related to the added database available as links.Click on configuration link to edit the default configuration to modify various startup paramters like -n,-Mn,-S,-BiBufs,-AiBufs etc.  
  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjVV8zMhLV06_DFN7m0AmoFKX1sgLSiV1VQNzfyAT54vmKVSGQ_JWPdiwMnHavO_I585Uu0nE04MCUkvGHZJQNL6r3vi2KBOfFmT_V9d5BXfxz2R9hJ1P_ngZadWzpvB-YQblNArNcbx7gv/s640/33.JPG)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjVV8zMhLV06_DFN7m0AmoFKX1sgLSiV1VQNzfyAT54vmKVSGQ_JWPdiwMnHavO_I585Uu0nE04MCUkvGHZJQNL6r3vi2KBOfFmT_V9d5BXfxz2R9hJ1P_ngZadWzpvB-YQblNArNcbx7gv/s1600/33.JPG)

  
  
3\. -S ,-n client type(4gl,sql or both)  etc can be edited by choosing "servergroup.<dbname>.defaultconfiguration.defaultservergroup" from the below page.  
  
Click on "configuration.<dbname>.defaultconfiguration " to edit the default configurations after clicking edit on the loaded screen.  
  
  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgf2tDBNvLwjNLBD3NHFgXC9WJTZjrZxlBr2b5j9zIPKk-dSMhcaj_zvoYmEVA7rIv3AaLineNcW_3KKxo0goDYVkP_YYgstsqQzvk5pbKTbthA1ZGKJ14SuU9y0tbxoIKn63xhjmWyEIqR/s640/33.JPG)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgf2tDBNvLwjNLBD3NHFgXC9WJTZjrZxlBr2b5j9zIPKk-dSMhcaj_zvoYmEVA7rIv3AaLineNcW_3KKxo0goDYVkP_YYgstsqQzvk5pbKTbthA1ZGKJ14SuU9y0tbxoIKn63xhjmWyEIqR/s1600/33.JPG)

  
4\. Edit the required parameters and click on save.  
  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhzKWzwBO-ZeqN0Eh6U7TRoMzIH75fTS1_BwysrYEfN92Q1zm6uzXCP8TupHzls5ShP0EKiM6w1mxSOBmgUFRS1VM2Xh3j8AGVpEcTEJAUzsqDLEWYR8uSpANgOc1qPnscgV1-jHs8WbG6l/s640/33.JPG)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhzKWzwBO-ZeqN0Eh6U7TRoMzIH75fTS1_BwysrYEfN92Q1zm6uzXCP8TupHzls5ShP0EKiM6w1mxSOBmgUFRS1VM2Xh3j8AGVpEcTEJAUzsqDLEWYR8uSpANgOc1qPnscgV1-jHs8WbG6l/s1600/33.JPG)

  
  
Note: All these configurations are saved in "<DLC PATH>/properties/conmgr.properties" file.We can directly edit in the conmgr.properties to reflect the configurations we want for the particular database.  
  
  
5\. We can start / stop the database now from directly OEM tool using start database button, start agent will automatically start with the database if monitored checkbox is ticked for the database.It will start collecting starts for the database and monitor the database for any errors in logs or db shutdown.  
  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg9xRViP9R5yqUFUA-Vq_tkIlGIbANCXods95eA8RDIv686C4mScfReHoFtaYTtLMnZo9SBDgojFDOcp_-FhdVe5ZS827X_4WRh0Pmfk7m-ck3bwHgCW5nL4Xtsy6c973uzpa-2Zz2pZv2r/s640/33.JPG)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg9xRViP9R5yqUFUA-Vq_tkIlGIbANCXods95eA8RDIv686C4mScfReHoFtaYTtLMnZo9SBDgojFDOcp_-FhdVe5ZS827X_4WRh0Pmfk7m-ck3bwHgCW5nL4Xtsy6c973uzpa-2Zz2pZv2r/s1600/33.JPG)