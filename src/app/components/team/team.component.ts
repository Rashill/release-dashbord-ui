import { Component, OnInit } from '@angular/core';
import { RDTableComponent } from '../rd-table/rd-table.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  options = {
    name: 'team',
    pKey: '_id',
    pKey_label: 'ID',
    apiURL: environment.baseUrl,
    type: 'crud',
    csv: true,
    forceServerUpdate: true
  };

  fields = [
    {
      key: 'jiraProjectId',
      title: 'Name',
      description: 'Project Id as appears in JIRA',
      visible: false,
      update: true,
      create: true,
      required: true,
      //this is for the data comming from optionsURL, also it is needed for option id and value
      options: [],
      optionsURL: environment.baseUrl+'/project',
      optionObj: { value: 'id', label: 'name' }
    },
    {
      key: 'name',
      title: 'Name',
      description: 'Project name as appears in JIRA',
      visible: true,
      update: false,
      create: false
    },
    {
      key: '_id',
      title: '_id',
      description: '_id',
      visible: false,
      update: false,
      create: false
    },
    {
      key: 'email',
      title: 'Email',
      type: 'email',
      validator: 'email',
      visible: true,
      update: true,
      create: true,
      required: true
    }
  ];

  constructor() {}

  ngOnInit() {}
}
