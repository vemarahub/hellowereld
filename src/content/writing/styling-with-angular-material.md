---
title: 'Styling with Angular Material'
description: 'In the last blog , the dashboard.component.html has been styled by using angular material by using mat card and other similar tags.Follow the below steps to'
date: 2020-04-17
tags: ['angular', 'angular-material', 'angular-style']
featured: false
topic: 'Angular'
order: 5
---

In the last blog , the dashboard.component.html has been styled by using angular material by using mat card and other similar tags.Follow the below steps to implement angular material:  
  
**1\.** Go to project path and in cmd and type below command:  
ng add @angular/material  
  
**2.** Open the src/app/app.module.ts file and add the below code for material:  

import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';

  

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';

import { AboutComponent } from './about/about.component';

import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

  

import { MatButtonModule } from '@angular/material/button';

  

import { MatCardModule } from '@angular/material/card';

  

import { MatIconModule } from '@angular/material/icon';

  

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

  

import { MatToolbarModule } from '@angular/material/toolbar';

  
  
  
  

@NgModule({

  declarations: \[

    AppComponent,

    DashboardComponent,

    AboutComponent,

  \],

  imports: \[

    BrowserModule,

    AppRoutingModule,

    HttpClientModule,

    BrowserAnimationsModule,

    MatCardModule,

    MatToolbarModule,

    MatIconModule,

    MatButtonModule,

    MatCardModule,

    MatProgressSpinnerModule

  \],

  providers: \[\],

  bootstrap: \[AppComponent\]

})

export class AppModule { }

  
**3\.** Now you can use the material components in your html files, for example in src/app/app.component.html we can use material as below:  

<mat-toolbar color\="primary"\>

    <h1\>

      BookStore 

    </h1\>

    <button mat-button routerLink\="/dashboard"\>DashBoard</button\>

    <button mat-button routerLink\="/"\>Add Books</button\>

    <button mat-button routerLink\="/"\>Update Book</button\>

    <button mat-button routerLink\="/"\>Delete Book</button\>

    <button mat-button routerLink\="/about"\>About</button\>

  </mat-toolbar\>

  <router-outlet\></router-outlet\>