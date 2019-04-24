/**
 * Usage: pass the following
 * - options: data options and operations (optional)
 * - fields: schema of the data fields (required)
 * - data: data table (optional)
 * - config: ngx-easy-table configurations (optional)
 *   https://ngx-easy-table.eu/#/doc
 * 
 *  <app-details [options]="options" [fields]="fields" [data]="data" [config]="config"></app-details>
 * 
 * Possible data options:
 * - name: data name (as it appears in the api URL e.g. /api/v1/<anme>/)(required)
 * - pKey: name of primary key attribute (required)
 * - apiUR: e.g. get/post/put/delete http://example/ component will inject opt.name and opt.pKey
 *        e.g. http://example/dataName/1
 * - type: simple/crud (default: simple)
 * - create: true/false (default: false)
 * - update: true/false (default: false)
 * - delete: true/false (default: false)
 * - loadURL: e.g. get http://example/load/  (default: undefined)
 * - createURL: e.g. post http://example/create/   (default: undefined)
 * - updateURL: e.g. put http://example/update/  (default: undefined)
 * - deleteURL: e.g. delete http://example/delete/  (default: undefined)
 * - forceServerUpdate: call load data after operation (create/update/delete) done successfully
 */

import { Component, OnInit, ViewChild, ViewEncapsulation, Input, TemplateRef, ContentChild } from '@angular/core';

import { Config, API, APIDefinition } from 'ngx-easy-table';
import { ConfigService, Schema, DataHTTPService } from './config.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { InputControlService } from './input-control.service';
import { load } from '@angular/core/src/render3';
import { promise } from 'protractor';

