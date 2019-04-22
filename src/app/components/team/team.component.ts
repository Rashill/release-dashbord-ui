import { Component, OnInit } from '@angular/core';
import { RDTableComponent } from '../rd-table/rd-table.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  //loadURL: undefined, createURL: undefined, updateURL: undefined, deleteURL: undefined

  // pass options to ngx-easy-table (The core plugin)
  //config = {}

  // pass options to rd-table component
  options = {
    name: 'team', pKey: 'id', apiURL: '/api/v1', type: 'crud', csv: true
  };

  fields = [
    { key: 'name', title: 'Team name', description: 'Team name as appears in JIRA' },
    { key: 'description', title: 'Description', description: 'Team name as appears in JIRA' }
  ]

  constructor() { }

  ngOnInit() {
  }

}
