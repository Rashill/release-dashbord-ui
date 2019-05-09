import { Component, OnInit, NgModule } from '@angular/core';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})

@NgModule({
  imports: [
      AngularFileUploaderModule,
  ]
})

export class FileUploaderComponent implements OnInit {

  config = {
    multiple: false,
    formatsAllowed: ".html,.htm",
    //maxSize: "1",
    uploadAPI:  {
      url: environment.baseUrl+"/file",
      headers: {
        "Content-Type" : "text/plain;charset=UTF-8",
        "Authorization" : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOiI1Y2JmZTE3OTdkZDZmYTVkNTRlYmI1ODIiLCJhY2Nlc3NfdG9rZW4iOiJMWlMxZ1BzZGUyRllxbjI4OEFFVTNFektJbVNQNk5SbiIsImlhdCI6MTU1NjA3OTAwN30.bjWAVC6Pmk9GG9SCjDbGiv7jYgzN1XpOjjYZN_n5HxI',
        "Access-Control-Allow-Origin" : "*"  
      }
    }/*,
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: false,
    hideSelectBtn: false,
    replaceTexts: {
      selectFileBtn: 'Select HTML file',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Attach Files...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !'
    }*/
};

  constructor() { }

  ngOnInit() {
  }

}
