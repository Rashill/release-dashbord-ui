import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  // pass options to rd-table component
  options = {
    name: 'user', pKey: '_id', apiURL: '/api/v1', update: true, csv: true
  };

  fields = [
    {
      key: 'authId', title: 'authId', description: 'Mongo object ID',
      visible: false, update: false, create: false, required: true
    },
    {
      key: '_id', title: '_id', description: '_id',
      visible: false, update: false, create: false
    },
    {
      key: 'jiraAccountId', title: 'JiraAccountId', description: 'User name as in JIRA',
      visible: true, update: false, create: false, required: true
    },
    {
      key: 'role', title: 'Role', options: ['SuperAdmin', 'User'],
      visible: true, update: true, create: false, required: true
    },
    {
      key: 'timestamps', title: 'Timestamp',
      visible: true, update: false, create: false
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