@Component({
  selector: 'app-rd-table',
  templateUrl: './rd-table.component.html',
  styleUrls: ['./rd-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ConfigService, DataHTTPService, InputControlService],
})
export class RDTableComponent implements OnInit {

  @ViewChild('table') table: APIDefinition
  @ViewChild('imageTpl') imageTpl: TemplateRef<any>;
  @ViewChild('alertModal') alertModal: TemplateRef<any>;

  @Input() options = {};
  @Input() fields: [];
  @Input() data = [];
  @Input() config = {};

  opt_obj = {
    name: '', pKey: 'id', pKey_label: 'ID', apiURL: undefined, type: 'simple', create: false, update: false, delete: false,
    csv: false, pdf: false, bootstrap: true, forceServerUpdate: false,
    loadURL: undefined, createURL: undefined, updateURL: undefined, deleteURL: undefined
  };

  schema: Schema[] = [];
  filteredSchema: Schema[] = [];

  message: string = '';
  alertContent= {};
  selectedRecords = new Set();
  operation = 'none';
  httpClient: HttpClient;

  public configuration: Config;
  public dataHTTPService: DataHTTPService;

  form: FormGroup;
  private ics: InputControlService;

  constructor(private modalService: NgbModal, httpClient: HttpClient, ics: InputControlService) {
    this.configuration = ConfigService.config;
    this.dataHTTPService = new DataHTTPService(httpClient);
    this.httpClient = httpClient;
    this.ics = ics;
  }

  ngOnInit(): void {
    this.processInputs();
    try {
      if (this.opt_obj.bootstrap == true) {
        this.setBootstrap();
      }
    } catch (e) {

    }

    if (this.opt_obj.loadURL != undefined || this.opt_obj.apiURL != undefined) {
      this.load();
    }
  }

  processInputs() {
    //exted the defult options with the passed by the user
    this.opt_obj = Object.assign(this.opt_obj, this.options);
    if (this.opt_obj.type.toLowerCase() === 'crud') {
      this.opt_obj.create = true;
      this.opt_obj.update = true;
      this.opt_obj.delete = true;
    }
    //init the schema from fields
    for (let field of this.fields) {
      let f = new Schema();
      f = field;
      //this is for image display or custmized cells
      if (field['cellTemplate'] != undefined) {
        let elem = this.processTemplate(field['cellTemplate'])
        f.cellTemplate = elem.tplRef;
        f.collTemplateParms = elem.parms
      }
      //should be visible in the table
      if (field['visible'] != false) {
        this.filteredSchema.push(f);
      }
      //should not be visible in the table, but in the form might be
      this.schema.push(f);
    }
    //extending ngx-easy-table configurations from the user 
    let configKeys = Object.keys(this.configuration);
    for (let configKey of configKeys) {
      if (this.config[configKey] != undefined) {
        this.configuration[configKey] = this.config[configKey];
      }
    }
  }

  /**
   * 
   * @param input passed with collTemplate: e.g. (imageTpl:avatarUrls.16x16)
   */
  processTemplate(input){
    let el = input.split(":");
    let tplRef: TemplateRef<any>;
    if(el[0]=='imageTpl'){
      tplRef = this.imageTpl;
    }

    let parms = el[1].split('.');
    return {tplRef, parms};
  }

  /**
   * This is triggered by buttons (Create/Update/Delete)
   * It riggers modal service to open
   * 
   * @param content passed from html button component
   * @param operation identifies the operation type (Create/Update/Delete)
   */
  openModal(content, operation) {
    // setup form content
    content.saveLabel = 'Save';
    content.closeLabel = 'Cancel';
    content.operation = operation;
    content.title = operation + ' Record'
    content.record = {}
    content.rowIndex = -1;
    if (operation == 'Update') {
      content.rowIndex = this.selectedRecords.values().next().value;
      content.record = this.data[content.rowIndex];
    } else if (operation == 'Delete') {
      content.saveLabel = 'Delete';
      content.rowIndex = [];
      content.records = [];
      this.selectedRecords.forEach(index => {
        content.rowIndex.push(index);
        content.records.push(this.data[index]);
      });
    }

    this.loadOptions();

    //setup vaidation
    if (operation == 'Create' || operation == 'Update') {
      this.form = this.ics.createFormGroup(content.record, this.schema);
    } else {
      this.form = new FormGroup({});
    }
    //setup/open content
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true });
  }


  isValid(key) { return this.form.controls[key].valid; }
  getValidationMsg(key) {
    let errors = this.form.controls[key].errors;
    return this.ics.getMessageFromError(errors);
  }

  /**
   * This is triggered by table div for any click or event
   * @param $event 
   */
  triggerAChangeEvent($event) {
    switch ($event.event) {
      case 'onCheckboxSelect':
        if (this.selectedRecords.has($event.value.rowId)) {
          this.selectedRecords.delete($event.value.rowId);
        } else {
          this.selectedRecords.add($event.value.rowId);
        }
        break;
      case 'onSelectAll':
        this.data.forEach((_, key) => {
          if (this.selectedRecords.has(key)) {
            this.selectedRecords.delete(key);
          } else {
            this.selectedRecords.add(key);
          }
        });
        break;
    }
  }

  /**
   * Handles click event from save button in the modal
   * @param operation Either Create/Update/Delete
   * @param rowIndex of the current index or indices to be processed
   */
  save(operation, rowIndex) {
    let row = {};
    let error = false;
    this.schema.forEach(attr => {
      try {
        let elem: HTMLElement = document.getElementById(attr.key);
        if (elem !== undefined) {
          let el: HTMLSelectElement = (<HTMLSelectElement>document.getElementById(attr.key));
          if (attr.options != undefined) {
            //if (attr.type == 'multiple') {
              let ops = el.selectedOptions;
              let values = [];
              for (let i = 0; i < ops.length; i++) {
                let val = '';
                if(ops[i].value.split(":").length >1){
                 val = (ops[i].value.split(":")[1]).trim().replace('\'','').replace('\'','');
                }else{
                  val = ops[i].value;
                }
                values.push(val);
              }
              row[attr.key] = values.join(',');
           // } else {
             // row[attr.key] = (el.selectedOptions.item(0).value.split(":")[1]).trim().replace('\'','').replace('\'','');
            //}
            
          } else if (attr.type == 'checkbox') {
            let el: HTMLInputElement = (<HTMLInputElement>document.getElementById(attr.key));
            row[attr.key] = el.checked;
          } else {
            let el: HTMLInputElement = (<HTMLInputElement>document.getElementById(attr.key));
            row[attr.key] = el.value;
          }
        }
      } catch (error1) {

      }
    });

    //perfrome operation
    if (operation == 'Create') {
      this.createRow(row);
    } else if (operation == 'Update') {
      this.updateRow(rowIndex, row);
    } else if (operation == 'Delete') {
      this.deleteRow(rowIndex);
    }
    //destory the modal
    this.modalService.dismissAll();
  }


  /**
   * Create function
   * @param row new row to be created
   */
  createRow(row) {
    //perform server side post creation
    let url = '';
    if (this.opt_obj.createURL != undefined) {
      url = `${this.opt_obj.createURL}`;
    } else if (this.opt_obj.apiURL != undefined) {
      url = `${this.opt_obj.apiURL}/${this.opt_obj.name}/`;
    }

    this.configuration.isLoading = true;
    this.httpClient.post(url, row, { headers: this.getAuthorizationHeaders() })
      .subscribe(
        res => {
          this.configuration.isLoading = false;
          //row[this.opt_obj['pKey']] = res[this.opt_obj['pKey']];
          if(this.opt_obj.forceServerUpdate){
            this.load();
          }else{
            this.data.push(
              res,
            );
          }

          this.data = [...this.data];
        }, err => {
          this.configuration.isLoading = false;
          this.reportError(err)
        });
  }

  /**
   * Update function
   * @param rowIndex edited rowIndex in the table
   * @param row edited row data
   */
  updateRow(rowIndex, row) {
    //perform server side put updating
    let url = '';
    if (this.opt_obj.updateURL != undefined) {
      url = `${this.opt_obj.updateURL}`;
    } else if (this.opt_obj.apiURL != undefined) {
      url = `${this.opt_obj.apiURL}/${this.opt_obj.name}/${this.data[rowIndex][this.opt_obj.pKey]}`;
    }

    this.httpClient.put(url, row, { headers: this.getAuthorizationHeaders() })
      .subscribe(
        res => {
          this.configuration.isLoading = false;
          if(this.opt_obj.forceServerUpdate){
            this.load();
          }else{
            this.data = [...this.data.map((obj, index) => {
              if (index === rowIndex) {
                return Object.assign({}, {}, res);
              }
              return obj;
            })];
          }
          this.selectedRecords.delete(rowIndex);

        }, err => {
          this.configuration.isLoading = false;
          this.reportError(err)
        });

  }

  /**
   * Delete method
   * @param rowIndecies row indecies to be removed
   */
  async deleteRow(rowIndecies: number[]) {
    //sort descending to presist the indecies
    rowIndecies.sort(function (a, b) { return b - a });
    //perform server side put updating
    this.configuration.isLoading = true;
    for (let rowIndex of rowIndecies) {
      let url = '';
      if (this.opt_obj.deleteURL != undefined) {
        url = `${this.opt_obj.deleteURL}`;
      } else if (this.opt_obj.apiURL != undefined) {
        url = `${this.opt_obj.apiURL}/${this.opt_obj.name}/${this.data[rowIndex][this.opt_obj.pKey]}`;
      }

      setTimeout( () => { this.performDeleteion(url, rowIndex); }, 500 );
    }//end of for loop
    this.resetSelectAllCheckbox(false);

    if(this.opt_obj.forceServerUpdate){
      this.load();
    }

    this.configuration.isLoading = false;
  }

  /**
   * Communicate to the server to perfome the deletion
   * @param url for api deletion endpoint
   * @param rowIndex row index of single record
   */
  performDeleteion(url, rowIndex) {
    try {
      const params = new HttpParams().set(this.opt_obj.pKey, this.data[rowIndex][this.opt_obj.pKey]);
      this.httpClient.delete(url, { params: params, headers: this.getAuthorizationHeaders() })
        .subscribe(
          res => {
            this.selectedRecords.delete(rowIndex);
            this.data.splice(rowIndex, 1);
            this.data = [...this.data];
            return true;
          }, err => {
            this.reportError(err)
            return true;
          });
    } catch (err) {
    }
    return false;
  }

  resetSelectAllCheckbox(isChecked){
    let checkLabel = document.querySelector('.ngx-form-checkbox');
    let children: HTMLCollection = checkLabel.children;
    let el: HTMLInputElement = (<HTMLInputElement> children[0]);
    el.checked = isChecked;
  }

  /**
   * Loads the data from the server
   */
  load() {
    let url = '';
    if (this.opt_obj.loadURL != undefined) {
      url = `${this.opt_obj.loadURL}`;
    } else if (this.opt_obj.apiURL != undefined) {
      url = `${this.opt_obj.apiURL}/${this.opt_obj.name}/`
    }

    this.configuration.isLoading = true;
    this.dataHTTPService.getData(url, this.getAuthorizationHeaders())
      .subscribe((response: any[]) => {
        this.configuration.isLoading = false;
        this.data = response;
        console.log(response);
      }, (error) => {
        this.configuration.isLoading = false;
        console.error('ERROR: ', error.message);
      });
  }

  /**
   * Loads options  from the server
   */
  loadOptions() {
    for (let field of this.schema) {
      if (field['optionsURL'] != undefined && field['optionObj'] != undefined) {
          let url = field['optionsURL'];
          let fOp =field['optionObj'];
          this.dataHTTPService.getData(url, this.getAuthorizationHeaders())
            .subscribe((res: any[]) => {
              let options = []
              
              res.forEach(op => {
                options.push({
                    value: op[fOp['value']],
                    label: op[fOp['label']]
                    })
              });
              field['options'] = options;
            }, (error) => {
              console.log(error);
          });
      }
    }

  }



  /**
   * To do: not implemented
   * @param name as required by the API
   */
  reset(name: string): void {
    //not implemented yet....
    /*this.table.apiEvent({
      type: API.onGlobalSearch, value: name,
    });*/
  }


  /**
   * Export to CSV function ()
   * It deals with json data
   */
  exportToCSV() {
    const rows = this.data;
    let csvContent = 'data:text/csv;charset=utf-8,';
    let dataString = '';
    const x: any[] = [];
    const keys = Object.keys(this.data[0]);
    rows.forEach((row, index) => {
      x[index] = [];
      keys.forEach((i) => {
        if (row.hasOwnProperty(i)) {
          if (typeof row[i] === 'object') {
            row[i] = 'Object'; // so far just change object to "Object" string
          }
          x[index].push(row[i]);
        }
      });
    });

    csvContent += keys + '\n';
    x.forEach((row, index) => {
      dataString = row.join(',');
      csvContent += index < this.data.length ? dataString + '\n' : dataString;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', this.opt_obj.name + '.csv');

    link.click();
  }

  setBootstrap() {
    this.table.apiEvent({
      type: API.setTableClass,
      value: 'table table-bordered table-striped table-sm',
    });
  }

  getAuthorizationHeaders() {
    let headers = new HttpHeaders().
    set("Authorization", 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOiI1Y2JmZTE3OTdkZDZmYTVkNTRlYmI1ODIiLCJhY2Nlc3NfdG9rZW4iOiJMWlMxZ1BzZGUyRllxbjI4OEFFVTNFektJbVNQNk5SbiIsImlhdCI6MTU1NjA3OTAwN30.bjWAVC6Pmk9GG9SCjDbGiv7jYgzN1XpOjjYZN_n5HxI').
    set('Content-Type', 'application/json');
    return headers;
  }

  reportError(err) {
    let apiFeedback = err.error.message;
    // setup/open content
    this.alertContent['title']= 'Error';
    this.alertContent['message']= apiFeedback;
    
    this.modalService.open(this.alertModal, { windowClass: 'alert-modal', centered: true });
  }

}