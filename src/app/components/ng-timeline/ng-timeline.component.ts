import { AfterViewInit, Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Timeline, DataSet } from 'vis';

//Ref: /https://stackblitz.com/edit/bootstrap-ngx-alert-visjf-demo?file=app%2Fapp%2Fvistimeline%2Fvistimeline.component.ts

@Component({
  selector: 'app-ng-timeline',
  templateUrl: './ng-timeline.component.html',
  styleUrls: ['./ng-timeline.component.scss']
})

export class NgTimelineComponent implements OnInit {

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

    constructor() { 
      this.loadTimelineData();
    }
  
    ngOnInit() {
    }
  
    ngAfterViewInit() {     
      this.tlContainer = this.timelineContainer.nativeElement;       
      this.timeline = new Timeline(this.tlContainer, this.data, {});  
      this.timeline.setOptions(this.options);
      this.timeline.setGroups(this.groups);
      //this.timeline.setItems(items);
    }
  
    loadTimelineData() {
        this.groups = new DataSet([
            {
                id: 1,
                content: 'Planned'
              },{
                id: 2,
                content: 'Actual'
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
            },
            //----------------- Actual
            {
                id: 6, content: 'Pre-Release',
                start: '2019-04-10', end: '2019-04-15',
                group: 2, style: this.redStyle
            },
            {
                id: 7, content: 'Development',
                start: '2019-04-15', end: '2019-04-23', 
                group: 2, style: this.blueStyle
            },
            {
                id: 8, content: 'QA',
                start: '2019-04-23', end: '2019-04-29', 
                group: 2, style: this.greenStyle
            },
            {
                id: 9, content: 'Release/Verify',
                start: '2019-04-29', end: '2019-05-07', 
                group: 2, style: this.yellowStyle
            },
            {
                id: 10, content: 'Post-Release',
                start: '2019-05-07', end: '2019-05-14', 
                group: 2, style: this.baijStyle
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

