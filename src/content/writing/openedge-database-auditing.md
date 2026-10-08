---
title: 'Openedge Database Auditing'
description: 'Auditing goal can be achieved through below steps: 1. Enabling Audit in a DB. 2. Implementing policies. 3. Generating reports. ENABLING AUDIT : 1. Create a'
date: 2017-12-14
tags: ['audit-enabling', 'policy-import', 'audit-policy', 'policy-export', 'openedge-database-auditing']
featured: false
topic: 'Progress/OpenEdge'
order: 14
---

  
  
  
Auditing goal can be achieved through below steps:  
  
1. Enabling Audit in a DB.  
  
2. Implementing policies.  
  
3. Generating reports.  

  

###   
ENABLING AUDIT  :

  

1. Create  a  storage area for auditing tables . May create an area for Index too. Area should be of Type 2 storage essentially . eg.

Add.st :

d "AUDIT\_AREA\_DATA":70,64;512 ./testdb\_70.d1 

d "AUDIT\_AREA\_IDX":71,64;512 ./testdb\_71.d1

  

  

2. After creating Area enable auditing for database :

  

$ proutil testdb -C enableauditing area "AUDIT\_AREA\_DATA" - indexarea "AUDIT\_AREA\_IDX" deactivateidx

  

  

“OpenEdge Release 10.2B04 as of Thu Mar  3 19:17:16 EST 2011

  

The 95 audit event records for default system events were loaded successfully. (14812)

The 36 audit event records for encryption audit events were loaded successfully. (14812)

Auditing has been enabled for database testdb. (12479)”

  

  

  

  

### IMPLEMENTING AUDIT POLICY  :

1. Import Policy in local Database.

  

2. Export implemented Policy in Character Database. 

  

  

  

  

There are various audit policies predefined for OE database. However we can create our customized policies too. Here in particular to our environment our goal is to enable auditing for DBA activities like 

  

Dump/load , database object creation, idxbuild etc.

  

  

For this purpose we two pre defined policies as below.

App-Schema 

PSC-Db-Admin

  

  

  

A little description is as below :

  

**App-Schema:**

Application schema changes. This includes when any of the following is created, updated, or deleted: table, table trigger, table field, table index; or sequence. This also includes when a database is created or updated.

  

  

 **PSC-Db-Admin:**

Database administration tools. This includes when the database is started or stopped; or when any of the following operations are performed on the database: backup, restore, binary dump, binary load, copy, table move, index move, index check, index rebuild, index fix, area truncate, SQL dump, text dump, text load.

  

  

Now comes the tool to Activate a policy called **“Audit Policy Maintenance”**  .

  

Above tools is for Windows GUI only not for Character Interface. So we need to Enable a policy in our local system ,then export it in a XML format and load it in Character interface through Admin tool.

  

We will see this further.  

  

After enabling Audit in our local DB ( Local DB should be a similar copy of Character DB in terms of schema) , we need to import policy from Audit policy maintenance tool . Read  below .  
  
1. Goto “Audit Policy Maintenance “option in “Tools” in Data Dictionary.

  
  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgz5OWaM1LcHnm_FPC-lI3G70xpcSaQVL3fTTsqwIkbPjmzZJlpY20VMm4v9F03RtR8OxRfc9LedNQN4WuTsO4fb-_31d1zj7WAeg8DxAxiZMDDdpXsjYDi34sE0xRlP5fWAWVOKqIqx6rc/s640/a1.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgz5OWaM1LcHnm_FPC-lI3G70xpcSaQVL3fTTsqwIkbPjmzZJlpY20VMm4v9F03RtR8OxRfc9LedNQN4WuTsO4fb-_31d1zj7WAeg8DxAxiZMDDdpXsjYDi34sE0xRlP5fWAWVOKqIqx6rc/s1600/a1.png)

  

  

  
  
  
2.You will get below window . Go to File and then “Import Policy” .  
  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjj92mxw8zWyPpBUK71-ZZ4jQWdIFnu_qxSLIrlRfYiQbIOvgfTDWu879hVqMNwWl9x1C1RjBmK6kd4vRfoxyZK1SKHERnYwNFsl9gRyyryYKVNigdOo4UUtHSKQudMkH5R45tg2A9vmUm_/s640/a2.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjj92mxw8zWyPpBUK71-ZZ4jQWdIFnu_qxSLIrlRfYiQbIOvgfTDWu879hVqMNwWl9x1C1RjBmK6kd4vRfoxyZK1SKHERnYwNFsl9gRyyryYKVNigdOo4UUtHSKQudMkH5R45tg2A9vmUm_/s1600/a2.png)

  
  

  
  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
