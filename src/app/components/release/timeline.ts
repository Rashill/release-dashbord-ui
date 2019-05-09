import { Component, OnInit } from '@angular/core';

export class TimeLineDetails {
  constructor(
    public startDate: string,
    public devFinishDate: string,
    public refreshDate: string,
    public regressionStartDate: string,
    public regressionEndDate: string,
    public releaseDate
  ) {}

  getStartDate() {
    return this.startDate;
  }

  getDevFinish() {
    return this.devFinishDate;
  }

  getRefreshDate() {
    return this.refreshDate;
  }

  getRegressionStart() {
    return this.regressionStartDate;
  }

  getRegressionEnd() {
    return this.regressionEndDate;
  }

  getReleaseDate() {
    return this.releaseDate;
  }
}
