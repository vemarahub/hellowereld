---
title: 'Profiler in Mongo'
description: 'Profiler can be used to setup logging on the mongo instance. Events captured by the profiler: CRUD Administrative Operations Configuration Operations'
date: 2019-03-24
tags: ['profiling', 'mongo']
featured: false
topic: 'MongoDB'
order: 11
---

Profiler can be used to setup logging on the mongo instance.  
  
**Events captured by the profiler:**  
\*CRUD  
\*Administrative Operations  
\*Configuration Operations  
  

[![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiQGlBqtb8OVB3uJFX_4UTg1ye92kNL6CvkbQALVr5Y_5tzD0bRHEDjit-1_rDjRTFQpVE1pBcvbDyRyja98T_7t3QkGzfIYGvUnmRva1qqxUTaPdG1dX4wYdnJpZv0PXzNJ7k_aOxYZ4M/s640/ha.JPG)](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiQGlBqtb8OVB3uJFX_4UTg1ye92kNL6CvkbQALVr5Y_5tzD0bRHEDjit-1_rDjRTFQpVE1pBcvbDyRyja98T_7t3QkGzfIYGvUnmRva1qqxUTaPdG1dX4wYdnJpZv0PXzNJ7k_aOxYZ4M/s1600/ha.JPG)

  
  
If we check the profiling level method definition we can see how the profiling method is to be used.  
  
**\> db.setProfilingLevel**  
_function (level, options) {_  
        _if (level < 0 || level > 2) {_  
            _var errorText = "input level " + level + " is out of range \[0..2\]";_  
            _var errorObject = new Error(errorText);_  
            _errorObject\['dbSetProfilingException'\] = errorText;_  
            _throw errorObject;_  
        _}_  
        _var cmd = {profile: level};_  
        _if (isNumber(options)) {_  
            _cmd.slowms = options;_  
        _} else {_  
            _cmd = Object.extend(cmd, options);_  
        _}_  
        _return assert.commandWorked(this.\_dbCommand(cmd));_  
    _}_  

  

db.commandHelp method can be used to know details about different methods used in mongo.For profile setup the details about the command can be found as below:

  

**\> db.commandHelp("profile")**

_help for: profile controls the behaviour of the performance profiler, the fraction of eligible operations which are sampled for logging/profiling, and the threshold duration at which ops become eligible. See http://docs.mongodb.org/manual/reference/command/profile_

  

Setting up profiling on the databases as level 2 can be done as below:

**\> db.setProfilingLevel(2)**

_{ "was" : 0, "slowms" : 100, "sampleRate" : 1, "ok" : 1 }_

_or_

**\> db.setProfilingLevel(1,3)**

_{ "was" : 2, "slowms" : 100, "sampleRate" : 1, "ok" : 1 }_

  

The details about the profiling set can be seen by queryinig the system collection

**\> db.system.profile.find().sort({$natural:-1}).limit(1).pretty()**

_{_

        _"op" : "query",_

        _"ns" : "config.system.profile",_

        _"command" : {_

                _"find" : "system.profile",_

                _"filter" : {_

                _},_

                _"lsid" : {_

                        _"id" : UUID("f563a6c1-6877-447b-93c5-59ff4bf75308")_

                _},_

                _"$db" : "config"_

        _},_

        _"keysExamined" : 0,_

        _"docsExamined" : 1,_

        _"cursorExhausted" : true,_

        _"numYield" : 0,_

        _"nreturned" : 1,_

        _"locks" : {_

                _"Global" : {_

                        _"acquireCount" : {_

                                _"r" : NumberLong(1)_

                        _}_

                _},_

                _"Database" : {_

                        _"acquireCount" : {_

                                _"r" : NumberLong(1)_

                        _}_

                _},_

                _"Collection" : {_

                        _"acquireCount" : {_

                                _"r" : NumberLong(1)_

                        _}_

                _}_

        _},_

        _"responseLength" : 1191,_

        _"protocol" : "op\_msg",_

        _"millis" : 0,_

        _"planSummary" : "COLLSCAN",_

        _"execStats" : {_

                _"stage" : "COLLSCAN",_

                _"nReturned" : 1,_

                _"executionTimeMillisEstimate" : 0,_

                _"works" : 3,_

                _"advanced" : 1,_

                _"needTime" : 1,_

                _"needYield" : 0,_

                _"saveState" : 0,_

                _"restoreState" : 0,_

                _"isEOF" : 1,_

                _"invalidates" : 0,_

                _"direction" : "forward",_

                _"docsExamined" : 1_

        _},_

        _"ts" : ISODate("2019-03-23T15:37:27.842Z"),_

        _"client" : "127.0.0.1",_

        _"appName" : "MongoDB Shell",_

        _"allUsers" : \[ \],_

        _"user" : ""_

_}_

  

We can also see the last set of operations on the database by querying the system collection 

**\> db.system.profile.find({},{op:1}).sort({$natural:-1}).limit(4).pretty()**

_{ "op" : "query" }_

_{ "op" : "update" }_

_{ "op" : "query" }_

_{ "op" : "query" }_

  

We can also check details about the profiling using

**\>show profile**

  

To check what level of profiling is set on the instance we can use

**\> db.getProfilingStatus()**

_{ "was" : 2, "slowms" : 100, "sampleRate" : 1 }_

  

In Profiling data will be writing from beginning again , once it reaches end in profile collection.It has no indexes also, to speed up write to profile collection.