import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent implements OnInit {

  // pass options to rd-table component
  options = {
    name: 'checklist', pKey: 'id', apiURL: '/api/v1', type: 'crud', csv: true
  };

  fields = [
    { key: 'name', title: 'Check' },
    { key: 'description', title: 'Description', description: 'Checking description' }
  ]

  constructor() { }

  ngOnInit() {
  }

}