3. Auditing policies are stored  in $DLC/auditing drive in XML format . Browse there and select   “policies.xml” . 

  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgL1T0ixk-wl7-QA-_RDnOyHIY-j08BwQAHGlul18vG8PHdW29EcY8Eqy_lfsuqCvBVFJTK9nvDzHfRli0zjuWbLeirz32SxVqT6qOPYe3gz_gOuw0UWPQTrB7HUeDbAe15DjJHmx8r0QtT/s640/a3.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgL1T0ixk-wl7-QA-_RDnOyHIY-j08BwQAHGlul18vG8PHdW29EcY8Eqy_lfsuqCvBVFJTK9nvDzHfRli0zjuWbLeirz32SxVqT6qOPYe3gz_gOuw0UWPQTrB7HUeDbAe15DjJHmx8r0QtT/s1600/a3.png)

  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEisff2jEJUAxqArFnTH_V-Jkii-2Pob2SSvq1sDMHpHAU1-mek43LooPdkNUVbnihquhoJqDgwvs2oGsbTjlWZX1MtC4sIVQ6d3ym2Yuusvnq8XDrgebSt2TRkBXxWkFLicGg9M6wbNrkNS/s640/a4.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEisff2jEJUAxqArFnTH_V-Jkii-2Pob2SSvq1sDMHpHAU1-mek43LooPdkNUVbnihquhoJqDgwvs2oGsbTjlWZX1MtC4sIVQ6d3ym2Yuusvnq8XDrgebSt2TRkBXxWkFLicGg9M6wbNrkNS/s1600/a4.png)

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
4. After importing you will get below message box.

  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjJfWJUAC89NsjsfbHNJ54c4XU4jDm_hCEUDeLLVY-ht7lc5XbACJHppvf-KmzYJPUQFH1ASKaJhTJRsOoaT1oZbHZ8sbquv5GRTkcenIa2JQYSA4K3def90-xxs3GrrWIpi4d9Nn1GO97S/s640/a5.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjJfWJUAC89NsjsfbHNJ54c4XU4jDm_hCEUDeLLVY-ht7lc5XbACJHppvf-KmzYJPUQFH1ASKaJhTJRsOoaT1oZbHZ8sbquv5GRTkcenIa2JQYSA4K3def90-xxs3GrrWIpi4d9Nn1GO97S/s1600/a5.png)

  
  
  

  
  
  
  
  
  
  
  
  
5. You can see Different policies being imported as below .  
  
  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj5yxo2vHemsYuLz82fLeoRTBieYo-KleScNGlExIdj-BhTabdQdk3bMYAWHIEMJqmJC1ohfSvruf_i1BYKNSabL9V5dYAXjl3nNUId83lbODgo56cLorP_3C87euMyhk3o4_WKOVlTM_6Y/s640/a6.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj5yxo2vHemsYuLz82fLeoRTBieYo-KleScNGlExIdj-BhTabdQdk3bMYAWHIEMJqmJC1ohfSvruf_i1BYKNSabL9V5dYAXjl3nNUId83lbODgo56cLorP_3C87euMyhk3o4_WKOVlTM_6Y/s1600/a6.png)

  
  

  
  
  
  
  
  
  
  
  
  

6. You need to select a policy to activate (however when you import policies.xml , all policies in this xml are activated by default . we need  to activate App-Schema and PSC-DB-Admin Policy and deactivate others as below) .

Select one policy ( here  PSC-DB-Admin) .

  
  
  
[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjJbSBLqqBuMdLzQL-E36pdJ-HELvKYlLNycM3MUUhjyEDzZEHeFQpEBDUQ4OU945uVDGtsXPX_gZAO68GBvjePtnMeEeK4bYR8_Ku7dbkid5Wjh4JA5rGJUS0hYjzsKJAPVLWPvs7uA4iv/s640/a7.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjJbSBLqqBuMdLzQL-E36pdJ-HELvKYlLNycM3MUUhjyEDzZEHeFQpEBDUQ4OU945uVDGtsXPX_gZAO68GBvjePtnMeEeK4bYR8_Ku7dbkid5Wjh4JA5rGJUS0hYjzsKJAPVLWPvs7uA4iv/s1600/a7.png)  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

 If you uncheck “Policy active” check box , it will get deactivated ( after saving changes.).  
  
  

7. You need to uncheck and rest of the policies and check(if not) two policies in concern .

