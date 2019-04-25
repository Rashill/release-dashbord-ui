import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Timeline, DataSet } from 'vis';
import { Router } from '@angular/router';
import { TimeLineDetails } from './timeline'
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { ReleaseService } from '../../services/release.service';
import { Chart } from 'chart.js';
import { release } from './release'
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
  timelineDetails: TimeLineDetails
  constructor(private router: Router,
    private releaseService: ReleaseService) { }
  chart = [];
  chart1 = [];
  details = []
  release = []
  environment = []

  showTimeLine() {
    this.tlContainer = this.timelineContainer.nativeElement;
    this.timeline = new Timeline(this.tlContainer, this.data, {});
    this.timeline.setOptions(this.options);
    this.timeline.setGroups(this.groups);
    //this.timeline.setItems(items);
  }

  ngOnInit() {

    var ctx = document.getElementById("canvas");



    this.releaseService.getRelease().pipe(
      map(res => res) // or any other operator
    )
      .subscribe(
        res => {
          console.log('response', res);

          this.release.push(new release("Release Name", res[0].projects[0].versionDetails.name))
          this.release.push(new release("Type of Release", "OOC"))
          this.release.push(new release("Release Date", res[0].releaseDate.substring(0, 10)))
          this.today = new Date();
          this.release.push(new release("Today's Date", this.today.toDateString()))
          this.release.push(new release("Current Phase", "QA"))
          this.timelineDetails = new TimeLineDetails(res[0].startDate.substring(0, 10), res[0].devfinish.substring(0, 10),
            res[0].refreshDate.substring(0, 10), res[0].regressionStart.substring(0, 10), res[0].regressionEnd.substring(0, 10),
            res[0].releaseDate.substring(0, 10))
          this.loadTimelineData(this.timelineDetails);
          this.showTimeLine()
          this.details.push(new release("Release Name", res[0].projects[0].versionDetails.name))
          this.details.push(new release("Release Date", this.timelineDetails.getReleaseDate()))
          this.details.push(new release("Dev Start Date", this.timelineDetails.getStartDate()))
          this.details.push(new release("Dev Finish Date", this.timelineDetails.getDevFinish()))
          if (res[0].regressionDeploy != null)
            this.details.push(new release("Regression Deploy Date", res[0].regressionDeploy))
          this.details.push(new release("Regression Start Date", this.timelineDetails.getRegressionStart()))
          this.details.push(new release("Regression End Date", this.timelineDetails.getRegressionEnd()))
          if (res[0].cabDate != null)
            this.details.push(new release("CAB Date", res[0].cabDate))
          this.details.push(new release("Test Enviornment", res[0].testenvironment))
          this.details.push(new release("Regression Enviornment", res[0].regenvironment))
          this.details.push(new release("Site Core", res[0].sitecore))
          this.details.push(new release("Biz Talk", res[0].biztalk))
          this.details.push(new release("Dev Support", res[0].devsupport))


          this.environment.push(new release("Release Name", res[0].projects[0].versionDetails.name))
          this.environment.push(new release("Dev Environment", res[0].testenvironment))
          this.environment.push(new release("Regression Environment", res[0].regenvironment))
          this.environment.push(new release("Sitecore", res[0].sitecore))
          this.environment.push(new release("Biztalk", res[0].biztalk))
          this.environment.push(new release("Dev Support", res[0].devsupport))

          var toDO = 0;
          var done = 0;
          var inReview = 0;
          var inProgress = 0;
          for (var i = 0; i < res[0].projects.length; i++) {
            // console.log(res[0].projects[i].versionDetails.issues)
            for (var j = 0; j < res[0].projects[i].versionDetails.issues.issues.length; j++) {
              console.log(res[0].projects[i].versionDetails.issues.issues[j].id)
              
              if (res[0].projects[i].versionDetails.issues.issues[j].fields.status.name == "Done")
                done++
              else if (res[0].projects[i].versionDetails.issues.issues[j].fields.status.name == "To Do")
                toDO++;
              else if (res[0].projects[i].versionDetails.issues.issues[j].fields.status.name == "In Review")
                inReview++;
              else if (res[0].projects[i].versionDetails.issues.issues[j].fields.status.name == "In Progress")
                inProgress++;

            }
            
          }
          this.chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
              labels: ["Done", "In Progress", "In Review", "To Do"],
              datasets: [{
                label: "Population (millions)",
                backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9"],
                data: [done, inProgress, inReview, toDO]
              }]
            }

          });
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
        id: 1, content: 'Development',
        start: timelineDetails.getStartDate(), end: timelineDetails.getDevFinish(),
        group: 1, style: this.redStyle
      },
      {
        id: 2, content: 'Refresh Date',
        start: timelineDetails.getDevFinish(), end: timelineDetails.getRefreshDate(),
        group: 1, style: this.blueStyle
      },
      {
        id: 3, content: 'Regression Testing',
        start: timelineDetails.getRegressionStart(), end: timelineDetails.getRegressionEnd(),
        group: 1, style: this.greenStyle
      },
      {
        id: 4, content: 'Release',
        start: timelineDetails.getRegressionEnd(), end: timelineDetails.getReleaseDate(),
        group: 1, style: this.yellowStyle
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
