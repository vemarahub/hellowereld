---
title: 'Rest Api in Angular'
description: 'To call a rest api service in angular, follow the below steps after setting up a fake service and routings as mentioned in previous blogs: 1. Generate an'
date: 2020-04-16
tags: ['angular', 'rest-api', 'service-in-angular']
featured: false
topic: 'Angular'
order: 7
---

To call a rest api service in angular, follow the below steps after setting up a fake service and routings as mentioned in previous blogs:  
  
**1\.** Generate an Angular service that interfaces with the JSON REST API.  
 ng generate service data  
  
**2\.** Write  `src/app/data.service.ts` file to call the fake rest api in the getAllBooks method as below:  

import { Injectable } from '@angular/core';

  

import { HttpClient, HttpErrorResponse } from '@angular/common/http';

  

import {  throwError } from 'rxjs';

import { retry, catchError } from 'rxjs/operators';

  

@Injectable({

  providedIn: 'root'

})

export class DataService {

  

  private REST\_API\_SERVER = "http://localhost:3000";

  

  constructor(private httpClient: HttpClient) { }

  

  handleError(error: HttpErrorResponse) {

    let errorMessage = 'Unknown error!';

    if (error.error instanceof ErrorEvent) {

      // Client-side errors

      errorMessage = \`Error: ${error.error.message}\`;

    } else {

      // Server-side errors

      errorMessage = \`Error Code: ${error.status}\\nMessage: ${error.message}\`;

    }

    window.alert(errorMessage);

    return throwError(errorMessage);

  }

  

 public getAllBooks(){

    return this.httpClient.get(this.REST\_API\_SERVER+"/books/").pipe(retry(3), catchError(this.handleError));

}

  

}

  
  
**3\.** Open src/app/dashboard/dashboard.component.ts and edit as below to use the service getAllBooks in the dashboard component.  
  
  

import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';

import {  takeUntil } from 'rxjs/operators';

import { Subject } from 'rxjs';

  

@Component({

  selector: 'app-dashboard',

  templateUrl: './dashboard.component.html',

  styleUrls: \['./dashboard.component.scss'\]

})

export class DashboardComponent implements OnInit {

  

  books = \[\];

  book\="";

  destroy$: Subject<boolean\> = new Subject<boolean\>();

  

  constructor(private dataService: DataService) { }

  

  ngOnInit() {

  

    this.dataService.getAllBooks().subscribe((data: any\[\])\=>{

      console.log(data);

      this.books = data;

    })  

  }

  

  ngOnDestroy() {

    this.destroy$.next(true);

    // Unsubscribe from the subject

    this.destroy$.unsubscribe();

  }

  

}

  
**4\.** Open src/app/home/dashboard.component.html and display the contents of Books json data in the dashboard screen of your angular app as below:  
  
  

<div style\="padding: 13px;"\>

    <mat-spinner \*ngIf\="books.length === 0"\></mat-spinner\>

  

    <mat-card \*ngFor\="let book of books" style\="margin-top:10px;"\>

        <mat-card-header\>

            <mat-card-title\>{{book.title}}</mat-card-title\>

                <mat-card-subtitle\>{{book.author}}</mat-card-subtitle\> 

        </mat-card-header\>     

         <mat-card-content\>

            <p\>

                {{book.description}}

            </p\>

        </mat-card-content\>

        <mat-card-actions\>

      <button mat-button\> Buy Book</button\>

    </mat-card-actions\>

    </mat-card\>

</div\>