Now you need to save changes as below from  ”Save record” . 

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEifMv_ufypzRtgqi6nDfRoYxSrYZ7HdmAZL4bNsVQN3S9rMNKpdqz7qDpZFlYR3GzcqC90oOWu6sWSHSVtdwHuUC31VrLFCWDTgdf9UE1dcUdgm6Gzx_lUKuMnAz_r5-boXEYNQdzqbl8lQ/s640/a8.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEifMv_ufypzRtgqi6nDfRoYxSrYZ7HdmAZL4bNsVQN3S9rMNKpdqz7qDpZFlYR3GzcqC90oOWu6sWSHSVtdwHuUC31VrLFCWDTgdf9UE1dcUdgm6Gzx_lUKuMnAz_r5-boXEYNQdzqbl8lQ/s1600/a8.png)

  
  
  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
8. Once you save it you can see active policies as below.

  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhgjHkPvTB8WfEvo2BTdMinyJN58sprKycuQ6JoeelO-mUEVbaW-EywyrAxIvkITq1BIyMwMDPBdTMVLJsN4orxOhGh2Ob-EutDmdD4uUCQaTLzHtbKrxvKbX_xxhittQmHCXjA1UTqQ0b3/s640/a9.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhgjHkPvTB8WfEvo2BTdMinyJN58sprKycuQ6JoeelO-mUEVbaW-EywyrAxIvkITq1BIyMwMDPBdTMVLJsN4orxOhGh2Ob-EutDmdD4uUCQaTLzHtbKrxvKbX_xxhittQmHCXjA1UTqQ0b3/s1600/a9.png)

  

  
  
  

  

  

  
  
  
  
  
**Export Policy to character Database:**

  

Goto “Audit Policy Maintenance” tool and select File > Export Policy.

  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjx1iIkZ8kYZ6ODBvLw7VQrakQRI1wf0COFWVAUN5TWuxBazu35OGq85dhNv-sx6CvgRe8-6y_C7Vgnf_KKP0S4GEhHNhO5vxKh0tReXrtf4LbGg-56RKpo0UC6hn2T32PTlcXyjxJ5qNH5/s640/a10.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjx1iIkZ8kYZ6ODBvLw7VQrakQRI1wf0COFWVAUN5TWuxBazu35OGq85dhNv-sx6CvgRe8-6y_C7Vgnf_KKP0S4GEhHNhO5vxKh0tReXrtf4LbGg-56RKpo0UC6hn2T32PTlcXyjxJ5qNH5/s1600/a10.png)

  

             
Browse to directory where you want to generate XML file.  
  

  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhaDDYDcuZJEF5XHUQxs2KCFUsERFNGd3zzaMe0615wuVB7G3g-oB7QmwwGjVV4iSrSh8ZQUjRmS0Bs3k8AfBk1yKfaX0dOaTQ-5EoYOXieAQ4PZz16nPcCvJGcsy2K4YZ468f8wLVkAkx-/s640/a11.png)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhaDDYDcuZJEF5XHUQxs2KCFUsERFNGd3zzaMe0615wuVB7G3g-oB7QmwwGjVV4iSrSh8ZQUjRmS0Bs3k8AfBk1yKfaX0dOaTQ-5EoYOXieAQ4PZz16nPcCvJGcsy2K4YZ468f8wLVkAkx-/s1600/a11.png)

  

  
  
  
  
  
  
                   
  
  
Give a name like “db-policy.xml”  and export by clicking on Open .

  

The Xml generated needs to be loaded in target Database .

  

  

GENERATING REPORTS :

Once Auditing is enabled we need to query audit related tables. Below figure may help us.

  

  

Details of audit tables can be found in documents as below .

Table name Description Archived

\_aud-audit-data    >>>     This table contains the audit data records. All

events are stored in this table.

  

\_aud-audit-data-value >>>  This table is a child table of the \_aud-audit-data

table, and contains records for each field

change data event.

  

\_aud-audit-policy  >>>  This table contains named audit policies. If

multiple policies are active, the aggregation of

the policies is applied, and the highest level of

auditing will be applied if a conflict exists

between policies.

  

\_aud-event  >>>  This table contains the definitions for all

supported OpenEdge and user-defined audit

events and their event ids. All event ids up to

32,000 are reserved. You can create custom

application events with ids greater than 32,000.

  

\_aud-event-policy  >>>  This table contains policy settings for events

associated with policies.

  

\_aud-field-policy >>> This table contains field level auditing settings

associated with a named policy.

  

\_aud-file-policy  >>>  This table contains table level auditing settings

associated with a named policy.