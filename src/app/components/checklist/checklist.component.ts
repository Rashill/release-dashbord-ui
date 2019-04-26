import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent implements OnInit {
  // pass options to rd-table component
  options = {
    name: 'checklist',
    pKey: '_id',
    apiURL: environment.baseUrl,
    type: 'crud',
    csv: true
  };

  fields = [
    { key: 'name', title: 'Name', required: true },
    {
      key: '_id',
      title: '_id',
      description: '_id',
      visible: false,
      update: false,
      create: false
    },
    {
      key: 'description',
      title: 'Description',
      description: 'Checking description'
    }
  ];

  constructor() {}

  ngOnInit() {}
}
