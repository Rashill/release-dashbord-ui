import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Timeline, DataSet } from 'vis';
import { Router } from '@angular/router';
import {TimeLineDetails} from './timeline'
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { ReleaseService } from '../../services/release.service';
import { Chart } from 'chart.js';
import {release} from './release'
@Component({
  selector: 'app-release-dashboard',
  templateUrl: './release-dashboard.component.html',
  styleUrls: ['./release-dashboard.component.scss']
})


export class ReleaseDashboardComponent implements OnInit {
  @ViewChild("visTimeline") timelineContainer: ElementRef;
  tlContainer: any;
  timeline: any;
  data: any;
  options: {};
  groups: any;
  redStyle: string = "border-color: rgb(240,120,130); background-color: rgb(240,120,130);"
  blueStyle: string = "border-color: rgb(120,176,240); background-color: rgb(120,176,240);"
  greenStyle: string = "border-color: rgb(147,242,142); background-color: rgb(147,242,142);"
  yellowStyle: string = "border-color: rgb(245,216,144); background-color: rgb(245,216,144);"
  baijStyle: string = "border-color: rgb(227,217,207); background-color: rgb(227,217,207);"
  error: Boolean
  today: Date
  timelineDetails:TimeLineDetails
  constructor(private router: Router,
    private releaseService: ReleaseService) { }
  chart = [];
  chart1 = [];
  details =[]
  release=[]
  environment=[]

  showTimeLine() {
    this.tlContainer = this.timelineContainer.nativeElement;
    this.timeline = new Timeline(this.tlContainer, this.data, {});
    this.timeline.setOptions(this.options);
    this.timeline.setGroups(this.groups);
    //this.timeline.setItems(items);
  }

  ngOnInit() {
    // this.release.push(new release("Release Name","Test OOC"))
    // this.release.push(new release("Type of Release","OOC"))
    // this.release.push(new release("Release Date","29-05-17"))
    // this.release.push(new release("Today's Date","24-05-17"))
    // this.release.push(new release("Current Phase","QA"))

    this.environment.push(new release("Release Name","Test OOC"))
    this.environment.push(new release("Dev Environment","CIO2"))
    this.environment.push(new release("Regression Environment","LAB03"))
    this.environment.push(new release("Sitecore","C5261"))
    this.environment.push(new release("Biztalk","C5410"))
    this.environment.push(new release("Dev Support","James"))

    this.details.push(new release("Release Name","Test OOC"))
    this.details.push(new release("Release Date","29-05-17"))
    this.details.push(new release("Dev Start Date","29-05-17"))
    this.details.push(new release("Dev Finish Date","29-05-17"))
    this.details.push(new release("Regression Deploy Date","29-05-17"))
    this.details.push(new release("Regression Start Date","29-05-17"))
    this.details.push(new release("Regression End Date","29-05-17"))
    this.details.push(new release("Test Enviornment","CIO2"))
    this.details.push(new release("Site Core","C5261"))
    this.details.push(new release("Biz Talk","C5410"))
    this.details.push(new release("Dev Support","James"))
    var ctx = document.getElementById("canvas");

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ["Done", "In Progress", "In Review", "To Do"],
        datasets: [{
          label: "Population (millions)",
          backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9"],
          data: [2, 2, 1, 3]
        }]
      }

    });
    
    this.releaseService.getRelease().pipe(
      map(res => res) // or any other operator
    )
      .subscribe(
        res => {
          console.log('response', res);
          
          this.release.push(new release("Release Name","Test OOC"))
          this.release.push(new release("Type of Release","OOC"))
          console.log(res[0][0].releaseDate)
          this.release.push(new release("Release Date",res[0][0].releaseDate.substring(0,10)))
          this.today = new Date();
          this.release.push(new release("Today's Date",this.today.toDateString()))
          this.release.push(new release("Current Phase","QA"))
          this.timelineDetails=new TimeLineDetails(res[0][0].releaseDate.substring(0,10),res[0][0].devfinish.substring(0,10))
          this.loadTimelineData(this.timelineDetails);
          this.showTimeLine()
          // this.router.navigate(['/']);
        },
        error => {
          this.error = true;
          console.error('Error!', error);
          return throwError(error); // Angular 5/RxJS 5.5
        }
      );
  }

  

  loadTimelineData(timelineDetails) {
    this.groups = new DataSet([
      {
        id: 1,
        content: 'Planned'
      }
    ]);
    this.data = new DataSet([
      {
        id: 1, content: 'Devlopment',
        start: timelineDetails.getStartDate(), end: '2019-04-14',
        group: 1, style: this.redStyle
      },
      {
        id: 2, content: 'Development',
        start: '2019-04-14', end: '2019-04-20',
        group: 1, style: this.blueStyle
      },
      {
        id: 3, content: 'QA',
        start: '2019-04-20', end: '2019-04-25',
        group: 1, style: this.greenStyle
      },
      {
        id: 4, content: 'Release/Verify',
        start: '2019-04-25', end: '2019-05-01',
        group: 1, style: this.yellowStyle
      },
      {
        id: 5, content: 'Post-Release',
        start: '2019-05-01', end: '2019-05-14',
        group: 1, style: this.baijStyle
      }
    ]);


    this.options = {
      editable: false,
      showTooltips: true,
      tooltip: {
        followMouse: true,
        overflowMethod: 'cap'
      },
      margin: {
        item: 20,
        axis: 40
      },
      stack: false
    };

  }

}
