import { NgModule, Component, OnInit } from '@angular/core';

import {Line, Feature, Stage, DevCycle} from '../../services/timeline/timeline.service';
import {DxSchedulerModule} from 'devextreme-angular';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';


@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DevCycle]
})
@NgModule({
  imports: [
    DxSchedulerModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardComponent implements OnInit {
  stages: Stage[];
  features: Feature[];
  lines: Line[];
  currentDate: Date = new Date(2019, 3, 9);

  constructor(devCycle: DevCycle) {
      this.stages = devCycle.getStages();
      this.features = devCycle.getFeatures();
      this.lines = devCycle.getLines();
  }
  ngOnInit() {
  }

}

platformBrowserDynamic().bootstrapModule(DashboardComponent);