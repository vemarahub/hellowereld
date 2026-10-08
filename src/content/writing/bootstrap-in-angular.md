---
title: 'Bootstrap in Angular'
description: 'To implement bootstrap in an angular application after creating it with ng new command , follow the below steps: 1. Open command prompt and cd to the project'
date: 2020-04-10
tags: ['angular', 'ui', 'bootstrap']
featured: false
---

  
To implement bootstrap in an angular application after creating it with ng new command , follow the below steps:  
  
**1\.** Open command prompt and cd to the project directory and run  below commands  
  

  

npm install jquery –save

npm install popper.js – save

npm install bootstrap –save

npm install font-awesome –save

  
  
**2.** Open project folder in visual studio and in the angular.json file of the project add the below styles and scripts:  

    "styles": \[

              "src/styles.scss",

              "node\_modules/bootstrap/dist/css/bootstrap.css",

              "node\_modules/font-awesome/css/font-awesome.css"

            \],

            "scripts": \[

              "node\_modules/jquery/dist/jquery.js",

              "node\_modules/popper.js/dist/umd/popper.js",

  

              "node\_modules/bootstrap/dist/js/bootstrap.js"

  

            \]

  

**3\.** To add a nav bar with dashboard and about as two menu options and a search bar, add the below code in app.component.html

<nav class\="navbar navbar-expand-sm bg-success navbar-dark"\>

  <a class\="navbar-brand" href\="#"\>

      Angular Task Manager

  </a\>

  <button class\="navbar-toggler" type\="button" data-toggle\="collapse" data-target\="#mynav"\>

      <span class\="navbar-toggler-icon"\></span\>

  </button\>

  <div class\="collapse navbar-collapse" id\="mynav"\>

      <ul class\="navbar-nav mr-auto"\>

          <li class\="nav-item"\>

              <a class\="nav-link" routerLink\="Dashboard"\>Dashboard</a\>

          </li\>

          <li class\="nav-item"\>

              <a class\="nav-link" routerLink\="About"\>About</a\>

          </li\>

      </ul\>

      <form class\="form-inline my-2 my-lg-0"\>

          <div class\="input-group"\>

              <div class\="input-group-prepend"\>

                  <span class\="input-group-text" id\="search"\><i class\="fa fa-search"\></i\></span\>

              </div\>

              <input type\="text" class\="form-control" placeholder\="Search"\>

          </div\>

          <button class\="btn btn-warning my2- my-sm-0" type\="button"\>Search</button\>

      </form\>

  </div\>

</nav\>

  
  

  
**4\.** Create a component for each dashboard and about using command prompt and running below commands:  

ng g component dashboard

ng g component about

  

This will create folders dashboard and about inside your main project folder with all related files for angular.eg:

dashboard.component.html

dashboard.component.scss

dashboard.component.spec.ts

dashboard.component.ts

  

**5\.** Open dashboard.component.ts and the name given for selector field in @Component tag can be edited and used in our app.component.html file to add that component to our app.

For eg: app-dashboard

This can be used in app.component .html as: