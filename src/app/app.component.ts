import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { throwError, of } from 'rxjs';
import { map } from 'rxjs/operators';
// Google analytics global variable
declare let ga: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  @HostBinding('class.loading') loading = false;
  error: Boolean;
  constructor() {}
}
