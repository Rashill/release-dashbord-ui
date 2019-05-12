import { Component, OnInit, NgModule, ViewChild, TemplateRef } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { ReleaseService } from '../../services/release.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})

@NgModule({
  imports: [
    AngularFileUploaderModule
  ]
})

export class FileUploaderComponent implements OnInit {

  ngOnInit() {
  }

  /** Upload code related */
  config = {
    multiple: false,
    formatsAllowed: ".html,.htm",
    //maxSize: "1",
    uploadAPI: {
      url: environment.baseUrl + "/file"
    }
  };
  
  response;
  loading = false;

  uploadResponse(event) {
    if (event.status == 200) {
      this.response = JSON.parse(event.response);
    } else {
      console.error(event.statusText);
    }
  }
  /** End of Upload code */


  /** Download code related */
  @ViewChild('downloadModal') downloadModal: TemplateRef<any>;
  innerData: SafeHtml;

  constructor(
    private modalService: NgbModal,
    private releaseService: ReleaseService,
    private sanitizer: DomSanitizer
  ) { }

  downloadAbs(modal, mode) {//this.response['_id']
    this.loading = true;
    this.releaseService.downloadFile('5cd778946970de0c5a2dbd00').subscribe(
      res => {
        this.open(res, modal, mode);
      },
      error => {
        this.open(error, modal, mode);
      }
    );
  }

  open(data, modal, mode){
    this.loading = false;
    if(mode == 'modal'){
      this.openModal(data, modal);
    }else{
      this.openWindow(data);
    }
  }


  openModal(data, modal) {
    this.innerData = this.sanitizer.bypassSecurityTrustHtml(data.error.text);
    this.modalService.open(modal, { centered: true, size: 'lg' });
  }

  openWindow(data){
    let html = window.open('data', 'Downolad',"scrollbars=1,resizable=1");
    html.document.open()
    html.document.write(data.error.text)
    html.document.close()

  }

}
