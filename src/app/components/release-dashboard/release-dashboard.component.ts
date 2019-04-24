import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { Timeline, DataSet } from 'vis';
import { Router } from '@angular/router';

import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { ReleaseService } from '../../services/release.service';
import { Chart } from 'chart.js';

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
  redStyle: string="border-color: rgb(240,120,130); background-color: rgb(240,120,130);"
  blueStyle: string="border-color: rgb(120,176,240); background-color: rgb(120,176,240);"
  greenStyle: string="border-color: rgb(147,242,142); background-color: rgb(147,242,142);"
  yellowStyle: string="border-color: rgb(245,216,144); background-color: rgb(245,216,144);"
  baijStyle: string="border-color: rgb(227,217,207); background-color: rgb(227,217,207);"
  error:Boolean
  constructor(private router: Router,
    private releaseService: ReleaseService) { }
    chart = [];
    chart1 = [];

    ngAfterViewInit() {     
      this.tlContainer = this.timelineContainer.nativeElement;       
      this.timeline = new Timeline(this.tlContainer, this.data, {});  
      this.timeline.setOptions(this.options);
      this.timeline.setGroups(this.groups);
      //this.timeline.setItems(items);
    }

  ngOnInit() {
    var ctx = document.getElementById("canvas");

    this.chart= new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ["Done", "In Progress", "In Review", "To Do"],
        datasets: [{
          label: "Population (millions)",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9"],
          data: [2,2,1,3]
        }]
      }

  });
  var ctx = document.getElementById("canvas1");

  this.chart1= new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ["Done", "In Progress", "In Review", "To Do"],
        datasets: [{
          label: "Population (millions)",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9"],
          data: [2,2,1,3]
        }]
      }

  });
  this.loadTimelineData();
    this.releaseService.getRelease().pipe(
        map(res => res) // or any other operator
      )
      .subscribe(
        res => {
          console.log('response', res);
          // this.router.navigate(['/']);
        },
        error => {
          this.error = true;
          console.error('Error!', error);
          return throwError(error); // Angular 5/RxJS 5.5
        }
      );
  }
  loadTimelineData() {
    this.groups = new DataSet([
        {
            id: 1,
            content: 'Planned'
          }
    ]);
    this.data = new DataSet([
        {
            id: 1, content: 'Pre-Release',
            start: '2019-04-10', end: '2019-04-14',
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
