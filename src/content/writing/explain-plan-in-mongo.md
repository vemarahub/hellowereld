---
title: 'Explain Plan in Mongo'
description: 'Explain plan can be used on a collection to get an explainable object. db.test1.explain().find({name:"hello"}).sort({empid:1}) { "queryPlanner" : {'
date: 2019-03-22
tags: ['mongo', 'explain-plan']
featured: false
---

Explain plan can be used on a collection to get an explainable object.  
**\> db.test1.explain().find({name:"hello"}).sort({emp\_id:1})**  
_{_  
        _"queryPlanner" : {_  
                _"plannerVersion" : 1,_  
                _"namespace" : "sample1.test1",_  
                _"indexFilterSet" : false,_  
                _"parsedQuery" : {_  
                        _"name" : {_  
                                _"$eq" : "hello"_  
                        _}_  
                _},_  
                _"winningPlan" : {_  
                        _"stage" : "FETCH",_  
                        _"filter" : {_  
                                _"name" : {_  
                                        _"$eq" : "hello"_  
                                _}_  
                        _},_  
                        _"inputStage" : {_  
                                _"stage" : "IXSCAN",_  
                                _"keyPattern" : {_  
                                        _"emp\_id" : 1_  
                                _},_  
                                _"indexName" : "emp\_id\_1",_  
                                _"isMultiKey" : false,_  
                                _"multiKeyPaths" : {_  
                                        _"emp\_id" : \[ \]_  
                                _},_  
                                _"isUnique" : true,_  
                                _"isSparse" : false,_  
                                _"isPartial" : false,_  
                                _"indexVersion" : 2,_  
                                _"direction" : "forward",_  
                                _"indexBounds" : {_  
                                        _"emp\_id" : \[_  
                                                _"\[MinKey, MaxKey\]"_  
                                        _\]_  
                                _}_  
                        _}_  
                _},_  
                _"rejectedPlans" : \[ \]_  
        _},_  
        _"serverInfo" : {_  
                _"host" : "localhost.localdomain",_  
                _"port" : 27017,_  
                _"version" : "4.0.6",_  
                _"gitVersion" : "caa42a1f75a56c7643d0b68d3880444375ec42e3"_  
        _},_  
        _"ok" : 1_  
_}_  

  

In the above example "stage" is "IXSCAN" which means index is used for scanning the collection.If the stage is "COLSCAN" we have to use indexing in the collection to make the find and sort faster.

  

In the above query the index used is _"indexName" : "emp\_id\_1"._

Query planner is the default explain plan used in mongo.We can also use execution stats for the explain plan.

  

**Execution plan:**

\* Include query planner

\*More information will be provided

\* We can know the time to execute the query

\* We can know the number of documents returned.

\* Documents are examined for describing the execution plan.

  

**\> exp = db.test1.explain("executionStats")**

_Explainable(sample1.test1)_

**\> exp.find({"name":"world"})**

_{_

        _"queryPlanner" : {_

                _"plannerVersion" : 1,_

                _"namespace" : "sample1.test1",_

                _"indexFilterSet" : false,_

                _"parsedQuery" : {_

                        _"name" : {_

                                _"$eq" : "world"_

                        _}_

                _},_

                _"winningPlan" : {_

                        _"stage" : "COLLSCAN",_

                        _"filter" : {_

                                _"name" : {_

                                        _"$eq" : "world"_

                                _}_

                        _},_

                        _"direction" : "forward"_

                _},_

                _"rejectedPlans" : \[ \]_

        _},_

        _"**executionStats**" : {_

                _"executionSuccess" : true,_

                _"nReturned" : 1,_

                _"executionTimeMillis" : 0,_

                _"totalKeysExamined" : 0,_

                _"totalDocsExamined" : 4,_

                _"executionStages" : {_

                        _"stage" : "COLLSCAN",_

                        _"filter" : {_

                                _"name" : {_

                                        _"$eq" : "world"_

                                _}_

                        _},_

                        _"nReturned" : 1,_

                        _"executionTimeMillisEstimate" : 0,_

                        _"works" : 6,_

                        _"advanced" : 1,_

                        _"needTime" : 4,_

                        _"needYield" : 0,_

                        _"saveState" : 0,_

                        _"restoreState" : 0,_

                        _"isEOF" : 1,_

                        _"invalidates" : 0,_

                        _"direction" : "forward",_

                        _"docsExamined" : 4_

                _}_

        _},_

        _"serverInfo" : {_

                _"host" : "localhost.localdomain",_

                _"port" : 27017,_

                _"version" : "4.0.6",_

                _"gitVersion" : "caa42a1f75a56c7643d0b68d3880444375ec42e3"_

        _},_

        _"ok" : 1_

_}_

  

**All Plans Execution:**

\* It is lot like execution stats

\* Additionally it also runs each available plan and look at stats.

  

**\> db.test1.explain("allPlansExecution").find({"name":"world"})**

_{_

        _"queryPlanner" : {_

                _"plannerVersion" : 1,_

                _"namespace" : "sample1.test1",_

                _"indexFilterSet" : false,_

                _"parsedQuery" : {_

                        _"name" : {_

                                _"$eq" : "world"_

                        _}_

                _},_

                _"winningPlan" : {_

                        _"stage" : "COLLSCAN",_

                        _"filter" : {_

                                _"name" : {_

                                        _"$eq" : "world"_

                                _}_

                        _},_

                        _"direction" : "forward"_

                _},_

                _"rejectedPlans" : \[ \]_

        _},_

        _"executionStats" : {_

                _"executionSuccess" : true,_

                _"nReturned" : 1,_

                _"executionTimeMillis" : 0,_

                _"totalKeysExamined" : 0,_

                _"totalDocsExamined" : 4,_

                _"executionStages" : {_

                        _"stage" : "COLLSCAN",_

                        _"filter" : {_

                                _"name" : {_

                                        _"$eq" : "world"_

                                _}_

                        _},_

                        _"nReturned" : 1,_

                        _"executionTimeMillisEstimate" : 0,_

                        _"works" : 6,_

                        _"advanced" : 1,_

                        _"needTime" : 4,_

                        _"needYield" : 0,_

                        _"saveState" : 0,_

                        _"restoreState" : 0,_

                        _"isEOF" : 1,_

                        _"invalidates" : 0,_

                        _"direction" : "forward",_

                        _"docsExamined" : 4_

                _},_

                _"allPlansExecution" : \[ \]_

        _},_

        _"serverInfo" : {_

                _"host" : "localhost.localdomain",_

                _"port" : 27017,_

                _"version" : "4.0.6",_

                _"gitVersion" : "caa42a1f75a56c7643d0b68d3880444375ec42e3"_

        _},_

        _"ok" : 1_

_}_