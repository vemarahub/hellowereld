---
title: 'Fake Service in Angular'
description: 'To call a fake rest api service from our angular application , we can use a fake service using angular.Follow the below steps to create a fake server hosting a'
date: 2020-04-16
tags: ['angular', 'faker-service', 'rest-api']
featured: false
topic: 'Angular'
order: 6
---

  
To call a fake rest api service from our angular application , we can use a fake service using angular.Follow the below steps to create a fake server hosting a json database for angular service calls:  
  
**1.** In the project path run the below command from cmd:  
npm install json-server --save  
  
**2.** Inside project folder create a folder "server" with a json file, database.json with below data  
{  
    "books": \[  
{id: 1, title: "Lockdown Dairies", author: "raje"},  
{id: 2, title: "who do", author: "qao"}  
\]  
}  
  
**3.**Add the below lines in "scripts" tag of package.json of your project  
"server": "json-server --watch ./server/database.json"  
**4.**Run the below command to run the fake service  
**npm run server**  
  
  
The resource would be available at :  
http://localhost:3000/books