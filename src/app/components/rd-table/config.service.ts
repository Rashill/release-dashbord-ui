import { Injectable } from '@angular/core';


import { HttpClient, HttpHeaders} from '@angular/common/http';

import { Observable } from 'rxjs';


import { Config, STYLE, THEME } from 'ngx-easy-table';
import { TemplateRef } from '@angular/core';

import { Columns } from 'ngx-easy-table';


export class Schema implements Columns {
  key: string;
  title: string;
  placeholder?: string;
  width?: string;
  cellTemplate?: TemplateRef<any>;
  orderEnabled?: boolean;
  orderEventOnly?: boolean;
  searchEnabled?: boolean;
  orderBy?: string;
  type?: string;
  options?: any = [];
  description?: string;
  required?: boolean;
  validator?: string;
}


@Injectable()
export class ConfigService {
  public static config: Config = {
    searchEnabled: false,
    headerEnabled: true,
    orderEnabled: false,
    paginationEnabled: true,
    exportEnabled: false,
    clickEvent: true,
    selectRow: false,
    selectCol: false,
    selectCell: false,
    rows: 10,
    additionalActions: false,
    serverPagination: false,
    isLoading: false,
    detailsTemplate: false,
    groupRows: false,
    paginationRangeEnabled: true,
    collapseAllRows: false,
    checkboxes: true,
    resizeColumn: false,
    fixedColumnWidth: true,
    horizontalScroll: false,
    draggable: false,
    logger: false,
    showDetailsArrow: false,
    showContextMenu: true,
    persistState: true,
    tableLayout: {
      style: STYLE.NORMAL,
      theme: THEME.LIGHT,
      borderless: false,
      hover: true,
      striped: false,
    },
  };
}

@Injectable()
export class DataHTTPService {


  constructor(private http: HttpClient) {
  }

  getData(url: string, headers: HttpHeaders): Observable<any[]> {
    return this.http.get<any[]>(`${url}`,
      {
        headers: headers
      }
    );
  }
}