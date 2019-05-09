import { Component, OnInit } from '@angular/core';

export class Checklist {
  
    constructor(public _id: string, public checklistId: string, public value: boolean, public dueDate: string){

    }
  }