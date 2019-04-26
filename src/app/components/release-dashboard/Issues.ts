import { Component, OnInit } from '@angular/core';

export class Issues {
    constructor(public teamName:String,public toDo: any[],public inProgress: any[],public done: any[]){}
    
  }