import { Component, OnInit } from '@angular/core';

export class TimeLineDetails {
    constructor(public startDate: string,public devfinish: string){}

    getStartDate()
    {
        return this.startDate
    }

    getDevFinish()
    {
        return this.devfinish
    }

  }