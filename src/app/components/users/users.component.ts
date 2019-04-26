import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  // pass options to rd-table component
  options = {
    name: 'user',
    pKey: '_id',
    apiURL: environment.baseUrl,
    update: true,
    csv: true
  };

  fields = [
    {
      key: '_id',
      title: '_id',
      visible: false,
      update: false,
      create: false
    },
    {
      key: 'displayName',
      title: 'Display Name',
      visible: true,
      update: false,
      create: false
    },
    {
      key: 'emailAddress',
      title: 'Email',
      visible: true,
      update: false,
      create: false
    },
    {
      key: 'role',
      title: 'Role',
      options: ['SuperAdmin', 'User'],
      visible: true,
      update: true,
      create: false,
      required: true
    },
    {
      key: 'avatarUrls',
      title: 'Avatar',
      cellTemplate: 'imageTpl:avatarUrls.16x16',
      visible: true,
      update: false,
      create: false
    }
  ];

  constructor() {}

  ngOnInit() {}
}
