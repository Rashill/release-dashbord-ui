import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Timeline, DataSet } from 'vis';
import { ActivatedRoute } from '@angular/router';
import { TimeLineDetails } from './timeline';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Issues } from './Issues';
import { ReleaseService } from '../../services/release.service';
import { ProjectService } from '../../services/project.service';
import { ChecklistService } from '../../services/checklist.service';
import { Chart } from 'chart.js';
import * as jsPDF from 'jspdf'
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-release-dashboard',
  templateUrl: './release.component.html',
  styleUrls: ['./release.component.scss']
})
export class ViewReleaseComponent implements OnInit {
  releaseId: string;
  @ViewChild('visTimeline') timelineContainer: ElementRef;
  tlContainer: any;
  timeline: any;
  data: any;
  options: {};
  groups: any;
  redStyle: string =
    'border-color: rgb(240,120,130); background-color: rgb(240,120,130);';
  blueStyle: string =
    'border-color: rgb(120,176,240); background-color: rgb(120,176,240);';
  greenStyle: string =
    'border-color: rgb(147,242,142); background-color: rgb(147,242,142);';
  yellowStyle: string =
    'border-color: rgb(245,216,144); background-color: rgb(245,216,144);';
  baijStyle: string =
    'border-color: rgb(227,217,207); background-color: rgb(227,217,207);';
  error: Boolean;
  today: Date;
  chart = [];
  release: any;
  issues: any;
  projects: any;

  selectedProjectId = '';

