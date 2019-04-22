import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    // pass options to rd-table component
    options = {
      name: 'user', pKey: 'id', apiURL: '/api/v1', type: 'crud', csv: true
    };
  
    fields = [
      { key: 'name', title: 'User name'},
      { key: 'role', title: 'Role', options: ['SuperAdmin', 'AgencyAdmin', 'OfficeManager']}
    ];
  
  constructor() { }

  ngOnInit() {
  }

}
