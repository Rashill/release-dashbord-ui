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

  downloadAbs(modal) {
    this.releaseService.downloadFile(this.response['_id']).subscribe(
      res => {
        this.openModal(res, modal);
      },
      error => {
        this.openModal(error, modal);
      }
    );
  }


  openModal(data, modal) {
    this.innerData = this.sanitizer.bypassSecurityTrustHtml(data.error.text);
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', centered: true });
  }

}
