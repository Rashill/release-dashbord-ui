import { Component, OnInit } from '@angular/core';

export class TimeLineDetails {
    constructor(public startDate: string,public devfinish: string,
        public refreshDate: string,public regressionStart: string,
       public regressionEnd: string,public releaseDate){}

    getStartDate()
    {
        return this.startDate
    }

    getDevFinish()
    {
        return this.devfinish
    }

    getRefreshDate()
    {
        return this.refreshDate
    }

    getRegressionStart()
    {
        return this.regressionStart
    }

    getRegressionEnd()
    {
        return this.regressionEnd
    }

    getReleaseDate()
    {
        return this.releaseDate
    }
  }