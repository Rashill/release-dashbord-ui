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
    name: 'team', pKey: '_id', pKey_label: 'ID', apiURL: '/api/v1', type: 'crud', csv: true
  };

  fields = [
    {
      key: 'jiraProjectId', title: 'jiraProjectId', description: 'Project Id as appears in JIRA',
      visible: true, update: true, create: true, required: true,
      //this is for the data comming from optionsURL, also it is needed for option id and value
      options: [], optionsURL: '/api/v1/project', optionObj: {value: 'id', label: 'name'}
    },
    {
      key: '_id', title: '_id', description: '_id',
      visible: false, update: false, create: false
    },
    {
      key: 'description', title: 'Description', description: 'Team name as appears in JIRA',
      visible: true, update: true, create: true
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
