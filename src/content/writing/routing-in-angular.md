---
title: 'Routing in Angular'
description: 'We can route hyperlinks to route to any of the components based on url changes using single page application at client side instead of loading whole page.So'
date: 2020-04-10
tags: ['angular', 'routing', 'bootstrap']
featured: false
topic: 'Angular'
order: 3
---

  
We can route hyperlinks to route to any of the components based on url changes using single page application at client side instead of loading whole page.So basically what routing does is:  
  
\* Page navigation, to create " Single Page Application"  
\* Route maps a URL to its component  
  

### Steps for routing:

  

**1.** Importing @angular/router package in package.json ( already present when ng new is created )

  

**2\.** Define base url in index.html  

  <base href\="/"\>

  
**3\.** Create hyperlink for route ( in app.component.html)  
  
eg:  

<a class\="nav-link" routerLink\="dashboard"\>Dashboard</a\>

  
**4.**Create router module in app-routing.module.ts ( add path and component for components to be added like dashboard, rest will already be created by ng new initially)  

import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

import { AboutComponent } from './about/about.component';

  
  

const routes: Routes = \[

  {

    path:"dashboard",component:DashboardComponent

  },

  {

    path:"about",component:AboutComponent

  }

\];

  

@NgModule({

  imports: \[RouterModule.forRoot(routes)\],

  exports: \[RouterModule\]

})

export class AppRoutingModule { }

  
  
**5\.** Create router outlet in app.component.html  

<div class\="container-fluid"\>

  <router-outlet\></router-outlet\>

</div\>