  timelineDetails: TimeLineDetails;
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private checklistService: ChecklistService,
    private releaseService: ReleaseService
  ) {}

  showTimeLine() {
    this.tlContainer = this.timelineContainer.nativeElement;
    this.timeline = new Timeline(this.tlContainer, this.data, {});
    this.timeline.setOptions(this.options);
    this.timeline.setGroups(this.groups);
  }

  genPDF()
  {
  console.log("Hi I am here")
  var data = document.getElementById('dashboard');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 200;
      var pageHeight = 500;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png')
      var pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      // pdf.addImage(agency_logo.src, 'PNG', logo_sizes.centered_x, _y, logo_sizes.w, logo_sizes.h);
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('dashboard.pdf'); // Generated PDF
  });
  }

  ngOnInit() {
    this.releaseId = this.route.snapshot.paramMap.get('id');

    let ctx = document.getElementById('canvas');
    this.releaseService
      .getRelease(this.releaseId)
      .pipe(
        map(res => res) // or any other operator
      )
      .subscribe(
        res => {
          this.release = res[0];

          this.release.days = this.calculateDaysDifference(
            new Date(this.release.projects[0].versionDetails.releaseDate)
          );

          this.projectService
            .getProjects()
            .pipe(
              map(response => response) // or any other operator
            )
            .subscribe(
              response => {
                for (let i = 0; i < response[0].length; i++) {
                  for (let j = 0; j < this.release.projects.length; j++) {
                    if (
                      this.release.projects[j].projectId === response[0][i].id
                    ) {
                      this.release.projects[j].name = response[0][i].name;
                    }
                  }
                }

                console.log('this.projects', this.release);
              },
              error => {
                this.error = true;
                console.error('Error!', error);
                return throwError(error); // Angular 5/RxJS 5.5
              }
            );

          this.checklistService
            .getChecklists()
            .pipe(
              map(response => response) // or any other operator
            )
            .subscribe(
              response => {
                console.log('checklist', response);
                for (let i = 0; i < response[0].length; i++) {
                  for (let j = 0; j < this.release.checklists.length; j++) {
                    if (
                      this.release.checklists[j].checklistId ===
                      response[0][i]._id
                    ) {
                      this.release.checklists[j].name = response[0][i].name;
                      this.release.checklists[j].description =
                        response[0][i].description;
                    }
                  }
                }
              },
              error => {
                this.error = true;
                console.error('Error!', error);
                return throwError(error); // Angular 5/RxJS 5.5
              }
            );

          this.loadTimelineData();
          this.showTimeLine();

          this.issues = {
            toDO: {
              issues: [],
              totalStoryPoints: 0
            },
            done: {
              issues: [],
              totalStoryPoints: 0
            },
            inReview: {
              issues: [],
              totalStoryPoints: 0
            },
            inProgress: {
              issues: [],
              totalStoryPoints: 0
            }
          };

          for (let i = 0; i < res[0].projects.length; i++) {
            for (
              let j = 0;
              j < res[0].projects[i].versionDetails.issues.issues.length;
              j++
            ) {
              let issue = res[0].projects[i].versionDetails.issues.issues[j];
              issue.projectId = res[0].projects[i].projectId;

              if (
                res[0].projects[i].versionDetails.issues.issues[j].fields.status
                  .name === 'Done'
              ) {
                this.issues.done.issues.push(issue);
              } else if (
                res[0].projects[i].versionDetails.issues.issues[j].fields.status
                  .name === 'To Do'
              ) {
                this.issues.toDO.issues.push(issue);
              } else if (
                res[0].projects[i].versionDetails.issues.issues[j].fields.status
                  .name === 'In Review'
              ) {
                this.issues.inReview.issues.push(issue);
              } else if (
                res[0].projects[i].versionDetails.issues.issues[j].fields.status
                  .name === 'In Progress'
              ) {
                this.issues.inProgress.issues.push(issue);
              }
            }
          }

          this.chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
              labels: ['Done', 'In Progress', 'In Review', 'To Do'],
              datasets: [
                {
                  label: 'Issue Status',
                  backgroundColor: ['#3cba9f', '#3e95cd', '#FF9900', '#C13100'],
                  data: [
                    this.issues.done.issues.length,
                    this.issues.inProgress.issues.length,
                    this.issues.inReview.issues.length,
                    this.issues.toDO.issues.length
                  ]
                }
              ]
            },
            options: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        generateLabels: function(chart) {
                            var data = chart.data;
                            if (data.labels.length && data.datasets.length) {
                                return data.labels.map(function(label, i) {
                                    var meta = chart.getDatasetMeta(0);
                                    var ds = data.datasets[0];
                                    var arc = meta.data[i];
                                    var custom = arc && arc.custom || {};
                                    var getValueAtIndexOrDefault = Chart.helpers.getValueAtIndexOrDefault;
                                    var arcOpts = chart.options.elements.arc;
                                    var fill = custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
                                    var stroke = custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
                                    var bw = custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);

                      // We get the value of the current label
                      var value = chart.config.data.datasets[arc._datasetIndex].data[arc._index];

                                    return {
                                        // Instead of `text: label,`
                                        // We add the value to the string
                                        text: label + " : " + value,
                                        fillStyle: fill,
                                        strokeStyle: stroke,
                                        lineWidth: bw,
                                        hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                                        index: i
                                    };
                                });
                            } else {
                                return [];
                            }
                        }
                    }
                }
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

  loadTimelineData() {
    this.groups = new DataSet([
      {
        id: 1,
        content: 'Planned'
      }
    ]);
    this.data = new DataSet([
      {
        id: 1,
        content: 'Development',
        title:
          this.getDateString(
            this.release.projects[0].versionDetails.startDate
          ) +
          ' - ' +
          this.getDateString(this.release.devFinishDate),
        start: new Date(this.release.projects[0].versionDetails.startDate),
        end: new Date(this.release.devFinishDate),
        group: 1,
        style: this.redStyle
      },
      {
        id: 2,
        content: 'Code Refresh',
        title:
          this.getDateString(this.release.devFinishDate) +
          ' - ' +
          this.getDateString(this.release.refreshDate),
        start: new Date(this.release.devFinishDate),
        end: new Date(this.release.refreshDate),
        group: 1,
        style: this.blueStyle
      },
      {
        id: 3,
        content: 'Regression Testing',
        title:
          this.getDateString(this.release.regressionStartDate) +
          ' - ' +
          this.getDateString(this.release.regressionEndDate),
        start: new Date(this.release.regressionStartDate),
        end: new Date(this.release.regressionEndDate),
        group: 1,
        style: this.greenStyle
      },
      {
        id: 4,
        content: 'Release',
        title:
          this.getDateString(this.release.regressionEndDate) +
          ' - ' +
          this.getDateString(
            this.release.projects[0].versionDetails.releaseDate
          ),
        start: new Date(this.release.regressionEndDate),
        end: new Date(this.release.projects[0].versionDetails.releaseDate),
        group: 1,
        style: this.yellowStyle
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

  getDateString(dt) {
    let date = new Date(dt);
    let dd: any = date.getDate();
    let mm: any = date.getMonth() + 1; //January is 0!

    let yyyy = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    return dd + '/' + mm + '/' + yyyy;
  }

  calculateDaysDifference(date2) {
    const diffTime = Math.abs(date2.getTime() - new Date().getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}
